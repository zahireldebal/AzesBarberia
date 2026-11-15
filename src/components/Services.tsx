import type { Dict } from '@/i18n/es';
import { SERVICES } from '@/data/services';
import { bookingUrl, type Lang } from '@/data/business';
import { BookLink } from './BookLink';
import { SectionHead, formatPrice } from './SectionHead';

type Props = { t: Dict; lang: Lang; bookHref: string };

function duration(min: number, t: Dict) {
  return min >= 60 ? `${min / 60} ${t.services.hour}` : `${min} ${t.services.minutes}`;
}

export function Services({ t, lang, bookHref }: Props) {
  return (
    <section id="servicios" className="section" aria-labelledby="servicios-title">
      <div className="wrap">
        <SectionHead id="servicios-title" title={t.services.title} intro={t.services.intro} />

        <ol className="mx-auto mt-14 max-w-3xl border-y border-line">
          {SERVICES.map((s, i) => (
            <li key={s.id} className="reveal border-b border-line py-7 last:border-b-0 sm:py-8" style={{ '--i': i } as React.CSSProperties}>
              <div className="flex items-baseline">
                <h3 className="font-display text-[1.25rem] uppercase tracking-[0.05em] sm:text-2xl sm:tracking-[0.06em]">{s.name[lang]}</h3>
                <span className="leader" aria-hidden />
                <p className="tabular flex shrink-0 flex-col items-end leading-none sm:flex-row sm:items-baseline sm:gap-1.5">
                  <span className="text-[0.7rem] uppercase tracking-[0.14em] text-muted sm:text-[0.8rem]">{t.services.from}</span>
                  <span className="mt-1 font-display text-[1.25rem] font-semibold text-gold-hi sm:mt-0 sm:text-2xl">{formatPrice(s.priceFrom, t.locale)}</span>
                </p>
              </div>
              <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                <div className="max-w-xl">
                  <p className="text-[0.97rem] text-muted">{s.description[lang]}</p>
                  <p className="mt-2 text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-cream/70">
                    <span className="tabular">{duration(s.minutes, t)}</span>
                    {s.options?.map((o) => <span key={o.es} className="normal-case tracking-normal font-normal text-muted"> · {o[lang]}</span>)}
                  </p>
                </div>
                <BookLink
                  href={bookingUrl(lang, { serviceId: s.freshaId })}
                  newTabLabel={t.book.newTab}
                  ariaLabel={`${t.services.bookThis}: ${s.name[lang]}`}
                  className="btn btn-line btn-sm self-start sm:self-auto"
                >
                  {t.services.bookThis}
                </BookLink>
              </div>
            </li>
          ))}
        </ol>

        <div className="reveal mx-auto mt-10 flex max-w-3xl flex-col items-center gap-4 text-center">
          <p className="max-w-xl text-[0.95rem] text-muted">{t.services.note} {t.book.support}</p>
          <BookLink href={bookHref} newTabLabel={t.book.newTab}>{t.book.primary}</BookLink>
        </div>
      </div>
    </section>
  );
}
