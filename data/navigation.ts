export type NavItem = {
  label: string;
  href: string;
};

/** Category row under the header (desktop) and the main list in the mobile menu. */
export const navItems: NavItem[] = [
  { label: "Phones", href: "/shop/phones" },
  { label: "Laptops", href: "/shop/laptops" },
  { label: "Accessories", href: "/shop/accessories" },
  { label: "UK Used", href: "/uk-used" },
  { label: "Brand New", href: "/brand-new" },
  { label: "Repairs", href: "/repairs" },
  { label: "Installment & Referral", href: "/referral-installment" },
  { label: "Visit the shop", href: "/visit" },
];

/** Retail (B2C) and Corporate (B2B) portals, shown as a switch in the header. */
export const portals: NavItem[] = [
  { label: "Retail", href: "/" },
  { label: "Corporate", href: "/corporate" },
];
