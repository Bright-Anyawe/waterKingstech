import { ArrowRight, MapPin, Phone } from "lucide-react";
import { preload } from "react-dom";
import { HeroVideo } from "@/components/sections/HeroVideo";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { heroMedia } from "@/data/hero";
import { callHref, directionsHref, whatsappHref } from "@/lib/contact-links";

const offer = ["Phones", "Laptops", "Accessories", "Repairs"];

export function Hero() {
  // The poster is the first thing painted behind the headline — fetch it early.
  preload(heroMedia.poster, { as: "image", fetchPriority: "high" });

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink-950 pt-28 pb-24 text-white md:pb-16 lg:min-h-[max(40rem,88svh)] lg:justify-center lg:pt-32 lg:pb-20"
    >
      <HeroVideo />

      {/* Overlays keep the text legible over the moving footage */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-ink-950/25" />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-ink-950/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[72%] bg-linear-to-t from-ink-950 via-ink-950/85 to-transparent lg:h-2/5 lg:via-ink-950/40" />
        <div className="absolute inset-y-0 left-0 hidden w-[72%] bg-linear-to-r from-ink-950/90 via-ink-950/55 to-transparent lg:block" />
      </div>

      <div className="container-x">
        <div className="max-w-2xl">
          <p className="hero-in inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-ink-950/40 py-1.5 pr-4 pl-2 text-[0.8rem] text-ink-200 backdrop-blur-md [--i:0]">
            <span className="relative flex size-5 items-center justify-center rounded-full bg-tide-400/15">
              <span className="size-1.5 rounded-full bg-tide-400" />
            </span>
            <span className="flex flex-wrap items-center gap-x-1.5">
              {offer.map((item, index) => (
                <span key={item} className="flex items-center gap-1.5">
                  {index > 0 ? <span className="text-ink-500">•</span> : null}
                  {item}
                </span>
              ))}
            </span>
          </p>

          <h1
            id="hero-title"
            className="mt-7 text-[2.65rem] leading-[1.02] font-semibold tracking-[-0.045em] sm:text-6xl lg:text-[4.1rem] xl:text-[4.75rem]"
          >
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="hero-line [--i:1]">Your Next Device.</span>
            </span>
            <span className="block overflow-hidden pb-[0.08em]">
              <span className="hero-line bg-linear-to-r from-ink-200 via-tide-200 to-tide-400 bg-clip-text text-transparent [--i:2]">
                Your Trusted Tech Partner.
              </span>
            </span>
          </h1>

          <p className="hero-in mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-200 sm:text-lg [--i:3]">
            Shop quality smartphones, laptops and accessories, or get professional device repairs from{" "}
            {business.name} — your one-stop tech destination in {business.location.city}.
          </p>

          <div className="hero-in mt-9 flex flex-col gap-3 sm:flex-row [--i:4]">
            <ButtonLink href="#catalog" variant="light" size="lg" trailingIcon={<ArrowRight />}>
              Shop Products
            </ButtonLink>
            <ButtonLink href={whatsappHref()} variant="whatsapp" size="lg" icon={<WhatsAppIcon />}>
              WhatsApp Us
            </ButtonLink>
          </div>

          <div className="hero-in mt-6 flex items-center gap-1 text-sm [--i:5]">
            <ButtonLink href={callHref} variant="ghost-light" className="h-10 px-3" icon={<Phone aria-hidden="true" />}>
              Call Now
            </ButtonLink>
            <span aria-hidden="true" className="h-4 w-px bg-white/15" />
            <ButtonLink
              href={directionsHref}
              variant="ghost-light"
              className="h-10 px-3"
              icon={<MapPin aria-hidden="true" />}
            >
              Get Directions
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
