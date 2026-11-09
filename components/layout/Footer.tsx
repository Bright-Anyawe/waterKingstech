import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { LogoStacked } from "@/components/brand/Logo";
import { WaveEdge } from "@/components/brand/WaveEdge";
import { Pending } from "@/components/ui/Pending";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { categories } from "@/data/categories";
import { contact } from "@/data/contact";
import { callHref, directionsHref, emailHref, whatsappHref, whatsappMessages } from "@/lib/contact-links";

const linkClass = "text-sm text-ink-soft transition-colors hover:text-royal-700 hover:underline";

export function Footer() {
  const { location, openingHours } = business;
  const mail = emailHref();

  return (
    <footer className="relative mt-24 bg-white">
      <WaveEdge className="absolute inset-x-0 bottom-full h-10 w-full text-white sm:h-14" />
      <div className="container-x grid gap-10 py-12 md:grid-cols-[16rem_1fr] lg:gap-16">
        <div className="flex flex-col items-center gap-4 text-center md:items-start md:text-left">
          <LogoStacked />
          <p className="max-w-xs text-sm text-ink-muted">{business.slogan}</p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          <FooterColumn title="Shop">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/shop/${category.slug}`} className={linkClass}>
                  {category.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/uk-used" className={linkClass}>
                UK Used
              </Link>
            </li>
            <li>
              <Link href="/brand-new" className={linkClass}>
                Brand New
              </Link>
            </li>
            <li>
              <Link href="/deals" className={linkClass}>
                Hot deals
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Services">
            <li>
              <Link href="/repairs" className={linkClass}>
                Repairs &amp; diagnostics
              </Link>
            </li>
            <li>
              <Link href="/referral-installment" className={linkClass}>
                Installment plans
              </Link>
            </li>
            <li>
              <Link href="/tap-and-earn" className={linkClass}>
                Tap &amp; Earn
              </Link>
            </li>
            <li>
              <Link href="/swap" className={linkClass}>
                Swap &amp; upgrade
              </Link>
            </li>
            <li>
              <Link href="/corporate" className={linkClass}>
                Corporate &amp; bulk quotes
              </Link>
            </li>
            <li>
              <Link href="/visit#reviews" className={linkClass}>
                Customer reviews
              </Link>
            </li>
          </FooterColumn>

          <FooterColumn title="Visit & contact" className="col-span-2 sm:col-span-1">
            <ContactRow icon={<MapPin className="size-4" aria-hidden="true" />}>
              <a href={directionsHref} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {location.address}
                <span className="block">{location.landmark}</span>
                {location.city ? <span className="block">{location.city}</span> : null}
              </a>
            </ContactRow>
            <ContactRow icon={<Phone className="size-4" aria-hidden="true" />}>
              {contact.phoneDisplay ? (
                <a href={callHref} className={linkClass}>
                  {contact.phoneDisplay}
                </a>
              ) : (
                <Pending>Phone number to be added</Pending>
              )}
            </ContactRow>
            <ContactRow icon={<WhatsAppIcon className="size-4" />}>
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
            </ContactRow>
            {mail ? (
              <ContactRow icon={<Mail className="size-4" aria-hidden="true" />}>
                <a href={mail} className={`${linkClass} break-all`}>
                  {contact.email}
                </a>
              </ContactRow>
            ) : null}
            <ContactRow icon={<Clock className="size-4" aria-hidden="true" />}>
              {openingHours ? (
                openingHours.map((row) => (
                  <span key={row.days} className="block text-sm text-ink-soft">
                    {row.days}: {row.hours}
                  </span>
                ))
              ) : (
                <Pending>Opening hours to be added</Pending>
              )}
            </ContactRow>
          </FooterColumn>
        </div>
      </div>

      <div className="bg-navy text-white/75">
        <div className="container-x flex flex-col gap-1 py-4 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {business.name}. All rights reserved.</p>
          <p>Product photos: representative images via Unsplash.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <h2 className="font-display text-sm font-bold text-ink">{title}</h2>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function ContactRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex gap-2.5">
      <span className="mt-0.5 shrink-0 text-royal-600">{icon}</span>
      <div className="min-w-0">{children}</div>
    </li>
  );
}
