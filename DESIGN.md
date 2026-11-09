---
name: WaterKingsTech
description: A Jiji-style marketplace shop window for a real Circle Mall, Accra device and repair shop, in the blues of its logo.
colors:
  royal-50: "#eef6ff"
  royal-100: "#dcecff"
  royal-200: "#b9d8fb"
  royal-300: "#84bdf5"
  royal-500: "#108bd5"
  royal-600: "#0c6de2"
  royal-700: "#0a58bb"
  royal-800: "#0b468f"
  navy: "#062a5c"
  navy-950: "#031a3d"
  cyan: "#25c3f4"
  cyan-200: "#a0e5f9"
  ice: "#eef4fa"
  ice-100: "#f6f9fd"
  ice-200: "#d9e5f1"
  ice-300: "#c3d4e6"
  white: "#ffffff"
  ink: "#0f1b2d"
  ink-soft: "#3d4d63"
  ink-muted: "#5a687d"
  orange: "#ff8a1f"
  orange-strong: "#f57800"
  save: "#d7263d"
  flash: "#6d28d9"
  gift: "#0f7a3d"
  gift-bg: "#e5f6eb"
  whatsapp: "#25d366"
  whatsapp-hover: "#1fc15c"
  whatsapp-ink: "#04170b"
  pending-bg: "#fffbeb"
  pending-border: "#f59e0b"
  pending-ink: "#973c08"
typography:
  display:
    fontFamily: "Montserrat, Geist, ui-sans-serif, sans-serif"
    fontSize: "clamp(1.75rem, 1.2rem + 2.2vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Montserrat, Geist, ui-sans-serif, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  price:
    fontFamily: "Montserrat, Geist, ui-sans-serif, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 800
    letterSpacing: "-0.02em"
    fontFeature: "\"tnum\""
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 500
    lineHeight: 1.15
  deal-tag:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.66rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.04em"
rounded:
  md: "6px"
  lg: "8px"
  xl: "12px"
  full: "9999px"
spacing:
  card-sm: "10px"
  card: "14px"
  gap: "12px"
  gutter-sm: "16px"
  gutter: "24px"
  container: "77rem"
components:
  button-primary:
    backgroundColor: "{colors.royal-600}"
    textColor: "{colors.white}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.royal-700}"
  button-whatsapp:
    backgroundColor: "{colors.whatsapp}"
    textColor: "{colors.whatsapp-ink}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  button-whatsapp-hover:
    backgroundColor: "{colors.whatsapp-hover}"
  button-orange:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  button-orange-hover:
    backgroundColor: "{colors.orange-strong}"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  listing-card:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.xl}"
    padding: "{spacing.card}"
  input-search-hero:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    height: "56px"
  input-field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    height: "44px"
    padding: "0 14px"
  chip-type:
    backgroundColor: "{colors.white}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.full}"
    height: "36px"
    padding: "0 16px"
  chip-type-active:
    backgroundColor: "{colors.royal-600}"
    textColor: "{colors.white}"
  deal-tag-save:
    backgroundColor: "{colors.save}"
    textColor: "{colors.white}"
    typography: "{typography.deal-tag}"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  deal-tag-hot:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.ink}"
    typography: "{typography.deal-tag}"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  deal-tag-flash:
    backgroundColor: "{colors.flash}"
    textColor: "{colors.white}"
    typography: "{typography.deal-tag}"
    rounded: "{rounded.md}"
    padding: "4px 8px"
  pending:
    backgroundColor: "{colors.pending-bg}"
    textColor: "{colors.pending-ink}"
    rounded: "{rounded.md}"
    padding: "2px 8px"
---

# Design System: WaterKingsTech

## Overview

**Creative North Star: "Tidewater Market"**

A bright, busy, trustworthy shop window: the logo's royal-to-cyan blues pour across a search band and break on the logo's own wave, then settle into an ice-blue ground carrying a dense grid of white listing cards. The interface model is Jiji.com.gh, pinned by the user: coloured search band, category rail with live counts, deal-tagged listing cards, filterable listing pages. Familiarity is the feature; a Jiji user should know where everything is.

Density is high and deliberate. Cards are compact, chips are small, and every listing, service and offer ends in one green WhatsApp action. Colour does the merchandising work: blue for the shop and its links, one orange counter-accent for deals, and a fixed tag vocabulary (red SAVE, orange HOT DEAL, violet WEEKEND FLASH SALE, green gift) that buyers learn once and read everywhere.

Honesty is visible. Any business fact the owner has not supplied renders as an amber dashed Pending placeholder, never as invented copy. The old dark, cinematic brand hero is retired; this world is light, daylight-legible and phone-first.

**Key Characteristics:**
- Logo-sampled blues on an ice-blue ground; white bordered cards.
- The wave edge from the logo closes the search band, portal banners and the footer.
- Montserrat ExtraBold display (echoing the wordmark) over a Geist UI face.
- One orange counter-accent; a fixed, colour-coded deal-tag vocabulary.
- WhatsApp green is reserved for the action that starts a conversation.
- Amber dashed placeholders mark every unconfirmed fact.
- Restrained motion: ticker marquee, search-band rise-in, card hover lift, sheet slides; all off under reduced motion.

## Colors

A cool blue world sampled from the logo, cut by one hot orange and a small set of semantic tag colours.

### Primary
- **Logo Royal** (royal-600): the laptop base of the logo. Primary buttons, prices, links, active nav underline, active filter chips, warranty chips, focus outlines.
- **Wordmark Blue** (royal-500) and **Deep Royal** (royal-700, royal-800): the gradient stops of the search band, hover states for links and primary buttons, condition-chip text.
- **Royal Mist** (royal-50 to royal-300): tinted icon tiles, brand-new chip ground, hover washes for ghost/white buttons, outline-button hover border.

### Secondary
- **Rule Cyan** (cyan): the logo's rules. Ticker crown icons, hero search focus ring (at 50%), cyan-on-navy accents.
- **Pale Cyan** (cyan-200): text selection, accent words on navy panels, check icons on dark banners.
- **Harbour Navy** (navy, navy-950): the ticker strip, the laptop bundle banner, the corporate band and banner, browser theme colour; navy-950 is the shadow tint.

### Tertiary
- **Deal Orange** (orange, orange-strong): the single counter-accent. Hot Deals header button, "All deals" ticker tab, hero search submit, phone bundle banner, HOT DEAL tags. Text on orange is always ink, never white.
- **Save Red** (save): SAVE n% tags, out-of-stock notes, required-field asterisks and form errors.
- **Flash Violet** (flash): WEEKEND FLASH SALE tags and the repairs tile.
- **Gift Green** (gift on gift-bg): free-gift lines, Tested / Factory sealed assurance chips, brand-new tile, success messages.
- **WhatsApp Green** (whatsapp, whatsapp-hover, with whatsapp-ink text): every Buy / Ask / Send-on-WhatsApp action, the floating WhatsApp pill and the mobile action bar's lead button.

### Neutral
- **Ice Ground** (ice): page background, hover wash on rail rows, portal-switch track, used-condition chip ground.
- **Ice Paper** (ice-100): image wells behind product photos.
- **Ice Line** (ice-200): 1px card, header and rail borders and dividers. **Ice Line Strong** (ice-300): input and outline-button borders, card hover border.
- **Ink** (ink), **Ink Soft** (ink-soft), **Ink Muted** (ink-muted): headings and body, secondary nav and chip text, meta lines and placeholders. All tinted toward the brand blue.
- **Pending Amber** (pending-bg, pending-border at 60%, pending-ink): Tailwind amber-50/500/800, used only by the Pending placeholder. On dark grounds it flips to amber-300 at 10–50% with amber-100 text.

### Named Rules
**The One Counter-Accent Rule.** Orange is the only warm accent and it always means "deal". Do not use it for decoration, info, or a second brand colour.

**The Green Means Talk Rule.** WhatsApp green belongs to the action that opens a conversation. Gift green (gift) is a different, darker token and never fills a button.

**The Fixed Tag Vocabulary Rule.** SAVE is red, HOT DEAL is orange with ink text, WEEKEND FLASH SALE is violet. New deal types get a new colour only by adding to this vocabulary, never by recolouring an existing tag.

## Typography

**Display Font:** Montserrat 600/700/800 (with Geist, ui-sans-serif fallback)
**Body Font:** Geist (with ui-sans-serif, system-ui)
**Label/Mono Font:** Geist Mono is loaded but carries no reused role.

**Character:** Montserrat ExtraBold echoes the logo's wordmark and does the shouting: headlines, prices, bundle copy. Geist does everything you read and operate, at compact marketplace sizes.

### Hierarchy
- **Display** (Montserrat 800, 1.75rem → 2.25rem → 2.6rem, tight leading, -0.02em): the search-band question and page banner h1s (1.9rem → 2.25rem).
- **Headline** (Montserrat 700, 1.25rem → 1.5rem, -0.02em): section headers, paired with an optional royal "See all ›" link on the right.
- **Bundle** (Montserrat 800 uppercase, 1.45rem → 1.85rem, leading 1.05): bundle banner headliners and gift badges only.
- **Price** (Montserrat 800, 1.05rem → 1.125rem in cards, 1.875rem on the product page, royal-600, tabular numerals). With no price, a quieter Geist 600 "Ask for price" line in royal-700 sits under the name.
- **Title** (Geist 600, 0.86rem → 0.95rem, snug): listing card names, rail labels, list rows.
- **Body** (Geist 400, 0.95rem; meta at 0.72–0.8rem in ink-muted): leads, descriptions (max ~42rem), card highlights clamped to two lines.
- **Label** (Geist 500, 0.7rem): condition, warranty and assurance chips. Deal tags are Geist 800, 0.66rem, uppercase, 0.04em tracking.

### Named Rules
**The Heading Stands Alone Rule.** Section and page headings carry no label or eyebrow line above them. Context comes from breadcrumbs, the banner colour, or an inline badge beside the title (the UK Used warranty badge, the B2B badge).

**The Uppercase Is Merchandise Rule.** Uppercase is reserved for deal tags, bundle headliners and offer badges. Navigation, headings and body stay in sentence case.

## Layout

A centred container (77rem max) with 16px gutters on phones and 24px from 640px. Breakpoints are Tailwind's defaults (640 / 768 / 1024 / 1280px).

The home page stacks: navy ticker (36px), sticky white header (64px logo row plus a 44px category nav row on desktop), the full-bleed royal search band with wave edge, then a two-column body on desktop: a vertical category rail beside bundle banners, quick tiles and the listing grid. On phones the rail becomes a 4-column icon grid (8 columns at 640px).

Listing grids are dense: 2 columns on phones, 3 at 640px, 4 on wide desktop, with 8–12px gaps. Card internals use 10px padding on phones and 14px from 640px. Listing pages put a filter panel on the left on desktop and a slide-up filter sheet on phones, with horizontally scrolling type chips above the grid.

Phones get a fixed bottom action bar (WhatsApp / Call / Directions, 48px targets); page content reserves 4.5rem plus the safe-area inset for it. Desktop gets a floating WhatsApp pill bottom-right instead. Sticky header scroll padding is 7rem.

## Elevation & Depth

Hybrid: surfaces are flat and bordered at rest; soft, negatively-spread, brand-tinted shadows appear under coloured action buttons and as a hover response on cards and banners. Shadows are always tinted (navy-950, navy, or the button's own hue), never neutral grey, and always diffuse; there are no hard offset shadows.

### Shadow Vocabulary
- **Button glow** (`0 6px 16px -8px` in the button's own colour at 0.7–0.8): primary, WhatsApp and orange buttons, the Hot Deals header button.
- **Tag lift** (`0 4px 10px -4px rgb(3 26 61 / 0.45)`): deal tags sitting on photos.
- **Search float** (`0 10px 30px -14px rgb(3 26 61 / 0.55)`): the hero search field and category select on the blue band.
- **Card hover** (`0 18px 36px -22px rgb(6 42 92 / 0.45)`) and **banner hover** (`0 20px 40px -24px rgb(3 26 61 / 0.7)`): paired with a 2px lift.
- **Floating pill** (`0 14px 30px -12px rgb(15 122 61 / 0.7)`): the desktop WhatsApp pill.
- **Bar and sheet** (`0 -10px 30px -20px rgb(6 42 92 / 0.5)` upward; `-20px 0 50px -20px rgb(3 26 61 / 0.5)` sideways): mobile action bar and the slide-in menu.

### Named Rules
**The Flat Until Touched Rule.** Cards, rails and panels rest flat on a 1px ice-line border. Elevation is a hover response (lift plus shadow) or belongs to a coloured action.

## Shapes

Gently rounded and consistent. 12px (xl) for cards, rails, banners, panels and the hero search field; 8px (lg) for buttons, inputs, header controls and check tiles; 6px (md) for chips, deal tags and Pending placeholders; fully round for filter/type chips, popular-search chips, count badges and the floating WhatsApp pill. Borders are 1px ice-line. The logo's wave silhouette (two layered curves, the back one at 50% opacity) is the system's one signature shape, used only as a band edge in the current colour of the band below.

## Components

### Buttons
Solid, compact and tactile.
- **Shape:** gently rounded (8px); heights 36 / 44 / 48px (sm / md / lg); Geist 600.
- **Primary:** royal fill, white text, royal button glow; hover to royal-700.
- **WhatsApp:** WhatsApp green with near-black whatsapp-ink text (never white), green glow; hover to whatsapp-hover. Carries the WhatsApp glyph.
- **Orange:** orange with ink text; hover to orange-strong. Deals only.
- **Outline / White / Ghost:** white with ice-300 border (hover royal-300 border, royal-700 text); white with royal-700 text on dark bands; text-only royal-700 with royal-50 hover wash.
- **States:** all press to 97% scale; trailing arrows nudge 2px right on hover; focus is a 2px royal outline at 2px offset.

### Chips
- **Condition:** royal-50/royal-800 for Brand New, ice/ink-soft for UK Used with grade in muted text. **Warranty:** solid royal with white text and a shield icon. **Assurance:** gift-bg/gift ("Tested", "Factory sealed").
- **Type / filter chips:** 36px fully round pills; unselected white with ice-300 border and ink-soft text; selected solid royal with white text. Active-filter chips are 32px royal pills with a remove control.
- **Popular searches (on the blue band):** 32px round pills at 12% white with a 25% white ring; hover to solid white with royal-700 text.

### Cards / Containers
- **Listing card:** white, 1px ice-200 border, 12px radius, ice-100 image well at a 4:3.3 ratio with the deal tag pinned top-left. Body order: price, title, two-line highlight, location line, condition and warranty chips, gift line, availability note, then a full-width 40px WhatsApp button pinned to the bottom. Hover lifts 2px, deepens the border to ice-300 and scales the photo to 104%.
- **Panels and rails:** white, ice-200 border, 12px radius, ice-200 dividers between rows.
- **Bundle banners:** 12px radius colour panels (navy for laptops, orange for phones), uppercase Montserrat headline, a gift badge, a CTA pill, and a product photo fading in from the right.
- **Portal banners:** royal, navy or white panels with an oversized 10%-opacity outline icon at top-right, an inline badge beside the h1, check-icon point list, and a small wave edge at the bottom.

### Inputs / Fields
- **Hero search:** a 56px white field (12px radius) with the search-float shadow, paired with a category select on the left and an orange 44px submit square inside the right edge; focus is a 4px cyan ring at 50%.
- **Header search:** 40px white field (8px radius), ice-300 ring, royal submit square; focus is a 2px royal ring.
- **Form fields:** 44px, 8px radius, ice-300 border; focus turns the border royal with a 4px royal ring at 15%. Errors turn the border save-red with a save-red message beneath. Labels are Geist 600 above the field; optional hints sit inline in muted text.
- **Check tiles:** 44px bordered tiles; checked state goes royal border, royal-50 fill, royal-800 text.

### Navigation
- **Promo ticker:** a 36px navy strip with a continuous 48s marquee of offer headliners, each led by a cyan crown; pauses on hover; edges fade by mask; an orange "All deals" tab on the right from 640px.
- **Header:** sticky, white at 95% with backdrop blur and an ice-200 bottom border. Logo lockup, search (off on home), Retail | Corporate segmented switch (ice track, active segment white with royal-700 text), orange Hot Deals button. Desktop adds a category row: ink-soft labels, royal-700 when active with a 3px royal underline bar.
- **Mobile:** a slide-in menu sheet from the right and a fixed bottom action bar.
- **Breadcrumbs** open every inner page above its banner.

### Pending Placeholder (signature)
A 6px-radius, dashed amber-bordered inline chip on amber-50 with amber-800 text and a small dot, at 0.72rem. It stands in for every business fact not yet supplied (hours, turnaround, reviews, photos, terms). A dark variant serves navy or royal grounds. It is meant to look unfinished; do not restyle it to blend in.

### Wave Edge (signature)
The logo's double wave, rendered as an SVG band edge in `currentColor`: 48–80px tall under the search band (ice), 24–32px inside portal banners, 40–56px above the footer (white).

## Do's and Don'ts

### Do:
- **Do** put prices in Montserrat 800 royal-600 with tabular numerals; show "Ask for price" when the price is null.
- **Do** end every listing, service and offer with a WhatsApp-green action in whatsapp-ink text.
- **Do** render every unconfirmed business fact with the amber dashed Pending placeholder.
- **Do** keep cards white on the ice ground with a 1px ice-200 border and 12px radius.
- **Do** use the wave edge where a coloured band meets the next surface.
- **Do** keep motion to the ticker, the search-band rise-in (0.7s expo-out, 70ms stagger), card and banner hover lifts, and sheet slides, all neutralised under prefers-reduced-motion.

### Don't:
- **Don't** return to the old dark, cinematic brand hero or a centred-headline-over-equal-cards landing.
- **Don't** put a label, kicker or eyebrow line above headings.
- **Don't** use orange for anything but deals, or set white text on orange or WhatsApp green.
- **Don't** use neutral grey or hard offset shadows; shadows are soft and brand-tinted.
- **Don't** invent prices, reviews, hours, turnaround times or terms to fill a layout.
