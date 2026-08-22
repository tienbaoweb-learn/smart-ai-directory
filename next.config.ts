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
        hostname: "plus.unsplash.com",
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
      // Redirect individual tool slugs to /tools/:slug, but exclude the 5 category pages
      {
        source: "/ai-tools/:slug((?!design|content-marketing|automation|sales|productivity).+)",
        destination: "/tools/:slug",
        permanent: true,
      },

      // ── Legacy WordPress URLs from the previous site ──
      { source: "/tag/:slug*", destination: "/tags", permanent: true },
      {
        source:
          "/unicorn-platform-2026-from-pioneer-to-ai-wizard-the-transformation-to-stay-ahead-of-the-curve",
        destination: "/resources",
        permanent: true,
      },

      // ── Tool reviews that now live under a corrected slug ──
      { source: "/tools/twinmotion", destination: "/tools/twinmotion-ai", permanent: true },
      { source: "/tools/virtual-staging-ai", destination: "/tools/virtualstagingai", permanent: true },
      { source: "/tools/diedinhouse-com", destination: "/tools/diedinhouse", permanent: true },
      { source: "/tools/synthesia-io", destination: "/tools/synthesia", permanent: true },
      { source: "/tools/v-ray", destination: "/tools/chaos-v-ray", permanent: true },

      // ── Comparison hub moved under /resources ──
      { source: "/compare", destination: "/resources/comparisons", permanent: true },

      // ── Retired placeholder case studies → the real study on the same topic ──
      {
        source: "/resources/case-studies/buildsmart-saves-1200-hours-monthly",
        destination: "/resources/case-studies/case-study-construction-buildsmart",
        permanent: true,
      },
      {
        source: "/resources/case-studies/how-studio-luxe-cut-rendering-time",
        destination: "/resources/case-studies/case-study-interior-design-studio-nova",
        permanent: true,
      },
      {
        source: "/resources/case-studies/ai-design-tools-helped-win-competitions",
        destination: "/resources/case-studies/case-study-architecture-archvision",
        permanent: true,
      },
      {
        source: "/resources/case-studies/automating-content-creation-10x-output",
        destination: "/resources/case-studies",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
