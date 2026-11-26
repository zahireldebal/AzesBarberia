import type { Dict } from '@/i18n/es';
import { TEAM } from '@/data/team';
import { bookingUrl, type Lang } from '@/data/business';
import { BookLink } from './BookLink';
import { Img } from './Img';
import { SectionHead, formatPrice } from './SectionHead';

type Props = { t: Dict; lang: Lang };

export function Team({ t, lang }: Props) {
  return (
    <section id="equipo" className="section" aria-labelledby="equipo-title">
      <div className="wrap">
        <SectionHead id="equipo-title" title={t.team.title} intro={t.team.intro} />

        {/* Five identical frames in a row: only name, photo and price change */}
        {/* flex-wrap + centred so an odd last row sits in the middle */}
        <ul className="mt-14 flex flex-wrap justify-center gap-x-4 gap-y-10 lg:flex-nowrap lg:gap-5">
          {TEAM.map((b, i) => (
            <li
              key={b.id}
              className="reveal lift group flex w-[calc(50%-0.5rem)] flex-col sm:w-[calc(33.333%-0.7rem)] lg:w-auto lg:flex-1"
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className="frame spot aspect-[4/5]">
                <span className="spot-glow" aria-hidden />
                <Img
                  name={b.image}
                  alt={`${t.team.photoAlt} ${b.name}`}
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 46vw"
                  className="size-full object-cover transition-[transform] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:contrast-100"
                />
                {/* Black-and-white portraits make five photos taken in different
                    places read as one set; colour returns on hover. A low ink
                    gradient grounds each portrait in the band. */}
                <span aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/3 bg-gradient-to-t from-black/45 to-transparent transition-opacity duration-700 group-hover:opacity-0" />
              </div>
              <h3 className="mt-4 font-display text-xl uppercase tracking-[0.08em] transition-colors duration-300 group-hover:text-gold-hi">{b.name}</h3>
              {b.specialty ? <p className="text-[0.9rem] text-muted">{b.specialty[lang]}</p> : null}
              <p className="mt-1 text-[0.88rem] text-muted">
                {t.team.haircutFrom} <span className="tabular font-semibold text-gold-hi">{formatPrice(b.haircutFrom, t.locale)}</span>
              </p>
              <BookLink
                href={bookingUrl(lang, { barberId: b.freshaId })}
                newTabLabel={t.book.newTab}
                ariaLabel={`${t.team.bookWith} ${b.name}`}
                className="btn btn-line btn-sm mt-4 w-full"
              >
                {t.book.short}
              </BookLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
