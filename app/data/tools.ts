export type ToolCategory =
  | "design"
  | "content-marketing"
  | "automation"
  | "sales"
  | "productivity";

export const CATEGORY_LABELS: Record<ToolCategory, string> = {
  design: "AI Design & Visualization",
  "content-marketing": "AI Content & Marketing",
  automation: "AI Automation & Workflow",
  sales: "AI Sales & Lead Generation",
  productivity: "AI Productivity & Management",
};

export interface AITool {
  name: string;
  company: string;
  logoBg: string;
  logoText: string;
  logoTextClass: string;
  category: ToolCategory;
  industry: string;
  pricing: string;
  pricingDetail: string;
  bestFor: string;
  keyFeatures: string;
  rating: number;
  reviews: number;
  industries: string[];
}

export const ALL_TOOLS: AITool[] = [
  {
    name: "ChatGPT",
    company: "by OpenAI",
    logoBg: "bg-[#10A37F]",
    logoText: "GP",
    logoTextClass: "text-white font-black text-xs",
    category: "content-marketing",
    industry: "All",
    pricing: "Freemium",
    pricingDetail: "$20/month",
    bestFor: "Writing, Research, Brainstorming",
    keyFeatures: "Content creation, Q&A, summarization, code generation",
    rating: 4.9,
    reviews: 560,
    industries: ["furniture", "architecture", "construction", "realestate"],
  },
  {
    name: "Claude",
    company: "by Anthropic",
    logoBg: "bg-[#D97706]",
    logoText: "Cl",
    logoTextClass: "text-white font-black text-xs",
    category: "content-marketing",
    industry: "All",
    pricing: "Freemium",
    pricingDetail: "$30/month",
    bestFor: "Analysis, Writing, Business Tasks",
    keyFeatures: "Long context, analysis, document understanding, reasoning",
    rating: 4.8,
    reviews: 420,
    industries: ["furniture", "architecture", "construction", "realestate"],
  },
  {
    name: "Notion AI",
    company: "by Notion",
    logoBg: "bg-white border border-gray-200",
    logoText: "N",
    logoTextClass: "text-gray-900 font-black text-sm",
    category: "productivity",
    industry: "All",
    pricing: "Freemium",
    pricingDetail: "$10/month",
    bestFor: "Notes, Docs, Project Management",
    keyFeatures: "AI writing, summaries, task management, knowledge base",
    rating: 4.7,
    reviews: 310,
    industries: ["architecture", "construction", "realestate"],
  },
  {
    name: "Zapier",
    company: "by Zapier",
    logoBg: "bg-[#FF4A00]",
    logoText: "Z",
    logoTextClass: "text-white font-black text-sm",
    category: "automation",
    industry: "All",
    pricing: "Freemium",
    pricingDetail: "$19.99/month",
    bestFor: "Automation, Integrations",
    keyFeatures: "Workflow automation, 6000+ apps, no-code builder",
    rating: 4.6,
    reviews: 280,
    industries: ["furniture", "construction", "realestate"],
  },
  {
    name: "Perplexity AI",
    company: "by Perplexity",
    logoBg: "bg-[#1E293B]",
    logoText: "Px",
    logoTextClass: "text-white font-black text-xs",
    category: "productivity",
    industry: "All",
    pricing: "Freemium",
    pricingDetail: "$20/month",
    bestFor: "Research, Search, Information",
    keyFeatures: "AI search, real-time data, citations, summaries",
    rating: 4.6,
    reviews: 210,
    industries: ["architecture", "realestate"],
  },
  {
    name: "Grammarly",
    company: "by Grammarly",
    logoBg: "bg-[#15C39A]",
    logoText: "G",
    logoTextClass: "text-white font-black text-sm",
    category: "content-marketing",
    industry: "All",
    pricing: "Freemium",
    pricingDetail: "$12/month",
    bestFor: "Writing, Editing, Communication",
    keyFeatures: "Grammar check, tone detection, AI suggestions",
    rating: 4.5,
    reviews: 190,
    industries: ["furniture", "architecture", "realestate"],
  },
  {
    name: "Midjourney",
    company: "by Midjourney",
    logoBg: "bg-[#1E293B]",
    logoText: "MJ",
    logoTextClass: "text-white font-black text-xs",
    category: "design",
    industry: "Architecture",
    pricing: "Paid",
    pricingDetail: "$10/month",
    bestFor: "Image Generation, Design",
    keyFeatures: "AI image generation, art, concepts, visuals",
    rating: 4.5,
    reviews: 160,
    industries: ["furniture", "architecture"],
  },
  {
    name: "Make",
    company: "by Make",
    logoBg: "bg-[#6D28D9]",
    logoText: "M",
    logoTextClass: "text-white font-black text-sm",
    category: "automation",
    industry: "All",
    pricing: "Freemium",
    pricingDetail: "$9/month",
    bestFor: "Automation, Workflow",
    keyFeatures: "Visual automation, integrations, scenarios",
    rating: 4.4,
    reviews: 140,
    industries: ["construction", "realestate"],
  },
];
