import type { Metadata, Viewport } from 'next';
import type { Dict } from '@/i18n/es';
import { LANGS, SITE_URL, localePath, type Lang } from '@/data/business';

export const viewport: Viewport = {
  themeColor: '#0e0e0f',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

/** Open Graph locale per language. */
const OG_LOCALE: Record<Lang, string> = { es: 'es_UY', en: 'en_US', pt: 'pt_BR' };
/** hreflang code per language (Portuguese is the Brazilian variant). */
export const HREFLANG: Record<Lang, string> = { es: 'es', en: 'en', pt: 'pt-BR' };

export function buildMetadata(t: Dict): Metadata {
  const lang = t.lang as Lang;
  const path = localePath(lang);
  const languages: Record<string, string> = Object.fromEntries(LANGS.map((l) => [HREFLANG[l], localePath(l)]));
  languages['x-default'] = '/';
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: { canonical: path, languages },
    openGraph: {
      type: 'website',
      url: path,
      siteName: 'Azes Barbería',
      title: t.meta.title,
      description: t.meta.description,
      locale: OG_LOCALE[lang],
      alternateLocale: LANGS.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description, images: ['/og.jpg'] },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}
