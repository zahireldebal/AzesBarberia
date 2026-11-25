# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js (App Router) + TypeScript + Tailwind CSS, static export (`output: 'export'`) deployed on Cloudflare Workers (static assets, `wrangler.jsonc`). Framer Motion for motion (respects `prefers-reduced-motion`). Images pre-processed with `sharp` to WebP at several widths with a custom `srcset` in `/public/img/`. No backend or database: content lives in `src/data/*.ts`, copy in `src/i18n/es.ts` and `en.ts`. Repo: github.com/zahireldebal/AzesBarberia.

## Users

- **Locals from Maldonado**, mostly young men, who arrive from Instagram on their phone wanting to see prices, pick a barber and book.
- **Tourists** in Maldonado / Punta del Este (seasonal) who need the essentials in English: what it costs, where it is, when it's open, how to book.

## Product Purpose

One-page site for Azes Barbería that presents the shop with a professional image true to its brand, lists services with price and duration, shows the products they sell, and sends every booking to **Fresha**, which stays the only booking system (team and clients already use it). It also gives everything needed to find and contact the shop, and should rank in Google for searches like "barbería en Maldonado". Success = more Fresha bookings started from the site and better local search presence.

## Positioning

A large, recently opened shop in central Maldonado (Sarandí 650, esquina 33) with a team of five barbers, a hexagonal LED ceiling, a mezzanine lounge with pool table, online booking with barber choice, and walk-ins accepted. Specialties stated by the business: men's cuts, fades (degradados), scissor cuts, beard shaping and personal style advice.

## Operating Context

- Booking happens entirely on Fresha: service → barber → date/time → login → confirm. The site deep-links into it; it never embeds it (no iframe).
- Fresha deep links verified in a real browser on 2026-11-14: `booking?offerItemId=s:<id>` preselects a service; `booking?employeeId=<id>` preselects a barber; `/es/` works; `/en/` redirects to the unprefixed (English) URL.
- Cancellation policy (from Fresha): cancel or modify at least 60 min before; no-show or late cancel = 50% of the service charged on the next visit; twice in a row = 100% of the second service.
- Products are sold in the shop and offered as Fresha add-ons; the site is not a store (enquiry via WhatsApp / in person).

## Capabilities and Constraints

- Language: Spanish (rioplatense, voseo) by default, English toggle.
- Mobile-first (375 px) and desktop; WCAG AA contrast, visible focus, keyboard navigation, 44 px targets.
- Lighthouse > 90 in all four categories.
- Never invent services, prices, products, reviews, barbers or facts; unknowns are `[CONFIRMAR]` and tracked in PENDIENTES.md.
- Footer credit: `© 2026 Azes Barbería · Diseño y desarrollo: ZAJUX · Todos los derechos reservados.`

## Brand Commitments

- Name: **Azes Barbería**, est. 2021. Logo: copperplate script "Azes", wide-tracked serif "BARBERÍA", ornamental flourishes and the four card suits ♠ ♥ ♣ ♦ (hearts/diamonds red). `logo.png` in repo root.
- Voice: young, close, direct, rioplatense voseo ("Reservá", "Conocé", "Podés"). Existing lines: "TU MEJOR CORTE, CUANDO QUIERAS." (Fresha) and "Le damos a tu pelo el cambio que necesita" (Instagram bio).
- Feel requested by the client: premium neighborhood barbershop: masculine, modern, approachable, nothing generic. Built from the real shop and Instagram, not copying their pieces literally.
- **Standing visual preference (chosen 2026-11-15):** the classic barbershop category standard, executed at full craft: dark ground, warm cream, aged gold, large photography, logo-led. No external reference sites; the craft bar is our own premium execution. Logo red stays for the card suits only.

## Evidence on Hand

- Fresha data (screenshots in `Freshea/` + public page): 3 services, 5 barbers with Fresha IDs, 2 BRB add-on products, hours, address, coordinates, phone, payment methods, policies.
- Fresha rating: 5.0 from **1** review (Agustin B, 2023-07-28: "Excelente servicio y atención"). No Google rating captured.
- Photos: `hero.png` and `SitioFisico/` are Google Maps captures (some credit third-party contributors); `Instagram/` are grid screenshots; `Productos/` and `ANIMACION SIMULADO PRODUCTOS CAPILARES/` are screenshots of @brbproductos.uy stories (the supplier's content, not Azes's own clients).
- Absent, must not be fabricated: Google reviews/rating, barber specialties, WhatsApp confirmation for the phone number, original high-resolution photos, product photos from the brand.

## Product Principles

1. Every path ends in Fresha: the booking CTA is never more than a thumb away.
2. Truth over polish: only real data; gaps are visible placeholders, not filler.
3. The shop is the proof: real space, real team, real work carry the brand.
4. Phone first: the visitor comes from Instagram, one-handed, in a hurry.
5. Bilingual by default for the tourist season.

## Accessibility & Inclusion

WCAG 2.2 AA: contrast, visible focus, full keyboard operation (including the before/after slider and lightboxes), alt text, 44 px minimum targets, `prefers-reduced-motion` respected.
