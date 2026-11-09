"use client";

import { Flame, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { PortalSwitch, isActivePath } from "@/components/layout/PortalSwitch";
import { SearchBox } from "@/components/search/SearchBox";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-ice-200 bg-white/95 backdrop-blur-md">
        <div className="container-x flex h-16 items-center gap-3 sm:gap-5">
          <Link href="/" className="-m-1 shrink-0 rounded-lg p-1" aria-label="WaterKingsTech home">
            <Logo priority />
          </Link>

          {!isHome ? <SearchBox variant="header" className="hidden max-w-xl flex-1 md:flex" /> : <div className="flex-1" />}

          <div className="ml-auto flex items-center gap-2">
            <PortalSwitch className="hidden lg:flex" />
            <Link
              href="/deals"
              className="flex h-10 items-center gap-1.5 rounded-lg bg-orange px-3 text-sm font-bold text-ink shadow-[0_6px_16px_-8px_rgb(245_120_0/0.8)] transition-colors hover:bg-orange-strong sm:px-4"
            >
              <Flame className="size-4 fill-current" aria-hidden="true" />
              <span className="sm:hidden">Deals</span>
              <span className="hidden sm:inline">Hot Deals</span>
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="flex size-10 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ice lg:hidden"
            >
              <Menu className="size-6" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>

        {/* Category row — desktop */}
        <nav aria-label="Shop" className="hidden border-t border-ice-200 lg:block">
          <ul className="container-x no-scrollbar flex h-11 items-center gap-0.5 overflow-x-auto">
            {navItems.map((item) => {
              const active = isActivePath(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative flex h-11 items-center px-2.5 text-[0.84rem] font-semibold whitespace-nowrap transition-colors xl:px-3",
                      active ? "text-royal-700" : "text-ink-soft hover:text-royal-700",
                    )}
                  >
                    {item.label}
                    {active ? <span className="absolute inset-x-3 bottom-0 h-[3px] rounded-t-full bg-royal-600" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Search — phones and tablets, on every page except home (the band has it) */}
        {!isHome ? (
          <div className="container-x pb-3 md:hidden">
            <SearchBox variant="header" />
          </div>
        ) : null}
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} pathname={pathname} />
    </>
  );
}
