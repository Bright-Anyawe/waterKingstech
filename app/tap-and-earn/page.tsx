import { Coins, Flame, Laptop, Smartphone } from "lucide-react";
import type { Metadata } from "next";
import { TapEarnProfile } from "@/components/referral/TapEarnProfile";
import { PortalBanner } from "@/components/sections/PortalBanner";
import { ReferralPanel } from "@/components/sections/Programs";
import { ButtonLink } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { referral } from "@/data/programs";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Tap & Earn — share an item, earn GH₵ 50 – GH₵ 400",
  description:
    "Tap & Earn with WaterKingsTech: share any phone, laptop or accessory on WhatsApp. When your friend buys, you earn a commission of GH₵ 50 – GH₵ 400.",
  alternates: { canonical: "/tap-and-earn" },
};

const steps = [
  { title: "Tap “Tap & Earn”", body: "It's on every item in the shop — phones, laptops and accessories." },
  { title: "Share on WhatsApp", body: "Send the link to friends, family or your status. Your name is in the link." },
  { title: "They buy", body: "When they order through your link, their WhatsApp message names you." },
  { title: "You earn", body: "WaterKingsTech confirms the sale and pays your commission." },
];

export default function TapAndEarnPage() {
  const { min, max } = referral.commission;

  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Tap & Earn" }]} />

      <div className="mt-4">
        <PortalBanner
          tone="orange"
          title="Tap & Earn"
          lead={`Share any item on WhatsApp. When your friend buys, you earn ${formatPrice(min)} – ${formatPrice(max)}.`}
          icon={Coins}
          points={["One tap to share", "Your name goes in the link", "Earn on every sale"]}
        />
      </div>

      <section aria-labelledby="tap-how-title" className="mt-8">
        <h2 id="tap-how-title" className="font-display text-xl font-bold text-ink sm:text-2xl">
          How Tap &amp; Earn works
        </h2>
        <ol className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="flex gap-3 rounded-xl border border-ice-200 bg-white p-4">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-orange font-display text-sm font-extrabold text-ink">
                {index + 1}
              </span>
              <div>
                <p className="font-semibold text-ink">{step.title}</p>
                <p className="mt-0.5 text-sm text-ink-muted">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="mt-8 grid items-start gap-4 lg:grid-cols-[1.2fr_1fr]">
        <section aria-labelledby="tap-join-title" className="rounded-xl border border-ice-200 bg-white p-5 sm:p-7">
          <h2 id="tap-join-title" className="font-display text-2xl font-extrabold tracking-[-0.02em] text-ink">
            Join Tap &amp; Earn
          </h2>
          <p className="mt-1 mb-6 text-sm text-ink-muted">Set your name once. Registering on WhatsApp tells the shop where to send your commission.</p>
          <TapEarnProfile />

          <div className="mt-6 border-t border-ice-200 pt-5">
            <p className="text-sm font-semibold text-ink">Start sharing</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <ButtonLink href="/deals" variant="orange" size="sm" icon={<Flame />}>
                Hot deals
              </ButtonLink>
              <ButtonLink href="/shop/phones" variant="outline" size="sm" icon={<Smartphone />}>
                Phones
              </ButtonLink>
              <ButtonLink href="/shop/laptops" variant="outline" size="sm" icon={<Laptop />}>
                Laptops
              </ButtonLink>
            </div>
          </div>
        </section>

        <ReferralPanel />
      </div>
    </div>
  );
}
