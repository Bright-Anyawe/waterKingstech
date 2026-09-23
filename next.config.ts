import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 75 is the default; 85 is used for the hero imagery only.
    qualities: [75, 85],
    remotePatterns: [
      // Royalty-free photography (Unsplash License). Replace with the shop's
      // own product photos in /public/images when they are available.
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
  poweredByHeader: false,
};

export default nextConfig;
