// Google reviews. Everything here must come from the real listing
// (GOOGLE_REVIEWS_URL in business.ts); nothing is written by us.

/**
 * Topics Google extracts from the reviews ("Ordenar por" chips on the
 * listing), with how many reviews mention each. Read on 2026-11-17.
 */
export const REVIEW_TOPICS: { es: string; en: string; count: number }[] = [
  { es: 'Ambiente', en: 'Atmosphere', count: 14 },
  { es: 'Buena onda', en: 'Good vibe', count: 9 },
  { es: 'Precio', en: 'Price', count: 8 },
  { es: 'El corte', en: 'The cut', count: 7 },
  { es: 'El trabajo', en: 'The work', count: 6 },
  { es: 'Los barberos', en: 'The barbers', count: 4 },
];

export type Review = {
  /** As shown on Google, e.g. "Martín G." */
  author: string;
  stars: 1 | 2 | 3 | 4 | 5;
  /** Original text, copied word for word. */
  text: string;
  /** Optional English translation for /en/; falls back to the original. */
  textEn?: string;
  /** As shown on Google, e.g. "hace 2 meses". */
  when?: string;
};

/**
 * Quotes shown as cards. Empty until the client picks real reviews:
 * paste them here exactly as written on Google. With no quotes the
 * section shows only the score, the breakdown and the topics.
 */
export const REVIEWS: Review[] = [];
