import { ArrowRight, BadgeCheck, PackageCheck, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { warranty } from "@/data/offers";
import { products } from "@/data/products";
import { itemCount } from "@/lib/catalog";
import { cn } from "@/lib/cn";

/** UK Used vs Brand New — the two condition portals side by side. */
export function PortalCards({ className }: { className?: string }) {
  const ukUsed = products.filter((p) => p.condition === "uk-used").length;
  const brandNew = products.filter((p) => p.condition === "brand-new").length;

  return (
    <section aria-label="Shop by condition" className={cn("grid gap-3 md:grid-cols-2", className)}>
      <Link
        href="/uk-used"
        className="group relative flex flex-col overflow-hidden rounded-xl bg-royal-600 p-5 text-white transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(12_109_226/0.9)] sm:p-6"
      >
        <ShieldCheck aria-hidden="true" className="absolute -right-6 -bottom-8 size-44 text-white/10" strokeWidth={1.25} />
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em]">UK Used</h2>
          {warranty["uk-used"] ? (
            <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-[0.72rem] font-bold text-royal-700">
              <ShieldCheck className="size-3.5" aria-hidden="true" />
              {warranty["uk-used"]}
            </span>
          ) : null}
        </div>
        <p className="mt-2 max-w-sm text-[0.95rem] text-white/90">
          Tested, high-grade imported phones and laptops — great value with a warranty.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/90">
          <li className="flex items-center gap-1.5">
            <BadgeCheck className="size-4 text-cyan-200" aria-hidden="true" />
            Tested before sale
          </li>
          <li className="flex items-center gap-1.5">
            <BadgeCheck className="size-4 text-cyan-200" aria-hidden="true" />
            Graded condition
          </li>
          <li className="flex items-center gap-1.5">
            <BadgeCheck className="size-4 text-cyan-200" aria-hidden="true" />
            Installment available
          </li>
        </ul>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold">
          Browse {itemCount(ukUsed)}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>

      <Link
        href="/brand-new"
        className="group relative flex flex-col overflow-hidden rounded-xl border border-ice-200 bg-white p-5 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(6_42_92/0.5)] sm:p-6"
      >
        <PackageCheck aria-hidden="true" className="absolute -right-6 -bottom-8 size-44 text-royal-600/[0.07]" strokeWidth={1.25} />
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.02em] text-ink">Brand New</h2>
          <span className="inline-flex items-center gap-1 rounded-md bg-gift-bg px-2 py-1 text-[0.72rem] font-bold text-gift">
            <PackageCheck className="size-3.5" aria-hidden="true" />
            Fresh in box
          </span>
        </div>
        <p className="mt-2 max-w-sm text-[0.95rem] text-ink-soft">
          Factory-sealed laptops and smartphones for buyers who want it brand new.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-ink-soft">
          <li className="flex items-center gap-1.5">
            <BadgeCheck className="size-4 text-gift" aria-hidden="true" />
            Factory sealed
          </li>
          <li className="flex items-center gap-1.5">
            <BadgeCheck className="size-4 text-gift" aria-hidden="true" />
            Free gift with phones &amp; laptops
          </li>
        </ul>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-royal-700">
          Browse {itemCount(brandNew)}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </Link>
    </section>
  );
}
