import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "whatsapp" | "orange" | "outline" | "white" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.97]";

const variants: Record<Variant, string> = {
  primary: "bg-royal-600 text-white shadow-[0_6px_16px_-8px_rgb(12_109_226/0.7)] hover:bg-royal-700",
  whatsapp: "bg-whatsapp text-whatsapp-ink shadow-[0_6px_16px_-8px_rgb(37_211_102/0.8)] hover:bg-whatsapp-hover",
  orange: "bg-orange text-ink shadow-[0_6px_16px_-8px_rgb(245_120_0/0.8)] hover:bg-orange-strong",
  outline: "border border-ice-300 bg-white text-ink hover:border-royal-300 hover:text-royal-700",
  white: "bg-white text-royal-700 shadow-[0_6px_18px_-10px_rgb(3_26_61/0.6)] hover:bg-royal-50",
  ghost: "text-royal-700 hover:bg-royal-50",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.8rem]",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[0.95rem]",
};

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "children" | "href"> & {
  href: string;
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  /** Icon shown after the label; nudges on hover */
  trailingIcon?: ReactNode;
  children: ReactNode;
};

/** A link styled as a button. Internal links use next/link; external ones open in a new tab. */
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
  const classes = cn(base, variants[variant], sizes[size], className);
  const content = (
    <>
      {icon ? <span className="-ml-0.5 flex size-[1.15em] shrink-0 items-center justify-center [&>svg]:size-full">{icon}</span> : null}
      <span>{children}</span>
      {trailingIcon ? (
        <span className="-mr-1 flex size-[1.1em] shrink-0 items-center justify-center transition-transform duration-200 group-hover/btn:translate-x-0.5 [&>svg]:size-full">
          {trailingIcon}
        </span>
      ) : null}
    </>
  );

  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={classes} {...rest}>
      {content}
    </a>
  );
}
