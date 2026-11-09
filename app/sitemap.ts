import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" = "weekly") => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "daily"),
    page("/shop", 0.9, "daily"),
    ...categories.map((category) => page(`/shop/${category.slug}`, 0.9, "daily")),
    page("/uk-used", 0.8, "daily"),
    page("/brand-new", 0.8, "daily"),
    page("/deals", 0.8, "daily"),
    page("/swap", 0.7),
    page("/tap-and-earn", 0.7),
    page("/repairs", 0.7),
    page("/referral-installment", 0.6, "monthly"),
    page("/corporate", 0.7, "monthly"),
    page("/visit", 0.6, "monthly"),
    ...products.map((product) => page(`/product/${product.id}`, 0.5)),
  ];
}
