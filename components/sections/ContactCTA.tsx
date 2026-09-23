import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { contact } from "@/data/contact";
import { cn } from "@/lib/cn";
import { callHref, directionsHref, whatsappHref } from "@/lib/contact-links";

export function ContactCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-ink-950 py-20 text-white sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute bottom-[-40%] left-1/2 h-[40rem] w-[70rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(37_211_102/0.13),transparent)]" />
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="container-x">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <Eyebrow tone="dark">Contact</Eyebrow>
          <h2
            id="contact-title"
            className="mt-5 text-balance text-[2.4rem] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl"
          >
            Ready for your next device?
          </h2>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-300 sm:text-lg">
            Chat with {business.name} on WhatsApp, give us a call, or visit the shop. We&apos;ll help you find the right
            device — or get yours fixed.
          </p>
        </div>

        <RevealGroup stagger={0.08} className="mx-auto mt-12 grid max-w-5xl gap-4 sm:mt-14 md:grid-cols-3">
          <RevealItem>
            <ContactTile
              href={whatsappHref()}
              icon={<WhatsAppIcon className="size-6" />}
              title="WhatsApp Us"
              detail={contact.whatsappDisplay ?? "Fastest way to reach us"}
              highlight
            />
          </RevealItem>
          <RevealItem>
            <ContactTile
              href={callHref}
              icon={<Phone className="size-6" aria-hidden="true" />}
              title={`Call ${business.name}`}
              detail={contact.phoneDisplay ?? "Phone number coming soon"}
            />
          </RevealItem>
          <RevealItem>
            <ContactTile
              href={directionsHref}
              icon={<MapPin className="size-6" aria-hidden="true" />}
              title="Get Directions"
              detail={business.location.address ?? business.location.landmark}
            />
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

function ContactTile({
  href,
  icon,
  title,
  detail,
  highlight = false,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  detail: string;
  highlight?: boolean;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group flex h-full items-center gap-4 rounded-3xl p-5 transition-[transform,background-color,border-color] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 active:scale-[0.98] sm:p-6 md:flex-col md:items-start md:gap-10",
        highlight
          ? "bg-whatsapp text-whatsapp-ink hover:bg-whatsapp-hover"
          : "border border-white/10 bg-white/[0.04] text-white hover:border-white/20 hover:bg-white/[0.08]",
      )}
    >
      <span
        className={cn(
          "flex size-12 shrink-0 items-center justify-center rounded-2xl",
          highlight ? "bg-whatsapp-ink/10" : "bg-white/[0.06] text-tide-300",
        )}
      >
        {icon}
      </span>
      <span className="flex min-w-0 flex-1 items-end justify-between gap-3 md:w-full">
        <span className="min-w-0">
          <span className="block text-lg font-semibold tracking-[-0.02em]">{title}</span>
          <span className={cn("mt-0.5 block text-sm", highlight ? "text-whatsapp-ink/70" : "text-ink-300")}>{detail}</span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </a>
  );
}
