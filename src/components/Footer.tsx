import type { Dict } from '@/i18n/es';
import { BUSINESS, whatsappUrl } from '@/data/business';
import { BookLink } from './BookLink';
import { Instagram, WhatsApp } from './Icons';
import { SuitRule } from './Suits';

export function Footer({ t, bookHref }: { t: Dict; bookHref: string }) {
  const links = [
    ['#servicios', t.nav.services],
    ['#equipo', t.nav.team],
    ['#productos', t.nav.products],
    ['#local', t.nav.location],
    ['#preguntas', t.nav.faq],
  ] as const;

  return (
    <footer className="border-t border-line pb-28 pt-20 lg:pb-12">
      <div className="wrap">
        <div className="flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-light-640.webp" alt="Azes Barbería" width={640} height={557} loading="lazy" className="h-auto w-56" />
          <SuitRule className="mt-8 w-full max-w-md" />
          <BookLink href={bookHref} newTabLabel={t.book.newTab} className="btn btn-gold mt-8">{t.book.primary}</BookLink>
        </div>

        <div className="mt-14 grid gap-10 text-center sm:grid-cols-3 sm:text-left">
          <nav aria-label={t.nav.menu}>
            <ul className="space-y-1">
              {links.map(([href, label]) => (
                <li key={href}><a href={href} className="inline-block py-1.5 text-cream/85 no-underline hover:text-gold-hi">{label}</a></li>
              ))}
            </ul>
          </nav>
          <div className="text-cream/85 sm:text-center">
            <p>{BUSINESS.street}, {BUSINESS.corner}</p>
            <p>{BUSINESS.city}, Uruguay</p>
            <p className="mt-3">{t.hero.hours}</p>
          </div>
          <div className="flex flex-col items-center gap-4 sm:items-end">
            <a href={`tel:${BUSINESS.phoneE164}`} className="tabular text-cream/85 hover:text-gold-hi">{BUSINESS.phoneDisplay}</a>
            <div className="flex gap-3">
            <a href={BUSINESS.instagram} target="_blank" rel="noopener" className="inline-flex size-12 items-center justify-center border border-line text-2xl text-cream hover:border-gold hover:text-gold-hi">
              <Instagram /><span className="sr-only">{t.footer.follow}</span>
            </a>
            <a href={whatsappUrl(t.whatsappHello)} target="_blank" rel="noopener" className="inline-flex size-12 items-center justify-center border border-line text-2xl text-cream hover:border-gold hover:text-gold-hi">
              <WhatsApp /><span className="sr-only">{t.footer.whatsapp}</span>
            </a>
            </div>
          </div>
        </div>

        <p className="mt-14 border-t border-line pt-8 text-center text-[0.85rem] text-muted">{t.footer.rights}</p>
      </div>
    </footer>
  );
}
