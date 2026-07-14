export type AINewsType = "weekly-roundup" | "industry-digest" | "tool-launch-radar";

export interface QuickHitItem {
  emoji: string;
  industry: string; // "Construction" | "Real Estate" | "Architecture" | "Commercial Real Estate" | "Market" | etc.
  title: string;
  /** Nội dung chính. Nhiều đoạn thì ngăn cách bằng "\n\n". */
  body: string;
  tags: string[];
  /** "Why it matters for you" — editorial takeaway (tùy chọn, cho các bài dạng story). */
  whyItMatters?: string;
  /** Nhãn nguồn hiển thị, vd "Proptech Connect, July 2, 2026". */
  source?: string;
  /** Link tới nguồn gốc (tùy chọn). */
  sourceUrl?: string;
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
    slug: "ai-news-2026-07-14",
    title:
      "AI News Roundup — Week of July 14, 2026: Palantir Comes to the Jobsite, YC Floods the Back Office, and Image Models Learn Layers",
    newsType: "weekly-roundup",
    thumbnail: "/images/ai-news/ai-news-2026-07-14-thumbnail.webp",
    heroImage: "/images/ai-news/ai-news-hero.webp",
    excerpt:
      "This week in AI for the built environment: McCarthy's Palantir-powered AI operating system, Sodex raises €4M for real-time site intelligence, Y Combinator backs a wave of construction back-office startups, layer-based image models arrive for design work, and Meta ships its first paid developer API.",
    publishedDate: "2026-07-14",
    readingTime: "6 min",
    weekOf: "July 14, 2026",
    nextRoundup: "Week of July 21, 2026",
    inArticleImages: [
      "/images/ai-news/ai-news-2026-07-14-1.webp",
      "/images/ai-news/ai-news-2026-07-14-2.webp",
    ],
    tags: [
      "AI News",
      "Construction",
      "Real Estate",
      "Architecture",
      "Interior Design",
      "Weekly Roundup",
    ],
    content: [
      {
        type: "paragraph",
        text: "Two weeks ago the money went into decisions. This week it went into presence: AI physically showing up where the work happens — on the jobsite, inside the property manager's software stack, and in the pixel layers of a design render. Meanwhile, Meta decided it finally wants your API dollars.",
      },
      {
        type: "paragraph",
        text: "Here are the five stories worth your attention, and why each one matters if you design, build, sell, or furnish spaces for a living.",
      },
      {
        type: "quick-hits",
        heading: "The 5 Stories That Matter This Week",
        items: [
          {
            emoji: "🏗️",
            industry: "Construction",
            title: "McCarthy's Palantir deal signals AI's move from back office to jobsite",
            body: "McCarthy Building Companies — one of the largest contractors in the US — has a multiyear, multimillion-dollar agreement with Palantir that drew fresh industry attention this week. The deal, first announced in early June and reported by Construction Dive, centers on Pulse: McCarthy's AI-native system built on Palantir's Artificial Intelligence Platform, designed to give field teams real-time insight, scenario planning, risk analysis, and decision orchestration from design through active building.\n\nThe sober counterpoint came from RICS panel member James Garner (Head of AI and Data at Gleeds), who argued that data readiness — not software — is the real bottleneck, and that \"culture over cost\" is the more important strategic consideration when construction firms evaluate AI.",
            whyItMatters:
              "When a tier-one contractor anchors its AI strategy on a single platform instead of a patchwork of point solutions, it sets the template mid-size firms will be measured against. But Garner's warning is the actionable part: before you budget for any AI tool, audit whether your project data is clean, connected, and accessible. A platform on top of fragmented data is an expensive dashboard. Investors and insurers are already starting to ask how AI is governed on projects — documenting that now is cheaper than retrofitting it under contract pressure.",
            source: "MarketScale, July 11, 2026",
            sourceUrl:
              "https://www.marketscale.com/industries/engineering-and-construction/ai-moves-from-back-office-to-job-site-in-constructions-next-build-out",
            tags: ["Construction", "Palantir", "Jobsite AI"],
          },
          {
            emoji: "📡",
            industry: "Construction",
            title: "Sodex Innovations raises €4M for real-time construction site intelligence",
            body: "Austrian-German startup Sodex Innovations closed a €4 million round led by Capmont Technology, with new investors Bloomhaus Ventures, Look AI Ventures, and the superangels group, plus follow-on from SOSV, OMA, and 12 Rounds Capital. Sodex builds AI-powered technology that automatically surveys and digitally maps construction sites, mines, and infrastructure projects while they operate — no separate survey pass required.\n\nCapmont partner Michael Wittner framed the thesis: \"For the first time, Sodex makes physical construction activity measurable and controllable in real time, thereby creating the data foundation on which the industry will be managed in the future.\"",
            whyItMatters:
              "Remember Garner's point in story one — data readiness is the bottleneck? This is the supply side of that same trade. Continuous, automated site capture turns the jobsite itself into a live dataset: progress tracking without a drone pilot on the payroll, earthworks volumes without a survey crew, as-built conditions that never drift from reality. If your firm still reconciles jobsite reality against the model once a week by hand, tools in this category are how that gap closes — and how disputes about \"what was actually built when\" start being settled by data instead of memory.",
            source: "Proptech Connect, July 13, 2026",
            sourceUrl:
              "https://proptechconnect.com/sodex-innovations-secures-e4m-to-bring-real-time-intelligence-to-construction-sites/",
            tags: ["Construction", "Site Intelligence", "Funding"],
          },
          {
            emoji: "💼",
            industry: "Market",
            title: "Y Combinator floods construction and proptech with AI back-office startups",
            body: "YC's real estate and construction portfolio hit 126 companies as of July 2026, and the newest cohort is strikingly concentrated: FlowManual (all-in-one construction back office), Foreman (AI takeoffs, estimates, and proposals from uploaded plans), Rudus (concrete estimation, claiming 70% less estimation time), PLAN0 AI (plan-reading vision models with $20B in projects on platform), and Helonic (automatic clash detection across architectural, structural, and MEP drawings, with Procore and Autodesk integrations). On the property side, CentralComs and Brickwise are building AI agents that live inside AppFolio, Buildium, and Yardi, while RealPact automates transaction paperwork for brokerages.",
            whyItMatters:
              "Venture concentration this dense is a map of where the pain is priced. Nobody in this cohort is selling a fancy render engine — they're all attacking spreadsheets, proposals, RFIs, maintenance tickets, and deal paperwork. If you run a small firm, the practical move isn't to adopt all of these; it's to notice that the admin tasks eating your evenings are now cheap enough for a seed-stage startup to automate — which means within a year, your competitors will have. Pilot one tool on one project and benchmark it against your current process.",
            source: "MarketScale, July 8, 2026",
            sourceUrl:
              "https://www.marketscale.com/industries/engineering-and-construction/ycs-summer-2026-cohort-floods-construction-and-proptech-with-ai-back-office-tools",
            tags: ["Proptech", "Y Combinator", "Back Office"],
          },
          {
            emoji: "🎨",
            industry: "Interior Design",
            title: "Image models learned layers — and that changes design visualization",
            body: "Two releases within 24 hours pushed AI image generation from \"generator\" to \"design tool.\" ByteDance's Seedream 5.0 Pro ships interactive precision editing (point, lasso, sketch), intelligent layer separation that decomposes an image into editable layers, and 4K native output — rolling out enterprise-first via the BytePlus API, Dreamina, and Magnific. A day later, Reve 2.1 took #2 on the Text-to-Image Arena with a fundamentally different architecture: images are built through a layout engine, so every element lands on its own editable layer — change the sofa, and the image rebuilds around it instead of regenerating from scratch.",
            whyItMatters:
              "Layers are the difference between a pretty picture and a working document. For interior designers and furniture brands, the single biggest failure mode of AI visualization has been the all-or-nothing regeneration: fix the rug, lose the lighting. Layer-based generation means you can hold a client-approved scheme constant and swap one product, one finish, one wall color — which is how real revision cycles actually work. This is the week AI renders started behaving like design files. If you sell furniture, it's also the week product-swap lifestyle imagery got dramatically cheaper.",
            source: "ThursdAI, July 8–9, 2026",
            sourceUrl: "https://thursdai.news/releases/2026-07",
            tags: ["Image AI", "Design Tools", "Layers"],
          },
          {
            emoji: "🤖",
            industry: "Market",
            title: "Meta ships Muse Spark 1.1 — and its first-ever paid developer API",
            body: "Meta announced Muse Spark 1.1, a 1M-token-context agentic model it claims rivals the top frontier models on agentic benchmarks, with computer use across desktop, browser, and mobile, and parallel subagent delegation. The bigger structural news: it arrives with Meta's first-ever paid developer API, in public preview at $1.25/$4.25 per million tokens (US-only at launch, $20 free credits), with Replit, Cline, and Box as early partners. No open weights — a notable break from Meta's Llama-era playbook.",
            whyItMatters:
              "For AEC and design businesses, two things changed. First, pricing: a frontier-class agentic model at $1.25 per million input tokens keeps dragging down the cost of running AI over your document-heavy workflows — bids, specs, listings, punch lists. Second, computer use across desktop and browser is the capability to watch: agents that can operate the software you already own (a CRM, a PM tool, even a design app) rather than requiring everything to have an API. Treat vendor benchmark claims with the usual skepticism, and test on your own workflows before committing — but the direction is unambiguous: the agents are learning to use your tools, not the other way around.",
            source: "ThursdAI, July 9, 2026",
            sourceUrl: "https://thursdai.news/releases/2026-07",
            tags: ["AI Models", "Agentic", "Meta"],
          },
        ],
      },
      {
        type: "what-to-watch",
        heading: "The Through-Line",
        paragraphs: [
          "Every story this week is about AI closing the distance to where work physically happens: Palantir's platform reaching field teams, Sodex mapping sites in real time, YC startups embedding agents inside Yardi and Procore, image models exposing their layers to a designer's hand, and Meta's agents learning to drive desktop software. The \"AI as a separate app you visit\" era is ending in the built environment; the \"AI inside the tools and places you already work\" era is being funded, shipped, and priced right now.",
          "The strategic read for anyone in architecture, construction, real estate, interior design, or furniture: stop evaluating AI tools by their demos and start evaluating them by their integrations. The winners this week all share one trait — they meet the work where it already lives.",
        ],
      },
      {
        type: "disclaimer",
        text: "Editorial note: This roundup summarizes reporting from the sources linked above; figures and claims belong to those sources. Always verify specifics against the primary source before acting on them.",
      },
    ],
  },
  {
    slug: "ai-news-2026-07-07",
    title:
      "AI News Roundup — Week of July 7, 2026: Homebuilding's $95M Bet, Zillow x Gemini, and Agentic Models Hit the Jobsite",
    newsType: "weekly-roundup",
    thumbnail: "/images/ai-news/ai-news-2026-07-07-thumbnail.webp",
    heroImage: "/images/ai-news/ai-news-hero.webp",
    excerpt:
      "This week in AI for the built environment: Higharc raises $95M to scale homebuilding AI, Zillow partners with Google Gemini, Zenerate teams with AvalonBay on feasibility, and new agentic models change what's possible for AEC teams.",
    publishedDate: "2026-07-07",
    readingTime: "6 min",
    weekOf: "July 7, 2026",
    nextRoundup: "Week of July 14, 2026",
    inArticleImages: [
      "/images/ai-news/ai-news-2026-07-07-1.webp",
      "/images/ai-news/ai-news-2026-07-07-2.webp",
    ],
    tags: [
      "AI News",
      "Construction",
      "Real Estate",
      "Architecture",
      "Interior Design",
      "Weekly Roundup",
    ],
    content: [
      {
        type: "paragraph",
        text: "The money and the models both moved this week — and for once, a lot of it pointed straight at the built environment. Homebuilding AI pulled in a nine-figure round, two of the biggest names in property search and generative design announced partnerships, and the frontier labs shipped models that change what an AEC or design team can realistically automate.",
      },
      {
        type: "paragraph",
        text: "Here are the five stories worth your attention, and why each one matters if you design, build, sell, or furnish spaces for a living.",
      },
      {
        type: "quick-hits",
        heading: "The 5 Stories That Matter This Week",
        items: [
          {
            emoji: "🏗️",
            industry: "Construction",
            title: "Higharc raises $95M to scale AI across the homebuilding lifecycle",
            body: "Higharc, which builds AI for the full design-to-construction homebuilding workflow, announced a $95 million Series C led by Insight Partners, bringing total funding to more than $170 million. Alongside the raise, the company announced a deal with US LBM — one of the largest distributors of lumber and building materials in the US — extending its platform from design and construction into the materials supply chain.\n\nCEO Marc Minor framed the thesis bluntly: AI is no longer just assisting builders, it's \"reshaping how builders work, cutting time and cost per job.\" The new capital goes toward deeper AI product development and connecting suppliers onto the same system builders already use.",
            whyItMatters:
              "This is one of the largest AEC-specific AI rounds of the year, and the supply-chain angle is the tell. The value isn't a slicker render — it's stitching design, construction, and procurement into one automated pipeline. For anyone in construction or residential real estate, expect \"AI that quotes materials from your design\" to move from novelty to table stakes.",
            source: "Proptech Connect, July 2, 2026",
            sourceUrl:
              "https://proptechconnect.com/higharc-raises-95m-series-c-to-scale-ai-for-homebuilding/",
            tags: ["Construction", "Homebuilding", "Funding"],
          },
          {
            emoji: "🏠",
            industry: "Real Estate",
            title: "Zillow partners with Google Gemini for rental property search",
            body: "Zillow announced a partnership with Google to bring Gemini into its rental property experience. It's a headline signal more than a feature launch: the biggest US real estate marketplace is wiring a frontier model directly into how renters search and evaluate listings.",
            whyItMatters:
              "When Zillow standardizes on conversational, model-driven search, listing quality stops being about keyword stuffing and starts being about structured, accurate, machine-readable data. If you list or market property, the practical takeaway is to get your listing data clean and complete now — the AI layer rewards it.",
            source: "Proptech Connect, July 2, 2026",
            sourceUrl:
              "https://proptechconnect.com/zillow-announces-google-gemini-partnership-for-rental-properties/",
            tags: ["Real Estate", "Search", "Google Gemini"],
          },
          {
            emoji: "🏛️",
            industry: "Architecture",
            title: "Zenerate teams with AvalonBay on early-stage multifamily feasibility",
            body: "Generative-design platform Zenerate announced a partnership with AvalonBay Communities to support early-stage feasibility analysis for multifamily projects. In practice, that means running AI-driven massing and yield studies to test what a site can hold — unit counts, layouts, and returns — before an architect commits hours to a scheme.",
            whyItMatters:
              "This is generative design earning its keep at the exact moment it's most valuable: the go/no-go decision. For architects and developers, the edge is no longer producing one option slowly — it's pressure-testing dozens of options in an afternoon, then bringing human judgment to the two or three that actually work for the site and the budget.",
            source: "Proptech Connect, July 1, 2026",
            sourceUrl:
              "https://proptechconnect.com/zenerate-announces-partnership-with-avalonbay-communities-to-support-early-stage-multifamily-feasibility-analysis/",
            tags: ["Architecture", "Generative Design", "Multifamily"],
          },
          {
            emoji: "🤖",
            industry: "Market",
            title: "Anthropic ships Claude Sonnet 5 — its most agentic model yet",
            body: "Anthropic launched Claude Sonnet 5 on July 1, describing it as its most agentic model to date: able to autonomously operate tools like browsers and terminals while delivering near-flagship performance at a meaningfully lower cost. It landed the same week OpenAI detailed a new custom inference chip, underlining how hard the labs are pushing on cheaper, more capable automation.",
            whyItMatters:
              "\"Agentic\" is the word to watch for AEC. The near-term application isn't chat — it's an assistant that can read a drawing set, cross-check it against specs, flag QA/QC issues, and draft the compliance paperwork, the way tools like Autodesk's and Structured AI's are already pointing. Lower cost per task is what turns those demos into something a small firm can actually run at scale.",
            source: "MarketingProfs, July 3, 2026",
            sourceUrl:
              "https://www.marketingprofs.com/opinions/2026/55197/ai-update-july-3-2026-ai-news-and-views-from-the-past-week/",
            tags: ["AI Models", "Agentic", "Anthropic"],
          },
          {
            emoji: "🎨",
            industry: "Interior Design",
            title: "Google DeepMind releases faster, cheaper image models",
            body: "Google DeepMind rolled out new generative-media models, including Nano Banana 2 Lite — pitched as its fastest, most cost-efficient image generator — alongside a lightweight Gemini variant. The theme mirrors Anthropic's: not just more capable, but dramatically cheaper per output.",
            whyItMatters:
              "Rendering economics are the story here. For interior designers, architects, and furniture brands, the cost of a photorealistic concept keeps falling toward zero — which means the render itself stops being the differentiator. When every competitor can generate a slick visual overnight, your point of view, your curation, and your ability to say \"not that one\" become the pitch. Cheap image generation also makes shoppable, real-product visualization (moodboard-as-shopping-cart) far more viable to build on top of.",
            source: "LLM-Stats, July 2026",
            sourceUrl: "https://llm-stats.com/llm-updates",
            tags: ["Image AI", "Rendering", "Google DeepMind"],
          },
        ],
      },
      {
        type: "what-to-watch",
        heading: "The Through-Line",
        paragraphs: [
          "Two forces converged this week. Capital is flowing into AI that automates the whole built-environment workflow — not one step, but design-to-procurement (Higharc), search (Zillow), and feasibility (Zenerate). At the same time, the frontier models got cheaper and more autonomous, which is what makes those end-to-end pipelines affordable to run.",
          "For a working professional in architecture, construction, real estate, interior design, or furniture, the strategic move is the same one it's been all year: let AI take the first 80% — the variations, the studies, the drafts, the renders — and reinvest your hours in the 20% clients actually pay a premium for. Judgment, taste, and knowing which option is right.",
        ],
      },
      {
        type: "disclaimer",
        text: "Editorial note: This roundup summarizes reporting from the sources linked above; figures and claims belong to those sources. Always verify specifics against the primary source before acting on them.",
      },
    ],
  },
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
    inArticleImages: [
      "/images/ai-news/ai-news_weekly-roundup-june-30-2026-1.webp",
      "/images/ai-news/ai-news_weekly-roundup-june-30-2026-2.webp",
    ],
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
