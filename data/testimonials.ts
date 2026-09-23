import type { Testimonial } from "@/types";

/**
 * Customer reviews.
 *
 * ⚠️  PLACEHOLDERS — these are clearly labelled on the site. Replace them with
 *     genuine reviews (with the customer's permission) and remove
 *     `isPlaceholder`. Only add `rating` if the customer actually gave one.
 */
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    name: "Customer name",
    context: "Smartphone purchase",
    quote:
      "A genuine customer review will appear here — for example, a short note about buying a phone from WaterKingsTech.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    name: "Customer name",
    context: "Laptop repair",
    quote:
      "A genuine customer review will appear here — for example, how a repair or diagnostic visit went.",
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    name: "Customer name",
    context: "Installment purchase",
    quote:
      "A genuine customer review will appear here — for example, a customer's experience buying on installment.",
    isPlaceholder: true,
  },
];
