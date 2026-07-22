// ─────────────────────────────────────────────────────────────────────────────
// Alternatives pages — "Best <Tool> Alternatives"
//
// Each entry references ONE existing incumbent tool review + 3-5 existing
// alternative tool reviews (all by slug, content/tools/<slug>.mdx) and holds
// ONLY the editorial comparison content. Tool facts (name, pricing, url,
// affiliate link, rating, logo) are pulled from lib/tools.ts at render time —
// never duplicate them here.
//
// Adding a new alternatives page = add one entry below. Zero template edits.
// ─────────────────────────────────────────────────────────────────────────────

export interface AlternativeChoice {
  /** Must match a slug in alternativeSlugs. */
  slug: string;
  /** "Choose X if ..." editorial paragraph. */
  body: string;
}

export interface AlternativeComparisonRow {
  /** Must match a slug in alternativeSlugs. */
  slug: string;
  styleRange: string;
  outputQuality: string;
  /** 1-5 stars. */
  professionalWorkflow: number;
  /** 1-5 stars. */
  easeOfUse: number;
  pricing: string;
}

export interface AlternativesEntry {
  /** URL slug: same as the incumbent tool's slug → /alternatives/<slug> */
  incumbentSlug: string;
  /** 2-3 sentence intro: what the incumbent is + why people look for alternatives. */
  shortDescription: string;
  /** Existing tool review slugs (content/tools/<slug>.mdx), 3-5 tools. */
  alternativeSlugs: string[];
  /** "Choose <alternative> if ..." bullets, one per alternative. */
  chooseIf: AlternativeChoice[];
  /** Quick-comparison table rows, one per alternative. */
  comparisonRows: AlternativeComparisonRow[];
  /** ISO date (YYYY-MM-DD). */
  lastUpdated: string;
}

export const alternativesEntries: AlternativesEntry[] = [
  {
    incumbentSlug: "planner-5d",
    shortDescription:
      "Planner 5D is a freemium home and interior design planner known for 2D floor plans and 3D room visualization aimed at homeowners and DIY users. People search for alternatives when they need more professional-grade rendering, AI-assisted design generation, or tools built for working with real furniture/product catalogs rather than a generic planner.",
    alternativeSlugs: ["homestyler", "foyr", "collov-ai", "roomgpt", "sofabrain"],
    chooseIf: [
      {
        slug: "homestyler",
        body: "Choose Homestyler if you want a full interior design platform rather than a one-shot AI restyle — it supports 2D/3D floor plans, furniture placement from a large library, and AI room redesign together. The trade-off is a steeper learning curve and slower AI rendering than AI-only tools. Freemium with subscription tiers.",
      },
      {
        slug: "foyr",
        body: "Choose Foyr Neo if you're a professional designer who needs the full pipeline — floor plan, 3D visualization, and photorealistic render in one workflow, with more material and lighting control than any AI-restyle tool here. It's the least beginner-friendly option and the most expensive, priced as premium professional SaaS.",
      },
      {
        slug: "collov-ai",
        body: "Choose Collov AI if you want AI redesign with better style consistency than RoomGPT, plus multi-round AI editing (furniture swaps, virtual staging, some shoppable furniture) through a chatbot-style workflow. Furniture scale can be occasionally off and rendering is slower. Mid-tier pricing, roughly $15–20/month based on public reviews.",
      },
      {
        slug: "roomgpt",
        body: "Choose RoomGPT if you just want the fastest, simplest entry point — upload one photo, pick a style, get a redesign in under a minute, with a free tier. You give up layout and furniture/material control, and output quality varies; treat it as inspiration, not a buildable design.",
      },
      {
        slug: "sofabrain",
        body: "Choose SofaBrain if your priority is virtual staging or swapping furniture in an existing room photo while keeping the room's structure — built more for realtors and furniture retailers than interior designers. It doesn't offer floor-plan design or a full design workflow like Foyr or Homestyler. Priced by render volume.",
      },
    ],
    comparisonRows: [
      {
        slug: "foyr",
        styleRange: "Visualization-focused",
        outputQuality: "Best for client presentation",
        professionalWorkflow: 5,
        easeOfUse: 2,
        pricing: "Premium",
      },
      {
        slug: "homestyler",
        styleRange: "Wide + manual design",
        outputQuality: "Very good (3D workflow)",
        professionalWorkflow: 4,
        easeOfUse: 3,
        pricing: "Mid-tier",
      },
      {
        slug: "collov-ai",
        styleRange: "Consistent, staging-leaning",
        outputQuality: "Good for marketing/staging",
        professionalWorkflow: 3,
        easeOfUse: 4,
        pricing: "Mid-tier",
      },
      {
        slug: "sofabrain",
        styleRange: "Furniture/staging-focused",
        outputQuality: "Good for staging, less control",
        professionalWorkflow: 2,
        easeOfUse: 4,
        pricing: "Mid-tier",
      },
      {
        slug: "roomgpt",
        styleRange: "Wide, restyle-only",
        outputQuality: "Variable",
        professionalWorkflow: 1,
        easeOfUse: 5,
        pricing: "Free / low-cost",
      },
    ],
    lastUpdated: "2026-07-22",
  },
];

export function getAllAlternativesSlugs(): string[] {
  return alternativesEntries.map((e) => e.incumbentSlug);
}

export function getAlternativesBySlug(slug: string): AlternativesEntry | null {
  return alternativesEntries.find((e) => e.incumbentSlug === slug) ?? null;
}
