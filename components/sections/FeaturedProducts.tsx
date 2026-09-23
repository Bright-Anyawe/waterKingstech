import { ArrowRight } from "lucide-react";
import { FeaturedProductCard } from "@/components/products/FeaturedProductCard";
import { ButtonLink } from "@/components/ui/Button";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { featuredProducts } from "@/data/products";

export function FeaturedProducts() {
  if (featuredProducts.length === 0) return null;

  return (
    <section
      id="featured"
      aria-labelledby="featured-title"
      className="relative isolate overflow-hidden bg-ink-950 py-20 text-white sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[30rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(18_181_214/0.14),transparent)]"
      />

      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="featured-title"
            tone="dark"
            eyebrow="Featured products"
            title="Handpicked devices, ready for you."
            description="A few standout phones and laptops from our range. Tap a device to ask about it on WhatsApp."
          />
          <ButtonLink href="#catalog" variant="outline-light" trailingIcon={<ArrowRight />} className="self-start lg:self-end">
            View full catalog
          </ButtonLink>
        </div>

        <RevealGroup stagger={0.1} className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <RevealItem
              key={product.id}
              className={featuredProducts.length === 3 && index === 2 ? "md:col-span-2 lg:col-span-1" : undefined}
            >
              <FeaturedProductCard product={product} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
