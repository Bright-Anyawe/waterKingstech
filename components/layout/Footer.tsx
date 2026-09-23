import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Logo } from "@/components/brand/Logo";
import { Pending } from "@/components/ui/Pending";
import { business } from "@/data/business";
import { categories } from "@/data/categories";
import { contact } from "@/data/contact";
import { callHref, directionsHref, whatsappHref, whatsappMessages } from "@/lib/contact-links";

const linkClass = "text-sm text-ink-300 transition-colors hover:text-white";

export function Footer() {
  const { location, openingHours } = business;

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-ink-950 text-white">
      <div className="container-x pt-16 pb-10 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 font-mono text-xs tracking-[0.14em] text-tide-300 uppercase">{business.summary}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-300">{business.description}</p>
            <p className="mt-4 text-sm font-medium text-white">{business.slogan}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterColumn title="Shop">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link href="/#catalog" className={linkClass}>
                    {category.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#featured" className={linkClass}>
                  Featured products
                </Link>
              </li>
            </FooterColumn>

            <FooterColumn title="Services">
              <li>
                <Link href="/#repairs" className={linkClass}>
                  Repairs &amp; diagnostics
                </Link>
              </li>
              <li>
                <Link href="/#installment" className={linkClass}>
                  Installment information
                </Link>
              </li>
              <li>
                <Link href="/#referrals" className={linkClass}>
                  Referral information
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className={linkClass}>
                  Customer reviews
                </Link>
              </li>
            </FooterColumn>

            <FooterColumn title="Visit & contact" className="col-span-2 sm:col-span-1">
              <li className="text-sm text-ink-300">
                {location.address ? (
                  <span className="block text-ink-200">{location.address}</span>
                ) : (
                  <span className="mb-1.5 block">
                    <Pending tone="dark">Full address to be added</Pending>
                  </span>
                )}
                <span className="block">{location.landmark}</span>
                {location.city ? <span className="block">{location.city}</span> : null}
              </li>
              <li>
                <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-1`}>
                  Google Maps directions <ArrowUpRight className="size-3.5" aria-hidden="true" />
                </a>
              </li>
              <li>
                {contact.phoneDisplay ? (
                  <a href={callHref} className={linkClass}>
                    {contact.phoneDisplay}
                  </a>
                ) : (
                  <Pending tone="dark">Phone number to be added</Pending>
                )}
              </li>
              <li className="text-sm text-ink-300">
                <span className="block text-ink-400">WhatsApp</span>
                {contact.whatsapp.map((w) => (
                  <a
                    key={w.number}
                    href={whatsappHref(whatsappMessages.general, w.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${linkClass} block`}
                  >
                    {w.display}
                  </a>
                ))}
              </li>
              <li className="text-sm text-ink-300">
                <span className="block text-ink-400">Opening hours</span>
                {openingHours ? (
                  openingHours.map((row) => (
                    <span key={row.days} className="block">
                      {row.days}: {row.hours}
                    </span>
                  ))
                ) : (
                  <span className="mt-1.5 block">
                    <Pending tone="dark">Hours to be added</Pending>
                  </span>
                )}
              </li>
            </FooterColumn>
          </div>
        </div>

        {contact.socials.length > 0 ? (
          <ul className="mt-12 flex flex-wrap gap-3">
            {contact.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-full border border-white/10 px-4 text-sm text-ink-200 transition-colors hover:border-white/25 hover:text-white"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-14 flex flex-col gap-3 border-t border-white/[0.07] pt-8 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {business.name}. All rights reserved.</p>
          <p>Product photography: representative images via Unsplash.</p>
        </div>
      </div>

      {/* Oversized wordmark — decorative */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.22em] select-none text-center text-[16vw] leading-none font-semibold tracking-[-0.06em] text-white/[0.035]"
      >
        WaterKings
      </p>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="font-mono text-[0.7rem] font-medium tracking-[0.16em] text-ink-400 uppercase">{title}</h2>
      <ul className="mt-5 flex flex-col gap-3">{children}</ul>
    </div>
  );
}
