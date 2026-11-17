import type { Dict } from '@/i18n/es';
import { BUSINESS, SITE_URL, bookingUrl, type Lang } from '@/data/business';
import { SERVICES } from '@/data/services';
import { Header } from './Header';
import { Hero } from './Hero';
import { Services } from './Services';
import { Team } from './Team';
import { Products } from './Products';
import { BeforeAfter } from './BeforeAfter';
import { Location } from './Location';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';
import { MobileBar } from './MobileBar';
import { MotionProvider } from './MotionProvider';

function jsonLd(lang: Lang, t: Dict) {
  const url = lang === 'es' ? `${SITE_URL}/` : `${SITE_URL}/en/`;
  return {
    '@context': 'https://schema.org',
    '@type': ['HairSalon', 'LocalBusiness'],
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS.name,
    description: t.meta.description,
    url,
    image: `${SITE_URL}/og.jpg`,
    logo: `${SITE_URL}/img/logo-dark-640.webp`,
    telephone: BUSINESS.phoneE164,
    foundingDate: String(BUSINESS.founded),
    priceRange: '$U 250 – $U 850',
    currenciesAccepted: 'UYU',
    paymentAccepted: 'Cash, Credit Card, Debit Card',
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${BUSINESS.street}, ${BUSINESS.corner}`,
      addressLocality: BUSINESS.city,
      addressRegion: BUSINESS.region,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: BUSINESS.geo.lat, longitude: BUSINESS.geo.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    sameAs: [BUSINESS.instagram],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: BUSINESS.rating.value,
      reviewCount: BUSINESS.rating.count,
      bestRating: 5,
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t.services.title,
      itemListElement: SERVICES.map((s) => ({
        '@type': 'Offer',
        priceCurrency: 'UYU',
        price: s.priceFrom,
        url: bookingUrl(lang, { serviceId: s.freshaId }),
        itemOffered: { '@type': 'Service', name: s.name[lang], description: s.description[lang] },
      })),
    },
    potentialAction: {
      '@type': 'ReserveAction',
      target: { '@type': 'EntryPoint', urlTemplate: bookingUrl(lang), inLanguage: lang, actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'] },
      result: { '@type': 'Reservation', name: t.book.primary },
    },
  };
}

export function Site({ t, lang }: { t: Dict; lang: Lang }) {
  const bookHref = bookingUrl(lang);
  const homeHref = lang === 'es' ? '/' : '/en/';
  const altLangHref = lang === 'es' ? '/en/' : '/';

  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang, t)) }} />
      <Header t={t} bookHref={bookHref} homeHref={homeHref} altLangHref={altLangHref} />
      <main id="contenido">
        <Hero t={t} bookHref={bookHref} />
        <Services t={t} lang={lang} bookHref={bookHref} />
        <Team t={t} lang={lang} />
        {/* The room is the shop's strongest picture: shown right after the team */}
        <Location t={t} />
        <Products t={t} lang={lang} />
        <BeforeAfter t={t} lang={lang} />
        <FaqSection t={t} lang={lang} />
      </main>
      <Footer t={t} bookHref={bookHref} />
      <MobileBar t={t} bookHref={bookHref} />
    </MotionProvider>
  );
}
