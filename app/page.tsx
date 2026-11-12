import { BundleBanners } from "@/components/home/BundleBanners";
import { CategoryRail } from "@/components/home/CategoryRail";
import { QuickTiles } from "@/components/home/QuickTiles";
import { SearchBand } from "@/components/home/SearchBand";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CorporateBand } from "@/components/sections/CorporateBand";
import { PortalCards } from "@/components/sections/PortalCards";
import { InstallmentPanel, ReferralPanel } from "@/components/sections/Programs";
import { RepairList } from "@/components/sections/RepairList";
import { Reviews } from "@/components/sections/Reviews";
import { VisitShop } from "@/components/sections/VisitShop";
import { Pending } from "@/components/ui/Pending";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { catalogIsSample, products } from "@/data/products";
import { testimonials } from "@/data/testimonials";
import { applyFilters, emptyFilters } from "@/lib/catalog";

/** Retail (B2C) home: search band, category rail, bundles and trending deals. */
export default function HomePage() {
  const trending = applyFilters(products, emptyFilters).slice(0, 8);

  return (
    <>
      <SearchBand />

      <div className="container-x relative z-10 -mt-6 sm:-mt-8">
        <div className="grid gap-4 lg:grid-cols-[16.5rem_1fr] lg:gap-5">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <CategoryRail />
          </aside>

          <div className="flex min-w-0 flex-col gap-4">
            <BundleBanners />
            <QuickTiles />

            <section aria-labelledby="trending-title" className="mt-4">
              <SectionHeader
                id="trending-title"
                title="Trending deals"
                description="Top picks and today's offers — tap Buy on WhatsApp to check availability."
                action={{ href: "/deals", label: "See all deals" }}
              />
              {catalogIsSample ? (
                <p className="mt-2">
                  <Pending>Sample listings — real stock &amp; prices to be supplied</Pending>
                </p>
              ) : null}
              <ProductGrid products={trending} className="mt-4" />
            </section>
          </div>
        </div>

        <PortalCards className="mt-10" />

        <section aria-labelledby="repairs-title" className="mt-12">
          <SectionHeader
            id="repairs-title"
            title="Repair & diagnostic hub"
            description="Phones and laptops fixed at the shop. Ask on WhatsApp for a quote and the time it takes."
            action={{ href: "/repairs", label: "All repairs" }}
          />
          <RepairList limit={4} className="mt-4" />
        </section>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <ReferralPanel compact />
          <InstallmentPanel compact />
        </div>

        <CorporateBand className="mt-12" />

        <section aria-labelledby="visit-title" className="mt-12">
          <SectionHeader
            id="visit-title"
            title="Visit the shop"
            description="See and test devices in person at Circle Mall — Blue Gate, Gate 2 Exit."
            action={{ href: "/visit", label: "Shop details" }}
          />
          <VisitShop className="mt-4" />
        </section>

        <section aria-labelledby="reviews-title" className="mt-12">
          <SectionHeader
            id="reviews-title"
            title="Verified customer reviews"
            action={testimonials.length > 3 ? { href: "/visit#reviews", label: "All reviews" } : undefined}
          />
          <Reviews className="mt-4" />
        </section>
      </div>
    </>
  );
}
