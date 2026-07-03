// ─────────────────────────────────────────────────────────────────────────────
// Comparisons data — "Tool A vs Tool B"
//
// Each entry references two EXISTING tool reviews by slug (content/tools/<slug>.mdx)
// and holds ONLY the editorial comparison content. Tool facts (name, pricing, url,
// affiliate link, rating, best-for) are pulled from the tool data at render time —
// never duplicate them here.
//
// Adding a new comparison = add one entry below (+ it auto-appears on both tool
// reviews via the review template's "head-to-head" block). Zero template edits.
// ─────────────────────────────────────────────────────────────────────────────

import type { IndustrySlug } from "./tools";

/** Which tool "wins" a round-by-round section. "tie" = too close to call. */
export type ComparisonEdge = "A" | "B" | "tie";

export interface ComparisonSection {
  body: string;
  edge: ComparisonEdge;
}

export interface ComparisonFaq {
  q: string;
  a: string;
}

export interface Comparison {
  /** URL slug: "toola-vs-toolb" → /compare/<slug> */
  slug: string;
  /** Existing tool review slugs (content/tools/<slug>.mdx). */
  toolASlug: string;
  toolBSlug: string;
  /** Industry niche → drives the Best Of hub link. */
  niche: IndustrySlug;
  /** One-line verdict for the hero. */
  verdict: string;
  /** 2–3 sentence TL;DR: best overall + best for a specific use case. */
  tldr: string;
  /** Round-by-round editorial sections. */
  sections: {
    features: ComparisonSection;
    pricing: ComparisonSection;
    easeOfUse: ComparisonSection;
    useCases: ComparisonSection;
  };
  /** "Choose A if …" bullets. */
  chooseA: string[];
  /** "Choose B if …" bullets. */
  chooseB: string[];
  faq: ComparisonFaq[];
  /** Optional: slugs of related comparisons to cross-link. */
  related?: string[];
  /** ISO date (YYYY-MM-DD); falls back to the newer of the two reviews. */
  lastUpdated?: string;
}

export const comparisons: Comparison[] = [
  {
    slug: "kreo-vs-togal-ai",
    toolASlug: "kreo",
    toolBSlug: "togal-ai",
    niche: "construction",
    verdict:
      "Both automate construction quantity takeoff with AI — Kreo goes wider with 3D BIM and integrated cost databases, while Togal.AI is the more focused, faster 2D PDF takeoff tool.",
    tldr: "Kreo and Togal.AI both use AI to compress the most time-consuming part of construction estimating: quantity takeoff. Togal.AI is the sharper choice for teams working almost entirely from 2D PDF drawing sets who want the fastest path from drawings to reviewable quantities. Kreo is the better fit when your takeoff runs off 3D BIM models and you want measurement and cost-database pricing in one cloud platform.",
    sections: {
      features: {
        body: "Both tools automatically identify and measure building elements — walls, slabs, openings, floor areas — from construction drawings, replacing hours of manual measurement. The key difference is scope. Kreo takes off from both 2D PDF drawings and 3D BIM model geometry, and connects to construction cost databases so a takeoff can flow into a cost estimate inside the same platform. Togal.AI concentrates on 2D PDF drawings, with strong automatic element recognition (distinguishing floor types, interior vs. exterior walls, opening types) and a built-in verification layer for reviewing and correcting AI measurements before export. Togal.AI is explicitly not built for BIM-based takeoff from 3D models.",
        edge: "A",
      },
      pricing: {
        body: "Kreo has an accessible per-seat entry point, with its AI-powered takeoff on a higher tier; Togal.AI is premium and typically sold per user through a demo. On a per-seat basis Kreo generally comes in below Togal.AI, and it also offers a cheaper non-AI entry tier. For both, value scales with how much manual takeoff time you're currently spending.",
        edge: "A",
      },
      easeOfUse: {
        body: "Both platforms carry an initial learning curve and require estimator review of AI output — neither is fully autonomous. Togal.AI's workflow is narrower and therefore more direct: upload a PDF, let the AI measure, verify in the review layer, export to your estimating software. Kreo covers more ground (2D, BIM, cost databases, cloud collaboration), which is powerful but means more surface area to learn, especially for teams moving off legacy or manual workflows.",
        edge: "B",
      },
      useCases: {
        body: "Togal.AI fits high-volume estimating teams competing for commercial work with large 2D drawing sets, where raw takeoff speed and bid throughput matter most. Kreo fits mid-to-large contractors and preconstruction departments that work with BIM models and want collaborative, cloud-based estimating with a path from quantities to priced estimates. The dividing line is largely 2D-first vs. BIM-inclusive workflows.",
        edge: "tie",
      },
    },
    chooseA: [
      "You run takeoffs from 3D BIM models, not just 2D PDF drawings",
      "You want quantity takeoff and cost-database pricing in one cloud platform",
      "You manage a mid-to-large estimating team that needs collaborative, cloud-based workflows",
    ],
    chooseB: [
      "Your work is primarily 2D PDF drawing sets, especially commercial bids",
      "You want the fastest path from drawings to reviewable quantities, with a built-in verification layer",
      "You need to export measured quantities straight into your existing estimating software or spreadsheets",
    ],
    faq: [
      {
        q: "What's the main difference between Kreo and Togal.AI?",
        a: "Both automate AI quantity takeoff, but Kreo also extracts quantities from 3D BIM models and integrates construction cost databases so takeoff can flow into a cost estimate in one platform. Togal.AI focuses on fast 2D PDF takeoff with automatic element recognition and a verification layer for reviewing measurements before export.",
      },
      {
        q: "Which is better for BIM-based takeoff?",
        a: "Kreo. It can extract quantities directly from 3D BIM model geometry, whereas Togal.AI is built for 2D PDF drawings and is not intended for BIM-based takeoff.",
      },
      {
        q: "Does either tool replace an estimator?",
        a: "No. Both automate measurement, not pricing judgment. AI takeoff output requires estimator review and verification before it's used in a live bid — the intended model is AI handles measurement, the estimator handles verification and cost strategy.",
      },
      {
        q: "Which one is cheaper?",
        a: "Kreo generally comes in cheaper on a per-seat basis and also offers a lower-cost non-AI entry tier, while Togal.AI is premium and typically sold per user through a demo. Confirm live pricing directly with each vendor for your team size and bid volume.",
      },
      {
        q: "Are they worth it for small residential contractors?",
        a: "Both are aimed at higher-volume and commercial estimating, where manual takeoff on large drawing sets is a real bottleneck. On small residential projects where manual takeoff is quick, the time savings — and the return on either tool — are smaller.",
      },
    ],
    related: ["kreo-vs-stack", "togal-ai-vs-stack"],
  },
  {
    slug: "roomgpt-vs-interior-ai",
    toolASlug: "roomgpt",
    toolBSlug: "interior-ai",
    niche: "interior-design",
    verdict:
      "RoomGPT and InteriorAI both redesign a room from a single photo, but RoomGPT wins on simple, low-cost homeowner redesigns while InteriorAI is the professional pick for virtual staging and client-facing work.",
    tldr: "RoomGPT and InteriorAI both reimagine a room from one photo, but they target different users. RoomGPT is the simplest, most affordable option — upload, pick a style, generate — ideal for homeowners visualising a refresh. InteriorAI is the more professional tool, with multiple modes including virtual staging, a larger style library, and licensing aimed at real estate agents and designers. Best for homeowners and simplicity: RoomGPT. Best for real estate staging and professional work: InteriorAI.",
    sections: {
      features: {
        body: "RoomGPT does one thing well — interior room redesign through a minimal, no-settings interface with solid output quality on common styles. InteriorAI is broader: a dedicated virtual staging mode, extra style options, and features built for professional deliverables. If you only need to reimagine an existing room, RoomGPT covers it; if you stage empty listings or need varied modes, InteriorAI does more.",
        edge: "tie",
      },
      pricing: {
        body: "RoomGPT is the budget option, with a low entry point and a free tier to try it. InteriorAI is priced at a premium relative to RoomGPT for comparable base redesign quality — you're paying for the extra modes, larger style library, and professional licensing, not necessarily sharper renders. For a one-off home project, RoomGPT is the cheaper call; for a professional billing the tool to client work, InteriorAI is easier to justify.",
        edge: "A",
      },
      easeOfUse: {
        body: "RoomGPT has one of the simplest interfaces in the category — no advanced settings, masks, or prompts to learn. InteriorAI exposes more controls and modes, which adds capability but a short learning curve. For non-technical homeowners, RoomGPT is the faster path to a result; for users who want control, InteriorAI rewards the extra clicks.",
        edge: "A",
      },
      useCases: {
        body: "RoomGPT fits homeowners and renters who want to quickly visualise a room in different styles at the lowest cost. InteriorAI fits real estate agents staging listings and interior designers who need multiple modes, more styles, and professional licensing.",
        edge: "tie",
      },
    },
    chooseA: [
      "You're a homeowner or renter",
      "You want the simplest possible workflow",
      "You only need interior redesign",
      "Lowest cost is the priority",
    ],
    chooseB: [
      "You're a real estate agent staging listings",
      "You're an interior designer needing pro features",
      "You need virtual staging and more output modes",
      "You need professional licensing and more styles",
    ],
    faq: [
      {
        q: "Is RoomGPT or InteriorAI better for real estate virtual staging?",
        a: "InteriorAI — it has a dedicated virtual staging mode and licensing built for listing work, whereas RoomGPT focuses on redesigning existing rooms.",
      },
      {
        q: "Is RoomGPT cheaper than InteriorAI?",
        a: "Yes. RoomGPT is the more budget-friendly option with a free tier, while InteriorAI charges a premium for its extra modes, larger style library, and professional licensing.",
      },
      {
        q: "Which one should a homeowner start with?",
        a: "RoomGPT. Its no-settings, low-cost workflow is the fastest way for a homeowner to visualise a room in different styles. If you later need virtual staging or more output modes, InteriorAI is the broader tool.",
      },
    ],
    related: [],
  },
  {
    slug: "architectgpt-vs-sketchup-diffusion",
    toolASlug: "architectgpt",
    toolBSlug: "sketchup-diffusion",
    niche: "architecture",
    verdict:
      "ArchitectGPT and SketchUp Diffusion both turn a design into an AI render, but ArchitectGPT renders from any uploaded image while SketchUp Diffusion renders straight from your SketchUp model — pick by whether you model in SketchUp.",
    tldr: "ArchitectGPT and SketchUp Diffusion (now called AI Render) both use AI to turn a design into a render, but they fit different workflows. SketchUp Diffusion lives inside SketchUp and renders from your 3D model's viewport, so it's the natural choice if you already model there. ArchitectGPT is browser-based and renders from any uploaded image — a sketch, photo, or screenshot — so it works whether or not you use SketchUp. Best for SketchUp modellers: SketchUp Diffusion. Best for rendering from any image, tool-independent: ArchitectGPT.",
    sections: {
      features: {
        body: "SketchUp Diffusion captures your model's current view and combines it with a text prompt or preset style, with a slider that controls how closely the AI follows your actual geometry, plus tools to erase, paint, and sketch on the result. Because it reads your 3D geometry, it keeps proportions truer to your model. ArchitectGPT works from a flat image rather than a live model, applying styles to whatever you upload — more flexible on inputs, but less geometry-aware.",
        edge: "tie",
      },
      pricing: {
        body: "SketchUp Diffusion isn't sold separately — it's bundled with a paid SketchUp subscription and capped by a monthly AI-credit allowance, so its real cost depends on whether you already pay for SketchUp. ArchitectGPT is a standalone browser subscription you can start without any other software. If you're already a SketchUp subscriber, Diffusion is effectively included until you hit the credit cap; if you're not, ArchitectGPT avoids paying for SketchUp just to render.",
        edge: "tie",
      },
      easeOfUse: {
        body: "SketchUp Diffusion is frictionless if you live in SketchUp — a few clicks from your model — but it requires a recent SketchUp version, a Trimble login, and the credit system limits experimentation. ArchitectGPT needs no install: open the browser, upload an image, generate. For SketchUp users the in-app flow is smoother; for everyone else ArchitectGPT is the lower barrier to entry.",
        edge: "tie",
      },
      useCases: {
        body: "ArchitectGPT fits anyone who doesn't use SketchUp, or who wants to render from a sketch, photo, or exported image regardless of modelling tool. SketchUp Diffusion fits SketchUp users who want fast, geometry-aware concept renders without leaving the app. Both are better for early-stage concept work than final photorealistic client deliverables.",
        edge: "tie",
      },
    },
    chooseA: [
      "You don't use SketchUp, or use other modelling tools",
      "You want to render from a sketch, photo, or screenshot",
      "You want a standalone browser tool with no install",
      "Flexible inputs matter more than geometry fidelity",
    ],
    chooseB: [
      "You already model and subscribe to SketchUp",
      "You want renders that stay true to your model's geometry",
      "You prefer to stay inside one app",
      "You're fine with monthly AI-credit limits",
    ],
    faq: [
      {
        q: "Do I need SketchUp to use ArchitectGPT?",
        a: "No — ArchitectGPT is browser-based and renders from any uploaded image, so it works without SketchUp or any modelling software.",
      },
      {
        q: "Is SketchUp Diffusion free?",
        a: "It's included with a paid SketchUp subscription and limited by monthly AI credits; the free SketchUp version doesn't include it.",
      },
      {
        q: "Which produces more realistic renders?",
        a: "Both target quick concept-stage visuals rather than final photorealism. SketchUp Diffusion stays truer to your model's geometry, while ArchitectGPT gives more freedom over the input image.",
      },
      {
        q: "Can either replace V-Ray or Enscape?",
        a: "Not really — they're built for fast ideation, not the precise, controllable output of a full rendering engine.",
      },
    ],
    related: [],
  },
  {
    slug: "interior-ai-vs-homestyler",
    toolASlug: "interior-ai",
    toolBSlug: "homestyler",
    niche: "interior-design",
    verdict:
      "InteriorAI restyles or virtually stages a room from a single photo in seconds, while Homestyler is a full 3D design suite you build a space in — speed and AI staging vs. control and a real furniture library.",
    tldr: "InteriorAI and Homestyler both help you visualise interiors, but they take opposite approaches. InteriorAI is AI-first: upload a photo and it restyles or virtually stages the room in seconds, with modes built for real estate and designers. Homestyler is a full 3D design suite: you build the floor plan, place real branded furniture, and render the space — more control, more work. Best for fast AI restyling and staging: InteriorAI. Best for detailed 3D design with a furniture library: Homestyler.",
    sections: {
      features: {
        body: "InteriorAI generates a redesign from a single photo, with a dedicated virtual staging mode, multiple styles, and commercial licensing — no modelling required. Homestyler is a design platform: draw or import a floor plan, convert it to an editable 3D model, furnish it from a large library of real branded 3D models, and produce renders, 360° panoramas, and walkthrough videos. InteriorAI transforms an existing photo; Homestyler builds a space from scratch.",
        edge: "tie",
      },
      pricing: {
        body: "Homestyler is known for a generous free tier — standard-resolution renders and its full furniture library at no cost — with paid plans unlocking higher-resolution output and advanced features. InteriorAI is a paid tool with a limited free trial, priced at a premium for its AI modes and commercial rights. If budget is the priority and you're willing to learn a fuller tool, Homestyler's free tier is hard to beat; if speed and AI staging matter more, InteriorAI justifies its cost.",
        edge: "B",
      },
      easeOfUse: {
        body: "InteriorAI is fast and simple — upload, pick a style, done — with almost no learning curve. Homestyler is powerful but closer to professional CAD software, with a steeper learning curve and more steps to a finished render. For a quick result, InteriorAI; for full design control, Homestyler once you've learned it.",
        edge: "A",
      },
      useCases: {
        body: "InteriorAI fits real estate agents staging listings and anyone who wants a fast AI restyle of an existing room photo. Homestyler fits designers and serious DIYers who need floor planning, precise layouts, and real furniture placement, and don't mind the learning curve.",
        edge: "tie",
      },
    },
    chooseA: [
      "You want fast AI restyling from a photo",
      "You're staging real estate listings",
      "You need commercial licensing",
      "You value speed over granular control",
    ],
    chooseB: [
      "You need floor planning and precise 3D layouts",
      "You want a large library of real branded furniture",
      "You want a strong free tier",
      "You're comfortable with a learning curve",
    ],
    faq: [
      {
        q: "Is InteriorAI or Homestyler better for real estate virtual staging?",
        a: "InteriorAI is faster for staging existing listing photos with its dedicated staging mode; Homestyler suits agents who want to build and furnish a 3D model of the space.",
      },
      {
        q: "Does Homestyler have a free plan?",
        a: "Yes — Homestyler is known for a generous free tier that includes standard-resolution renders and its full furniture library, with paid plans for higher resolution.",
      },
      {
        q: "Which is easier to learn?",
        a: "InteriorAI — it works from a single photo with minimal steps, while Homestyler is a fuller design suite with a steeper learning curve.",
      },
      {
        q: "Can InteriorAI create floor plans?",
        a: "No — InteriorAI restyles and stages from photos; for floor planning and 3D layout, Homestyler is the right tool.",
      },
    ],
    related: [],
  },
  {
    slug: "kreo-vs-stack",
    toolASlug: "kreo",
    toolBSlug: "stack",
    niche: "construction",
    verdict:
      "Kreo and STACK are both cloud takeoff-and-estimating platforms: STACK is the mature, widely-adopted standard with a deep assembly library and a free entry tier, while Kreo is the newer AI-native tool with stronger takeoff automation, with its AI features on a higher per-user tier.",
    tldr: "STACK is the established cloud takeoff-and-estimating platform — a deep, reusable assembly library, a proven takeoff-to-bid workflow, and a free version to start on. Kreo is the newer, AI-native challenger with more automated takeoff; it has a low-cost entry tier, with its AI features on a higher per-user tier. Best mature, deep-library platform with a free on-ramp: STACK. Best AI-native takeoff automation: Kreo.",
    sections: {
      features: {
        body: "STACK pairs fast on-screen takeoff with a deep, reusable assembly library and estimating tools built up over years — a complete, battle-tested takeoff-to-bid workflow. Its own AI automation, though, is less advanced than AI-first tools; our review flags that as its main gap. Kreo is AI-native, built around automated 2D takeoff with estimating in a leaner, more modern setup. STACK wins on library depth and maturity; Kreo on being built AI-first.",
        edge: "tie",
      },
      pricing: {
        body: "STACK offers a free version plus paid plans, an accessible on-ramp for teams that bid regularly. Kreo has a low-cost entry tier, but its AI-powered takeoff sits on a higher per-user tier, so cost scales with team size. STACK's free entry point is the more accessible starting point; Kreo's per-seat AI pricing suits teams that will use the automation heavily.",
        edge: "B",
      },
      easeOfUse: {
        body: "Both are cloud-based and quick to start. STACK is known for getting users running fast, though building advanced assemblies has a learning curve. Kreo's AI-native design aims to cut manual setup. For basic takeoff both are approachable; for deep estimating workflows STACK's maturity shows, at the cost of more to learn.",
        edge: "tie",
      },
      useCases: {
        body: "STACK fits mid-size GCs and specialty contractors who want a proven, complete takeoff-and-estimating platform with a deep assembly library and a free tier to start on. Kreo fits firms that specifically want AI-native takeoff automation and have enough bid volume to justify its per-seat AI tier.",
        edge: "tie",
      },
    },
    chooseA: [
      "You specifically want AI-native takeoff automation",
      "You're a mid-to-large firm or estimating team",
      "Cutting manual measurement time is the priority",
      "Your bid volume justifies the per-seat cost of its AI tier",
    ],
    chooseB: [
      "You want a deep, reusable assembly library",
      "You want a proven takeoff-to-bid workflow",
      "You want a more accessible platform than heavy enterprise software",
      "You bid regularly across many projects",
    ],
    faq: [
      {
        q: "Is Kreo or STACK more affordable?",
        a: "STACK offers a free version, making it the more accessible on-ramp, while Kreo has a low-cost entry tier but places its AI-powered takeoff on a higher per-user tier. Neither is aimed at the smallest occasional bidders — confirm current pricing with each vendor.",
      },
      {
        q: "Does STACK have strong AI automation?",
        a: "STACK is a mature digital takeoff and estimating platform, but our review notes its AI automation is less advanced than AI-first tools like Kreo and Togal.AI. Choose STACK for library and workflow depth; choose an AI-first tool if maximum takeoff automation is the goal.",
      },
      {
        q: "Which has the deeper estimating workflow?",
        a: "STACK — its reusable assembly library and estimating tools make for a complete takeoff-to-bid workflow, whereas Kreo concentrates on AI-native takeoff.",
      },
    ],
    related: ["kreo-vs-togal-ai", "togal-ai-vs-stack"],
  },
  {
    slug: "togal-ai-vs-stack",
    toolASlug: "togal-ai",
    toolBSlug: "stack",
    niche: "construction",
    verdict:
      "Togal.AI and STACK both speed up construction takeoff, but Togal.AI is an AI-first measurement specialist while STACK is a broader, mature takeoff-and-estimating platform with a deep assembly library and lighter AI automation.",
    tldr: "Togal.AI automatically measures spaces, walls, and areas from drawings with minimal manual input — AI-first takeoff. STACK spans a wider workflow (takeoff plus estimating and a deep assembly library) but, per our review, its AI automation is less advanced than AI-first tools. Best for deepest takeoff automation: Togal.AI. Best for a complete takeoff-to-bid workflow: STACK.",
    sections: {
      features: {
        body: "Togal.AI focuses on automating the measurement itself, detecting and quantifying elements from plans to cut manual takeoff time. STACK spans takeoff plus estimating, a reusable assembly library, and bid organization; our review notes its AI automation trails AI-first tools. If your priority is squeezing manual work out of takeoff, Togal is the specialist; if you want takeoff, estimating, and assemblies in one place, STACK is broader.",
        edge: "tie",
      },
      pricing: {
        body: "Togal.AI is premium and typically sold through a demo/sales process. STACK, per our review, positions itself as more accessible and affordable than heavy enterprise systems, though still a barrier for very small subcontractors. Both assume regular bidding volume to justify the cost.",
        edge: "B",
      },
      easeOfUse: {
        body: "Togal.AI's automation reduces hands-on measurement but is onboarded with guided setup reflecting its enterprise positioning. STACK is quick to start for basic takeoff, with a steeper curve for advanced assemblies. Both expect some ramp-up for full value.",
        edge: "tie",
      },
      useCases: {
        body: "Togal.AI fits estimating teams whose main bottleneck is takeoff speed and who want maximum measurement automation. STACK fits teams that want takeoff plus estimating and a deep assembly library in one proven platform.",
        edge: "tie",
      },
    },
    chooseA: [
      "Takeoff speed is your main bottleneck",
      "You want maximum measurement automation",
      "You process high volumes of drawings",
      "You want an AI-first takeoff tool",
    ],
    chooseB: [
      "You want takeoff, estimating, and assemblies in one tool",
      "You value a deep, reusable library",
      "You want a more accessible platform than heavy enterprise software",
      "You run a proven bidding workflow",
    ],
    faq: [
      {
        q: "Is Togal.AI or STACK better for automating takeoff?",
        a: "Togal.AI — it's AI-first, specialising in automated measurement from drawings. Our STACK review notes STACK's AI automation is less advanced, though STACK offers a broader takeoff-and-estimating workflow.",
      },
      {
        q: "Which does more beyond takeoff?",
        a: "STACK — it includes estimating, a reusable assembly library, and bid organization, whereas Togal.AI concentrates on takeoff automation.",
      },
      {
        q: "Which is more accessible on price?",
        a: "Per our reviews, STACK positions itself as more accessible and affordable than heavy enterprise systems, while Togal.AI is premium and typically demo-led. Confirm current pricing with each vendor.",
      },
    ],
    related: ["kreo-vs-togal-ai", "kreo-vs-stack"],
  },
  {
    slug: "structurely-vs-roof-ai",
    toolASlug: "structurely",
    toolBSlug: "roof-ai",
    niche: "real-estate",
    verdict:
      "Structurely and Roof AI both use AI to turn real estate leads into appointments, but Roof AI is an MLS-aware website chatbot that captures visitors on-site, while Structurely is an AI inside sales agent that calls, texts, and emails your existing leads to qualify and book them.",
    tldr: "Roof AI is an MLS-aware website chatbot that engages visitors the moment they land, answers property questions, and captures intent. Structurely is an AI inside sales agent that calls, texts, and emails your existing leads to qualify them and book appointments. Best for converting website visitors: Roof AI. Best for multi-channel lead nurture and qualification: Structurely.",
    sections: {
      features: {
        body: "Roof AI lives on your brokerage website: it holds MLS-aware conversations, answers buyer and seller questions around the clock, recommends listings, and drops booked meetings into your CRM. Structurely works across channels — AI calling, two-way texting, and email nurture — following up with leads for months, qualifying them, setting appointments, and doing live phone transfers to your reps. Roof AI captures intent on-site; Structurely nurtures and qualifies leads wherever they came from.",
        edge: "tie",
      },
      pricing: {
        body: "Roof AI is typically flat-rate per month with unlimited leads, so higher conversion doesn't raise your bill — attractive for high-traffic websites. Structurely is priced around its AI outreach service and CRM integrations. If your leads come mostly from your website, Roof AI's model fits; if you have lead volume from many sources to nurture, Structurely's outreach earns its cost. Verify current pricing with each vendor.",
        edge: "tie",
      },
      easeOfUse: {
        body: "Both are managed services more than DIY tools. Roof AI is added to your website and tuned for your brokerage; Structurely connects to your CRM and runs conversations automatically. Both need some conversation review and refinement to stay on-brand.",
        edge: "tie",
      },
      useCases: {
        body: "Roof AI fits brokerages with significant website traffic that want to capture and qualify visitors in real time. Structurely fits agents and teams with high lead volumes who want an AI inside sales agent to nurture and qualify leads across call, text, and email.",
        edge: "tie",
      },
    },
    chooseA: [
      "You have lead volume from many sources",
      "You want AI calling, texting, and email nurture",
      "You need appointment setting and live transfers",
      "You want long-term, months-long follow-up",
    ],
    chooseB: [
      "You have significant website traffic",
      "You want an MLS-aware on-site chatbot",
      "You want to capture visitor intent around the clock",
      "You prefer flat-rate pricing with unlimited leads",
    ],
    faq: [
      {
        q: "What's the difference between Structurely and Roof AI?",
        a: "Roof AI is a website chatbot that captures and qualifies site visitors; Structurely is an AI inside sales agent that calls, texts, and emails your existing leads to qualify and book them.",
      },
      {
        q: "Does Structurely generate leads?",
        a: "No — Structurely qualifies and nurtures leads you already have across channels; it isn't a lead-generation source itself.",
      },
      {
        q: "Which is better for a brokerage website?",
        a: "Roof AI, because it's built to engage and convert website visitors with MLS-aware conversations in real time.",
      },
    ],
    related: [],
  },
  {
    slug: "maket-vs-architectgpt",
    toolASlug: "maket",
    toolBSlug: "architectgpt",
    niche: "architecture",
    verdict:
      "Maket and ArchitectGPT get compared, but they solve different parts of the design process: Maket generates the floor plan from your requirements, ArchitectGPT renders a design from an image — and many workflows use both.",
    tldr: "Maket is an AI floor plan generator: it creates and iterates 2D layouts from your requirements. ArchitectGPT is an AI renderer: it turns a sketch, photo, or design image into a styled visualization. Need to generate the plan? That's Maket. Need to visualise a design? That's ArchitectGPT. Best for early layout and floor plans: Maket. Best for styled rendering: ArchitectGPT.",
    sections: {
      features: {
        body: "Maket focuses on the front of the process — generating floor plan options from constraints like room counts, dimensions, and adjacencies, plus design and material suggestions. ArchitectGPT focuses on the visual output — applying architectural and interior styles to an uploaded image to produce a render. They overlap only lightly: Maket helps you decide the layout, ArchitectGPT helps you sell the look. This isn't a head-to-head so much as two stages of the same workflow.",
        edge: "tie",
      },
      pricing: {
        body: "Both are self-serve browser subscriptions with accessible entry points aimed at individual architects, designers, and students rather than enterprise buyers. Because they do different jobs, the more useful question isn't which is cheaper but whether you need one stage or both. Verify current pricing with each vendor.",
        edge: "tie",
      },
      easeOfUse: {
        body: "Both are browser-based and beginner-friendly with no install. Maket is driven by entering requirements and iterating layouts; ArchitectGPT is driven by uploading an image and picking styles. Neither has a steep learning curve.",
        edge: "tie",
      },
      useCases: {
        body: "Maket fits the concept stage, when you need to generate or explore floor plan layouts quickly. ArchitectGPT fits once you have a design, sketch, or model image and need styled renders to present. Used together, they take you from a blank brief (Maket) to a client-ready visual (ArchitectGPT) — the basis of a full AI architecture workflow.",
        edge: "tie",
      },
    },
    chooseA: [
      "You need to generate floor plans or layouts",
      "You're at the early concept stage",
      "You're exploring spatial options",
      "You want generative design from requirements",
    ],
    chooseB: [
      "You need to render or visualise an existing design",
      "You have a sketch, photo, or model image",
      "You want styled output to present to clients",
      "Visualisation, not layout, is your bottleneck",
    ],
    faq: [
      {
        q: "Is Maket or ArchitectGPT better?",
        a: "They're not direct competitors — Maket generates floor plans, ArchitectGPT renders designs. Pick based on which stage you're at, or use both.",
      },
      {
        q: "Can Maket create renders like ArchitectGPT?",
        a: "Maket centres on floor plan generation and design suggestions; for styled rendering from an image, ArchitectGPT is the dedicated tool.",
      },
      {
        q: "Can I use Maket and ArchitectGPT together?",
        a: "Yes — a common workflow is generating the layout in Maket, then rendering the design with ArchitectGPT.",
      },
    ],
    related: ["architectgpt-vs-sketchup-diffusion"],
  },
  {
    slug: "lofty-vs-ylopo",
    toolASlug: "lofty",
    toolBSlug: "ylopo",
    niche: "real-estate",
    verdict:
      "Lofty and Ylopo both help real estate agents generate and convert leads, but Lofty is an all-in-one platform (CRM + IDX website + lead gen + marketing) while Ylopo is a dedicated marketing and lead-generation layer built to run alongside your existing CRM.",
    tldr: "Lofty (formerly Chime) is an all-in-one system for agents and teams — CRM, IDX website, lead generation, and marketing in one login. Ylopo is a specialist lead-generation and digital-marketing platform designed to run alongside whatever CRM you already use, not replace it. Best all-in-one system: Lofty. Best marketing engine to pair with a CRM: Ylopo.",
    sections: {
      features: {
        body: "Lofty bundles a CRM, IDX website, many lead-generation methods, marketing, and AI follow-up into one platform aimed at keeping an agent or team's pipeline full. Ylopo goes deep on one thing — AI-powered lead generation and digital marketing (targeted social and search advertising, then behavioral follow-up) — and is built to work alongside an existing CRM rather than replace it. Want everything in one place? Lofty. Want a focused marketing engine on top of your current stack? Ylopo.",
        edge: "tie",
      },
      pricing: {
        body: "Both are premium platforms priced for committed agents and teams, and both are quote-based. Lofty is sometimes offered at a discount or bundled through brokerages, which can change the math significantly. Ylopo's cost typically sits on top of the ad budget it manages, so total spend depends on your campaigns. Verify current pricing with each vendor.",
        edge: "tie",
      },
      easeOfUse: {
        body: "Lofty is broad but rewards tech-savvy agents, and independent reviews frequently flag its customer support as inconsistent. Ylopo is more hands-off on the marketing side because its campaigns are managed for you, but you'll still operate a separate CRM alongside it. One login with Lofty versus a focused marketing layer plus your own CRM with Ylopo.",
        edge: "tie",
      },
      useCases: {
        body: "Lofty fits agents and teams who want a single system to run the whole business — CRM, website, and marketing — especially where a brokerage subsidises it. Ylopo fits agents who already have a CRM they like and want a dedicated, high-performance marketing and lead-generation engine to keep it full.",
        edge: "tie",
      },
    },
    chooseA: [
      "You want an all-in-one CRM + website + marketing",
      "You prefer one login and one vendor",
      "Your brokerage offers it at a discount or bundled",
      "You run a team that values standardisation",
    ],
    chooseB: [
      "You already use a CRM you want to keep",
      "You want dedicated AI advertising and lead nurture",
      "You're comfortable running two systems",
      "Lead volume is your main focus",
    ],
    faq: [
      {
        q: "Is Ylopo a CRM?",
        a: "No — Ylopo is a lead-generation and digital-marketing platform designed to work alongside your existing CRM rather than replace it.",
      },
      {
        q: "Can you use Lofty and Ylopo together?",
        a: "You can, though it's unusual — Lofty already includes a CRM, so most teams pick one all-in-one system (Lofty) or pair Ylopo with a separate CRM they prefer.",
      },
      {
        q: "Which is better for a solo agent?",
        a: "Lofty is often the simpler single-system choice, especially if a brokerage subsidises it. Ylopo makes more sense once lead volume justifies a dedicated marketing engine on top of a CRM.",
      },
      {
        q: "What's the main difference between Lofty and Ylopo?",
        a: "Lofty is an all-in-one platform (CRM + website + marketing); Ylopo is a specialist marketing and lead-gen layer that runs alongside your existing CRM.",
      },
    ],
    related: ["rechat-vs-lofty"],
  },
  {
    slug: "rechat-vs-lofty",
    toolASlug: "rechat",
    toolBSlug: "lofty",
    niche: "real-estate",
    verdict:
      "Rechat and Lofty are both real estate platforms, but Rechat is a CRM with integrated AI marketing and transaction coordination oriented to brokerages, while Lofty is an all-in-one system for agents and teams, strong on lead generation and an IDX website.",
    tldr: "Rechat combines contact management, listing marketing automation, and transaction coordination in one system built for how real estate teams operate. Lofty (formerly Chime) is an all-in-one platform for agents and teams, leaning toward lead generation and an IDX website alongside its CRM and marketing. Best for CRM + marketing + transactions in one place: Rechat. Best all-in-one with strong lead gen: Lofty.",
    sections: {
      features: {
        body: "Rechat unifies contact management, listing marketing automation, and transaction coordination with integrated AI marketing tools, geared to how brokerages and teams operate. Lofty bundles a CRM, IDX website, many lead-generation methods, marketing, and AI follow-up aimed at keeping the pipeline full. Lofty leans toward lead generation and IDX; Rechat leans toward marketing automation and transaction coordination.",
        edge: "tie",
      },
      pricing: {
        body: "Both are premium platforms sold to committed users, with quote-based pricing. Lofty is sometimes offered at a discount or bundled through brokerages, which can change the math for individual agents. Confirm current pricing with each vendor for your team size.",
        edge: "tie",
      },
      easeOfUse: {
        body: "Lofty is broad and rewards tech-savvy agents, and independent reviews frequently flag its support as inconsistent. Rechat centres on CRM, marketing, and transactions in one system; as with any platform of this breadth, expect some setup to standardise a team. Both are more than plug-and-play.",
        edge: "tie",
      },
      useCases: {
        body: "Rechat fits brokerages and teams that want CRM, marketing, and transaction coordination unified in one system. Lofty fits individual agents and teams who want an all-in-one platform with strong built-in lead generation and an IDX website.",
        edge: "tie",
      },
    },
    chooseA: [
      "You want CRM + AI marketing + transaction coordination unified",
      "You run or lead a brokerage or team",
      "Listing marketing automation matters to you",
      "You want one system for how your team operates",
    ],
    chooseB: [
      "You're an individual agent or team",
      "You want strong lead generation and an IDX website",
      "You want one all-in-one system",
      "Your brokerage may subsidise it",
    ],
    faq: [
      {
        q: "Is Rechat or Lofty better for a brokerage?",
        a: "Rechat is oriented to brokerages and teams, unifying CRM, AI marketing, and transaction coordination. Lofty is a broad all-in-one aimed at agents and teams, leaning toward lead generation and an IDX website.",
      },
      {
        q: "Which is better for lead generation?",
        a: "Lofty leans more toward lead generation with its IDX website and many built-in lead sources; Rechat focuses on unifying CRM, marketing, and transactions.",
      },
      {
        q: "Does Rechat include AI marketing?",
        a: "Yes — Rechat includes integrated AI marketing tools alongside its CRM and transaction coordination.",
      },
      {
        q: "What's the main difference between Rechat and Lofty?",
        a: "Lofty is an all-in-one platform (CRM + IDX + lead gen + marketing); Rechat is a CRM with integrated AI marketing and transaction coordination, oriented to brokerages and teams.",
      },
    ],
    related: ["lofty-vs-ylopo"],
  },
];

// ── Accessors ────────────────────────────────────────────────────────────────

export function getAllComparisons(): Comparison[] {
  return comparisons;
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}

/** Every comparison that features the given tool slug (for reverse links). */
export function getComparisonsForTool(toolSlug: string): Comparison[] {
  return comparisons.filter(
    (c) => c.toolASlug === toolSlug || c.toolBSlug === toolSlug
  );
}
