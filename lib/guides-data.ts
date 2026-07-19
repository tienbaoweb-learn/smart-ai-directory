export interface Guide {
  slug: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  imageHint: string;
  thumbnail: string;
  readTime: string;
  date: string;
  tags: string[];
  href: string;
  isFeatured: boolean;
}

export const guidesData: Guide[] = [
  // ── Featured (4) ──────────────────────────────────────────────────────────
  {
    slug: "architecture-ai-tools",
    title: "Best AI Tools for Architects in 2026 (Tested & Compared)",
    description: "Rendering, generative planning, documentation, and zoning research tools grouped by what they actually solve for architecture studios.",
    category: "Architecture",
    badge: "ARCHITECTURE",
    imageHint: "architect reviewing AI-generated building render",
    thumbnail: "/images/guides/architecture-ai-tools-thumb.webp",
    readTime: "8 min read",
    date: "Jun 21, 2026",
    tags: ["ai-image-generation", "ai-for-business"],
    href: "/resources/guides/architecture-ai-tools",
    isFeatured: true,
  },
  {
    slug: "construction-ai-tools",
    title: "Best AI Tools for Construction in 2026 (Tested & Compared)",
    description: "Estimating, scheduling, site visibility, and documentation tools grouped by the workflow stages where contractors lose the most time.",
    category: "Construction",
    badge: "CONSTRUCTION",
    imageHint: "construction site manager using tablet on site",
    thumbnail: "/images/guides/construction-ai-tools-thumb.webp",
    readTime: "8 min read",
    date: "Jun 21, 2026",
    tags: ["automation", "ai-for-business"],
    href: "/resources/guides/construction-ai-tools",
    isFeatured: true,
  },
  {
    slug: "interior-design-ai-tools",
    title: "Best AI Tools for Interior Design in 2026 (Tested & Compared)",
    description: "Fast restyling, layout planning, shoppable presentations, and professional rendering tools grouped by real design workflow needs.",
    category: "Interior Design",
    badge: "INTERIOR DESIGN",
    imageHint: "interior designer comparing AI room redesigns",
    thumbnail: "/images/guides/interior-design-ai-tools-thumb.webp",
    readTime: "8 min read",
    date: "Jun 21, 2026",
    tags: ["ai-image-generation", "productivity"],
    href: "/resources/guides/interior-design-ai-tools",
    isFeatured: true,
  },
  {
    slug: "real-estate-ai-tools",
    title: "Best AI Tools for Real Estate in 2026 (Tested & Compared)",
    description: "Lead capture, listing content, CRM workflows, and market analysis tools grouped by where agents and small teams lose the most time.",
    category: "Real Estate",
    badge: "REAL ESTATE",
    imageHint: "real estate agent reviewing AI lead dashboard",
    thumbnail: "/images/guides/real-estate-ai-tools-thumb.webp",
    readTime: "8 min read",
    date: "Jun 21, 2026",
    tags: ["ai-writing", "ai-for-business"],
    href: "/resources/guides/real-estate-ai-tools",
    isFeatured: true,
  },
  {
    slug: "ai-rendering-visualization-tools",
    title: "Best AI 3D Rendering & Visualization Tools for AEC Professionals in 2026 (Tested & Compared)",
    description: "Fast AI concept renderers, real-time engines, and production-grade tools compared — with a framework for matching each to the right project stage.",
    category: "Visualization",
    badge: "VISUALIZATION",
    imageHint: "photorealistic AI architectural render on screen",
    thumbnail: "/images/guides/guide-ai-rendering-visualization-tools-thumbnail.webp",
    readTime: "9 min read",
    date: "Jul 12, 2026",
    tags: ["ai-image-generation", "ai-for-business"],
    href: "/resources/guides/ai-rendering-visualization-tools",
    isFeatured: true,
  },
  {
    slug: "furniture-ai-tools",
    title: "Best AI Tools for Furniture Manufacturers & Retailers in 2026 (Tested & Compared)",
    description: "Batch product photography, in-room visualization, configurators, and marketing tools grouped by what they actually solve for furniture businesses.",
    category: "Furniture",
    badge: "FURNITURE",
    imageHint: "AI-generated furniture product photography",
    thumbnail: "/images/guides/guide-furniture-ai-tools-thumbnail.webp",
    readTime: "8 min read",
    date: "Jul 12, 2026",
    tags: ["ai-image-generation", "ai-for-business"],
    href: "/resources/guides/furniture-ai-tools",
    isFeatured: true,
  },
];
