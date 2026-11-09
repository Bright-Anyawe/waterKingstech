# WaterKingsTech Website

The shop website for **WaterKingsTech**, a phone, laptop, accessories and repairs shop at Circle Mall, Tip Toe Lane (Blue Gate, Gate 2 Exit), Accra.

It works like a marketplace (modelled on Jiji): a blue search band, a category rail with live counts, listing pages with filters, and a page for every product. It takes visitors from **search → product or service → WhatsApp, call, email or directions**. There is no cart, checkout or accounts: every "Buy" button opens WhatsApp with the message already written.

## Pages

| Route | What it is |
| --- | --- |
| `/` | Retail (B2C) home: search band, category rail, bundle banners, trending deals, repairs, referral & installment, corporate, visit, reviews |
| `/shop`, `/shop/phones`, `/shop/laptops`, `/shop/accessories` | Listings with search, category / type / condition / deal filters and sorting. Filters live in the URL, so a filtered page can be shared. |
| `/uk-used`, `/brand-new` | Condition portals: UK Used (tested, 3-month warranty) and Brand New (fresh in box) |
| `/deals` | Every product with a deal tag, plus the bundle banners |
| `/product/<id>` | Product page: photo, price, warranty, free gift, Buy on WhatsApp, Make an offer / Ask for a discount, Swap for this, Tap & Earn, similar items |
| `/swap` | Swap & upgrade: a trade-in request form (phones and laptops) that opens WhatsApp or email |
| `/tap-and-earn` | Tap & Earn: how sharing earns commission, plus a form to set your name and register on WhatsApp |
| `/repairs` | Repair & diagnostic hub with turnaround times |
| `/referral-installment` | Installment plans and referral commission tiers |
| `/corporate` | Corporate (B2B) portal with a bulk-quote form that opens WhatsApp or email |
| `/visit` | Live Google map, contact details, shop photos and reviews |

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS v4. Design tokens live in `app/globals.css`; the brand blues are sampled from the logo.
- Fonts: Montserrat for headings (it echoes the logo's wordmark) and Geist for text
- Motion for the menu and filter sheet, loaded lazily and respecting `prefers-reduced-motion`
- Lucide icons and `next/image`

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000. Other commands: `npm run build`, `npm start`, `npm run lint`.

## Editing content

All content lives in `/data`, so you rarely need to touch the components.

| File | What it controls |
| --- | --- |
| `data/contact.ts` | Phone, WhatsApp numbers (the first is used by all WhatsApp buttons), email, social links |
| `data/products.ts` | Product catalog: name, variant, condition, grade, specs, price, stock, image, deal tag, featured |
| `data/offers.ts` | Warranty per condition, free gift per category, bundle banners, ticker messages |
| `data/categories.ts` | Categories, their page addresses and sub-categories |
| `data/repairs.ts` | Repair and diagnostic services and their turnaround times |
| `data/programs.ts` | Installment plan details and referral commissions |
| `data/corporate.ts` | Corporate portal: audiences, offers, quote-form options, steps |
| `data/business.ts` | Address, map, opening hours, shop photos, taglines |
| `data/testimonials.ts` | Customer reviews |
| `data/navigation.ts` | Header category row and the Retail / Corporate switch |
| `data/hero.ts` | Background video in the search band (files in `public/videos`) |

- **Prices:** set `price` in cedis (for example `12500`). `null` shows "Ask for price".
- **Condition:** `"uk-used"` shows the 3-month warranty badge; `"brand-new"` shows "Factory sealed". Add `grade` for UK used devices, for example `"Excellent"`.
- **Deal tags:** `deal: { type: "save", percent: 40 }`, `{ type: "hot" }` or `{ type: "flash" }` (Weekend flash sale). Remove `deal` to drop the tag.
- **Negotiation:** every item shows "Negotiable" and a Make an offer box. Set `negotiable: false` on a product for a fixed price, or change `negotiableByDefault` in `data/offers.ts`.
- **Discounts:** besides deal tags, set `wasPrice` above `price` and the card shows the old price crossed out with the % saved.
- **Warranty:** UK used items show the 3-month warranty and brand-new items show "Warranty: ask us" until a period is set in `data/offers.ts`. A product's own `warranty` (e.g. `"6-month warranty"`) overrides both.
- **Swap:** `swap` in `data/offers.ts` sets which categories can be swapped, the device types and conditions in the form, and the swap terms.
- **Stock:** set `availability` to `in-stock`, `limited-stock`, `out-of-stock` or `on-request`.
- **Top picks:** `featured: true` puts a product first in "Trending deals". `highlight` is its one-line description.
- **Real photos:** put files in `public/images/...` and use for example `src: "/images/products/iphone-15-pro.jpg"`.
- **Going live with real stock:** set `catalogIsSample` to `false` in `data/products.ts` to remove the "Sample listings" notice.

A value of `null` means "not supplied yet". The site shows a dashed amber placeholder for it, so nothing unconfirmed is ever presented as real.

### Tap & Earn

Every item has a **Tap & Earn** button. The first time, it asks for the sharer's name (remembered on that device), then shares the item to WhatsApp or the phone's share sheet with a link like `/product/<id>?ref=Ama`. A visitor who arrives through that link has "Referred by: Ama (Tap & Earn)" added to their Buy, offer and swap WhatsApp messages, so the shop knows who to pay. Commission amounts come from `data/programs.ts`.

### Logo

The client's original file is `public/brand/logo-original.png`. Its "TECH" and tagline are white on a white background, so the site uses two transparent cut-outs, `logo-mark.png` and `logo-wordmark.png`, and sets "TECH" and "Expert Tech Solutions, Always Reliable." as live text in `components/brand/Logo.tsx`. If the client can send a version with a transparent background (or an SVG), swap it in.

### Still needed from WaterKingsTech

- [ ] Real product list with prices and photos, and which products carry which deal tag. The current catalog is **sample inventory** with representative Unsplash photos and example deal tags.
- [ ] Repair turnaround times (screens, batteries, SSD, board repair, diagnostics)
- [ ] Opening hours
- [ ] Exact Google Maps pin or listing link. The map currently points to Tip Toe Lane, next to Circle Mall.
- [ ] Shop photos: front and inside
- [ ] Genuine customer reviews, shared with permission
- [ ] Installment plan terms: guidelines, eligibility, required documents, payment conditions
- [ ] Referral / Tap & Earn payout terms, such as how and when commission is paid
- [ ] Warranty period for brand-new devices (they show "Warranty: ask us" until then)
- [ ] Swap terms: which devices are accepted and how they are valued
- [ ] Corporate bulk discount rates or terms, if they should be shown
- [ ] Logo with a transparent background, or an SVG (optional)
- [ ] Social media accounts, if any

## Deployment (Vercel)

1. Import this GitHub repository in Vercel. It detects Next.js automatically.
2. Add the environment variable `NEXT_PUBLIC_SITE_URL` with the live domain (for example `https://waterkingstech.com`). Canonical URLs, the sitemap, `robots.txt` and Open Graph tags use it.
3. Deploy.

## SEO

- Metadata, Open Graph and Twitter cards are set in `app/layout.tsx`, with per-page titles and descriptions on every route. The social share image, built from the logo, is generated by `app/opengraph-image.tsx`.
- `app/sitemap.ts` and `app/robots.ts` generate `/sitemap.xml` (every page and product) and `/robots.txt`.
- An `ElectronicsStore` JSON-LD block is built from `/data` in `lib/structured-data.ts`. It includes the address, phone, email and hours automatically once they are filled in.
