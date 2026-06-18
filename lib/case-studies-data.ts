export interface CaseStudy {
  slug: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  company: { name: string; logo: { bg: string; text: string } };
  imageHint: string;
  stats: Array<{ icon: string; value: string; label: string }>;
  isFeatured: boolean;
  date: string;
  readTime: string;
  tags: string[];
  href: string;
  // Latest-only fields
  tools?: string;
  result?: string;
}

export const caseStudiesData: CaseStudy[] = [
  // ── Featured (4) ──────────────────────────────────────────────────────────
  {
    slug: "how-studio-luxe-cut-rendering-time",
    title: "How Studio Luxe Cut Rendering Time by 70% with AI",
    description:
      "Using Midjourney and DALL-E 3, Studio Luxe delivers high-quality concepts in minutes instead of days.",
    category: "Interior Design",
    badge: "INTERIOR DESIGN",
    company: { name: "Studio Luxe", logo: { bg: "bg-black", text: "S" } },
    imageHint: "luxury living room interior",
    stats: [
      { icon: "Clock",      value: "70%",   label: "Time Saved"     },
      { icon: "TrendingUp", value: "45%",   label: "More Projects"  },
      { icon: "DollarSign", value: "$120K", label: "Annual Savings" },
    ],
    isFeatured: true,
    date: "Jun 10, 2026",
    readTime: "6 min read",
    tags: ["ai-image-generation", "productivity"],
    href: "/resources/case-studies/how-studio-luxe-cut-rendering-time",
  },
  {
    slug: "archvision-increases-client-approvals",
    title: "ArchVision Increases Client Approvals with AI Visuals",
    description:
      "AI-generated visuals helped ArchVision improve client understanding and increase approval rate.",
    category: "Architecture",
    badge: "ARCHITECTURE",
    company: { name: "ArchVision", logo: { bg: "bg-slate-700", text: "A" } },
    imageHint: "modern architecture building rendering",
    stats: [
      { icon: "CheckCircle", value: "60%",   label: "Approval Rate"    },
      { icon: "Zap",         value: "35%",   label: "Faster Decisions" },
      { icon: "DollarSign",  value: "$200K", label: "Revenue Impact"   },
    ],
    isFeatured: true,
    date: "Jun 8, 2026",
    readTime: "7 min read",
    tags: ["ai-image-generation", "ai-for-business"],
    href: "/resources/case-studies/archvision-increases-client-approvals",
  },
  {
    slug: "buildsmart-saves-1200-hours-monthly",
    title: "BuildSmart Saves 1,200+ Hours Monthly with AI Automation",
    description:
      "AI automation for reports, progress tracking, and documentation saved hours every week.",
    category: "Construction",
    badge: "CONSTRUCTION",
    company: { name: "BuildSmart", logo: { bg: "bg-yellow-500", text: "B" } },
    imageHint: "construction site aerial view",
    stats: [
      { icon: "Clock",        value: "1,200+", label: "Hours Saved"    },
      { icon: "TrendingDown", value: "30%",    label: "Cost Reduction" },
      { icon: "DollarSign",   value: "$350K",  label: "Annual Savings" },
    ],
    isFeatured: true,
    date: "Jun 6, 2026",
    readTime: "8 min read",
    tags: ["automation", "productivity"],
    href: "/resources/case-studies/buildsmart-saves-1200-hours-monthly",
  },
  {
    slug: "prime-realty-generates-3x-more-leads",
    title: "Prime Realty Generates 3x More Leads with AI Marketing",
    description:
      "AI-powered content and ad automation helped Prime Realty triple their qualified leads.",
    category: "Real Estate",
    badge: "REAL ESTATE",
    company: { name: "Prime Realty", logo: { bg: "bg-gray-900", text: "P" } },
    imageHint: "modern house exterior dusk",
    stats: [
      { icon: "Users",        value: "3x",    label: "More Leads"     },
      { icon: "TrendingDown", value: "50%",   label: "Lower CPL"      },
      { icon: "DollarSign",   value: "$160K", label: "Pipeline Value" },
    ],
    isFeatured: true,
    date: "Jun 4, 2026",
    readTime: "6 min read",
    tags: ["ai-writing", "ai-for-business"],
    href: "/resources/case-studies/prime-realty-generates-3x-more-leads",
  },

  // ── Latest (5) ────────────────────────────────────────────────────────────
  {
    slug: "from-20-hours-to-2-ai-design-process",
    title: "From 20 Hours to 2: How AI Transformed Our Design Process",
    description: "",
    category: "Interior Design",
    badge: "INTERIOR DESIGN",
    company: { name: "Studio Nest", logo: { bg: "bg-rose-600", text: "SN" } },
    imageHint: "modern interior design studio",
    stats: [],
    isFeatured: false,
    date: "May 20, 2026",
    readTime: "5 min read",
    tags: ["ai-image-generation", "workflow", "productivity"],
    href: "/resources/case-studies/from-20-hours-to-2-ai-design-process",
    tools: "Midjourney, RoomGPT",
    result: "↑ 90% Time Saved",
  },
  {
    slug: "ai-powered-cost-estimation-bidding-accuracy",
    title: "AI-Powered Cost Estimation That Improved Our Bidding Accuracy",
    description: "",
    category: "Construction",
    badge: "CONSTRUCTION",
    company: { name: "ConstructPro", logo: { bg: "bg-orange-500", text: "CP" } },
    imageHint: "construction cost planning spreadsheet",
    stats: [],
    isFeatured: false,
    date: "May 18, 2026",
    readTime: "6 min read",
    tags: ["automation", "ai-for-business"],
    href: "/resources/case-studies/ai-powered-cost-estimation-bidding-accuracy",
    tools: "Buildots AI",
    result: "↑ 38% More Accurate",
  },
  {
    slug: "how-ai-helped-close-2m-in-deals",
    title: "How AI Helped Us Close $2M in Deals in Just 60 Days",
    description: "",
    category: "Real Estate",
    badge: "REAL ESTATE",
    company: { name: "Urban Nest Realty", logo: { bg: "bg-emerald-600", text: "UN" } },
    imageHint: "luxury real estate property",
    stats: [],
    isFeatured: false,
    date: "May 16, 2026",
    readTime: "7 min read",
    tags: ["ai-writing", "ai-for-business", "productivity"],
    href: "/resources/case-studies/how-ai-helped-close-2m-in-deals",
    tools: "ChatGPT + Zapier",
    result: "↑ $2M Pipeline",
  },
  {
    slug: "automating-content-creation-10x-output",
    title: "Automating Content Creation: Our AI Workflow for 10x More Output",
    description: "",
    category: "Marketing",
    badge: "MARKETING",
    company: { name: "DesignFlow", logo: { bg: "bg-pink-500", text: "DF" } },
    imageHint: "content marketing dashboard",
    stats: [],
    isFeatured: false,
    date: "May 14, 2026",
    readTime: "5 min read",
    tags: ["ai-writing", "automation", "workflow"],
    href: "/resources/case-studies/automating-content-creation-10x-output",
    tools: "Jasper + Canva AI",
    result: "↑ 10x More Content",
  },
  {
    slug: "ai-design-tools-helped-win-competitions",
    title: "AI Design Tools That Helped Us Win More Competitions",
    description: "",
    category: "Architecture",
    badge: "ARCHITECTURE",
    company: { name: "NextForm Studio", logo: { bg: "bg-blue-600", text: "NF" } },
    imageHint: "architectural competition render",
    stats: [],
    isFeatured: false,
    date: "May 12, 2026",
    readTime: "6 min read",
    tags: ["ai-image-generation", "ai-for-business"],
    href: "/resources/case-studies/ai-design-tools-helped-win-competitions",
    tools: "Vizcom",
    result: "↑ More Wins",
  },
];
