"use client";

import { ChevronDown, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useState, type FormEvent } from "react";
import { categories } from "@/data/categories";
import { cn } from "@/lib/cn";

/**
 * Search used in the home page's search band ("hero") and in the header on
 * every other page ("header"). Submitting opens the matching listing page.
 */
export function SearchBox({ variant, className }: { variant: "hero" | "header"; className?: string }) {
  const router = useRouter();
  const id = useId();
  const [query, setQuery] = useState("");
  const [slug, setSlug] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const q = query.trim();
    const path = slug ? `/shop/${slug}` : "/shop";
    router.push(q ? `${path}?q=${encodeURIComponent(q)}` : path);
  };

  const hero = variant === "hero";

  return (
    <form
      role="search"
      onSubmit={submit}
      className={cn("flex w-full items-stretch gap-2", hero ? "flex-col sm:flex-row" : "", className)}
    >
      {hero ? (
        <div className="relative shrink-0 sm:w-48">
          <label htmlFor={`${id}-category`} className="sr-only">
            Category
          </label>
          <select
            id={`${id}-category`}
            value={slug}
            onChange={(event) => setSlug(event.target.value)}
            className="h-14 w-full cursor-pointer appearance-none rounded-xl border-0 bg-white pr-10 pl-4 text-[0.95rem] font-medium text-ink shadow-[0_10px_30px_-14px_rgb(3_26_61/0.55)] outline-none focus-visible:ring-4 focus-visible:ring-cyan/50"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.shortLabel}
              </option>
            ))}
          </select>
          <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ink-muted" />
        </div>
      ) : null}

      <div className="relative flex-1">
        <label htmlFor={`${id}-q`} className="sr-only">
          Search phones, laptops and accessories
        </label>
        <input
          id={`${id}-q`}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={hero ? "I am looking for… e.g. iPhone 15, MacBook, SSD" : "Search phones, laptops, accessories…"}
          autoComplete="off"
          enterKeyHint="search"
          className={cn(
            "w-full border-0 bg-white text-ink outline-none [&::-webkit-search-cancel-button]:hidden",
            hero
              ? "h-14 rounded-xl pr-16 pl-4 text-base shadow-[0_10px_30px_-14px_rgb(3_26_61/0.55)] focus-visible:ring-4 focus-visible:ring-cyan/50"
              : "h-10 rounded-lg pr-12 pl-3.5 text-sm ring-1 ring-ice-300 focus-visible:ring-2 focus-visible:ring-royal-600",
          )}
        />
        <button
          type="submit"
          className={cn(
            "absolute top-1/2 flex -translate-y-1/2 items-center justify-center transition-colors",
            hero
              ? "right-2 size-11 rounded-lg bg-orange text-ink hover:bg-orange-strong"
              : "right-1 size-8 rounded-md bg-royal-600 text-white hover:bg-royal-700",
          )}
        >
          <Search className={hero ? "size-5" : "size-4"} aria-hidden="true" />
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}
