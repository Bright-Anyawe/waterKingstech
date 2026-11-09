"use client";

import { useEffect } from "react";
import { setReferrer } from "@/lib/referral";

/**
 * Remembers the Tap & Earn sharer when a visitor arrives through a shared
 * link (…?ref=Kofi), so their WhatsApp order credits that person.
 */
export function ReferralCapture() {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) setReferrer(ref);
  }, []);
  return null;
}
