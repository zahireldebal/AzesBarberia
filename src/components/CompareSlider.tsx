'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Img, imageEntry } from './Img';

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
 * Before / after comparison. The "después" photo sits on top and is revealed
 * from the right edge; `pos` is the divider position in % from the left
 * (left of it = antes, right of it = después). Drag with mouse or finger
 * anywhere on the image, or focus the handle and use the arrow keys.
 * The first time it scrolls into view it plays a short demo sweep.
 */
export function CompareSlider({ before, after, beforeAlt, afterAlt, labels }: Props) {
  const reduce = useReducedMotion();
  const box = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false);
  const raf = useRef<number | null>(null);
  const { width, height } = imageEntry(before);

  const stopDemo = () => {
    touched.current = true;
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = null;
  };

  const fromClientX = useCallback((clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(clamp(((clientX - r.left) / r.width) * 100));
  }, []);

  // Demo sweep once in view: centre → reveal most of the antes → most of the después → centre.
  useEffect(() => {
    if (reduce || !box.current) return;
    const keyframes = [50, 82, 18, 50];
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || touched.current) return;
        io.disconnect();
        const seg = 900;
        const start = performance.now() + 350;
        const step = (now: number) => {
          if (touched.current) return;
          const t = Math.max(0, now - start);
          const i = Math.min(keyframes.length - 2, Math.floor(t / seg));
          const local = Math.min(1, (t - i * seg) / seg);
          setPos(keyframes[i] + (keyframes[i + 1] - keyframes[i]) * easeInOut(local));
          if (t < seg * (keyframes.length - 1)) raf.current = requestAnimationFrame(step);
        };
        raf.current = requestAnimationFrame(step);
      },
      { threshold: 0.55 },
    );
    io.observe(box.current);
    return () => { io.disconnect(); if (raf.current) cancelAnimationFrame(raf.current); };
  }, [reduce]);

  const onPointerDown = (e: React.PointerEvent) => {
    stopDemo();
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    fromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => { if (dragging) fromClientX(e.clientX); };
  const onPointerUp = () => setDragging(false);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const big = e.shiftKey ? 10 : 4;
    let next: number | null = null;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = pos - big;
    else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = pos + big;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = 100;
    if (next === null) return;
    e.preventDefault();
    stopDemo();
    setPos(clamp(next));
  };

  // Labels fade as the divider approaches their side.
  const beforeOpacity = Math.min(1, Math.max(0, (pos - 8) / 14));
  const afterOpacity = Math.min(1, Math.max(0, (92 - pos) / 14));
  const rounded = Math.round(pos);

  return (
    <div>
      <div
        ref={box}
        className={`frame relative select-none touch-pan-y ${dragging ? 'cursor-grabbing' : 'cursor-ew-resize'}`}
        style={{ aspectRatio: `${width} / ${height}` }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <Img name={before} alt={beforeAlt} sizes="(min-width: 768px) 560px, 92vw" className="pointer-events-none absolute inset-0 size-full object-cover" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <Img name={after} alt={afterAlt} sizes="(min-width: 768px) 560px, 92vw" className="size-full object-cover" />
        </div>

        <span
          className="pointer-events-none absolute left-4 top-4 z-10 bg-ink/80 px-3 py-1.5 font-display text-[0.8rem] uppercase tracking-[0.14em] text-cream transition-opacity duration-200"
          style={{ opacity: beforeOpacity }}
          aria-hidden
        >
          {labels.before}
        </span>
        <span
          className="pointer-events-none absolute right-4 top-4 z-10 bg-ink/80 px-3 py-1.5 font-display text-[0.8rem] uppercase tracking-[0.14em] text-cream transition-opacity duration-200"
          style={{ opacity: afterOpacity }}
          aria-hidden
        >
          {labels.after}
        </span>

        {/* Divider: a cream hairline with a gold diamond handle (the logo's suit) */}
        <div className="pointer-events-none absolute inset-y-0 z-20 w-0" style={{ left: `${pos}%` }}>
          <span className="absolute inset-y-0 -left-px w-0.5 bg-cream shadow-[0_0_12px_rgb(0_0_0/0.6)]" />
          <span
            role="slider"
            tabIndex={0}
            aria-label={labels.slider}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={rounded}
            aria-valuetext={labels.value.replace('{n}', String(rounded))}
            onKeyDown={onKeyDown}
            className={`pointer-events-auto absolute left-0 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center outline-none transition-transform duration-200 ease-[var(--ease-out-expo)] focus-visible:[&>span]:ring-2 focus-visible:[&>span]:ring-cream ${dragging ? 'scale-110' : 'hover:scale-105'}`}
          >
            <span className="absolute size-9 rotate-45 bg-gold shadow-[0_6px_18px_-4px_rgb(0_0_0/0.8)]" aria-hidden />
            <svg viewBox="0 0 24 24" className="relative size-5 text-ink" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
            </svg>
          </span>
        </div>
      </div>
      <p className="mt-3 text-center text-[0.8rem] text-muted" aria-hidden>{labels.hint}</p>
    </div>
  );
}
