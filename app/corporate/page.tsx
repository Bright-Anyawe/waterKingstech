import { ArrowDown, Building2, Mail, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { QuoteForm } from "@/components/corporate/QuoteForm";
import { audienceIcons, offerIcons } from "@/components/sections/CorporateBand";
import { PortalBanner } from "@/components/sections/PortalBanner";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { contact } from "@/data/contact";
import { corporate } from "@/data/corporate";
import { callHref, emailHref, whatsappHref, whatsappMessages } from "@/lib/contact-links";

export const metadata: Metadata = {
  title: "Corporate & bulk orders — companies, schools, NGOs",
  description:
    "Bulk laptops, phones and accessories for companies, schools and NGOs in Ghana. Formal PDF quotations, official invoicing and long-term repair retainers from WaterKingsTech.",
  alternates: { canonical: "/corporate" },
};

export default function CorporatePage() {
  const mail = emailHref("Corporate quotation request");

  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Corporate" }]} />

      <div className="mt-4">
        <PortalBanner
          tone="navy"
          title="Corporate portal"
          lead="Bulk laptops, phones and accessories for your organisation — with a formal PDF quotation, official invoicing and long-term repair support."
          icon={Building2}
          badge={
            <span className="inline-flex items-center rounded-lg bg-orange px-3 py-1.5 font-display text-sm font-extrabold text-ink uppercase">
              B2B
            </span>
          }
        >
          <ul className="flex flex-wrap gap-2">
            {corporate.audiences.map((audience) => {
              const Icon = audienceIcons[audience.id];
              return (
                <li key={audience.id} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm font-semibold">
                  <Icon className="size-4 text-cyan" aria-hidden="true" />
                  {audience.label}
                </li>
              );
            })}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <ButtonLink href="#quote" variant="orange" icon={<ArrowDown />}>
              Request a bulk quote
            </ButtonLink>
            <ButtonLink href={whatsappHref(whatsappMessages.corporate)} variant="whatsapp" icon={<WhatsAppIcon />}>
              Chat on WhatsApp
            </ButtonLink>
          </div>
        </PortalBanner>
      </div>

      <section aria-labelledby="offers-title" className="mt-8">
        <h2 id="offers-title" className="font-display text-xl font-bold text-ink sm:text-2xl">
          What corporate buyers get
        </h2>
        <ul className="mt-4 divide-y divide-ice-200 rounded-xl border border-ice-200 bg-white">
          {corporate.offers.map((offer) => {
            const Icon = offerIcons[offer.id];
            return (
              <li key={offer.id} className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-0.5 px-5 py-4 sm:grid-cols-[auto_15rem_1fr]">
                <span className="row-span-2 flex size-10 shrink-0 items-center justify-center rounded-lg bg-navy text-cyan sm:row-span-1">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-semibold text-ink">{offer.title}</h3>
                <p className="text-sm text-ink-muted">{offer.body}</p>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-labelledby="process-title" className="mt-10">
        <h2 id="process-title" className="font-display text-xl font-bold text-ink sm:text-2xl">
          How it works
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {corporate.steps.map((step, index) => (
            <li key={step.title} className="flex gap-3 rounded-xl border border-ice-200 bg-white p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange font-display text-sm font-extrabold text-ink">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-ink">{step.title}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="quote" aria-labelledby="quote-title" className="mt-10 scroll-mt-32">
        <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-xl border border-ice-200 bg-white p-5 sm:p-7">
            <h2 id="quote-title" className="font-display text-2xl font-extrabold tracking-[-0.02em] text-ink">
              Request a bulk quote
            </h2>
            <p className="mt-1 mb-6 text-sm text-ink-muted">
              Tell us what your organisation needs. We&apos;ll reply with a formal quotation.
            </p>
            <QuoteForm />
          </div>

          <aside aria-label="Corporate contact" className="flex flex-col gap-3 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-xl bg-navy p-5 text-white">
              <h3 className="font-display text-lg font-bold">Prefer to talk?</h3>
              <p className="mt-1 text-sm text-white/75">Reach the shop directly about bulk orders and repair retainers.</p>
              <ul className="mt-4 flex flex-col gap-3 text-sm">
                {mail ? (
                  <li>
                    <a href={mail} className="flex items-center gap-2.5 font-semibold break-all hover:text-cyan-200">
                      <Mail className="size-4 shrink-0 text-cyan" aria-hidden="true" />
                      {contact.email}
                    </a>
                  </li>
                ) : null}
                {contact.phoneDisplay ? (
                  <li>
                    <a href={callHref} className="flex items-center gap-2.5 font-semibold hover:text-cyan-200">
                      <Phone className="size-4 shrink-0 text-cyan" aria-hidden="true" />
                      {contact.phoneDisplay}
                    </a>
                  </li>
                ) : null}
                {contact.whatsapp.map((w) => (
                  <li key={w.number}>
                    <a
                      href={whatsappHref(whatsappMessages.corporate, w.number)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 font-semibold hover:text-cyan-200"
                    >
                      <WhatsAppIcon className="size-4 shrink-0 text-whatsapp" />
                      {w.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-ice-200 bg-white p-5 text-sm text-ink-soft">
              <p className="font-semibold text-ink">Shopping for yourself?</p>
              <p className="mt-1">
                Single-unit prices, free gift bundles and installment plans are in the{" "}
                <Link href="/" className="font-semibold text-royal-700 hover:underline">
                  retail shop
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
