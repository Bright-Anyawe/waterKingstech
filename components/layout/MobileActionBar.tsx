import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { callHref, directionsHref, whatsappHref } from "@/lib/contact-links";

/** Always-visible WhatsApp | Call | Directions bar for phones. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ice-200 bg-white/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-20px_rgb(6_42_92/0.5)] backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-[1.4fr_1fr_1fr] gap-2">
        <li>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-lg bg-whatsapp text-sm font-bold text-whatsapp-ink transition-transform active:scale-[0.97]"
          >
            <WhatsAppIcon className="size-5" />
            WhatsApp
          </a>
        </li>
        <li>
          <a
            href={callHref}
            className="flex h-12 items-center justify-center gap-1.5 rounded-lg border border-ice-300 text-sm font-semibold text-ink transition-transform active:scale-[0.97]"
          >
            <Phone className="size-4 text-royal-600" aria-hidden="true" />
            Call
          </a>
        </li>
        <li>
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-1.5 rounded-lg border border-ice-300 text-sm font-semibold text-ink transition-transform active:scale-[0.97]"
          >
            <MapPin className="size-4 text-royal-600" aria-hidden="true" />
            Directions
          </a>
        </li>
      </ul>
    </nav>
  );
}
