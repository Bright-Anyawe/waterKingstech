import type { Availability } from "@/types";

const cedis = new Intl.NumberFormat("en-GH", { maximumFractionDigits: 0 });

/** 12500 → "GH₵ 12,500" (non-breaking space, so the symbol never wraps away from the amount) */
export function formatPrice(price: number): string {
  return `GH₵\u00a0${cedis.format(price)}`;
}

/** "Screen replacement" → "screen replacement" mid-sentence; acronyms ("RAM upgrade", "SSD / HDD upgrade") stay as they are. */
export function inSentence(text: string): string {
  return /^[A-Z][a-z]/.test(text) ? text[0].toLowerCase() + text.slice(1) : text;
}

export const availabilityLabel: Record<Availability, string> = {
  "in-stock": "In stock",
  "limited-stock": "Limited stock",
  "out-of-stock": "Out of stock",
  "on-request": "Ask for availability",
};
