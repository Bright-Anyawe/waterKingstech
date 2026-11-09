"use client";

import { Check, Coins, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { business } from "@/data/business";
import { maxCommissionFor } from "@/data/programs";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format";
import { cleanName, setSharerName, useSharerName } from "@/lib/referral";
import type { CategoryId } from "@/types";

type TapEarnButtonProps = {
  productId: string;
  title: string;
  category: CategoryId;
  /** "inline": a text row on listing cards. "block": a full-width button on the product page. */
  variant?: "inline" | "block";
  className?: string;
};

/**
 * Tap & Earn: shares an item to WhatsApp (or the phone's share sheet) with a
 * link that carries the sharer's name. When the friend buys through it, their
 * WhatsApp order names the sharer so the shop can pay the commission.
 */
export function TapEarnButton({ productId, title, category, variant = "inline", className }: TapEarnButtonProps) {
  const sharer = useSharerName();
  const [asking, setAsking] = useState(false);
  const [shared, setShared] = useState(false);
  const earn = formatPrice(maxCommissionFor(category));

  const share = async (name: string) => {
    const url = `${window.location.origin}/product/${productId}?ref=${encodeURIComponent(name)}`;
    const text = `Check out this ${title} at ${business.name}, Circle Mall, Accra. Tell them ${name} sent you.`;
    try {
      if (navigator.share && window.matchMedia("(pointer: coarse)").matches) {
        await navigator.share({ title, text, url });
      } else {
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`, "_blank", "noopener,noreferrer");
      }
      setShared(true);
      window.setTimeout(() => setShared(false), 5000);
    } catch {
      // The visitor closed the share sheet — nothing to do.
    }
  };

  const onClick = () => {
    if (sharer) void share(sharer);
    else setAsking(true);
  };

  return (
    <>
      {variant === "inline" ? (
        <button
          type="button"
          onClick={onClick}
          className={cn(
            "flex w-full items-center gap-1 text-left text-[0.74rem] font-bold text-orange-strong hover:underline",
            className,
          )}
        >
          {shared ? <Check className="size-3.5 shrink-0" aria-hidden="true" /> : <Coins className="size-3.5 shrink-0" aria-hidden="true" />}
          {shared ? "Shared — thank you!" : `Tap & Earn up to ${earn}`}
        </button>
      ) : (
        <div className={className}>
          <button
            type="button"
            onClick={onClick}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-orange bg-orange/10 px-4 text-[0.95rem] font-bold text-ink transition-colors hover:bg-orange"
          >
            {shared ? <Check className="size-5" aria-hidden="true" /> : <Coins className="size-5 text-orange-strong" aria-hidden="true" />}
            {shared ? "Shared — you earn when they buy" : `Tap & Earn: share & earn up to ${earn}`}
          </button>
          <p className="mt-1.5 text-center text-[0.78rem] text-ink-muted">
            {sharer ? (
              <>
                Sharing as <span className="font-semibold text-ink">{sharer}</span> ·{" "}
                <button type="button" onClick={() => setAsking(true)} className="font-semibold text-royal-700 hover:underline">
                  change
                </button>
              </>
            ) : (
              <>
                Share this item with a friend. When they buy, you earn.{" "}
                <Link href="/tap-and-earn" className="font-semibold text-royal-700 hover:underline">
                  How it works
                </Link>
              </>
            )}
          </p>
        </div>
      )}
      <p aria-live="polite" className="sr-only">
        {shared ? "Shared. You earn a commission when your friend buys." : ""}
      </p>

      {asking ? (
        <NameDialog
          initialName={sharer ?? ""}
          earn={earn}
          onClose={() => setAsking(false)}
          onSave={(name) => {
            setSharerName(name);
            setAsking(false);
            void share(name);
          }}
        />
      ) : null}
    </>
  );
}

function NameDialog({
  initialName,
  earn,
  onClose,
  onSave,
}: {
  initialName: string;
  earn: string;
  onClose: () => void;
  onSave: (name: string) => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
    // showModal focuses the first control (the close button); start on the name field instead.
    inputRef.current?.focus();
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = cleanName(String(new FormData(event.currentTarget).get("name") ?? ""));
    if (!name) {
      setError("Enter your name so the shop knows who to pay.");
      return;
    }
    onSave(name);
  };

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-labelledby={`${id}-title`}
      className="m-auto w-[min(26rem,calc(100vw-2rem))] rounded-2xl bg-white p-0 text-ink shadow-[0_30px_60px_-20px_rgb(3_26_61/0.6)] backdrop:bg-navy-950/50"
    >
      <form onSubmit={submit} className="p-5 sm:p-6" noValidate>
        <div className="flex items-start justify-between gap-3">
          <h2 id={`${id}-title`} className="flex items-center gap-2 font-display text-xl font-extrabold">
            <Coins className="size-5 text-orange-strong" aria-hidden="true" />
            Tap &amp; Earn
          </h2>
          <button type="button" onClick={onClose} className="-m-1 flex size-9 items-center justify-center rounded-lg hover:bg-ice">
            <X className="size-5" aria-hidden="true" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <p className="mt-2 text-sm text-ink-soft">
          Share this item with a friend. When they buy, you earn up to <span className="font-bold text-ink">{earn}</span>.
        </p>

        <label htmlFor={`${id}-name`} className="mt-5 block text-sm font-semibold">
          Your name
        </label>
        <input
          id={`${id}-name`}
          name="name"
          defaultValue={initialName}
          ref={inputRef}
          autoComplete="name"
          maxLength={40}
          aria-invalid={error ? true : undefined}
          aria-describedby={`${id}-help${error ? ` ${id}-error` : ""}`}
          className="mt-1.5 h-11 w-full rounded-lg border border-ice-300 px-3.5 text-[0.95rem] outline-none focus:border-royal-600 focus:ring-4 focus:ring-royal-600/15 aria-[invalid=true]:border-save"
        />
        {error ? (
          <p id={`${id}-error`} className="mt-1.5 text-sm font-medium text-save">
            {error}
          </p>
        ) : null}
        <p id={`${id}-help`} className="mt-1.5 text-[0.78rem] text-ink-muted">
          Your name goes into the link you share, so {business.name} knows who to pay. It&apos;s remembered on this device only.
        </p>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row-reverse">
          <button type="submit" className="h-11 flex-1 rounded-lg bg-orange px-5 text-sm font-bold text-ink hover:bg-orange-strong">
            Share now
          </button>
          <button type="button" onClick={onClose} className="h-11 rounded-lg border border-ice-300 px-5 text-sm font-semibold hover:bg-ice">
            Cancel
          </button>
        </div>
        <p className="mt-4 text-center text-[0.8rem]">
          <Link href="/tap-and-earn" className="font-semibold text-royal-700 hover:underline">
            How Tap &amp; Earn works
          </Link>
        </p>
      </form>
    </dialog>
  );
}
