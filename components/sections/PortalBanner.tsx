import { BadgeCheck, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { WaveEdge } from "@/components/brand/WaveEdge";
import { cn } from "@/lib/cn";

/** Coloured banner at the top of a portal or hub page (UK Used, Brand New, Repairs…). */
export function PortalBanner({
  title,
  lead,
  icon: Icon,
  badge,
  points,
  tone = "royal",
  children,
}: {
  title: string;
  lead: string;
  icon: LucideIcon;
  badge?: ReactNode;
  points?: string[];
  tone?: "royal" | "navy" | "white";
  children?: ReactNode;
}) {
  const dark = tone !== "white";
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-xl px-5 pt-6 pb-10 sm:px-8 sm:pt-8 sm:pb-12",
        tone === "royal" && "bg-royal-600 text-white",
        tone === "navy" && "bg-navy text-white",
        tone === "white" && "border border-ice-200 bg-white text-ink",
      )}
    >
      <Icon
        aria-hidden="true"
        strokeWidth={1.2}
        className={cn("absolute -top-6 -right-6 -z-10 size-48 sm:size-64", dark ? "text-white/10" : "text-royal-600/[0.07]")}
      />
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-[1.9rem] leading-tight font-extrabold tracking-[-0.02em] sm:text-4xl">{title}</h1>
        {badge}
      </div>
      <p className={cn("mt-2 max-w-2xl text-[0.98rem]", dark ? "text-white/85" : "text-ink-soft")}>{lead}</p>
      {points && points.length > 0 ? (
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-sm font-medium">
          {points.map((point) => (
            <li key={point} className="flex items-center gap-1.5">
              <BadgeCheck className={cn("size-4", dark ? "text-cyan-200" : "text-gift")} aria-hidden="true" />
              {point}
            </li>
          ))}
        </ul>
      ) : null}
      {children ? <div className="mt-5">{children}</div> : null}
      <WaveEdge className={cn("absolute inset-x-0 -bottom-px h-6 w-full sm:h-8", dark ? "text-white/10" : "text-ice")} />
    </section>
  );
}
