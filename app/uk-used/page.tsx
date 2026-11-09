import { ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { Listing } from "@/components/products/Listing";
import { PortalBanner } from "@/components/sections/PortalBanner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { warranty } from "@/data/offers";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "UK Used phones & laptops with warranty",
  description:
    "Tested, high-grade UK used iPhones, Samsung phones, laptops and MacBooks with a 3-month warranty — at WaterKingsTech, Circle Mall, Accra. Installment available.",
  alternates: { canonical: "/uk-used" },
};

export default function UkUsedPage() {
  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "UK Used" }]} />
      <div className="mt-4">
        <PortalBanner
          title="UK Used"
          lead="High-grade imported phones and laptops, tested before sale and backed by a warranty."
          icon={ShieldCheck}
          badge={
            warranty["uk-used"] ? (
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 font-display text-sm font-extrabold text-royal-700 uppercase">
                <ShieldCheck className="size-4" aria-hidden="true" />
                {warranty["uk-used"]}
              </span>
            ) : null
          }
          points={["Tested before sale", "Graded condition", "Installment available", "Free gift with phones & laptops"]}
        />
      </div>
      <div className="mt-6">
        <Listing title="UK Used devices" products={products.filter((p) => p.condition === "uk-used")} fixed={{ condition: "uk-used" }} titleAs="h2" />
      </div>
    </div>
  );
}
