import { ArrowRight, Check, Headphones, Laptop, type LucideIcon, Smartphone } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { installment, referral, type CommissionRange } from "@/data/programs";
import { cn } from "@/lib/cn";
import { whatsappHref, whatsappMessages } from "@/lib/contact-links";
import { formatPrice } from "@/lib/format";

const rangeIcons: Record<CommissionRange["id"], LucideIcon> = {
  phones: Smartphone,
  laptops: Laptop,
  accessories: Headphones,
};

/* -------------------------------------------------------------------------- */
/*  Referral                                                                  */
/* -------------------------------------------------------------------------- */

export function ReferralPanel({ compact = false, className }: { compact?: boolean; className?: string }) {
  const { min, max } = referral.commission;

  return (
    <section
      id={compact ? undefined : "referral"}
      aria-labelledby={compact ? "referral-compact-title" : "referral-title"}
      className={cn("overflow-hidden rounded-xl border border-ice-200 bg-white", className)}
    >
      <div className="bg-orange px-5 py-5 text-ink sm:px-6">
        <h2
          id={compact ? "referral-compact-title" : "referral-title"}
          className="font-display text-[1.6rem] leading-tight font-extrabold tracking-[-0.02em] sm:text-3xl"
        >
          Refer a buyer. Earn <span className="whitespace-nowrap">{formatPrice(min)}</span> –{" "}
          <span className="whitespace-nowrap">{formatPrice(max)}</span>.
        </h2>
        <p className="mt-1.5 max-w-xl text-[0.92rem] text-ink/80">
          Send friends, family or colleagues to {business.name}. When they buy, you get paid.
        </p>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <h3 className="text-sm font-bold text-ink">When they buy</h3>
        <ul className="mt-2 divide-y divide-ice-200">
          {referral.purchase.map((row) => {
            const Icon = rangeIcons[row.id];
            return (
              <li key={row.id} className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 py-3 sm:grid-cols-[auto_1fr_auto]">
                <span className="row-span-2 flex size-10 shrink-0 items-center justify-center self-start rounded-lg bg-orange/15 text-orange-strong sm:row-span-1 sm:self-center">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{row.label}</p>
                  <p className="text-[0.8rem] text-ink-muted">{compact ? row.examples : `${row.examples} · ${row.basis}`}</p>
                </div>
                <p className="col-start-2 font-display font-extrabold text-royal-600 tabular-nums sm:col-start-3 sm:text-right">
                  <span className="whitespace-nowrap">{formatPrice(row.min)}</span>
                  <span className="text-ink-muted"> – </span>
                  <span className="whitespace-nowrap">{formatPrice(row.max)}</span>
                </p>
              </li>
            );
          })}
        </ul>

        {!compact ? (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-ink">When they buy on installment</h3>
              <span className="rounded-md bg-royal-600 px-2 py-0.5 text-[0.7rem] font-bold text-white">UK used</span>
            </div>
            <table className="mt-2 w-full text-sm">
              <caption className="sr-only">Fixed referral commission on installment purchases</caption>
              <thead>
                <tr className="text-left text-[0.75rem] text-ink-muted">
                  <th scope="col" className="pb-2 font-semibold">
                    Product
                  </th>
                  <th scope="col" className="pb-2 text-right font-semibold">
                    You earn
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ice-200">
                {referral.installment.map((row) => (
                  <tr key={row.label}>
                    <td className="py-2.5 text-ink-soft">{row.label}</td>
                    <td className="py-2.5 text-right font-display font-extrabold text-royal-600 tabular-nums">
                      {formatPrice(row.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="mt-6 text-sm font-bold text-ink">How it works</h3>
            <ol className="mt-3 grid gap-3 sm:grid-cols-2">
              {referral.steps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="text-[0.85rem] text-ink-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>

            <ul className="mt-6 flex flex-wrap gap-2">
              {referral.benefits.map((benefit) => (
                <li key={benefit} className="inline-flex items-center gap-1 rounded-full bg-ice px-3 py-1 text-[0.8rem] font-medium text-ink-soft">
                  <Check className="size-3.5 text-gift" aria-hidden="true" />
                  {benefit}
                </li>
              ))}
            </ul>
            <div className="mt-4 text-[0.85rem] text-ink-muted">
              {referral.terms ?? <Pending>Payout terms to be supplied</Pending>}
            </div>
          </>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <ButtonLink href={whatsappHref(whatsappMessages.referral)} variant="whatsapp" icon={<WhatsAppIcon />}>
            Join on WhatsApp
          </ButtonLink>
          {compact ? (
            <Link href="/tap-and-earn" className="group inline-flex items-center gap-1 text-sm font-semibold text-royal-700">
              How Tap &amp; Earn works
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Installment                                                               */
/* -------------------------------------------------------------------------- */

export function InstallmentPanel({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <section
      id={compact ? undefined : "installment"}
      aria-labelledby={compact ? "installment-compact-title" : "installment-title"}
      className={cn("overflow-hidden rounded-xl border border-ice-200 bg-white", className)}
    >
      <div className="bg-royal-600 px-5 py-5 text-white sm:px-6">
        <h2
          id={compact ? "installment-compact-title" : "installment-title"}
          className="font-display text-[1.6rem] leading-tight font-extrabold tracking-[-0.02em] sm:text-3xl"
        >
          Get the device now. Pay over time.
        </h2>
        <p className="mt-1.5 max-w-xl text-[0.92rem] text-white/85">
          Installment plans on every phone, UK used or brand new, plus MacBooks and iPads.
        </p>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <h3 className="text-sm font-bold text-ink">Available on installment</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {installment.eligibleItems.map((item) => (
            <li key={item} className="rounded-full border border-royal-200 bg-royal-50 px-3 py-1 text-[0.8rem] font-medium text-royal-800">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-2.5 text-[0.82rem] text-ink-muted">{installment.notEligible}</p>

        <h3 className="mt-6 text-sm font-bold text-ink">How it works</h3>
        <ol className="mt-3 grid gap-3 sm:grid-cols-2">
          {installment.steps.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-royal-600 text-xs font-bold text-white">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-ink">{step.title}</p>
                {!compact ? <p className="text-[0.85rem] text-ink-muted">{step.body}</p> : null}
              </div>
            </li>
          ))}
        </ol>

        {!compact ? (
          <dl className="mt-6 divide-y divide-ice-200 rounded-lg border border-ice-200">
            {installment.details.map((group) => (
              <div key={group.id} className="flex flex-col gap-1.5 px-4 py-3 sm:flex-row sm:items-start sm:justify-between">
                <dt className="font-semibold text-ink">{group.title}</dt>
                <dd className="text-sm text-ink-soft">
                  {group.items && group.items.length > 0 ? (
                    <ul className="list-disc pl-4">
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <Pending>To be supplied</Pending>
                  )}
                </dd>
              </div>
            ))}
            <div className="flex flex-col gap-1.5 px-4 py-3 sm:flex-row sm:items-start sm:justify-between">
              <dt className="font-semibold text-ink">Terms</dt>
              <dd className="text-sm text-ink-soft">{installment.terms ?? <Pending>Full terms to be supplied</Pending>}</dd>
            </div>
          </dl>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <ButtonLink href={whatsappHref(whatsappMessages.installment)} variant="whatsapp" icon={<WhatsAppIcon />}>
            Ask about installment
          </ButtonLink>
          {compact ? (
            <Link href="/referral-installment#installment" className="group inline-flex items-center gap-1 text-sm font-semibold text-royal-700">
              Plan details
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
