import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Montserrat } from "next/font/google";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { PromoTicker } from "@/components/layout/PromoTicker";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { ReferralCapture } from "@/components/referral/ReferralCapture";
import { business } from "@/data/business";
import { siteUrl } from "@/lib/site";
import { localBusinessJsonLd, toJsonLd } from "@/lib/structured-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Display face — its wide, heavy capitals echo the "WATER KINGS" wordmark. */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const title = `${business.name} — Phones, Laptops, Accessories & Repairs in Accra, Ghana`;
const description =
  "Shop UK used and brand new iPhones, Samsung phones, laptops, MacBooks and accessories at Circle Mall, Accra. Free gifts with every phone and laptop, 3-month warranty on UK used devices, installment plans, repairs and corporate bulk quotes.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s | ${business.name}`,
  },
  description,
  applicationName: business.name,
  keywords: [
    "WaterKingsTech",
    "phones in Ghana",
    "phones in Accra",
    "UK used phones",
    "UK used laptops",
    "iPhones in Ghana",
    "laptops in Ghana",
    "MacBooks in Ghana",
    "phone repair Accra",
    "laptop repair Accra",
    "installment phones Ghana",
    "bulk laptops for schools",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: business.name,
    title,
    description,
    locale: "en_GH",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#062a5c",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-GH"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased`}
    >
      <body className="min-h-dvh pb-action-bar">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(localBusinessJsonLd()) }}
        />
        <a
          href="#main"
          className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-lg bg-royal-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <PromoTicker />
          <SiteHeader />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <MobileActionBar />
          <ReferralCapture />
        </MotionProvider>
      </body>
    </html>
  );
}
