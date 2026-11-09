import { Building2, ChevronRight, Flame, Headphones, Laptop, type LucideIcon, PackageCheck, ShieldCheck, Smartphone, Wrench } from "lucide-react";
import Link from "next/link";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { repairServices } from "@/data/repairs";
import { itemCount } from "@/lib/catalog";
import { cn } from "@/lib/cn";
import type { CategoryId } from "@/types";

const categoryIcon: Record<CategoryId, LucideIcon> = {
  smartphones: Smartphone,
  laptops: Laptop,
  accessories: Headphones,
};

type RailItem = {
  href: string;
  label: string;
  meta: string;
  icon: LucideIcon;
  /** Icon tile colours */
  tone: string;
};

export const railItems: RailItem[] = [
  ...categories.map((category) => ({
    href: `/shop/${category.slug}`,
    label: category.label,
    meta: itemCount(products.filter((p) => p.category === category.id).length),
    icon: categoryIcon[category.id],
    tone: "bg-royal-50 text-royal-600",
  })),
  {
    href: "/uk-used",
    label: "UK Used",
    meta: `${itemCount(products.filter((p) => p.condition === "uk-used").length)} · warranty`,
    icon: ShieldCheck,
    tone: "bg-royal-600 text-white",
  },
  {
    href: "/brand-new",
    label: "Brand New",
    meta: `${itemCount(products.filter((p) => p.condition === "brand-new").length)} · sealed`,
    icon: PackageCheck,
    tone: "bg-gift-bg text-gift",
  },
  {
    href: "/deals",
    label: "Hot Deals",
    meta: itemCount(products.filter((p) => p.deal).length),
    icon: Flame,
    tone: "bg-orange/15 text-orange-strong",
  },
  {
    href: "/repairs",
    label: "Repairs & diagnostics",
    meta: `${repairServices.length} services`,
    icon: Wrench,
    tone: "bg-flash/10 text-flash",
  },
  {
    href: "/corporate",
    label: "Corporate (B2B)",
    meta: "Bulk quotes & invoices",
    icon: Building2,
    tone: "bg-navy text-cyan",
  },
];

/**
 * Category list with live counts. A vertical rail beside the listings on
 * desktop; a tappable icon grid on phones.
 */
export function CategoryRail({ className }: { className?: string }) {
  return (
    <nav aria-label="Categories" className={cn("overflow-hidden rounded-xl border border-ice-200 bg-white", className)}>
      <ul className="grid grid-cols-4 gap-1 p-2 sm:grid-cols-8 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-ice-200 lg:p-0">
        {railItems.map(({ href, label, meta, icon: Icon, tone }) => (
          <li key={href}>
            <Link
              href={href}
              className="group flex h-full flex-col items-center gap-1.5 rounded-lg px-1 py-2.5 text-center transition-colors hover:bg-ice lg:grid lg:grid-cols-[2.5rem_minmax(0,1fr)_1rem] lg:gap-3 lg:rounded-none lg:px-3.5 lg:py-3 lg:text-left"
            >
              <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl lg:size-10", tone)}>
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-[0.72rem] leading-tight font-semibold text-ink sm:text-[0.78rem] lg:text-[0.9rem] lg:group-hover:text-royal-700">
                  {label}
                </span>
                <span className="hidden truncate text-[0.75rem] text-ink-muted lg:block">{meta}</span>
              </span>
              <ChevronRight className="hidden size-4 shrink-0 text-ink-muted transition-transform group-hover:translate-x-0.5 lg:block" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
