import type { CategoryId, Condition, Deal } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Offers, bundles and warranty (from WaterKingsTech's brief)                 */
/* -------------------------------------------------------------------------- */

/**
 * Warranty by condition. UK-used warranty confirmed on 9 November 2026.
 * `null` = not supplied yet, so no warranty badge is shown.
 */
export const warranty: Record<Condition, string | null> = {
  "uk-used": "3-month warranty",
  "brand-new": null,
};

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
  "UK used devices come with a 3-month warranty",
  "Buy now, pay in installments",
  "Refer a buyer & earn GH₵ 50 – GH₵ 400",
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
