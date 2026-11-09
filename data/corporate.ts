/**
 * Corporate (B2B) portal — from WaterKingsTech's brief.
 * Discount rates, retainer terms and lead times are NOT listed here because
 * they haven't been supplied; the page asks buyers to request a quote instead.
 */
export const corporate = {
  audiences: [
    { id: "company", label: "Companies" },
    { id: "school", label: "Schools" },
    { id: "ngo", label: "NGOs" },
  ],

  offers: [
    {
      id: "bulk",
      title: "Bulk purchase pricing",
      body: "Better unit prices when you buy laptops, phones or accessories in quantity.",
    },
    {
      id: "quotation",
      title: "Formal PDF quotation",
      body: "A written quotation you can take through your approval or procurement process.",
    },
    {
      id: "invoice",
      title: "Official invoicing",
      body: "Proper invoices for your accounts team and records.",
    },
    {
      id: "retainer",
      title: "Repair retainers",
      body: "Long-term repair and maintenance support for your organisation's devices.",
    },
  ],

  /** Options in the quote form */
  organisationTypes: ["Company", "School", "NGO", "Other"],
  needs: ["Laptops", "Smartphones", "Accessories", "Repair retainer"],
  documents: ["PDF quotation", "Official invoice"],

  steps: [
    { title: "Send your request", body: "Tell us what you need and how many — on WhatsApp or by email." },
    { title: "Get your quotation", body: "We prepare a formal PDF quotation for your approval." },
    { title: "Approve & invoice", body: "Once approved, you receive an official invoice." },
    { title: "Receive & get support", body: "Receive your devices, with repair support for the long term." },
  ],
};
