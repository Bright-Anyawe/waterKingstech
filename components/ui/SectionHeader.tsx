import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Marketplace-style section title with an optional "See all" link on the right. */
export function SectionHeader({
  id,
  title,
  description,
  action,
  className,
}: {
  id?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: { href: string; label: string };
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4", className)}>
      <div className="min-w-0">
        <h2 id={id} className="font-display text-xl font-bold tracking-[-0.02em] text-ink sm:text-2xl">
          {title}
        </h2>
        {description ? <p className="mt-1 max-w-2xl text-sm text-ink-muted sm:text-[0.95rem]">{description}</p> : null}
      </div>
      {action ? (
        <Link
          href={action.href}
          className="group inline-flex shrink-0 items-center gap-0.5 text-sm font-semibold text-royal-600 hover:text-royal-800"
        >
          {action.label}
          <ChevronRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
