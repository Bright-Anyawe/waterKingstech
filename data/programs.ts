import type { InfoGroup } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Installment purchases                                                     */
/*  ⚠️  Terms must come from WaterKingsTech. `items: null` shows a visible     */
/*      "to be supplied" placeholder — never fill these with assumptions.     */
/* -------------------------------------------------------------------------- */

export const installment = {
  /** From the installment flyer: UK-used phones, laptops and accessories. */
  eligibleItems: [
    "Smartphones (all models)",
    "Laptops (all models)",
    "Accessories (all types)",
    "Phone + accessory bundles",
    "Laptop + accessory bundles",
    "Premium flagship devices",
  ],
  steps: [
    { title: "Choose your device", body: "Pick a UK-used phone, laptop, accessory or bundle." },
    { title: "Message us on WhatsApp", body: "Let us know you'd like to buy on installment." },
    { title: "Get the requirements", body: "We'll send the current requirements and available options." },
    { title: "Confirm your plan", body: "Agree the details with our team before anything is finalised." },
  ],
  details: [
    { id: "guidelines", title: "General guidelines", items: null },
    { id: "eligibility", title: "Eligibility requirements", items: null },
    { id: "documents", title: "Required documents", items: null },
    { id: "payment", title: "Payment conditions", items: null },
  ] as InfoGroup[],
  /** Any additional terms supplied by WaterKingsTech. */
  terms: null as string | null,
};

/* -------------------------------------------------------------------------- */
/*  Referral programme (from WaterKingsTech's referral flyers)                */
/*  Do not add conditions that the business has not confirmed.                */
/* -------------------------------------------------------------------------- */

export type CommissionRange = {
  id: "phones" | "laptops" | "accessories";
  label: string;
  examples: string;
  min: number;
  max: number;
  basis: string;
};

export const referral = {
  commission: { min: 50, max: 400 },

  /** Commission when a referred customer buys. */
  purchase: [
    {
      id: "phones",
      label: "iPhones & other smartphones",
      examples: "iPhone, Samsung and more",
      min: 100,
      max: 400,
      basis: "Depending on the phone purchased",
    },
    {
      id: "laptops",
      label: "Windows laptops & MacBooks",
      examples: "HP, Dell, Lenovo, MacBook and more",
      min: 100,
      max: 400,
      basis: "Depending on the type purchased",
    },
    {
      id: "accessories",
      label: "Accessories",
      examples: "Drives, HDD, SSD, phone screens, laptop screens and more",
      min: 50,
      max: 100,
      basis: "Depending on what is purchased",
    },
  ] as CommissionRange[],

  /** Fixed commission when a referred customer takes a UK-used item on installment. */
  installment: [
    { label: "Smartphones (all models)", amount: 100 },
    { label: "Laptops (all models)", amount: 150 },
    { label: "Accessories (all types)", amount: 50 },
    { label: "Phone + accessory bundle", amount: 150 },
    { label: "Laptop + accessory bundle", amount: 200 },
    { label: "Premium devices (flagship)", amount: 200 },
  ],

  benefits: ["High commissions", "Fast payouts", "Trusted products", "Dedicated support", "Win-win opportunity"],

  steps: [
    { title: "Refer someone", body: "Send a friend, family member or colleague to WaterKingsTech." },
    { title: "They buy", body: "Your referral buys a device — outright or on installment." },
    { title: "Referral verified", body: "WaterKingsTech confirms the referral once the deal is completed." },
    { title: "You earn", body: "Receive the commission for what they purchased." },
  ],

  /** Payout method, eligibility, etc. — add once confirmed. */
  terms: null as string | null,
};
