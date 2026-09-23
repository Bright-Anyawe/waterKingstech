import Image from "next/image";
import { AvailabilityBadge } from "@/components/products/AvailabilityBadge";
import { ProductPrice } from "@/components/products/ProductPrice";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getSubcategoryLabel } from "@/data/categories";
import { productMessage, productTitle, whatsappHref } from "@/lib/contact-links";
import type { Product } from "@/types";

export function ProductCard({ product }: { product: Product }) {
  const title = productTitle(product);
  const soldOut = product.availability === "out-of-stock";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[1.4rem] border border-line bg-white transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:border-ink-200 hover:shadow-[0_24px_50px_-28px_rgb(7_9_12/0.35)] sm:rounded-3xl">
      <div className="relative aspect-square overflow-hidden bg-mist">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1280px) 290px, (min-width: 1024px) 30vw, 50vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-premium)] group-hover:scale-[1.06]"
        />
        <AvailabilityBadge availability={product.availability} className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5" />
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-5">
        <p className="font-mono text-[0.62rem] tracking-[0.14em] text-tide-700 uppercase sm:text-[0.66rem]">
          {getSubcategoryLabel(product.subcategory)}
        </p>
        <h3 className="mt-1.5 text-[0.95rem] leading-snug font-semibold tracking-[-0.02em] text-ink-950 sm:text-[1.05rem]">
          {product.name}
          {product.variant ? <span className="font-normal text-ink-500"> {product.variant}</span> : null}
        </h3>
        {product.condition ? <p className="mt-1 text-xs text-ink-500 sm:text-[0.8rem]">{product.condition}</p> : null}

        <ul className="mt-3 flex flex-wrap gap-1" aria-label="Key specifications">
          {product.specs.map((spec, index) => (
            <li
              key={spec}
              className={`rounded-md bg-mist px-1.5 py-0.5 text-[0.68rem] text-ink-600 sm:px-2 sm:py-1 sm:text-[0.72rem] ${index > 1 ? "hidden sm:block" : ""}`}
            >
              {spec}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-4 sm:pt-5">
          <ProductPrice price={product.price} />
          <a
            href={whatsappHref(productMessage(product))}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${soldOut ? "Ask about restock for" : "Buy"} ${title} on WhatsApp`}
            className="mt-3 flex h-10 w-full items-center justify-center gap-1.5 rounded-full bg-whatsapp px-2 text-[0.74rem] font-semibold whitespace-nowrap text-whatsapp-ink transition-[background-color,transform] duration-300 hover:bg-whatsapp-hover active:scale-[0.97] sm:h-11 sm:gap-2 sm:text-sm"
          >
            <WhatsAppIcon className="size-3.5 shrink-0 sm:size-[1.1rem]" />
            {soldOut ? "Ask about restock" : "Buy on WhatsApp"}
          </a>
        </div>
      </div>
    </article>
  );
}
