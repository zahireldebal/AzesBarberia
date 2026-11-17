---
name: Azes Barbería
description: A dark, photo-led classic barbershop storefront whose one job is to put the visitor into Fresha.
colors:
  ink: "#0e0e0f"
  ink-2: "#151517"
  ink-3: "#1d1d20"
  line: "#2c2a27"
  cream: "#f3ede1"
  muted: "#b9b1a3"
  gold: "#b08d57"
  gold-hi: "#c9a46c"
  gold-lo: "#8a6c40"
  suit: "#c9090a"
typography:
  display:
    fontFamily: "Cinzel, 'Times New Roman', serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.04em"
  quote:
    fontFamily: "Cinzel, 'Times New Roman', serif"
    fontSize: "3rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Cinzel, 'Times New Roman', serif"
    fontSize: "clamp(2rem, 6vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.06em"
  title:
    fontFamily: "Cinzel, 'Times New Roman', serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "0.06em"
  price:
    fontFamily: "Cinzel, 'Times New Roman', serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "'tnum' 1, 'lnum' 1"
  body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.14em"
  button:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  hairline: "2px"
spacing:
  gutter: "1rem"
  gutter-sm: "1.5rem"
  container: "72rem"
  section-top: "5.5rem"
  section-bottom: "4.5rem"
  section-top-md: "8rem"
  section-bottom-md: "7rem"
  head-to-content: "3.5rem"
  mosaic-gap: "0.5rem"
  frame-inset: "0.5rem"
components:
  button-booking:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.hairline}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-booking-hover:
    backgroundColor: "{colors.gold-hi}"
    textColor: "{colors.ink}"
  button-selected:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.hairline}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.cream}"
    typography: "{typography.button}"
    rounded: "{rounded.hairline}"
    padding: "0.75rem 1.4rem"
    height: "48px"
  button-sm:
    padding: "0.55rem 1rem"
    height: "44px"
  photo-frame:
    backgroundColor: "{colors.ink-2}"
    rounded: "{rounded.none}"
  label-panel:
    backgroundColor: "{colors.ink-3}"
    textColor: "{colors.gold}"
    typography: "{typography.title}"
    rounded: "{rounded.none}"
  mobile-bar:
    backgroundColor: "{colors.ink}"
    padding: "0.75rem 1rem"
---

# Design System: Azes Barbería

## Overview

**Creative North Star: "The Gilt-Lettered Shopfront"**

The classic barbershop page, played straight and at full craft. The site reads like a shop window at night: a near-black ground taken from the chairs and the team's black tees, real photographs of the real floor, cream lettering, and aged gold used the way a sign-painter uses gold leaf, for the hairlines, the prices and the one action that matters. Every surface exists to move the visitor into a Fresha booking, so the system is built around a single, unmistakable gold button and a price board you could hang on the wall.

Density is generous and calm: big section padding, one idea per band, photographs either full-bleed or held inside a thin gold inset frame. Type has two voices only, Cinzel capitals for anything that would be lettered on the window, Manrope for anything you read. Ornament is limited to the four card suits from the logo, drawn as a broken gold rule. The category's clip-art (pole icons, moustaches, crossed scissors, distressed textures, emoji) is rejected outright.

Motion is restrained: one authored moment when the page opens (the logo resolves from a soft blur, a gold rule draws from the centre, the hero lines rise), then quiet rise-ins as content enters. Everything collapses to instant under `prefers-reduced-motion`.

**Key Characteristics:**
- Dark, warm, photo-led; ink ground with a slightly lifted alternate band.
- Gold fill means "book on Fresha" and nothing else.
- Cinzel uppercase for lettering, Manrope for reading; no third face.
- Thin gold hairlines, dotted leaders and the suit rule are the entire ornament set.
- Square, framed, flat; depth comes from photography and tonal bands, not cards.
- One authored load moment, then quiet.

## Colors

A near-monochrome warm dark palette with a single metallic accent and a red that only lives inside the logo's suits.

### Primary
- **Aged Gilt** (gold): fill of every Fresha booking action; hairlines, dotted leaders, the suit-rule gradient, list-tick dashes, icon tint in meta lines, and the `::selection` background.
- **Polished Gilt** (gold-hi): hover state of the booking fill, every price figure, small uppercase labels, the focus ring, and link hover colour.
- **Tarnished Gilt** (gold-lo): scrollbar thumb only.

### Secondary
- **Card-Suit Red** (suit): the heart and diamond inside the four suit marks, and in the logo raster itself. Nowhere else.

### Neutral
- **Chair Black** (ink): page ground, header and mobile-bar backing (at 95%), lightbox and menu overlays.
- **Back-Room Black** (ink-2): alternate section band (Team, Products, Reviews, FAQ), photo-frame backing behind loading images, gallery tile backing.
- **Shelf Black** (ink-3): typographic label panels and the map placeholder: the one step above ink-2.
- **Hairline Umber** (line): section-internal rules (price board, FAQ, footer), map border, icon-button borders.
- **Barber Cream** (cream): all primary text, outline-button text and border (at 55%), selected-toggle fill.
- **Faded Linen** (muted): intros, descriptions, captions, durations, notes.

### Named Rules
**The Gold Means Book Rule.** A gold-filled button always opens Fresha in a new tab with the external-link mark. No other action, however important, gets the gold fill; WhatsApp, directions, filters and "see all reviews" are outline. Where a booking action shares a row with another action, booking sits first.

**The Suits Only Rule.** Card-Suit Red appears only inside the four authored suit marks (and the logo they come from). It is never a text colour, a state colour, an error colour or a badge.

**The Two Blacks Rule.** Sections alternate between Chair Black and Back-Room Black; a full-bleed photo band fades into the band colour at its top and bottom edges. No third surface colour is introduced for sections.

## Typography

**Display Font:** Cinzel (with 'Times New Roman', serif), weights 400/600/700, loaded via next/font
**Body Font:** Manrope (with system-ui, sans-serif), weights 400/500/600/700

**Character:** Cinzel's inscriptional capitals echo the logo's tracked "BARBERÍA" and read as window lettering; Manrope is a clean, warm grotesque that keeps prices, hours and descriptions effortless on a phone.

### Hierarchy
- **Display** (600, 1.6rem phone / 1.875rem from 640px, 1.25, 0.04em): hero tagline under the logo. The logo image itself is the h1.
- **Quote** (600, 2rem phone / 3rem from 640px, 1.25, 0.02em, sentence case): the single real review, set as a pull quote.
- **Headline** (600, clamp(2rem, 6vw, 3.25rem), 1.1, 0.06em, uppercase): every section title, always followed by the suit rule. Sub-feature titles (before/after) use the same style at 1.9rem to 2.25rem.
- **Title** (600, 1.25rem phone / 1.5rem desktop, 0.05 to 0.08em, uppercase): service names, barber names, product names, mobile-menu links (1.875rem).
- **Price** (600, matches its row's title size, tabular lining numerals, Polished Gilt): every price, prefixed "$U".
- **Body** (400, 1.0625rem, 1.6): reading text; FAQ answers capped at 65ch, intros at about 42rem.
- **Label** (700, 0.8 to 0.85rem, 0.12 to 0.14em, uppercase): nav links, info-block headings (Address, Hours, Payment) in Polished Gilt, "from" prefixes and durations in Faded Linen.
- **Button** (700, 0.95rem; 0.875rem small, 0.04em, sentence case).

### Named Rules
**The Two Voices Rule.** Cinzel is lettering, Manrope is reading. Never set a paragraph in Cinzel, never set a section title in Manrope.

**The Tabular Money Rule.** Prices, hours, ratings and counters always use tabular lining numerals so leaders and columns align.

## Layout

A single centred column: content sits in a 72rem container with a 1rem gutter on phones and 1.5rem from 640px. Sections carry 5.5rem top / 4.5rem bottom padding on phones and 8rem / 7rem from 768px; the section head sits 3.5rem above its content. Section heads are centred by default (max 42rem) with the intro in Faded Linen below the suit rule.

Narrow reading content (price board, FAQ, review) is held to about 48rem and centred. Image groups use tight 0.5rem gutters (gallery, location mosaic) so the photos read as one wall; the team row uses five equal frames in one line from 1024px, wrapping centred (two, then three per row) below. Feature pairs (before/after) split roughly 1.05 : 1 from 768px and stack on phones.

The hero is full viewport height (100svh): on phones the composition anchors to the bottom so the booking button sits in thumb reach, stacked full-width with its secondary; from 640px the buttons sit side by side and from 768px the composition centres over the interior shot (the floor under the hexagonal light ceiling, `local-sillones`). The façade is used as the map placeholder in the Location section. Section order: Team, Services, Reviews (Google score, per-star bars, topics, quotes when supplied), Location, Products, Before / After, FAQ. Phones gain a fixed bottom bar (booking plus WhatsApp) once the hero scrolls away; it respects the safe-area inset and hides from 1024px, where the header carries a small booking button. Breakpoints: 640px, 768px, 1024px.

## Elevation & Depth

The system is flat. Depth comes from photography, the two-black tonal bands, and gradient scrims over images, not from raised surfaces. Shadows exist only where something genuinely floats above the page: the booking button (a soft, low, dark under-glow that grows on hover), the compact header and the mobile bar once they overlay content, the lightbox image, and a soft drop shadow lifting the hero logo off the photo. Each is a diffuse, dark, downward blur; none is a hard offset.

### Shadow Vocabulary
- **Booking glow** (`box-shadow: 0 6px 18px -8px rgb(0 0 0 / 0.7)`; hover `0 12px 26px -10px rgb(0 0 0 / 0.8)`): gold booking buttons only.
- **Header seam** (`box-shadow: 0 1px 0 rgb(176 141 87 / 0.25), 0 10px 30px -12px rgb(0 0 0 / 0.8)`): compact header after 48px of scroll; the 1px gold seam doubles as its bottom edge.
- **Bar lift** (`box-shadow: 0 -12px 30px -12px rgb(0 0 0 / 0.8)`): mobile booking bar, with a gold border-top at 30%.
- **Lightbox float** (`box-shadow: 0 30px 80px -20px rgb(0 0 0 / 0.9)`): the enlarged photo.

### Named Rules
**The Floating-Only Shadow Rule.** A shadow means the element is above the page (fixed, overlaid, or the primary action). Cards, frames and panels sit flat.

## Shapes

Square and architectural. Buttons and the focus ring carry a barely-there 2px corner; photo frames, label panels, the map, rules and section bands are perfectly square. Borders are 1px hairlines in Hairline Umber or gold at reduced opacity. The signature geometry is the gold inset: a 1px gold line (Polished Gilt at 45%) drawn 0.5rem inside the edge of a photograph, like a mat in a picture frame. Dotted leaders (1px dotted gold at 55%) run between a name and its price or a day and its hours.

## Components

### Buttons
Confident and tactile: 48px tall, they lift 2px on hover and press to 0.97 scale.
- **Shape:** near-square (2px).
- **Booking (gold):** Aged Gilt fill, Chair Black text, 0.75rem by 1.4rem padding, trailing external-link icon at 75% opacity, booking glow. Hover: Polished Gilt and a deeper glow. Used for every Fresha booking link and only for those.
- **Selected toggle (cream):** Barber Cream fill, Chair Black text, `aria-pressed="true"`. Used for the active product filter and the active Antes / Después state.
- **Outline:** transparent with a 1px cream border at 55% and cream text; hover brightens the border to full cream and adds a 6% cream wash. Everything else: secondary hero action, per-service and per-barber booking rows, WhatsApp, directions, reviews link, unselected toggles.
- **Small:** 44px tall, 0.55rem by 1rem, 0.875rem text.
- **Focus:** 2px Polished Gilt outline at 3px offset on every interactive element.
- **Motion:** transform on the expo-out curve (220ms), press at 90ms.

### Section Head
Cinzel uppercase headline, then the suit rule (max 20rem wide) 1.25rem below, then an optional Faded Linen intro. There is no eyebrow, kicker or overline above any heading.

### Suit Rule (signature)
A gold hairline that fades in from transparent on both sides and is broken in the middle by the four suits (spade, heart, club, diamond) at 0.8rem with 0.5rem between them; spade and club in cream, heart and diamond in Card-Suit Red. It divides the head from the content, closes the mobile menu, and anchors the footer.

### Price Board (signature)
Services are a ruled list, not cards: hairline rules top, bottom and between rows; each row is Title name, a dotted gold leader, and a tabular gold price with a small "from" label; beneath it a muted description, an uppercase duration, and a small outline "Book this" button deep-linked to that service on Fresha. The same leader pattern sets product prices and the opening hours.

### Photo Frame
Square-cornered photo on a Back-Room Black backing with the 0.5rem gold inset line. Team portraits sit at 4:5 in full black and white (so photos taken in different places read as one set), lifting to full colour and scaling 1.04 on hover (700ms). Product photos sit square. Location and product photos use the same frame; the gallery uses bare tiles in a tight grid with a zoom mark on hover.

### Label Panel
Where no clean product photo exists, a typographic panel stands in: Shelf Black inside a photo frame, the brand in large Cinzel gold, a short gold hairline, the product name in tracked Cinzel cream, the size in a muted label. 16:9 on phones, 4:5 from 768px.

### Before / After
A framed square photo that crossfades (900ms) between two states, with a Cinzel state tag in the corner and a two-button toggle below (cream for the active state, outline for the other). It plays once when first in view unless reduced motion is set, and is labelled illustrative.

### Navigation
Fixed header with the logo centred on a three-column grid (equal side tracks), 80px (96px from 1024px) over the hero with an ink-to-transparent scrim, compacting to 64px (72px desktop) at 80% ink with a backdrop blur and the header seam after 48px of scroll. On desktop the links split around the logo, in page order: Team, Services, The shop on the left; Products, FAQ on the right, followed by the language switch (EN / ES) and a small gold booking button. Links are uppercase labels in cream at 85% turning Polished Gilt on hover. Below 1024px the menu button sits left, the logo centre and the language switch right. Below 1024px a menu button opens a full-screen ink panel that wipes down (clip-path, 450ms), lists links in 1.875rem Cinzel, and ends with the suit rule and a full-width gold booking button. Scroll is locked, focus is trapped, ESC closes.

### Mobile Booking Bar
Phones only: fixed to the bottom once the hero has scrolled 70% away, sliding up on the expo-out curve (500ms). A flexible gold booking button plus a 48px square outline WhatsApp button, on 95% ink with a gold hairline above.

### FAQ
Native disclosure rows between hairlines: Manrope 600 questions at 1.125rem, a gold chevron that rotates 180 degrees on open, answers in Faded Linen capped at 65ch.

### Icons
An authored outline set on a 24px grid, 1.6 stroke, round caps and joins, inheriting `currentColor`; tinted gold in meta lines. Never emoji or text glyphs.

### Photography and rasters
Photographs are the real shop, team and work, used at full bleed (hero, photo band) or inside the photo frame. Every shipping raster (`public/img/*.webp`, `public/og.jpg`, `src/app/icon.png`, `src/app/apple-icon.png`) is produced by `scripts/process-images.mjs` from client-supplied sources: Google Maps captures (façade and interior), Instagram grid captures (gallery), BRB story captures (product and before/after, labelled illustrative), Fresha profile photos (team) and the supplied `logo.png` (light and dark logo variants, the suit-row favicon, the Open Graph card). Processing is limited to crops that remove interface chrome, a 2x Lanczos3 resample with a gentle unsharp mask, and WebP encoding; nothing is generated. New imagery should come from the shop or its suppliers and go through the same script; original high-resolution photography is still owed for a public launch.

## Do's and Don'ts

### Do:
- **Do** reserve the Aged Gilt fill for Fresha booking links, each with the external-link mark and a new tab.
- **Do** use the cream fill only for a selected toggle (`aria-pressed="true"`), and outline buttons for every other action.
- **Do** open every section with a Cinzel uppercase headline followed by the suit rule.
- **Do** set prices as Title-size Cinzel in Polished Gilt with tabular numerals, joined to their label by a dotted gold leader.
- **Do** hold photographs full-bleed or inside the 1px gold inset frame (0.5rem in from the edge).
- **Do** alternate Chair Black and Back-Room Black bands, and fade full-bleed photos into the neighbouring band.
- **Do** keep motion to the one hero sequence plus quiet rise-ins (18px, 700 to 900ms, expo-out, 80ms stagger), with content visible without JavaScript and everything instant under reduced motion.
- **Do** keep every touch target at 44px or more (buttons 48px, small 44px).

### Don't:
- **Don't** use the gold fill for WhatsApp, directions, filters, reviews or any non-booking action.
- **Don't** use Card-Suit Red outside the suit marks: not for text, errors, badges or emphasis.
- **Don't** put an eyebrow, kicker or overline above a heading.
- **Don't** use barbershop clip-art: pole icons, moustaches, crossed scissors, distressed textures, emoji.
- **Don't** turn the services into cards; they are a price board.
- **Don't** add hard offset shadows or shadows on flat cards and frames.
- **Don't** add a third typeface or set reading text in Cinzel.
- **Don't** generate or AI-upscale imagery beyond the crop-and-resample pipeline.
