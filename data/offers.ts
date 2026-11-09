import type { CategoryId, Condition, Deal, Product } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Offers, bundles and warranty (from WaterKingsTech's brief)                 */
/* -------------------------------------------------------------------------- */

/**
 * Warranty by condition. UK-used warranty confirmed on 9 November 2026.
 * `null` = period not supplied yet: the item shows "Warranty: ask us".
 * A product's own `warranty` field overrides this.
 */
export const warranty: Record<Condition, string | null> = {
  "uk-used": "3-month warranty",
  "brand-new": null,
};

export const warrantyPending = "Warranty: ask us";

export function warrantyFor(product: Product): string | null {
  return product.warranty ?? warranty[product.condition];
}

/**
 * Negotiation (client brief, 9 Nov 2026: "allow room for negotiation").
 * Every item is negotiable unless a product sets `negotiable: false`.
 */
export const negotiableByDefault = true;

export function isNegotiable(product: Product): boolean {
  return product.negotiable ?? negotiableByDefault;
}

/** Swap / trade-in (client brief, 9 Nov 2026). Terms and valuation are not supplied yet. */
export const swap = {
  categories: ["smartphones", "laptops"] as CategoryId[],
  deviceTypes: ["Phone", "Laptop"],
  conditions: ["Like new", "Good (light scratches)", "Fair (visible wear)", "Faulty or cracked"],
  terms: null as string | null,
};

export function isSwappable(product: Product): boolean {
  return swap.categories.includes(product.category);
}

/** Free gift that comes with every purchase in a category. */
export const giftByCategory: Partial<Record<CategoryId, string>> = {
  laptops: "Free laptop bag",
  smartphones: "Free case + screen protector",
};

/** The two bundle headliners shown on the home page and in the ticker. */
export const bundles = [
  {
    id: "laptop",
    category: "laptops" as CategoryId,
    lead: "Buy a laptop",
    headline: "Save up to 40%",
    gift: "+ Free laptop bag",
    cta: "Shop laptops",
  },
  {
    id: "phone",
    category: "smartphones" as CategoryId,
    lead: "Buy a phone",
    headline: "Get a free case",
    gift: "+ Screen protector",
    cta: "Shop phones",
  },
] as const;

/** Lines that scroll in the ticker above the header. */
export const tickerMessages = [
  "Buy a laptop & save up to 40% + free laptop bag",
  "Buy a phone & get a free case + screen protector",
  "Prices are negotiable — make us an offer",
  "Swap your old phone or laptop",
  "UK used devices come with a 3-month warranty",
  "Buy now, pay in installments",
  "Tap & Earn: share an item, earn GH₵ 50 – GH₵ 400",
  "Visit us: Circle Mall, Blue Gate — Gate 2 Exit",
];

export const conditionLabel: Record<Condition, string> = {
  "uk-used": "UK Used",
  "brand-new": "Brand New",
};

export function dealLabel(deal: Deal): string {
  switch (deal.type) {
    case "save":
      return `Save ${deal.percent}%`;
    case "hot":
      return "Hot deal";
    case "flash":
      return "Weekend flash sale";
  }
}
