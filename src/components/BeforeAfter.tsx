import type { Dict } from '@/i18n/es';
import { PRODUCTS } from '@/data/products';
import { SERVICES } from '@/data/services';
import { bookingUrl, whatsappUrl, type Lang } from '@/data/business';
import { BookLink } from './BookLink';
import { CompareSlider } from './CompareSlider';
import { WhatsApp } from './Icons';
import { SectionHead } from './SectionHead';

/** One comparison block per product that has a `showcase` pair. Photos are illustrative (BRB). */
export function BeforeAfter({ t, lang }: { t: Dict; lang: Lang }) {
  const haircut = SERVICES.find((s) => s.id === 'corte')!;
  const items = PRODUCTS.filter((p) => p.showcase);
  const ba = t.beforeAfter;

  return (
    <section id="antes-despues" className="section bg-ink-2" aria-labelledby="antes-despues-title">
      <div className="wrap">
        <SectionHead id="antes-despues-title" title={ba.title} intro={ba.intro} />

        <div className="mt-16 space-y-24 md:mt-20 md:space-y-32">
          {items.map((p, i) => {
            const sc = p.showcase!;
            const full = `${p.brand} ${p.name}`;
            const flip = i % 2 === 1;
            return (
              <article
                key={p.id}
                className="grid items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14"
                aria-labelledby={`ad-${p.id}`}
              >
                <div className={`reveal ${flip ? 'md:order-2' : ''}`}>
                  <CompareSlider
                    before={sc.before}
                    after={sc.after}
                    beforeAlt={sc.beforeAlt[lang]}
                    afterAlt={sc.afterAlt[lang]}
                    labels={{
                      before: ba.before,
                      after: ba.after,
                      slider: ba.sliderLabel.replace('{product}', full),
                      value: ba.sliderValue,
                      hint: ba.hint,
                    }}
                  />
                  <p className="mt-1 text-center text-[0.8rem] text-muted">{ba.illustrative}</p>
                </div>

                <div className={`reveal ${flip ? 'md:order-1' : ''}`} style={{ '--i': 1 } as React.CSSProperties}>
                  <h3 id={`ad-${p.id}`} className="font-display text-[1.75rem] uppercase leading-[1.1] tracking-[0.05em] sm:text-[2.1rem]">
                    <span className="text-gold">{p.brand}</span> {p.name}
                  </h3>
                  <p className="mt-5 text-lg text-cream/90">{sc.lead[lang]}</p>

                  {sc.steps ? (
                    <>
                      <h4 className="mt-8 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-gold-hi">{ba.howTitle}</h4>
                      <ol className="mt-3 space-y-3">
                        {sc.steps[lang].map((s, n) => (
                          <li key={s} className="flex gap-4">
                            <span className="tabular w-5 shrink-0 font-display text-xl leading-[1.3] text-gold" aria-hidden>{n + 1}</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ol>
                    </>
                  ) : null}

                  <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                    <BookLink href={bookingUrl(lang, { serviceId: haircut.freshaId })} newTabLabel={t.book.newTab}>
                      {ba.bookCut}
                    </BookLink>
                    <a href={whatsappUrl(ba.wantMessage.replace('{product}', full))} target="_blank" rel="noopener" className="btn btn-line">
                      <WhatsApp className="text-lg" />
                      {ba.want}
                    </a>
                  </div>
                  <p className="mt-3 text-[0.9rem] text-muted">{ba.addOnNote}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
