import { PackageCheck } from "lucide-react";
import type { Metadata } from "next";
import { Listing } from "@/components/products/Listing";
import { PortalBanner } from "@/components/sections/PortalBanner";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Brand new phones & laptops — fresh in box",
  description:
    "Factory-sealed smartphones, laptops and accessories at WaterKingsTech, Circle Mall, Accra. Free case + screen protector with phones, free bag with laptops.",
  alternates: { canonical: "/brand-new" },
};

export default function BrandNewPage() {
  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Brand New" }]} />
      <div className="mt-4">
        <PortalBanner
          tone="white"
          title="Brand New"
          lead="Fresh in box: factory-sealed laptops and smartphones for buyers who want it brand new."
          icon={PackageCheck}
          badge={
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-gift-bg px-3 py-1.5 font-display text-sm font-extrabold text-gift uppercase">
              <PackageCheck className="size-4" aria-hidden="true" />
              Fresh in box
            </span>
          }
          points={["Factory sealed", "Free laptop bag with laptops", "Free case + screen protector with phones", "Phones & MacBooks on installment"]}
        />
      </div>
      <div className="mt-6">
        <Listing title="Brand new devices" products={products.filter((p) => p.condition === "brand-new")} fixed={{ condition: "brand-new" }} titleAs="h2" />
      </div>
    </div>
  );
}
