"use client";

import { Menu } from "lucide-react";
import { m } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { whatsappHref } from "@/lib/contact-links";

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Tracks which homepage section sits in the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-white/[0.08] bg-ink-950/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav aria-label="Main" className="container-x flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link href="/#home" className="-m-1 rounded-lg p-1" aria-label="WaterKingsTech — back to top">
            <Logo />
          </Link>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <Link
                    href={`/#${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                    className={cn(
                      "relative block rounded-full px-3.5 py-2 text-[0.84rem] font-medium transition-colors duration-300",
                      isActive ? "text-white" : "text-ink-300 hover:text-white",
                    )}
                  >
                    {isActive ? (
                      <m.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-white/[0.09] ring-1 ring-white/10 ring-inset"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Phones get the bottom action bar instead */}
            <div className="hidden sm:block">
              <ButtonLink href={whatsappHref()} variant="whatsapp" icon={<WhatsAppIcon />} className="h-10 px-4">
                WhatsApp Us
              </ButtonLink>
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/10 xl:hidden"
            >
              <Menu className="size-5" aria-hidden="true" />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </nav>
      </header>

      <MobileNavigation open={menuOpen} onClose={closeMenu} activeId={active} />
    </>
  );
}
