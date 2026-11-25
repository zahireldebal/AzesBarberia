// All business facts live here. Edit this file to change contact data,
// hours or the Fresha link; every button on the site reads from it.

export type Lang = 'es' | 'en';

/** Public URL of the site (change to the custom domain when there is one). */
export const SITE_URL = 'https://azesbarberia.zahireldebal.workers.dev';

/**
 * Fresha booking page (Spanish). The ONLY place the Fresha link is stored.
 * Cleaned of fbclid, utm_*, share and cartId. English and the deep links
 * (per service / per barber) are derived from it in `bookingUrl()`.
 */
export const FRESHA_BOOKING_URL =
  'https://www.fresha.com/es/a/azes-barberia-maldonado-sarandi-650-outs27e5/booking?menu=true&pId=560997';

/** Fresha business profile (reviews, photos). */
export const FRESHA_PROFILE_URL = FRESHA_BOOKING_URL.replace(/\/booking\?.*$/, '');

/**
 * Builds a Fresha link.
 * - EN: Fresha serves English without a language prefix (/en/ redirects there).
 * - service: Fresha `offerItemId=s:<id>` opens that service preselected.
 * - barber: Fresha `employeeId=<id>` opens the menu with that barber preselected.
 * Both formats were tested in a real browser on 2026-11-14.
 */
export function bookingUrl(lang: Lang, opts: { serviceId?: string; barberId?: string } = {}): string {
  const url = new URL(FRESHA_BOOKING_URL);
  if (lang === 'en') url.pathname = url.pathname.replace(/^\/es\//, '/');
  const pId = url.searchParams.get('pId') ?? '';
  url.search = '';
  if (opts.serviceId) url.searchParams.set('offerItemId', `s:${opts.serviceId}`);
  else if (opts.barberId) url.searchParams.set('employeeId', opts.barberId);
  else url.searchParams.set('menu', 'true');
  url.searchParams.set('pId', pId);
  return url.toString();
}

export function profileUrl(lang: Lang): string {
  return lang === 'en' ? FRESHA_PROFILE_URL.replace('/es/', '/') : FRESHA_PROFILE_URL;
}

export const BUSINESS = {
  name: 'Azes Barbería',
  founded: 2021,
  street: 'Sarandí 650',
  corner: 'esquina 33',
  city: 'Maldonado',
  region: 'Departamento de Maldonado',
  postalCode: '20000',
  country: 'UY',
  geo: { lat: -34.91189956665039, lng: -54.95745086669922 },
  phoneDisplay: '+598 93 874 498',
  phoneE164: '+59893874498',
  /** Confirmed by the client as the WhatsApp number. */
  whatsapp: '59893874498',
  instagram: 'https://www.instagram.com/azesbarberia/',
  instagramHandle: '@azesbarberia',
  /**
   * Google Maps rating, read from the public listing on 2026-11-17.
   * `breakdown` = number of reviews per star (5 → 1). Update by hand when it changes.
   */
  rating: { value: 5, count: 342, source: 'Google', breakdown: { 5: 338, 4: 3, 3: 0, 2: 0, 1: 1 } },
  /** 24h, Monday = 1 ... Sunday = 7. Closed days are omitted. */
  hours: [
    { day: 1, open: '09:00', close: '19:00' },
    { day: 2, open: '09:00', close: '19:00' },
    { day: 3, open: '09:00', close: '19:00' },
    { day: 4, open: '09:00', close: '19:00' },
    { day: 5, open: '09:00', close: '19:00' },
    { day: 6, open: '09:00', close: '19:00' },
  ],
  payments: ['cash', 'credit', 'debit'] as const,
  walkIns: true,
} as const;

/** Google Maps listing of the shop (place ID verified 2026-11-17: "Azes Barberia, Sarandí 650"). */
export const GOOGLE_PLACE_ID = 'ChIJyQMy2OobdZURiZ2eQpqLS3c';
const GOOGLE_FID = '0x95751bead83203c9:0x774b8b9a429e9d89';
/** Opens the listing straight on its Reviews tab (tested 2026-11-17; the `16s` part is required). */
export const GOOGLE_REVIEWS_URL = `https://www.google.com/maps/place/Azes+Barberia/@-34.9118461,-54.9575174,17z/data=!4m8!3m7!1s${GOOGLE_FID}!8m2!3d-34.9118461!4d-54.9575174!9m1!1b1!16s%2Fg%2F11sgs7403j`;
/** Opens Google's "write a review" dialog for the shop. */
export const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${BUSINESS.geo.lat},${BUSINESS.geo.lng}`;
export const MAPS_EMBED_URL = `https://maps.google.com/maps?q=${BUSINESS.geo.lat},${BUSINESS.geo.lng}&z=17&output=embed`;

export function whatsappUrl(text: string): string {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(text)}`;
}
