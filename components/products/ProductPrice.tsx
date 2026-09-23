import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

export function ProductPrice({
  price,
  tone = "light",
  size = "md",
}: {
  price: number | null;
  tone?: "light" | "dark";
  size?: "md" | "lg";
}) {
  if (price === null) {
    return (
      <p className="leading-tight">
        <span className={cn("block text-[0.65rem] tracking-[0.12em] uppercase", tone === "dark" ? "text-ink-400" : "text-ink-400")}>
          Price
        </span>
        <span className={cn("block font-medium", size === "lg" ? "text-base" : "text-sm", tone === "dark" ? "text-white" : "text-ink-800")}>
          On request
        </span>
      </p>
    );
  }

  return (
    <p className="leading-tight">
      <span className="sr-only">Price: </span>
      <span
        className={cn(
          "block font-semibold tracking-[-0.02em] tabular-nums",
          size === "lg" ? "text-2xl" : "text-lg",
          tone === "dark" ? "text-white" : "text-ink-950",
        )}
      >
        {formatPrice(price)}
      </span>
    </p>
  );
}
