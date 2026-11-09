import { business } from "@/data/business";
import { contact } from "@/data/contact";
import { conditionLabel } from "@/data/offers";
import type { Product, RepairService } from "@/types";

/* -------------------------------------------------------------------------- */
/*  WhatsApp                                                                  */
/* -------------------------------------------------------------------------- */

const greeting = `Hello ${business.name},`;

export const whatsappMessages = {
  general: `${greeting} I found you through your website and I'd like to make an enquiry.`,
  repair: `${greeting} I need help repairing my device. I'd like to ask about your repair service.`,
  installment: `${greeting} I'm interested in buying a device on installment. Please send me the requirements and available options.`,
  referral: `${greeting} I'd like to join your referral program and earn commission.`,
  visit: `${greeting} I'd like to visit your shop. Could you share directions?`,
  review: `${greeting} I'd like to share a review of my experience with you.`,
  catalog: `${greeting} I'm looking for a device that I didn't see on your website. Can you help?`,
  deals: `${greeting} I saw your deals on the website. Which offers are available today?`,
  corporate: `${greeting} I'm buying for an organisation and would like a bulk quotation.`,
  swap: `${greeting} I'd like to swap my old device for another one. How does it work?`,
  tapEarn: `${greeting} I'd like to join Tap & Earn and earn commission for buyers I send to you.`,
} as const;

/** Appended to a buyer's message when they arrived through a Tap & Earn link. */
export function withReferrer(message: string, referrer: string | null): string {
  return referrer ? `${message}

Referred by: ${referrer} (Tap & Earn)` : message;
}

export function offerMessage(product: Product, amount: string, note?: string): string {
  const title = `${productTitle(product)} (${conditionLabel[product.condition]})`;
  const base = `${greeting} I'm interested in the ${title} on your website. I'd like to offer ${amount}. Can we agree on that?`;
  return note ? `${base}

${note}` : base;
}

export function discountMessage(product: Product): string {
  const title = `${productTitle(product)} (${conditionLabel[product.condition]})`;
  return `${greeting} I'm interested in the ${title} on your website. Is there any discount you can give me on it?`;
}

export function swapForMessage(product: Product): string {
  return `${greeting} I'd like to swap my old device for the ${productTitle(product)} on your website. How much would I need to add?`;
}

export function productMessage(product: Product): string {
  const title = `${productTitle(product)} (${conditionLabel[product.condition]})`;

  if (product.availability === "out-of-stock") {
    return `${greeting} I'm interested in the ${title} on your website. Will it be back in stock soon?`;
  }
  if (product.price === null) {
    return `${greeting} I'm interested in the ${title} on your website. Is it available, and what is the price?`;
  }
  return `${greeting} I'm interested in the ${title} on your website. Is it available?`;
}

export function repairMessage(service: RepairService): string {
  return `${greeting} I need help with ${service.name.toLowerCase()} for my device. How long would it take, and what would it cost?`;
}

/**
 * wa.me link with a prepared message, to the main WhatsApp number unless another
 * is given. With no number configured, WhatsApp opens with the message ready and
 * lets the visitor choose a chat.
 */
export function whatsappHref(
  message: string = whatsappMessages.general,
  number: string | undefined = contact.whatsapp[0]?.number,
): string {
  const text = encodeURIComponent(message);
  return number ? `https://wa.me/${number}?text=${text}` : `https://wa.me/?text=${text}`;
}

/** e.g. "054 260 9094 / 020 665 1139" */
export const whatsappNumbersDisplay = contact.whatsapp.map((w) => w.display).join(" / ");

/* -------------------------------------------------------------------------- */
/*  Email                                                                     */
/* -------------------------------------------------------------------------- */

export function emailHref(subject?: string, body?: string): string | null {
  if (!contact.email) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  // URLSearchParams encodes spaces as "+", which mail clients show literally.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${contact.email}${query ? `?${query}` : ""}`;
}

/* -------------------------------------------------------------------------- */
/*  Phone & directions                                                        */
/* -------------------------------------------------------------------------- */

/** tel: link, or the visit page until a number is supplied. */
export const callHref = contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : "/visit";

export const hasPhone = Boolean(contact.phone);

/** Google Maps directions to the shop: exact pin if supplied, otherwise the shop's address. */
export const directionsHref = (() => {
  const { coordinates, mapsUrl, mapQuery } = business.location;
  if (coordinates) {
    return `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
  }
  if (mapsUrl) return mapsUrl;
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;
})();

/* -------------------------------------------------------------------------- */
/*  Shared                                                                    */
/* -------------------------------------------------------------------------- */

export function productTitle(product: Product): string {
  return product.variant ? `${product.name} ${product.variant}` : product.name;
}
