"use client";

import type { ReactNode } from "react";
import { whatsappHref, withReferrer } from "@/lib/contact-links";
import { useReferrer } from "@/lib/referral";

/**
 * WhatsApp link for buying. If the visitor came through a Tap & Earn link,
 * the sharer's name is added to the message so the shop can credit them.
 */
export function WhatsAppBuyLink({
  message,
  className,
  ariaLabel,
  children,
}: {
  message: string;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
}) {
  const referrer = useReferrer();
  return (
    <a
      href={whatsappHref(withReferrer(message, referrer))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={className}
    >
      {children}
    </a>
  );
}
