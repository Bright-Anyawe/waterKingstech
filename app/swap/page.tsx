import { ArrowLeftRight, HandCoins } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { PortalBanner } from "@/components/sections/PortalBanner";
import { SwapForm } from "@/components/swap/SwapForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Pending } from "@/components/ui/Pending";
import { swap } from "@/data/offers";

export const metadata: Metadata = {
  title: "Swap your phone or laptop — trade in & upgrade",
  description:
    "Swap your old phone or laptop at WaterKingsTech, Circle Mall, Accra. Tell us what you have and what you want, and we'll tell you what to add.",
  alternates: { canonical: "/swap" },
};

const steps = [
  { title: "Tell us what you have", body: "Your device, its condition and what you'd like in exchange." },
  { title: "Bring it to the shop", body: "We check your device at Circle Mall — Blue Gate, Gate 2 Exit." },
  { title: "Get its swap value", body: "We tell you what it's worth towards your next device." },
  { title: "Add the difference", body: "Pay the balance — negotiable — and leave with your upgrade." },
];

export default function SwapPage() {
  return (
    <div className="container-x pt-4 sm:pt-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Swap" }]} />

      <div className="mt-4">
        <PortalBanner
          title="Swap & upgrade"
          lead="Trade in your old phone or laptop towards a UK used or brand new one. Prices are negotiable, so there's always room to agree."
          icon={ArrowLeftRight}
          points={["Phones & laptops", "Swap for UK used or brand new", "Checked at the shop"]}
        />
      </div>

      <div className="mt-6 grid items-start gap-4 lg:grid-cols-[1.5fr_1fr]">
        <section aria-labelledby="swap-form-title" className="rounded-xl border border-ice-200 bg-white p-5 sm:p-7">
          <h2 id="swap-form-title" className="font-display text-2xl font-extrabold tracking-[-0.02em] text-ink">
            Request a swap
          </h2>
          <p className="mt-1 mb-6 text-sm text-ink-muted">A few details help us tell you what to add before you come in.</p>
          <SwapForm />
        </section>

        <aside aria-label="How swapping works" className="flex flex-col gap-3 lg:sticky lg:top-32">
          <section aria-labelledby="swap-how-title" className="rounded-xl border border-ice-200 bg-white p-5">
            <h2 id="swap-how-title" className="font-display text-lg font-bold text-ink">
              How swapping works
            </h2>
            <ol className="mt-4 flex flex-col gap-4">
              {steps.map((step, index) => (
                <li key={step.title} className="flex gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-royal-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{step.title}</p>
                    <p className="text-sm text-ink-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-5 border-t border-ice-200 pt-4 text-sm text-ink-soft">
              <p className="font-semibold text-ink">Swap terms</p>
              <div className="mt-1.5">{swap.terms ?? <Pending>Terms &amp; how devices are valued to be supplied</Pending>}</div>
            </div>
          </section>

          <section aria-labelledby="swap-browse-title" className="rounded-xl bg-navy p-5 text-white">
            <h2 id="swap-browse-title" className="flex items-center gap-2 font-display text-lg font-bold">
              <HandCoins className="size-5 text-cyan" aria-hidden="true" />
              Choose what you want
            </h2>
            <p className="mt-1 text-sm text-white/75">Pick a device, then tap &ldquo;Swap your device for this&rdquo; on its page.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                { href: "/shop/phones", label: "Phones" },
                { href: "/shop/laptops", label: "Laptops" },
                { href: "/uk-used", label: "UK Used" },
                { href: "/brand-new", label: "Brand New" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="rounded-full bg-white/10 px-3.5 py-1.5 text-sm font-semibold hover:bg-white hover:text-navy">
                  {link.label}
                </Link>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
