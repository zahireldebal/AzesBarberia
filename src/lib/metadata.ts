import type { Metadata, Viewport } from 'next';
import type { Dict } from '@/i18n/es';
import { SITE_URL } from '@/data/business';

export const viewport: Viewport = {
  themeColor: '#0e0e0f',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export function buildMetadata(t: Dict): Metadata {
  const path = t.lang === 'es' ? '/' : '/en/';
  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: path,
      languages: { es: '/', en: '/en/', 'x-default': '/' },
    },
    openGraph: {
      type: 'website',
      url: path,
      siteName: 'Azes Barbería',
      title: t.meta.title,
      description: t.meta.description,
      locale: t.lang === 'es' ? 'es_UY' : 'en_US',
      images: [{ url: '/og.jpg', width: 1200, height: 630, alt: t.meta.ogAlt }],
    },
    twitter: { card: 'summary_large_image', title: t.meta.title, description: t.meta.description, images: ['/og.jpg'] },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false },
  };
}
