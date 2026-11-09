"use client";

import { useSyncExternalStore } from "react";

/* -------------------------------------------------------------------------- */
/*  Tap & Earn — kept in this browser only (localStorage)                     */
/*                                                                            */
/*  - referrer: the name in a shared link (?ref=Kofi). When this visitor      */
/*    buys, "Referred by: Kofi" is added to their WhatsApp message so the     */
/*    shop can credit the commission.                                         */
/*  - sharer: this visitor's own Tap & Earn name, put into the links they     */
/*    share.                                                                  */
/*  Storage can be unavailable (private mode, blocked site data): every       */
/*  access is wrapped and the site works without it.                          */
/* -------------------------------------------------------------------------- */

const REFERRER_KEY = "wkt:referrer";
const SHARER_KEY = "wkt:sharer";
const CHANGE_EVENT = "wkt:referral-change";

/** Trims, collapses spaces, drops control characters and caps the length. */
export function cleanName(value: string): string {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 40);
}

function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function write(key: string, value: string | null) {
  try {
    if (value) window.localStorage.setItem(key, value);
    else window.localStorage.removeItem(key);
  } catch {
    // Storage unavailable — the value simply isn't remembered.
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function setReferrer(name: string | null) {
  write(REFERRER_KEY, name ? cleanName(name) || null : null);
}

export function setSharerName(name: string | null) {
  write(SHARER_KEY, name ? cleanName(name) || null : null);
}

/** Name of the person who shared the link this visitor arrived from, if any. */
export function useReferrer(): string | null {
  return useSyncExternalStore(subscribe, () => read(REFERRER_KEY), () => null);
}

/** This visitor's own Tap & Earn name, if they have set one. */
export function useSharerName(): string | null {
  return useSyncExternalStore(subscribe, () => read(SHARER_KEY), () => null);
}
