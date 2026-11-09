"use client";

import { Check } from "lucide-react";
import { useId, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { whatsappHref } from "@/lib/contact-links";
import { cleanName, setSharerName, useSharerName } from "@/lib/referral";

const inputClass =
  "h-11 w-full rounded-lg border border-ice-300 bg-white px-3.5 text-[0.95rem] text-ink outline-none focus:border-royal-600 focus:ring-4 focus:ring-royal-600/15 aria-[invalid=true]:border-save";

/**
 * Sets the visitor's Tap & Earn name (remembered on this device) and lets them
 * register with the shop on WhatsApp, so commissions can be paid.
 */
export function TapEarnProfile() {
  const id = useId();
  const savedName = useSharerName();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = cleanName(String(data.get("name") ?? ""));
    const phone = String(data.get("phone") ?? "").trim();
    if (!name) {
      setError("Enter your name — it goes into every link you share.");
      return;
    }
    setError(null);
    setSharerName(name);
    setSaved(true);
    const register = (event.nativeEvent as SubmitEvent).submitter?.getAttribute("value") === "register";
    if (register) {
      const message = [
        `Hello ${business.name}, I'd like to join Tap & Earn.`,
        "",
        `Name: ${name}`,
        ...(phone ? [`Phone / MoMo: ${phone}`] : []),
        "",
        "Please let me know how commissions are paid.",
      ].join("\n");
      window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    }
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-4" key={savedName ?? "empty"}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-name`} className="text-sm font-semibold text-ink">
            Your name <span className="text-save">*</span>
          </label>
          <input
            id={`${id}-name`}
            name="name"
            defaultValue={savedName ?? ""}
            autoComplete="name"
            maxLength={40}
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? `${id}-error` : undefined}
            className={inputClass}
          />
          {error ? (
            <p id={`${id}-error`} className="text-sm font-medium text-save">
              {error}
            </p>
          ) : null}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${id}-phone`} className="text-sm font-semibold text-ink">
            Phone or MoMo number <span className="font-normal text-ink-muted">· Optional</span>
          </label>
          <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" autoComplete="tel" className={inputClass} />
        </div>
      </div>
      <p className="text-[0.8rem] text-ink-muted">
        Your name is remembered on this device and added to the links you share. Your number is only sent if you register on WhatsApp.
      </p>
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          value="register"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 text-[0.95rem] font-bold text-whatsapp-ink transition-colors hover:bg-whatsapp-hover"
        >
          <WhatsAppIcon className="size-5" />
          Save &amp; register on WhatsApp
        </button>
        <button
          type="submit"
          value="save"
          className="inline-flex h-12 items-center justify-center rounded-lg border border-ice-300 bg-white px-6 text-[0.95rem] font-bold text-ink transition-colors hover:border-royal-300 hover:text-royal-700"
        >
          Just save my name
        </button>
      </div>
      <p aria-live="polite" className="flex items-center gap-1.5 text-sm font-semibold text-gift">
        {saved || savedName ? (
          <>
            <Check className="size-4" aria-hidden="true" />
            Sharing as {savedName}. Tap &ldquo;Tap &amp; Earn&rdquo; on any item to share it.
          </>
        ) : null}
      </p>
    </form>
  );
}
