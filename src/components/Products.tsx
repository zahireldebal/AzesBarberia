'use client';

import { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { Dict } from '@/i18n/es';
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategory } from '@/data/products';
import { whatsappUrl, type Lang } from '@/data/business';
import { Img } from './Img';
import { Lightbox } from './Lightbox';
import { WhatsApp, Zoom } from './Icons';
import { SectionHead, formatPrice } from './SectionHead';

export function Products({ t, lang, children }: { t: Dict; lang: Lang; children?: React.ReactNode }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<ProductCategory | 'all'>('all');
  const [index, setIndex] = useState<number | null>(null);

  const categories = useMemo(() => [...new Set(PRODUCTS.map((p) => p.category))], []);
  const visible = PRODUCTS.filter((p) => filter === 'all' || p.category === filter);
  const items = visible.map((p) => ({ name: p.image, alt: p.imageAlt[lang], caption: `${p.brand} ${p.name}` }));

  return (
    <section id="productos" className="section bg-ink-2" aria-labelledby="productos-title">
      <div className="wrap">
        <SectionHead id="productos-title" title={t.products.title} intro={t.products.intro} />

        {categories.length > 1 && (
          <div role="group" aria-label={t.products.filterLabel} className="mt-10 flex flex-wrap justify-center gap-2">
            {(['all', ...categories] as const).map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className={`btn btn-sm ${filter === c ? 'btn-gold' : 'btn-line'}`}
              >
                {c === 'all' ? t.products.all : PRODUCT_CATEGORIES[c][lang]}
              </button>
            ))}
          </div>
        )}

        <ul className="mx-auto mt-14 grid max-w-5xl gap-12 md:grid-cols-2 md:gap-10">
          {visible.map((p, i) => (
            <li key={p.id} className="reveal flex flex-col" style={{ '--i': i } as React.CSSProperties}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className="group frame block aspect-[4/5] w-full"
              >
                <motion.div layoutId={reduce ? undefined : `productos-${p.image}`} className="size-full">
                  <Img
                    name={p.image}
                    alt=""
                    sizes="(min-width: 768px) 460px, 92vw"
                    className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                </motion.div>
                <span className="absolute bottom-4 right-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-ink/75 text-xl text-cream">
                  <Zoom />
                </span>
                <span className="sr-only">{t.products.enlarge} {p.brand} {p.name}</span>
              </button>

              <div className="mt-6 flex items-baseline">
                <h3 className="font-display text-2xl uppercase tracking-[0.06em]">
                  <span className="text-gold">{p.brand}</span> {p.name}
                </h3>
                <span className="leader" aria-hidden />
                {p.price ? <p className="tabular shrink-0 font-display text-2xl font-semibold text-gold-hi">{formatPrice(p.price, t.locale)}</p> : null}
              </div>
              <p className="mt-1 text-[0.85rem] uppercase tracking-[0.12em] text-muted">
                {PRODUCT_CATEGORIES[p.category][lang]}{p.size ? ` · ${p.size}` : ''}
              </p>
              <p className="mt-4 text-[0.97rem]"><span className="text-muted">{t.products.forWhom}:</span> {p.forWhom[lang]}</p>
              <ul className="mt-3 space-y-1.5 text-[0.97rem] text-cream/90">
                {p.benefits[lang].map((b) => (
                  <li key={b} className="flex gap-3"><span aria-hidden className="mt-[0.7em] h-px w-3 shrink-0 bg-gold" />{b}</li>
                ))}
              </ul>
              <a
                href={whatsappUrl(t.products.askMessage.replace('{product}', `${p.brand} ${p.name}`))}
                target="_blank"
                rel="noopener"
                className="btn btn-line btn-sm mt-6 self-start"
              >
                <WhatsApp className="text-lg" />
                {t.products.ask}
              </a>
            </li>
          ))}
        </ul>

        {children}
      </div>

      <Lightbox group="productos" items={items} index={index} onChange={setIndex} labels={t.lightbox} />
    </section>
  );
}
