---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: []
---

# Surface: home (one-page)

Scope: the whole one-page site (`src/app/page.tsx` and its section components). Visitor mode: **Persuade**. Audience: young locals arriving from Instagram on a phone, plus summer tourists (EN). Action: start a booking on Fresha (deep links per service and per barber). Proof: the real shop (photos), five named barbers, real prices, one real Fresha review, BRB before/after (labelled illustrative).

## Direction contract

THESIS: The classic barbershop page, played straight at full craft: a dark, photo-led storefront whose only job is to put the visitor into Fresha. It refuses the clip-art version of the category (pole icons, moustaches, crossed scissors, distressed textures, emoji).

OWN-WORLD: Near-black ground (#0E0E0F, the shop's chairs and the team's black tees), warm cream type (#F3EDE1), aged gold (#B08D57) for hairlines, prices and the primary action; logo red (#C9090A) appears only inside the four authored suit marks. Cinzel capitals for headings (echoing the logo's tracked "BARBERÍA"), Manrope for reading text. Dividers are a thin gold rule broken by the suits. Photos run full-bleed or inside a 1px gold inset frame.

STORY: In one screen the visitor knows this is Azes Barbería in central Maldonado, sees it is a big modern shop with five barbers, reads real prices, and taps "Reservá en Fresha" without hunting.

FIRST VIEWPORT: Phone: full-height façade photo, darkened toward the bottom; the logo (light version) centred in the upper half at ~72% width; tagline "Tu mejor corte, cuando quieras." in Cinzel below it; gold primary "Reservá en Fresha" and cream outline "Ver servicios", side by side from 640px up and stacked full-width on phones (at 375px each half would be ~165px, too narrow for "Reservá en Fresha" plus its external-link icon at a 48px target; full width also keeps the primary action in thumb reach); one meta line under them: "Cortes desde $U 500" · Fresha rating · Lun–Sáb 9–19 · Sarandí 650. Desktop: the same centred composition over the landscape interior shot (hex ceiling).

FORM: The standing exit (category standard) chosen by the user over the roll; seed:ef37bdacb7effa3c. Signature interaction: services as a barbershop price board with dotted leaders (not cards), each line a deep link to that service in Fresha; before/after as a crossfade toggle. Motion grammar: one authored moment on load (gold rule draws from the centre, logo resolves from a soft blur), then quiet rise-ins.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Unresolved

- Original high-resolution photography (current set: Google Maps captures, Instagram thumbnails, BRB stories) for a public launch.
