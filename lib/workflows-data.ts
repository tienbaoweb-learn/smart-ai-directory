// ─────────────────────────────────────────────────────────────────────────────
// Workflows data
//
// Every tool referenced here MUST have a published review page at /tools/<slug>
// (an MDX file in content/tools). The tool registry below is the single source
// of truth for a workflow tool's display name, logo color and link — workflows
// reference tools by slug so the listing page and the detail page stay in sync.
//
// Logos are synced with the review pages: when a tool has a real logo image in
// TOOL_LOGO_URLS we use it; otherwise we fall back to the colored initials.
// ─────────────────────────────────────────────────────────────────────────────

import { TOOL_LOGO_URLS } from "../app/data/tool-logos";

export interface WorkflowTool {
  slug: string; // matches content/tools/<slug>.mdx → /tools/<slug>
  name: string;
  logoText: string;
  logoBg: string;
}

/** Real logo image used on the tool's review page, or "" to fall back to initials. */
export function workflowToolLogoUrl(slug: string): string {
  return TOOL_LOGO_URLS[slug] ?? "";
}

// ── Tool registry (reviewed tools only) ──────────────────────────────────────
export const WORKFLOW_TOOLS = {
  // Design & visualization
  sofabrain:       { slug: "sofabrain",       name: "SofaBrain",       logoText: "S",  logoBg: "bg-indigo-600"  },
  "collov-ai":     { slug: "collov-ai",       name: "Collov AI",       logoText: "CA", logoBg: "bg-rose-600"    },
  homedesigns:     { slug: "homedesigns",     name: "Homedesigns.ai",  logoText: "HA", logoBg: "bg-purple-600"  },
  designsense:     { slug: "designsense",     name: "DesignSense.ai",  logoText: "DA", logoBg: "bg-purple-600"  },
  "planner-5d":    { slug: "planner-5d",      name: "Planner 5D",      logoText: "P5", logoBg: "bg-orange-600"  },
  "d5-render":     { slug: "d5-render",       name: "D5 Render",       logoText: "D5", logoBg: "bg-blue-600"    },
  "rendar-ai":     { slug: "rendar-ai",       name: "Rendar AI",       logoText: "RA", logoBg: "bg-indigo-600"  },
  midjourney:      { slug: "midjourney",      name: "Midjourney",      logoText: "MJ", logoBg: "bg-emerald-600" },
  // Content & marketing
  chatgpt:         { slug: "chatgpt",         name: "ChatGPT",         logoText: "GP", logoBg: "bg-[#10A37F]"   },
  claude:          { slug: "claude",          name: "Claude",          logoText: "Cl", logoBg: "bg-[#D97706]"   },
  "jasper-ai":     { slug: "jasper-ai",       name: "Jasper AI",       logoText: "JA", logoBg: "bg-rose-600"    },
  grammarly:       { slug: "grammarly",       name: "Grammarly",       logoText: "G",  logoBg: "bg-[#15C39A]"   },
  searchatlas:     { slug: "searchatlas",     name: "SearchAtlas",     logoText: "SA", logoBg: "bg-teal-600"    },
  "gixo-ai":       { slug: "gixo-ai",         name: "Gixo AI",         logoText: "GA", logoBg: "bg-rose-600"    },
  pushalert:       { slug: "pushalert",       name: "PushAlert",       logoText: "PA", logoBg: "bg-blue-600"    },
  // Sales & lead gen
  "grape-leads":   { slug: "grape-leads",     name: "Grape Leads",     logoText: "GL", logoBg: "bg-indigo-600"  },
  emaillistverify: { slug: "emaillistverify", name: "EmailListVerify", logoText: "E",  logoBg: "bg-slate-700"   },
  "buzz-ai":       { slug: "buzz-ai",         name: "Buzz.ai",         logoText: "BA", logoBg: "bg-teal-600"    },
  warmupinbox:     { slug: "warmupinbox",     name: "Warmup Inbox",    logoText: "WI", logoBg: "bg-purple-600"  },
  "leader-crm":    { slug: "leader-crm",      name: "Leader CRM",      logoText: "LC", logoBg: "bg-blue-600"    },
  guideflow:       { slug: "guideflow",       name: "Guideflow",       logoText: "GF", logoBg: "bg-blue-600"    },
  // Productivity
  "notion-ai":     { slug: "notion-ai",       name: "Notion AI",       logoText: "N",  logoBg: "bg-gray-900"    },
  "perplexity-ai": { slug: "perplexity-ai",   name: "Perplexity AI",   logoText: "Px", logoBg: "bg-[#1E293B]"   },
  "homesage-ai":   { slug: "homesage-ai",     name: "Homesage AI",     logoText: "HS", logoBg: "bg-emerald-600" },
  "team-pulse":    { slug: "team-pulse",      name: "Team Pulse",      logoText: "TP", logoBg: "bg-blue-600"    },
  signeasy:        { slug: "signeasy",        name: "SignEasy",        logoText: "SE", logoBg: "bg-rose-600"    },
  pricefy:         { slug: "pricefy",         name: "Pricefy",         logoText: "P",  logoBg: "bg-slate-700"   },
  // Automation
  buildots:        { slug: "buildots",        name: "Buildots",        logoText: "BD", logoBg: "bg-[#6484A4]"   },
  make:            { slug: "make",            name: "Make",            logoText: "M",  logoBg: "bg-purple-700"  },
  dynamiq:         { slug: "dynamiq",         name: "Dynamiq",         logoText: "D",  logoBg: "bg-orange-600"  },
  "help-center":   { slug: "help-center",     name: "Help.center",     logoText: "HC", logoBg: "bg-teal-600"    },
  "customgpt-ai":  { slug: "customgpt-ai",    name: "CustomGPT.ai",    logoText: "CG", logoBg: "bg-indigo-600"  },
  algomo:          { slug: "algomo",          name: "Algomo",          logoText: "A",  logoBg: "bg-emerald-600" },
  // Architecture / design
  architectgpt:        { slug: "architectgpt",        name: "ArchitectGPT",       logoText: "AG", logoBg: "bg-blue-700"    },
  "sketchup-diffusion":{ slug: "sketchup-diffusion",  name: "SketchUp Diffusion", logoText: "SD", logoBg: "bg-indigo-600"  },
  "interior-ai":       { slug: "interior-ai",         name: "InteriorAI",         logoText: "IA", logoBg: "bg-rose-600"    },
} as const satisfies Record<string, WorkflowTool>;

export type WorkflowToolSlug = keyof typeof WORKFLOW_TOOLS;

// A step can reference a reviewed tool (toolSlug), name a tool that isn't reviewed
// yet (toolName, no review link), or be a manual bridge step with no tool at all.
export interface WorkflowStep {
  toolSlug?: WorkflowToolSlug; // reviewed tool in the registry → renders logo + review link
  toolName?: string; // named tool without a review yet (e.g. Maket) → no link
  manual?: boolean; // manual bridge step (no AI tool)
  role?: string; // short label for the summary table ("AI render", "3D model")
  title: string;
  description: string;
  tip?: string;
}

export interface Workflow {
  slug: string;
  title: string;
  description: string;
  category: string;           // business function (matches BIZ_THEME keys)
  industry: string;           // furniture | architecture | construction | realestate
  intro: string;              // short paragraph for the detail page
  outcome: string;            // what you get at the end
  stepsList: WorkflowStep[];  // ordered steps (each references a reviewed tool)
  duration: string;
  date: string;
  tags: string[];
  iconBg: string;             // single icon color for the latest table row
  isFeatured: boolean;

  // ── Optional rich sections (backward-compatible; omit on simple workflows) ──
  faq?: { question: string; answer: string }[];
  mistakes?: { title: string; body: string }[];
  relatedComparisons?: string[]; // comparison slugs (only rendered if they exist)

  // ── Derived for the listing page (filled in by withDerived) ──
  toolsUsed: Array<{ bg: string; text: string; slug: string; name: string; logoUrl: string }>;
  steps: number;
  toolCount: number;
  href: string;
}

// Raw workflow definition (everything except the derived fields).
type RawWorkflow = Omit<Workflow, "toolsUsed" | "steps" | "toolCount" | "href">;

// Derive the icon chain, step/tool counts and href from a raw workflow so the
// listing page and detail page never drift out of sync.
function withDerived(w: RawWorkflow): Workflow {
  // Only steps that reference a reviewed registry tool feed the icon chain/counts;
  // manual bridge steps and not-yet-reviewed tools are skipped here.
  const orderedSlugs = w.stepsList
    .map((s) => s.toolSlug)
    .filter((s): s is WorkflowToolSlug => Boolean(s));
  const uniqueSlugs = [...new Set(orderedSlugs)];
  const toolsUsed = uniqueSlugs.slice(0, 4).map((slug) => {
    const t = WORKFLOW_TOOLS[slug];
    return { bg: t.logoBg, text: t.logoText, slug: t.slug, name: t.name, logoUrl: workflowToolLogoUrl(t.slug) };
  });
  return {
    ...w,
    toolsUsed,
    steps: w.stepsList.length,
    toolCount: uniqueSlugs.length,
    href: `/resources/workflows/${w.slug}`,
  };
}

const RAW_WORKFLOWS: RawWorkflow[] = [
  // ── Featured (4) ────────────────────────────────────────────────────────────
  {
    slug: "interior-design-concept-to-client-workflow",
    title: "Interior Design Concept to Client Presentation",
    description: "Turn an empty room into staged concepts and a polished client board.",
    category: "Design & Creative",
    industry: "furniture",
    intro:
      "A repeatable workflow for interior designers and furniture studios: go from a single room photo to multiple styled concepts and a client-ready presentation — without a render farm or a week of revisions.",
    outcome:
      "3–4 styled room concepts, a mood board and a shareable presentation you can send to the client the same day.",
    stepsList: [
      { toolSlug: "sofabrain",   title: "Generate base room concepts", description: "Upload a photo of the empty or existing room and generate several furnished design directions in different styles (modern, Scandinavian, industrial).", tip: "Generate 3–4 styles so the client has real choices to react to." },
      { toolSlug: "collov-ai",   title: "Refine the chosen direction", description: "Take the style the client leans toward and refine furniture placement, color palette and materials until the room feels intentional." },
      { toolSlug: "midjourney",  title: "Create hero mood imagery", description: "Generate high-impact mood and detail shots (textures, accent pieces, lighting) to set the emotional tone of the board." },
      { toolSlug: "homedesigns", title: "Produce final styled renders", description: "Render the finalized concept at presentation quality from a couple of angles." },
      { toolSlug: "chatgpt",     title: "Write the design rationale", description: "Draft a short, persuasive rationale for each concept — why these pieces, this palette, this layout." },
      { toolSlug: "notion-ai",   title: "Assemble the client board", description: "Lay everything out in a clean Notion page or doc with renders, rationale and a pricing summary, then share the link.", tip: "Keep one reusable template so every new client board takes minutes." },
    ],
    duration: "35 min",
    date: "Jun 18, 2026",
    tags: ["interior-design", "ai-image-generation", "furniture"],
    iconBg: "bg-indigo-600",
    isFeatured: true,
  },
  {
    slug: "architectural-visualization-workflow",
    title: "Architectural Visualization Workflow",
    description: "Go from floor plan to photorealistic renders and a concept deck.",
    category: "Design & Creative",
    industry: "architecture",
    intro:
      "An end-to-end visualization pipeline for architecture firms: model the space, render it photorealistically, generate concept imagery for the narrative, and package it into a deck the client understands at a glance.",
    outcome:
      "A set of photorealistic renders plus a concept deck ready for the client or planning submission.",
    stepsList: [
      { toolSlug: "planner-5d",  title: "Build the space from the plan", description: "Recreate the floor plan in 3D and set up rooms, openings and key furniture so the geometry is accurate." },
      { toolSlug: "d5-render",   title: "Render photorealistic views", description: "Apply real-time lighting and materials and export photorealistic stills of the main views.", tip: "Lock your camera angles first so iterations stay consistent." },
      { toolSlug: "midjourney",  title: "Generate concept & context imagery", description: "Produce atmospheric concept shots — landscaping, time-of-day, surrounding context — to support the design story." },
      { toolSlug: "rendar-ai",   title: "Enhance and upscale finals", description: "Clean up, upscale and color-grade the final renders so they hold up at presentation size." },
      { toolSlug: "claude",      title: "Write the design narrative", description: "Draft the concept narrative, materials notes and a one-paragraph summary per view." },
      { toolSlug: "notion-ai",   title: "Compile the concept deck", description: "Arrange renders and narrative into a structured deck and export to share or present." },
    ],
    duration: "45 min",
    date: "Jun 16, 2026",
    tags: ["architecture", "ai-image-generation", "ai-rendering"],
    iconBg: "bg-blue-600",
    isFeatured: true,
  },
  {
    slug: "real-estate-listing-and-outreach-workflow",
    title: "Real Estate Listing & Outreach Workflow",
    description: "Stage photos, write the listing, value the property and reach buyers.",
    category: "Sales & Lead Generation",
    industry: "realestate",
    intro:
      "A full listing-to-outreach workflow for agents: virtually stage the property, generate the listing copy, ground the price in data, and run a clean outreach sequence to your buyer list — all from one set of photos.",
    outcome:
      "A staged photo set, a published-ready listing description, a price estimate and a warmed-up outreach sequence.",
    stepsList: [
      { toolSlug: "collov-ai",     title: "Virtually stage the property", description: "Stage empty or dated rooms with realistic furniture so the listing photos sell the lifestyle, not the vacancy." },
      { toolSlug: "homesage-ai",   title: "Estimate value & talking points", description: "Pull a data-backed value estimate and the selling points worth leading with." },
      { toolSlug: "chatgpt",       title: "Write the listing description", description: "Generate an MLS-ready description plus social captions from the property facts and staged photos.", tip: "Feed it the real specs — square footage, upgrades, neighborhood — for copy that doesn't sound generic." },
      { toolSlug: "emaillistverify", title: "Clean your buyer list", description: "Verify and clean your contact list so the outreach actually lands and your domain stays healthy." },
      { toolSlug: "warmupinbox",   title: "Warm up the sending inbox", description: "Run inbox warm-up so a burst of listing emails doesn't trip spam filters." },
      { toolSlug: "leader-crm",    title: "Track leads & follow up", description: "Log responding buyers in the CRM and trigger timely follow-ups so no warm lead goes cold." },
    ],
    duration: "40 min",
    date: "Jun 14, 2026",
    tags: ["realestate", "ai-for-business", "automation"],
    iconBg: "bg-rose-600",
    isFeatured: true,
  },
  {
    slug: "construction-progress-reporting-workflow",
    title: "Construction Progress Reporting Workflow",
    description: "Track site progress, summarize updates and get sign-off, weekly.",
    category: "Project Management",
    industry: "construction",
    intro:
      "A weekly reporting loop for contractors and project managers: capture real site progress, turn it into a clear status report the client can read, keep the team aligned, and collect a signed approval — without the Friday-afternoon scramble.",
    outcome:
      "A weekly progress report, an aligned team and a signed client approval, on repeat.",
    stepsList: [
      { toolSlug: "buildots",   title: "Capture site progress", description: "Use 360° capture and AI tracking to measure actual progress against the plan and flag what's behind." },
      { toolSlug: "claude",     title: "Draft the status report", description: "Turn the captured data and your notes into a clear weekly status report — done, blocked, next.", tip: "Keep a fixed report structure so clients always know where to look." },
      { toolSlug: "team-pulse", title: "Align the team", description: "Share the summary, surface blockers and confirm owners and dates with the crew and subs." },
      { toolSlug: "notion-ai",  title: "Maintain the project log", description: "Append the report to a living project log so history is searchable and nothing gets lost." },
      { toolSlug: "signeasy",   title: "Get client sign-off", description: "Send the report or change order for a quick e-signature so approvals are documented." },
    ],
    duration: "35 min",
    date: "Jun 12, 2026",
    tags: ["construction", "productivity", "workflow"],
    iconBg: "bg-slate-600",
    isFeatured: true,
  },

  // ── Latest (6) ──────────────────────────────────────────────────────────────
  {
    slug: "seo-content-workflow-for-aec-firms",
    title: "SEO Content Workflow for AEC Firms",
    description: "Research, write, polish and optimize ranking content for AEC firms.",
    category: "Content Creation",
    industry: "architecture",
    intro:
      "A search-first content workflow for architecture, engineering and construction firms that want to rank for the services they actually sell — research the intent, draft fast, polish the language, and ship it optimized.",
    outcome:
      "One SEO-optimized article, fact-checked and ready to publish, with internal links and meta in place.",
    stepsList: [
      { toolSlug: "perplexity-ai", title: "Research the topic & intent", description: "Gather sourced facts, competitor angles and the questions buyers actually ask." },
      { toolSlug: "jasper-ai",     title: "Draft the article", description: "Generate a structured first draft on-brand, using the research as the brief." },
      { toolSlug: "grammarly",     title: "Polish tone & clarity", description: "Tighten grammar, tone and readability so it reads like an expert, not a template." },
      { toolSlug: "searchatlas",   title: "Optimize for search", description: "Add target keywords, internal links and meta, and check the on-page SEO before publishing.", tip: "Match one article to one primary keyword and intent — don't dilute it." },
    ],
    duration: "30 min",
    date: "Jun 9, 2026",
    tags: ["architecture", "ai-writing", "seo"],
    iconBg: "bg-teal-600",
    isFeatured: false,
  },
  {
    slug: "furniture-product-listing-workflow",
    title: "Furniture Product Listing Workflow",
    description: "Create product visuals, descriptions and pricing for ecommerce at scale.",
    category: "Content Creation",
    industry: "furniture",
    intro:
      "A workflow for furniture brands and retailers selling online: produce clean product visuals, write descriptions that convert, and price competitively — repeatable across an entire catalog.",
    outcome:
      "A ready-to-publish product page: styled visuals, an SEO-friendly description and a data-backed price.",
    stepsList: [
      { toolSlug: "designsense", title: "Create styled product visuals", description: "Generate styled, in-context product shots so each piece looks at home in a real room." },
      { toolSlug: "chatgpt",     title: "Write the product description", description: "Draft a benefit-led description and bullet specs from the product attributes." },
      { toolSlug: "gixo-ai",     title: "Generate marketing variants", description: "Spin up ad and social copy variants to test which angle sells." },
      { toolSlug: "pricefy",     title: "Price competitively", description: "Monitor competitor pricing and set a price that protects margin without losing the sale.", tip: "Re-run pricing on a schedule — the market moves." },
    ],
    duration: "25 min",
    date: "Jun 7, 2026",
    tags: ["furniture", "ai-writing", "ai-for-business"],
    iconBg: "bg-purple-600",
    isFeatured: false,
  },
  {
    slug: "contractor-lead-generation-workflow",
    title: "Lead Generation Workflow for Contractors",
    description: "Find prospects, verify contacts and run outreach that actually lands.",
    category: "Sales & Lead Generation",
    industry: "construction",
    intro:
      "A prospecting workflow for contractors and trades: build a targeted list, clean it, warm your inbox and run personalized outreach so your bids land in front of real decision-makers.",
    outcome:
      "A verified prospect list and a live, deliverable outreach sequence feeding your pipeline.",
    stepsList: [
      { toolSlug: "grape-leads",     title: "Find target prospects", description: "Build a list of contractors, developers or property managers that match your ideal job." },
      { toolSlug: "emaillistverify", title: "Verify the contacts", description: "Clean and verify emails so you protect deliverability and your sender reputation." },
      { toolSlug: "warmupinbox",     title: "Warm up your inbox", description: "Ramp inbox reputation so cold outreach reaches the inbox, not spam." },
      { toolSlug: "buzz-ai",         title: "Run personalized outreach", description: "Send personalized sequences at scale and track opens and replies.", tip: "Personalize the first line — generic intros get deleted." },
      { toolSlug: "leader-crm",      title: "Manage replies & follow-up", description: "Route interested replies into the CRM and automate timely follow-ups." },
    ],
    duration: "45 min",
    date: "Jun 5, 2026",
    tags: ["construction", "automation", "ai-for-business"],
    iconBg: "bg-indigo-600",
    isFeatured: false,
  },
  {
    slug: "real-estate-social-media-workflow",
    title: "Real Estate Social Media Workflow",
    description: "Turn listings into a week of on-brand social posts and re-engagement.",
    category: "Marketing",
    industry: "realestate",
    intro:
      "A content workflow for agents and brokerages: turn each listing into a week of platform-ready social content and bring quiet leads back with timely notifications.",
    outcome:
      "A week of scheduled, on-brand posts plus a re-engagement push to your audience.",
    stepsList: [
      { toolSlug: "midjourney", title: "Create scroll-stopping visuals", description: "Generate branded graphics and lifestyle imagery to pair with listing photos." },
      { toolSlug: "jasper-ai",  title: "Write platform captions", description: "Draft captions and hooks tailored to each platform from the listing details." },
      { toolSlug: "claude",     title: "Build the posting plan", description: "Turn the assets into a structured week-long calendar with hashtags and CTAs.", tip: "Batch a week at a time so posting never falls off." },
      { toolSlug: "pushalert",  title: "Re-engage your audience", description: "Send web push notifications for new listings and open houses to pull warm visitors back." },
    ],
    duration: "25 min",
    date: "Jun 3, 2026",
    tags: ["realestate", "marketing", "ai-writing"],
    iconBg: "bg-rose-500",
    isFeatured: false,
  },
  {
    slug: "client-onboarding-and-proposal-workflow",
    title: "Client Onboarding & Proposal Workflow",
    description: "Demo, propose, sign and kick off new clients without the busywork.",
    category: "Operations",
    industry: "furniture",
    intro:
      "A smooth handoff from won deal to active project: show clients how you work, send a clear proposal, collect the signature and trigger onboarding automatically — so nothing stalls between yes and start.",
    outcome:
      "A signed proposal and an onboarded client with the kickoff tasks already created.",
    stepsList: [
      { toolSlug: "guideflow", title: "Create an interactive demo", description: "Record a guided, interactive walkthrough of your process or product to send ahead of the call." },
      { toolSlug: "chatgpt",   title: "Draft the proposal", description: "Generate a tailored proposal and scope from the discovery notes." },
      { toolSlug: "signeasy",  title: "Collect the signature", description: "Send the proposal for e-signature and get it back without printer roulette." },
      { toolSlug: "make",      title: "Automate onboarding", description: "Trigger onboarding the moment it's signed — create tasks, send the welcome, set up folders.", tip: "Build the automation once; every new client runs it for free." },
      { toolSlug: "notion-ai", title: "Spin up the project space", description: "Generate the client's project workspace, brief and milestone list from a template." },
    ],
    duration: "30 min",
    date: "Jun 1, 2026",
    tags: ["furniture", "productivity", "automation"],
    iconBg: "bg-blue-500",
    isFeatured: false,
  },
  {
    slug: "customer-support-automation-workflow",
    title: "Customer Support Automation Workflow",
    description: "Deflect repeat questions and route the rest with an AI support layer.",
    category: "Customer Support",
    industry: "realestate",
    intro:
      "A support workflow for any service business: build a knowledge base, put an AI agent on the front line to answer the repeat questions instantly, and route everything else to a human with full context.",
    outcome:
      "A self-serve help center and an AI agent deflecting routine tickets around the clock.",
    stepsList: [
      { toolSlug: "help-center",  title: "Build the knowledge base", description: "Stand up a searchable help center with your top articles and FAQs." },
      { toolSlug: "customgpt-ai", title: "Train an AI agent on your docs", description: "Feed your content to a custom AI agent so answers stay accurate and on-brand." },
      { toolSlug: "algomo",       title: "Deploy front-line chat", description: "Put the AI chat on your site to resolve common questions instantly, 24/7.", tip: "Review unanswered questions weekly and feed the gaps back into the docs." },
      { toolSlug: "dynamiq",      title: "Route & automate the rest", description: "Escalate complex cases to a human with full context and automate the follow-up." },
    ],
    duration: "20 min",
    date: "May 30, 2026",
    tags: ["realestate", "automation", "productivity"],
    iconBg: "bg-teal-500",
    isFeatured: false,
  },
  {
    slug: "floor-plan-to-render",
    title: "AI Architecture Workflow: From Floor Plan to Photorealistic Render",
    description:
      "Chain AI tools to go from a floor plan to a presentation-ready render — with an honest look at the one step that's still manual.",
    category: "Design & Creative",
    industry: "architecture",
    intro:
      "You have a brief — or a rough plan — and you need a presentation-ready render fast, without standing up a full rendering suite. This workflow chains specialised AI tools for architects, designers, students, and real-estate developers doing early concept work. One honesty note up front: AI accelerates the floor plan and the final render, but turning the plan into a 3D model in the middle is still a hands-on step.",
    outcome:
      "A generated floor plan, a 3D model, and a photorealistic AI render — plus optional virtual staging — ready for a client concept review.",
    stepsList: [
      {
        toolName: "Maket",
        role: "AI floor plan",
        title: "Generate the floor plan with Maket",
        description:
          "Start from requirements — room count, approximate dimensions, and constraints — and let Maket generate 2D layout options. Generate several variations, then iterate on the one closest to the brief. This stage produces a workable plan, not a render.",
        tip: "Lock the layout before moving on — re-rendering later is cheap, re-modelling a changed plan is not.",
      },
      {
        manual: true,
        role: "3D model (manual)",
        title: "Build the 3D model in SketchUp (the manual bridge)",
        description:
          "This is the least automated step: a human turns the 2D plan into a 3D model. Import the plan as a reference, extrude the walls, and set openings and key massing. Keep it lightweight — you only need enough geometry to render a convincing view.",
      },
      {
        toolSlug: "sketchup-diffusion",
        role: "AI render (in SketchUp)",
        title: "Path A — Render inside SketchUp with SketchUp Diffusion",
        description:
          "Best when your model already lives in SketchUp. Set a camera view, write a style prompt, generate an AI render of that view, and iterate on the prompt until the look is right.",
        tip: "Set your camera angle before generating so successive prompt iterations stay comparable.",
      },
      {
        toolSlug: "architectgpt",
        role: "AI render (from image)",
        title: "Path B — Render from an image with ArchitectGPT",
        description:
          "Best when you have a screenshot, sketch, or exported model image and don't want to render inside SketchUp. Upload the image, choose a style and room type, generate, and refine. Your render path comes down to where your model lives: inside SketchUp (Path A) or as an exported image (Path B).",
      },
      {
        toolSlug: "interior-ai",
        role: "Virtual staging (optional)",
        title: "Optional — Virtual staging with InteriorAI",
        description:
          "The natural next step for real-estate and interior presentation: take the rendered space and stage or restyle the interior. Useful when the deliverable is a furnished, client-facing concept rather than a bare architectural shell.",
      },
    ],
    mistakes: [
      {
        title: "Rendering before the plan is final",
        body: "It's tempting to jump to renders, but a layout change forces you to re-model and re-render everything. Finalise the plan in stage 1 first.",
      },
      {
        title: "Expecting AI to fix proportions",
        body: "AI render tools restyle what you give them — they won't correct a 3D model with wrong scale or structural proportions. Get the geometry right in stage 2.",
      },
      {
        title: "Over-prompting the style",
        body: "Piling adjectives into a render prompt tends to muddy the result. Start simple, then adjust one variable at a time.",
      },
      {
        title: "Forgetting commercial licensing",
        body: "If renders or staged images go into paid client work, confirm each tool's licensing allows commercial use before you deliver.",
      },
    ],
    faq: [
      {
        question: "Can AI turn a floor plan directly into a render?",
        answer:
          "Partly. AI can generate the floor plan and the final render, but converting the plan into a 3D model in between is still a manual step — that's the bridge stage in this workflow.",
      },
      {
        question: "What's the best AI tool to render a SketchUp model?",
        answer:
          "SketchUp Diffusion renders directly inside SketchUp from a camera view and a style prompt. If you're not working in SketchUp, ArchitectGPT renders from an exported image or screenshot instead.",
      },
      {
        question: "Do I need SketchUp for this workflow?",
        answer:
          "Not necessarily. With ArchitectGPT you can render from a sketch or screenshot without a full 3D model — though a proper 3D model gives you more control over camera angles and consistency.",
      },
      {
        question: "Is there a fully automated floor-plan-to-render tool?",
        answer:
          "Not reliably yet. Each stage needs different capabilities, so the practical approach in 2026 is to chain specialised tools rather than expect one tool to do the whole chain.",
      },
    ],
    relatedComparisons: ["architectgpt-vs-sketchup-diffusion"],
    duration: "40 min",
    date: "Jul 2, 2026",
    tags: ["architecture", "ai-rendering", "floor-plan"],
    iconBg: "bg-blue-600",
    isFeatured: false,
  },
];

export const workflowsData: Workflow[] = RAW_WORKFLOWS.map(withDerived);

export function getWorkflowBySlug(slug: string): Workflow | undefined {
  return workflowsData.find((w) => w.slug === slug);
}

/** Every workflow whose steps reference the given reviewed tool slug (reverse links). */
export function getWorkflowsForTool(toolSlug: string): Workflow[] {
  return workflowsData.filter((w) =>
    w.stepsList.some((s) => s.toolSlug === toolSlug)
  );
}
