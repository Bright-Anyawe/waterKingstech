import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "light" | "whatsapp" | "outline-dark" | "outline-light" | "ghost-dark" | "ghost-light";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-[var(--ease-premium)] active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Dark button for light backgrounds
  primary: "bg-ink-950 text-white shadow-[0_1px_0_rgb(255_255_255/0.08)_inset,0_8px_24px_-12px_rgb(7_9_12/0.6)] hover:bg-ink-800",
  // Light button for dark backgrounds
  light: "bg-white text-ink-950 shadow-[0_8px_30px_-12px_rgb(255_255_255/0.35)] hover:bg-tide-200",
  whatsapp:
    "bg-whatsapp text-whatsapp-ink shadow-[0_10px_30px_-12px_rgb(37_211_102/0.7)] hover:bg-whatsapp-hover",
  "outline-dark": "border border-line bg-white text-ink-950 hover:border-ink-300 hover:bg-mist",
  "outline-light": "border border-white/15 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/10",
  "ghost-dark": "text-ink-700 hover:bg-ink-950/5 hover:text-ink-950",
  "ghost-light": "text-ink-200 hover:bg-white/10 hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem] sm:h-13 sm:px-7",
};

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "children"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  /** Icon shown after the label; nudges on hover */
  trailingIcon?: ReactNode;
  children: ReactNode;
};

/** A link styled as a button. External links open in a new tab. */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  icon,
  trailingIcon,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(base, variants[variant], sizes[size], className)}
      {...rest}
    >
      {icon ? <span className="-ml-0.5 flex size-[1.15em] shrink-0 items-center justify-center [&>svg]:size-full">{icon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? (
        <span className="-mr-1 flex size-[1.1em] shrink-0 items-center justify-center transition-transform duration-300 ease-[var(--ease-premium)] group-hover/btn:translate-x-0.5 [&>svg]:size-full">
          {trailingIcon}
        </span>
      ) : null}
    </a>
  );
}
