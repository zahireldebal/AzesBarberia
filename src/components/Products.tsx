'use client';

import { useMemo, useState } from 'react';
import { m, useReducedMotion } from 'framer-motion';
import type { Dict } from '@/i18n/es';
import { PRODUCTS, PRODUCT_CATEGORIES, type ProductCategory } from '@/data/products';
import { whatsappUrl, type Lang } from '@/data/business';
import { Img } from './Img';
import { Lightbox } from './Lightbox';
import { WhatsApp, Zoom } from './Icons';
import { SectionHead, formatPrice } from './SectionHead';

export function Products({ t, lang }: { t: Dict; lang: Lang }) {
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState<ProductCategory | 'all'>('all');
  const [index, setIndex] = useState<number | null>(null);

  const categories = useMemo(() => [...new Set(PRODUCTS.map((p) => p.category))], []);
  const visible = PRODUCTS.filter((p) => filter === 'all' || p.category === filter);
  // Only products with a photo go to the lightbox.
  const withImage = visible.filter((p) => p.image);
  const items = withImage.map((p) => ({ name: p.image!, alt: p.imageAlt?.[lang] ?? '', caption: `${p.brand} ${p.name}` }));

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
                className={`btn btn-sm ${filter === c ? 'btn-cream' : 'btn-line'}`}
              >
                {c === 'all' ? t.products.all : PRODUCT_CATEGORIES[c][lang]}
              </button>
            ))}
          </div>
        )}

        <ul className="mx-auto mt-14 grid max-w-4xl gap-12 md:grid-cols-2 md:gap-12">
          {visible.map((p, i) => (
            <li key={p.id} className="reveal lift flex flex-col" style={{ '--i': i } as React.CSSProperties}>
              {p.image ? (
              <button
                type="button"
                onClick={() => setIndex(withImage.indexOf(p))}
                className="group frame spot block aspect-square w-full"
              >
                <span className="spot-glow" aria-hidden />
                <m.div layoutId={reduce ? undefined : `productos-${p.image}`} className="size-full">
                  <Img
                    name={p.image}
                    alt=""
                    sizes="(min-width: 768px) 420px, 92vw"
                    className="size-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
                  />
                </m.div>
                <span className="absolute bottom-4 right-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-ink/75 text-xl text-cream transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-110 group-hover:rotate-90">
                  <Zoom />
                </span>
                <span className="sr-only">{t.products.enlarge} {p.brand} {p.name}</span>
              </button>
              ) : (
                // Typographic label panel until a clean product photo exists
                <div className="frame flex aspect-[16/9] w-full flex-col items-center justify-center gap-4 bg-ink-3 px-6 text-center md:aspect-[4/5] md:gap-5" aria-hidden>
                  <span className="font-display text-6xl tracking-[0.12em] text-gold">{p.brand}</span>
                  <span className="h-px w-16 bg-gold/60" />
                  <span className="font-display text-2xl uppercase tracking-[0.18em] text-cream">{p.name}</span>
                  {p.size ? <span className="text-[0.85rem] uppercase tracking-[0.2em] text-muted">{p.size}</span> : null}
                </div>
              )}

              <div className="mt-6 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-0">
                <h3 className="font-display text-[1.4rem] uppercase leading-tight tracking-[0.05em] sm:text-2xl sm:tracking-[0.06em]">
                  <span className="text-gold">{p.brand}</span> {p.name}
                </h3>
                <span className="leader hidden sm:block" aria-hidden />
                {p.price ? <p className="tabular shrink-0 font-display text-xl font-semibold text-gold-hi sm:text-2xl">{formatPrice(p.price, t.locale)}</p> : null}
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
      </div>

      <Lightbox group="productos" items={items} index={index} onChange={setIndex} labels={t.lightbox} />
    </section>
  );
}
