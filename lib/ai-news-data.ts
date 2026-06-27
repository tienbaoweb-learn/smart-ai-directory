export type AINewsType = "weekly-roundup" | "industry-digest" | "tool-launch-radar";

export interface QuickHitItem {
  emoji: string;
  industry: string; // "Construction" | "Real Estate" | "Architecture" | "Commercial Real Estate" | "Market" | etc.
  title: string;
  body: string;
  tags: string[];
}

export interface AINewsContentBlock {
  type:
    | "editor-pick" // Editor's Pick section (sub-heading + body paragraphs)
    | "quick-hits" // mảng QuickHitItem[]
    | "what-to-watch" // closing editorial
    | "disclaimer" // footer note
    | "paragraph" // đoạn văn thường nếu có
    | "heading"; // subheading nếu cần
  heading?: string; // sub-heading cho editor-pick / heading block
  text?: string; // cho paragraph, heading, disclaimer
  leadIn?: string; // câu mở đầu in đậm cho what-to-watch
  paragraphs?: string[]; // cho editor-pick, what-to-watch
  items?: QuickHitItem[]; // cho quick-hits
}

export interface AINewsPost {
  slug: string;
  title: string;
  newsType: AINewsType;
  thumbnail: string;
  heroImage: string; // dùng chung "ai-news-hero.webp" cho mọi bài
  excerpt: string; // 1-2 câu cho card preview
  publishedDate: string;
  readingTime: string;
  weekOf?: string; // cho weekly-roundup: "June 23, 2026"
  nextRoundup?: string; // "Week of June 30, 2026"
  inArticleImages?: string[]; // ảnh minh hoạ trong bài
  content: AINewsContentBlock[];
  tags: string[];
}

/** Badge label hiển thị theo newsType */
export const NEWS_TYPE_LABEL: Record<AINewsType, string> = {
  "weekly-roundup": "Weekly Roundup",
  "industry-digest": "Industry Digest",
  "tool-launch-radar": "Tool Launch Radar",
};

/** Màu industry tag theo brand — key viết thường để tra cứu không phân biệt hoa thường */
export const INDUSTRY_COLOR: Record<string, string> = {
  architecture: "#2d5cf3",
  construction: "#6484A4",
  "real estate": "#8c21f1",
  "commercial real estate": "#8c21f1",
  "interior design": "#35966a",
  furniture: "#F97316",
  market: "#F97316",
  general: "#F97316",
};

/** Trả về màu cho industry tag, fallback về orange brand */
export function industryColor(industry: string): string {
  return INDUSTRY_COLOR[industry.trim().toLowerCase()] ?? "#F97316";
}

export const aiNewsPosts: AINewsPost[] = [
  {
    slug: "weekly-roundup-june-23-2026",
    title: "AI News for Design & Construction Pros — Week of June 23, 2026",
    newsType: "weekly-roundup",
    thumbnail: "/images/ai-news/weekly-roundup-june-23-2026-thumbnail.webp",
    heroImage: "/images/ai-news/ai-news-hero.webp",
    excerpt:
      "Construction AI crosses a key adoption threshold, 82% of real estate agents now use AI, and proptech platforms diverge on agent strategy.",
    publishedDate: "2026-06-26",
    readingTime: "5 min",
    weekOf: "June 23, 2026",
    nextRoundup: "Week of June 30, 2026",
    inArticleImages: [
      "/images/ai-news/weekly-roundup-june-23-2026-1.webp",
      "/images/ai-news/weekly-roundup-june-23-2026-2.webp",
    ],
    tags: [
      "AI news",
      "construction AI",
      "real estate AI",
      "architecture AI",
      "proptech",
      "AI adoption 2026",
    ],
    content: [
      {
        type: "editor-pick",
        heading: "Construction AI Just Crossed a Meaningful Threshold",
        paragraphs: [
          "Numbers worth paying attention to: 38% of contractors now report measurable business impact from AI, up from 17% just a year ago — according to Engineering News-Record's latest industry tracking. That's more than a doubling in one year, and it represents a shift from AI being a pilot project to AI producing real operational results at a meaningful share of firms.",
          "The backdrop makes adoption even more urgent: the industry faces a shortfall of roughly 500,000 workers in 2026, a figure that keeps automation investment near the top of the capital allocation agenda. Firms that can extract more output from a constrained workforce gain a direct margin advantage — which explains why measurable ROI from AI has moved from a nice-to-have to a procurement criterion for platforms.",
          "One developing tension worth watching: construction management platforms are now locked in a dispute over whether they can use customer data to train their AI agents, and if so, on whose terms. Contractors evaluating platform contracts should scrutinize data-usage clauses with the same rigor applied to pricing terms — your project data (schedules, costs, RFIs, change orders) carries commercial value you may be giving away by default.",
        ],
      },
      {
        type: "quick-hits",
        items: [
          {
            emoji: "🏗️",
            industry: "Construction",
            title: "Structured AI raises $4.2M for construction QA",
            body: "Structured AI has raised $4.2M to bring AI-powered quality assurance to construction projects, with a focus on MEP coordination — a pain point flagged by engineering firm Syska Hennessy Group, one of their early backers. The platform uses OCR and AI to address QA/QC issues that typically surface late in a project when they're most expensive to fix. Early-stage but worth watching for MEP-heavy teams.",
            tags: ["Construction", "QA/QC", "Funding"],
          },
          {
            emoji: "🏠",
            industry: "Real Estate",
            title: "82% of agents now use AI — but adoption isn't the same as impact",
            body: "RPR's February 2026 survey of 225 NAR members found that AI adoption was at 82 percent, with NAR's own larger study putting it at 68%. The gap between those figures likely reflects survey methodology, but the directional story is the same: near-universal adoption. The more interesting split is emerging between agents who've added an AI tool and agents who've rebuilt their workflows around one. According to RPR's 2026 data, 68% of agents save at least one hour per week using AI, and 34% save more than four hours — most of this time being used to increase speed in responding to leads. Speed on lead response is where the measurable conversion advantage shows up.",
            tags: ["Real Estate", "Agents", "Adoption Data"],
          },
          {
            emoji: "🏢",
            industry: "Commercial Real Estate",
            title: "Proptech platforms diverge on AI agent strategy",
            body: "The major proptech platforms are making fundamentally different bets on how to build AI into their products — and the architectural choices matter for which platform wins long-term. CoStar launched Homes AI in February 2026 with an emphasis on data retention, stating that \"Homes AI data remains entirely within the Homes.com proprietary ecosystem and is never used to train or refine external AI.\" AppFolio is taking a different angle: their 2026 Property Management Benchmark Report shows that property management professionals using AI broadly across core workflows report expected portfolio growth of 31% in 2026, compared to 12% for those not using AI. For property managers evaluating platforms, the question isn't just what AI features a platform offers today — it's what they're building toward and who owns the data being used to train it.",
            tags: ["Commercial Real Estate", "PropTech", "Property Management"],
          },
          {
            emoji: "🏛️",
            industry: "Architecture",
            title: "Chaos/Architizer survey: architecture AI is past the \"should we\" question",
            body: "According to a new industry survey conducted by Chaos in collaboration with Architizer, between 73% and 93% of respondents say they plan to increase their use of AI in the coming year — even among firms that have been slower to adopt, 10% anticipate expanding their use of AI tools. The more nuanced finding: AI is most effective when paired with experienced practitioners — \"human and computer together can make experts sharper, while unguided use can leave less experienced staff lost.\" The firms reporting the highest satisfaction aren't just the heaviest AI users — they're the ones who've figured out where human judgment is irreplaceable and deployed AI around it.",
            tags: ["Architecture", "Survey Data", "AI Adoption"],
          },
          {
            emoji: "💰",
            industry: "Market",
            title: "Morgan Stanley: AI could generate $34B in CRE efficiency gains by 2030",
            body: "Morgan Stanley estimates AI could generate $34 billion in operating efficiencies across the real estate industry by 2030. JLL's take is direct: \"AI is doing exactly what every productivity tool before it has done: handling data-heavy work — tracking comps, synthesizing market trends, streamlining lease administration — so that professionals can focus on what AI cannot replicate.\" The headline number is large, but the distribution of those gains matters more than the aggregate. Firms closest to the deal and data flow — institutional investors, large brokerages, construction platforms with rich project data — are positioned to capture disproportionate efficiency gains.",
            tags: ["Market", "CRE", "Investment"],
          },
        ],
      },
      {
        type: "what-to-watch",
        leadIn: "Agentic AI in CRE is the next wave — 12–24 months out.",
        paragraphs: [
          "The most consequential shift coming in 2026 and 2027 is not individual AI features but agentic orchestration, where AI handles a coordinated sequence of tasks across a deal lifecycle rather than a single analysis. Early adopters are running these workflows in controlled environments. Broad institutional deployment is still a year or more away — but the firms building the muscle now will have a structural advantage when it arrives.",
          "For the five industries we cover, this means the AI tools worth evaluating today aren't just the ones that save time on one task — they're the ones building toward connected workflows that span multiple stages of a project or transaction.",
        ],
      },
      {
        type: "disclaimer",
        text: "SmartAI for Work publishes AI news and tool analysis for professionals in architecture, construction, real estate, interior design, and furniture. This roundup covers publicly reported developments — we don't accept payment for news coverage.",
      },
    ],
  },
];
