import { BadgeCheck, ClipboardList, FileText, type LucideIcon, Wallet } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { installment } from "@/data/programs";
import { whatsappHref, whatsappMessages } from "@/lib/contact-links";

const detailIcons: Record<string, LucideIcon> = {
  guidelines: ClipboardList,
  eligibility: BadgeCheck,
  documents: FileText,
  payment: Wallet,
};

export function InstallmentSection() {
  return (
    <section id="installment" aria-labelledby="installment-title" className="bg-mist py-20 sm:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div className="flex flex-col">
          <SectionHeading
            id="installment-title"
            eyebrow="Installment purchases"
            title={
              <>
                Get the Device You Need.{" "}
                <span className="text-ink-400">Pay More Flexibly.</span>
              </>
            }
            description={`Take a UK-used phone, laptop, accessory or bundle from ${business.name} on an installment plan. Message us to get the current requirements and the options available for the device you want.`}
          />

          <Reveal className="mt-8">
            <p className="font-mono text-[0.68rem] tracking-[0.14em] text-ink-400 uppercase">Available on installment · UK used</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {installment.eligibleItems.map((item) => (
                <li key={item} className="rounded-full border border-line bg-white px-3 py-1.5 text-[0.8rem] text-ink-700">
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink
              href={whatsappHref(whatsappMessages.installment)}
              variant="whatsapp"
              size="lg"
              icon={<WhatsAppIcon />}
              className="mt-8"
            >
              Ask About Installment
            </ButtonLink>
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line">
            {installment.steps.map((step, index) => (
              <li key={step.title} className="flex gap-4 bg-white p-5 sm:p-6">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink-950 font-mono text-xs text-white">
                  {index + 1}
                </span>
                <div>
                  <p className="font-semibold tracking-[-0.01em] text-ink-950">{step.title}</p>
                  <p className="mt-1 text-sm text-ink-500">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="flex flex-col">
          <RevealGroup stagger={0.08} className="grid gap-4 sm:grid-cols-2">
            {installment.details.map((group) => {
              const Icon = detailIcons[group.id] ?? ClipboardList;
              return (
                <RevealItem key={group.id} className="h-full">
                  <article className="flex h-full flex-col rounded-3xl border border-line bg-white p-5 sm:p-6">
                    <div className="flex items-center gap-3 sm:flex-col sm:items-start sm:gap-5">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-tide-200/60 text-tide-800 sm:size-11">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <h3 className="text-base font-semibold tracking-[-0.02em] text-ink-950 sm:text-lg">{group.title}</h3>
                    </div>
                    {group.items && group.items.length > 0 ? (
                      <ul className="mt-3 flex flex-col gap-2 text-sm text-ink-600">
                        {group.items.map((item) => (
                          <li key={item} className="flex gap-2">
                            <span aria-hidden="true" className="mt-2 size-1 shrink-0 rounded-full bg-tide-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="mt-3 flex flex-1 flex-col items-start justify-between gap-3 sm:gap-4">
                        <p className="text-sm text-ink-500">Details will be published here once confirmed.</p>
                        <Pending>To be supplied</Pending>
                      </div>
                    )}
                  </article>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal className="mt-4 rounded-3xl border border-line bg-white p-6">
            <p className="text-sm font-semibold text-ink-950">Terms</p>
            {installment.terms ? (
              <p className="mt-2 text-sm leading-relaxed text-ink-600">{installment.terms}</p>
            ) : (
              <p className="mt-2 text-sm leading-relaxed text-ink-500">
                Installment terms are set by {business.name}. Message us for the current terms.{" "}
                <Pending className="mt-2">Full terms to be supplied</Pending>
              </p>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
