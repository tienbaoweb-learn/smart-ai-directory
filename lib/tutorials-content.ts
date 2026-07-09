export type TutorialLevel =
  | "Beginner"
  | "Beginner to Intermediate"
  | "Intermediate"
  | "Advanced";

export interface TutorialFaqItem {
  question: string;
  answer: string;
}

export interface TutorialContentBlock {
  type:
    | "paragraph"
    | "heading" // level: 2 | 3
    | "code-block" // prompt template — rendered with a Copy button
    | "callout" // "Why this works:" (info) or safety warnings (warning)
    | "bullet-list"
    | "faq"
    | "disclaimer";
  text?: string;
  level?: 2 | 3; // cho heading
  code?: string; // nội dung code block, giữ nguyên whitespace
  language?: string; // "text" cho prompt templates
  title?: string; // tiêu đề nhỏ phía trên bullet-list (vd: "Good uses — …")
  items?: string[]; // cho bullet-list
  faqItems?: TutorialFaqItem[]; // cho faq
  variant?: "info" | "warning"; // cho callout / bullet-list
}

export interface TutorialDetail {
  slug: string;
  title: string;
  level: TutorialLevel;
  thumbnail: string | null;
  excerpt: string;
  publishedDate: string;
  readingTime: string;
  niches: string[]; // ["Architecture", "Construction", "Real Estate", "Interior Design", "Furniture"]
  content: TutorialContentBlock[];
  tags: string[];
  relatedGuideSlug?: string; // internal link về guide tương ứng
}

export const tutorialsContent: TutorialDetail[] = [
  // ── Tutorial 1: ChatGPT & Claude prompts for AEC ──────────────────────────
  {
    slug: "chatgpt-claude-prompts-aec",
    title:
      "Writing Effective ChatGPT & Claude Prompts for Design & Construction Work",
    level: "Beginner to Intermediate",
    thumbnail: "/images/tutorials/tutorial-chatgpt-claude-prompts-aec.webp",
    excerpt:
      "Six copy-and-adapt prompt templates for proposals, listing descriptions, and client updates — plus the five principles that make any prompt work.",
    publishedDate: "2026-07-09",
    readingTime: "7 min",
    niches: ["Architecture", "Construction", "Real Estate", "Interior Design"],
    tags: [
      "ChatGPT prompts",
      "Claude prompts",
      "AI for architects",
      "AI for construction",
      "real estate AI writing",
      "prompt engineering",
    ],
    content: [
      {
        type: "paragraph",
        text: "Most architects, contractors, designers, and real estate professionals who try ChatGPT or Claude for the first time walk away unimpressed. They type something like \"write a project proposal,\" get back a generic wall of text that sounds like it was written by nobody in particular, and conclude the tool isn't built for their work.",
      },
      {
        type: "paragraph",
        text: "The tool is fine. The prompt was the problem.",
      },
      {
        type: "paragraph",
        text: "A large language model is only as useful as the context you give it. The difference between a useless output and one you can actually send to a client usually comes down to four or five sentences of setup. This tutorial covers the core principles of writing effective prompts, then gives you copy-and-adapt templates for the most common writing tasks in architecture, construction, real estate, and interior design.",
      },
      {
        type: "paragraph",
        text: "No affiliate links, no product pitch — just a practical guide to getting more out of tools you're probably already paying for.",
      },

      { type: "heading", level: 2, text: "The 5 Principles of a Good Prompt" },
      {
        type: "paragraph",
        text: "Before the templates, it helps to understand why they work. Every effective prompt for professional work does most of these five things.",
      },
      { type: "heading", level: 3, text: "1. Assign a role" },
      {
        type: "paragraph",
        text: "Tell the model who it's supposed to be. \"You are an experienced construction estimator\" produces different output than no role at all, because it primes the model to use the right vocabulary, assumptions, and level of detail.",
      },
      { type: "heading", level: 3, text: "2. Give specific context" },
      {
        type: "paragraph",
        text: "The model knows nothing about your project unless you tell it. Company size, project type, client, location, budget range, tone — every specific detail you add narrows the output toward something usable. Vague in, vague out.",
      },
      { type: "heading", level: 3, text: "3. Define the output format" },
      {
        type: "paragraph",
        text: "Do you want bullet points or prose? Three paragraphs or three pages? An email or a formal document? Stating the format explicitly saves you from reformatting later. \"Write it as a short client-facing email, under 150 words\" is far better than \"write an email.\"",
      },
      {
        type: "heading",
        level: 3,
        text: "4. Provide an example (when tone matters)",
      },
      {
        type: "paragraph",
        text: "If you have a brand voice or a document style you like, paste a sample and say \"match this tone.\" This single move does more for consistency than any amount of describing the tone in words.",
      },
      {
        type: "heading",
        level: 3,
        text: "5. Ask it to think before it writes (for complex tasks)",
      },
      {
        type: "paragraph",
        text: "For analysis or problem-solving, adding \"think through the key considerations before writing your recommendation\" often produces more thorough, less superficial results. This matters less for simple drafting tasks.",
      },
      {
        type: "paragraph",
        text: "You don't need all five in every prompt. A quick email might only need role and format. A complex proposal benefits from all five.",
      },

      { type: "heading", level: 2, text: "The Universal Template" },
      {
        type: "paragraph",
        text: "Here's a fill-in-the-blank structure that works across almost any professional writing task:",
      },
      {
        type: "code-block",
        language: "text",
        code: `You are a [ROLE] with experience in [FIELD].

Context:
- [KEY DETAIL 1 — e.g., project type]
- [KEY DETAIL 2 — e.g., client or audience]
- [KEY DETAIL 3 — e.g., constraints, budget, timeline]

Task: [WHAT YOU WANT WRITTEN]

Format: [LENGTH, STRUCTURE, TONE]

[Optional: Here's an example of the tone I want: "..."]`,
      },
      {
        type: "paragraph",
        text: "Now let's see it applied to real tasks in each field.",
      },

      {
        type: "heading",
        level: 2,
        text: "Architecture: Project Proposals & Descriptions",
      },
      {
        type: "paragraph",
        text: "Architects lose significant time on the writing that surrounds design work. Here's a prompt for drafting a project proposal:",
      },
      {
        type: "code-block",
        language: "text",
        code: `You are an architect writing a project proposal for a
prospective residential client.

Context:
- Project: full renovation of a 1930s semi-detached house
- Client: a young family prioritizing natural light and open
  living space, moderate budget
- Our studio: small practice known for sensitive, light-focused
  residential work
- Goal: win the commission; convey competence without jargon

Task: Draft a one-page proposal covering our understanding of
their goals, our proposed approach, and next steps.

Format: Professional but warm. Around 350 words. No technical
jargon the client wouldn't understand.`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Why this works: The role, client profile, and studio identity give the model enough to write something that sounds like a specific practice talking to a specific family — not a generic template.",
      },
      {
        type: "paragraph",
        text: "A follow-up prompt that's often useful: \"Now rewrite the second paragraph to sound less salesy and more consultative.\" Iterating on one section at a time gives you more control than regenerating the whole thing.",
      },

      {
        type: "heading",
        level: 2,
        text: "Construction: Documentation & Client Updates",
      },
      {
        type: "paragraph",
        text: "Contractors deal with a constant flow of documentation. Here's a prompt for a client-facing progress update:",
      },
      {
        type: "code-block",
        language: "text",
        code: `You are a construction project manager writing a weekly progress
update for a commercial client.

Context:
- Project: 40-unit multifamily building, currently in framing phase
- This week: completed framing on floors 1-3, started MEP rough-in
  on floor 1, minor 2-day delay due to a materials delivery
- Client: detail-oriented owner who appreciates transparency about
  problems, not just good news

Task: Write a weekly update email covering progress, the delay and
how we're managing it, and what's planned for next week.

Format: Clear and professional. Bullet points for the progress
items, short paragraphs for context. Under 250 words.`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Why this works: Naming the client's personality (\"appreciates transparency about problems\") shapes how the model frames the delay — directly rather than burying it.",
      },
      {
        type: "paragraph",
        text: "For estimating support, a different pattern is useful:",
      },
      {
        type: "code-block",
        language: "text",
        code: `You are an experienced estimator. I'm going to describe a scope
of work, and I want you to list the major cost categories I should
make sure I've accounted for, so I don't miss anything.

Scope: [describe the project]`,
      },
      {
        type: "callout",
        variant: "warning",
        text: "Note: this uses AI as a checklist assistant, not a source of actual numbers. The model helps you make sure you haven't forgotten a category — you still apply real pricing yourself.",
      },

      { type: "heading", level: 2, text: "Real Estate: Listing Descriptions" },
      {
        type: "paragraph",
        text: "This is one of the highest-volume writing tasks in real estate, and a good prompt turns a 45-minute job into a 5-minute one.",
      },
      {
        type: "code-block",
        language: "text",
        code: `You are a real estate copywriter who writes listing descriptions
that are vivid but honest — never over-hyped.

Context:
- Property: 3-bed, 2-bath mid-century home, 1,650 sq ft
- Standout features: original hardwood floors, large west-facing
  windows, renovated kitchen, mature garden
- Neighborhood: quiet, walkable, good schools
- Target buyer: young families and design-conscious professionals

Task: Write an MLS listing description.

Format: Around 150 words. Warm and specific. Lead with the single
most compelling feature. No clichés like "must-see" or
"dream home."`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Why this works: The instruction to avoid specific clichés (\"must-see,\" \"dream home\") is doing real work — these phrases are the default the model reaches for, and banning them forces more specific, credible writing.",
      },
      {
        type: "paragraph",
        text: "A useful follow-up: \"Now give me a shorter 50-word version for social media, and a one-line version for a text message to my buyer list.\" One property, three formats, one conversation.",
      },

      {
        type: "heading",
        level: 2,
        text: "Interior Design: Client Proposals & Concept Descriptions",
      },
      {
        type: "paragraph",
        text: "Designers often need to translate a visual concept into words a client can respond to.",
      },
      {
        type: "code-block",
        language: "text",
        code: `You are an interior designer describing a design concept to a
client who has approved the visual direction and now wants to
understand the reasoning behind it.

Context:
- Space: open-plan living/dining in a family home
- Concept: warm minimalism — natural materials, muted earth tones,
  a few sculptural statement pieces
- Client values: calm, low-clutter, kid-friendly durability

Task: Write a short concept narrative explaining the design
thinking — why these choices serve how they actually live.

Format: Around 200 words. Evocative but grounded. Connect each
design choice back to the client's stated values.`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Why this works: Asking the model to \"connect each choice back to the client's values\" turns a generic style description into a persuasive, client-specific rationale.",
      },

      { type: "heading", level: 2, text: "4 Common Mistakes to Avoid" },
      {
        type: "bullet-list",
        items: [
          "Being too vague. \"Write something professional about our services\" gives the model nothing to work with. Every specific detail you add improves the output.",
          "Accepting the first draft as final. The first output is a starting point. Iterating on specific sections (\"make paragraph two more concise\") is where the quality comes from.",
          "Trusting facts and figures blindly. Language models can state incorrect numbers, dates, or regulations with total confidence. Use them for drafting and structure — verify any factual claim, code reference, or figure yourself.",
          "Not saving your good prompts. When a prompt produces great output, save it. Build a personal library of templates for your recurring tasks. The second time you write a listing description, you shouldn't be starting from scratch.",
        ],
      },

      { type: "heading", level: 2, text: "Frequently Asked Questions" },
      {
        type: "faq",
        faqItems: [
          {
            question: "Is ChatGPT or Claude better for this kind of work?",
            answer:
              "Both are highly capable for professional writing tasks, and the differences matter less than prompt quality. Many professionals use whichever they have access to, or keep both and compare outputs on important tasks. The principles in this guide apply equally to either.",
          },
          {
            question: "Will clients be able to tell I used AI?",
            answer:
              "If you paste raw AI output without editing, often yes — it tends toward a recognizable generic tone. If you use it as a first draft and add your own specifics, voice, and judgment, the final result reads as yours. The editing step is what makes it your work.",
          },
          {
            question: "Do I need the paid version?",
            answer:
              "For occasional light use, free tiers are often enough. For daily professional use, paid tiers typically offer better models, higher usage limits, and features worth the cost if the tool is saving you hours per week. Evaluate based on how much you actually use it.",
          },
          {
            question:
              "Can I use these tools for contracts or legally binding documents?",
            answer:
              "Use extreme caution here. AI tools can help draft or explain standard language, but any legally binding document should be reviewed by a qualified professional. Do not rely on AI output for legal, code-compliance, or contractual matters without expert verification.",
          },
        ],
      },

      { type: "heading", level: 2, text: "Save These Templates" },
      {
        type: "paragraph",
        text: "The fastest way to get value from this guide is to copy the templates above into a note or document you keep handy, then adapt them to your actual projects. Good prompting is a skill that compounds — the library you build over the next few months will save you more time than any single tool.",
      },

      {
        type: "disclaimer",
        text: "This tutorial is part of SmartAI for Work's resource library for professionals in architecture, construction, real estate, interior design, and furniture. We publish independent, practical guidance and don't accept payment for tutorial coverage.",
      },
    ],
  },

  // ── Tutorial 2: ChatGPT for construction estimating ───────────────────────
  {
    slug: "chatgpt-construction-estimating",
    title: "Using ChatGPT to Speed Up Construction Estimating & Documentation",
    level: "Beginner to Intermediate",
    thumbnail:
      "/images/tutorials/tutorial-chatgpt-construction-estimating.webp",
    excerpt:
      "Five safe prompt templates for scope checklists, bid documents, and site reports — and a clear line on what ChatGPT must never be used for in estimating.",
    publishedDate: "2026-07-09",
    readingTime: "7 min",
    niches: ["Construction"],
    relatedGuideSlug: "construction-ai-tools",
    tags: [
      "ChatGPT construction",
      "AI construction estimating",
      "construction documentation",
      "AI for contractors",
      "scope of work",
      "prompt engineering",
    ],
    content: [
      {
        type: "callout",
        variant: "warning",
        text: "Let's be clear about one thing up front, because getting this wrong can cost you real money: ChatGPT is not a takeoff tool, and it is not a pricing engine. It cannot count quantities off your drawings, and it cannot tell you what materials cost in your market this week. If you need automated quantity takeoffs, that's a job for a dedicated computer-vision estimating tool, not a general-purpose language model.",
      },
      {
        type: "paragraph",
        text: "So what is ChatGPT good for in a construction estimating workflow? A surprising amount — as long as you use it for the right jobs. It's genuinely useful for organizing scope, catching gaps before they cost you, structuring bid documentation, drafting the written portions of proposals, and turning your rough notes into clean, client-ready text.",
      },
      {
        type: "paragraph",
        text: "This tutorial covers where a language model actually helps an estimator, with copy-and-adapt prompts for each task — and clear boundaries on where you should never rely on it.",
      },

      {
        type: "heading",
        level: 2,
        text: "Where ChatGPT Helps (and Where It Doesn't)",
      },
      {
        type: "paragraph",
        text: "Before the prompts, here's the honest breakdown.",
      },
      {
        type: "bullet-list",
        variant: "info",
        title: "Good uses — organizing, drafting, checking:",
        items: [
          "Building a scope checklist so you don't forget a cost category",
          "Structuring a bid or proposal document",
          "Drafting written scope-of-work and inclusions/exclusions language",
          "Turning rough site notes into clean documentation",
          "Explaining an unfamiliar spec or construction term",
          "Drafting client-facing emails and change-order explanations",
        ],
      },
      {
        type: "bullet-list",
        variant: "warning",
        title: "Bad uses — anything requiring real numbers or counting:",
        items: [
          "Counting quantities from drawings (use a dedicated takeoff tool)",
          "Providing current material or labor prices (these are wrong or outdated)",
          "Final numbers on a bid (a language model cannot be your estimator)",
          "Code compliance decisions (verify against actual local codes)",
        ],
      },
      {
        type: "paragraph",
        text: "Keep that division in mind and everything below stays safe.",
      },

      {
        type: "heading",
        level: 2,
        text: "Task 1: Build a Scope Checklist So Nothing Slips Through",
      },
      {
        type: "paragraph",
        text: "One of the most expensive mistakes in estimating is forgetting a cost category entirely — missing a line item that you then have to eat, or that blows your margin when it surfaces mid-project. ChatGPT is excellent as a second set of eyes here.",
      },
      {
        type: "code-block",
        language: "text",
        code: `You are an experienced construction estimator. I'm putting together
an estimate and want to make sure I haven't overlooked any major
cost categories.

Project scope: [describe the project — e.g., "interior fit-out of a
2,500 sq ft ground-floor retail unit, including new HVAC, electrical,
partition walls, flooring, and storefront glazing"]

List the major cost categories and common line items I should make
sure I've accounted for. Flag any items that are frequently forgotten
on projects like this.`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Why this works: You're using the model's broad training as a checklist generator, not a calculator. It might remind you about permit fees, temporary protection, dumpster/disposal, or final cleaning — the kind of items that are easy to forget and painful to miss. You still price every line yourself.",
      },

      {
        type: "heading",
        level: 2,
        text: "Task 2: Structure a Bid or Proposal Document",
      },
      {
        type: "paragraph",
        text: "Once your numbers are done, the written packaging around them still takes time. ChatGPT turns your inputs into a clean structure fast.",
      },
      {
        type: "code-block",
        language: "text",
        code: `You are helping a general contractor structure a bid proposal.

Details:
- Project: [project name and type]
- Total bid amount: [your number — you calculated this]
- Key inclusions: [list]
- Key exclusions: [list]
- Timeline: [duration and any key milestones]
- Payment terms: [your terms]

Draft a professional bid proposal document that presents this clearly.
Use section headings. Keep the language precise and unambiguous —
this is a document a client may hold us to.`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Why this works: You supply every number and term — the model only handles organization and wording. Note the instruction \"a document a client may hold us to,\" which pushes the model toward precise, careful language rather than marketing fluff.",
      },

      {
        type: "heading",
        level: 2,
        text: "Task 3: Write Clear Scope-of-Work Language",
      },
      {
        type: "paragraph",
        text: "Vague scope language is where disputes come from. ChatGPT is good at turning your intent into precise inclusions/exclusions text.",
      },
      {
        type: "code-block",
        language: "text",
        code: `You are a construction contracts writer. Turn my rough notes into
clear, professional scope-of-work language with explicit inclusions
and exclusions.

My notes: [paste your rough bullet points — e.g., "we do the framing
and drywall but not paint, electrical by others, we handle our own
cleanup but not final building clean"]

Write it as a clear scope section. Make the boundaries between our
responsibility and others' unambiguous. Flag anything in my notes
that's ambiguous and should be clarified before signing.`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Why this works: The last instruction — \"flag anything ambiguous\" — turns the model into a reviewer, not just a writer. It catches the gaps in your own notes that cause change-order fights later.",
      },

      {
        type: "heading",
        level: 2,
        text: "Task 4: Turn Site Notes Into Clean Documentation",
      },
      {
        type: "paragraph",
        text: "After a site walk, you've got rough notes. ChatGPT cleans them up into something filable.",
      },
      {
        type: "code-block",
        language: "text",
        code: `Turn these rough site visit notes into a clean, organized site
report suitable for the project record.

Raw notes: [paste your notes, however messy]

Organize by area or trade. Keep every factual detail from my notes —
don't invent anything I didn't write. If something in my notes is
unclear, list it separately under "Items to confirm" rather than
guessing.`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Why this works: \"Don't invent anything I didn't write\" is critical — it prevents the model from filling gaps with plausible-sounding fabrication, which is the single biggest risk when using AI for documentation. The \"Items to confirm\" instruction gives it a safe place to put uncertainty instead of guessing.",
      },

      {
        type: "heading",
        level: 2,
        text: "Task 5: Explain an Unfamiliar Spec or Term",
      },
      {
        type: "paragraph",
        text: "When a spec references something you don't recognize, ChatGPT is a fast first explanation — to be verified, but useful for orientation.",
      },
      {
        type: "code-block",
        language: "text",
        code: `Explain this construction spec/term in plain language, including what
it typically means for cost and installation:

[paste the spec text or term]

Note: I'll verify against the actual project specs and local
requirements — I just want a clear starting explanation.`,
      },
      {
        type: "callout",
        variant: "info",
        text: "Why this works: You're using it for orientation, not as the final authority — and the note keeps you honest about verifying. Treat the explanation as a starting point that points you toward the right questions, not a definitive answer.",
      },

      { type: "heading", level: 2, text: "The One Rule That Keeps This Safe" },
      {
        type: "callout",
        variant: "warning",
        text: "If you take nothing else from this tutorial, take this: the language model organizes and drafts; you and your dedicated tools produce the numbers.",
      },
      {
        type: "paragraph",
        text: "Every quantity, every price, every final figure comes from your takeoff tool, your suppliers, and your judgment as an estimator. ChatGPT handles the words around those numbers — the checklists, the structure, the documentation, the clean write-ups. Used that way, it saves hours per bid without ever putting a wrong number in a document a client can hold you to.",
      },
      {
        type: "paragraph",
        text: "For the actual quantity takeoff side of estimating — counting components off drawings automatically — that's a different category of tool entirely. (We cover those in our guide to AI tools for construction, linked below.)",
      },

      { type: "heading", level: 2, text: "Frequently Asked Questions" },
      {
        type: "faq",
        faqItems: [
          {
            question: "Can ChatGPT do a quantity takeoff from my drawings?",
            answer:
              "No. General-purpose language models cannot reliably count building components from construction drawings. That's the job of dedicated computer-vision takeoff tools built specifically for the task. Using ChatGPT for this will produce unreliable results.",
          },
          {
            question: "Can it give me current material prices?",
            answer:
              "No — and this is important. Any pricing a language model provides is based on training data that may be months or years out of date, and it may simply fabricate plausible-sounding numbers. Always price from current supplier quotes and your own cost database.",
          },
          {
            question: "Is it safe to put project details into ChatGPT?",
            answer:
              "Consider your data sensitivity and your company's policies. For sensitive client or bid information, check whether your organization has guidelines, and be aware of the privacy settings and data-handling terms of whichever tool and plan you use. When in doubt, anonymize details.",
          },
          {
            question: "Will this replace my estimator?",
            answer:
              "No. It removes time-consuming writing and organization tasks so your estimator spends more time on the judgment-intensive work — scope analysis, pricing strategy, risk assessment — that actually requires their expertise.",
          },
        ],
      },

      { type: "heading", level: 2, text: "Save These Prompts" },
      {
        type: "paragraph",
        text: "Copy the templates above into a document you keep next to your estimating workflow. The scope-checklist prompt (Task 1) alone is worth building into your routine — running it before finalizing any bid is a low-effort way to catch the expensive omissions before they catch you.",
      },

      {
        type: "disclaimer",
        text: "This tutorial is part of SmartAI for Work's resource library for professionals in architecture, construction, real estate, interior design, and furniture. We publish independent, practical guidance and don't accept payment for tutorial coverage.",
      },
    ],
  },
];
