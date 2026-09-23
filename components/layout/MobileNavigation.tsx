"use client";

import { ArrowUpRight, MapPin, Phone, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { callHref, directionsHref, whatsappHref } from "@/lib/contact-links";

type MobileNavigationProps = {
  open: boolean;
  onClose: () => void;
  activeId?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function MobileNavigation({ open, onClose, activeId }: MobileNavigationProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Lock page scroll, focus the dialog, close on Escape and keep Tab inside.
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

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          key="mobile-nav"
          id="mobile-navigation"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[60] flex flex-col bg-ink-950/[0.97] backdrop-blur-2xl xl:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.25 } }}
          transition={{ duration: 0.35, ease }}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgb(18_181_214/0.18),transparent)]" />

          <div className="container-x relative flex h-16 shrink-0 items-center justify-between">
            <Link href="/#home" onClick={onClose} className="-m-1 rounded-lg p-1">
              <Logo />
            </Link>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-colors hover:bg-white/10"
            >
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x relative flex-1 overflow-y-auto pt-6 pb-8">
            <m.ul
              className="flex flex-col"
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.045, delayChildren: 0.08 } } }}
            >
              {navItems.map((item, index) => (
                <m.li
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
                  }}
                  className="border-b border-white/[0.07]"
                >
                  <Link
                    href={`/#${item.id}`}
                    onClick={onClose}
                    aria-current={activeId === item.id ? "location" : undefined}
                    className={cn(
                      "group flex items-center justify-between py-4 text-[1.7rem] font-semibold tracking-[-0.03em] transition-colors",
                      activeId === item.id ? "text-white" : "text-ink-300 hover:text-white",
                    )}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-xs font-normal tracking-normal text-ink-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-5 text-ink-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-tide-400"
                    />
                  </Link>
                </m.li>
              ))}
            </m.ul>
          </nav>

          <m.div
            className="container-x relative grid shrink-0 grid-cols-3 gap-2 border-t border-white/[0.07] pt-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
          >
            <QuickAction href={whatsappHref()} label="WhatsApp" highlight icon={<WhatsAppIcon className="size-5" />} />
            <QuickAction href={callHref} label="Call" icon={<Phone className="size-5" aria-hidden="true" />} onClick={onClose} />
            <QuickAction href={directionsHref} label="Directions" icon={<MapPin className="size-5" aria-hidden="true" />} />
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}

function QuickAction({
  href,
  label,
  icon,
  highlight,
  onClick,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  highlight?: boolean;
  onClick?: () => void;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "flex h-16 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-medium transition-colors",
        highlight
          ? "bg-whatsapp text-whatsapp-ink hover:bg-whatsapp-hover"
          : "border border-white/10 bg-white/[0.04] text-white hover:bg-white/10",
      )}
    >
      {icon}
      {label}
    </a>
  );
}
