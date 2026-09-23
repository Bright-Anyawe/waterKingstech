import { Camera, Clock, MapPin, Navigation, Phone } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { GoogleMap } from "@/components/location/GoogleMap";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { contact } from "@/data/contact";
import { callHref, directionsHref, whatsappHref, whatsappMessages } from "@/lib/contact-links";

export function LocationSection() {
  const { location, openingHours, shopPhotos } = business;
  const cityLine = [location.city, location.region].filter(Boolean).join(", ");

  return (
    <section id="location" aria-labelledby="location-title" className="bg-mist py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="location-title"
          eyebrow="Visit the shop"
          title={`Visit ${business.name}`}
          description={`Come in to see devices in person, get a repair assessed or ask about installment options. Find us at ${location.address ?? location.landmark}${location.address ? ` — ${location.landmark}` : ""}.`}
        />

        <div className="mt-12 grid gap-5 sm:mt-14 lg:grid-cols-[1fr_1.35fr]">
          {/* Details */}
          <Reveal className="flex flex-col rounded-3xl border border-line bg-white p-6 sm:p-8">
            <ul className="flex flex-col divide-y divide-line">
              <DetailRow icon={<MapPin className="size-5" />} label="Location">
                {location.address ? (
                  <span className="block font-medium text-ink-950">{location.address}</span>
                ) : (
                  <span className="mb-1 block">
                    <Pending>Exact shop address to be supplied</Pending>
                  </span>
                )}
                <span className="block">{location.landmark}</span>
                {cityLine ? <span className="block">{cityLine}</span> : null}
              </DetailRow>

              <DetailRow icon={<Phone className="size-5" />} label="Phone">
                {contact.phoneDisplay ? (
                  <a href={callHref} className="font-medium text-ink-950 hover:text-tide-700">
                    {contact.phoneDisplay}
                  </a>
                ) : (
                  <Pending>Phone number to be supplied</Pending>
                )}
              </DetailRow>

              <DetailRow icon={<WhatsAppIcon className="size-5" />} label="WhatsApp">
                {contact.whatsappDisplay ? (
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink-950 hover:text-tide-700"
                  >
                    {contact.whatsappDisplay}
                  </a>
                ) : (
                  <Pending>WhatsApp number to be supplied</Pending>
                )}
              </DetailRow>

              <DetailRow icon={<Clock className="size-5" />} label="Opening hours">
                {openingHours ? (
                  <span className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                    {openingHours.map((row) => (
                      <span key={row.days} className="contents">
                        <span>{row.days}</span>
                        <span className="font-medium text-ink-950">{row.hours}</span>
                      </span>
                    ))}
                  </span>
                ) : (
                  <Pending>Opening hours to be supplied</Pending>
                )}
              </DetailRow>
            </ul>

            <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row sm:flex-wrap">
              <ButtonLink href={directionsHref} variant="primary" icon={<Navigation />}>
                Get Directions
              </ButtonLink>
              <ButtonLink href={whatsappHref(whatsappMessages.visit)} variant="whatsapp" icon={<WhatsAppIcon />}>
                WhatsApp
              </ButtonLink>
              <ButtonLink href={callHref} variant="outline-dark" icon={<Phone />}>
                Call
              </ButtonLink>
            </div>
          </Reveal>

          {/* Map + photos */}
          <div className="grid gap-5">
            <Reveal delay={0.08}>
              <GoogleMap className="aspect-[4/3] overflow-hidden rounded-3xl border border-line sm:aspect-[16/10]" />
            </Reveal>

            <Reveal delay={0.16} className="grid grid-cols-2 gap-5">
              {shopPhotos.length > 0
                ? shopPhotos.slice(0, 2).map((photo) => (
                    <div key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-line">
                      <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" />
                    </div>
                  ))
                : ["Shop front", "Inside the shop"].map((label) => (
                    <div
                      key={label}
                      className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-ink-200 bg-white p-4 text-center"
                    >
                      <Camera className="size-6 text-ink-300" aria-hidden="true" />
                      <p className="text-sm font-medium text-ink-700">{label}</p>
                      <Pending>Real shop photo to be supplied</Pending>
                    </div>
                  ))}
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function DetailRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 py-5 first:pt-0 last:pb-0">
      <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mist text-ink-700">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="font-mono text-[0.68rem] tracking-[0.14em] text-ink-400 uppercase">{label}</p>
        <div className="mt-1.5 text-[0.95rem] leading-relaxed text-ink-600">{children}</div>
      </div>
    </li>
  );
}
