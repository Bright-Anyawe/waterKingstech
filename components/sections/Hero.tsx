import { ArrowRight, MapPin, Phone } from "lucide-react";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { callHref, directionsHref, whatsappHref } from "@/lib/contact-links";

const offer = ["Phones", "Laptops", "Accessories", "Repairs"];

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-ink-950 pt-28 pb-14 text-white sm:pt-32 lg:pt-40 lg:pb-24"
    >
      {/* Atmosphere: soft tide glow + faint grid fading out */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 right-[-10%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(18_181_214/0.22),transparent)] blur-2xl" />
        <div className="absolute bottom-[-30%] left-[-15%] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(closest-side,rgb(61_209_236/0.08),transparent)] blur-2xl" />
        <div className="absolute inset-0 bg-grid-dark [mask-image:radial-gradient(70%_60%_at_60%_30%,black,transparent)]" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.02fr_1fr] lg:gap-10 xl:gap-16">
        <div className="max-w-2xl">
          <p className="hero-in inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pr-4 pl-2 text-[0.8rem] text-ink-200 backdrop-blur [--i:0]">
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

          <p className="hero-in mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-300 sm:text-lg [--i:3]">
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

        <HeroVisual />
      </div>
    </section>
  );
}
