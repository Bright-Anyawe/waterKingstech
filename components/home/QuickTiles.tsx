import { Building2, CalendarClock, Coins, type LucideIcon, MapPin } from "lucide-react";
import Link from "next/link";
import { referral } from "@/data/programs";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";

type Tile = { href: string; label: string; meta: string; icon: LucideIcon; tone: string };

const tiles: Tile[] = [
  {
    href: "/referral-installment#installment",
    label: "Buy on installment",
    meta: "UK used devices",
    icon: CalendarClock,
    tone: "border-royal-200 bg-royal-50 [&_svg]:text-royal-600",
  },
  {
    href: "/referral-installment#referral",
    label: "Refer & earn",
    meta: `${formatPrice(referral.commission.min)} – ${formatPrice(referral.commission.max)}`,
    icon: Coins,
    tone: "border-orange/40 bg-orange/10 [&_svg]:text-orange-strong",
  },
  {
    href: "/corporate",
    label: "Corporate quotes",
    meta: "Companies, schools, NGOs",
    icon: Building2,
    tone: "border-flash/25 bg-flash/[0.06] [&_svg]:text-flash",
  },
  {
    href: "/visit",
    label: "Visit the shop",
    meta: "Circle Mall, Gate 2",
    icon: MapPin,
    tone: "border-gift/25 bg-gift-bg [&_svg]:text-gift",
  },
];

/** Shortcut tiles to the shop's services, like a marketplace's helper tiles. */
export function QuickTiles({ className }: { className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4", className)}>
      {tiles.map(({ href, label, meta, icon: Icon, tone }) => (
        <li key={href}>
          <Link
            href={href}
            className={cn(
              "flex h-full items-center gap-3 rounded-xl border px-3 py-3 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[0_12px_24px_-18px_rgb(6_42_92/0.6)] sm:px-4",
              tone,
            )}
          >
            <Icon className="size-6 shrink-0" aria-hidden="true" />
            <span className="min-w-0 leading-tight">
              <span className="block text-[0.86rem] font-bold text-ink sm:text-[0.92rem]">{label}</span>
              <span className="mt-0.5 block text-[0.74rem] text-ink-soft">{meta}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
