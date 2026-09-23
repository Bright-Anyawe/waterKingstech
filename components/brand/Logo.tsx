import { useId } from "react";
import { cn } from "@/lib/cn";

/**
 * Interim WaterKingsTech mark: a "W" whose three peaks double as a crown.
 * Replace with the official logo when supplied.
 */
export function LogoMark({ className }: { className?: string }) {
  const gradientId = useId();
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <defs>
        <linearGradient id={gradientId} x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#7fe3f5" />
          <stop offset="1" stopColor="#12b5d6" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="#0c1015" />
      <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="none" stroke="#ffffff" strokeOpacity="0.1" />
      <path
        d="M7 11.5 11.2 23 16 14.2 20.8 23 25 11.5"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="7" cy="8" r="1.5" fill="#7fe3f5" />
      <circle cx="16" cy="10.4" r="1.5" fill="#3dd1ec" />
      <circle cx="25" cy="8" r="1.5" fill="#12b5d6" />
    </svg>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span
        className={cn(
          "text-[1.05rem] font-semibold tracking-[-0.03em]",
          tone === "dark" ? "text-white" : "text-ink-950",
        )}
      >
        WaterKings<span className={tone === "dark" ? "text-tide-400" : "text-tide-600"}>Tech</span>
      </span>
    </span>
  );
}
