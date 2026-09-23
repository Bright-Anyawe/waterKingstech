"use client";

import type { ComponentPropsWithoutRef } from "react";
import { setCatalogCategory, type CatalogCategory } from "@/lib/catalog-store";

type CategoryLinkProps = ComponentPropsWithoutRef<"a"> & { category: CatalogCategory };

/** Anchor to the catalog that also pre-selects a category filter. */
export function CategoryLink({ category, onClick, ...rest }: CategoryLinkProps) {
  return (
    <a
      href="#catalog"
      onClick={(event) => {
        setCatalogCategory(category);
        onClick?.(event);
      }}
      {...rest}
    />
  );
}
