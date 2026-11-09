"use client";

import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Pending } from "@/components/ui/Pending";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { categories, getCategory, getSubcategoryLabel } from "@/data/categories";
import { conditionLabel, warranty } from "@/data/offers";
import { catalogIsSample } from "@/data/products";
import {
  applyFilters,
  emptyFilters,
  filtersFromParams,
  filtersToQuery,
  itemCount,
  matchesQuery,
  type ListingFilters,
  type SortKey,
} from "@/lib/catalog";
import { cn } from "@/lib/cn";
import { whatsappHref, whatsappMessages } from "@/lib/contact-links";
import type { CategoryId, Condition, Product } from "@/types";

type Fixed = { category?: CategoryId; condition?: Condition; dealsOnly?: boolean };

type ListingProps = {
  title: string;
  /** Products already limited to this page's scope */
  products: Product[];
  /** Filters set by the page itself (e.g. the laptops page fixes the category) */
  fixed?: Fixed;
  /** Optional block shown between the title row and the results */
  intro?: ReactNode;
  /** Use "h2" when the page already has its own h1 (portal banners) */
  titleAs?: "h1" | "h2";
};

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "recommended", label: "Recommended" },
  { value: "deals", label: "Deals first" },
  { value: "name", label: "Name (A–Z)" },
];

/**
 * Marketplace listing page body: filter sidebar (a sheet on phones), sort,
 * active-filter chips and the results grid. Filters live in the URL, so a
 * filtered page can be shared or bookmarked.
 */
export function Listing(props: ListingProps) {
  return (
    <Suspense fallback={<ListingView {...props} params={null} />}>
      <ListingWithParams {...props} />
    </Suspense>
  );
}

function ListingWithParams(props: ListingProps) {
  const params = useSearchParams();
  return <ListingView {...props} params={params} />;
}

function ListingView({ title, products, fixed = {}, intro, titleAs: Title = "h1", params }: ListingProps & { params: URLSearchParams | null }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);

  const fromUrl = params ? filtersFromParams(params) : emptyFilters;
  const filters: ListingFilters = {
    ...fromUrl,
    category: fixed.category ?? fromUrl.category,
    condition: fixed.condition ?? fromUrl.condition,
    dealsOnly: fixed.dealsOnly ?? fromUrl.dealsOnly,
  };
  const activeCategory = filters.category ? getCategory(filters.category) : null;
  if (filters.type && !activeCategory?.subcategories.some((s) => s.id === filters.type)) filters.type = null;

  const results = applyFilters(products, filters);

  const update = (patch: Partial<ListingFilters>) => {
    const next = { ...filters, ...patch };
    if ("category" in patch) next.type = null;
    const query = filtersToQuery(
      {
        ...next,
        condition: fixed.condition ? null : next.condition,
        dealsOnly: fixed.dealsOnly ? false : next.dealsOnly,
      },
      fixed.category || !next.category ? null : getCategory(next.category).slug,
    );
    router.replace(`${pathname}${query}`, { scroll: false });
  };

  const clearAll = () => update({ q: "", category: fixed.category ?? null, condition: null, type: null, dealsOnly: false });

  const chips: { label: string; clear: () => void }[] = [];
  if (filters.q) chips.push({ label: `“${filters.q}”`, clear: () => update({ q: "" }) });
  if (!fixed.category && filters.category) chips.push({ label: getCategory(filters.category).shortLabel, clear: () => update({ category: null }) });
  if (filters.type) chips.push({ label: getSubcategoryLabel(filters.type), clear: () => update({ type: null }) });
  if (!fixed.condition && filters.condition) chips.push({ label: conditionLabel[filters.condition], clear: () => update({ condition: null }) });
  if (!fixed.dealsOnly && filters.dealsOnly) chips.push({ label: "Deals only", clear: () => update({ dealsOnly: false }) });

  const panel = (instance: string) => (
    <FilterPanel instance={instance} products={products} filters={filters} fixed={fixed} update={update} onClear={clearAll} canClear={chips.length > 0} />
  );

  return (
    <div className="grid gap-5 lg:grid-cols-[16rem_1fr]">
      <aside aria-label="Filters" className="hidden lg:block">
        <div className="sticky top-32">{panel("side")}</div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0">
            <Title className="font-display text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-[1.75rem]">{title}</Title>
            <p aria-live="polite" className="mt-1 text-sm text-ink-muted">
              <span className="font-semibold text-ink">{itemCount(results.length)}</span>
              {filters.q ? <> for “{filters.q}”</> : null} · Circle Mall, Accra
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-ice-300 bg-white px-3.5 text-sm font-semibold text-ink hover:border-royal-300 lg:hidden"
            >
              <SlidersHorizontal className="size-4" aria-hidden="true" />
              Filters
              {chips.length > 0 ? (
                <span className="flex size-5 items-center justify-center rounded-full bg-royal-600 text-[0.7rem] text-white">{chips.length}</span>
              ) : null}
            </button>
            <div className="relative">
              <label htmlFor="listing-sort" className="sr-only">
                Sort by
              </label>
              <select
                id="listing-sort"
                value={filters.sort}
                onChange={(event) => update({ sort: event.target.value as SortKey })}
                className="h-10 cursor-pointer appearance-none rounded-lg border border-ice-300 bg-white pr-9 pl-3.5 text-sm font-semibold text-ink outline-none hover:border-royal-300 focus-visible:ring-2 focus-visible:ring-royal-600"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-ink-muted" />
            </div>
          </div>
        </div>

        {intro ? <div className="mt-4">{intro}</div> : null}

        {activeCategory ? (
          <div className="no-scrollbar -mx-4 mt-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
            <div role="group" aria-label={`${activeCategory.shortLabel} type`} className="flex w-max gap-2">
              <TypeChip active={!filters.type} onClick={() => update({ type: null })}>
                All {activeCategory.shortLabel.toLowerCase()}
              </TypeChip>
              {activeCategory.subcategories
                .filter((sub) => products.some((p) => p.subcategory === sub.id))
                .map((sub) => (
                  <TypeChip key={sub.id} active={filters.type === sub.id} onClick={() => update({ type: sub.id })}>
                    {sub.label}
                  </TypeChip>
                ))}
            </div>
          </div>
        ) : null}

        {chips.length > 0 || catalogIsSample ? (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {chips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                onClick={chip.clear}
                className="inline-flex h-8 items-center gap-1 rounded-full bg-royal-600 pr-2 pl-3 text-[0.8rem] font-semibold text-white hover:bg-royal-700"
              >
                {chip.label}
                <X className="size-3.5" aria-hidden="true" />
                <span className="sr-only">Remove filter</span>
              </button>
            ))}
            {catalogIsSample ? <Pending>Sample listings — real stock &amp; prices to be supplied</Pending> : null}
          </div>
        ) : null}

        <div className="mt-4">
          {results.length > 0 ? (
            <ProductGrid products={results} priorityCount={4} className="lg:grid-cols-3 xl:grid-cols-4" />
          ) : (
            <div className="flex flex-col items-center rounded-xl border border-dashed border-ice-300 bg-white px-6 py-14 text-center">
              <p className="font-display text-lg font-bold text-ink">No matches on the website yet</p>
              <p className="mt-2 max-w-md text-sm text-ink-muted">
                Our stock changes every week. Tell us what you want and we&apos;ll check what&apos;s in the shop today.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <a
                  href={whatsappHref(
                    filters.q
                      ? `Hello WaterKingsTech, I'm looking for "${filters.q}". Do you have it available?`
                      : whatsappMessages.catalog,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-whatsapp px-5 text-sm font-bold text-whatsapp-ink hover:bg-whatsapp-hover"
                >
                  <WhatsAppIcon className="size-4.5" />
                  Ask on WhatsApp
                </a>
                {chips.length > 0 ? (
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex h-11 items-center rounded-lg border border-ice-300 bg-white px-5 text-sm font-semibold text-ink hover:border-royal-300"
                  >
                    Clear filters
                  </button>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>

      <FilterSheet open={sheetOpen} onClose={closeSheet} resultCount={results.length}>
        {panel("sheet")}
      </FilterSheet>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Filter panel                                                              */
/* -------------------------------------------------------------------------- */

function FilterPanel({
  instance,
  products,
  filters,
  fixed,
  update,
  onClear,
  canClear,
}: {
  instance: string;
  products: Product[];
  filters: ListingFilters;
  fixed: Fixed;
  update: (patch: Partial<ListingFilters>) => void;
  onClear: () => void;
  canClear: boolean;
}) {
  const activeCategory = filters.category ? getCategory(filters.category) : null;
  // Counts follow the current search, so they match what a click would show.
  const searched = products.filter((p) => matchesQuery(p, filters.q));
  const inCategory = activeCategory ? searched.filter((p) => p.category === activeCategory.id) : searched;
  const queryPart = filters.q ? `?q=${encodeURIComponent(filters.q)}` : "";

  return (
    <div className="flex flex-col gap-3">
      <FilterGroup title="Category">
        {fixed.category ? (
          <ul className="flex flex-col">
            {categories.map((category) => {
              const active = category.id === fixed.category;
              return (
                <li key={category.id}>
                  <Link
                    href={`/shop/${category.slug}${queryPart}`}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-md px-2 py-1.5 text-sm",
                      active ? "bg-royal-50 font-bold text-royal-700" : "text-ink-soft hover:bg-ice hover:text-ink",
                    )}
                  >
                    {category.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <RadioList
            name={`${instance}-category`}
            value={filters.category ?? "all"}
            onChange={(value) => update({ category: value === "all" ? null : (value as CategoryId) })}
            options={[
              { value: "all", label: "All categories", count: searched.length },
              ...categories.map((c) => ({ value: c.id, label: c.label, count: searched.filter((p) => p.category === c.id).length })),
            ]}
          />
        )}
      </FilterGroup>

      {activeCategory ? (
        <FilterGroup title="Type">
          <RadioList
            name={`${instance}-type`}
            value={filters.type ?? "all"}
            onChange={(value) => update({ type: value === "all" ? null : (value as ListingFilters["type"]) })}
            options={[
              { value: "all", label: `All ${activeCategory.shortLabel.toLowerCase()}`, count: inCategory.length },
              ...activeCategory.subcategories
                .map((s) => ({ value: s.id, label: s.label, count: inCategory.filter((p) => p.subcategory === s.id).length }))
                .filter((s) => s.count > 0),
            ]}
          />
        </FilterGroup>
      ) : null}

      {!fixed.condition ? (
        <FilterGroup title="Condition">
          <RadioList
            name={`${instance}-condition`}
            value={filters.condition ?? "all"}
            onChange={(value) => update({ condition: value === "all" ? null : (value as Condition) })}
            options={[
              { value: "all", label: "Any condition", count: inCategory.length },
              ...(["uk-used", "brand-new"] as Condition[]).map((c) => ({
                value: c,
                label: conditionLabel[c],
                hint: c === "uk-used" ? (warranty["uk-used"] ?? undefined) : "Factory sealed",
                count: inCategory.filter((p) => p.condition === c).length,
              })),
            ]}
          />
        </FilterGroup>
      ) : null}

      {!fixed.dealsOnly ? (
        <FilterGroup title="Offers">
          <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm text-ink-soft hover:bg-ice">
            <input
              type="checkbox"
              checked={filters.dealsOnly}
              onChange={(event) => update({ dealsOnly: event.target.checked })}
              className="size-4 accent-royal-600"
            />
            <span className="flex-1">Deals only</span>
            <span className="text-[0.75rem] text-ink-muted tabular-nums">{inCategory.filter((p) => p.deal).length}</span>
          </label>
        </FilterGroup>
      ) : null}

      {canClear ? (
        <button type="button" onClick={onClear} className="self-start px-2 text-sm font-semibold text-royal-700 hover:underline">
          Clear all filters
        </button>
      ) : null}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="rounded-xl border border-ice-200 bg-white p-3">
      <legend className="sr-only">{title}</legend>
      <p aria-hidden="true" className="mb-1.5 px-2 font-display text-[0.8rem] font-bold text-ink">
        {title}
      </p>
      {children}
    </fieldset>
  );
}

function RadioList({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; count: number; hint?: string }[];
}) {
  return (
    <div className="flex flex-col">
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-sm hover:bg-ice",
            value === option.value ? "font-semibold text-ink" : "text-ink-soft",
          )}
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="size-4 accent-royal-600"
          />
          <span className="flex-1 leading-tight">
            {option.label}
            {option.hint ? <span className="block text-[0.72rem] font-normal text-ink-muted">{option.hint}</span> : null}
          </span>
          <span className="text-[0.75rem] font-normal text-ink-muted tabular-nums">{option.count}</span>
        </label>
      ))}
    </div>
  );
}

function TypeChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 rounded-full border px-4 text-[0.82rem] font-semibold whitespace-nowrap transition-colors",
        active ? "border-royal-600 bg-royal-600 text-white" : "border-ice-300 bg-white text-ink-soft hover:border-royal-300 hover:text-royal-700",
      )}
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Mobile filter sheet                                                       */
/* -------------------------------------------------------------------------- */

function FilterSheet({
  open,
  onClose,
  resultCount,
  children,
}: {
  open: boolean;
  onClose: () => void;
  resultCount: number;
  children: ReactNode;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div key="sheet" className="fixed inset-0 z-[60] lg:hidden">
          <m.div
            className="absolute inset-0 bg-navy-950/45"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
            className="absolute inset-x-0 bottom-0 flex max-h-[85dvh] flex-col rounded-t-2xl bg-ice"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%", transition: { duration: 0.2, ease: "easeIn" } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between border-b border-ice-200 bg-white px-4 py-3">
              <p className="font-display font-bold text-ink">Filters</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex size-9 items-center justify-center rounded-lg text-ink hover:bg-ice"
              >
                <X className="size-5" aria-hidden="true" />
                <span className="sr-only">Close filters</span>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">{children}</div>
            <div className="border-t border-ice-200 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={onClose}
                className="flex h-12 w-full items-center justify-center rounded-lg bg-royal-600 text-sm font-bold text-white hover:bg-royal-700"
              >
                Show {itemCount(resultCount)}
              </button>
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
