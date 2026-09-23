import { MessageCircleQuestion } from "lucide-react";
import { CatalogBrowser } from "@/components/products/CatalogBrowser";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { whatsappHref, whatsappMessages } from "@/lib/contact-links";

export function ProductCatalog() {
  return (
    <section id="catalog" aria-labelledby="catalog-title" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="catalog-title"
          eyebrow="Product catalog"
          title="Browse our devices."
          description="Filter by category, check the key specs, then tap “Buy on WhatsApp” — your message is prepared for you."
        />

        <CatalogBrowser products={products} categories={categories} />

        <Reveal className="mt-10 flex flex-col items-start justify-between gap-5 rounded-3xl bg-mist p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white text-tide-700 ring-1 ring-line">
              <MessageCircleQuestion className="size-5" aria-hidden="true" />
            </span>
            <div>
              <p className="text-lg font-semibold tracking-[-0.02em] text-ink-950">Can&apos;t find what you&apos;re looking for?</p>
              <p className="mt-1 text-sm text-ink-500">Our stock changes often. Tell us the device you want and we&apos;ll check for you.</p>
            </div>
          </div>
          <ButtonLink href={whatsappHref(whatsappMessages.catalog)} variant="whatsapp" icon={<WhatsAppIcon />}>
            Ask on WhatsApp
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
