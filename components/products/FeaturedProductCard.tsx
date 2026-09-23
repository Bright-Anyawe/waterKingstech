import Image from "next/image";
import { AvailabilityBadge } from "@/components/products/AvailabilityBadge";
import { ProductPrice } from "@/components/products/ProductPrice";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getSubcategoryLabel } from "@/data/categories";
import { productMessage, productTitle, whatsappHref } from "@/lib/contact-links";
import type { Product } from "@/types";

export function FeaturedProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const title = productTitle(product);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-ink-850 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1.5 hover:border-tide-400/35 hover:shadow-[0_40px_80px_-40px_rgb(18_181_214/0.35)] focus-within:border-tide-400/35">
      <div className="relative aspect-[4/3.4] overflow-hidden">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
          loading={eager ? "eager" : "lazy"}
          className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-premium)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink-850 via-ink-850/10 to-transparent" />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-tide-400 px-2.5 py-1 text-[0.7rem] font-semibold text-ink-950">Featured</span>
          <AvailabilityBadge availability={product.availability} tone="dark" />
        </div>
      </div>

      <div className="relative -mt-10 flex flex-1 flex-col px-6 pb-6 sm:px-7 sm:pb-7">
        <p className="font-mono text-[0.68rem] tracking-[0.16em] text-tide-300 uppercase">
          {getSubcategoryLabel(product.subcategory)}
          {product.condition ? <span className="text-ink-400"> · {product.condition}</span> : null}
        </p>
        <h3 className="mt-2 text-2xl leading-tight font-semibold tracking-[-0.03em] text-white">
          {product.name}
          {product.variant ? <span className="font-normal text-ink-300"> {product.variant}</span> : null}
        </h3>
        {product.highlight ? <p className="mt-2 text-sm leading-relaxed text-ink-300">{product.highlight}</p> : null}

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Key specifications">
          {product.specs.map((spec) => (
            <li
              key={spec}
              className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-xs text-ink-200"
            >
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-white/[0.08] pt-5">
          <ProductPrice price={product.price} tone="dark" size="lg" />

          {/* CTA: the label reveals on hover/focus for mouse users and is always shown on touch screens */}
          <a
            href={whatsappHref(productMessage(product))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buy ${title} on WhatsApp`}
            className="flex h-12 shrink-0 items-center rounded-full bg-whatsapp text-whatsapp-ink transition-colors duration-300 hover:bg-whatsapp-hover"
          >
            <span className="flex size-12 items-center justify-center">
              <WhatsAppIcon className="size-5" />
            </span>
            <span className="grid grid-cols-[1fr] transition-[grid-template-columns] duration-500 ease-[var(--ease-premium)] [@media(hover:hover)]:grid-cols-[0fr] [@media(hover:hover)]:group-hover:grid-cols-[1fr] [@media(hover:hover)]:group-focus-within:grid-cols-[1fr]">
              <span className="overflow-hidden pr-5 text-sm font-semibold whitespace-nowrap [@media(hover:hover)]:pr-0 [@media(hover:hover)]:group-hover:pr-5 [@media(hover:hover)]:group-focus-within:pr-5 transition-[padding] duration-500">
                Buy on WhatsApp
              </span>
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
