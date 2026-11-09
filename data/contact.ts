import type { SocialLink, WhatsAppNumber } from "@/types";

/**
 * Contact details (from WaterKingsTech's flyers: "Call or WhatsApp").
 */
export const contact = {
  /** International format for tel: links */
  phone: "+233542609094" as string | null,
  /** How the number is displayed */
  phoneDisplay: "054 260 9094" as string | null,

  /**
   * Both numbers take WhatsApp. The FIRST one is used by every WhatsApp button
   * on the site (Buy on WhatsApp, WhatsApp Us…); both are listed in the
   * Visit and Contact areas. Reorder to change the main number.
   */
  whatsapp: [
    { number: "233542609094", display: "054 260 9094" },
    { number: "233206651139", display: "020 665 1139" },
  ] as WhatsAppNumber[],

  /** Supplied by WaterKingsTech on 9 November 2026. Corporate quote requests also go here. */
  email: "Waterkingstech@gmail.com" as string | null,

  /** Only add accounts that genuinely belong to WaterKingsTech. */
  socials: [] as SocialLink[],
} as const;

export type Contact = typeof contact;
