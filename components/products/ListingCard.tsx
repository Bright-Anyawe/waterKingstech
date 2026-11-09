import Image from "next/image";
import Link from "next/link";
import {
  AvailabilityNote,
  ConditionChip,
  DealTag,
  GiftLine,
  Price,
  WarrantyChip,
} from "@/components/products/ProductBits";
import { TapEarnButton } from "@/components/referral/TapEarnButton";
import { WhatsAppBuyLink } from "@/components/referral/WhatsAppBuyLink";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { productMessage, productTitle } from "@/lib/contact-links";
import { cn } from "@/lib/cn";
import type { Product } from "@/types";

/**
 * Marketplace listing card: photo, price (or "Ask for price") with the
 * negotiable note, title, short description, condition and warranty chips,
 * free gift, Tap & Earn and a one-tap WhatsApp button. The photo and title
 * open the product page.
 */
export function ListingCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const title = productTitle(product);
  const href = `/product/${product.id}`;
  const soldOut = product.availability === "out-of-stock";

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-xl border bg-white transition-[border-color,box-shadow,transform] duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-22px_rgb(6_42_92/0.45)]",
        "border-ice-200 hover:border-ice-300",
      )}
    >
      <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[4/3.3] overflow-hidden bg-ice-100">
        <Image
          src={product.image.src}
          alt=""
          fill
          priority={priority}
          sizes="(min-width: 1280px) 290px, (min-width: 1024px) 26vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.04]"
        />
        {product.deal ? <DealTag deal={product.deal} className="absolute top-2 left-2" /> : null}
      </Link>

      <div className="flex flex-1 flex-col p-2.5 sm:p-3.5">
        {product.price !== null ? <Price product={product} /> : null}
        <h3 className="text-[0.86rem] leading-snug font-semibold text-ink sm:text-[0.95rem]">
          <Link href={href} className="hover:text-royal-700 hover:underline">
            {title}
          </Link>
        </h3>
        {product.price === null ? <Price product={product} /> : null}
        <p className="mt-1 line-clamp-2 text-[0.76rem] leading-snug text-ink-muted sm:text-[0.8rem]">
          {product.highlight ?? product.specs.join(" · ")}
        </p>

        <div className="mt-2 flex flex-wrap gap-1">
          <ConditionChip product={product} />
          <WarrantyChip product={product} />
        </div>

        <GiftLine product={product} className="mt-2" />
        <AvailabilityNote product={product} className="mt-1" />

        <div className="mt-auto flex flex-col gap-2 pt-3">
          <TapEarnButton productId={product.id} title={title} category={product.category} />
          <WhatsAppBuyLink
            message={productMessage(product)}
            ariaLabel={`${soldOut ? "Ask about restock for" : "Buy"} ${title} on WhatsApp`}
            className="flex h-10 w-full items-center justify-center gap-1.5 rounded-lg bg-whatsapp px-2 text-[0.78rem] font-bold whitespace-nowrap text-whatsapp-ink transition-[background-color,transform] duration-200 hover:bg-whatsapp-hover active:scale-[0.97] sm:text-sm"
          >
            <WhatsAppIcon className="size-4 shrink-0" />
            {soldOut ? "Ask about restock" : "Buy on WhatsApp"}
          </WhatsAppBuyLink>
        </div>
      </div>
    </article>
  );
}
