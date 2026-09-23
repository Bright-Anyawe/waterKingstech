import type { SocialLink } from "@/types";

/**
 * Contact details (from WaterKingsTech's flyers: "Call or WhatsApp").
 */
export const contact = {
  /** International format for tel: links */
  phone: "+233542609094" as string | null,
  /** How the number is displayed */
  phoneDisplay: "054 260 9094" as string | null,

  /** Digits only, international format without "+" — used for wa.me links */
  whatsapp: "233206651139" as string | null,
  /** How the WhatsApp number is displayed */
  whatsappDisplay: "020 665 1139" as string | null,

  email: null as string | null,

  /** Only add accounts that genuinely belong to WaterKingsTech. */
  socials: [] as SocialLink[],
} as const;

export type Contact = typeof contact;
