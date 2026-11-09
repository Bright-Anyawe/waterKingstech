# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Retail buyers (B2C):** individuals in Accra and across Ghana, mostly browsing on Android phones over mobile data. They want a phone, laptop or accessory at a fair single-unit price, often comparing UK-used against brand-new, and they close the deal by WhatsApp chat or a shop visit.
- **Corporate buyers (B2B):** companies, schools and NGOs buying in bulk. They need bulk pricing, a formal PDF quotation, official invoicing and long-term repair retainers.
- **Repair customers:** people with a cracked screen, weak battery, slow laptop or board fault who want to know what the shop fixes and how long it takes.
- **Referral agents:** people who send buyers to the shop and earn a commission (GH₵ 50 – GH₵ 400).
- The site is built by Bright Anyawe for the client, the WaterKingsTech shop owner. The client reviews previews, usually as PDFs.

## Product Purpose

A marketplace-style shop window for WaterKingsTech. It takes a visitor from search → product or service → WhatsApp, call, email or directions. There is no cart, checkout or account system: every "Buy" action opens WhatsApp with the message already written. Success is a visitor finding the right device or service within seconds and starting a conversation with the shop.

## Positioning

A real shop at Circle Mall, Tip Toe Lane (Blue Gate, Gate 2 Exit), Accra. It sells both tested UK-used devices (3-month warranty) and factory-sealed brand-new devices, repairs phones and laptops on site, offers installment plans and pays referral commissions. It also bundles free gifts: a free laptop bag with a laptop, and a free case and screen protector with a phone.

## Operating Context

- Visitors arrive from flyers, WhatsApp shares and search, mostly on phones in daylight.
- Conversations and deals happen on WhatsApp (054 260 9094 or 020 665 1139), by phone or by email (Waterkingstech@gmail.com).
- Corporate requests become a formal PDF quotation and an official invoice, prepared by the shop off-site.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, Tailwind v4; the user deploys it themselves (Vercel).
- All content lives in `/data`. A `null` value means "not supplied yet" and renders a visible amber placeholder.
- Deal tags per product: "SAVE n%", "HOT DEAL", "WEEKEND FLASH SALE".
- Bundle headliners (client-supplied copy): "BUY A LAPTOP & SAVE UP TO 40% + FREE LAPTOP BAG" and "BUY A PHONE & GET FREE CASE + SCREEN PROTECTOR".
- UK-used devices carry a 3-month warranty (confirmed 2026-11-09). No warranty period has been supplied for brand-new devices.
- The corporate quote form has no backend; it composes a WhatsApp message or an email.
- Undecided: repair turnaround times, real stock and prices, opening hours, installment terms, referral payout terms, exact map pin.

## Brand Commitments

- Name: WaterKingsTech. Official logo supplied 2026-11-09: a crown over a laptop with a wave on its screen, the wordmark "WATER KINGS", "TECH" between two rules, and the tagline "Expert Tech Solutions, Always Reliable." The supplied file has a white background, and its "TECH" and tagline are white, so they are reset as live text.
- Flyer taglines: "Your Next Device. Your Trusted Tech Partner." and "Top quality. Best prices. Trusted service."
- The user pinned the interface model: it should work like Jiji.com.gh (a coloured search band, a category sidebar with counts, dense listing cards, listing pages with filters), very easy to use and eye-catching.

## Evidence on Hand

- Owner flyers (2026-09-23): phone/WhatsApp numbers, address, landmark, referral and installment commission tables.
- Logo file (2026-11-09), email address, 3-month UK-used warranty, promo headliners and the B2B/B2C scope.
- Hero video and poster in `public/videos`.
- **Absent, never fabricate:** real product list, prices and photos (the catalog is sample stock with Unsplash images), customer reviews, shop photos, opening hours, repair turnaround times, installment terms, referral payout terms, bulk discount rates, social accounts.

## Product Principles

1. Never invent a business fact. Unconfirmed details render as visible placeholders.
2. Every listing, service and offer ends in one tap to WhatsApp.
3. Familiar marketplace patterns over novelty: a Jiji user should know where everything is.
4. Built for a phone on mobile data: fast, legible in daylight, thumb-reachable actions.

## Accessibility & Inclusion

Plain English, large tap targets, WCAG AA contrast, works without hover, respects reduced motion and data saver.
