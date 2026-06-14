// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "midjourney.com",
      },
    ],
  },
  async redirects() {
    return [
      // Specific redirect for the only Jasper review that existed at /ai-tools/jasper
      {
        source: "/ai-tools/jasper",
        destination: "/tools/jasper-ai",
        permanent: true,
      },
      // Catch-all: any other /ai-tools/:slug → /tools/:slug
      {
        source: "/ai-tools/:slug",
        destination: "/tools/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
