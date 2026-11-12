import { Coins } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PortalBanner } from "@/components/sections/PortalBanner";
import { InstallmentPanel, ReferralPanel } from "@/components/sections/Programs";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Installment plans & referral commission",
  description:
    "Buy any phone, a MacBook or an iPad on installment, or earn GH₵ 50 – GH₵ 400 commission for every buyer you refer to WaterKingsTech.",
  alternates: { canonical: "/referral-installment" },
};

export default function ReferralInstallmentPage() {
  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Installment & Referral" }]} />

      <div className="mt-4">
        <PortalBanner
          title="Referral & installment hub"
          lead="Two ways to win: get your device now and pay over time, or earn cash for every buyer you send our way."
          icon={Coins}
        >
          <nav aria-label="On this page" className="flex flex-wrap gap-2">
            <Link href="#installment" className="inline-flex h-10 items-center rounded-lg bg-white px-4 text-sm font-bold text-royal-700 hover:bg-royal-50">
              Installment plans
            </Link>
            <Link href="#referral" className="inline-flex h-10 items-center rounded-lg bg-orange px-4 text-sm font-bold text-ink hover:bg-orange-strong">
              Referral commission
            </Link>
          </nav>
        </PortalBanner>
      </div>

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
        <InstallmentPanel />
        <ReferralPanel />
      </div>
    </div>
  );
}
