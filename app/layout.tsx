import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { Navbar } from "@/components/layout/Navbar";
import { MotionProvider } from "@/components/providers/MotionProvider";
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

const title = `${business.name} — Phones, Laptops, Accessories & Repairs in Accra, Ghana`;
const description =
  "Shop genuine smartphones, iPhones, Samsung phones, laptops, MacBooks and accessories at Circle Mall, Tip Toe Lane, Accra — or get professional phone and laptop repairs. Installment plans and referral commissions at WaterKingsTech.";

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
    "smartphones in Ghana",
    "iPhones in Ghana",
    "laptops in Ghana",
    "MacBooks in Ghana",
    "phone repair",
    "laptop repair",
    "phone accessories",
    "installment phones",
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
  themeColor: "#07090c",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GH" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-dvh bg-ink-950 pb-action-bar">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: toJsonLd(localBusinessJsonLd()) }}
        />
        <a
          href="#main"
          className="fixed top-3 left-3 z-[70] -translate-y-20 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-950 shadow-lg transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <FloatingWhatsApp />
          <MobileActionBar />
        </MotionProvider>
      </body>
    </html>
  );
}
