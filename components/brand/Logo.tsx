import Image from "next/image";
import { business } from "@/data/business";
import { cn } from "@/lib/cn";
import logoMark from "@/public/brand/logo-mark.png";
import logoWordmark from "@/public/brand/logo-wordmark.png";

/**
 * The official WaterKingsTech logo. The crown/laptop/wave mark and the
 * "WATER KINGS" wordmark are cut from the client's logo file
 * (public/brand/logo-original.png). In that file "TECH" and the tagline are
 * white on white, so they are set here as live text in the logo's style.
 */
function TechRule({ size }: { size: "sm" | "lg" }) {
  return (
    <span aria-hidden="true" className={cn("flex w-full items-center", size === "sm" ? "gap-1.5" : "gap-3")}>
      <span className="h-[2px] flex-1 rounded-full bg-linear-to-r from-transparent via-cyan to-royal-600" />
      <span
        className={cn(
          "font-display font-semibold text-royal-600 uppercase",
          size === "sm" ? "text-[0.5rem] leading-none tracking-[0.55em] [margin-right:-0.55em]" : "text-sm tracking-[0.6em] [margin-right:-0.6em]",
        )}
      >
        Tech
      </span>
      <span className="h-[2px] flex-1 rounded-full bg-linear-to-l from-transparent via-cyan to-royal-600" />
    </span>
  );
}

/** Horizontal lockup for the header and compact spaces. */
export function Logo({ className, priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <Image src={logoMark} alt="" priority={priority} sizes="64px" className="h-8 w-auto sm:h-10" />
      <span className="flex flex-col items-stretch gap-[3px]">
        <Image src={logoWordmark} alt="" priority={priority} sizes="160px" className="h-[12px] w-auto sm:h-[15px]" />
        <TechRule size="sm" />
      </span>
      <span className="sr-only">{business.name}</span>
    </span>
  );
}

/** Stacked lockup with the logo tagline, as on the original artwork. */
export function LogoStacked({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex w-64 flex-col items-center", className)}>
      <Image src={logoMark} alt="" sizes="160px" className="h-24 w-auto" />
      <Image src={logoWordmark} alt="" sizes="260px" className="mt-3 h-auto w-full" />
      <span className="mt-2 w-full">
        <TechRule size="lg" />
      </span>
      <span className="mt-2 text-center text-[0.8rem] text-ink-soft">{business.logoTagline}</span>
      <span className="sr-only">{business.name}</span>
    </span>
  );
}
