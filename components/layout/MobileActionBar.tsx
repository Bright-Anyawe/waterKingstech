import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { callHref, directionsHref, whatsappHref } from "@/lib/contact-links";

/** Always-visible WhatsApp | Call | Directions bar for phones. */
export function MobileActionBar() {
  return (
    <nav
      aria-label="Quick contact"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-950/90 px-3 pt-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
    >
      <ul className="grid grid-cols-[1.35fr_1fr_1fr] gap-2">
        <li>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-whatsapp text-sm font-semibold text-whatsapp-ink active:scale-[0.97] transition-transform"
          >
            <WhatsAppIcon className="size-5" />
            WhatsApp
          </a>
        </li>
        <li>
          <a
            href={callHref}
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] text-sm font-medium text-white active:scale-[0.97] transition-transform"
          >
            <Phone className="size-4" aria-hidden="true" />
            Call
          </a>
        </li>
        <li>
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] text-sm font-medium text-white active:scale-[0.97] transition-transform"
          >
            <MapPin className="size-4" aria-hidden="true" />
            Directions
          </a>
        </li>
      </ul>
    </nav>
  );
}
