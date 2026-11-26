---
name: Azes Barbería
description: A photo-led classic barbershop storefront, black ink on paper under a night-window hero, whose one job is to put the visitor into Fresha.
colors:
  ink: "#fafaf8"
  ink-2: "#efefec"
  ink-3: "#e5e5e1"
  line: "#d9d9d5"
  cream: "#0b0b0b"
  muted: "#5a5a5a"
  gold: "#0b0b0b"
  gold-hi: "#2b2b2b"
  gold-lo: "#9a9a9a"
  suit: "#0b0b0b"
typography:
  display:
    fontFamily: "Cinzel, 'Times New Roman', serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "0.04em"
  score:
    fontFamily: "Cinzel, 'Times New Roman', serif"
    fontSize: "6.5rem"
    fontWeight: 600
    lineHeight: 1
    fontFeature: "'tnum' 1, 'lnum' 1"
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
    padding: "0.55rem 1rem"
    height: "44px"
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

**Creative North Star: "The Calling Card Under the Night Window"**

The classic barbershop page, played straight and at full craft, printed in one ink. The page is a sheet of warm paper set in black, like a letterpress calling card or a price card on the shop counter; above it, the hero is the shop window at night, a darkened photograph of the floor under the hexagonal light ceiling with the light logo resolved over it, melting down into the paper. Every surface exists to move the visitor into a Fresha booking, so the system is built around one unmistakable filled black button.

Density is generous and calm: big section padding, one idea per band, photographs either full-bleed or held inside a thin white inset frame. The photographs are the one place colour enters, and they are always real: the shop, the team, the work. Type has two voices only, Cinzel capitals for anything that would be lettered on the window, Manrope for anything you read. Ornament is limited to the four card suits from the logo, drawn as a broken hairline rule. The only red on the page lives inside the logo raster. The category's clip-art (pole icons, moustaches, crossed scissors, distressed textures, emoji) is rejected outright.

Motion is a quiet, responsive layer: one authored moment when the page opens (logo resolves from a soft blur, a rule draws from the centre, the hero lines rise, the photo settles), then rise-ins, photos that resolve from blur as they load, rules that draw when their section arrives, buttons that answer the pointer. Everything collapses to instant under `prefers-reduced-motion`.

**Key Characteristics:**
- Paper ground, black ink, real full-colour photography; one scoped night palette for the hero and overlays.
- A filled black button means "book on Fresha"; everything else is outline.
- Cinzel uppercase for lettering, Manrope for reading; no third face.
- Hairlines, dotted leaders and the suit rule are the entire ornament set.
- Square, framed, flat; depth comes from photography and two paper tones, not cards.
- The logo's red suits are the only colour the system owns.

## Colors

One ink on two papers, with a scoped night inversion. Token names are inherited from the retired first theme and are kept because the code uses them: read `ink` as ground, `cream` as text, `gold` as the action colour.

### Primary
- **Press Black** (gold): fill of every Fresha booking action, `::selection` background, hero divider rule, list-tick and icon tint in meta lines, label-panel brand mark, the brand word in product names.
- **Soft Press** (gold-hi): hover state of the booking fill, every price figure, small uppercase info labels, the focus ring, link and nav hover colour, the active-flag ring.
- **Pewter** (gold-lo): scrollbar thumb and the start of the progress bar gradient only.

### Neutral
- **Paper** (ink): page ground, header and mobile-bar backing (at 85 to 95%), the menu panel.
- **Card Stock** (ink-2): alternate section band (Before / After, Location), photo-frame backing behind loading images, review cards.
- **Proof Grey** (ink-3): typographic label panels and the map well, one step above Card Stock.
- **Pencil Rule** (line): section-internal rules (FAQ, opening hours, footer), card and map borders, review-bar tracks, icon-button borders, the compact header's bottom seam.
- **Body Ink** (cream): all primary text, outline-button text and border (at 55%), selected-toggle fill.
- **Graphite** (muted): intros, descriptions, captions, durations, notes.
- **Suit Ink** (suit): the heart and diamond in the authored suit marks; on paper it is the same black as the text, so the drawn suits read as one ink.

### Night scope
The `.theme-dark` class re-scopes the same tokens to night values: ground `#0a0a0a`, bands `#141414` / `#1c1c1c`, rule `#2a2a2a`, text `#f5f5f5`, muted `#b8b8b8`, action white `#ffffff` (hover `#e6e6e6`), suits `#f5f5f5`, and a deeper shadow tint. It is applied to the hero, the header while it sits over the hero, the lightbox and the map placeholder, so every component inverts with its container: on the hero the booking button is white with black text. The hero scrim fades through black into `--hero-fade-to` (Paper) so the night window melts into the first paper band.

### Named Rules
**The Black Means Book Rule.** A filled action-colour button (black on paper, white at night) always opens Fresha in a new tab with the external-link mark and its soft under-shadow. WhatsApp, directions, reviews and every other action are outline. Where a booking action shares a row with another action, booking sits first. The one other filled button is the pressed product filter (`aria-pressed="true"`), which is small, carries no link mark and no shadow.

**The Logo Holds the Red Rule.** The interface has no colour of its own: photographs carry their real colour, and the interface never samples from them. The red suits inside the logo raster are the only red, and they are never sampled for text, states, errors or badges. Third-party marks (the language flags, the Google "G") keep their own colours at their native size and nowhere else.

**The Two Papers Rule.** Sections sit on Paper or Card Stock and no third section tone is introduced; Proof Grey is for panels inside a section.

## Typography

**Display Font:** Cinzel (with 'Times New Roman', serif), weights 400/600/700, self-hosted via next/font
**Body Font:** Manrope (with system-ui, sans-serif), weights 400/500/600/700, self-hosted via next/font

**Character:** Cinzel's inscriptional capitals echo the logo's tracked "BARBERÍA" and read as window lettering or engraved card type; Manrope is a clean grotesque that keeps prices, hours and descriptions effortless on a phone.

### Hierarchy
- **Display** (600, 1.6rem phone / 1.875rem from 640px, 1.25, 0.04em, sentence case): hero tagline under the logo. The logo image itself is the h1.
- **Score** (600, 5.5rem phone / 6.5rem from 640px, 1, tabular): the Google rating figure in Reviews, in Soft Press.
- **Headline** (600, clamp(2rem, 6vw, 3.25rem), 1.1, 0.06em, uppercase): every section title, always followed by the suit rule. Feature titles (before / after) use the same style at 1.75rem to 2.1rem.
- **Title** (600, 1.25rem phone / 1.5rem desktop, 0.05 to 0.08em, uppercase): service, barber and product names; mobile-menu links at 1.875rem.
- **Price** (600, matches its row's title size, tabular lining numerals, Soft Press): product prices and the hero "from" figure, prefixed "$U".
- **Body** (400, 1.0625rem, 1.6): reading text; FAQ answers capped at 65ch, intros at about 42rem.
- **Label** (700, 0.8 to 0.85rem, 0.12 to 0.14em, uppercase): nav links, info-block headings (Address, Hours, Payment) in Soft Press, "from" prefixes and durations in Graphite.
- **Button** (700, 0.95rem; 0.875rem small, 0.04em, sentence case).

### Named Rules
**The Two Voices Rule.** Cinzel is lettering, Manrope is reading. Never set a paragraph in Cinzel, never set a section title in Manrope.

**The Tabular Money Rule.** Prices, hours, ratings and counters always use tabular lining numerals so leaders and columns align.

## Layout

A single centred column: content sits in a 72rem container with a 1rem gutter on phones and 1.5rem from 640px. Sections carry 5.5rem top / 4.5rem bottom padding on phones and 8rem / 7rem from 768px. Section heads are centred by default (max 42rem) with the intro in Graphite below the suit rule.

Narrow reading content (FAQ, hours) is held to about 48rem and centred. Image groups use tight 0.5rem gutters (gallery, location mosaic) so the photos read as one wall; the team row uses five equal 4:5 frames in one line from 1024px, wrapping (two, then three per row) below. Feature pairs (before / after) split roughly 1.1 : 1 from 768px, alternating sides, and stack on phones.

The hero is full viewport height (100svh, 104svh from 768px) and night-scoped: on phones the composition anchors to the bottom so the booking button sits in thumb reach, stacked full-width with its secondary; from 640px the buttons sit side by side and from 768px the composition centres over the interior shot. Section order: Team, Products, Before / After, Reviews, Location, FAQ, footer; Before / After and Location sit on Card Stock, the rest on Paper. Phones gain a fixed bottom bar (booking plus WhatsApp) once the hero scrolls 70% away; it respects the safe-area inset and hides from 1024px, where the header carries a small booking button. Breakpoints: 640px, 768px, 1024px.

## Elevation & Depth

The system is flat. Depth comes from photography, the two paper tones, the night hero and gradient scrims over images, not from raised surfaces. Shadows exist only where something genuinely floats or answers the pointer: the booking button, the compact header and mobile bar once they overlay content, a team or product frame while it is lifted on hover, the compare-slider handle, the lightbox image, and a soft drop shadow lifting the light logo off the photo. Every shadow is a diffuse, dark, downward blur whose strength comes from `--shadow-strong` (22% black on paper, 80% at night); none is a hard offset.

### Shadow Vocabulary
- **Booking glow** (`box-shadow: 0 6px 18px -8px var(--shadow-strong)`; hover adds depth and a 1px action-colour ring at 40%): filled booking buttons only.
- **Header seam** (`box-shadow: 0 1px 0 var(--color-line), 0 10px 30px -14px rgb(0 0 0 / 0.18)`): compact header after 48px of scroll, with an 85% Paper backing and backdrop blur.
- **Bar lift** (`box-shadow: 0 -12px 30px -12px rgb(0 0 0 / 0.15)`): mobile booking bar, with an action-colour border-top at 30%.
- **Lift** (`box-shadow: 0 24px 50px -24px var(--shadow-strong)` plus a 1px text-colour ring at 18%): team and product frames while hovered, with a 6px rise.
- **Lightbox float** (`box-shadow: 0 30px 80px -20px rgb(0 0 0 / 0.9)`): the enlarged photo.

### Named Rules
**The Floating-Only Shadow Rule.** A shadow means the element is above the page (fixed, overlaid, lifted under the pointer, or the primary action). Frames, panels and cards at rest sit flat.

## Shapes

Square and architectural. Buttons and the focus ring carry a barely-there 2px corner; photo frames, label panels, review cards, the map, rules and section bands are perfectly square. Borders are 1px hairlines in Pencil Rule or the text colour at reduced opacity. The signature geometry is the inset line: a 1px white line at 55% drawn 0.5rem inside the edge of every framed photograph, like a mat in a picture frame (brightening to 90% when the frame is lifted). Dotted leaders (1px dotted text colour at 40%) run between a name and its price or a day and its hours. The compare-slider handle is the one rotated form: a 45-degree square, a diamond echoing the suits.

## Components

### Buttons
Confident and tactile: 48px tall, they lift 2px on hover and press to 0.97 scale.
- **Shape:** near-square (2px).
- **Booking (filled):** Press Black fill, Paper text, 0.75rem by 1.4rem padding, trailing external-link icon at 75% opacity, booking glow. Hover: Soft Press fill, deeper glow, a light sweep crossing the face (900ms) and the icon nudging up-right. White with black text inside the night scope.
- **Selected toggle (filled):** Body Ink fill, Paper text, small size, `aria-pressed="true"`; the active product filter.
- **Outline:** transparent with a 1px text-colour border at 55% and text-colour type; on hover an 8% wash fills from the left (420ms) and the border goes to full strength. Used for every non-booking action and unselected toggles.
- **Small:** 44px tall, 0.55rem by 1rem, 0.875rem text.
- **Focus:** 2px Soft Press outline at 3px offset on every interactive element.
- **Motion:** transform on the expo-out curve (220ms), press at 90ms.

### Section Head
Cinzel uppercase headline, then the suit rule (max 20rem wide) 1.25rem below, then an optional Graphite intro. There is no eyebrow, kicker or overline above any heading.

### Suit Rule (signature)
A hairline that fades in from transparent on both sides and is broken in the middle by the four suits (spade, heart, club, diamond) at 0.8rem with 0.5rem between them, all in the ink of their scope. Its two lines draw outward from the centre when the section reveals (1100ms after 200ms). It divides the head from the content, closes the mobile menu, and anchors the footer under the dark logo.

### Dotted Leader
A 1px dotted line in the text colour at 40% joins a name to its value: a product to its tabular Soft Press price, a day to its hours.

### Photo Frame
Square-cornered photo on a Card Stock backing with the 0.5rem white inset line. While a photo loads, a soft shimmer runs across the frame and the image resolves from an 18px blur. Team portraits sit at 4:5 with a low black gradient at the foot and a white pointer-following soft-light spot on hover; team and product frames lift 6px. Location and product photos use the same frame; the gallery uses bare tiles in a tight grid with a round zoom mark on hover.

### Label Panel
Where no clean product photo exists, a typographic panel stands in: Proof Grey inside a photo frame, the brand in large Cinzel Press Black, a short hairline, the product name in tracked Cinzel, the size in a Graphite label. 16:9 on phones, 4:5 from 768px.

### Compare Slider (signature)
Before / after is a draggable comparison inside a photo frame: one value drives the clip, the divider and both labels. The divider is a 2px white line; the handle is a black diamond (rotated square) with a thin white ring and white double arrows, scaling up slightly on hover and drag. "Antes" / "Después" tags are Cinzel uppercase labels in white on 70% black, fading as the divider approaches them. It sweeps once on first view (50, 80, 20, 50; 1000ms per leg) unless reduced motion is set, is a keyboard slider (arrows, Shift for larger steps, Home / End), and is labelled illustrative.

### Navigation
Fixed header with the logo centred on a three-column grid (equal side tracks). Over the hero it is night-scoped: 80px (96px from 1024px), a scrim from 85% night black to transparent, the light logo with a soft drop shadow. After 48px of scroll it becomes paper: 64px (72px desktop), 85% Paper with backdrop blur and the header seam, the dark logo. On desktop the links split around the logo in page order (sections left and right of the logo), uppercase labels at 85% text colour with an underline that grows from the centre on hover; then the language switcher and a small booking button. The switcher is three flags (Uruguay, United States, Brazil) at 22 by 15px with 3px corners; inactive at 45% opacity, the active one at full with a 1px Soft Press ring. Below 1024px the menu button sits left, the logo centre and the flags right; the menu opens a full-screen Paper panel that wipes down (clip-path, 450ms), lists links in 1.875rem Cinzel with a 50ms stagger, and ends with the suit rule and a full-width booking button. Scroll is locked, focus is trapped, ESC closes.

### Mobile Booking Bar
Phones only: fixed to the bottom once the hero has scrolled 70% away, sliding up on the expo-out curve (500ms). A flexible filled booking button plus a 48px square outline WhatsApp button, on 95% Paper with a hairline above.

### FAQ
Native disclosure rows between hairlines: Manrope 600 questions at 1.125rem, a chevron that rotates 180 degrees on open, answers in Graphite capped at 65ch that open by height (450ms) and fade down into place where the browser supports animating `details`.

### Progress Bar
A 2px bar fixed to the top edge, Pewter to Soft Press: it runs once as a page-load bar (1.3s) and then tracks scroll position.

### Icons
An authored outline set on a 24px grid, 1.6 stroke, round caps and joins, inheriting `currentColor`; tinted with the action colour in meta lines. Never emoji or text glyphs.

### Photography and rasters
Photographs are the real shop, team and work, used in full colour at full bleed (hero) or inside the photo frame. Every shipping raster (`public/img/*.webp`, `public/og.jpg`, `src/app/icon.png`, `src/app/apple-icon.png`) is produced by `scripts/process-images.mjs` from client-supplied sources: Google Maps captures (façade and interior), Instagram grid captures (gallery), BRB story captures (product and before / after, labelled illustrative), Fresha profile photos (team) and the supplied `logo.png` (light and dark logo variants, favicon, Open Graph card). Processing is limited to crops that remove interface chrome, removal of Instagram's play badge (dividing out its translucent disc, diffusion fill under the triangle), a two-step Lanczos3 upscale with a partial local-contrast blend and sharpening, and WebP encoding. The script's `MONO` switch (grayscale with a slight contrast lift) is set to `false`: photos ship in colour. The script's optional Real-ESRGAN path is not used for the shipped files; nothing is generated. CSS applies no colour filters to photographs. A film-grain overlay sits on the hero photo only. New imagery should come from the shop or its suppliers and go through the same script; original high-resolution photography is still owed for a public launch.

## Do's and Don'ts

### Do:
- **Do** reserve the filled action-colour button for Fresha booking links, each with the external-link mark, a new tab and the booking glow.
- **Do** use outline buttons for every other action, and the small filled toggle only for a pressed filter (`aria-pressed="true"`).
- **Do** open every section with a Cinzel uppercase headline followed by the suit rule.
- **Do** set prices as Title-size Cinzel in Soft Press with tabular numerals, joined to their label by a dotted leader.
- **Do** hold photographs full-bleed or inside the 1px white inset frame (0.5rem in from the edge), in their real colour, with any treatment done in the image script rather than by CSS filter.
- **Do** alternate Paper and Card Stock bands, and put any dark surface (hero, overlays, photo placeholders) in the `.theme-dark` scope so its components invert with it.
- **Do** use the dark logo on paper and the light logo only inside the night scope.
- **Do** keep every motion on the expo-out curve, keep content visible without JavaScript, and make everything instant under reduced motion.
- **Do** keep every touch target at 44px or more (buttons 48px, small 44px).

### Don't:
- **Don't** use the filled button for WhatsApp, directions, reviews or any non-booking action.
- **Don't** introduce a colour: no accent, no gold, no red outside the logo raster, not for text, errors, badges or emphasis.
- **Don't** put an eyebrow, kicker or overline above a heading.
- **Don't** use barbershop clip-art: pole icons, moustaches, crossed scissors, distressed textures, emoji.
- **Don't** add hard offset shadows or shadows on frames and panels at rest.
- **Don't** add a third typeface or set reading text in Cinzel.
- **Don't** generate or AI-upscale imagery beyond the crop-and-resample pipeline.
