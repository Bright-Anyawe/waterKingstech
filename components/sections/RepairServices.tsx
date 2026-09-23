import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { RepairCard } from "@/components/repairs/RepairCard";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { repairImage, repairServices } from "@/data/repairs";
import { callHref, whatsappHref, whatsappMessages } from "@/lib/contact-links";

export function RepairServices() {
  // With an odd number of services, the last one spans the full row.
  const last = repairServices.length % 2 === 1 ? repairServices.at(-1) : undefined;
  const cards = last ? repairServices.slice(0, -1) : repairServices;

  return (
    <section
      id="repairs"
      aria-labelledby="repairs-title"
      className="relative isolate overflow-hidden bg-ink-900 py-20 text-white sm:py-28"
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid-dark [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="repairs-title"
            tone="dark"
            eyebrow="Repairs & diagnostics"
            title="Device Problems? We Can Help."
            description="From cracked screens to tired batteries and board-level faults — bring your phone or laptop to WaterKingsTech."
          />
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <ButtonLink href={whatsappHref(whatsappMessages.repair)} variant="whatsapp" size="lg" icon={<WhatsAppIcon />}>
              Ask About a Repair
            </ButtonLink>
          </div>
        </div>

        <div className="mt-12 grid gap-4 sm:mt-14 lg:grid-cols-[0.9fr_2fr] lg:gap-5">
          <Reveal className="relative min-h-[20rem] overflow-hidden rounded-3xl ring-1 ring-white/10 lg:min-h-0">
            <Image
              src={repairImage.src}
              alt={repairImage.alt}
              fill
              sizes="(min-width: 1024px) 30vw, 100vw"
              className="object-cover object-[45%_85%]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-ink-950/95 via-ink-950/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
              <p className="text-xl leading-snug font-semibold tracking-[-0.02em]">Not sure what&apos;s wrong?</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-200">
                Describe the problem on WhatsApp or give us a call — we&apos;ll advise on the next step.
              </p>
              <ButtonLink
                href={callHref}
                variant="outline-light"
                trailingIcon={<ArrowRight />}
                className="mt-5 backdrop-blur-md"
              >
                Call the shop
              </ButtonLink>
            </div>
          </Reveal>

          <RevealGroup stagger={0.06} className="grid gap-4 sm:grid-cols-2 lg:gap-5">
            {cards.map((service) => (
              <RevealItem key={service.id}>
                <RepairCard service={service} />
              </RevealItem>
            ))}
            {last ? (
              <RevealItem className="sm:col-span-2">
                <RepairCard service={last} wide />
              </RevealItem>
            ) : null}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
