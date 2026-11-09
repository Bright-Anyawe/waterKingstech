import { MapPin } from "lucide-react";
import type { Metadata } from "next";
import { PortalBanner } from "@/components/sections/PortalBanner";
import { Reviews } from "@/components/sections/Reviews";
import { VisitShop } from "@/components/sections/VisitShop";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { business } from "@/data/business";
import { whatsappHref, whatsappMessages } from "@/lib/contact-links";

export const metadata: Metadata = {
  title: "Visit the shop — Circle Mall, Blue Gate, Gate 2 Exit",
  description:
    "Find WaterKingsTech at Circle Mall, Tip Toe Lane, Accra — Blue Gate, Gate 2 Exit. Live map, directions, contact details and customer reviews.",
  alternates: { canonical: "/visit" },
};

export default function VisitPage() {
  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Visit the shop" }]} />

      <div className="mt-4">
        <PortalBanner
          tone="white"
          title="Visit the shop"
          lead={`Come and see devices in person, get a repair checked or ask about installment. We're at ${business.location.address} — use the ${business.location.landmark}.`}
          icon={MapPin}
          points={["Live Google map", "See & test devices", "Repairs on site"]}
        />
      </div>

      <VisitShop className="mt-6" />

      <section id="reviews" aria-labelledby="reviews-title" className="mt-10 scroll-mt-32">
        <SectionHeader
          id="reviews-title"
          title="Customer reviews"
          description="Bought a device or had a repair with us? We'd love to hear about it."
        />
        <Reviews className="mt-4" />
        <ButtonLink href={whatsappHref(whatsappMessages.review)} variant="outline" icon={<WhatsAppIcon className="text-gift" />} className="mt-4">
          Share your experience
        </ButtonLink>
      </section>
    </div>
  );
}
