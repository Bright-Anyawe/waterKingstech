"use client";

import { ChevronDown, Mail } from "lucide-react";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { corporate } from "@/data/corporate";
import { cn } from "@/lib/cn";
import { emailHref, whatsappHref } from "@/lib/contact-links";

type Channel = "whatsapp" | "email";

type Errors = Partial<Record<"organisation" | "contactName" | "needs", string>>;

const inputClass =
  "h-11 w-full rounded-lg border border-ice-300 bg-white px-3.5 text-[0.95rem] text-ink outline-none transition-[border-color,box-shadow] focus:border-royal-600 focus:ring-4 focus:ring-royal-600/15 aria-[invalid=true]:border-save";

/**
 * Bulk quote request. There is no server: the details are turned into a
 * ready-to-send WhatsApp message or email to the shop.
 */
export function QuoteForm() {
  const id = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [sentVia, setSentVia] = useState<Channel | null>(null);
  const mailAvailable = emailHref() !== null;

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const submitter = (event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const channel: Channel = submitter?.value === "email" ? "email" : "whatsapp";
    const data = new FormData(event.currentTarget);

    const organisation = String(data.get("organisation") ?? "").trim();
    const orgType = String(data.get("orgType") ?? "");
    const contactName = String(data.get("contactName") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const quantity = String(data.get("quantity") ?? "").trim();
    const needs = data.getAll("needs").map(String);
    const documents = data.getAll("documents").map(String);
    const details = String(data.get("details") ?? "").trim();

    const nextErrors: Errors = {};
    if (!organisation) nextErrors.organisation = "Enter your organisation's name.";
    if (!contactName) nextErrors.contactName = "Enter the name of the person we should contact.";
    if (needs.length === 0) nextErrors.needs = "Choose at least one thing you need.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      // Errors render on the next paint, so focus the first invalid field by name.
      const firstInvalid = nextErrors.organisation ? "organisation" : nextErrors.contactName ? "contactName" : "needs";
      event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const lines = [
      `Hello ${business.name}, I'd like a corporate (bulk) quotation.`,
      "",
      `Organisation: ${organisation}${orgType ? ` (${orgType})` : ""}`,
      `Contact: ${contactName}${phone ? `, ${phone}` : ""}`,
      `We need: ${needs.join(", ")}`,
      ...(quantity ? [`Approximate quantity: ${quantity}`] : []),
      ...(documents.length ? [`Documents: ${documents.join(", ")}`] : []),
      ...(details ? ["", `Details: ${details}`] : []),
    ];
    const message = lines.join("\n");

    if (channel === "email") {
      const href = emailHref(`Bulk quotation request — ${organisation}`, message);
      if (href) window.location.href = href;
    } else {
      window.open(whatsappHref(message), "_blank", "noopener,noreferrer");
    }
    setSentVia(channel);
  };

  return (
    <form noValidate onSubmit={submit} className="flex flex-col gap-4" aria-describedby={`${id}-note`}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Organisation name" htmlFor={`${id}-org`} error={errors.organisation} errorId={`${id}-org-error`} required>
          <input
            id={`${id}-org`}
            name="organisation"
            autoComplete="organization"
            aria-invalid={errors.organisation ? true : undefined}
            aria-describedby={errors.organisation ? `${id}-org-error` : undefined}
            className={inputClass}
          />
        </Field>
        <Field label="Type of organisation" htmlFor={`${id}-type`}>
          <div className="relative">
            <select id={`${id}-type`} name="orgType" defaultValue="" className={cn(inputClass, "cursor-pointer appearance-none pr-10")}>
            <option value="">Choose…</option>
            {corporate.organisationTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
            </select>
            <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-muted" />
          </div>
        </Field>
        <Field label="Contact person" htmlFor={`${id}-name`} error={errors.contactName} errorId={`${id}-name-error`} required>
          <input
            id={`${id}-name`}
            name="contactName"
            autoComplete="name"
            aria-invalid={errors.contactName ? true : undefined}
            aria-describedby={errors.contactName ? `${id}-name-error` : undefined}
            className={inputClass}
          />
        </Field>
        <Field label="Phone or WhatsApp number" htmlFor={`${id}-phone`} hint="Optional">
          <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" inputMode="tel" className={inputClass} />
        </Field>
      </div>

      <fieldset aria-describedby={errors.needs ? `${id}-needs-error` : undefined}>
        <legend className="text-sm font-semibold text-ink">
          What do you need? <span className="text-save">*</span>
        </legend>
        <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {corporate.needs.map((need) => (
            <CheckTile key={need} name="needs" value={need} invalid={Boolean(errors.needs)}>
              {need}
            </CheckTile>
          ))}
        </div>
        {errors.needs ? (
          <p id={`${id}-needs-error`} className="mt-1.5 text-sm font-medium text-save">
            {errors.needs}
          </p>
        ) : null}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-[12rem_1fr]">
        <Field label="Quantity" htmlFor={`${id}-qty`} hint="Optional">
          <input id={`${id}-qty`} name="quantity" inputMode="numeric" placeholder="e.g. 25 laptops" className={inputClass} />
        </Field>
        <fieldset>
          <legend className="text-sm font-semibold text-ink">Documents you need</legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {corporate.documents.map((doc) => (
              <CheckTile key={doc} name="documents" value={doc} defaultChecked>
                {doc}
              </CheckTile>
            ))}
          </div>
        </fieldset>
      </div>

      <Field label="Details" htmlFor={`${id}-details`} hint="Models, specs, budget or deadline — anything that helps us quote">
        <textarea id={`${id}-details`} name="details" rows={4} className={cn(inputClass, "h-auto py-3")} />
      </Field>

      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          value="whatsapp"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-whatsapp px-6 text-[0.95rem] font-bold text-whatsapp-ink shadow-[0_6px_16px_-8px_rgb(37_211_102/0.8)] transition-colors hover:bg-whatsapp-hover"
        >
          <WhatsAppIcon className="size-5" />
          Send on WhatsApp
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

      <p id={`${id}-note`} className="text-[0.8rem] text-ink-muted">
        Your request opens in {mailAvailable ? "WhatsApp or your email app" : "WhatsApp"}, ready to send — nothing is sent until you
        press send there.
      </p>
      <p aria-live="polite" className="text-sm font-semibold text-gift">
        {sentVia === "whatsapp" ? "WhatsApp opened with your request — press send to deliver it." : null}
        {sentVia === "email" ? "Your email app opened with your request — press send to deliver it." : null}
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

function CheckTile({
  name,
  value,
  defaultChecked,
  invalid,
  children,
}: {
  name: string;
  value: string;
  defaultChecked?: boolean;
  invalid?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      className={cn(
        "flex h-11 cursor-pointer items-center gap-2.5 rounded-lg border bg-white px-3 text-sm font-medium text-ink-soft transition-colors has-[:checked]:border-royal-600 has-[:checked]:bg-royal-50 has-[:checked]:text-royal-800 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-royal-600",
        invalid ? "border-save/60" : "border-ice-300 hover:border-royal-300",
      )}
    >
      <input type="checkbox" name={name} value={value} defaultChecked={defaultChecked} className="size-4 accent-royal-600" />
      {children}
    </label>
  );
}
