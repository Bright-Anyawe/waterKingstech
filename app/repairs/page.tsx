import { Phone, Wrench } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { PortalBanner } from "@/components/sections/PortalBanner";
import { RepairList } from "@/components/sections/RepairList";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { repairImage } from "@/data/repairs";
import { callHref, whatsappHref, whatsappMessages } from "@/lib/contact-links";

export const metadata: Metadata = {
  title: "Phone & laptop repairs in Accra",
  description:
    "Screen replacement, battery swap, SSD upgrades, board repair and diagnostics for phones and laptops at WaterKingsTech, Circle Mall, Accra.",
  alternates: { canonical: "/repairs" },
};

const steps = [
  { title: "Tell us the problem", body: "Describe what's wrong on WhatsApp, or call the shop." },
  { title: "Bring your device", body: "Come to Circle Mall — Blue Gate, Gate 2 Exit." },
  { title: "Get the diagnosis", body: "We find the fault and advise you on the next step." },
  { title: "Collect it fixed", body: "Pick up your device once the repair is done." },
];

export default function RepairsPage() {
  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Repairs" }]} />

      <div className="mt-4">
        <PortalBanner
          tone="navy"
          title="Repair & diagnostic hub"
          lead="Cracked screen, weak battery, slow laptop or a deeper fault? Get your phone or laptop fixed at the shop."
          icon={Wrench}
          points={["Phones & laptops", "Screens & batteries", "SSD upgrades", "Board-level repair"]}
        >
          <div className="flex flex-wrap gap-2">
            <ButtonLink href={whatsappHref(whatsappMessages.repair)} variant="whatsapp" icon={<WhatsAppIcon />}>
              Ask about a repair
            </ButtonLink>
            <ButtonLink href={callHref} variant="white" icon={<Phone />}>
              Call the shop
            </ButtonLink>
          </div>
        </PortalBanner>
      </div>

      <section aria-labelledby="services-title" className="mt-8">
        <h2 id="services-title" className="font-display text-xl font-bold text-ink sm:text-2xl">
          Services &amp; turnaround times
        </h2>
        <p className="mt-1 text-sm text-ink-muted">Tap a service to ask for a quote on WhatsApp — the message is written for you.</p>
        <RepairList className="mt-4" />
      </section>

      <section aria-labelledby="how-title" className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <div className="relative min-h-60 overflow-hidden rounded-xl">
          <Image src={repairImage.src} alt={repairImage.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
        </div>
        <div className="rounded-xl border border-ice-200 bg-white p-5 sm:p-6">
          <h2 id="how-title" className="font-display text-xl font-bold text-ink">
            How a repair works
          </h2>
          <ol className="mt-4 flex flex-col gap-4">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-royal-600 text-sm font-bold text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold text-ink">{step.title}</p>
                  <p className="text-sm text-ink-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
