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
    slug: "weekly-roundup-june-30-2026",
    title: "AI News for Design & Construction Pros — Week of June 30, 2026",
    newsType: "weekly-roundup",
    thumbnail: "/images/ai-news/ai-news_weekly-roundup-june-30-2026.webp",
    heroImage: "/images/ai-news/ai-news-hero.webp",
    excerpt:
      "The AI interior design market races toward $4 billion, Prophetic lands a nationwide rollout with D.R. Horton, and proptech VC hits $16.7B as capital concentrates on workflow-native tools.",
    publishedDate: "2026-07-04",
    readingTime: "5 min",
    weekOf: "June 30, 2026",
    nextRoundup: "Week of July 7, 2026",
    tags: [
      "AI news",
      "interior design AI",
      "proptech funding",
      "architecture AI tools",
      "real estate AI",
      "construction technology",
      "YC 2026",
    ],
    content: [
      {
        type: "editor-pick",
        heading:
          "The Interior Design AI Market Is Heading for $4 Billion — and It's Accelerating Fast",
        paragraphs: [
          "A market report published this week by ResearchAndMarkets puts the AI in Interior Design market on track to surpass $4 billion by 2030, with demand driven primarily by three converging forces: AI-powered space planning, virtual interior visualization, and personalized design recommendations.",
          "What makes this number significant isn't the size — it's the speed. The AI interior design market was barely a recognized category three years ago, when tools like RoomGPT went viral for restyling a room photo in seconds. Today the same underlying technology is being embedded into furniture manufacturer workflows, real estate listing pipelines, and professional design studio software as a standard production tool rather than a novelty.",
          "The report identifies smart home integration as the fastest-growing driver — as more residential properties ship with connected devices, interior designers and furniture manufacturers are being pulled into a world where spatial planning intersects with IoT configuration. For studios and brands that cover multiple layers of the residential experience, this convergence is worth tracking closely.",
        ],
      },
      {
        type: "quick-hits",
        items: [
          {
            emoji: "🏠",
            industry: "Real Estate",
            title: "Prophetic secures nationwide rollout with D.R. Horton",
            body: "AI land decision platform Prophetic has secured a nationwide rollout with D.R. Horton, one of the largest homebuilders in the United States, using AI to speed up land acquisition decisions and support faster housing development across the country. For homebuilders operating at scale, land decisions are one of the highest-stakes bottlenecks in the development pipeline — a wrong call on a parcel costs millions and years. AI-assisted land intelligence is increasingly being treated as table stakes rather than a competitive advantage at the enterprise level.",
            tags: ["Real Estate", "Land Acquisition", "AI Tools"],
          },
          {
            emoji: "🏛️",
            industry: "Architecture",
            title: "ArchiLabs joins YC 2026 batch with AI CAD tool for architects and engineers",
            body: "ArchiLabs, an AI-native CAD platform for architects and engineers, has joined Y Combinator's 2026 batch. The company is focused on use cases including production homebuilding, modular housing, MEP coordination, and fire suppression systems — areas of architectural practice that are notoriously documentation-heavy and underserved by general-purpose AI tools. YC backing signals the category is getting serious venture attention beyond the visualization layer. Most funded architecture AI has focused on rendering and moodboards; CAD-native tools that touch construction documentation are a harder problem with significantly higher switching costs — and therefore more durable competitive moats.",
            tags: ["Architecture", "CAD", "YC 2026", "Funding"],
          },
          {
            emoji: "🌍",
            industry: "Market",
            title: "Automated Architecture wins ULI's European PropTech Innovation Challenge",
            body: "Automated Architecture has been named the European winner of the Urban Land Institute's PropTech Innovation Challenge for its AI-led timber housing platform. The platform automates design and procurement for timber-based residential construction — combining generative design, material optimization, and supply chain integration in a single workflow. The ULI recognition is notable because it comes from the institutional real estate side rather than the startup ecosystem, which typically has different thresholds for what counts as a production-ready solution.",
            tags: ["Architecture", "Construction", "Timber", "Europe"],
          },
          {
            emoji: "🏢",
            industry: "Commercial Real Estate",
            title: "Three AI planning platforms shortlisted for Planning Awards 2026",
            body: "Three digital AI planning platforms have been shortlisted for the Planning Awards 2026 in the UK, reflecting growing government and institutional appetite for AI-assisted urban planning tools. The planning application and zoning compliance category has historically lagged behind visualization and project management in AI adoption — partly because regulatory data quality is inconsistent across municipalities and partly because the stakes of errors are high. Shortlisting at a recognized awards body suggests at least some of these tools have reached a reliability threshold that institutions are willing to endorse publicly.",
            tags: ["Commercial Real Estate", "Urban Planning", "Zoning", "UK"],
          },
          {
            emoji: "💰",
            industry: "Market",
            title: "PropTech AI investment hit $16.7B in 2025 — and Q1 2026 is already accelerating",
            body: "Proptech venture capital reached $16.7 billion in 2025, a 68% increase from the prior year. January 2026 alone attracted $1.7 billion — a 176% year-over-year jump. Three new proptech unicorns minted since mid-2024 are all AI-native. The critical detail, per multiple investor analyses, is where capital is concentrating: platforms that autonomously execute complex workflows are attracting the largest rounds, while tools that simply display data or generate dashboards are being commoditized. For practitioners evaluating which platforms to build workflows around, this distinction matters. Tools that survive the current investment cycle will be the ones embedded deeply enough in operational workflows that switching costs are high. That's a different bar than \"useful\" — it's \"irreplaceable.\"",
            tags: ["Market", "PropTech", "Funding", "Venture Capital"],
          },
        ],
      },
      {
        type: "what-to-watch",
        leadIn: "YC 2026's construction and real estate cohort is worth tracking.",
        paragraphs: [
          "Y Combinator's current batch includes multiple proptech and ConTech companies beyond ArchiLabs — including AI-native tools for land decisions, lease abstraction (Propaya), and rental cash flow management. YC-backed startups in this cohort are typically 12–24 months from product maturity and broad market availability. Watching which ones get Series A funding in the next six months is a useful leading indicator of which workflow problems the market has decided are real and fundable.",
          "For the five industries we cover, the pattern to track is the same one playing out in every category: AI tools that integrate directly into existing professional workflows (Revit, Procore, AutoCAD, Salesforce for brokers) are compounding adoption faster than standalone apps. Integration depth is becoming the real differentiator.",
        ],
      },
      {
        type: "disclaimer",
        text: "SmartAI for Work publishes AI news and tool analysis for professionals in architecture, construction, real estate, interior design, and furniture. This roundup covers publicly reported developments — we don't accept payment for news coverage.",
      },
    ],
  },
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
