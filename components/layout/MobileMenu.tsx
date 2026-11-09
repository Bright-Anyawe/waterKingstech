"use client";

import { ChevronRight, Mail, MapPin, Phone, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { PortalSwitch, isActivePath } from "@/components/layout/PortalSwitch";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { callHref, directionsHref, emailHref, whatsappHref } from "@/lib/contact-links";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  pathname: string;
};

const ease = [0.16, 1, 0.3, 1] as const;

/** Slide-in menu for phones and tablets. Traps focus, closes on Escape or backdrop tap. */
export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panelRef.current) return;
      const focusable = panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const mail = emailHref();

  return (
    <AnimatePresence>
      {open ? (
        <div key="menu" className="fixed inset-0 z-[60] lg:hidden">
          <m.div
            className="absolute inset-0 bg-navy-950/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            id="mobile-menu"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-white shadow-[-20px_0_50px_-20px_rgb(3_26_61/0.5)]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.22, ease: "easeIn" } }}
            transition={{ duration: 0.4, ease }}
          >
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-ice-200 px-4">
              <Link href="/" onClick={onClose} className="-m-1 rounded-lg p-1" aria-label="WaterKingsTech home">
                <Logo />
              </Link>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-lg text-ink hover:bg-ice"
              >
                <X className="size-6" aria-hidden="true" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <PortalSwitch className="[&>a]:flex-1 [&>a]:justify-center" />

              <nav aria-label="Mobile" className="mt-3">
                <ul className="divide-y divide-ice-200">
                  {navItems.map((item) => {
                    const active = isActivePath(pathname, item.href);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={onClose}
                          aria-current={active ? "page" : undefined}
                          className={cn(
                            "flex items-center justify-between py-3.5 text-[0.95rem] font-semibold",
                            active ? "text-royal-700" : "text-ink",
                          )}
                        >
                          {item.label}
                          <ChevronRight className="size-4 text-ink-muted" aria-hidden="true" />
                        </Link>
                      </li>
                    );
                  })}
                  <li>
                    <Link href="/deals" onClick={onClose} className="flex items-center justify-between py-3.5 text-[0.95rem] font-semibold text-orange-strong">
                      Hot deals
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="grid shrink-0 grid-cols-2 gap-2 border-t border-ice-200 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <QuickAction href={whatsappHref()} label="WhatsApp" highlight icon={<WhatsAppIcon className="size-5" />} />
              <QuickAction href={callHref} label="Call" icon={<Phone className="size-5" aria-hidden="true" />} />
              {mail ? <QuickAction href={mail} label="Email" icon={<Mail className="size-5" aria-hidden="true" />} /> : null}
              <QuickAction href={directionsHref} label="Directions" icon={<MapPin className="size-5" aria-hidden="true" />} />
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}

function QuickAction({ href, label, icon, highlight }: { href: string; label: string; icon: ReactNode; highlight?: boolean }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex h-12 items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-colors",
        highlight ? "bg-whatsapp text-whatsapp-ink hover:bg-whatsapp-hover" : "border border-ice-300 text-ink hover:bg-ice",
      )}
    >
      {icon}
      {label}
    </a>
  );
}
