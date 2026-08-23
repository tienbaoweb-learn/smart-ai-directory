// next.config.ts
import fs from "fs";
import path from "path";
import type { NextConfig } from "next";

// ── Legacy /ai-tools/:slug support ───────────────────────────────────────────
// Tool reviews used to live at /ai-tools/:slug and now live at /tools/:slug.
// We must only redirect slugs that actually resolve to a review, otherwise the
// redirect lands on a 404 — which Google reports as a "Redirect error".
// The list is read from the content directory so new reviews are covered
// automatically and retired ones stop redirecting.
function readReviewSlugs(): string[] {
  const dir = path.join(process.cwd(), "content/tools");
  let files: string[] = [];
  try {
    files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  } catch {
    return [];
  }
  const slugs = files.map((f) => {
    const raw = fs.readFileSync(path.join(dir, f), "utf8");
    const m = raw.match(/^slug:\s*"?([^"\n\r]+)"?\s*$/m);
    return (m ? m[1] : f.replace(/\.mdx$/, "")).trim();
  });
  return [...new Set(slugs)]
    // sample-tool is excluded from every listing, so it has no public page
    .filter((s) => s !== "sample-tool")
    // guard the regex alternation below against anything unexpected
    .filter((s) => /^[a-z0-9-]+$/.test(s));
}

// Old tool slugs that were renamed. Mapped straight to the final destination so
// a legacy URL never chains through a second redirect.
const LEGACY_TOOL_ALIASES: Record<string, string> = {
  jasper: "jasper-ai",
  twinmotion: "twinmotion-ai",
  "virtual-staging-ai": "virtualstagingai",
  "diedinhouse-com": "diedinhouse",
  "synthesia-io": "synthesia",
  "v-ray": "chaos-v-ray",
  reimaginehome: "reimagine-home",
};

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
    const reviewSlugs = readReviewSlugs();
    // An alias key must never also be a live review slug.
    const aliases = Object.entries(LEGACY_TOOL_ALIASES).filter(
      ([from]) => !reviewSlugs.includes(from),
    );

    return [
      // ── Renamed tool slugs: send both old paths straight to the final URL ──
      ...aliases.flatMap(([from, to]) => [
        { source: `/tools/${from}`, destination: `/tools/${to}`, permanent: true },
        { source: `/ai-tools/${from}`, destination: `/tools/${to}`, permanent: true },
      ]),

      // ── /ai-tools/:slug → /tools/:slug, but ONLY for slugs that have a
      //    review. Anything else 404s directly instead of redirecting to a 404.
      ...(reviewSlugs.length
        ? [
            {
              source: `/ai-tools/:slug(${reviewSlugs.join("|")})`,
              destination: "/tools/:slug",
              permanent: true,
            },
          ]
        : []),

      // ── Legacy WordPress URLs from the previous site ──
      { source: "/tag/:slug*", destination: "/tags", permanent: true },
      {
        source:
          "/unicorn-platform-2026-from-pioneer-to-ai-wizard-the-transformation-to-stay-ahead-of-the-curve",
        destination: "/resources",
        permanent: true,
      },

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
