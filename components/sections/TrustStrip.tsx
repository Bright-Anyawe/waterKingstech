import { BadgeCheck, CalendarClock, MapPin, ShieldCheck, Truck, Wrench } from "lucide-react";
import { RevealList, RevealListItem } from "@/components/ui/Reveal";
import { business } from "@/data/business";

const items = [
  {
    icon: ShieldCheck,
    title: "Genuine Products",
    body: "Quality phones, laptops & accessories",
    href: "#catalog",
  },
  {
    icon: BadgeCheck,
    title: "Warranty Available",
    body: "Buy with confidence",
    href: "#catalog",
  },
  {
    icon: Wrench,
    title: "Professional Repairs",
    body: "Screens, batteries, boards & diagnostics",
    href: "#repairs",
  },
  {
    icon: CalendarClock,
    title: "Installment Options",
    body: "UK-used devices on flexible plans",
    href: "#installment",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    body: "Ask us about delivery on WhatsApp",
    href: "#contact",
  },
  {
    icon: MapPin,
    title: "Visit Our Shop",
    body: business.location.address ?? `Near ${business.location.landmark}`,
    href: "#location",
  },
];

export function TrustStrip() {
  return (
    <section aria-label="Why shop with WaterKingsTech" className="border-y border-white/[0.07] bg-ink-900 text-white">
      <div className="container-x">
        {/* 1px gaps over a lighter background draw the dividers between items */}
        <RevealList stagger={0.05} className="grid grid-cols-2 gap-px bg-white/[0.07] md:grid-cols-3 xl:grid-cols-6">
          {items.map(({ icon: Icon, title, body, href }) => (
            <RevealListItem key={title} className="bg-ink-900">
              <a href={href} className="group flex h-full flex-col gap-3 px-3 py-5 sm:px-4 sm:py-6 xl:px-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-tide-300 transition-colors duration-300 group-hover:border-tide-400/40 group-hover:bg-tide-400/10">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="leading-snug">
                  <span className="block text-sm font-semibold sm:text-[0.95rem]">{title}</span>
                  <span className="mt-0.5 block text-xs text-ink-300 sm:text-[0.8rem]">{body}</span>
                </span>
              </a>
            </RevealListItem>
          ))}
        </RevealList>
      </div>
    </section>
  );
}
