// ─────────────────────────────────────────────────────────────────────────────
// Alternatives pages — "Best <Tool> Alternatives"
//
// Each entry references ONE existing incumbent tool review + 3-5 existing
// alternative tool reviews (all by slug, content/tools/<slug>.mdx) and holds
// ONLY the editorial comparison content. Tool facts (name, pricing, url,
// affiliate link, rating, logo) are pulled from lib/tools.ts at render time —
// never duplicate them here.
//
// Adding a new alternatives page = add one entry below. Zero template edits.
// ─────────────────────────────────────────────────────────────────────────────

export interface AlternativeChoice {
  /** Must match a slug in alternativeSlugs. */
  slug: string;
  /** "Choose X if ..." editorial paragraph. */
  body: string;
}

export interface AlternativeComparisonRow {
  /** Must match a slug in alternativeSlugs. */
  slug: string;
  styleRange: string;
  outputQuality: string;
  /**
   * 1-5 editorial stars, OR plain text when the underlying tool reviews don't
   * support a defensible numeric score (never invent a star rating that
   * isn't backed by the tool's own review or its official site — use the
   * *Text variant instead). Provide exactly one of the pair.
   */
  professionalWorkflow?: number;
  workflowText?: string;
  /** 1-5 stars, or workflowText's sibling — see professionalWorkflow. */
  easeOfUse?: number;
  easeOfUseText?: string;
  pricing: string;
}

/** Overrides the default "Style range / Output quality / Professional workflow / Ease of use" headers for entries whose differentiators don't fit that interior-design-shaped template (e.g. construction PM, rendering software). */
export interface AlternativeComparisonColumns {
  styleRange: string;
  outputQuality: string;
  professionalWorkflow: string;
  easeOfUse: string;
}

export interface AlternativesEntry {
  /** URL slug: same as the incumbent tool's slug → /alternatives/<slug> */
  incumbentSlug: string;
  /** 2-3 sentence intro: what the incumbent is + why people look for alternatives. */
  shortDescription: string;
  /** Existing tool review slugs (content/tools/<slug>.mdx), 3-5 tools. */
  alternativeSlugs: string[];
  /** "Choose <alternative> if ..." bullets, one per alternative. */
  chooseIf: AlternativeChoice[];
  /** Column header overrides — omit to use the default interior-design labels. */
  comparisonColumns?: AlternativeComparisonColumns;
  /**
   * Set to false for pages where no alternative has a confirmed affiliate
   * link and the page is meant as traffic/authority content, not a
   * monetization surface — suppresses the "Visit <tool>" external CTA
   * entirely so cards only ever link to the internal review. Defaults to
   * true (external CTA renders whenever affiliateLink or websiteUrl exists,
   * matching every other alternatives page).
   */
  showExternalCta?: boolean;
  /** Quick-comparison table rows, one per alternative. */
  comparisonRows: AlternativeComparisonRow[];
  /** ISO date (YYYY-MM-DD). */
  lastUpdated: string;
}

export const alternativesEntries: AlternativesEntry[] = [
  {
    incumbentSlug: "planner-5d",
    shortDescription:
      "Planner 5D is a freemium home and interior design planner known for 2D floor plans and 3D room visualization aimed at homeowners and DIY users. People search for alternatives when they need more professional-grade rendering, AI-assisted design generation, or tools built for working with real furniture/product catalogs rather than a generic planner.",
    alternativeSlugs: ["homestyler", "foyr", "collov-ai", "roomgpt", "sofabrain"],
    chooseIf: [
      {
        slug: "homestyler",
        body: "Choose Homestyler if you want a full interior design platform rather than a one-shot AI restyle — it supports 2D/3D floor plans, furniture placement from a large library, and AI room redesign together. The trade-off is a steeper learning curve and slower AI rendering than AI-only tools. Freemium with subscription tiers.",
      },
      {
        slug: "foyr",
        body: "Choose Foyr Neo if you're a professional designer who needs the full pipeline — floor plan, 3D visualization, and photorealistic render in one workflow, with more material and lighting control than any AI-restyle tool here. It's the least beginner-friendly option and the most expensive, priced as premium professional SaaS.",
      },
      {
        slug: "collov-ai",
        body: "Choose Collov AI if you want AI redesign with better style consistency than RoomGPT, plus multi-round AI editing (furniture swaps, virtual staging, some shoppable furniture) through a chatbot-style workflow. Furniture scale can be occasionally off and rendering is slower. Mid-tier pricing, roughly $15–20/month based on public reviews.",
      },
      {
        slug: "roomgpt",
        body: "Choose RoomGPT if you just want the fastest, simplest entry point — upload one photo, pick a style, get a redesign in under a minute, with a free tier. You give up layout and furniture/material control, and output quality varies; treat it as inspiration, not a buildable design.",
      },
      {
        slug: "sofabrain",
        body: "Choose SofaBrain if your priority is virtual staging or swapping furniture in an existing room photo while keeping the room's structure — built more for realtors and furniture retailers than interior designers. It doesn't offer floor-plan design or a full design workflow like Foyr or Homestyler. Priced by render volume.",
      },
    ],
    comparisonRows: [
      {
        slug: "foyr",
        styleRange: "Visualization-focused",
        outputQuality: "Best for client presentation",
        professionalWorkflow: 5,
        easeOfUse: 2,
        pricing: "Premium",
      },
      {
        slug: "homestyler",
        styleRange: "Wide + manual design",
        outputQuality: "Very good (3D workflow)",
        professionalWorkflow: 4,
        easeOfUse: 3,
        pricing: "Mid-tier",
      },
      {
        slug: "collov-ai",
        styleRange: "Consistent, staging-leaning",
        outputQuality: "Good for marketing/staging",
        professionalWorkflow: 3,
        easeOfUse: 4,
        pricing: "Mid-tier",
      },
      {
        slug: "sofabrain",
        styleRange: "Furniture/staging-focused",
        outputQuality: "Good for staging, less control",
        professionalWorkflow: 2,
        easeOfUse: 4,
        pricing: "Mid-tier",
      },
      {
        slug: "roomgpt",
        styleRange: "Wide, restyle-only",
        outputQuality: "Variable",
        professionalWorkflow: 1,
        easeOfUse: 5,
        pricing: "Free / low-cost",
      },
    ],
    lastUpdated: "2026-07-22",
  },
  {
    incumbentSlug: "midjourney",
    shortDescription:
      "Midjourney is a widely used AI image generation tool, popular for concept art and mood boards, including early-stage architectural and interior design ideation. People look for alternatives when they need architecture-specific accuracy, CAD/BIM workflow integration, or a different platform than Discord/web-based generation.",
    alternativeSlugs: ["leonardo-ai", "adobe-firefly", "vizcom", "promeai", "archigpt"],
    chooseIf: [
      {
        slug: "leonardo-ai",
        body: "Choose Leonardo AI if you want real control over your outputs — fine-tuned and custom-trainable models, image guidance, and prompt controls — without giving up a genuinely usable free tier to learn on first. The trade-off is more settings to learn than Midjourney's simple prompt box, and daily free credits that a high-volume workflow will outgrow.",
      },
      {
        slug: "adobe-firefly",
        body: "Choose Adobe Firefly if you're already working inside Adobe Creative Cloud and need commercially safe imagery — Firefly trains exclusively on licensed Adobe Stock content, plugs directly into Photoshop's Generative Fill, and adds Structure/Style Reference controls beyond a text prompt. The trade-off is that full access requires a Creative Cloud subscription, and it's less suited to highly experimental, abstract styles.",
      },
      {
        slug: "vizcom",
        body: "Choose Vizcom if your process starts with an actual sketch, not a text prompt — hand-drawn or on a tablet — and you want the AI to respect your sketch's real lines and proportions rather than reinterpret the scene from scratch. It's popular across both architecture and product design. The trade-off is that it adds less value if your team starts from a finished 3D model instead of a sketch.",
      },
      {
        slug: "promeai",
        body: "Choose PromeAI if you have an existing sketch, floor plan, or 3D model file (.obj, .fbx, .stl, .3ds) and want it rendered directly — the AI Render engine preserves your original materials and textures rather than reinterpreting them, and it's accessible enough for homeowners, not just architects. The trade-off is that fine-tuning small details is more limited than dedicated 3D rendering software.",
      },
      {
        slug: "archigpt",
        body: "Choose ArchiGPT if you want an affordable, architecture-specific rendering assistant — natural-language edits for lighting, staging, and sky changes, plus an archviz toolkit for plan coloring and render-to-drawing, from $19.99/month. The trade-off is that it overlaps heavily with several similar AI rendering tools, so the fit depends on which specific archviz tasks you need.",
      },
    ],
    comparisonColumns: {
      styleRange: "Output type",
      outputQuality: "Geometry accuracy",
      professionalWorkflow: "Best for",
      easeOfUse: "Free tier",
    },
    comparisonRows: [
      {
        slug: "leonardo-ai",
        styleRange: "AI images, fine-tuned/custom models",
        outputQuality: "Low — stylistic, not model-accurate",
        workflowText: "Product/concept art with control on a budget",
        easeOfUseText: "Yes — daily generation credits",
        pricing: "Freemium",
      },
      {
        slug: "adobe-firefly",
        styleRange: "Commercial-safe AI images + vector effects",
        outputQuality: "Low — stylistic, not model-accurate",
        workflowText: "Adobe Creative Cloud users needing commercial-safe assets",
        easeOfUseText: "[VERIFY: Adobe Firefly free-tier availability]",
        pricing: "[VERIFY: Adobe Firefly current plan pricing]",
      },
      {
        slug: "vizcom",
        styleRange: "Sketch-to-render",
        outputQuality: "High — follows the sketch's actual lines and proportions",
        workflowText: "Designers who sketch by hand or tablet first",
        easeOfUseText: "[VERIFY: Vizcom free-tier availability]",
        pricing: "[VERIFY: Vizcom plan pricing]",
      },
      {
        slug: "promeai",
        styleRange: "Sketch/floor-plan/3D-file-to-render",
        outputQuality: "High — preserves the uploaded model's materials and textures",
        workflowText: "Anyone with an existing sketch, plan, or 3D file to render fast",
        easeOfUseText: "Limited free tier",
        pricing: "[VERIFY: PromeAI plan pricing beyond the limited free tier]",
      },
      {
        slug: "archigpt",
        styleRange: "Sketch/photo/3D-screenshot-to-render + archviz toolkit",
        outputQuality: "Low-medium — stylistic renders, not technical drawings",
        workflowText: "Individuals and students wanting affordable archviz",
        easeOfUseText: "[VERIFY: ArchiGPT free-tier availability]",
        pricing: "From $19.99/month",
      },
    ],
    lastUpdated: "2026-07-22",
  },
  {
    incumbentSlug: "lumion",
    shortDescription:
      "Lumion is real-time architectural visualization software known for ease of use and fast render times for walkthroughs and client presentations. People look for alternatives over pricing, render quality, or hardware requirements.",
    alternativeSlugs: ["chaos-enscape", "twinmotion-ai", "d5-render", "veras", "chaos-vantage"],
    chooseIf: [
      {
        slug: "chaos-enscape",
        body: "Choose Chaos Enscape if you design in Revit, SketchUp, Rhino, or ArchiCAD and want a real-time viewport plus one-click VR built directly into that application — model changes update in the Enscape window instantly, with no export step. The trade-off is that its real-time quality doesn't match final offline renders from Corona or V-Ray, and it needs a capable GPU.",
      },
      {
        slug: "twinmotion-ai",
        body: "Choose Twinmotion if you or your firm qualify for Epic Games' free licensing (architects, students, educators) and want Unreal Engine-grade visual quality at no cost, plus a large built-in asset library and direct CAD/BIM import. The trade-off is that commercial use at a larger firm requires a paid license tied to company size and revenue.",
      },
      {
        slug: "d5-render",
        body: "Choose D5 Render if you have an NVIDIA RTX GPU and want the fastest real-time ray tracing available — LiveSync with SketchUp, Revit, ARCHICAD, Rhino, 3ds Max, and Blender, plus AI tools like Atmosphere Match and a 16,000+ asset library. The trade-off is that it's Windows-only and requires RTX hardware, so AMD GPU or macOS teams can't use it.",
      },
      {
        slug: "veras",
        body: "Choose Veras if you want AI-styled renders generated directly from your Revit, SketchUp, or Rhino viewport without leaving the app, and you want the AI to respect your actual model geometry rather than loosely reinterpreting it. The trade-off is that it's a plugin, not a standalone renderer, so it only works inside its supported host applications.",
      },
      {
        slug: "chaos-vantage",
        body: "Choose Chaos Vantage only if you already work in V-Ray — it reads V-Ray scene files directly and turns lighting and material iteration from an overnight render cycle into an instant, interactive one. The trade-off is that it's not a standalone real-time renderer; it's a companion to an existing V-Ray investment, and it needs a high-end NVIDIA RTX GPU.",
      },
    ],
    comparisonColumns: {
      styleRange: "Rendering approach",
      outputQuality: "Platform / hardware requirement",
      professionalWorkflow: "Best for",
      easeOfUse: "Pricing",
    },
    comparisonRows: [
      {
        slug: "chaos-enscape",
        styleRange: "Real-time viewport plugin, one-click VR",
        outputQuality: "Plugin for Revit, SketchUp, Rhino, ArchiCAD; needs a capable GPU",
        workflowText: "Teams wanting rendering + VR built into their modeling app",
        easeOfUseText: "[VERIFY: Chaos Enscape subscription pricing]",
        pricing: "[VERIFY: Chaos Enscape subscription pricing]",
      },
      {
        slug: "twinmotion-ai",
        styleRange: "Real-time, built on Unreal Engine",
        outputQuality: "Standalone; imports from Revit/SketchUp/ArchiCAD; needs a capable GPU",
        workflowText: "Students, educators, and qualifying architects wanting free high-end rendering",
        easeOfUseText: "Free for qualifying architects/students/educators; paid tiers by firm size",
        pricing: "Free for qualifying users (Epic Games licensing); paid commercial tiers by firm size/revenue",
      },
      {
        slug: "d5-render",
        styleRange: "Real-time RTX ray tracing",
        outputQuality: "Requires NVIDIA RTX GPU, Windows only; LiveSync with major 3D apps",
        workflowText: "Teams with RTX hardware wanting the fastest real-time photorealism",
        easeOfUseText: "Free version available / Pro from $38/month",
        pricing: "Free version available / Pro from $38/month",
      },
      {
        slug: "veras",
        styleRange: "AI rendering from your model's live viewport, preserves geometry",
        outputQuality: "Plugin for Revit, SketchUp, Rhino",
        workflowText: "Teams wanting AI-styled renders without leaving their modeling app",
        easeOfUseText: "[VERIFY: Veras subscription pricing]",
        pricing: "[VERIFY: Veras subscription pricing]",
      },
      {
        slug: "chaos-vantage",
        styleRange: "Real-time GPU ray tracing of V-Ray scene files",
        outputQuality: "Requires high-end NVIDIA RTX GPU; V-Ray companion, not standalone",
        workflowText: "Studios already running V-Ray wanting instant lighting/material feedback",
        easeOfUseText: "[VERIFY: Chaos Vantage subscription pricing]",
        pricing: "[VERIFY: Chaos Vantage subscription pricing]",
      },
    ],
    lastUpdated: "2026-07-22",
  },
  {
    incumbentSlug: "procore-ai",
    shortDescription:
      "Procore is a construction project management platform covering scheduling, budgets, document control, and field collaboration. People look for alternatives that better fit their team size, pricing model, or need for AI-driven progress tracking.",
    alternativeSlugs: [
      "autodesk-construction-cloud",
      "fieldwire",
      "open-space",
      "doxel",
      "alice-technologies",
    ],
    showExternalCta: false,
    chooseIf: [
      {
        slug: "autodesk-construction-cloud",
        body: "Choose Autodesk Construction Cloud if you want a single connected suite spanning preconstruction through closeout, with Construction IQ surfacing design, RFI, and quality risk from your project data — especially if your firm is already in the Autodesk/BIM ecosystem. The trade-off is that it's built for larger firms that will actually adopt the connected modules, with custom, quote-based pricing to match.",
      },
      {
        slug: "fieldwire",
        body: "Choose Fieldwire if your real gap is the field, not the back office — mobile drawing access, punch lists, and task tracking that work offline on sites with unreliable connectivity. The trade-off is that it's intentionally lighter than Procore on financials, contracts, and reporting; it's a field-coordination tool, not a full project management suite.",
      },
      {
        slug: "open-space",
        body: "Choose OpenSpace if your priority is documentation, not day-to-day task management — a hard-hat-mounted 360° camera and AI automatically map site photos to your floor plan, building a navigable timeline for remote stakeholders and dispute resolution. The trade-off is that it's a documentation and visualization tool, not a scheduling or project management platform.",
      },
      {
        slug: "doxel",
        body: "Choose Doxel if you manage large commercial projects with detailed BIM models and want objective, data-driven progress tracking — autonomous robots capture LiDAR data and AI compares it against your BIM model to catch deviations before they become expensive rework. The trade-off is that it requires a BIM baseline and hardware deployment, and the ROI is clearest on larger projects.",
      },
      {
        slug: "alice-technologies",
        body: "Choose ALICE Technologies if scheduling optimization is your bottleneck — it simulates millions of possible construction sequences and ranks them by cost, duration, and resource use, rather than relying on one planner's baseline schedule. The trade-off is that it's built for large, complex projects with existing BIM data, and pricing is enterprise-tier.",
      },
    ],
    comparisonColumns: {
      styleRange: "Core focus",
      outputQuality: "Best project fit",
      professionalWorkflow: "Requires existing BIM data?",
      easeOfUse: "Pricing",
    },
    comparisonRows: [
      {
        slug: "autodesk-construction-cloud",
        styleRange: "Connected suite: preconstruction through closeout, AI risk analytics (Construction IQ)",
        outputQuality: "Larger GCs already in the Autodesk/BIM ecosystem",
        workflowText: "Benefits from it; full value assumes adopting the connected modules",
        easeOfUseText: "Custom (contact sales)",
        pricing: "Custom (contact sales)",
      },
      {
        slug: "fieldwire",
        styleRange: "Mobile-first field task/punch-list management, offline mode",
        outputQuality: "Site superintendents and subcontractors needing field coordination, not financials",
        workflowText: "No",
        easeOfUseText: "[VERIFY: Fieldwire subscription pricing]",
        pricing: "[VERIFY: Fieldwire subscription pricing]",
      },
      {
        slug: "open-space",
        styleRange: "Hands-free 360° site photo documentation mapped to floor plans",
        outputQuality: "GCs and remote stakeholders needing a visual progress timeline",
        workflowText: "Optional — can overlay against BIM for comparison",
        easeOfUseText: "[VERIFY: OpenSpace subscription pricing]",
        pricing: "[VERIFY: OpenSpace subscription pricing]",
      },
      {
        slug: "doxel",
        styleRange: "Autonomous robot LiDAR scanning compared against BIM for deviation/productivity tracking",
        outputQuality: "Large commercial projects with detailed BIM models and high rework-cost exposure",
        workflowText: "Yes — required as the comparison baseline",
        easeOfUseText: "[VERIFY: Doxel pricing model]",
        pricing: "[VERIFY: Doxel pricing model]",
      },
      {
        slug: "alice-technologies",
        styleRange: "AI schedule optioneering — simulates millions of sequencing scenarios",
        outputQuality: "Large commercial/infrastructure projects optimizing cost, time, and resources",
        workflowText: "Yes — connects to BIM for simulation inputs",
        easeOfUseText: "Enterprise-tier",
        pricing: "Enterprise-tier (not suited to small contractors)",
      },
    ],
    lastUpdated: "2026-07-22",
  },
  {
    incumbentSlug: "roomgpt",
    shortDescription:
      "RoomGPT redesigns a single room photo into a new interior style in one upload, popular for quick before/after style previews. People look for alternatives when they need more design control, commercial-grade output, or furniture-shopping integration.",
    alternativeSlugs: ["collov-ai", "homedesigns", "aihomedesign", "dehome", "instantdeco-ai"],
    chooseIf: [
      {
        slug: "collov-ai",
        body: "Choose Collov AI if you want more than a style preview — full redesign concepts, virtual staging built specifically for real estate listings, and shoppable product recommendations on some plans. The trade-off is that the more advanced staging and shopping features sit behind higher-tier plans, and there's more to learn than a single-purpose tool.",
      },
      {
        slug: "homedesigns",
        body: "Choose Homedesigns.ai if you want to compare a wide range of styles across a whole-home refresh — it covers living rooms through bathrooms plus exterior and landscaping concepts, not just one room. The trade-off is that results depend heavily on your input photo's clarity, and shown furniture isn't always directly purchasable.",
      },
      {
        slug: "aihomedesign",
        body: "Choose AI Home Design if you want interior and exterior makeovers from the same tool — useful when you're weighing curb-appeal changes alongside interior ones. The trade-off is that, like other tools in this category, fine-tuning of individual design elements is limited.",
      },
      {
        slug: "dehome",
        body: "Choose Dehome.ai if speed is what matters most — most rooms generate a redesign in 5 to 10 seconds, fast enough to compare several style directions in one sitting, with a custom-requirements field to guide the AI further. The trade-off is that speed comes with somewhat less deliberate control than slower tools.",
      },
      {
        slug: "instantdeco-ai",
        body: "Choose InstantDeco AI if you're building or operating a real estate platform, not just redesigning your own home — its API lets platforms and proptech products embed redesign generation directly, and it's built to handle high-volume batches across a property portfolio. The trade-off is that it's optimized for scale and marketing visualization, not construction-accurate plans.",
      },
    ],
    comparisonColumns: {
      styleRange: "Generation speed",
      outputQuality: "Extra capabilities beyond style transfer",
      professionalWorkflow: "Best for",
      easeOfUse: "Pricing",
    },
    comparisonRows: [
      {
        slug: "collov-ai",
        styleRange: "[VERIFY: Collov AI generation speed]",
        outputQuality: "Virtual staging + shoppable product recommendations on some plans",
        workflowText: "Real estate agents/designers needing staging + product links, not just a preview",
        easeOfUseText: "[VERIFY: Collov AI plan pricing]",
        pricing: "[VERIFY: Collov AI plan pricing]",
      },
      {
        slug: "homedesigns",
        styleRange: "Minutes",
        outputQuality: "Interior + exterior/landscaping redesigns, multi-room support",
        workflowText: "Homeowners comparing many styles across a whole-home refresh",
        easeOfUseText: "[VERIFY: Homedesigns.ai plan pricing]",
        pricing: "[VERIFY: Homedesigns.ai plan pricing]",
      },
      {
        slug: "aihomedesign",
        styleRange: "Minutes",
        outputQuality: "Interior + exterior facade redesigns in one tool",
        workflowText: "Homeowners comparing interior and exterior changes together",
        easeOfUseText: "[VERIFY: AI Home Design plan pricing]",
        pricing: "[VERIFY: AI Home Design plan pricing]",
      },
      {
        slug: "dehome",
        styleRange: "5-10 seconds for most rooms",
        outputQuality: "Interior + exterior/landscape, custom style-requirements field",
        workflowText: "Anyone wanting to compare many style options in one sitting",
        easeOfUseText: "[VERIFY: Dehome.ai plan pricing]",
        pricing: "[VERIFY: Dehome.ai plan pricing]",
      },
      {
        slug: "instantdeco-ai",
        styleRange: "Seconds",
        outputQuality: "API access for embedding redesign into real estate platforms at scale",
        workflowText: "Proptech platforms and portfolio managers needing redesign at scale",
        easeOfUseText: "[VERIFY: InstantDeco AI plan pricing]",
        pricing: "[VERIFY: InstantDeco AI plan pricing]",
      },
    ],
    lastUpdated: "2026-07-22",
  },
  {
    incumbentSlug: "chaos-enscape",
    shortDescription:
      "Chaos Enscape is a real-time rendering plugin for Revit, SketchUp, and Rhino, popular for architectural VR walkthroughs. People look for alternatives for a standalone workflow, different pricing, or platform independence.",
    alternativeSlugs: ["lumion", "twinmotion-ai", "d5-render", "veras"],
    chooseIf: [
      {
        slug: "lumion",
        body: "Choose Lumion if you want a standalone renderer rather than a plugin — it's not tied to Revit, SketchUp, or Rhino the way Enscape is, and it carries the largest library of landscape, people, and vehicle assets of any architecture renderer for exterior scenes and animations. The trade-off is that it's Windows-only and its interior rendering quality lags behind offline renderers like Corona.",
      },
      {
        slug: "twinmotion-ai",
        body: "Choose Twinmotion if you or your firm qualify for Epic Games' free licensing (architects, students, educators) and want Unreal Engine-grade visual quality at no cost, plus a large built-in asset library and direct CAD/BIM import. The trade-off is that commercial use at a larger firm requires a paid license tied to company size and revenue.",
      },
      {
        slug: "d5-render",
        body: "Choose D5 Render if you have an NVIDIA RTX GPU and want the fastest real-time ray tracing available — LiveSync with SketchUp, Revit, ARCHICAD, Rhino, 3ds Max, and Blender, plus AI tools like Atmosphere Match and a 16,000+ asset library. The trade-off is that it's Windows-only and requires RTX hardware, so AMD GPU or macOS teams can't use it.",
      },
      {
        slug: "veras",
        body: "Choose Veras if you want AI-styled renders generated directly from your Revit, SketchUp, or Rhino viewport without leaving the app, and you want the AI to respect your actual model geometry rather than loosely reinterpreting it. The trade-off is that it's a plugin, not a standalone renderer, so it only works inside its supported host applications.",
      },
    ],
    comparisonColumns: {
      styleRange: "Rendering approach",
      outputQuality: "Platform / hardware requirement",
      professionalWorkflow: "Best for",
      easeOfUse: "Pricing",
    },
    comparisonRows: [
      {
        slug: "lumion",
        styleRange: "Real-time, standalone (not plugin-based)",
        outputQuality: "Windows only; imports from Revit/SketchUp/AutoCAD/Rhino",
        workflowText: "Exterior scenes, landscape/entourage-heavy visualization, animation",
        easeOfUseText: "From $49/month (per D5 Render's alternatives comparison)",
        pricing: "From $49/month (per D5 Render's alternatives comparison)",
      },
      {
        slug: "twinmotion-ai",
        styleRange: "Real-time, built on Unreal Engine",
        outputQuality: "Standalone; imports from Revit/SketchUp/ArchiCAD; needs a capable GPU",
        workflowText: "Students, educators, and qualifying architects wanting free high-end rendering",
        easeOfUseText: "Free for qualifying architects/students/educators; paid tiers by firm size",
        pricing: "Free for qualifying users (Epic Games licensing); paid commercial tiers by firm size/revenue",
      },
      {
        slug: "d5-render",
        styleRange: "Real-time RTX ray tracing",
        outputQuality: "Requires NVIDIA RTX GPU, Windows only; LiveSync with major 3D apps",
        workflowText: "Teams with RTX hardware wanting the fastest real-time photorealism",
        easeOfUseText: "Free version available / Pro from $38/month",
        pricing: "Free version available / Pro from $38/month",
      },
      {
        slug: "veras",
        styleRange: "AI rendering from your model's live viewport, preserves geometry",
        outputQuality: "Plugin for Revit, SketchUp, Rhino",
        workflowText: "Teams wanting AI-styled renders without leaving their modeling app",
        easeOfUseText: "[VERIFY: Veras subscription pricing]",
        pricing: "[VERIFY: Veras subscription pricing]",
      },
    ],
    lastUpdated: "2026-07-22",
  },
  {
    incumbentSlug: "virtualstagingai",
    shortDescription:
      "Virtual Staging AI digitally furnishes empty real estate listing photos. People look for alternatives over pricing per render, furniture style range, or output realism for MLS listings.",
    alternativeSlugs: ["reimagine-home", "instantdeco-ai", "collov-ai", "room-studio-ai", "visualizee"],
    chooseIf: [
      {
        slug: "reimagine-home",
        body: "Choose REimagineHome if you want staging and renovation visualization in the same tool — beyond furnishing an empty room, it can preview new flooring, cabinetry, paint, and fixtures for homeowners or investors weighing a renovation. The trade-off is that, like all tools in this category, output is marketing visualization, not construction-accurate planning.",
      },
      {
        slug: "instantdeco-ai",
        body: "Choose InstantDeco AI if you need staging at scale — API access lets real estate platforms and property managers embed redesign generation directly into their own products rather than uploading photos one at a time through a web tool. The trade-off is that it's built for scale and speed, not the deepest per-image customization.",
      },
      {
        slug: "collov-ai",
        body: "Choose Collov AI if you want full interior design concepts alongside staging — furniture recommendations, multiple styles, and shoppable product links, useful for designers and agencies handling multiple listings or client projects, not just single-room staging. The trade-off is that the fuller feature set sits behind higher-tier plans.",
      },
      {
        slug: "room-studio-ai",
        body: "Choose RoomStudioAI if you want a straightforward, no-frills staging tool — upload a photo, pick a style, compare a few directions, done. The trade-off is that it has less brand recognition and track record than more established staging tools in this category.",
      },
      {
        slug: "visualizee",
        body: "Choose Visualizee.ai if your needs go beyond interior staging alone — it covers exteriors, interiors, and aerial site-context renders from either a text prompt or an existing SketchUp/Rhino/Revit screenshot, useful for real estate and architecture teams working across more than just listing photos. The trade-off is that higher-volume usage and advanced features sit behind paid tiers, and text-to-image results can need iteration to match exact intent.",
      },
    ],
    comparisonColumns: {
      styleRange: "Generation speed",
      outputQuality: "Extra capabilities",
      professionalWorkflow: "Best for",
      easeOfUse: "Pricing",
    },
    comparisonRows: [
      {
        slug: "reimagine-home",
        styleRange: "Minutes",
        outputQuality: "Staging + renovation visualization (flooring, cabinetry, paint) in one tool",
        workflowText: "Agents/homeowners who also want to preview renovation outcomes, not just staging",
        easeOfUseText: "[VERIFY: REimagineHome plan pricing]",
        pricing: "[VERIFY: REimagineHome plan pricing]",
      },
      {
        slug: "instantdeco-ai",
        styleRange: "Seconds",
        outputQuality: "API access for platform-scale integration",
        workflowText: "Proptech platforms and high-volume portfolios",
        easeOfUseText: "[VERIFY: InstantDeco AI plan pricing]",
        pricing: "[VERIFY: InstantDeco AI plan pricing]",
      },
      {
        slug: "collov-ai",
        styleRange: "[VERIFY: Collov AI generation speed]",
        outputQuality: "Full redesign concepts + staging + shoppable products",
        workflowText: "Users wanting more than staging alone — full design concepts too",
        easeOfUseText: "[VERIFY: Collov AI plan pricing]",
        pricing: "[VERIFY: Collov AI plan pricing]",
      },
      {
        slug: "room-studio-ai",
        styleRange: "Minutes",
        outputQuality: "Style comparisons for staging and redesign in a simple interface",
        workflowText: "Agents/homeowners wanting a straightforward, no-frills staging tool",
        easeOfUseText: "[VERIFY: RoomStudioAI plan pricing]",
        pricing: "[VERIFY: RoomStudioAI plan pricing]",
      },
      {
        slug: "visualizee",
        styleRange: "[VERIFY: Visualizee.ai generation speed]",
        outputQuality: "Covers exteriors, interiors, and aerial site-context renders; text-to-image and image-to-render",
        workflowText: "Real estate/architecture teams needing rendering beyond interior staging alone",
        easeOfUseText: "[VERIFY: Visualizee.ai plan pricing]",
        pricing: "[VERIFY: Visualizee.ai plan pricing]",
      },
    ],
    lastUpdated: "2026-07-22",
  },
  {
    incumbentSlug: "twinmotion-ai",
    shortDescription:
      "Twinmotion is real-time visualization software from Epic Games, popular among architects for fast renders and walkthroughs integrated with Unreal Engine. People look for alternatives over feature depth, licensing model concerns, or plugin support.",
    alternativeSlugs: ["lumion", "chaos-enscape", "d5-render", "veras", "chaos-vantage"],
    chooseIf: [
      {
        slug: "lumion",
        body: "Choose Lumion if you want a standalone renderer with the deepest landscape and entourage asset library of any architecture renderer, useful for exterior scenes, site visualizations, and fly-through animations. The trade-off is that it's always a paid license (no free tier like Twinmotion offers qualifying users) and it's Windows-only.",
      },
      {
        slug: "chaos-enscape",
        body: "Choose Chaos Enscape if you design in Revit, SketchUp, Rhino, or ArchiCAD and want a tighter live-link workflow than Twinmotion offers, plus one-click VR built directly into your modeling app. The trade-off is that it's always a paid subscription, and its real-time quality doesn't match final offline renders from Corona or V-Ray.",
      },
      {
        slug: "d5-render",
        body: "Choose D5 Render if you have an NVIDIA RTX GPU and want the fastest real-time ray tracing available — LiveSync with SketchUp, Revit, ARCHICAD, Rhino, 3ds Max, and Blender, plus AI tools like Atmosphere Match and a 16,000+ asset library. The trade-off is that it's Windows-only and requires RTX hardware.",
      },
      {
        slug: "veras",
        body: "Choose Veras if you want AI-styled renders generated directly from your Revit, SketchUp, or Rhino viewport without leaving the app, and you want the AI to respect your actual model geometry rather than loosely reinterpreting it. The trade-off is that it's a plugin, not a standalone renderer, so it only works inside its supported host applications.",
      },
      {
        slug: "chaos-vantage",
        body: "Choose Chaos Vantage only if you already work in V-Ray — it reads V-Ray scene files directly and gives near-photorealistic real-time previews for lighting and material iteration. The trade-off is that it's not a standalone renderer; it's a companion to an existing V-Ray investment, and it needs a high-end NVIDIA RTX GPU.",
      },
    ],
    comparisonColumns: {
      styleRange: "Rendering approach",
      outputQuality: "Platform / hardware requirement",
      professionalWorkflow: "Best for",
      easeOfUse: "Pricing",
    },
    comparisonRows: [
      {
        slug: "lumion",
        styleRange: "Real-time, standalone (not plugin-based)",
        outputQuality: "Windows only; imports from Revit/SketchUp/AutoCAD/Rhino",
        workflowText: "Exterior scenes, landscape/entourage-heavy visualization, animation",
        easeOfUseText: "From $49/month (per D5 Render's alternatives comparison)",
        pricing: "From $49/month (per D5 Render's alternatives comparison)",
      },
      {
        slug: "chaos-enscape",
        styleRange: "Real-time viewport plugin, one-click VR",
        outputQuality: "Plugin for Revit, SketchUp, Rhino, ArchiCAD; needs a capable GPU",
        workflowText: "Teams wanting rendering + VR built into their modeling app",
        easeOfUseText: "[VERIFY: Chaos Enscape subscription pricing]",
        pricing: "[VERIFY: Chaos Enscape subscription pricing]",
      },
      {
        slug: "d5-render",
        styleRange: "Real-time RTX ray tracing",
        outputQuality: "Requires NVIDIA RTX GPU, Windows only; LiveSync with major 3D apps",
        workflowText: "Teams with RTX hardware wanting the fastest real-time photorealism",
        easeOfUseText: "Free version available / Pro from $38/month",
        pricing: "Free version available / Pro from $38/month",
      },
      {
        slug: "veras",
        styleRange: "AI rendering from your model's live viewport, preserves geometry",
        outputQuality: "Plugin for Revit, SketchUp, Rhino",
        workflowText: "Teams wanting AI-styled renders without leaving their modeling app",
        easeOfUseText: "[VERIFY: Veras subscription pricing]",
        pricing: "[VERIFY: Veras subscription pricing]",
      },
      {
        slug: "chaos-vantage",
        styleRange: "Real-time GPU ray tracing of V-Ray scene files",
        outputQuality: "Requires high-end NVIDIA RTX GPU; V-Ray companion, not standalone",
        workflowText: "Studios already running V-Ray wanting instant lighting/material feedback",
        easeOfUseText: "[VERIFY: Chaos Vantage subscription pricing]",
        pricing: "[VERIFY: Chaos Vantage subscription pricing]",
      },
    ],
    lastUpdated: "2026-07-22",
  },
];

export function getAllAlternativesSlugs(): string[] {
  return alternativesEntries.map((e) => e.incumbentSlug);
}

export function getAlternativesBySlug(slug: string): AlternativesEntry | null {
  return alternativesEntries.find((e) => e.incumbentSlug === slug) ?? null;
}
