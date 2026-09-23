import { ArrowLeft } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappHref } from "@/lib/contact-links";

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] items-center bg-ink-950 pt-24 pb-16 text-white">
      <div className="container-x flex flex-col items-start">
        <p className="font-mono text-sm text-tide-300">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.04em] sm:text-7xl">Page not found.</h1>
        <p className="mt-5 max-w-md text-lg text-ink-300">
          The page you&apos;re looking for doesn&apos;t exist. Head back to the shop or message us directly.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="light" size="lg" icon={<ArrowLeft />}>
            Back to home
          </ButtonLink>
          <ButtonLink href={whatsappHref()} variant="whatsapp" size="lg" icon={<WhatsAppIcon />}>
            WhatsApp Us
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
