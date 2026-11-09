import { Camera, Clock, Mail, MapPin, Navigation, Phone } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { GoogleMap } from "@/components/location/GoogleMap";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { contact } from "@/data/contact";
import { cn } from "@/lib/cn";
import { callHref, directionsHref, emailHref, whatsappHref, whatsappMessages } from "@/lib/contact-links";

/** Live map, shop details and shop photos — the "come and see us" proof. */
export function VisitShop({ showPhotos = true, className }: { showPhotos?: boolean; className?: string }) {
  const { location, openingHours, shopPhotos } = business;
  const mail = emailHref();

  return (
    <div className={cn("grid gap-3 lg:grid-cols-[1.35fr_1fr]", className)}>
      <div className="relative overflow-hidden rounded-xl border border-ice-200 bg-white">
        <GoogleMap className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[24rem]" />
        <div className="pointer-events-none absolute top-3 left-3 flex items-center gap-2 rounded-lg bg-white/95 px-3 py-2 shadow-[0_8px_20px_-10px_rgb(3_26_61/0.5)]">
          <MapPin className="size-5 shrink-0 text-save" aria-hidden="true" />
          <span className="leading-tight">
            <span className="block text-sm font-bold text-ink">{location.landmark}</span>
            <span className="block text-[0.75rem] text-ink-muted">{location.address}</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="rounded-xl border border-ice-200 bg-white p-5">
          <ul className="flex flex-col gap-4">
            <Row icon={<MapPin className="size-5" />} label="Address">
              <span className="block font-semibold text-ink">{location.address}</span>
              <span className="block">
                {location.landmark}
                {location.city ? `, ${location.city}` : ""}
              </span>
            </Row>
            <Row icon={<WhatsAppIcon className="size-5" />} label="WhatsApp">
              <span className="flex flex-wrap gap-x-3">
                {contact.whatsapp.map((w) => (
                  <a
                    key={w.number}
                    href={whatsappHref(whatsappMessages.visit, w.number)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-ink hover:text-royal-700 hover:underline"
                  >
                    {w.display}
                  </a>
                ))}
              </span>
            </Row>
            {mail ? (
              <Row icon={<Mail className="size-5" />} label="Email">
                <a href={mail} className="font-semibold break-all text-ink hover:text-royal-700 hover:underline">
                  {contact.email}
                </a>
              </Row>
            ) : null}
            <Row icon={<Clock className="size-5" />} label="Opening hours">
              {openingHours ? (
                openingHours.map((row) => (
                  <span key={row.days} className="block">
                    {row.days}: <span className="font-semibold text-ink">{row.hours}</span>
                  </span>
                ))
              ) : (
                <Pending>Opening hours to be supplied</Pending>
              )}
            </Row>
          </ul>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <ButtonLink href={directionsHref} variant="primary" icon={<Navigation />} className="col-span-2">
              Get directions (Google Maps)
            </ButtonLink>
            <ButtonLink href={whatsappHref(whatsappMessages.visit)} variant="whatsapp" icon={<WhatsAppIcon />}>
              WhatsApp
            </ButtonLink>
            <ButtonLink href={callHref} variant="outline" icon={<Phone />}>
              Call
            </ButtonLink>
          </div>
        </div>

        {showPhotos ? (
          <div className="grid grid-cols-2 gap-3">
            {shopPhotos.length > 0
              ? shopPhotos.slice(0, 2).map((photo) => (
                  <div key={photo.src} className="relative aspect-[4/3] overflow-hidden rounded-xl border border-ice-200">
                    <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 18vw, 50vw" className="object-cover" />
                  </div>
                ))
              : ["Shop front", "Inside the shop"].map((label) => (
                  <div
                    key={label}
                    className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ice-300 bg-white p-3 text-center"
                  >
                    <Camera className="size-5 text-ink-muted" aria-hidden="true" />
                    <p className="text-sm font-semibold text-ink-soft">{label}</p>
                    <Pending>Photo to be supplied</Pending>
                  </div>
                ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Row({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-3">
      <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-royal-50 text-royal-600">
        {icon}
      </span>
      <div className="min-w-0 text-[0.92rem] text-ink-soft">
        <p className="text-[0.75rem] font-semibold text-ink-muted">{label}</p>
        <div className="mt-0.5">{children}</div>
      </div>
    </li>
  );
}
