"use client";

import { ChevronDown, Mail } from "lucide-react";
import { useEffect, useId, useState, type FormEvent, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { conditionLabel, swap } from "@/data/offers";
import { getProduct } from "@/data/products";
import { cn } from "@/lib/cn";
import { emailHref, productTitle, whatsappHref, withReferrer } from "@/lib/contact-links";
import { useReferrer } from "@/lib/referral";

type Errors = Partial<Record<"model" | "condition", string>>;

const inputClass =
  "h-11 w-full rounded-lg border border-ice-300 bg-white px-3.5 text-[0.95rem] text-ink outline-none transition-[border-color,box-shadow] focus:border-royal-600 focus:ring-4 focus:ring-royal-600/15 aria-[invalid=true]:border-save";

/**
 * Swap (trade-in) request. Like the quote form there is no server: the
 * details become a ready-to-send WhatsApp message or email.
 */
export function SwapForm() {
  const id = useId();
  const referrer = useReferrer();
  const [errors, setErrors] = useState<Errors>({});
  const [want, setWant] = useState("");
  const [sentVia, setSentVia] = useState<"whatsapp" | "email" | null>(null);
  const mailAvailable = emailHref() !== null;

  // "Swap your device for this" links pass the wanted product as ?want=<id>.
  useEffect(() => {
    const wanted = getProduct(new URLSearchParams(window.location.search).get("want") ?? "");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time prefill from the URL after mount
    if (wanted) setWant(`${productTitle(wanted)} (${conditionLabel[wanted.condition]})`);
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel = submitter?.value === "email" ? "email" : "whatsapp";
    const form = event.currentTarget;
    const data = new FormData(form);

    const deviceType = String(data.get("deviceType") ?? "");
    const model = String(data.get("model") ?? "").trim();
    const condition = String(data.get("condition") ?? "");
    const faults = String(data.get("faults") ?? "").trim();
    const wanted = String(data.get("want") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();

    const nextErrors: Errors = {};
    if (!model) nextErrors.model = "Enter the brand and model of your device.";
    if (!condition) nextErrors.condition = "Choose the condition of your device.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      form.querySelector<HTMLElement>(`[name="${nextErrors.model ? "model" : "condition"}"]`)?.focus();
      return;
    }

    const message = withReferrer(
      [
        `Hello ${business.name}, I'd like to swap my device.`,
        "",
        `My device: ${deviceType} — ${model}`,
        `Condition: ${condition}`,
        ...(faults ? [`Faults: ${faults}`] : []),
        `I want: ${wanted || "Not sure yet — please advise"}`,
        ...(name ? [`Name: ${name}`] : []),
        "",
        "How much would I need to add?",
      ].join("\n"),
      referrer,
    );

    if (channel === "email") {
      const href = emailHref(`Swap request — ${model}`, message);
      if (href) window.location.href = href;
    } else {
      window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    }
    setSentVia(channel);
  };

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-4">
      <fieldset className="flex flex-col gap-4">
        <legend className="font-display text-base font-bold text-ink">Your device</legend>
        <div className="grid gap-4 sm:grid-cols-[10rem_1fr]">
          <Field label="Type" htmlFor={`${id}-type`}>
            <Select id={`${id}-type`} name="deviceType" defaultValue={swap.deviceTypes[0]}>
              {swap.deviceTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </Select>
          </Field>
          <Field label="Brand & model" htmlFor={`${id}-model`} error={errors.model} errorId={`${id}-model-error`} required>
            <input
              id={`${id}-model`}
              name="model"
              placeholder="e.g. iPhone 12 Pro 128GB"
              aria-invalid={errors.model ? true : undefined}
              aria-describedby={errors.model ? `${id}-model-error` : undefined}
              className={inputClass}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Condition" htmlFor={`${id}-condition`} error={errors.condition} errorId={`${id}-condition-error`} required>
            <Select
              id={`${id}-condition`}
              name="condition"
              defaultValue=""
              invalid={Boolean(errors.condition)}
              describedBy={errors.condition ? `${id}-condition-error` : undefined}
            >
              <option value="" disabled>
                Choose…
              </option>
              {swap.conditions.map((condition) => (
                <option key={condition}>{condition}</option>
              ))}
            </Select>
          </Field>
          <Field label="Any faults?" htmlFor={`${id}-faults`} hint="Optional">
            <input id={`${id}-faults`} name="faults" placeholder="e.g. battery drains fast" className={inputClass} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-4 border-t border-ice-200 pt-4">
        <legend className="sr-only">What you want</legend>
        <Field label="What do you want in exchange?" htmlFor={`${id}-want`} hint="Optional">
          <input
            id={`${id}-want`}
            name="want"
            value={want}
            onChange={(event) => setWant(event.target.value)}
            placeholder="e.g. iPhone 15 Pro, or a laptop for school"
            className={inputClass}
          />
        </Field>
        <Field label="Your name" htmlFor={`${id}-name`} hint="Optional">
          <input id={`${id}-name`} name="name" autoComplete="name" className={inputClass} />
        </Field>
      </fieldset>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          value="whatsapp"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 text-[0.95rem] font-bold text-whatsapp-ink shadow-[0_6px_16px_-8px_rgb(37_211_102/0.8)] transition-colors hover:bg-whatsapp-hover"
        >
          <WhatsAppIcon className="size-5" />
          Send swap request
        </button>
        {mailAvailable ? (
          <button
            type="submit"
            value="email"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-ice-300 bg-white px-6 text-[0.95rem] font-bold text-ink transition-colors hover:border-royal-300 hover:text-royal-700"
          >
            <Mail className="size-5" aria-hidden="true" />
            Send by email
          </button>
        ) : null}
      </div>
      <p className="text-[0.8rem] text-ink-muted">
        Your request opens in {mailAvailable ? "WhatsApp or your email app" : "WhatsApp"}, ready to send — nothing is sent until you press send
        there.
      </p>
      <p aria-live="polite" className="text-sm font-semibold text-gift">
        {sentVia === "whatsapp" ? "WhatsApp opened with your swap request — press send to deliver it." : null}
        {sentVia === "email" ? "Your email app opened with your swap request — press send to deliver it." : null}
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  hint,
  error,
  errorId,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  hint?: string;
  error?: string;
  errorId?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-semibold text-ink">
        {label} {required ? <span className="text-save">*</span> : null}
        {hint ? <span className="ml-1 font-normal text-ink-muted">· {hint}</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-sm font-medium text-save">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function Select({
  id,
  name,
  defaultValue,
  invalid,
  describedBy,
  children,
}: {
  id: string;
  name: string;
  defaultValue?: string;
  invalid?: boolean;
  describedBy?: string;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={invalid ? true : undefined}
        aria-describedby={describedBy}
        className={cn(inputClass, "cursor-pointer appearance-none pr-10")}
      >
        {children}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-muted" />
    </div>
  );
}
