import type { Dict } from '@/i18n/es';
import { BUSINESS, MAPS_DIRECTIONS_URL } from '@/data/business';
import { Img } from './Img';
import { Card, Clock, ExternalIcon, Pin } from './Icons';
import { MapEmbed } from './MapEmbed';
import { SectionHead } from './SectionHead';

export function Location({ t }: { t: Dict }) {
  const byDay = new Map<number, { open: string; close: string }>(BUSINESS.hours.map((h) => [h.day, h]));

  return (
    <section id="local" className="section bg-ink-2" aria-labelledby="local-title">
      <div className="wrap">
        <SectionHead id="local-title" title={t.location.title} intro={t.location.lead} />

        {/* Photo mosaic: three portrait views of the floor and the mezzanine */}
        <div className="mt-14 grid grid-cols-2 gap-2 md:grid-cols-3">
          <div className="reveal frame group col-span-2 aspect-[4/3] md:col-span-1 md:aspect-[4/5]">
            <Img name="local-sillones" alt={t.location.photosAlt.sillones} sizes="(min-width: 768px) 33vw, 100vw" className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
          </div>
          <div className="reveal frame group aspect-[4/5]" style={{ '--i': 1 } as React.CSSProperties}>
            <Img name="local-espejo" alt={t.location.photosAlt.espejo} sizes="(min-width: 768px) 33vw, 50vw" className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
          </div>
          <div className="reveal frame group aspect-[4/5]" style={{ '--i': 2 } as React.CSSProperties}>
            <Img name="local-entrepiso" alt={t.location.photosAlt.entrepiso} sizes="(min-width: 768px) 33vw, 50vw" className="size-full object-cover transition-transform duration-[1200ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.06]" />
          </div>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-[1fr_1.15fr] md:gap-14">
          <div className="reveal space-y-9">
            <div>
              <h3 className="flex items-center gap-2 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-gold-hi"><Pin className="text-base" />{t.location.address}</h3>
              <address className="mt-3 not-italic text-lg">
                {BUSINESS.street}, {BUSINESS.corner}<br />
                {BUSINESS.city} {BUSINESS.postalCode}, Uruguay
              </address>
              <a href={MAPS_DIRECTIONS_URL} target="_blank" rel="noopener" className="btn btn-line btn-sm mt-4">
                {t.location.directions}
                <ExternalIcon className="size-[0.95em] opacity-75" />
              </a>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-gold-hi"><Clock className="text-base" />{t.location.hoursTitle}</h3>
              <dl className="mt-3 max-w-sm">
                {[1, 2, 3, 4, 5, 6, 7].map((d) => {
                  const h = byDay.get(d);
                  return (
                    <div key={d} className="flex items-baseline py-1.5">
                      <dt>{t.days[d]}</dt>
                      <span className="leader" aria-hidden />
                      <dd className={`tabular ${h ? '' : 'text-muted'}`}>{h ? `${h.open} – ${h.close}` : t.location.closed}</dd>
                    </div>
                  );
                })}
              </dl>
              <p className="mt-3 text-[0.95rem] text-muted">{t.location.walkIns}</p>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-[0.85rem] font-bold uppercase tracking-[0.14em] text-gold-hi"><Card className="text-base" />{t.location.payments}</h3>
              <p className="mt-3">{BUSINESS.payments.map((p) => t.location.paymentNames[p]).join(' · ')}</p>
            </div>
          </div>

          <div className="reveal" style={{ '--i': 1 } as React.CSSProperties}>
            <MapEmbed label={t.location.loadMap} note={t.location.mapNote} title={t.location.mapTitle} />
          </div>
        </div>
      </div>
    </section>
  );
}
