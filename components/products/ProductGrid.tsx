import { ListingCard } from "@/components/products/ListingCard";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

/** Dense marketplace grid: 2 columns on phones, up to 4 on wide screens. */
export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  /** Number of leading images to load eagerly (those in the first viewport). */
  priorityCount?: number;
}) {
  return (
    <ul className={cn("grid grid-cols-2 gap-2.5 sm:grid-cols-3 sm:gap-3 xl:grid-cols-4", className)}>
      {products.map((product, index) => (
        <li key={product.id}>
          <ListingCard product={product} priority={index < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
