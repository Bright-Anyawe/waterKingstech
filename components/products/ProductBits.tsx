import { BadgeCheck, Flame, Gift, PackageCheck, ShieldCheck, ShieldQuestion, Zap } from "lucide-react";
import { conditionLabel, dealLabel, giftByCategory, isNegotiable, warrantyFor, warrantyPending } from "@/data/offers";
import { cn } from "@/lib/cn";
import { availabilityLabel, formatPrice } from "@/lib/format";
import type { Deal, Product } from "@/types";

/* --------------------------------- Deal tag -------------------------------- */

const dealStyle: Record<Deal["type"], string> = {
  save: "bg-save text-white",
  hot: "bg-orange text-ink",
  flash: "bg-flash text-white",
};

export function DealTag({ deal, className }: { deal: Deal; className?: string }) {
  const Icon = deal.type === "flash" ? Zap : deal.type === "hot" ? Flame : null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-2 py-1 text-[0.66rem] leading-none font-extrabold tracking-[0.04em] uppercase shadow-[0_4px_10px_-4px_rgb(3_26_61/0.45)]",
        dealStyle[deal.type],
        className,
      )}
    >
      {Icon ? <Icon className="size-3 fill-current" aria-hidden="true" /> : null}
      {dealLabel(deal)}
    </span>
  );
}

/* --------------------------------- Badges ---------------------------------- */

const chip = "inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[0.7rem] leading-4 font-medium whitespace-nowrap";

export function ConditionChip({ product, className }: { product: Product; className?: string }) {
  const isNew = product.condition === "brand-new";
  return (
    <span className={cn(chip, isNew ? "bg-royal-50 text-royal-800" : "bg-ice text-ink-soft", className)}>
      {isNew ? <PackageCheck className="size-3" aria-hidden="true" /> : null}
      {conditionLabel[product.condition]}
      {product.grade ? <span className="text-ink-muted">· {product.grade}</span> : null}
    </span>
  );
}

/** Every item shows its warranty; items whose period isn't confirmed say "Warranty: ask us". */
export function WarrantyChip({ product, className }: { product: Product; className?: string }) {
  const text = warrantyFor(product);
  if (!text) {
    return (
      <span className={cn(chip, "bg-white text-royal-700 ring-1 ring-royal-200 ring-inset", className)}>
        <ShieldQuestion className="size-3" aria-hidden="true" />
        {warrantyPending}
      </span>
    );
  }
  return (
    <span className={cn(chip, "bg-royal-600 text-white", className)}>
      <ShieldCheck className="size-3" aria-hidden="true" />
      {text}
    </span>
  );
}

export function GiftLine({ product, className }: { product: Product; className?: string }) {
  const gift = giftByCategory[product.category];
  if (!gift) return null;
  return (
    <p className={cn("flex items-center gap-1 text-[0.74rem] font-semibold text-gift", className)}>
      <Gift className="size-3.5 shrink-0" aria-hidden="true" />
      {gift}
    </p>
  );
}

/** "Factory sealed" for brand-new, "Tested" for UK-used — the portal promise in one word. */
export function AssuranceChip({ product, className }: { product: Product; className?: string }) {
  const isNew = product.condition === "brand-new";
  return (
    <span className={cn(chip, "bg-gift-bg text-gift", className)}>
      <BadgeCheck className="size-3" aria-hidden="true" />
      {isNew ? "Factory sealed" : "Tested"}
    </span>
  );
}

/* ---------------------------------- Price ---------------------------------- */

/** "Negotiable", as marketplaces print it beside the price. */
function NegotiableNote({ product, size }: { product: Product; size: "md" | "lg" }) {
  if (!isNegotiable(product)) return null;
  return (
    <span className={cn("font-sans font-semibold text-ink-muted", size === "lg" ? "text-sm" : "text-[0.72rem]")}>
      Negotiable
    </span>
  );
}

export function Price({ product, size = "md" }: { product: Product; size?: "md" | "lg" }) {
  if (product.price === null) {
    // No price supplied: a quiet line under the name, so the product name leads.
    return (
      <p className={cn("mt-0.5 flex flex-wrap items-baseline gap-x-1.5 font-semibold text-royal-700", size === "lg" ? "text-base" : "text-[0.78rem] sm:text-[0.82rem]")}>
        <span>
          Ask for price
          <span className="sr-only"> — price on request</span>
        </span>
        {isNegotiable(product) ? <span aria-hidden="true" className="text-ink-muted">·</span> : null}
        <NegotiableNote product={product} size={size} />
      </p>
    );
  }

  const was = product.wasPrice && product.wasPrice > product.price ? product.wasPrice : null;
  const percentOff = was ? Math.round((1 - product.price / was) * 100) : 0;

  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className={cn("font-display font-extrabold tracking-[-0.02em] text-royal-600 tabular-nums", size === "lg" ? "text-3xl" : "text-[1.05rem] sm:text-lg")}>
        <span className="sr-only">Price: </span>
        {formatPrice(product.price)}
      </span>
      {was ? (
        <>
          <s className={cn("text-ink-muted tabular-nums", size === "lg" ? "text-base" : "text-[0.75rem]")}>
            <span className="sr-only">was </span>
            {formatPrice(was)}
          </s>
          <span className="rounded bg-save px-1 text-[0.68rem] font-bold text-white">-{percentOff}%</span>
        </>
      ) : null}
      <NegotiableNote product={product} size={size} />
    </p>
  );
}

export function AvailabilityNote({ product, className }: { product: Product; className?: string }) {
  if (product.availability === "in-stock") return null;
  const tone =
    product.availability === "out-of-stock"
      ? "text-save"
      : product.availability === "limited-stock"
        ? "text-orange-strong"
        : "text-ink-muted";
  return <p className={cn("text-[0.74rem] font-semibold", tone, className)}>{availabilityLabel[product.availability]}</p>;
}
