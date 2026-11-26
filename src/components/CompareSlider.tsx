'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Img } from './Img';
import { imageEntry } from '@/lib/images';

type Props = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  labels: { before: string; after: string; slider: string; value: string; hint: string };
};

const clamp = (v: number) => Math.min(100, Math.max(0, v));
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Before / after comparison. One CSS variable, --p (0..100), drives the
 * divider, the clip of the "después" layer and both labels, so they can never
 * drift apart. Position updates bypass React: a requestAnimationFrame loop
 * eases the current value toward the pointer target and writes --p directly.
 * Left of the divider = antes, right = después.
 */
export function CompareSlider({ before, after, beforeAlt, afterAlt, labels }: Props) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const knob = useRef<HTMLSpanElement>(null);
  const [dragging, setDragging] = useState(false);
  const state = useRef({ current: 50, target: 50, raf: 0, demo: false, touched: false });
  const { width, height } = imageEntry(before);

  // Write the position to the DOM (no React render).
  const paint = (v: number) => {
    box.current?.style.setProperty('--p', v.toFixed(3));
    const k = knob.current;
    if (k) {
      const n = String(Math.round(v));
      if (k.getAttribute('aria-valuenow') !== n) {
        k.setAttribute('aria-valuenow', n);
        k.setAttribute('aria-valuetext', labels.value.replace('{n}', n));
      }
    }
  };

  // Ease toward the target; stops itself once settled.
  const loop = () => {
    const s = state.current;
    const diff = s.target - s.current;
    s.current = Math.abs(diff) < 0.05 ? s.target : s.current + diff * 0.32;
    paint(s.current);
    s.raf = s.current === s.target ? 0 : requestAnimationFrame(loop);
  };
  const goTo = (v: number, instant = false) => {
    const s = state.current;
    s.target = clamp(v);
    if (instant || reduce) { s.current = s.target; paint(s.current); return; }
    if (!s.raf) s.raf = requestAnimationFrame(loop);
  };

  const stopDemo = () => {
    const s = state.current;
    s.touched = true;
    s.demo = false;
  };

  const fromClientX = (clientX: number, instant = false) => {
    const r = box.current?.getBoundingClientRect();
    if (r) goTo(((clientX - r.left) / r.width) * 100, instant);
  };

  useEffect(() => {
    paint(state.current.current);
    const s = state.current;
    return () => { if (s.raf) cancelAnimationFrame(s.raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Demo sweep once in view: centre → most of the antes → most of the después → centre.
  useEffect(() => {
    if (reduce || !box.current) return;
    const keyframes = [50, 80, 20, 50];
    const seg = 1000;
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        const s = state.current;
        if (!e.isIntersecting || s.touched) return;
        io.disconnect();
        s.demo = true;
        const start = performance.now() + 400;
        const step = (now: number) => {
          if (!s.demo) return;
          const t = Math.max(0, now - start);
          const i = Math.min(keyframes.length - 2, Math.floor(t / seg));
          const local = Math.min(1, (t - i * seg) / seg);
          const v = keyframes[i] + (keyframes[i + 1] - keyframes[i]) * easeInOut(local);
          s.current = s.target = v;
          paint(v);
          if (t < seg * (keyframes.length - 1)) raf = requestAnimationFrame(step);
          else s.demo = false;
        };
        raf = requestAnimationFrame(step);
      },
      { threshold: 0.55 },
    );
    io.observe(box.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  const onPointerDown = (e: React.PointerEvent) => {
    stopDemo();
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    fromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    // coalesced events give the full-resolution path on fast drags
    const events = e.nativeEvent.getCoalescedEvents?.() ?? [];
    const last = events.length ? events[events.length - 1] : e.nativeEvent;
    fromClientX(last.clientX);
  };
  const onPointerUp = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const big = e.shiftKey ? 10 : 4;
    const s = state.current;
    let next: number | null = null;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = s.target - big;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = s.target + big;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = 100;
    if (next === null) return;
    e.preventDefault();
    stopDemo();
    goTo(next);
  };

  const labelClass =
    'pointer-events-none absolute top-4 z-10 bg-black/70 px-3 py-1.5 font-display text-[0.8rem] uppercase tracking-[0.14em] text-white';

  return (
    <div>
      <div
        ref={box}
        className={`frame relative select-none touch-pan-y ${dragging ? 'cursor-grabbing' : 'cursor-ew-resize'}`}
        style={{ aspectRatio: `${width} / ${height}`, ['--p' as string]: 50 }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Img fx={false} name={before} alt={beforeAlt} sizes="(min-width: 768px) 560px, 92vw" className="pointer-events-none absolute inset-0 size-full object-cover" />
        {/* own compositing layer: clip changes don't repaint the rest */}
        <div
          className="pointer-events-none absolute inset-0 [transform:translateZ(0)]"
          style={{ clipPath: 'inset(0 0 0 calc(var(--p) * 1%))' }}
        >
          <Img fx={false} name={after} alt={afterAlt} sizes="(min-width: 768px) 560px, 92vw" className="size-full object-cover" />
        </div>

        {/* labels fade as the divider approaches their side */}
        <span className={`${labelClass} left-4`} style={{ opacity: 'clamp(0, calc((var(--p) - 8) / 14), 1)' }} aria-hidden>
          {labels.before}
        </span>
        <span className={`${labelClass} right-4`} style={{ opacity: 'clamp(0, calc((92 - var(--p)) / 14), 1)' }} aria-hidden>
          {labels.after}
        </span>

        {/* divider: cream hairline + gold diamond handle, positioned by the same --p */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-0 [transform:translateZ(0)]"
          style={{ left: 'calc(var(--p) * 1%)' }}
        >
          <span className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_10px_rgb(0_0_0/0.45)]" />
          <span
            ref={knob}
            role="slider"
            tabIndex={0}
            aria-label={labels.slider}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={50}
            aria-valuetext={labels.value.replace('{n}', '50')}
            onKeyDown={onKeyDown}
            className={`pointer-events-auto absolute left-0 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none transition-transform duration-300 ease-[var(--ease-out-expo)] focus-visible:[&>span]:ring-2 focus-visible:[&>span]:ring-cream ${dragging ? 'scale-110' : 'hover:scale-105'}`}
          >
            <span className="absolute size-9 rotate-45 bg-black ring-1 ring-white/70 shadow-[0_6px_18px_-4px_rgb(0_0_0/0.6)]" aria-hidden />
            <svg viewBox="0 0 24 24" className="relative size-5 text-white" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
      </div>
      <p className="mt-3 text-center text-[0.8rem] text-muted" aria-hidden>{labels.hint}</p>
    </div>
  );
}
