"use client";

import { AnimatePresence, m } from "motion/react";
import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types";

const ease = [0.22, 1, 0.36, 1] as const;

/** Product grid with smooth enter/exit and re-flow when filters change. */
export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
      <AnimatePresence mode="popLayout" initial={false}>
        {products.map((product, index) => (
          <m.li
            key={product.id}
            layout
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease, delay: Math.min(index, 8) * 0.03 } }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
            transition={{ layout: { duration: 0.45, ease } }}
          >
            <ProductCard product={product} />
          </m.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
