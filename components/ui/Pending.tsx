import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Visible placeholder for business details that haven't been supplied yet.
 * Deliberately obvious so nothing unconfirmed can be mistaken for real info.
 */
export function Pending({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-dashed px-2 py-0.5 font-mono text-[0.72rem] leading-5",
        tone === "dark" ? "border-amber-300/40 bg-amber-300/[0.07] text-amber-200" : "border-amber-500/50 bg-amber-50 text-amber-800",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}
