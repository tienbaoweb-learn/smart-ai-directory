export interface Tutorial {
  slug: string;
  title: string;
  description: string;
  level: string; // "Beginner" | "Intermediate" | "Advanced" | "No-code"
  badge: string; // Level badge for featured (BEGINNER…) or topic badge for latest (AUTOMATION…)
  imageHint: string;
  duration: string;
  steps: number;
  date: string;
  tags: string[];
  href: string;
  isFeatured: boolean;
}

export const tutorialsData: Tutorial[] = [
  // ── Featured (4) ──────────────────────────────────────────────────────────
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
  },
  {
    slug: "advanced-midjourney-prompting-techniques",
    title: "Advanced Midjourney Prompting Techniques",
    description: "Master parameters, styles, and consistency for professional results.",
    level: "Advanced",
    badge: "ADVANCED",
    imageHint: "AI image generation interface",
    duration: "20 min",
    steps: 12,
    date: "Jun 6, 2026",
    tags: ["midjourney", "prompt-engineering"],
    href: "/resources/tutorials/advanced-midjourney-prompting-techniques",
    isFeatured: true,
  },
  {
    slug: "create-ai-powered-notion-workspace-no-code",
    title: "Create an AI-Powered Notion Workspace (No Code)",
    description: "Set up databases, templates, and AI assistants inside Notion.",
    level: "No-code",
    badge: "NO-CODE",
    imageHint: "Notion AI workspace screenshot",
    duration: "18 min",
    steps: 9,
    date: "Jun 4, 2026",
    tags: ["no-code", "productivity"],
    href: "/resources/tutorials/create-ai-powered-notion-workspace-no-code",
    isFeatured: true,
  },

  // ── Latest (5) ────────────────────────────────────────────────────────────
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
  },
];
