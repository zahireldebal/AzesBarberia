'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Dict } from '@/i18n/es';
import { GALLERY } from '@/data/gallery';
import { BUSINESS, type Lang } from '@/data/business';
import { Img } from './Img';
import { Lightbox } from './Lightbox';
import { Instagram, Zoom } from './Icons';
import { SectionHead } from './SectionHead';

export function Gallery({ t, lang }: { t: Dict; lang: Lang }) {
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const items = GALLERY.map((g) => ({ name: g.image, alt: g.alt[lang] }));

  return (
    <section id="galeria" className="section" aria-labelledby="galeria-title">
      <div className="wrap">
        <SectionHead id="galeria-title" title={t.gallery.title} intro={t.gallery.intro} />

        <ul className="mt-14 grid grid-cols-3 gap-1.5 sm:gap-2 md:grid-cols-4">
          {items.map((it, i) => (
            <li key={it.name} className="reveal" style={{ '--i': i % 4 } as React.CSSProperties}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group relative block aspect-[3/4] w-full overflow-hidden bg-ink-2"
              >
                <motion.div layoutId={reduce ? undefined : `galeria-${it.name}`} className="size-full">
                  <Img
                    name={it.name}
                    alt=""
                    sizes="(min-width: 768px) 280px, 33vw"
                    className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.05]"
                  />
                </motion.div>
                <span className="absolute inset-0 flex items-center justify-center bg-ink/0 text-2xl text-cream opacity-0 transition-[opacity,background-color] duration-300 group-hover:bg-ink/35 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Zoom />
                </span>
                <span className="sr-only">{t.gallery.open}: {it.alt}</span>
              </button>
            </li>
          ))}
          <li className="reveal" style={{ '--i': 3 } as React.CSSProperties}>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noopener"
              className="group flex aspect-[3/4] w-full flex-col items-center justify-center gap-3 border border-gold/40 p-3 text-center no-underline transition-colors hover:border-gold hover:bg-ink-2"
            >
              <Instagram className="text-3xl text-gold-hi" />
              <span className="font-display text-[0.95rem] uppercase leading-snug tracking-[0.08em] text-cream sm:text-lg">{t.gallery.follow}</span>
              <span className="text-[0.8rem] text-muted">{BUSINESS.instagramHandle}</span>
            </a>
          </li>
        </ul>
      </div>

      <Lightbox group="galeria" items={items} index={index} onChange={setIndex} labels={t.lightbox} />
    </section>
  );
}
