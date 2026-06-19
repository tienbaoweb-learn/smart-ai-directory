export interface CaseStudyContentBlock {
  type: "paragraph" | "heading" | "image" | "quote" | "stat-table" | "cta";
  text?: string;
  level?: 2 | 3; // cho heading
  src?: string; // cho image
  alt?: string;
  caption?: string;
  rows?: { label: string; before: string; after: string }[]; // cho stat-table
  ctaText?: string;
  ctaLink?: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  businessSize: string;
  market: string;
  timeFrame: string;
  thumbnail: string;
  heroImage?: string;
  excerpt: string;
  content: CaseStudyContentBlock[];
  tags: string[];
  readingTime: string;
  publishedDate: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "furniture-ai-tools",
    title: "How a Small Furniture Studio Cut Product Photo Costs by 70% Using AI",
    industry: "Furniture & Home Décor",
    businessSize: "8-person studio",
    market: "B2C + B2B, Europe",
    timeFrame: "3 months",
    thumbnail: "/images/case-studies/furniture-ai-tools-thumb.webp",
    heroImage: "/images/case-studies/furniture-ai-tools-hero.webp",
    excerpt:
      "A boutique furniture brand replaced expensive photography and 3D rendering with AI tools, cutting content production costs by 70% and shortening their sales cycle from 18 to 6 days.",
    tags: ["AI tools for furniture", "AI product photography", "room staging AI", "furniture copywriting"],
    readingTime: "6 min",
    publishedDate: "2026-06-16",
    content: [
      { type: "paragraph", text: "Running a small furniture studio sounds romantic — beautiful craftsmanship, happy customers, a growing brand. But behind every product launch, there's a logistical nightmare that eats through budgets and delays timelines faster than anything else: content production." },
      { type: "paragraph", text: "For Lumera Studio (name changed), a boutique furniture brand based in the Netherlands specializing in solid wood sofas and modular shelving, this problem came to a head in early 2024." },
      { type: "heading", level: 2, text: "The problem nobody talks about" },
      { type: "paragraph", text: "They had just finished their Spring collection — 14 new pieces, each in 3 colorways. That's 42 product variants that needed professional lifestyle photography, 3D room visualizations, and product descriptions in three languages." },
      { type: "image", src: "/images/case-studies/furniture-ai-tools-1.webp", alt: "Furniture workshop with wood materials", caption: "Lumera Studio's workshop, where solid wood pieces are crafted by hand" },
      { type: "paragraph", text: "Their usual photographer charged 900 euros per day. The 3D rendering studio had a 5-day turnaround per piece. The math was brutal: an estimated 18,000 euros and 6 weeks just to get the collection live online." },
      { type: "heading", level: 2, text: "The turning point" },
      { type: "paragraph", text: "Two weeks before the planned launch, their photographer cancelled due to a family emergency. Instead of pushing the deadline back, the studio's operations manager decided to try AI tools — something she'd been skeptical about for a long time." },
      { type: "heading", level: 2, text: "The 3 AI tools that changed their workflow" },
      { type: "paragraph", text: "Tool 1 — AI image generation solved their photography cost problem. They took existing white-background product shots and generated realistic lifestyle environments around them, dropping photography cost per product from around 600 euros to under 90 euros." },
      { type: "image", src: "/images/case-studies/furniture-ai-tools-2.webp", alt: "Modern living room with sofa", caption: "AI-generated lifestyle staging replaced traditional studio photography" },
      { type: "paragraph", text: "Tool 2 — AI room staging solved the 'what will this look like in my home' question that was the biggest friction point in their sales process. Customers upload a photo of their room, the studio drops in the product, and a visualization is ready in minutes instead of 4-5 business days." },
      { type: "paragraph", text: "Tool 3 — AI copywriting solved the content bottleneck across 42 product variants in 3 languages, reducing content production time by 80 percent." },
      { type: "heading", level: 2, text: "The numbers, three months later" },
      { type: "stat-table", rows: [
        { label: "Photography cost per collection", before: "12,000-18,000 EUR", after: "2,100-3,500 EUR" },
        { label: "Time to deliver client visualization", before: "4-5 business days", after: "20-30 minutes" },
        { label: "Content production time (full catalogue)", before: "5-6 weeks", after: "1.5 weeks" },
        { label: "Average sales cycle (B2C, 800 EUR+)", before: "18 days", after: "6 days" },
      ]},
      { type: "quote", text: "The images are indistinguishable from our old photography. The only thing AI can't replace is the actual craftsmanship in the product itself — and that's exactly where our value is." },
      { type: "heading", level: 2, text: "What this means for your furniture business" },
      { type: "paragraph", text: "If you're running a furniture studio, retail operation, or manufacturing business, the entry point to AI tools is lower than you think. This isn't about replacing your team — it's about letting them focus on judgment and creativity rather than repetitive production work." },
      { type: "cta", ctaText: "Browse AI tools for furniture businesses", ctaLink: "/best-of/interior-design" },
    ]
  }
];
