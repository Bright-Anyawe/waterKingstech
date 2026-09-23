import { Check, Headphones, Laptop, type LucideIcon, Repeat, Smartphone } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal, RevealList, RevealListItem } from "@/components/ui/Reveal";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { referral, type CommissionRange } from "@/data/programs";
import { formatPrice } from "@/lib/format";
import { whatsappHref, whatsappMessages } from "@/lib/contact-links";

const rangeIcons: Record<CommissionRange["id"], LucideIcon> = {
  phones: Smartphone,
  laptops: Laptop,
  accessories: Headphones,
};

export function ReferralSection() {
  const { min, max } = referral.commission;

  return (
    <section id="referrals" aria-labelledby="referrals-title" className="bg-white py-20 sm:py-28">
      <div className="container-x">
        <Reveal className="relative isolate overflow-hidden rounded-[2rem] bg-ink-950 px-5 py-12 text-white sm:px-10 sm:py-16 lg:rounded-[2.5rem] lg:px-16 lg:py-20">
          {/* Atmosphere */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-1/3 -right-1/4 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(closest-side,rgb(18_181_214/0.28),transparent)]" />
            <div className="absolute -bottom-1/3 -left-1/4 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(37_211_102/0.10),transparent)]" />
            <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(60%_50%_at_80%_10%,black,transparent)]" />
          </div>

          {/* Intro + headline range */}
          <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-16">
            <div>
              <Eyebrow tone="dark">Referral program</Eyebrow>
              <h2
                id="referrals-title"
                className="mt-5 text-[2.6rem] leading-[1] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-7xl"
              >
                Refer.
                <br />
                Earn.
                <br />
                <span className="inline-flex items-center gap-3 bg-linear-to-r from-tide-200 to-tide-400 bg-clip-text text-transparent">
                  Repeat.
                  <Repeat className="size-8 text-tide-400 sm:size-10" aria-hidden="true" />
                </span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-ink-300 sm:text-lg">
                Know someone who needs a phone, laptop or accessory? Send them to {business.name} and earn a
                commission on every successful referral — whether they buy outright or on installment.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {referral.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-ink-200"
                  >
                    <Check className="size-3.5 text-tide-300" aria-hidden="true" />
                    {benefit}
                  </li>
                ))}
              </ul>
              <ButtonLink
                href={whatsappHref(whatsappMessages.referral)}
                variant="whatsapp"
                size="lg"
                icon={<WhatsAppIcon />}
                className="mt-9"
              >
                Ask About Referrals
              </ButtonLink>
            </div>

            <div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm sm:p-8">
                <p className="font-mono text-[0.7rem] tracking-[0.16em] text-ink-300 uppercase">Earn commissions from</p>
                <p className="mt-3 flex flex-wrap items-baseline gap-x-3 text-4xl font-semibold tracking-[-0.04em] tabular-nums sm:text-5xl">
                  <span>{formatPrice(min)}</span>
                  <span className="text-2xl text-ink-400">to</span>
                  <span className="text-tide-300">{formatPrice(max)}</span>
                </p>
                <p className="mt-3 text-sm text-ink-300">
                  The amount depends on what your referral buys. {business.name} confirms each referral once the deal is
                  completed.
                </p>
              </div>

              <RevealList stagger={0.08} className="mt-4 grid grid-cols-2 gap-3">
                {referral.steps.map((step, index) => (
                  <RevealListItem key={step.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
                    <span className="font-mono text-xs text-tide-300">{String(index + 1).padStart(2, "0")}</span>
                    <p className="mt-1.5 font-semibold tracking-[-0.01em]">{step.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-ink-300 sm:text-sm">{step.body}</p>
                  </RevealListItem>
                ))}
              </RevealList>
            </div>
          </div>

          {/* Commission breakdown */}
          <div className="mt-14 grid gap-4 border-t border-white/[0.08] pt-12 lg:grid-cols-2 lg:gap-5">
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <h3 className="text-lg font-semibold tracking-[-0.02em]">When they buy</h3>
              <p className="mt-1 text-sm text-ink-300">Commission on every successful purchase referral.</p>
              <ul className="mt-6 flex flex-col divide-y divide-white/[0.07]">
                {referral.purchase.map((row) => {
                  const Icon = rangeIcons[row.id];
                  return (
                    <li
                      key={row.id}
                      className="grid grid-cols-[auto_1fr] items-start gap-x-4 gap-y-2 py-4 first:pt-0 last:pb-0 sm:grid-cols-[auto_1fr_auto]"
                    >
                      <span className="row-span-2 flex size-10 shrink-0 items-center justify-center rounded-xl bg-tide-400/10 text-tide-300 sm:row-span-1">
                        <Icon className="size-5" aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-medium">{row.label}</p>
                        <p className="mt-0.5 text-xs text-ink-400">{row.examples}</p>
                        <p className="mt-0.5 text-xs text-ink-400">{row.basis}</p>
                      </div>
                      <p className="col-start-2 font-semibold tabular-nums text-tide-300 sm:col-start-3 sm:text-right">
                        {formatPrice(row.min)}
                        <span className="text-ink-400"> – </span>
                        <span className="whitespace-nowrap">{formatPrice(row.max)}</span>
                      </p>
                    </li>
                  );
                })}
              </ul>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-semibold tracking-[-0.02em]">When they take it on installment</h3>
                <span className="rounded-full bg-tide-400 px-2.5 py-0.5 text-[0.7rem] font-semibold text-ink-950">UK used</span>
              </div>
              <p className="mt-1 text-sm text-ink-300">Fixed commission once the installment deal is completed.</p>
              <table className="mt-6 w-full text-sm">
                <caption className="sr-only">Installment referral commission by product</caption>
                <thead>
                  <tr className="text-left font-mono text-[0.68rem] tracking-[0.14em] text-ink-400 uppercase">
                    <th scope="col" className="pb-3 font-medium">
                      Product
                    </th>
                    <th scope="col" className="pb-3 text-right font-medium">
                      Commission
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.07]">
                  {referral.installment.map((row) => (
                    <tr key={row.label}>
                      <td className="py-3 text-ink-200">{row.label}</td>
                      <td className="py-3 text-right font-semibold tabular-nums text-tide-300">{formatPrice(row.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </article>
          </div>

          {referral.terms ? <p className="mt-6 text-xs text-ink-400">{referral.terms}</p> : null}
        </Reveal>
      </div>
    </section>
  );
}
