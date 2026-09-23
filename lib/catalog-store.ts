import { useSyncExternalStore } from "react";
import type { CategoryId } from "@/types";

/**
 * Tiny shared store so category tiles elsewhere on the page can pre-select a
 * filter in the product catalog without lifting state into a client layout.
 */
export type CatalogCategory = CategoryId | "all";

let current: CatalogCategory = "all";
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setCatalogCategory(category: CatalogCategory) {
  current = category;
  listeners.forEach((listener) => listener());
}

export function useCatalogCategory(): CatalogCategory {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => "all",
  );
}
