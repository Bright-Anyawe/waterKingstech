import { Quote, Star } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import { Pending } from "@/components/ui/Pending";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/cn";
import { whatsappHref, whatsappMessages } from "@/lib/contact-links";
import type { Testimonial } from "@/types";

export function Testimonials() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="overflow-hidden bg-white pb-20 sm:pb-28">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="reviews-title"
            eyebrow="Customer reviews"
            title="What Our Customers Say"
            description="Honest words from people who've bought devices and had repairs done with us."
          />
          <ButtonLink
            href={whatsappHref(whatsappMessages.review)}
            variant="outline-dark"
            icon={<WhatsAppIcon className="text-[#1da851]" />}
            className="self-start lg:self-end"
          >
            Share your experience
          </ButtonLink>
        </div>

        {/* Swipeable on phones, grid on larger screens */}
        <RevealGroup
          stagger={0.1}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3 lg:gap-5 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((testimonial) => (
            <RevealItem key={testimonial.id} className="w-[85%] shrink-0 snap-center sm:w-auto">
              <TestimonialCard testimonial={testimonial} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { isPlaceholder } = testimonial;

  return (
    <figure
      className={cn(
        "relative flex h-full flex-col rounded-3xl border p-6 sm:p-7",
        isPlaceholder ? "border-dashed border-ink-200 bg-mist/60" : "border-line bg-mist",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <Quote className="size-7 text-tide-600/60" aria-hidden="true" />
        {isPlaceholder ? <Pending>Placeholder review</Pending> : null}
      </div>

      {testimonial.rating ? (
        <div className="mt-5 flex gap-0.5" role="img" aria-label={`Rated ${testimonial.rating} out of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              aria-hidden="true"
              className={cn("size-4", i < testimonial.rating! ? "fill-amber-400 text-amber-400" : "text-ink-200")}
            />
          ))}
        </div>
      ) : null}

      <blockquote
        className={cn(
          "mt-5 flex-1 text-pretty text-[1.05rem] leading-relaxed tracking-[-0.01em]",
          isPlaceholder ? "text-ink-400 italic" : "text-ink-800",
        )}
      >
        <p>{testimonial.quote}</p>
      </blockquote>

      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        {testimonial.photo ? (
          <Image
            src={testimonial.photo.src}
            alt={testimonial.photo.alt}
            width={44}
            height={44}
            className="size-11 rounded-full object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-11 items-center justify-center rounded-full bg-white font-semibold text-ink-400 ring-1 ring-line"
          >
            {testimonial.name.charAt(0)}
          </span>
        )}
        <span className="leading-tight">
          <span className={cn("block font-semibold", isPlaceholder ? "text-ink-400" : "text-ink-950")}>
            {testimonial.name}
          </span>
          {testimonial.context ? <span className="mt-0.5 block text-sm text-ink-500">{testimonial.context}</span> : null}
        </span>
      </figcaption>
    </figure>
  );
}
