export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  level: string; // "Beginner" | "Beginner to Intermediate" | "Intermediate" | "Advanced" | "No-code"
  badge: string; // Topic badge for list rows (PROMPTS, AUTOMATION…); featured cards derive their badge from `level`
  imageHint: string;
  thumbnail?: string; // real cover image; placeholders render a gray box
  duration: string;
  steps?: number; // step-by-step tutorials only; omit for prompt-template tutorials
  date: string;
  tags: string[];
  href: string;
  isFeatured: boolean;
  /** Placeholder entries have no detail page yet — never link them and keep them out of the search index. */
  isPlaceholder?: boolean;
}

export const tutorialsData: Tutorial[] = [
  // ── Real tutorials ──────────────────────────────────────────────────────────
  {
    slug: "chatgpt-claude-prompts-aec",
    title: "Writing Effective ChatGPT & Claude Prompts for Design & Construction Work",
    description: "Six copy-and-adapt prompt templates for proposals, listing descriptions, and client updates — plus the five principles that make any prompt work.",
    level: "Beginner to Intermediate",
    badge: "PROMPTS",
    imageHint: "prompt templates for design and construction work",
    thumbnail: "/images/tutorials/tutorial-chatgpt-claude-prompts-aec.webp",
    duration: "7 min",
    date: "Jul 9, 2026",
    tags: ["chatgpt", "prompt-engineering", "ai-writing"],
    href: "/resources/tutorials/chatgpt-claude-prompts-aec",
    isFeatured: true,
  },
  {
    slug: "chatgpt-construction-estimating",
    title: "Using ChatGPT to Speed Up Construction Estimating & Documentation",
    description: "Five safe prompt templates for scope checklists, bid documents, and site reports — and a clear line on what ChatGPT must never be used for in estimating.",
    level: "Beginner to Intermediate",
    badge: "PROMPTS",
    imageHint: "contractor using ChatGPT for estimating documentation",
    thumbnail: "/images/tutorials/tutorial-chatgpt-construction-estimating.webp",
    duration: "7 min",
    date: "Jul 9, 2026",
    tags: ["chatgpt", "prompt-engineering", "ai-for-business"],
    href: "/resources/tutorials/chatgpt-construction-estimating",
    isFeatured: true,
  },

  // ── Featured placeholders ─── TODO: replace with real data ──────────────────
  {
    slug: "getting-started-with-chatgpt-beginners-guide",
    title: "Getting Started with ChatGPT: A Complete Beginner's Guide",
    description: "Learn the basics of prompting, settings, and use cases for ChatGPT.",
    level: "Beginner",
    badge: "BEGINNER",
    imageHint: "ChatGPT interface on laptop screen",
    duration: "12 min",
    steps: 8,
    date: "Jun 10, 2026",
    tags: ["chatgpt", "productivity"],
    href: "/resources/tutorials/getting-started-with-chatgpt-beginners-guide",
    isFeatured: true,
    isPlaceholder: true,
  },
  {
    slug: "build-first-zapier-automation-step-by-step",
    title: "Build Your First Zapier Automation Step by Step",
    description: "Connect your favorite apps and automate repetitive tasks with Zapier.",
    level: "Intermediate",
    badge: "INTERMEDIATE",
    imageHint: "automation workflow diagram on screen",
    duration: "15 min",
    steps: 10,
    date: "Jun 8, 2026",
    tags: ["automation", "no-code"],
    href: "/resources/tutorials/build-first-zapier-automation-step-by-step",
    isFeatured: true,
    isPlaceholder: true,
  },

  // ── Latest placeholders ─── TODO: replace with real data ────────────────────
  {
    slug: "connect-chatgpt-to-google-sheets-with-zapier",
    title: "How to Connect ChatGPT to Google Sheets with Zapier",
    description: "",
    level: "Beginner",
    badge: "AUTOMATION",
    imageHint: "Google Sheets with ChatGPT integration",
    duration: "12 min",
    steps: 8,
    date: "May 20, 2026",
    tags: ["chatgpt", "automation", "no-code"],
    href: "/resources/tutorials/connect-chatgpt-to-google-sheets-with-zapier",
    isFeatured: false,
    isPlaceholder: true,
  },
  {
    slug: "creating-brand-visuals-with-midjourney",
    title: "Step-by-Step: Creating Brand Visuals with Midjourney",
    description: "",
    level: "Intermediate",
    badge: "DESIGN",
    imageHint: "Midjourney brand visual creation",
    duration: "15 min",
    steps: 10,
    date: "May 18, 2026",
    tags: ["midjourney", "ai-image-generation"],
    href: "/resources/tutorials/creating-brand-visuals-with-midjourney",
    isFeatured: false,
    isPlaceholder: true,
  },
  {
    slug: "automate-daily-standup-notes-with-ai",
    title: "Automate Your Daily Standup Notes with AI",
    description: "",
    level: "Beginner",
    badge: "PRODUCTIVITY",
    imageHint: "daily standup notes automation dashboard",
    duration: "10 min",
    steps: 6,
    date: "May 16, 2026",
    tags: ["automation", "productivity", "workflow"],
    href: "/resources/tutorials/automate-daily-standup-notes-with-ai",
    isFeatured: false,
    isPlaceholder: true,
  },
  {
    slug: "use-claude-for-long-form-content-editing",
    title: "How to Use Claude for Long-Form Content Editing",
    description: "",
    level: "Intermediate",
    badge: "WRITING",
    imageHint: "Claude AI content editing interface",
    duration: "14 min",
    steps: 7,
    date: "May 14, 2026",
    tags: ["ai-writing", "prompt-engineering"],
    href: "/resources/tutorials/use-claude-for-long-form-content-editing",
    isFeatured: false,
    isPlaceholder: true,
  },
  {
    slug: "build-simple-ai-agent-no-code-tools",
    title: "Build a Simple AI Agent with No-Code Tools",
    description: "",
    level: "Advanced",
    badge: "AI AGENTS",
    imageHint: "no-code AI agent builder interface",
    duration: "25 min",
    steps: 14,
    date: "May 12, 2026",
    tags: ["ai-agents", "no-code", "automation"],
    href: "/resources/tutorials/build-simple-ai-agent-no-code-tools",
    isFeatured: false,
    isPlaceholder: true,
  },
];
