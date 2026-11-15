import type { Dict } from '@/i18n/es';
import { BUSINESS } from '@/data/business';
import { SERVICES } from '@/data/services';
import { srcSet, imageEntry } from './Img';
import { BookLink } from './BookLink';
import { Clock, Pin, Star } from './Icons';

type Props = { t: Dict; bookHref: string };

export function Hero({ t, bookHref }: Props) {
  const fachada = imageEntry('fachada');
  const rating = BUSINESS.rating.value.toLocaleString(t.locale, { minimumFractionDigits: 1 });

  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      {/* The façade (hero.png) on every screen size */}
      <picture className="absolute inset-0 -z-20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/fachada-768.webp"
          srcSet={srcSet('fachada')}
          sizes="100vw"
          width={fachada.width}
          height={fachada.height}
          alt={t.hero.imageAlt}
          fetchPriority="high"
          decoding="sync"
          className="hero-img size-full object-cover object-[50%_35%] md:object-[50%_42%]"
        />
      </picture>
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(14_14_15/0.55)_0%,rgb(14_14_15/0.35)_30%,rgb(14_14_15/0.82)_62%,#0e0e0f_100%)] md:bg-[radial-gradient(ellipse_at_50%_42%,rgb(14_14_15/0.5),rgb(14_14_15/0.72)_75%),linear-gradient(180deg,transparent_60%,#0e0e0f)]"
      />

      <div className="wrap flex flex-1 flex-col items-center justify-end pb-28 pt-28 text-center sm:pb-20 md:justify-center md:pb-16">
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
          <a href="#servicios" className="btn btn-line">{t.hero.secondary}</a>
        </div>

        <ul
          className="hero-rise mt-7 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[0.9rem] text-cream/85"
          style={{ '--i': 3 } as React.CSSProperties}
        >
          <li className="font-semibold text-cream">
            {t.hero.pricesFrom} <span className="tabular text-gold-hi">$U {Math.min(...SERVICES.filter((s) => s.id !== 'barba').map((s) => s.priceFrom)).toLocaleString(t.locale)}</span>
          </li>
          <li className="flex items-center gap-1.5">
            <Star className="text-gold-hi" />
            <span className="tabular font-semibold text-cream">{rating}</span> {t.hero.ratingLabel}
          </li>
          <li className="flex items-center gap-1.5"><Clock className="text-gold" />{t.hero.hours}</li>
          <li className="flex items-center gap-1.5"><Pin className="text-gold" />{BUSINESS.street}, {BUSINESS.city}</li>
        </ul>
      </div>
    </section>
  );
}
