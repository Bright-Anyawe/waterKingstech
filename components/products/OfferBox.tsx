"use client";

import { ArrowLeftRight, BadgePercent, HandCoins } from "lucide-react";
import Link from "next/link";
import { useId, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { isNegotiable, isSwappable } from "@/data/offers";
import { discountMessage, offerMessage, whatsappHref, withReferrer } from "@/lib/contact-links";
import { formatPrice } from "@/lib/format";
import { useReferrer } from "@/lib/referral";
import type { Product } from "@/types";

/**
 * Room for negotiation: the visitor names their price (or asks for a
 * discount) and WhatsApp opens with the offer written out. Phones and laptops
 * also link to the swap form.
 */
export function OfferBox({ product }: { product: Product }) {
  const id = useId();
  const referrer = useReferrer();
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  if (!isNegotiable(product)) return null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const amount = Number(String(data.get("amount") ?? "").replace(/[^\d.]/g, ""));
    const note = String(data.get("note") ?? "").trim();
    if (!amount || amount < 1) {
      setError("Enter the amount you'd like to pay, in cedis.");
      event.currentTarget.querySelector<HTMLInputElement>("input[name=amount]")?.focus();
      return;
    }
    setError(null);
    window.open(whatsappHref(withReferrer(offerMessage(product, formatPrice(amount), note || undefined), referrer)), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-xl border border-ice-200 bg-white p-5">
      <h2 id={`${id}-title`} className="flex items-center gap-2 font-display text-base font-bold text-ink">
        <HandCoins className="size-5 text-royal-600" aria-hidden="true" />
        Make an offer
      </h2>
      <p className="mt-1 text-sm text-ink-muted">Prices are negotiable. Tell us what you&apos;d like to pay and we&apos;ll reply on WhatsApp.</p>

      <form onSubmit={submit} noValidate className="mt-3 flex flex-col gap-2">
        <label htmlFor={`${id}-amount`} className="sr-only">
          Your offer in Ghana cedis
        </label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <span aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-sm font-bold text-ink-muted">
              GH₵
            </span>
            <input
              id={`${id}-amount`}
              name="amount"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Your price"
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              className="h-11 w-full rounded-lg border border-ice-300 bg-white pr-3 pl-12 text-[0.95rem] font-semibold text-ink tabular-nums outline-none focus:border-royal-600 focus:ring-4 focus:ring-royal-600/15 aria-[invalid=true]:border-save"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-lg bg-whatsapp px-4 text-sm font-bold text-whatsapp-ink transition-colors hover:bg-whatsapp-hover"
          >
            <WhatsAppIcon className="size-4" />
            Send offer
          </button>
        </div>
        <label htmlFor={`${id}-note`} className="sr-only">
          Note (optional)
        </label>
        <input
          id={`${id}-note`}
          name="note"
          maxLength={200}
          placeholder="Add a note (optional), e.g. I can pay today"
          className="h-10 w-full rounded-lg border border-ice-300 bg-white px-3.5 text-sm text-ink outline-none focus:border-royal-600 focus:ring-4 focus:ring-royal-600/15"
        />
        {error ? (
          <p id={`${id}-error`} className="text-sm font-medium text-save">
            {error}
          </p>
        ) : null}
        <p aria-live="polite" className="text-sm font-semibold text-gift">
          {sent ? "WhatsApp opened with your offer — press send to deliver it." : null}
        </p>
      </form>

      <div className="mt-1 flex flex-wrap gap-x-5 gap-y-2 border-t border-ice-200 pt-3 text-sm font-semibold">
        <a
          href={whatsappHref(withReferrer(discountMessage(product), referrer))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-royal-700 hover:underline"
        >
          <BadgePercent className="size-4" aria-hidden="true" />
          Ask for a discount
        </a>
        {isSwappable(product) ? (
          <Link href={`/swap?want=${product.id}`} className="inline-flex items-center gap-1.5 text-royal-700 hover:underline">
            <ArrowLeftRight className="size-4" aria-hidden="true" />
            Swap your device for this
          </Link>
        ) : null}
      </div>
    </section>
  );
}
