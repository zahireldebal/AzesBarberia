import type { Localized } from './business';
// Google reviews. Everything here must come from the real listing
// (GOOGLE_REVIEWS_URL in business.ts); nothing is written by us.

/**
 * Topics Google extracts from the reviews ("Ordenar por" chips on the
 * listing), with how many reviews mention each. Read on 2026-11-17.
 */
export const REVIEW_TOPICS: (Localized & { count: number })[] = [
  { es: 'Ambiente', en: 'Atmosphere', pt: 'Ambiente', count: 14 },
  { es: 'Buena onda', en: 'Good vibe', pt: 'Boa vibe', count: 9 },
  { es: 'Precio', en: 'Price', pt: 'Preço', count: 8 },
  { es: 'El corte', en: 'The cut', pt: 'O corte', count: 7 },
  { es: 'El trabajo', en: 'The work', pt: 'O trabalho', count: 6 },
  { es: 'Los barberos', en: 'The barbers', pt: 'Os barbeiros', count: 4 },
];

export type Review = {
  /** As shown on Google, e.g. "Martín G." */
  author: string;
  stars: 1 | 2 | 3 | 4 | 5;
  /** Original text, copied word for word. */
  text: string;
  /** Optional English translation for /en/; falls back to the original. */
  textEn?: string;
  /** Optional Portuguese translation for /pt/; falls back to the original. */
  textPt?: string;
  /** As shown on Google, e.g. "hace 2 meses". */
  when?: string;
};

/**
 * Quotes shown as cards. Empty until the client picks real reviews:
 * paste them here exactly as written on Google. With no quotes the
 * section shows only the score, the breakdown and the topics.
 */
export const REVIEWS: Review[] = [];
