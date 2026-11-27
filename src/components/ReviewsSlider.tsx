'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { Dict } from '@/i18n/es';
import type { Lang } from '@/data/business';
import type { Review } from '@/data/reviews';
import { ChevronLeft, ChevronRight, Star } from './Icons';

type Props = { reviews: Review[]; lang: Lang; t: Dict['reviews'] };

const AUTOPLAY_MS = 7000;

/**
 * Swipeable review slider: native scroll-snap (touch and trackpad work for free),
 * arrows, dots, and a gentle autoplay that stops on hover, focus, touch,
 * when off-screen, and for people who prefer reduced motion.
 */
export function ReviewsSlider({ reviews, lang, t }: Props) {
  const track = useRef<HTMLUListElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [interacted, setInteracted] = useState(false);
  // Number of stops: with 3 cards in view, 5 reviews give 3 positions (one dot each).
  const [stops, setStops] = useState(reviews.length);
  const total = reviews.length;

  /** Scroll offset of each stop, clamped to the track's real scroll range. */
  const offsets = useCallback(() => {
    const el = track.current;
    if (!el) return [0];
    const items = Array.from(el.children) as HTMLElement[];
    const max = el.scrollWidth - el.clientWidth;
    const first = items[0]?.offsetLeft ?? 0;
    const all = items.map((s) => Math.min(max, s.offsetLeft - first));
    return all.filter((v, i) => i === 0 || v > all[i - 1] + 2);
  }, []);

  /** Stop closest to the current scroll position, read straight from the DOM. */
  const current = useCallback(() => {
    const el = track.current;
    const o = offsets();
    if (!el) return 0;
    let best = 0;
    o.forEach((v, i) => { if (Math.abs(v - el.scrollLeft) < Math.abs(o[best] - el.scrollLeft)) best = i; });
    return best;
  }, [offsets]);

  const goTo = useCallback((i: number) => {
    const el = track.current;
    const o = offsets();
    if (!el) return;
    const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollTo({ left: o[((i % o.length) + o.length) % o.length], behavior: smooth ? 'smooth' : 'auto' });
  }, [offsets]);

  // Count stops (on load and resize) and follow which one is showing.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => { setStops(offsets().length); setActive(current()); };
    update();
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { el.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, [offsets, current]);

  // Only autoplay while on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused || !visible || interacted || stops < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => goTo(current() + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, visible, interacted, stops, goTo, current]);

  const manual = (i: number) => { setInteracted(true); goTo(i); };
  const step = (d: number) => { setInteracted(true); goTo(current() + d); };

  return (
    <div
      ref={root}
      role="region"
      aria-roledescription="carousel"
      aria-label={t.carousel}
      className="reveal relative mx-auto mt-16 max-w-5xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={() => setInteracted(true)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      }}
    >
      <ul
        ref={track}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((rv, i) => {
          const translated = (lang === 'en' && rv.textEn) || (lang === 'pt' && rv.textPt) || null;
          return (
            <li
              key={rv.author}
              role="group"
              aria-roledescription="slide"
              aria-label={t.slide.replace('{n}', String(i + 1)).replace('{total}', String(total))}
              className="flex w-[86%] shrink-0 snap-start flex-col border border-line bg-ink p-7 sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <span className="flex items-center justify-between">
                <span className="inline-flex gap-1 text-gold-hi" aria-label={`${rv.stars}/5`}>
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} className={s <= rv.stars ? '' : 'opacity-25'} />)}
                </span>
                <span aria-hidden className="font-display text-5xl leading-none text-gold/40">“</span>
              </span>
              <blockquote className="mt-4 flex-1 whitespace-pre-line text-[1rem] leading-relaxed text-cream/90">
                {translated ?? rv.text}
              </blockquote>
              <p className="mt-6 border-t border-line pt-4 text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-cream">
                {rv.author}
                {translated && t.translated ? <span className="mt-1 block text-[0.78rem] font-normal normal-case tracking-normal text-muted">{t.translated}</span> : null}
              </p>
            </li>
          );
        })}
      </ul>

      {stops > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-6">
          <button type="button" onClick={() => step(-1)} aria-label={t.prev} className="inline-flex size-11 items-center justify-center border border-line text-xl text-cream transition-colors hover:border-gold hover:text-gold-hi">
            <ChevronLeft />
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: stops }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => manual(i)}
                aria-label={t.goTo.replace('{n}', String(i + 1))}
                aria-current={i === active ? 'true' : undefined}
                className="group inline-flex size-6 items-center justify-center"
              >
                <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-gold-hi' : 'w-1.5 bg-cream/30 group-hover:bg-cream/60'}`} />
              </button>
            ))}
          </div>
          <button type="button" onClick={() => step(1)} aria-label={t.next} className="inline-flex size-11 items-center justify-center border border-line text-xl text-cream transition-colors hover:border-gold hover:text-gold-hi">
            <ChevronRight />
          </button>
        </div>
      ) : null}
    </div>
  );
}
