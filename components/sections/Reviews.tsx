import { BadgeCheck, Quote, Star } from "lucide-react";
import Image from "next/image";
import { Pending } from "@/components/ui/Pending";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/cn";
import type { Testimonial } from "@/types";

/** Customer reviews. Placeholders stay visibly marked until real reviews are supplied. */
export function Reviews({ className }: { className?: string }) {
  return (
    <ul className={cn("no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0", className)}>
      {testimonials.map((testimonial) => (
        <li key={testimonial.id} className="w-[82%] shrink-0 snap-start sm:w-auto">
          <ReviewCard testimonial={testimonial} />
        </li>
      ))}
    </ul>
  );
}

function ReviewCard({ testimonial }: { testimonial: Testimonial }) {
  const { isPlaceholder } = testimonial;

  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-xl border bg-white p-5",
        isPlaceholder ? "border-dashed border-ice-300" : "border-ice-200",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {testimonial.rating ? (
          <div className="flex gap-0.5" role="img" aria-label={`Rated ${testimonial.rating} out of 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                aria-hidden="true"
                className={cn("size-4", i < testimonial.rating! ? "fill-orange text-orange" : "text-ice-300")}
              />
            ))}
          </div>
        ) : (
          <Quote className="size-6 text-royal-200" aria-hidden="true" />
        )}
        {isPlaceholder ? <Pending>Placeholder review</Pending> : null}
      </div>

      <blockquote className={cn("mt-3 flex-1 text-[0.95rem] leading-relaxed", isPlaceholder ? "text-ink-muted italic" : "text-ink")}>
        <p>{testimonial.quote}</p>
      </blockquote>

      <figcaption className="mt-4 flex items-center gap-3 border-t border-ice-200 pt-4">
        {testimonial.photo ? (
          <Image src={testimonial.photo.src} alt={testimonial.photo.alt} width={40} height={40} className="size-10 rounded-full object-cover" />
        ) : (
          <span aria-hidden="true" className="flex size-10 items-center justify-center rounded-full bg-royal-50 font-bold text-royal-600">
            {testimonial.name.charAt(0)}
          </span>
        )}
        <span className="leading-tight">
          <span className={cn("flex items-center gap-1 font-semibold", isPlaceholder ? "text-ink-muted" : "text-ink")}>
            {testimonial.name}
            {!isPlaceholder ? <BadgeCheck className="size-4 text-royal-600" aria-label="Verified customer" /> : null}
          </span>
          {testimonial.context ? <span className="mt-0.5 block text-[0.8rem] text-ink-muted">{testimonial.context}</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}
