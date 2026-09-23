/* -------------------------------------------------------------------------- */
/*  Shared content types                                                      */
/*  Everything the site displays is driven by the files in /data.             */
/*  `null` always means "not supplied yet" and renders a visible placeholder. */
/* -------------------------------------------------------------------------- */

export type ImageAsset = {
  src: string;
  alt: string;
};

/* ---------------------------------- Catalog --------------------------------- */

export type CategoryId = "smartphones" | "laptops" | "accessories";

export type SubcategoryId =
  | "iphone"
  | "samsung"
  | "other-phones"
  | "windows"
  | "macbook"
  | "ssd"
  | "pen-drives"
  | "screens"
  | "earbuds"
  | "chargers"
  | "other-accessories";

export type Subcategory = {
  id: SubcategoryId;
  label: string;
};

export type Category = {
  id: CategoryId;
  label: string;
  description: string;
  image: ImageAsset;
  subcategories: Subcategory[];
};

export type Availability = "in-stock" | "limited-stock" | "out-of-stock" | "on-request";

export type Condition = "Brand new" | "UK used" | "Excellent condition" | "Very good condition" | "Refurbished";

export type Product = {
  /** Unique, URL-safe identifier */
  id: string;
  /** Model name, e.g. "iPhone 15 Pro" */
  name: string;
  /** Main variant shown next to the name and in the WhatsApp message, e.g. "256GB" */
  variant?: string;
  category: CategoryId;
  subcategory: SubcategoryId;
  condition?: Condition;
  /** 2–4 short, scannable specs */
  specs: string[];
  /** Price in Ghana cedis. `null` shows "Price on request". */
  price: number | null;
  availability: Availability;
  image: ImageAsset;
  /** Shown in the larger Featured Products section */
  featured?: boolean;
  /** One-line pitch used on featured cards */
  highlight?: string;
};

/* ---------------------------------- Repairs --------------------------------- */

export type RepairIcon =
  | "screen"
  | "battery"
  | "ssd"
  | "board"
  | "phone-diagnostics"
  | "laptop-diagnostics"
  | "quick-repair";

export type RepairService = {
  id: string;
  name: string;
  description: string;
  icon: RepairIcon;
  /** Only shown when supplied by WaterKingsTech, e.g. "Same day" */
  turnaround: string | null;
};

/* -------------------------------- Testimonials ------------------------------ */

export type Testimonial = {
  id: string;
  name: string;
  /** e.g. "Bought an iPhone 15 Pro" or "Laptop screen repair" */
  context?: string;
  quote: string;
  photo?: ImageAsset;
  /** 1–5. Only set when the customer genuinely gave a rating. */
  rating?: number;
  /** Placeholder content is visibly labelled on the site. */
  isPlaceholder?: boolean;
};

/* ------------------------------ Business details ---------------------------- */

export type OpeningHours = {
  /** e.g. "Monday – Friday" */
  days: string;
  /** e.g. "8:00am – 7:00pm" or "Closed" */
  hours: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export type InfoGroup = {
  id: string;
  title: string;
  /** `null` until WaterKingsTech supplies the details */
  items: string[] | null;
};
