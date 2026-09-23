import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact-links";

/** Desktop/tablet floating WhatsApp button. Phones use <MobileActionBar /> instead. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with WaterKingsTech on WhatsApp"
      className="group fixed right-6 bottom-6 z-40 hidden h-14 items-center overflow-hidden rounded-full bg-whatsapp text-whatsapp-ink shadow-[0_18px_40px_-14px_rgb(37_211_102/0.75),0_0_0_1px_rgb(0_0_0/0.04)] transition-[transform,background-color] duration-300 ease-[var(--ease-premium)] hero-fade [--i:6] hover:-translate-y-0.5 hover:bg-whatsapp-hover md:flex"
    >
      <span className="flex size-14 shrink-0 items-center justify-center">
        <WhatsAppIcon className="size-6" />
      </span>
      <span className="grid grid-cols-[0fr] transition-[grid-template-columns] duration-500 ease-[var(--ease-premium)] group-hover:grid-cols-[1fr] group-focus-visible:grid-cols-[1fr]">
        <span className="overflow-hidden whitespace-nowrap pr-0 text-sm font-semibold transition-[padding] duration-500 group-hover:pr-5 group-focus-visible:pr-5">
          Chat with us
        </span>
      </span>
    </a>
  );
}
