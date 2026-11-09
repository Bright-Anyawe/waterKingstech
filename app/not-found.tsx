import { ArrowLeft, Search } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact-links";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[60dvh] flex-col items-center justify-center py-16 text-center">
      <p className="font-display text-6xl font-extrabold text-royal-600">404</p>
      <h1 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">We couldn&apos;t find that page.</h1>
      <p className="mt-2 max-w-md text-ink-muted">It may have moved, or the item may have sold. Try the shop, or ask us directly.</p>
      <div className="mt-7 flex flex-col gap-2 sm:flex-row">
        <ButtonLink href="/" variant="primary" icon={<ArrowLeft />}>
          Back to home
        </ButtonLink>
        <ButtonLink href="/shop" variant="outline" icon={<Search />}>
          Browse the shop
        </ButtonLink>
        <ButtonLink href={whatsappHref()} variant="whatsapp" icon={<WhatsAppIcon />}>
          WhatsApp us
        </ButtonLink>
      </div>
    </section>
  );
}
