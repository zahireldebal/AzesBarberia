import type { Dict } from '@/i18n/es';
import { BUSINESS, GOOGLE_REVIEWS_URL, SITE_URL, bookingUrl, localePath, type Lang } from '@/data/business';
import { SERVICES } from '@/data/services';
import { Header } from './Header';
import { Hero } from './Hero';
import { Team } from './Team';
import { Products } from './Products';
import { BeforeAfter } from './BeforeAfter';
import { Location } from './Location';
import { Reviews } from './Reviews';
import { FaqSection } from './FaqSection';
import { Footer } from './Footer';
import { MobileBar } from './MobileBar';
import { MotionProvider } from './MotionProvider';

function jsonLd(lang: Lang, t: Dict) {
  const url = `${SITE_URL}${localePath(lang)}`;
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
    // No aggregateRating: the reviews live on Google, and Google's structured-data
    // rules forbid marking up ratings collected by a third party on your own site.
    sameAs: [BUSINESS.instagram, GOOGLE_REVIEWS_URL],
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
  const homeHref = localePath(lang);

  return (
    <MotionProvider>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(lang, t)) }} />
      <Header t={t} bookHref={bookHref} homeHref={homeHref} />
      <main id="contenido">
        <Hero t={t} bookHref={bookHref} />
        {/* The barbers come first: people pick who cuts them before what */}
        <Team t={t} lang={lang} />
        {/* BRB products and their before/after sit together, above the reviews */}
        <Products t={t} lang={lang} />
        <BeforeAfter t={t} lang={lang} />
        <Reviews t={t} lang={lang} />
        <Location t={t} />
        <FaqSection t={t} lang={lang} />
      </main>
      <Footer t={t} bookHref={bookHref} />
      <MobileBar t={t} bookHref={bookHref} />
    </MotionProvider>
  );
}
