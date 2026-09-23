import { business } from "@/data/business";
import { contact } from "@/data/contact";
import type { Product, RepairService } from "@/types";

/* -------------------------------------------------------------------------- */
/*  WhatsApp                                                                  */
/* -------------------------------------------------------------------------- */

const greeting = `Hello ${business.name},`;

export const whatsappMessages = {
  general: `${greeting} I found you through your website and I'd like to make an enquiry.`,
  repair: `${greeting} I need help repairing my device. I'd like to ask about your repair service.`,
  installment: `${greeting} I'm interested in purchasing a device through your installment option. Please send me the requirements and available options.`,
  referral: `${greeting} I'd like to know more about your referral program.`,
  visit: `${greeting} I'd like to visit your shop. Could you share directions?`,
  review: `${greeting} I'd like to share a review of my experience with you.`,
  catalog: `${greeting} I'm looking for a device that I didn't see on your website. Can you help?`,
} as const;

export function productMessage(product: Product): string {
  const title = productTitle(product);

  if (product.availability === "out-of-stock") {
    return `${greeting} I'm interested in the ${title} listed on your website. Will it be back in stock soon?`;
  }
  if (product.price === null) {
    return `${greeting} I'm interested in the ${title} listed on your website. Is it currently available, and what is the price?`;
  }
  return `${greeting} I'm interested in the ${title} listed on your website. Is it currently available?`;
}

export function repairMessage(service: RepairService): string {
  return `${greeting} I need help with ${service.name.toLowerCase()} for my device. I'd like to ask about your repair service.`;
}

/**
 * wa.me link with a prepared message. Until the business number is supplied,
 * WhatsApp opens with the message ready and lets the visitor choose a chat.
 */
export function whatsappHref(message: string = whatsappMessages.general): string {
  const text = encodeURIComponent(message);
  return contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${text}` : `https://wa.me/?text=${text}`;
}

/* -------------------------------------------------------------------------- */
/*  Phone & directions                                                        */
/* -------------------------------------------------------------------------- */

/** tel: link, or the contact section until a number is supplied. */
export const callHref = contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : "#contact";

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
