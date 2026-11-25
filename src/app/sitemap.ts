import type { MetadataRoute } from 'next';
import { LANGS, SITE_URL, localePath } from '@/data/business';
import { HREFLANG } from '@/lib/metadata';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(LANGS.map((l) => [HREFLANG[l], `${SITE_URL}${localePath(l)}`]));
  return LANGS.map((l) => ({
    url: `${SITE_URL}${localePath(l)}`,
    changeFrequency: 'monthly' as const,
    priority: l === 'es' ? 1 : 0.8,
    alternates: { languages },
  }));
}
