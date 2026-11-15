import type { Dict } from '@/i18n/es';
import { BUSINESS, profileUrl, type Lang } from '@/data/business';
import { ExternalIcon, Star } from './Icons';
import { SuitRule } from './Suits';

/** Only real reviews: the single public Fresha review at capture time. */
export function Reviews({ t, lang }: { t: Dict; lang: Lang }) {
  const { value, count } = BUSINESS.rating;
  return (
    <section className="section bg-ink-2" aria-labelledby="resenas-title">
      <div className="wrap">
        <figure className="reveal mx-auto max-w-3xl text-center">
          <h2 id="resenas-title" className="h-section">{t.reviews.title}</h2>
          <SuitRule className="mx-auto mt-5 max-w-xs" />
          <div className="mt-10 flex justify-center gap-1 text-2xl text-gold-hi" role="img" aria-label={`${value} ${t.reviews.rating}`}>
            {Array.from({ length: 5 }, (_, i) => <Star key={i} />)}
          </div>
          <blockquote className="mt-6 font-display text-[2rem] leading-tight tracking-[0.02em] text-cream sm:text-5xl">
            “Excelente servicio y atención”
          </blockquote>
          <figcaption className="mt-6 text-muted">
            <span className="font-semibold text-cream">Agustín B.</span> · {t.reviews.source} · {t.reviews.date}
          </figcaption>
          <p className="mt-8 text-[0.9rem] text-muted">
            <span className="tabular font-semibold text-cream">{value.toLocaleString(t.locale, { minimumFractionDigits: 1 })}</span> {t.reviews.rating} · {count} {count === 1 ? t.reviews.reviewsOne : t.reviews.reviewsMany}
          </p>
          <a href={profileUrl(lang)} target="_blank" rel="noopener" className="btn btn-line btn-sm mt-5">
            {t.reviews.seeAll}
            <ExternalIcon className="size-[0.95em] opacity-75" />
            <span className="sr-only"> {t.book.newTab}</span>
          </a>
        </figure>
      </div>
    </section>
  );
}
