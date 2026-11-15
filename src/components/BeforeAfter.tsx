'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { Dict } from '@/i18n/es';
import { SERVICES } from '@/data/services';
import { bookingUrl, whatsappUrl, type Lang } from '@/data/business';
import { Img } from './Img';
import { BookLink } from './BookLink';
import { WhatsApp } from './Icons';
import { SuitRule } from './Suits';

/**
 * The two source photos are not shot from the same angle, so a drag slider
 * would misalign: a crossfade with an Antes / Después toggle is used instead.
 * It plays once (before → after → before) the first time it scrolls into view.
 */
export function BeforeAfter({ t, lang }: { t: Dict; lang: Lang }) {
  const reduce = useReducedMotion();
  const [after, setAfter] = useState(false);
  const [touched, setTouched] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const haircut = SERVICES.find((s) => s.id === 'corte')!;

  useEffect(() => {
    if (reduce || touched || !box.current) return;
    const timers: number[] = [];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        timers.push(window.setTimeout(() => setAfter(true), 700));
        timers.push(window.setTimeout(() => setAfter(false), 2900));
      },
      { threshold: 0.6 },
    );
    io.observe(box.current);
    return () => { io.disconnect(); timers.forEach(clearTimeout); };
  }, [reduce, touched]);

  const choose = (v: boolean) => { setTouched(true); setAfter(v); };

  return (
    <div className="mt-24 grid items-center gap-10 border-t border-line pt-20 md:mt-32 md:grid-cols-[1.05fr_1fr] md:gap-14 md:pt-28" aria-labelledby="antes-despues-title">
      <div ref={box} className="reveal">
        <div className="frame aspect-square">
          <Img
            name="cera-antes"
            alt={t.beforeAfter.beforeAlt}
            sizes="(min-width: 768px) 520px, 92vw"
            className="absolute inset-0 size-full object-cover"
          />
          <div
            className="absolute inset-0 transition-opacity duration-[900ms] ease-[var(--ease-out-expo)]"
            style={{ opacity: after ? 1 : 0 }}
            aria-hidden={!after}
          >
            <Img name="cera-despues" alt={t.beforeAfter.afterAlt} sizes="(min-width: 768px) 520px, 92vw" className="size-full object-cover" />
          </div>
          <span className="absolute left-4 top-4 z-10 bg-ink/80 px-3 py-1.5 font-display text-[0.85rem] uppercase tracking-[0.14em] text-cream" aria-live="polite">
            {after ? t.beforeAfter.after : t.beforeAfter.before}
          </span>
        </div>

        <div role="group" aria-label={t.beforeAfter.toggleLabel} className="mt-4 grid grid-cols-2 gap-2"
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') choose(true);
            if (e.key === 'ArrowLeft') choose(false);
          }}
        >
          <button type="button" aria-pressed={!after} onClick={() => choose(false)} className={`btn ${!after ? 'btn-cream' : 'btn-line'}`}>
            {t.beforeAfter.before}
          </button>
          <button type="button" aria-pressed={after} onClick={() => choose(true)} className={`btn ${after ? 'btn-cream' : 'btn-line'}`}>
            {t.beforeAfter.after}
          </button>
        </div>
        <p className="mt-3 text-center text-[0.8rem] text-muted">{t.beforeAfter.illustrative}</p>
      </div>

      <div className="reveal" style={{ '--i': 1 } as React.CSSProperties}>
        <h3 id="antes-despues-title" className="font-display text-[1.9rem] uppercase leading-[1.1] tracking-[0.05em] sm:text-4xl">
          {t.beforeAfter.title}
        </h3>
        <SuitRule className="mt-5 max-w-[12rem]" />
        <p className="mt-5 text-lg text-cream/90">{t.beforeAfter.lead}</p>

        <h4 className="mt-8 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-gold-hi">{t.beforeAfter.howTitle}</h4>
        <ol className="mt-3 space-y-3">
          {t.beforeAfter.steps.map((s, i) => (
            <li key={s} className="flex gap-4">
              <span className="tabular w-5 shrink-0 font-display text-xl leading-[1.3] text-gold" aria-hidden>{i + 1}</span>
              <span>{s}</span>
            </li>
          ))}
        </ol>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <BookLink href={bookingUrl(lang, { serviceId: haircut.freshaId })} newTabLabel={t.book.newTab}>
            {t.beforeAfter.bookCut}
          </BookLink>
          <a href={whatsappUrl(t.beforeAfter.wantMessage)} target="_blank" rel="noopener" className="btn btn-line">
            <WhatsApp className="text-lg" />
            {t.beforeAfter.want}
          </a>
        </div>
        <p className="mt-3 text-[0.9rem] text-muted">{t.beforeAfter.addOnNote}</p>
      </div>
    </div>
  );
}
