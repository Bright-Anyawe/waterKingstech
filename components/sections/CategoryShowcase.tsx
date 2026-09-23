import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { CategoryLink } from "@/components/products/CategoryLink";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { repairImage } from "@/data/repairs";
import { cn } from "@/lib/cn";

const tileLayout: Record<string, string> = {
  smartphones: "sm:col-span-2 lg:col-span-1 lg:row-span-2",
  laptops: "lg:col-span-2",
  accessories: "",
  repairs: "sm:col-span-2 lg:col-span-1",
};

const tileBase =
  "group relative isolate flex min-h-[15rem] flex-col justify-end overflow-hidden rounded-3xl bg-ink-900 p-6 text-white ring-1 ring-black/5 transition-[transform,box-shadow] duration-500 ease-[var(--ease-premium)] hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgb(7_9_12/0.55)] sm:min-h-[17rem] sm:p-7";

export function CategoryShowcase() {
  return (
    <section id="products" aria-labelledby="categories-title" className="bg-mist py-20 sm:py-28">
      <div className="container-x">
        <SectionHeading
          id="categories-title"
          eyebrow="Shop by category"
          title="Everything you need, in one trusted shop."
          description="Browse quality smartphones, laptops and accessories — then message us on WhatsApp to check availability or visit the shop."
        />

        <RevealGroup
          stagger={0.07}
          className="mt-12 grid auto-rows-[minmax(15rem,auto)] grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5"
        >
          {categories.map((category, index) => {
            const count = products.filter((p) => p.category === category.id).length;
            return (
              <RevealItem key={category.id} className={cn("flex", tileLayout[category.id])}>
                <CategoryLink category={category.id} className={cn(tileBase, "w-full")}>
                  <TileImage src={category.image.src} alt={category.image.alt} priority={index === 0} />
                  <TileContent
                    title={category.label}
                    description={category.description}
                    meta={`${count} products`}
                    tags={category.subcategories.map((s) => s.label)}
                  />
                </CategoryLink>
              </RevealItem>
            );
          })}

          <RevealItem className={cn("flex", tileLayout.repairs)}>
            <a href="#repairs" className={cn(tileBase, "w-full")}>
              <TileImage src={repairImage.src} alt={repairImage.alt} />
              <TileContent
                title="Repairs"
                description="Screens, batteries, SSD upgrades, board repair and diagnostics."
                meta="Phones & laptops"
                tags={[]}
              />
            </a>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

function TileImage({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        loading={priority ? "eager" : "lazy"}
        className="-z-20 object-cover transition-transform duration-[1.2s] ease-[var(--ease-premium)] group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/65 to-ink-950/10" />
    </>
  );
}

function TileContent({
  title,
  description,
  meta,
  tags,
}: {
  title: string;
  description: string;
  meta: string;
  tags: string[];
}) {
  return (
    <>
      <span className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-md transition-[background-color,transform] duration-500 ease-[var(--ease-premium)] group-hover:rotate-45 group-hover:bg-white group-hover:text-ink-950">
        <ArrowUpRight className="size-4.5" aria-hidden="true" />
      </span>
      <span className="font-mono text-[0.7rem] tracking-[0.16em] text-tide-200 uppercase">{meta}</span>
      <span className="mt-2 text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">{title}</span>
      <span className="mt-2 max-w-sm text-sm leading-relaxed text-ink-200">{description}</span>
      {tags.length > 0 ? (
        <span className="mt-4 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/15 bg-white/[0.08] px-2.5 py-1 text-[0.7rem] text-white/90 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </span>
      ) : null}
    </>
  );
}
