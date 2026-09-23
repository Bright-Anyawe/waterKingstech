/**
 * Public site URL, used for canonical URLs, the sitemap and Open Graph.
 * Set NEXT_PUBLIC_SITE_URL in the hosting environment once the domain is known.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
