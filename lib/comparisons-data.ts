export interface Comparison {
  slug: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  toolA: { name: string; logo: { bg: string; text: string } };
  toolB: { name: string; logo: { bg: string; text: string } };
  focus?: string; // key aspects for latest table
  date: string;
  readTime: string;
  tags: string[];
  href: string;
  isFeatured: boolean;
}

// Listing metadata for the /resources/comparisons hub. Cards link to the
// data-driven detail pages at /compare/<slug> (see lib/comparisons.ts, which
// holds the editorial content and pulls hard facts from lib/tools.ts).
//
// NOTE: this file is imported by a CLIENT component (tags/[slug]), so it must
// stay static — it cannot import lib/tools.ts (fs). Tool display name + logo
// initials are listing chrome only; hard facts (pricing/rating) live in the
// detail pages, single-sourced from the tool data.
export const comparisonsData: Comparison[] = [
  // ── Featured ──────────────────────────────────────────────────────────────
  {
    slug: "kreo-vs-togal-ai",
    title: "Kreo vs Togal.AI",
    description: "Two AI construction takeoff tools compared: BIM-inclusive vs 2D-first automation.",
    category: "Construction",
    badge: "CONSTRUCTION",
    toolA: { name: "Kreo",     logo: { bg: "bg-blue-600",  text: "K"  } },
    toolB: { name: "Togal.AI", logo: { bg: "bg-amber-600", text: "TA" } },
    date: "Jul 2, 2026",
    readTime: "7 min read",
    tags: ["construction", "construction-estimating"],
    href: "/compare/kreo-vs-togal-ai",
    isFeatured: true,
  },
  {
    slug: "roomgpt-vs-interior-ai",
    title: "RoomGPT vs InteriorAI",
    description: "Simple, low-cost room redesign vs professional AI virtual staging.",
    category: "Interior Design",
    badge: "INTERIOR",
    toolA: { name: "RoomGPT",    logo: { bg: "bg-purple-600", text: "R"  } },
    toolB: { name: "InteriorAI", logo: { bg: "bg-rose-600",   text: "IA" } },
    date: "Jul 2, 2026",
    readTime: "6 min read",
    tags: ["interior-design"],
    href: "/compare/roomgpt-vs-interior-ai",
    isFeatured: true,
  },
  {
    slug: "architectgpt-vs-sketchup-diffusion",
    title: "ArchitectGPT vs SketchUp Diffusion",
    description: "Render from any image vs render straight from your SketchUp model.",
    category: "Architecture",
    badge: "ARCHITECTURE",
    toolA: { name: "ArchitectGPT",       logo: { bg: "bg-blue-700",   text: "AG" } },
    toolB: { name: "SketchUp Diffusion", logo: { bg: "bg-indigo-600", text: "SD" } },
    date: "Jul 2, 2026",
    readTime: "6 min read",
    tags: ["architecture", "ai-rendering"],
    href: "/compare/architectgpt-vs-sketchup-diffusion",
    isFeatured: true,
  },
  {
    slug: "interior-ai-vs-homestyler",
    title: "InteriorAI vs Homestyler",
    description: "Fast AI restyling and staging vs a full 3D design suite with a furniture library.",
    category: "Interior Design",
    badge: "INTERIOR",
    toolA: { name: "InteriorAI", logo: { bg: "bg-rose-600",    text: "IA" } },
    toolB: { name: "Homestyler", logo: { bg: "bg-emerald-600", text: "H"  } },
    date: "Jul 2, 2026",
    readTime: "6 min read",
    tags: ["interior-design"],
    href: "/compare/interior-ai-vs-homestyler",
    isFeatured: true,
  },

  // ── Latest ────────────────────────────────────────────────────────────────
  {
    slug: "kreo-vs-stack",
    title: "Kreo vs STACK",
    description: "AI-native takeoff vs the mature, deep-library estimating platform.",
    category: "Construction",
    badge: "CONSTRUCTION",
    toolA: { name: "Kreo",  logo: { bg: "bg-blue-600",  text: "K"  } },
    toolB: { name: "STACK", logo: { bg: "bg-slate-700", text: "ST" } },
    focus: "Takeoff automation, assembly library, pricing tier",
    date: "Jul 2, 2026",
    readTime: "6 min read",
    tags: ["construction", "construction-estimating"],
    href: "/compare/kreo-vs-stack",
    isFeatured: false,
  },
  {
    slug: "togal-ai-vs-stack",
    title: "Togal.AI vs STACK",
    description: "AI-first takeoff specialist vs a broader takeoff-and-estimating platform.",
    category: "Construction",
    badge: "CONSTRUCTION",
    toolA: { name: "Togal.AI", logo: { bg: "bg-amber-600", text: "TA" } },
    toolB: { name: "STACK",    logo: { bg: "bg-slate-700", text: "ST" } },
    focus: "Measurement automation, workflow breadth, pricing",
    date: "Jul 2, 2026",
    readTime: "6 min read",
    tags: ["construction", "construction-estimating"],
    href: "/compare/togal-ai-vs-stack",
    isFeatured: false,
  },
  {
    slug: "structurely-vs-roof-ai",
    title: "Structurely vs Roof AI",
    description: "AI inside-sales agent for multi-channel nurture vs an MLS-aware website chatbot.",
    category: "Real Estate",
    badge: "REAL ESTATE",
    toolA: { name: "Structurely", logo: { bg: "bg-indigo-600", text: "S"  } },
    toolB: { name: "Roof AI",     logo: { bg: "bg-teal-600",   text: "RA" } },
    focus: "Lead capture vs nurture, channels, pricing model",
    date: "Jul 2, 2026",
    readTime: "6 min read",
    tags: ["real-estate", "lead-generation"],
    href: "/compare/structurely-vs-roof-ai",
    isFeatured: false,
  },
  {
    slug: "maket-vs-architectgpt",
    title: "Maket vs ArchitectGPT",
    description: "AI floor plan generation vs AI rendering — two stages of the design workflow.",
    category: "Architecture",
    badge: "ARCHITECTURE",
    toolA: { name: "Maket",        logo: { bg: "bg-orange-600", text: "M"  } },
    toolB: { name: "ArchitectGPT", logo: { bg: "bg-blue-700",   text: "AG" } },
    focus: "Layout generation vs styled rendering, workflow stage",
    date: "Jul 2, 2026",
    readTime: "5 min read",
    tags: ["architecture", "ai-floor-plan"],
    href: "/compare/maket-vs-architectgpt",
    isFeatured: false,
  },
  {
    slug: "lofty-vs-ylopo",
    title: "Lofty vs Ylopo",
    description: "All-in-one real estate platform vs a dedicated marketing and lead-gen layer.",
    category: "Real Estate",
    badge: "REAL ESTATE",
    toolA: { name: "Lofty", logo: { bg: "bg-blue-600",  text: "L"  } },
    toolB: { name: "Ylopo", logo: { bg: "bg-purple-600", text: "Y" } },
    focus: "All-in-one vs marketing layer, pricing, CRM fit",
    date: "Jul 2, 2026",
    readTime: "6 min read",
    tags: ["real-estate", "lead-generation"],
    href: "/compare/lofty-vs-ylopo",
    isFeatured: false,
  },
  {
    slug: "rechat-vs-lofty",
    title: "Rechat vs Lofty",
    description: "CRM with AI marketing and transactions vs an all-in-one agent platform.",
    category: "Real Estate",
    badge: "REAL ESTATE",
    toolA: { name: "Rechat", logo: { bg: "bg-slate-800", text: "RC" } },
    toolB: { name: "Lofty",  logo: { bg: "bg-blue-600",  text: "L"  } },
    focus: "Brokerage CRM vs all-in-one, lead gen, pricing",
    date: "Jul 2, 2026",
    readTime: "6 min read",
    tags: ["real-estate"],
    href: "/compare/rechat-vs-lofty",
    isFeatured: false,
  },
];
