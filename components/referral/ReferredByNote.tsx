"use client";

import { Coins } from "lucide-react";
import { useReferrer } from "@/lib/referral";

/** Tells a visitor who arrived through a Tap & Earn link that the sharer will be credited. */
export function ReferredByNote({ className }: { className?: string }) {
  const referrer = useReferrer();
  if (!referrer) return null;
  return (
    <p className={className}>
      <span className="flex items-center gap-2 rounded-lg bg-orange/10 px-3 py-2 text-[0.82rem] text-ink-soft">
        <Coins className="size-4 shrink-0 text-orange-strong" aria-hidden="true" />
        <span>
          Referred by <span className="font-semibold text-ink">{referrer}</span> — your WhatsApp message will mention them.
        </span>
      </span>
    </p>
  );
}
