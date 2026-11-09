"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { portals } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Retail / Corporate switch — the two portals of the site. */
export function PortalSwitch({ className }: { className?: string }) {
  const pathname = usePathname();
  const corporate = pathname.startsWith("/corporate");
  return (
    <nav aria-label="Portal" className={cn("flex rounded-lg bg-ice p-1", className)}>
      {portals.map((portal) => {
        const active = portal.href === "/corporate" ? corporate : !corporate;
        return (
          <Link
            key={portal.href}
            href={portal.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex h-8 items-center rounded-md px-3 text-[0.8rem] font-semibold transition-colors",
              active ? "bg-white text-royal-700 shadow-[0_2px_6px_-2px_rgb(6_42_92/0.25)]" : "text-ink-soft hover:text-royal-700",
            )}
          >
            {portal.label}
          </Link>
        );
      })}
    </nav>
  );
}
