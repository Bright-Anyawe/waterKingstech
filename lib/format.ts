import type { Availability } from "@/types";

const cedis = new Intl.NumberFormat("en-GH", { maximumFractionDigits: 0 });

/** 12500 → "GH₵ 12,500" */
export function formatPrice(price: number): string {
  return `GH₵ ${cedis.format(price)}`;
}

export const availabilityLabel: Record<Availability, string> = {
  "in-stock": "In stock",
  "limited-stock": "Limited stock",
  "out-of-stock": "Out of stock",
  "on-request": "Ask for availability",
};
