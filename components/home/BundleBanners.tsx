import { ArrowRight, Briefcase, Smartphone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/data/categories";
import { bundles } from "@/data/offers";
import { cn } from "@/lib/cn";

const theme = {
  laptop: {
    panel: "bg-navy text-white",
    accent: "text-cyan-200",
    gift: "bg-cyan text-navy",
    cta: "bg-white text-navy hover:bg-cyan-200",
    fade: "from-navy via-navy/80",
    icon: Briefcase,
  },
  phone: {
    panel: "bg-orange text-ink",
    accent: "text-navy",
    gift: "bg-navy text-white",
    cta: "bg-navy text-white hover:bg-navy-950",
    fade: "from-orange via-orange/80",
    icon: Smartphone,
  },
} as const;

/** The two promotional bundle headliners. */
export function BundleBanners({ className }: { className?: string }) {
  return (
    <section aria-label="Bundle offers" className={cn("grid gap-3 md:grid-cols-2", className)}>
      {bundles.map((bundle, index) => {
        const t = theme[bundle.id];
        const category = getCategory(bundle.category);
        const GiftIcon = t.icon;
        return (
          <Link
            key={bundle.id}
            href={`/shop/${category.slug}`}
            className={cn(
              "group relative isolate flex min-h-[11.5rem] overflow-hidden rounded-xl p-5 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-24px_rgb(3_26_61/0.7)] sm:min-h-[13rem] sm:p-6",
              t.panel,
            )}
          >
            <div className="absolute inset-y-0 right-0 -z-10 w-[48%]">
              <Image
                src={category.image.src}
                alt=""
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 22vw, 48vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
              />
              <div className={cn("absolute inset-0 bg-linear-to-r to-transparent", t.fade)} />
            </div>

            <div className="flex max-w-[64%] flex-col">
              <p className="font-display text-[1.45rem] leading-[1.05] font-extrabold tracking-[-0.02em] text-balance uppercase sm:text-[1.85rem]">
                {bundle.lead} &amp; <span className={t.accent}>{bundle.headline}</span>
              </p>
              <p
                className={cn(
                  "mt-3 inline-flex w-fit items-center gap-1.5 rounded-md px-2.5 py-1 font-display text-[0.78rem] font-bold uppercase",
                  t.gift,
                )}
              >
                <GiftIcon className="size-3.5" aria-hidden="true" />
                {bundle.gift}
              </p>
              <span className="mt-auto pt-5">
                <span className={cn("inline-flex h-10 items-center gap-1.5 rounded-lg px-4 text-sm font-bold transition-colors", t.cta)}>
                  {bundle.cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </span>
            </div>
          </Link>
        );
      })}
    </section>
  );
}
