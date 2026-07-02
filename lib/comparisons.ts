// ─────────────────────────────────────────────────────────────────────────────
// Comparisons data — "Tool A vs Tool B"
//
// Each entry references two EXISTING tool reviews by slug (content/tools/<slug>.mdx)
// and holds ONLY the editorial comparison content. Tool facts (name, pricing, url,
// affiliate link, rating, best-for) are pulled from the tool data at render time —
// never duplicate them here.
//
// Adding a new comparison = add one entry below (+ it auto-appears on both tool
// reviews via the review template's "head-to-head" block). Zero template edits.
// ─────────────────────────────────────────────────────────────────────────────

import type { IndustrySlug } from "./tools";

/** Which tool "wins" a round-by-round section. "tie" = too close to call. */
export type ComparisonEdge = "A" | "B" | "tie";

export interface ComparisonSection {
  body: string;
  edge: ComparisonEdge;
}

export interface ComparisonFaq {
  q: string;
  a: string;
}

export interface Comparison {
  /** URL slug: "toola-vs-toolb" → /compare/<slug> */
  slug: string;
  /** Existing tool review slugs (content/tools/<slug>.mdx). */
  toolASlug: string;
  toolBSlug: string;
  /** Industry niche → drives the Best Of hub link. */
  niche: IndustrySlug;
  /** One-line verdict for the hero. */
  verdict: string;
  /** 2–3 sentence TL;DR: best overall + best for a specific use case. */
  tldr: string;
  /** Round-by-round editorial sections. */
  sections: {
    features: ComparisonSection;
    pricing: ComparisonSection;
    easeOfUse: ComparisonSection;
    useCases: ComparisonSection;
  };
  /** "Choose A if …" bullets. */
  chooseA: string[];
  /** "Choose B if …" bullets. */
  chooseB: string[];
  faq: ComparisonFaq[];
  /** Optional: slugs of related comparisons to cross-link. */
  related?: string[];
  /** ISO date (YYYY-MM-DD); falls back to the newer of the two reviews. */
  lastUpdated?: string;
}

export const comparisons: Comparison[] = [
  {
    slug: "kreo-vs-togal-ai",
    toolASlug: "kreo",
    toolBSlug: "togal-ai",
    niche: "construction",
    verdict:
      "Both automate construction quantity takeoff with AI — Kreo goes wider with 3D BIM and integrated cost databases, while Togal.AI is the more focused, faster 2D PDF takeoff tool.",
    tldr: "Kreo and Togal.AI both use AI to compress the most time-consuming part of construction estimating: quantity takeoff. Togal.AI is the sharper choice for teams working almost entirely from 2D PDF drawing sets who want the fastest path from drawings to reviewable quantities. Kreo is the better fit when your takeoff runs off 3D BIM models and you want measurement and cost-database pricing in one cloud platform.",
    sections: {
      features: {
        body: "Both tools automatically identify and measure building elements — walls, slabs, openings, floor areas — from construction drawings, replacing hours of manual measurement. The key difference is scope. Kreo takes off from both 2D PDF drawings and 3D BIM model geometry, and connects to construction cost databases so a takeoff can flow into a cost estimate inside the same platform. Togal.AI concentrates on 2D PDF drawings, with strong automatic element recognition (distinguishing floor types, interior vs. exterior walls, opening types) and a built-in verification layer for reviewing and correcting AI measurements before export. Togal.AI is explicitly not built for BIM-based takeoff from 3D models.",
        edge: "A",
      },
      pricing: {
        body: "Neither vendor publishes standard, self-serve pricing in our data, so a direct price-for-price comparison isn't possible without confirming current quotes. What the reviews do note: Kreo is positioned at enterprise tier, which may not suit smaller subcontractors or independent estimators. Togal.AI's value case is framed around bid volume — time recovered per bid multiplied by bids per month. For both, value scales with how much manual takeoff time you're currently spending.",
        edge: "tie",
      },
      easeOfUse: {
        body: "Both platforms carry an initial learning curve and require estimator review of AI output — neither is fully autonomous. Togal.AI's workflow is narrower and therefore more direct: upload a PDF, let the AI measure, verify in the review layer, export to your estimating software. Kreo covers more ground (2D, BIM, cost databases, cloud collaboration), which is powerful but means more surface area to learn, especially for teams moving off legacy or manual workflows.",
        edge: "B",
      },
      useCases: {
        body: "Togal.AI fits high-volume estimating teams competing for commercial work with large 2D drawing sets, where raw takeoff speed and bid throughput matter most. Kreo fits mid-to-large contractors and preconstruction departments that work with BIM models and want collaborative, cloud-based estimating with a path from quantities to priced estimates. The dividing line is largely 2D-first vs. BIM-inclusive workflows.",
        edge: "tie",
      },
    },
    chooseA: [
      "You run takeoffs from 3D BIM models, not just 2D PDF drawings",
      "You want quantity takeoff and cost-database pricing in one cloud platform",
      "You manage a mid-to-large estimating team that needs collaborative, cloud-based workflows",
    ],
    chooseB: [
      "Your work is primarily 2D PDF drawing sets, especially commercial bids",
      "You want the fastest path from drawings to reviewable quantities, with a built-in verification layer",
      "You need to export measured quantities straight into your existing estimating software or spreadsheets",
    ],
    faq: [
      {
        q: "What's the main difference between Kreo and Togal.AI?",
        a: "Both automate AI quantity takeoff, but Kreo also extracts quantities from 3D BIM models and integrates construction cost databases so takeoff can flow into a cost estimate in one platform. Togal.AI focuses on fast 2D PDF takeoff with automatic element recognition and a verification layer for reviewing measurements before export.",
      },
      {
        q: "Which is better for BIM-based takeoff?",
        a: "Kreo. It can extract quantities directly from 3D BIM model geometry, whereas Togal.AI is built for 2D PDF drawings and is not intended for BIM-based takeoff.",
      },
      {
        q: "Does either tool replace an estimator?",
        a: "No. Both automate measurement, not pricing judgment. AI takeoff output requires estimator review and verification before it's used in a live bid — the intended model is AI handles measurement, the estimator handles verification and cost strategy.",
      },
      {
        q: "Which one is cheaper?",
        a: "Neither vendor publishes standard pricing in our data, so we can't state a price winner without a current quote. Kreo is described as enterprise-tier; confirm live pricing directly with each vendor for your team size and bid volume.",
      },
      {
        q: "Are they worth it for small residential contractors?",
        a: "Both are aimed at higher-volume and commercial estimating, where manual takeoff on large drawing sets is a real bottleneck. On small residential projects where manual takeoff is quick, the time savings — and the return on either tool — are smaller.",
      },
    ],
    related: [],
  },
  {
    slug: "roomgpt-vs-interior-ai",
    toolASlug: "roomgpt",
    toolBSlug: "interior-ai",
    niche: "interior-design",
    verdict:
      "RoomGPT and InteriorAI both redesign a room from a single photo, but RoomGPT wins on simple, low-cost homeowner redesigns while InteriorAI is the professional pick for virtual staging and client-facing work.",
    tldr: "RoomGPT and InteriorAI both reimagine a room from one photo, but they target different users. RoomGPT is the simplest, most affordable option — upload, pick a style, generate — ideal for homeowners visualising a refresh. InteriorAI is the more professional tool, with multiple modes including virtual staging, a larger style library, and licensing aimed at real estate agents and designers. Best for homeowners and simplicity: RoomGPT. Best for real estate staging and professional work: InteriorAI.",
    sections: {
      features: {
        body: "RoomGPT does one thing well — interior room redesign through a minimal, no-settings interface with solid output quality on common styles. InteriorAI is broader: a dedicated virtual staging mode, extra style options, and features built for professional deliverables. If you only need to reimagine an existing room, RoomGPT covers it; if you stage empty listings or need varied modes, InteriorAI does more.",
        edge: "tie",
      },
      pricing: {
        body: "RoomGPT is the budget option, with a low entry point and a free tier to try it. InteriorAI is priced at a premium relative to RoomGPT for comparable base redesign quality — you're paying for the extra modes, larger style library, and professional licensing, not necessarily sharper renders. For a one-off home project, RoomGPT is the cheaper call; for a professional billing the tool to client work, InteriorAI is easier to justify.",
        edge: "A",
      },
      easeOfUse: {
        body: "RoomGPT has one of the simplest interfaces in the category — no advanced settings, masks, or prompts to learn. InteriorAI exposes more controls and modes, which adds capability but a short learning curve. For non-technical homeowners, RoomGPT is the faster path to a result; for users who want control, InteriorAI rewards the extra clicks.",
        edge: "A",
      },
      useCases: {
        body: "RoomGPT fits homeowners and renters who want to quickly visualise a room in different styles at the lowest cost. InteriorAI fits real estate agents staging listings and interior designers who need multiple modes, more styles, and professional licensing.",
        edge: "tie",
      },
    },
    chooseA: [
      "You're a homeowner or renter",
      "You want the simplest possible workflow",
      "You only need interior redesign",
      "Lowest cost is the priority",
    ],
    chooseB: [
      "You're a real estate agent staging listings",
      "You're an interior designer needing pro features",
      "You need virtual staging and more output modes",
      "You need professional licensing and more styles",
    ],
    faq: [
      {
        q: "Is RoomGPT or InteriorAI better for real estate virtual staging?",
        a: "InteriorAI — it has a dedicated virtual staging mode and licensing built for listing work, whereas RoomGPT focuses on redesigning existing rooms.",
      },
      {
        q: "Is RoomGPT cheaper than InteriorAI?",
        a: "Yes. RoomGPT is the more budget-friendly option with a free tier, while InteriorAI charges a premium for its extra modes, larger style library, and professional licensing.",
      },
      {
        q: "Which one should a homeowner start with?",
        a: "RoomGPT. Its no-settings, low-cost workflow is the fastest way for a homeowner to visualise a room in different styles. If you later need virtual staging or more output modes, InteriorAI is the broader tool.",
      },
    ],
    related: [],
  },
];

// ── Accessors ────────────────────────────────────────────────────────────────

export function getAllComparisons(): Comparison[] {
  return comparisons;
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}

/** Every comparison that features the given tool slug (for reverse links). */
export function getComparisonsForTool(toolSlug: string): Comparison[] {
  return comparisons.filter(
    (c) => c.toolASlug === toolSlug || c.toolBSlug === toolSlug
  );
}
