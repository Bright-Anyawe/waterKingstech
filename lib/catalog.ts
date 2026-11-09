import { getCategoryBySlug, getSubcategoryLabel } from "@/data/categories";
import { conditionLabel } from "@/data/offers";
import type { CategoryId, Condition, Product, SubcategoryId } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Listing filters — shared by every listing page and kept in the URL        */
/* -------------------------------------------------------------------------- */

export type SortKey = "recommended" | "deals" | "name";

export type ListingFilters = {
  q: string;
  category: CategoryId | null;
  condition: Condition | null;
  type: SubcategoryId | null;
  dealsOnly: boolean;
  sort: SortKey;
};

export const emptyFilters: ListingFilters = {
  q: "",
  category: null,
  condition: null,
  type: null,
  dealsOnly: false,
  sort: "recommended",
};

const conditions: Condition[] = ["uk-used", "brand-new"];
const sorts: SortKey[] = ["recommended", "deals", "name"];

/** Reads filters from URL search params. Unknown values are ignored. */
export function filtersFromParams(params: Pick<URLSearchParams, "get">): ListingFilters {
  const condition = params.get("condition");
  const sort = params.get("sort");
  const category = params.get("category");
  return {
    q: params.get("q")?.trim() ?? "",
    category: category ? (getCategoryBySlug(category)?.id ?? null) : null,
    condition: conditions.includes(condition as Condition) ? (condition as Condition) : null,
    type: (params.get("type") as SubcategoryId | null) ?? null,
    dealsOnly: params.get("deals") === "1",
    sort: sorts.includes(sort as SortKey) ? (sort as SortKey) : "recommended",
  };
}

/**
 * Writes the non-default filters back to a query string. `category` is only
 * written when the page doesn't already fix it in its path.
 */
export function filtersToQuery(filters: ListingFilters, categorySlug?: string | null): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (categorySlug) params.set("category", categorySlug);
  if (filters.condition) params.set("condition", filters.condition);
  if (filters.type) params.set("type", filters.type);
  if (filters.dealsOnly) params.set("deals", "1");
  if (filters.sort !== "recommended") params.set("sort", filters.sort);
  const query = params.toString();
  return query ? `?${query}` : "";
}

export function matchesQuery(product: Product, query: string): boolean {
  if (!query) return true;
  const haystack = [
    product.name,
    product.variant,
    conditionLabel[product.condition],
    product.grade,
    getSubcategoryLabel(product.subcategory),
    product.highlight,
    ...product.specs,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function applyFilters(products: Product[], filters: ListingFilters): Product[] {
  const result = products.filter(
    (p) =>
      (!filters.category || p.category === filters.category) &&
      (!filters.condition || p.condition === filters.condition) &&
      (!filters.type || p.subcategory === filters.type) &&
      (!filters.dealsOnly || Boolean(p.deal)) &&
      matchesQuery(p, filters.q),
  );

  if (filters.sort === "name") return [...result].sort((a, b) => a.name.localeCompare(b.name));
  if (filters.sort === "deals") return [...result].sort((a, b) => Number(Boolean(b.deal)) - Number(Boolean(a.deal)));
  // Recommended: featured first, then deals, then catalog order.
  return [...result].sort((a, b) => rank(b) - rank(a));
}

function rank(product: Product): number {
  return (product.featured ? 2 : 0) + (product.deal ? 1 : 0);
}

/** "1 item" / "12 items" */
export function itemCount(count: number): string {
  return `${count.toLocaleString("en-GH")} ${count === 1 ? "item" : "items"}`;
}
