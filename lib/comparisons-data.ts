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

export const comparisonsData: Comparison[] = [
  // ── Featured (4) ──────────────────────────────────────────────────────────
  {
    slug: "chatgpt-vs-claude",
    title: "ChatGPT vs Claude",
    description: "Which AI assistant is better for writing, research, and analysis?",
    category: "Writing",
    badge: "WRITING",
    toolA: { name: "ChatGPT",  logo: { bg: "bg-emerald-500", text: "G"  } },
    toolB: { name: "Claude",   logo: { bg: "bg-orange-600",  text: "C"  } },
    date: "May 20, 2026",
    readTime: "10 min read",
    tags: ["chatgpt", "ai-writing"],
    href: "/resources/comparisons/chatgpt-vs-claude",
    isFeatured: true,
  },
  {
    slug: "midjourney-vs-dalle-3",
    title: "Midjourney vs DALL·E 3",
    description: "Compare image quality, styles, pricing, and commercial use.",
    category: "Design",
    badge: "DESIGN",
    toolA: { name: "Midjourney", logo: { bg: "bg-gray-900",   text: "MJ" } },
    toolB: { name: "DALL·E 3",   logo: { bg: "bg-orange-400", text: "D3" } },
    date: "May 18, 2026",
    readTime: "9 min read",
    tags: ["midjourney", "ai-image-generation"],
    href: "/resources/comparisons/midjourney-vs-dalle-3",
    isFeatured: true,
  },
  {
    slug: "notion-ai-vs-clickup-ai",
    title: "Notion AI vs ClickUp AI",
    description: "Features, pricing, and which one fits your workflow.",
    category: "Productivity",
    badge: "PRODUCTIVITY",
    toolA: { name: "Notion AI",  logo: { bg: "bg-gray-900",   text: "N"  } },
    toolB: { name: "ClickUp AI", logo: { bg: "bg-purple-600", text: "CU" } },
    date: "May 15, 2026",
    readTime: "8 min read",
    tags: ["productivity", "no-code"],
    href: "/resources/comparisons/notion-ai-vs-clickup-ai",
    isFeatured: true,
  },
  {
    slug: "jasper-vs-copy-ai",
    title: "Jasper vs Copy.ai",
    description: "Which AI writing tool helps you create better marketing content?",
    category: "Marketing",
    badge: "MARKETING",
    toolA: { name: "Jasper",   logo: { bg: "bg-blue-700",    text: "J"  } },
    toolB: { name: "Copy.ai",  logo: { bg: "bg-emerald-400", text: "CA" } },
    date: "May 12, 2026",
    readTime: "8 min read",
    tags: ["ai-writing"],
    href: "/resources/comparisons/jasper-vs-copy-ai",
    isFeatured: true,
  },

  // ── Latest (5) ────────────────────────────────────────────────────────────
  {
    slug: "canva-ai-vs-adobe-firefly",
    title: "Canva AI vs Adobe Firefly",
    description: "Which design tool is better for your creative projects?",
    category: "Design & Visuals",
    badge: "DESIGN",
    toolA: { name: "Canva AI",      logo: { bg: "bg-cyan-500",  text: "CA" } },
    toolB: { name: "Adobe Firefly", logo: { bg: "bg-red-600",   text: "AF" } },
    focus: "Image generation, editing, brand kits, templates",
    date: "May 20, 2026",
    readTime: "9 min read",
    tags: ["ai-image-generation", "no-code"],
    href: "/resources/comparisons/canva-ai-vs-adobe-firefly",
    isFeatured: false,
  },
  {
    slug: "zapier-vs-make",
    title: "Zapier vs Make",
    description: "Which automation platform offers more power and value?",
    category: "Automation",
    badge: "AUTOMATION",
    toolA: { name: "Zapier", logo: { bg: "bg-orange-500", text: "ZP" } },
    toolB: { name: "Make",   logo: { bg: "bg-purple-600", text: "MK" } },
    focus: "Integrations, pricing, ease of use",
    date: "May 19, 2026",
    readTime: "10 min read",
    tags: ["automation", "no-code"],
    href: "/resources/comparisons/zapier-vs-make",
    isFeatured: false,
  },
  {
    slug: "synthesia-vs-pictory",
    title: "Synthesia vs Pictory",
    description: "Best AI video generator for business content?",
    category: "Video & Audio",
    badge: "VIDEO",
    toolA: { name: "Synthesia", logo: { bg: "bg-blue-600",   text: "SY" } },
    toolB: { name: "Pictory",   logo: { bg: "bg-purple-500", text: "PT" } },
    focus: "Video quality, avatars, pricing, templates",
    date: "May 17, 2026",
    readTime: "8 min read",
    tags: ["ai-image-generation", "productivity"],
    href: "/resources/comparisons/synthesia-vs-pictory",
    isFeatured: false,
  },
  {
    slug: "grammarly-vs-prowritingaid",
    title: "Grammarly vs ProWritingAid",
    description: "Which writing assistant improves your content the most?",
    category: "Writing",
    badge: "WRITING",
    toolA: { name: "Grammarly",     logo: { bg: "bg-[#15C39A]", text: "G" } },
    toolB: { name: "ProWritingAid", logo: { bg: "bg-slate-700", text: "PW" } },
    focus: "Grammar, style, readability, plagiarism",
    date: "May 16, 2026",
    readTime: "7 min read",
    tags: ["ai-writing"],
    href: "/resources/comparisons/grammarly-vs-prowritingaid",
    isFeatured: false,
  },
  {
    slug: "trello-vs-asana",
    title: "Trello vs Asana",
    description: "Which project management tool scales with your team?",
    category: "Project Management",
    badge: "PROJECT MGMT",
    toolA: { name: "Trello", logo: { bg: "bg-blue-500", text: "TR" } },
    toolB: { name: "Asana",  logo: { bg: "bg-red-500",  text: "AS" } },
    focus: "Task management, reporting, pricing",
    date: "May 14, 2026",
    readTime: "9 min read",
    tags: ["productivity", "no-code"],
    href: "/resources/comparisons/trello-vs-asana",
    isFeatured: false,
  },
];
