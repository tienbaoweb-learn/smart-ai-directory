export interface Workflow {
  slug: string;
  title: string;
  description: string;
  category: string;
  toolsUsed: Array<{ bg: string; text: string }>; // icon chain (featured) or tool dots (latest)
  iconBg?: string; // single icon for the latest table row
  steps: number;
  toolCount: number;
  duration: string;
  date: string;
  tags: string[];
  href: string;
  isFeatured: boolean;
}

export const workflowsData: Workflow[] = [
  // ── Featured (4) ──────────────────────────────────────────────────────────
  {
    slug: "blog-post-creation-workflow",
    title: "Blog Post Creation Workflow",
    description: "Research, outline, write, design and publish blog posts.",
    category: "Content Creation",
    toolsUsed: [
      { bg: "bg-emerald-500", text: "GP" },
      { bg: "bg-purple-600",  text: "JS" },
      { bg: "bg-gray-900",    text: "NT" },
    ],
    steps: 5,
    toolCount: 3,
    duration: "30 min",
    date: "Jun 10, 2026",
    tags: ["ai-writing", "workflow"],
    href: "/resources/workflows/blog-post-creation-workflow",
    isFeatured: true,
  },
  {
    slug: "social-media-content-workflow",
    title: "Social Media Content Workflow",
    description: "Create engaging posts for multiple platforms in minutes.",
    category: "Marketing",
    toolsUsed: [
      { bg: "bg-cyan-500",   text: "MJ" },
      { bg: "bg-purple-500", text: "CA" },
      { bg: "bg-pink-500",   text: "BF" },
    ],
    steps: 6,
    toolCount: 4,
    duration: "25 min",
    date: "Jun 8, 2026",
    tags: ["ai-writing", "automation"],
    href: "/resources/workflows/social-media-content-workflow",
    isFeatured: true,
  },
  {
    slug: "lead-generation-workflow",
    title: "Lead Generation Workflow",
    description: "Find, prospect, enrich data and send personalized outreach.",
    category: "Sales & Lead Gen",
    toolsUsed: [
      { bg: "bg-blue-600",   text: "AP" },
      { bg: "bg-green-600",  text: "ZP" },
      { bg: "bg-orange-500", text: "CH" },
    ],
    steps: 7,
    toolCount: 5,
    duration: "45 min",
    date: "Jun 6, 2026",
    tags: ["ai-for-business", "automation"],
    href: "/resources/workflows/lead-generation-workflow",
    isFeatured: true,
  },
  {
    slug: "project-kickoff-workflow",
    title: "Project Kickoff Workflow",
    description: "Plan projects, assign tasks and align your team.",
    category: "Project Management",
    toolsUsed: [
      { bg: "bg-gray-900",    text: "NT" },
      { bg: "bg-emerald-500", text: "GP" },
      { bg: "bg-blue-500",    text: "TR" },
    ],
    steps: 6,
    toolCount: 4,
    duration: "35 min",
    date: "Jun 4, 2026",
    tags: ["productivity", "workflow"],
    href: "/resources/workflows/project-kickoff-workflow",
    isFeatured: true,
  },

  // ── Latest (5) ────────────────────────────────────────────────────────────
  {
    slug: "ecommerce-product-description-workflow",
    title: "Ecommerce Product Description Workflow",
    description: "Research SEO-friendly product descriptions at scale.",
    category: "Content Creation",
    toolsUsed: [
      { bg: "bg-emerald-500", text: "GP" },
      { bg: "bg-purple-500",  text: "JS" },
      { bg: "bg-orange-500",  text: "CA" },
    ],
    iconBg: "bg-blue-500",
    steps: 5,
    toolCount: 3,
    duration: "20 min",
    date: "May 20, 2026",
    tags: ["ai-writing", "workflow", "ai-for-business"],
    href: "/resources/workflows/ecommerce-product-description-workflow",
    isFeatured: false,
  },
  {
    slug: "ai-powered-meeting-notes-workflow",
    title: "AI-Powered Meeting Notes Workflow",
    description: "Record, transcribe, summarize and share meeting notes.",
    category: "Productivity",
    toolsUsed: [
      { bg: "bg-gray-900",  text: "NT" },
      { bg: "bg-blue-500",  text: "WH" },
      { bg: "bg-pink-500",  text: "SL" },
    ],
    iconBg: "bg-purple-500",
    steps: 6,
    toolCount: 3,
    duration: "25 min",
    date: "May 19, 2026",
    tags: ["productivity", "automation"],
    href: "/resources/workflows/ai-powered-meeting-notes-workflow",
    isFeatured: false,
  },
  {
    slug: "email-outreach-automation-workflow",
    title: "Email Outreach Automation Workflow",
    description: "Find leads, write emails and follow up automatically.",
    category: "Sales & Lead Gen",
    toolsUsed: [
      { bg: "bg-cyan-500",    text: "AP" },
      { bg: "bg-orange-500",  text: "ZP" },
      { bg: "bg-purple-600",  text: "CH" },
    ],
    iconBg: "bg-green-500",
    steps: 7,
    toolCount: 3,
    duration: "40 min",
    date: "May 18, 2026",
    tags: ["automation", "ai-for-business"],
    href: "/resources/workflows/email-outreach-automation-workflow",
    isFeatured: false,
  },
  {
    slug: "client-onboarding-workflow",
    title: "Client Onboarding Workflow",
    description: "Streamline onboarding and document collection.",
    category: "Operations",
    toolsUsed: [
      { bg: "bg-blue-600",    text: "DC" },
      { bg: "bg-emerald-600", text: "NT" },
      { bg: "bg-gray-700",    text: "ZP" },
    ],
    iconBg: "bg-pink-500",
    steps: 8,
    toolCount: 3,
    duration: "45 min",
    date: "May 17, 2026",
    tags: ["workflow", "productivity", "automation"],
    href: "/resources/workflows/client-onboarding-workflow",
    isFeatured: false,
  },
  {
    slug: "ai-design-concept-workflow",
    title: "AI Design Concept Workflow",
    description: "Generate, refine and present design concepts.",
    category: "Design & Creative",
    toolsUsed: [
      { bg: "bg-emerald-500", text: "MJ" },
      { bg: "bg-purple-500",  text: "CA" },
      { bg: "bg-blue-400",    text: "FG" },
    ],
    iconBg: "bg-orange-500",
    steps: 6,
    toolCount: 3,
    duration: "30 min",
    date: "May 16, 2026",
    tags: ["ai-image-generation", "productivity", "workflow"],
    href: "/resources/workflows/ai-design-concept-workflow",
    isFeatured: false,
  },
];
