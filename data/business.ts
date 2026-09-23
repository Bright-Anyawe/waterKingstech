import type { ImageAsset, OpeningHours } from "@/types";

/**
 * Core business information (from WaterKingsTech's flyers).
 *
 * ⚠️  Fields set to `null` have NOT been supplied by WaterKingsTech yet.
 *     The site shows a clearly marked placeholder wherever they are used.
 *     Never replace them with guesses — only with confirmed details.
 */
export const business = {
  name: "WaterKingsTech",
  tagline: "Your Next Device. Your Trusted Tech Partner.",
  slogan: "Top quality. Best prices. Trusted service.",
  summary: "Phones • Laptops • Accessories • Repairs",
  description:
    "WaterKingsTech is your one-stop tech destination in Accra — genuine smartphones, laptops and accessories, professional device repairs, installment plans and referral rewards.",
  country: "Ghana",
  countryCode: "GH",

  location: {
    /** Landmark from the flyers — the shop is at this exit. */
    landmark: "Blue Gate, Gate 2 Exit",
    /** Street address from the flyers. */
    address: "Circle Mall, Tip Toe Lane" as string | null,
    /** Circle Mall on Tip Toe Lane is in the Circle area of Accra. */
    city: "Accra" as string | null,
    region: "Greater Accra" as string | null,
    /**
     * Used for the embedded map and directions until an exact pin is supplied.
     * Google Maps pins Tip Toe Lane with Circle Mall labelled beside it
     * ("Circle Mall, Tip Toe Lane…" itself doesn't resolve to a pin).
     */
    mapQuery: "Tip Toe Lane, Accra, Ghana",
    /** Exact shop coordinates (Google Maps → right-click the pin). Overrides mapQuery. */
    coordinates: null as { lat: number; lng: number } | null,
    /**
     * Google Maps "Embed a map" iframe src for the shop's own listing
     * (Google Maps → Share → Embed a map → copy the src="…" value). Overrides mapQuery.
     */
    mapEmbedUrl: null as string | null,
    /** The shop's own Google Maps share link (Share → Copy link), if it has a listing. */
    mapsUrl: null as string | null,
  },

  /** e.g. [{ days: "Monday – Saturday", hours: "8:00am – 7:00pm" }, { days: "Sunday", hours: "Closed" }] */
  openingHours: null as OpeningHours[] | null,

  /** Real photos of the shop front / interior. Add files to /public/images/shop. */
  shopPhotos: [] as ImageAsset[],
} as const;

export type Business = typeof business;
