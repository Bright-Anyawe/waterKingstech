import type { Metadata } from "next";
import { Listing } from "@/components/products/Listing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop phones, laptops & accessories",
  description:
    "Browse UK used and brand new smartphones, laptops, MacBooks and accessories at WaterKingsTech, Circle Mall, Accra. Buy on WhatsApp.",
  alternates: { canonical: "/shop" },
};

export default function ShopPage() {
  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop" }]} />
      <div className="mt-4">
        <Listing title="All products" products={products} />
      </div>
    </div>
  );
}
