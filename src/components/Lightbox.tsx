'use client';

import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion, type PanInfo } from 'framer-motion';
import { imageEntry, srcSet, largestSrc } from './Img';
import { ChevronLeft, ChevronRight, Close } from './Icons';

export type LightboxItem = { name: string; alt: string; caption?: string };

type Labels = { close: string; prev: string; next: string; of: string; dialog: string };

type Props = {
  group: string;
  items: LightboxItem[];
  index: number | null;
  onChange: (i: number | null) => void;
  labels: Labels;
};

const EASE = [0.16, 1, 0.3, 1] as const;

export function Lightbox({ group, items, index, onChange, labels }: Props) {
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const open = index !== null;
  const count = items.length;

  const go = useCallback(
    (d: number) => { if (index !== null) onChange((index + d + count) % count); },
    [index, count, onChange],
  );

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.current?.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    return () => {
      document.body.style.overflow = prev;
      opener.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onChange(null);
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === 'Tab' && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>('button');
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, go, onChange]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  const item = index !== null ? items[index] : null;
  const entry = item ? imageEntry(item.name) : null;

  return (
    <AnimatePresence>
      {open && item && entry && (
        <motion.div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label={labels.dialog}
          className="fixed inset-0 z-[70] flex flex-col bg-ink/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => { if (e.target === e.currentTarget) onChange(null); }}
        >
          <div className="flex items-center justify-between px-4 py-3 text-cream">
            <p className="tabular text-[0.9rem] tracking-[0.12em]" aria-live="polite">
              {index! + 1} / {count}
            </p>
            <button
              type="button"
              data-autofocus
              onClick={() => onChange(null)}
              className="inline-flex size-12 items-center justify-center text-2xl hover:text-gold-hi"
            >
              <Close />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 pb-4 sm:px-20" onClick={(e) => { if (e.target === e.currentTarget) onChange(null); }}>
            <motion.figure
              key={item.name}
              layoutId={reduce ? undefined : `${group}-${item.name}`}
              className="relative flex max-h-full max-w-full flex-col items-center"
              drag={count > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={onDragEnd}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={largestSrc(item.name)}
                srcSet={srcSet(item.name)}
                sizes="100vw"
                width={entry.width}
                height={entry.height}
                alt={item.alt}
                draggable={false}
                className="max-h-[calc(100svh-9rem)] w-auto max-w-full select-none object-contain shadow-[0_30px_80px_-20px_rgb(0_0_0/0.9)]"
              />
              {item.caption ? <figcaption className="mt-3 text-center text-[0.9rem] text-muted">{item.caption}</figcaption> : null}
            </motion.figure>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-1 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-2xl text-cream hover:text-gold-hi sm:left-4"
                >
                  <ChevronLeft />
                  <span className="sr-only">{labels.prev}</span>
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-1 top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-ink/70 text-2xl text-cream hover:text-gold-hi sm:right-4"
                >
                  <ChevronRight />
                  <span className="sr-only">{labels.next}</span>
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
