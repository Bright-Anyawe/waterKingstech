import type { Metadata } from "next";
import { BundleBanners } from "@/components/home/BundleBanners";
import { Listing } from "@/components/products/Listing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Hot deals — save up to 40% on laptops",
  description:
    "WaterKingsTech deals: buy a laptop and save up to 40% plus a free laptop bag, or buy a phone and get a free case and screen protector. Circle Mall, Accra.",
  alternates: { canonical: "/deals" },
};

export default function DealsPage() {
  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Hot deals" }]} />
      <BundleBanners className="mt-4" />
      <div className="mt-6">
        <Listing title="Hot deals" products={products.filter((p) => p.deal)} fixed={{ dealsOnly: true }} />
      </div>
    </div>
  );
}
