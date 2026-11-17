import type { Dict } from '@/i18n/es';
import { BUSINESS, GOOGLE_REVIEWS_URL, GOOGLE_WRITE_REVIEW_URL, type Lang } from '@/data/business';
import { REVIEWS, REVIEW_TOPICS } from '@/data/reviews';
import { ExternalIcon, Star } from './Icons';
import { SectionHead } from './SectionHead';

function Stars({ n, className = '' }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex gap-1 text-gold-hi ${className}`} aria-hidden>
      {[1, 2, 3, 4, 5].map((i) => <Star key={i} className={i <= n ? '' : 'opacity-25'} />)}
    </span>
  );
}

/** Google rating: the score, the per-star breakdown, what people mention, and real quotes when supplied. */
export function Reviews({ t, lang }: { t: Dict; lang: Lang }) {
  const r = BUSINESS.rating;
  const tr = t.reviews;
  const score = r.value.toLocaleString(t.locale, { minimumFractionDigits: 1 });
  const count = r.count.toLocaleString(t.locale);

  return (
    <section id="opiniones" className="section" aria-labelledby="opiniones-title">
      <div className="wrap">
        <SectionHead id="opiniones-title" title={tr.title} intro={tr.intro} />

        <div className="mx-auto mt-14 grid max-w-4xl items-center gap-12 md:grid-cols-[auto_1fr] md:gap-16">
          {/* Score block */}
          <div className="reveal flex flex-col items-center text-center md:border-r md:border-line md:pr-16">
            <p className="tabular font-display text-[5.5rem] font-semibold leading-none text-gold-hi sm:text-[6.5rem]">{score}</p>
            <Stars n={Math.round(r.value)} className="mt-4 text-2xl" />
            <p className="mt-3 text-muted">
              <span className="sr-only">{tr.scoreLabel.replace('{score}', score)} </span>
              {tr.basedOn.replace('{n}', count)}
            </p>
            <GoogleMark className="mt-4" label={tr.onGoogle} />
          </div>

          {/* Breakdown + topics */}
          <div className="reveal" style={{ '--i': 1 } as React.CSSProperties}>
            <dl className="space-y-2.5">
              {([5, 4, 3, 2, 1] as const).map((s) => {
                const n = r.breakdown[s];
                const pct = r.count ? (n / r.count) * 100 : 0;
                return (
                  <div key={s} className="flex items-center gap-4">
                    <dt className="tabular flex w-10 shrink-0 items-center gap-1 text-[0.95rem] text-cream/85">
                      {s}<Star className="text-[0.8em] text-gold" />
                      <span className="sr-only">{tr.stars}</span>
                    </dt>
                    <dd className="flex flex-1 items-center gap-4">
                      <span className="relative h-1.5 flex-1 overflow-hidden bg-line" aria-hidden>
                        <span className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold to-gold-hi" style={{ width: `${pct}%` }} />
                      </span>
                      <span className="tabular w-9 text-right text-[0.9rem] text-muted">{n}</span>
                    </dd>
                  </div>
                );
              })}
            </dl>

            <h3 className="mt-10 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-gold-hi">{tr.topicsTitle}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {REVIEW_TOPICS.map((tp) => (
                <li key={tp.es} className="border border-line px-3.5 py-1.5 text-[0.9rem] text-cream/90">
                  {tp[lang]} <span className="tabular text-muted">· {tp.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Real quotes, only when the client supplies them (src/data/reviews.ts) */}
        {REVIEWS.length > 0 ? (
          <ul className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
            {REVIEWS.map((rv, i) => (
              <li key={rv.author + i} className="reveal flex flex-col border border-line bg-ink-2 p-6" style={{ '--i': i } as React.CSSProperties}>
                <Stars n={rv.stars} className="text-base" />
                <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-cream/90">
                  “{lang === 'en' && rv.textEn ? rv.textEn : rv.text}”
                </blockquote>
                <p className="mt-5 text-[0.85rem] font-semibold uppercase tracking-[0.12em] text-muted">
                  {rv.author}{rv.when ? <span className="font-normal normal-case tracking-normal"> · {rv.when}</span> : null}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="reveal mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener" className="btn btn-line">
            {tr.seeAll}
            <ExternalIcon className="size-[0.95em] opacity-75" />
            <span className="sr-only">{tr.newTab}</span>
          </a>
          <a href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener" className="btn btn-line">
            {tr.write}
            <ExternalIcon className="size-[0.95em] opacity-75" />
            <span className="sr-only">{tr.newTab}</span>
          </a>
        </div>
      </div>
    </section>
  );
}

/** A small "Google" wordmark set in the site's own type, so the source is clear without the logo raster. */
function GoogleMark({ className = '', label }: { className?: string; label: string }) {
  return (
    <span className={`inline-flex items-center gap-2 border border-line px-3 py-1 text-[0.78rem] font-bold uppercase tracking-[0.14em] text-cream/80 ${className}`}>
      <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden>
        <path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3Z" />
        <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22Z" />
        <path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14Z" />
        <path fill="#EA4335" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.8-2.8A10 10 0 0 0 3.1 7.4L6.4 10C7.2 7.7 9.4 6 12 6Z" />
      </svg>
      {label}
    </span>
  );
}
