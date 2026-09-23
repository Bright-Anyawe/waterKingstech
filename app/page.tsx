import { CategoryShowcase } from "@/components/sections/CategoryShowcase";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { InstallmentSection } from "@/components/sections/InstallmentSection";
import { LocationSection } from "@/components/sections/LocationSection";
import { ProductCatalog } from "@/components/sections/ProductCatalog";
import { ReferralSection } from "@/components/sections/ReferralSection";
import { RepairServices } from "@/components/sections/RepairServices";
import { Testimonials } from "@/components/sections/Testimonials";
import { TrustStrip } from "@/components/sections/TrustStrip";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <CategoryShowcase />
      <FeaturedProducts />
      <ProductCatalog />
      <RepairServices />
      <InstallmentSection />
      <ReferralSection />
      <Testimonials />
      <LocationSection />
      <ContactCTA />
    </>
  );
}
