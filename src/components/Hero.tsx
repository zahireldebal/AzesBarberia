import type { Dict } from '@/i18n/es';
import { BUSINESS, GOOGLE_REVIEWS_URL } from '@/data/business';
import { SERVICES } from '@/data/services';
import { srcSet, imageEntry } from '@/lib/images';
import { BookLink } from './BookLink';
import { Clock, Pin, Star } from './Icons';

type Props = { t: Dict; bookHref: string };

export function Hero({ t, bookHref }: Props) {
  const salon = imageEntry('local-sillones');
  const rating = BUSINESS.rating.value.toLocaleString(t.locale, { minimumFractionDigits: 1 });

  return (
    <section className="theme-dark relative isolate flex min-h-[100svh] flex-col overflow-hidden md:min-h-[104svh]" aria-labelledby="hero-title">
      {/* The shop floor under the hexagonal light ceiling: the most recognisable
          view of Azes. The picture bleeds 3% past each side to hide the thin dark
          edge left by the source capture. */}
      <picture className="hero-parallax absolute inset-y-0 -inset-x-[3%] -z-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/local-sillones-768.webp"
          srcSet={srcSet('local-sillones')}
          sizes="106vw"
          width={salon.width}
          height={salon.height}
          alt={t.hero.imageAlt}
          fetchPriority="high"
          decoding="sync"
          className="hero-img size-full object-cover object-[45%_30%] md:object-[50%_34%]"
        />
      </picture>
      <div aria-hidden className="grain absolute inset-0 -z-20" />
      {/* Scrim: dark over the photo so the logo and text read, then the bottom
          fades through grey into the light band of the next section. */}
      <div aria-hidden className="hero-shade absolute inset-0 -z-10" />

      <div className="hero-fade wrap flex flex-1 flex-col items-center justify-end pb-36 pt-28 text-center sm:pb-36 md:justify-center md:pb-44">
        <h1 id="hero-title" className="w-[min(78vw,26rem)] md:w-[30rem]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo-light-640.webp"
            srcSet="/img/logo-light-320.webp 320w, /img/logo-light-640.webp 640w, /img/logo-light-960.webp 960w"
            sizes="(min-width: 768px) 480px, 78vw"
            width={953}
            height={829}
            alt={t.hero.logoAlt}
            className="hero-logo h-auto w-full drop-shadow-[0_4px_24px_rgb(0_0_0/0.6)]"
            fetchPriority="high"
          />
        </h1>

        <div className="hero-rule mt-7 h-px w-40 bg-gradient-to-r from-transparent via-gold to-transparent" aria-hidden />

        <p className="hero-rise mt-6 font-display text-[1.6rem] font-semibold leading-tight tracking-[0.04em] text-cream sm:text-3xl" style={{ '--i': 0 } as React.CSSProperties}>
          {t.hero.tagline}
        </p>
        <p className="hero-rise mt-3 max-w-[34rem] text-[1rem] text-cream/80 sm:text-lg" style={{ '--i': 1 } as React.CSSProperties}>
          {t.hero.lead}
        </p>

        <div className="hero-rise mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center" style={{ '--i': 2 } as React.CSSProperties}>
          <BookLink href={bookHref} newTabLabel={t.book.newTab}>{t.book.primary}</BookLink>
          <a href="#equipo" className="btn btn-line">{t.hero.secondary}</a>
        </div>

        <ul
          className="hero-rise mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.9rem] text-cream/85"
          style={{ '--i': 3 } as React.CSSProperties}
        >
          <li className="font-semibold text-cream">
            {t.hero.pricesFrom} <span className="tabular text-gold-hi">$U {Math.min(...SERVICES.filter((s) => s.id !== 'barba').map((s) => s.priceFrom)).toLocaleString(t.locale)}</span>
          </li>
          <li>
            {/* Shortcut straight to the Google reviews */}
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-1.5 text-cream/85 no-underline transition-colors hover:text-gold-hi"
            >
              <Star className="text-gold-hi" />
              <span className="tabular font-semibold text-cream group-hover:text-gold-hi">{rating}</span>
              <span className="underline decoration-gold/50 underline-offset-4 group-hover:decoration-gold-hi">
                {t.hero.ratingLabel.replace('{n}', BUSINESS.rating.count.toLocaleString(t.locale))}
              </span>
              <span className="sr-only">{t.reviews.newTab}</span>
            </a>
          </li>
          <li className="flex items-center gap-1.5"><Clock className="text-gold" />{t.hero.hours}</li>
          <li className="flex items-center gap-1.5"><Pin className="text-gold" />{BUSINESS.street}, {BUSINESS.city}</li>
        </ul>
      </div>
    </section>
  );
}
