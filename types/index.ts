/* -------------------------------------------------------------------------- */
/*  Shared content types                                                      */
/*  Everything the site displays is driven by the files in /data.             */
/*  `null` always means "not supplied yet" and renders a visible placeholder. */
/* -------------------------------------------------------------------------- */

export type ImageAsset = {
  src: string;
  alt: string;
};

/* ---------------------------------- Catalog --------------------------------- */

export type CategoryId = "smartphones" | "laptops" | "accessories";

/** URL segment for each category page, e.g. /shop/phones */
export type CategorySlug = "phones" | "laptops" | "accessories";

export type SubcategoryId =
  | "iphone"
  | "samsung"
  | "other-phones"
  | "windows"
  | "macbook"
  | "ssd"
  | "pen-drives"
  | "screens"
  | "earbuds"
  | "chargers"
  | "other-accessories";

export type Subcategory = {
  id: SubcategoryId;
  label: string;
};

export type Category = {
  id: CategoryId;
  slug: CategorySlug;
  label: string;
  /** Short name used in the header and on the category rail */
  shortLabel: string;
  description: string;
  image: ImageAsset;
  subcategories: Subcategory[];
};

export type Availability = "in-stock" | "limited-stock" | "out-of-stock" | "on-request";

/** "uk-used": tested, imported, graded devices. "brand-new": factory sealed ("fresh in box"). */
export type Condition = "uk-used" | "brand-new";

/**
 * Promotional tag shown on the product card.
 * - save:  "SAVE 40%"
 * - hot:   "HOT DEAL"
 * - flash: "WEEKEND FLASH SALE"
 */
export type Deal = { type: "save"; percent: number } | { type: "hot" } | { type: "flash" };

export type Product = {
  /** Unique, URL-safe identifier — also the product page address: /product/<id> */
  id: string;
  /** Model name, e.g. "iPhone 15 Pro" */
  name: string;
  /** Main variant shown next to the name and in the WhatsApp message, e.g. "256GB" */
  variant?: string;
  category: CategoryId;
  subcategory: SubcategoryId;
  condition: Condition;
  /** Cosmetic grade for UK-used devices, e.g. "Excellent" */
  grade?: string;
  /** 2–4 short, scannable specs */
  specs: string[];
  /** Price in Ghana cedis. `null` shows "Ask for price". */
  price: number | null;
  /** Previous price in cedis — shown crossed out, with the % saved, when it is higher than `price`. */
  wasPrice?: number;
  /** Overrides the warranty for this item, e.g. "6-month warranty". Default comes from data/offers.ts. */
  warranty?: string;
  /** Set to false for a fixed-price item. Default comes from data/offers.ts (negotiable). */
  negotiable?: boolean;
  availability: Availability;
  image: ImageAsset;
  /** Optional promotional tag */
  deal?: Deal;
  /** Shown first in the home page's "Trending" grid */
  featured?: boolean;
  /** One-line pitch shown on the card and product page */
  highlight?: string;
};

/* ---------------------------------- Repairs --------------------------------- */

export type RepairIcon =
  | "screen"
  | "battery"
  | "ssd"
  | "ram"
  | "board"
  | "phone-diagnostics"
  | "laptop-diagnostics"
  | "quick-repair";

export type RepairService = {
  id: string;
  name: string;
  description: string;
  icon: RepairIcon;
  /** Estimated turnaround, e.g. "Same day" or "1–2 days". `null` until WaterKingsTech supplies it. */
  turnaround: string | null;
};

/* -------------------------------- Testimonials ------------------------------ */

/**
 * How the shop confirmed a reviewer really bought or repaired with them.
 * - "whatsapp-order": matched to the customer's WhatsApp order chat
 * - "shop-receipt": matched to an in-store sale or repair receipt
 * - "google": posted publicly on the shop's Google Business profile (give `url`)
 */
export type ReviewVerification = "whatsapp-order" | "shop-receipt" | "google";

export type Testimonial = {
  id: string;
  /** As the customer agreed to be shown, e.g. "Kofi A." */
  name: string;
  /** What they bought or had fixed, e.g. "Bought an iPhone 15 Pro" or "Laptop screen repair" */
  context?: string;
  quote: string;
  /** Month of the purchase or review, "YYYY-MM", e.g. "2026-11" */
  date?: string;
  /** e.g. "Accra" */
  location?: string;
  photo?: ImageAsset;
  /** 1–5. Only set when the customer genuinely gave a rating. */
  rating?: number;
  /**
   * Only set after the shop has matched the review to a real order or repair.
   * Reviews without it are shown without the Verified buyer badge.
   */
  verification?: {
    method: ReviewVerification;
    /** Public link to the original, e.g. the Google review */
    url?: string;
  };
};

/* ------------------------------ Business details ---------------------------- */

export type OpeningHours = {
  /** e.g. "Monday – Friday" */
  days: string;
  /** e.g. "8:00am – 7:00pm" or "Closed" */
  hours: string;
  /** The same hours in schema.org format for search engines, e.g. "Mo-Sa 08:00-19:00" */
  schema?: string;
};

export type WhatsAppNumber = {
  /** Digits only, international format without "+", e.g. "233542609094" */
  number: string;
  /** How the number is displayed, e.g. "054 260 9094" */
  display: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type InfoGroup = {
  id: string;
  title: string;
  /** `null` until WaterKingsTech supplies the details */
  items: string[] | null;
};
