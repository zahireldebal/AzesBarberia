import type { Dict } from '@/i18n/es';
import { TEAM } from '@/data/team';
import { bookingUrl, type Lang } from '@/data/business';
import { BookLink } from './BookLink';
import { Img } from './Img';
import { SectionHead, formatPrice } from './SectionHead';

type Props = { t: Dict; lang: Lang };

export function Team({ t, lang }: Props) {
  return (
    <section id="equipo" className="section bg-ink-2" aria-labelledby="equipo-title">
      <div className="wrap">
        <SectionHead id="equipo-title" title={t.team.title} intro={t.team.intro} />

        {/* Five identical frames in a row: only name, photo and price change */}
        {/* flex-wrap + centred so an odd last row sits in the middle */}
        <ul className="mt-14 flex flex-wrap justify-center gap-x-4 gap-y-10 lg:flex-nowrap lg:gap-5">
          {TEAM.map((b, i) => (
            <li
              key={b.id}
              className="reveal group flex w-[calc(50%-0.5rem)] flex-col sm:w-[calc(33.333%-0.7rem)] lg:w-auto lg:flex-1"
              style={{ '--i': i } as React.CSSProperties}
            >
              <div className="frame aspect-[4/5]">
                <Img
                  name={b.image}
                  alt={`${t.team.photoAlt} ${b.name}`}
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 46vw"
                  className="size-full object-cover grayscale-[35%] transition-[transform,filter] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.04] group-hover:grayscale-0"
                />
              </div>
              <h3 className="mt-4 font-display text-xl uppercase tracking-[0.08em]">{b.name}</h3>
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
