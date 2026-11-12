import { BadgeCheck, ExternalLink, Quote, ShieldCheck, Star, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { warranty } from "@/data/offers";
import { ratingSummary, reviewLinks, testimonials, verifiedReviews } from "@/data/testimonials";
import { cn } from "@/lib/cn";
import { whatsappHref, whatsappMessages, whatsappNumbersDisplay } from "@/lib/contact-links";
import type { ReviewVerification, Testimonial } from "@/types";

const verificationNote: Record<ReviewVerification, string> = {
  "whatsapp-order": "Matched to their WhatsApp order",
  "shop-receipt": "Matched to their shop receipt",
  google: "Posted on Google",
};

const monthFormat = new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric", timeZone: "UTC" });

/** "2026-11" → "Nov 2026" */
function formatMonth(value: string): string {
  const [year, month] = value.split("-").map(Number);
  if (!year || !month) return value;
  return monthFormat.format(new Date(Date.UTC(year, month - 1, 1)));
}

/**
 * Customer reviews. Only genuine reviews are ever shown; the green Verified buyer
 * badge appears only on reviews matched to a real order. With no reviews yet,
 * an honest panel explains the policy and invites the first ones.
 */
export function Reviews({ className }: { className?: string }) {
  return testimonials.length > 0 ? <ReviewList className={className} /> : <NoReviewsYet className={className} />;
}

/* --------------------------------- Reviews --------------------------------- */

function ReviewList({ className }: { className?: string }) {
  const rating = ratingSummary();
  // Verified reviews lead; unverified ones (if any) follow without the badge.
  const ordered = [...testimonials].sort((a, b) => Number(Boolean(b.verification)) - Number(Boolean(a.verification)));

  return (
    <div className={className}>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-ice-200 bg-white px-4 py-3">
        {rating ? (
          <p className="flex items-center gap-2">
            <Stars value={rating.average} />
            <span className="font-display text-lg font-extrabold text-ink tabular-nums">{rating.average.toFixed(1)}</span>
            <span className="text-[0.8rem] text-ink-muted">
              from {rating.count} verified {rating.count === 1 ? "rating" : "ratings"}
            </span>
          </p>
        ) : null}
        {verifiedReviews.length > 0 ? (
          <p className="flex items-center gap-1.5 text-[0.85rem] font-semibold text-gift">
            <BadgeCheck className="size-4" aria-hidden="true" />
            {verifiedReviews.length} verified {verifiedReviews.length === 1 ? "review" : "reviews"}
          </p>
        ) : null}
        <HowWeVerify className="sm:ml-auto" />
      </div>

      <ul className="no-scrollbar -mx-4 mt-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {ordered.map((testimonial) => (
          <li key={testimonial.id} className="w-[84%] shrink-0 snap-start sm:w-auto">
            <ReviewCard testimonial={testimonial} />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <LeaveReviewButton />
        {reviewLinks.read ? (
          <ButtonLink href={reviewLinks.read} variant="outline" trailingIcon={<ExternalLink />}>
            Read all reviews on Google
          </ButtonLink>
        ) : null}
      </div>
    </div>
  );
}

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  const { verification } = testimonial;
  const meta = [testimonial.context, testimonial.location].filter(Boolean).join(" · ");

  return (
    <figure className="flex h-full flex-col rounded-xl border border-ice-200 bg-white p-4 sm:p-5">
      <div className="flex min-h-5 items-center justify-between gap-3">
        {testimonial.rating ? <Stars value={testimonial.rating} /> : <Quote className="size-5 text-royal-200" aria-hidden="true" />}
        {testimonial.date ? (
          <time dateTime={testimonial.date} className="text-[0.75rem] text-ink-muted">
            {formatMonth(testimonial.date)}
          </time>
        ) : null}
      </div>

      <blockquote className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink">
        <p>&ldquo;{testimonial.quote}&rdquo;</p>
      </blockquote>

      <figcaption className="mt-4 border-t border-ice-200 pt-4">
        <div className="flex items-center gap-3">
          {testimonial.photo ? (
            <Image
              src={testimonial.photo.src}
              alt={testimonial.photo.alt}
              width={40}
              height={40}
              className="size-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <span aria-hidden="true" className="flex size-10 shrink-0 items-center justify-center rounded-full bg-royal-50 font-bold text-royal-600">
              {testimonial.name.charAt(0)}
            </span>
          )}
          <span className="min-w-0 leading-tight">
            <span className="block font-semibold text-ink">{testimonial.name}</span>
            {meta ? <span className="mt-0.5 block text-[0.8rem] text-ink-muted">{meta}</span> : null}
          </span>
        </div>

        {verification ? (
          <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1">
            <VerifiedChip />
            {verification.url ? (
              <a
                href={verification.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[0.75rem] text-royal-700 underline-offset-2 hover:underline"
              >
                {verificationNote[verification.method]}
                <ExternalLink className="size-3" aria-hidden="true" />
              </a>
            ) : (
              <span className="text-[0.75rem] text-ink-muted">{verificationNote[verification.method]}</span>
            )}
          </p>
        ) : null}
      </figcaption>
    </figure>
  );
}

/* ------------------------------- Empty state ------------------------------- */

function NoReviewsYet({ className }: { className?: string }) {
  const { address, landmark } = business.location;

  return (
    <div className={cn("overflow-hidden rounded-xl border border-ice-200 bg-white", className)}>
      <div className="grid lg:grid-cols-[1.4fr_1fr]">
        <div className="p-5 sm:p-7">
          <span className="flex size-11 items-center justify-center rounded-lg bg-gift-bg text-gift">
            <BadgeCheck className="size-6" aria-hidden="true" />
          </span>
          <h3 className="mt-4 font-display text-lg font-bold tracking-[-0.02em] text-balance text-ink sm:text-xl">
            Every review here will come from a verified customer
          </h3>
          <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-pretty text-ink-soft">
            Before a review goes up, we match it to the buyer&apos;s WhatsApp order or shop receipt. You&apos;ll only ever
            read what real customers said — never a review written by us.
          </p>
          <p className="mt-3">
            <Pending>First customer reviews to be added</Pending>
          </p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <LeaveReviewButton />
            {reviewLinks.write ? (
              <ButtonLink href={reviewLinks.write} variant="outline" trailingIcon={<ExternalLink />}>
                Review us on Google
              </ButtonLink>
            ) : null}
          </div>
        </div>

        <div className="border-t border-ice-200 bg-ice-100 p-5 sm:p-7 lg:border-t-0 lg:border-l">
          <h3 className="text-sm font-semibold text-ink">Check us out before you buy</h3>
          <ul className="mt-4 flex flex-col gap-4">
            <TrustPoint icon={<Store className="size-4" />}>
              See the device in person at{" "}
              <Link href="/visit" className="font-semibold text-royal-700 underline-offset-2 hover:underline">
                {address ?? landmark}
              </Link>
              {address ? ` — ${landmark}` : null}
            </TrustPoint>
            {warranty["uk-used"] ? (
              <TrustPoint icon={<ShieldCheck className="size-4" />}>
                {warranty["uk-used"].replace(/^./, (c) => c.toUpperCase())} on UK used devices
              </TrustPoint>
            ) : null}
            {whatsappNumbersDisplay ? (
              <TrustPoint icon={<WhatsAppIcon className="size-4" />}>
                Talk to the shop directly on WhatsApp: <span className="font-semibold whitespace-nowrap text-ink">{whatsappNumbersDisplay}</span>
              </TrustPoint>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Pieces ---------------------------------- */

function LeaveReviewButton() {
  return (
    <ButtonLink href={whatsappHref(whatsappMessages.review)} variant="whatsapp" icon={<WhatsAppIcon />}>
      Bought from us? Leave a review
    </ButtonLink>
  );
}

function VerifiedChip() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-gift-bg px-1.5 py-0.5 text-[0.7rem] leading-4 font-semibold whitespace-nowrap text-gift">
      <BadgeCheck className="size-3.5" aria-hidden="true" />
      Verified buyer
    </span>
  );
}

function HowWeVerify({ className }: { className?: string }) {
  return (
    <details className={cn("group text-[0.8rem]", className)}>
      <summary className="cursor-pointer list-none font-semibold text-royal-700 underline-offset-2 hover:underline [&::-webkit-details-marker]:hidden">
        How we verify reviews
      </summary>
      <p className="mt-2 max-w-md leading-relaxed text-ink-soft">
        The Verified buyer badge only appears once we&apos;ve matched a review to the customer&apos;s WhatsApp order, shop
        receipt or public Google review. We never write or edit reviews for customers.
      </p>
    </details>
  );
}

function Stars({ value }: { value: number }) {
  const filled = Math.round(value);
  return (
    <span className="flex gap-0.5" role="img" aria-label={`Rated ${value} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} aria-hidden="true" className={cn("size-4", i < filled ? "fill-royal-600 text-royal-600" : "text-ice-300")} />
      ))}
    </span>
  );
}

function TrustPoint({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex gap-3 text-[0.9rem] leading-snug text-ink-soft">
      <span aria-hidden="true" className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-white text-royal-600 ring-1 ring-ice-200">
        {icon}
      </span>
      <span className="pt-1.5">{children}</span>
    </li>
  );
}
