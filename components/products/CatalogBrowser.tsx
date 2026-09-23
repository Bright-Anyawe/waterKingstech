"use client";

import { ChevronDown, Search, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useDeferredValue, useMemo, useState } from "react";
import { CategoryFilter, type FilterOption } from "@/components/products/CategoryFilter";
import { ProductGrid } from "@/components/products/ProductGrid";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { setCatalogCategory, useCatalogCategory, type CatalogCategory } from "@/lib/catalog-store";
import { whatsappHref, whatsappMessages } from "@/lib/contact-links";
import type { Category, Product, SubcategoryId } from "@/types";

type SubcategoryFilter = SubcategoryId | "all";

/** Products shown before "Show all" — keeps the page short on phones. */
const INITIAL_COUNT = 8;

type CatalogBrowserProps = {
  products: Product[];
  categories: Category[];
};

function matchesQuery(product: Product, subLabel: string, query: string) {
  if (!query) return true;
  const haystack = [product.name, product.variant, product.condition, subLabel, ...product.specs]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export function CatalogBrowser({ products, categories }: CatalogBrowserProps) {
  const category = useCatalogCategory();
  const [selectedSub, setSelectedSub] = useState<SubcategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const deferredQuery = useDeferredValue(query.trim());

  const activeCategory = categories.find((c) => c.id === category);
  // A subcategory only applies while its parent category is selected.
  const subcategory: SubcategoryFilter = activeCategory?.subcategories.some((s) => s.id === selectedSub)
    ? selectedSub
    : "all";

  const subLabels = useMemo(() => {
    const map = new Map<SubcategoryId, string>();
    categories.forEach((c) => c.subcategories.forEach((s) => map.set(s.id, s.label)));
    return map;
  }, [categories]);

  const categoryOptions: FilterOption<CatalogCategory>[] = [
    { id: "all", label: "All", count: products.length },
    ...categories.map((c) => ({
      id: c.id,
      label: c.label,
      count: products.filter((p) => p.category === c.id).length,
    })),
  ];

  const subOptions: FilterOption<SubcategoryFilter>[] = activeCategory
    ? [
        { id: "all", label: `All ${activeCategory.label.toLowerCase()}` },
        ...activeCategory.subcategories
          .map((s) => ({ id: s.id, label: s.label, count: products.filter((p) => p.subcategory === s.id).length }))
          .filter((s) => s.count > 0),
      ]
    : [];

  const filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (subcategory === "all" || p.subcategory === subcategory) &&
      matchesQuery(p, subLabels.get(p.subcategory) ?? "", deferredQuery),
  );

  const hasFilters = category !== "all" || subcategory !== "all" || query.length > 0;

  // "Show all" applies to the current filter combination only; searches always show every match.
  const filterKey = `${category}|${subcategory}|${deferredQuery}`;
  const expanded = expandedKey === filterKey || deferredQuery.length > 0;
  const visible = expanded ? filtered : filtered.slice(0, INITIAL_COUNT);
  const hiddenCount = filtered.length - visible.length;

  const resetFilters = () => {
    setCatalogCategory("all");
    setSelectedSub("all");
    setQuery("");
  };

  return (
    <div className="mt-10 sm:mt-12">
      {/* Controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <CategoryFilter
            label="Filter by category"
            layoutId="catalog-category"
            options={categoryOptions}
            value={category}
            onChange={(value) => {
              setCatalogCategory(value);
              setSelectedSub("all");
            }}
          />
        </div>

        <div className="relative w-full lg:max-w-xs">
          <label htmlFor="catalog-search" className="sr-only">
            Search products
          </label>
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-400" />
          <input
            id="catalog-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search e.g. iPhone 15, 1TB, M2…"
            autoComplete="off"
            className="h-12 w-full rounded-full border border-line bg-white pr-11 pl-11 text-[0.95rem] text-ink-950 transition-[border-color,box-shadow] outline-none placeholder:text-ink-400 focus:border-tide-500 focus:ring-4 focus:ring-tide-400/15 [&::-webkit-search-cancel-button]:hidden"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute top-1/2 right-2 flex size-8 -translate-y-1/2 items-center justify-center rounded-full text-ink-400 hover:bg-mist hover:text-ink-950"
            >
              <X className="size-4" aria-hidden="true" />
              <span className="sr-only">Clear search</span>
            </button>
          ) : null}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {subOptions.length > 2 ? (
          <m.div
            key={category}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="-mx-4 overflow-x-auto px-4 pt-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
              <CategoryFilter
                label={`Filter ${activeCategory?.label.toLowerCase()} by type`}
                layoutId="catalog-subcategory"
                size="sm"
                options={subOptions}
                value={subcategory}
                onChange={setSelectedSub}
              />
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-line pt-5 text-sm text-ink-500">
        <p aria-live="polite">
          Showing <span className="font-semibold text-ink-950 tabular-nums">{visible.length}</span>
          {hiddenCount > 0 ? <> of {filtered.length}</> : null} {filtered.length === 1 ? "product" : "products"}
        </p>
        {hasFilters ? (
          <button type="button" onClick={resetFilters} className="font-medium text-tide-700 underline-offset-4 hover:underline">
            Clear filters
          </button>
        ) : null}
      </div>

      <div className="mt-5">
        {filtered.length > 0 ? (
          <>
            <ProductGrid products={visible} />
            {hiddenCount > 0 ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpandedKey(filterKey)}
                  className="group inline-flex h-12 items-center gap-2 rounded-full border border-line bg-white px-6 text-sm font-medium text-ink-950 transition-colors hover:border-ink-300 hover:bg-mist"
                >
                  Show all {filtered.length} products
                  <ChevronDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden="true" />
                </button>
              </div>
            ) : null}
          </>
        ) : (
          <div className="flex flex-col items-center rounded-3xl border border-dashed border-line bg-mist px-6 py-16 text-center">
            <p className="text-lg font-semibold tracking-tight text-ink-950">No matching products on the website</p>
            <p className="mt-2 max-w-md text-sm text-ink-500">
              Our stock changes often — send us a message and we&apos;ll tell you what&apos;s available in the shop.
            </p>
            <a
              href={whatsappHref(
                deferredQuery
                  ? `Hello WaterKingsTech, I'm looking for "${deferredQuery}". Do you have it available?`
                  : whatsappMessages.catalog,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-whatsapp px-5 text-sm font-semibold text-whatsapp-ink hover:bg-whatsapp-hover"
            >
              <WhatsAppIcon className="size-4.5" />
              Ask on WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
