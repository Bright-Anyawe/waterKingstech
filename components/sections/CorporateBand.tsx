import { ArrowRight, Building2, FileText, GraduationCap, HeartHandshake, Receipt, Tags, Wrench, type LucideIcon } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { corporate } from "@/data/corporate";
import { cn } from "@/lib/cn";

export const offerIcons: Record<string, LucideIcon> = {
  bulk: Tags,
  quotation: FileText,
  invoice: Receipt,
  retainer: Wrench,
};

export const audienceIcons: Record<string, LucideIcon> = {
  company: Building2,
  school: GraduationCap,
  ngo: HeartHandshake,
};

/** Navy band that sends organisations to the corporate (B2B) portal. */
export function CorporateBand({ className }: { className?: string }) {
  return (
    <section
      aria-labelledby="corporate-band-title"
      className={cn("relative isolate overflow-hidden rounded-xl bg-navy px-5 py-7 text-white sm:px-8 sm:py-9", className)}
    >
      <div aria-hidden="true" className="absolute -top-24 -right-24 -z-10 size-80 rounded-full bg-royal-600/40 blur-3xl" />
      <div className="grid gap-7 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 id="corporate-band-title" className="font-display text-[1.6rem] leading-tight font-extrabold tracking-[-0.02em] sm:text-3xl">
            Buying for an organisation?
          </h2>
          <p className="mt-2 max-w-md text-[0.95rem] text-white/80">
            Bulk laptops and phones for your team, classroom or project — with a formal quotation and official invoice.
          </p>
          <p className="mt-4 flex flex-wrap gap-2">
            {corporate.audiences.map((audience) => {
              const Icon = audienceIcons[audience.id];
              return (
                <span key={audience.id} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[0.78rem] font-semibold">
                  <Icon className="size-3.5 text-cyan" aria-hidden="true" />
                  {audience.label}
                </span>
              );
            })}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/corporate#quote" variant="orange" trailingIcon={<ArrowRight />}>
              Request a bulk quote
            </ButtonLink>
          </div>
        </div>

        <ul className="divide-y divide-white/10 rounded-lg border border-white/10">
          {corporate.offers.map((offer) => {
            const Icon = offerIcons[offer.id];
            return (
              <li key={offer.id} className="flex items-start gap-3 px-4 py-3.5 sm:items-center">
                <Icon className="mt-0.5 size-5 shrink-0 text-cyan sm:mt-0" aria-hidden="true" />
                <p className="text-[0.9rem] text-white/75">
                  <span className="font-semibold text-white">{offer.title}.</span> {offer.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
