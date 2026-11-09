import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Listing } from "@/components/products/Listing";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { categories, getCategoryBySlug } from "@/data/categories";
import { giftByCategory } from "@/data/offers";
import { products } from "@/data/products";
import { GiftBar } from "@/components/sections/GiftBar";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.label} in Accra — UK used & brand new`,
    description: `${category.description} Shop at WaterKingsTech, Circle Mall, Accra, and buy on WhatsApp.`,
    alternates: { canonical: `/shop/${category.slug}` },
  };
}

export default async function CategoryPage({ params }: PageProps<"/shop/[category]">) {
  const { category: slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const gift = giftByCategory[category.id];

  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Shop", href: "/shop" }, { label: category.label }]} />
      <div className="mt-4">
        <Listing
          title={category.label}
          products={products.filter((p) => p.category === category.id)}
          fixed={{ category: category.id }}
          intro={gift ? <GiftBar categoryId={category.id} /> : undefined}
        />
      </div>
    </div>
  );
}
