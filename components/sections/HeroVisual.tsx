"use client";

import { CalendarClock, Wrench } from "lucide-react";
import { m, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";
import { unsplash } from "@/lib/images";

const phone = {
  src: unsplash("1716882173326-04d822f142a8", 1600),
  alt: "Close-up of a titanium iPhone Pro camera system on a dark background",
};

const laptop = {
  src: unsplash("1542393545-10f5cde2c810", 1400),
  alt: "Open MacBook Pro glowing on a dark desk",
};

/**
 * Hero image composition. Images render server-side as normal <img> tags —
 * only the gentle scroll parallax needs JavaScript.
 */
export function HeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const range = reduceMotion ? [0, 0] : [0, 1];
  const yMain = useTransform(scrollYProgress, range, [0, -40]);
  const ySecondary = useTransform(scrollYProgress, range, [0, 50]);
  const yChip = useTransform(scrollYProgress, range, [0, -80]);

  return (
    <div ref={ref} className="relative mx-auto aspect-[5/5.4] w-full max-w-[34rem] sm:aspect-[5/4.6] lg:aspect-[5/5.6] lg:max-w-none">
      {/* Main: phone */}
      <m.div
        style={{ y: yMain }}
        className="hero-fade absolute top-0 right-0 h-[86%] w-[80%] overflow-hidden rounded-[2rem] bg-ink-800 shadow-[0_40px_120px_-40px_rgb(18_181_214/0.45)] ring-1 ring-white/10 [--i:1]"
      >
        <Image
          src={phone.src}
          alt={phone.alt}
          fill
          preload
          quality={85}
          sizes="(min-width: 1280px) 520px, (min-width: 1024px) 40vw, 80vw"
          className="object-cover object-[50%_40%]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink-950/70 via-transparent to-transparent" />
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/10 ring-inset" />
      </m.div>

      {/* Secondary: laptop */}
      <m.div
        style={{ y: ySecondary }}
        className="hero-fade absolute bottom-0 left-0 aspect-[4/3] w-[54%] overflow-hidden rounded-3xl bg-ink-800 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.9)] ring-1 ring-white/15 [--i:3]"
      >
        <Image
          src={laptop.src}
          alt={laptop.alt}
          fill
          quality={85}
          sizes="(min-width: 1024px) 24vw, 50vw"
          className="object-cover"
        />
        <div className="absolute inset-0 rounded-3xl ring-1 ring-white/10 ring-inset" />
      </m.div>

      {/* Glass chips */}
      <m.div
        style={{ y: yChip }}
        className="hero-fade absolute top-[9%] left-0 flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/60 py-2.5 pr-4 pl-2.5 shadow-2xl backdrop-blur-xl [--i:4] sm:top-[12%]"
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-tide-400/15 text-tide-300">
          <Wrench className="size-4.5" aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-medium text-white">Professional repairs</span>
          <span className="block text-xs text-ink-300">Screens · Batteries · Boards</span>
        </span>
      </m.div>

      <m.div
        style={{ y: yMain }}
        className="hero-fade absolute right-[4%] bottom-[20%] hidden items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/60 py-2.5 pr-4 pl-2.5 shadow-2xl backdrop-blur-xl [--i:5] sm:flex"
      >
        <span className="flex size-9 items-center justify-center rounded-xl bg-whatsapp/15 text-whatsapp">
          <CalendarClock className="size-4.5" aria-hidden="true" />
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-medium text-white">Installment options</span>
          <span className="block text-xs text-ink-300">Ask us on WhatsApp</span>
        </span>
      </m.div>
    </div>
  );
}
