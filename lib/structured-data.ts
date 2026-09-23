import { business } from "@/data/business";
import { contact } from "@/data/contact";
import { siteUrl } from "@/lib/site";

/**
 * schema.org ElectronicsStore data for local SEO. Only fields that have been
 * supplied are included — add the address, phone and hours in /data and they
 * appear here automatically.
 */
export function localBusinessJsonLd() {
  const { location, openingHours } = business;

  const address: Record<string, string> = {
    "@type": "PostalAddress",
    addressCountry: business.countryCode,
  };
  if (location.address) address.streetAddress = location.address;
  if (location.city) address.addressLocality = location.city;
  if (location.region) address.addressRegion = location.region;

  return {
    "@context": "https://schema.org",
    "@type": "ElectronicsStore",
    "@id": `${siteUrl}/#business`,
    name: business.name,
    description: business.description,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    address,
    ...(contact.phone ? { telephone: contact.phone } : {}),
    ...(contact.email ? { email: contact.email } : {}),
    ...(location.coordinates
      ? { geo: { "@type": "GeoCoordinates", latitude: location.coordinates.lat, longitude: location.coordinates.lng } }
      : {}),
    ...(location.mapsUrl ? { hasMap: location.mapsUrl } : {}),
    ...(openingHours ? { openingHours: openingHours.map((row) => `${row.days} ${row.hours}`) } : {}),
    ...(contact.socials.length ? { sameAs: contact.socials.map((s) => s.href) } : {}),
    areaServed: { "@type": "Country", name: business.country },
    knowsAbout: ["Smartphones", "Laptops", "Computer accessories", "Phone repair", "Laptop repair"],
  };
}

/** Serialises JSON-LD safely for a <script> tag. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
