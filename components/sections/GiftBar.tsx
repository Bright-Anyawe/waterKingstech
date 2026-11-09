import { Gift } from "lucide-react";
import { bundles } from "@/data/offers";
import type { CategoryId } from "@/types";

/** One-line bundle reminder on the phone and laptop listing pages. */
export function GiftBar({ categoryId }: { categoryId: CategoryId }) {
  const bundle = bundles.find((b) => b.category === categoryId);
  if (!bundle) return null;
  const isLaptop = bundle.id === "laptop";

  return (
    <p
      className={
        isLaptop
          ? "flex items-center gap-2.5 rounded-xl bg-navy px-4 py-3 text-sm font-semibold text-white"
          : "flex items-center gap-2.5 rounded-xl bg-orange px-4 py-3 text-sm font-semibold text-ink"
      }
    >
      <Gift className="size-5 shrink-0" aria-hidden="true" />
      <span>
        <span className="font-display font-extrabold uppercase">
          {bundle.lead} &amp; {bundle.headline}
        </span>{" "}
        <span className="font-display font-extrabold uppercase">{bundle.gift}</span>
      </span>
    </p>
  );
}
