import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "light" | "dark";
  align?: "left" | "center";
  id?: string;
  className?: string;
  children?: ReactNode;
};

export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[0.7rem] font-medium uppercase tracking-[0.18em]",
        tone === "dark" ? "text-tide-300" : "text-tide-700",
      )}
    >
      <span aria-hidden="true" className={cn("h-px w-6", tone === "dark" ? "bg-tide-400/60" : "bg-tide-600/50")} />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "left",
  id,
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-4", align === "center" && "items-center text-center", className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className={cn(
          "max-w-3xl text-balance text-[2rem] font-semibold leading-[1.05] tracking-[-0.035em] sm:text-5xl lg:text-[3.5rem]",
          tone === "dark" ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-ink-300" : "text-ink-500",
          )}
        >
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
