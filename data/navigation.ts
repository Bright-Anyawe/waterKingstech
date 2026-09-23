export type NavItem = {
  label: string;
  /** Section id on the homepage */
  id: string;
};

export const navItems: NavItem[] = [
  { label: "Home", id: "home" },
  { label: "Products", id: "products" },
  { label: "Repairs", id: "repairs" },
  { label: "Installment", id: "installment" },
  { label: "Referrals", id: "referrals" },
  { label: "Reviews", id: "reviews" },
  { label: "Location", id: "location" },
  { label: "Contact", id: "contact" },
];
