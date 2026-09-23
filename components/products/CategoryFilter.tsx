"use client";

import { m } from "motion/react";
import { cn } from "@/lib/cn";

export type FilterOption<T extends string> = {
  id: T;
  label: string;
  count?: number;
};

type CategoryFilterProps<T extends string> = {
  label: string;
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
  /** Unique id for the animated selection pill */
  layoutId: string;
  size?: "md" | "sm";
};

/** Row of toggle buttons with an animated selection pill. */
export function CategoryFilter<T extends string>({
  label,
  options,
  value,
  onChange,
  layoutId,
  size = "md",
}: CategoryFilterProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "flex w-max items-center gap-1",
        size === "md" && "rounded-full border border-line bg-mist p-1",
      )}
    >
      {options.map((option) => {
        const selected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              "relative shrink-0 rounded-full font-medium whitespace-nowrap transition-colors duration-300",
              size === "md" ? "h-10 px-4 text-sm sm:px-5" : "h-9 border px-3.5 text-[0.8rem]",
              size === "sm" && (selected ? "border-transparent" : "border-line bg-white hover:border-ink-200"),
              selected ? (size === "md" ? "text-white" : "text-ink-950") : "text-ink-500 hover:text-ink-950",
            )}
          >
            {selected ? (
              <m.span
                layoutId={layoutId}
                className={cn(
                  "absolute inset-0 rounded-full",
                  size === "md" ? "bg-ink-950 shadow-[0_6px_16px_-8px_rgb(7_9_12/0.6)]" : "bg-tide-200 ring-1 ring-tide-400/50",
                )}
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            ) : null}
            <span className="relative flex items-center gap-1.5">
              {option.label}
              {option.count !== undefined ? (
                <span
                  className={cn(
                    "font-mono text-[0.68rem] tabular-nums",
                    selected ? (size === "md" ? "text-ink-300" : "text-tide-800") : "text-ink-400",
                  )}
                >
                  {option.count}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
