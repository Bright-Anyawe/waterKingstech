import { availabilityLabel } from "@/lib/format";
import { cn } from "@/lib/cn";
import type { Availability } from "@/types";

const dot: Record<Availability, string> = {
  "in-stock": "bg-emerald-500",
  "limited-stock": "bg-amber-500",
  "out-of-stock": "bg-rose-500",
  "on-request": "bg-tide-500",
};

export function AvailabilityBadge({
  availability,
  tone = "light",
  className,
}: {
  availability: Availability;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-medium backdrop-blur-md",
        tone === "light" ? "bg-white/90 text-ink-800 shadow-sm ring-1 ring-black/5" : "bg-ink-950/60 text-white ring-1 ring-white/15",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5 rounded-full", dot[availability])} />
      {availabilityLabel[availability]}
    </span>
  );
}
