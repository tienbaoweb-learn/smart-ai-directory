export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  imageHint: string;
  readTime: string;
  date: string;
  tags: string[];
  href: string;
  isFeatured: boolean;
}

export const guidesData: Guide[] = [
  // ── Featured (4) ──────────────────────────────────────────────────────────
  {
    slug: "complete-ai-adoption-roadmap-small-businesses",
    title: "The Complete AI Adoption Roadmap for Small Businesses",
    description: "A practical framework for evaluating, piloting, and scaling AI across your team.",
    category: "Strategy",
    badge: "STRATEGY",
    imageHint: "team meeting with charts and AI dashboard",
    readTime: "14 min read",
    date: "Jun 10, 2026",
    tags: ["ai-for-business", "workflow"],
    href: "/resources/guides/complete-ai-adoption-roadmap-small-businesses",
    isFeatured: true,
  },
  {
    slug: "how-to-build-ai-powered-content-strategy",
    title: "How to Build an AI-Powered Content Strategy",
    description: "Plan, create, and distribute content faster using AI tools and workflows.",
    category: "Marketing",
    badge: "MARKETING",
    imageHint: "marketing analytics dashboard on screen",
    readTime: "11 min read",
    date: "Jun 8, 2026",
    tags: ["ai-writing", "ai-for-business"],
    href: "/resources/guides/how-to-build-ai-powered-content-strategy",
    isFeatured: true,
  },
  {
    slug: "streamlining-operations-ai-automation",
    title: "Streamlining Operations with AI Automation",
    description: "Identify high-impact processes to automate and the tools to do it.",
    category: "Operations",
    badge: "OPERATIONS",
    imageHint: "office workflow automation diagram",
    readTime: "13 min read",
    date: "Jun 6, 2026",
    tags: ["automation", "workflow"],
    href: "/resources/guides/streamlining-operations-ai-automation",
    isFeatured: true,
  },
  {
    slug: "ai-101-plain-english-guide-beginners",
    title: "AI 101: A Plain-English Guide for Beginners",
    description: "Understand the core concepts of AI without the technical jargon.",
    category: "Beginner",
    badge: "BEGINNER",
    imageHint: "person using AI chatbot on laptop",
    readTime: "9 min read",
    date: "Jun 4, 2026",
    tags: ["ai-for-business", "productivity"],
    href: "/resources/guides/ai-101-plain-english-guide-beginners",
    isFeatured: true,
  },

  // ── Latest (5) ────────────────────────────────────────────────────────────
  {
    slug: "5-signs-business-ready-for-ai-automation",
    title: "5 Signs Your Business Is Ready for AI Automation",
    description: "",
    category: "Strategy",
    badge: "STRATEGY",
    imageHint: "business team reviewing AI readiness checklist",
    readTime: "9 min read",
    date: "May 20, 2026",
    tags: ["ai-for-business", "automation"],
    href: "/resources/guides/5-signs-business-ready-for-ai-automation",
    isFeatured: false,
  },
  {
    slug: "beginners-guide-ai-generated-ad-creatives",
    title: "The Beginner's Guide to AI-Generated Ad Creatives",
    description: "",
    category: "Marketing",
    badge: "MARKETING",
    imageHint: "AI-generated advertising creative on screen",
    readTime: "8 min read",
    date: "May 18, 2026",
    tags: ["ai-image-generation", "ai-writing"],
    href: "/resources/guides/beginners-guide-ai-generated-ad-creatives",
    isFeatured: false,
  },
  {
    slug: "understanding-ai-bias-what-business-should-know",
    title: "Understanding AI Bias: What Every Business Should Know",
    description: "",
    category: "AI Ethics",
    badge: "ETHICS",
    imageHint: "abstract fairness and ethics illustration",
    readTime: "12 min read",
    date: "May 16, 2026",
    tags: ["ai-for-business", "productivity"],
    href: "/resources/guides/understanding-ai-bias-what-business-should-know",
    isFeatured: false,
  },
  {
    slug: "10-prompt-engineering-techniques-that-work",
    title: "10 Prompt Engineering Techniques That Actually Work",
    description: "",
    category: "Prompt Engineering",
    badge: "PROMPTS",
    imageHint: "developer typing prompt into AI interface",
    readTime: "10 min read",
    date: "May 14, 2026",
    tags: ["prompt-engineering", "productivity"],
    href: "/resources/guides/10-prompt-engineering-techniques-that-work",
    isFeatured: false,
  },
  {
    slug: "how-to-choose-right-ai-tool-workflow",
    title: "How to Choose the Right AI Tool for Your Workflow",
    description: "",
    category: "Operations",
    badge: "OPERATIONS",
    imageHint: "person comparing AI tools on multiple screens",
    readTime: "11 min read",
    date: "May 12, 2026",
    tags: ["workflow", "ai-for-business"],
    href: "/resources/guides/how-to-choose-right-ai-tool-workflow",
    isFeatured: false,
  },
];
