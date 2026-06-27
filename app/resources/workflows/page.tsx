import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  Grid3x3,
  Headset,
  LayoutGrid,
  LayoutTemplate,
  ListOrdered,
  Megaphone,
  MessageSquare,
  Palette,
  PenLine,
  PlayCircle,
  Search,
  Send,
  Settings,
  Settings2,
  TrendingUp,
  Workflow,
  Wrench,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import {
  workflowsData,
  workflowToolLogoUrl,
  WORKFLOW_TOOLS,
} from "../../../lib/workflows-data";

// ─── BUSINESS FUNCTION CARD THEMES ───────────────────────────────────────────

const BIZ_THEME: Record<string, { iconBg: string; iconColor: string }> = {
  "Content Creation":       { iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
  "Marketing":              { iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  "Sales & Lead Generation":{ iconBg: "bg-green-50",  iconColor: "text-green-600"  },
  "Project Management":     { iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  "Design & Creative":      { iconBg: "bg-pink-50",   iconColor: "text-pink-600"   },
  "Research & Analysis":    { iconBg: "bg-cyan-50",   iconColor: "text-cyan-600"   },
  "Operations":             { iconBg: "bg-teal-50",   iconColor: "text-teal-600"   },
  "Human Resources":        { iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  "Customer Support":       { iconBg: "bg-yellow-50", iconColor: "text-yellow-600" },
  "All Workflows":          { iconBg: "bg-gray-100",  iconColor: "text-gray-500"   },
};

// ─── DERIVED COUNTS (from real workflow data) ──────────────────────────────────

const TOTAL_WORKFLOWS = workflowsData.length;

const CATEGORY_COUNTS = workflowsData.reduce<Record<string, number>>((acc, w) => {
  acc[w.category] = (acc[w.category] ?? 0) + 1;
  return acc;
}, {});

const INDUSTRY_COUNTS = workflowsData.reduce<Record<string, number>>((acc, w) => {
  acc[w.industry] = (acc[w.industry] ?? 0) + 1;
  return acc;
}, {});

const BUSINESS_FUNCTION_COUNT = Object.keys(CATEGORY_COUNTS).length;
const INDUSTRY_COUNT = Object.keys(INDUSTRY_COUNTS).length;
const wfLabel = (n: number) => `${n} Workflow${n === 1 ? "" : "s"}`;

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: Workflow,   count: `${TOTAL_WORKFLOWS}`,        label: "Workflows"          },
  { icon: Briefcase,  count: `${BUSINESS_FUNCTION_COUNT}`, label: "Business Functions" },
  { icon: LayoutGrid, count: `${INDUSTRY_COUNT}`,          label: "Industries"         },
  { icon: Calendar,   count: "Free",                       label: "To Use"             },
];

const WORKFLOW_STEPS = [
  { icon: MessageSquare, bg: "bg-blue-50",   color: "text-blue-600",   label: "Research", tool: "ChatGPT"   },
  { icon: PenLine,       bg: "bg-orange-50", color: "text-orange-500", label: "Draft",    tool: "Jasper AI" },
  { icon: Palette,       bg: "bg-sky-50",    color: "text-sky-600",    label: "Design",   tool: "Midjourney"},
  { icon: Send,          bg: "bg-purple-50", color: "text-purple-600", label: "Publish",  tool: "PushAlert" },
];

const CHECKLIST = [
  "Step-by-step guide",
  "Tools & prompts included",
  "Example outputs",
  "Tips to improve results",
];

// Industry collections — counts derived from real workflow data, links go to the
// matching industry hub page.
const INDUSTRY_COLLECTIONS = [
  { key: "furniture",    title: "Furniture & Interior", desc: "Concept-to-client design, product listings and onboarding workflows.", href: "/industries/furniture"   },
  { key: "architecture", title: "Architecture",         desc: "Visualization pipelines and SEO content workflows for AEC firms.",      href: "/industries/architecture" },
  { key: "construction", title: "Construction",         desc: "Progress reporting and contractor lead-generation workflows.",          href: "/industries/construction" },
  { key: "realestate",   title: "Real Estate",          desc: "Listing, outreach, social media and support automation workflows.",     href: "/industries/real-estate"  },
].map((c) => ({ ...c, count: INDUSTRY_COUNTS[c.key] ?? 0 }));

// decorative icon positions for collection card thumbnails
const COLL_ICON_POSITIONS = [
  { top: "top-3",  left: "left-3",   bg: "bg-blue-400"  },
  { top: "top-3",  left: "left-16",  bg: "bg-orange-400"},
  { top: "top-12", left: "left-8",   bg: "bg-purple-400"},
  { top: "top-3",  left: "left-28",  bg: "bg-emerald-400"},
];

const FEATURED_WORKFLOWS  = workflowsData.filter((w) => w.isFeatured);
const LATEST_WORKFLOWS_DATA = workflowsData.filter((w) => !w.isFeatured);

const HOW_STEPS = [
  { icon: LayoutTemplate, bg: "bg-purple-50", color: "text-purple-600", title: "1. Choose a Workflow",   desc: "Pick a workflow that matches your goal or task."             },
  { icon: Settings2,      bg: "bg-blue-50",   color: "text-blue-600",   title: "2. Review & Customize", desc: "Adjust the steps, tools and prompts to fit your needs."      },
  { icon: PlayCircle,     bg: "bg-cyan-50",   color: "text-cyan-600",   title: "3. Run the Workflow",    desc: "Follow the guide and execute each step."                    },
  { icon: CheckCircle2,   bg: "bg-emerald-50",color: "text-emerald-600",title: "4. Get Results",         desc: "Save time and achieve better outcomes."                     },
];

// Popular topics → real workflow detail pages.
const SIDEBAR_TOPICS_WF = workflowsData.slice(0, 5).map((w) => ({ label: w.title, href: w.href }));

// Popular tools → real review pages for the tools used across these workflows.
const POPULAR_TOOLS_WF = [
  WORKFLOW_TOOLS["chatgpt"],
  WORKFLOW_TOOLS["midjourney"],
  WORKFLOW_TOOLS["jasper-ai"],
  WORKFLOW_TOOLS["notion-ai"],
].map((t) => ({ ...t, logoUrl: workflowToolLogoUrl(t.slug) }));


// Business-function icons (ordered). Only functions that actually have at least
// one workflow are shown, with counts derived from the real data.
const BIZ_FUNCTION_ICONS: Array<{ label: string; icon: typeof PenLine }> = [
  { label: "Content Creation",        icon: PenLine       },
  { label: "Marketing",               icon: Megaphone     },
  { label: "Sales & Lead Generation", icon: TrendingUp    },
  { label: "Project Management",      icon: ClipboardList },
  { label: "Design & Creative",       icon: Palette       },
  { label: "Operations",              icon: Settings      },
  { label: "Customer Support",        icon: Headset       },
];

const BIZ_FUNCTIONS = [
  ...BIZ_FUNCTION_ICONS.filter(({ label }) => CATEGORY_COUNTS[label]).map(({ label, icon }) => ({
    label,
    icon,
    sub: wfLabel(CATEGORY_COUNTS[label]),
  })),
  { label: "All Workflows", icon: Grid3x3, sub: wfLabel(TOTAL_WORKFLOWS) },
];

// ─── TOOL LOGO (synced with review pages) ──────────────────────────────────────

function WfToolLogo({
  logoUrl,
  bg,
  text,
  name,
  size = 36,
  rounded = "rounded-lg",
}: {
  logoUrl: string;
  bg: string;
  text: string;
  name: string;
  size?: number;
  rounded?: string;
}) {
  if (logoUrl) {
    return (
      <div
        className={`${rounded} overflow-hidden bg-white border border-gray-100 flex items-center justify-center shrink-0 p-0.5`}
        style={{ width: size, height: size }}
      >
        <Image src={logoUrl} alt={name} width={size} height={size} className="object-contain w-full h-full" />
      </div>
    );
  }
  return (
    <div
      className={`${rounded} ${bg} text-white font-bold flex items-center justify-center shrink-0`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.34) }}
    >
      {text}
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI Workflows That Save Time & Deliver Results",
  description:
    "Proven AI workflows for furniture, architecture, construction, and real estate teams to save time and deliver better results.",
  alternates: { canonical: "/resources/workflows" },
  openGraph: {
    title: "AI Workflows | SmartAI for Work",
    description:
      "Proven AI workflows for furniture, architecture, construction, and real estate teams to save time and deliver better results.",
    url: "/resources/workflows",
    type: "website",
  },
};

export default function WorkflowsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium">Workflows</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <div className="mb-5">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                  AI Workflows That Get Work Done
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-4">
                AI Workflows That
                <br />
                <span className="text-blue-600">Save Time</span>
                <span className="text-gray-800"> &amp; Deliver</span>
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #f97316 0%, #9333ea 100%)" }}
                >
                  Real Results
                </span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                Explore step-by-step AI workflows for real tasks and business processes. Copy, customize, and apply them to get more done, faster.
              </p>

              {/* Stats row — 4-cell grid with dividers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-200 rounded-xl overflow-hidden divide-x divide-y sm:divide-y-0 divide-gray-200 mb-6">
                {STATS.map(({ icon: Icon, count, label }) => (
                  <div key={label} className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center">
                    <Icon size={15} className="text-blue-600" />
                    <span className="text-lg font-bold text-[#1E293B] leading-none">{count}</span>
                    <span className="text-xs text-gray-500">{label}</span>
                  </div>
                ))}
              </div>

              {/* Search bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder='Search workflows (e.g. "content creation workflow")'
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors shrink-0">
                  Search
                </button>
              </div>
            </div>

            {/* Right — workflow mockup card */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-40" />
              <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-blue-100 rounded-full blur-3xl opacity-40" />

              <div className="relative bg-white rounded-2xl shadow-lg p-5 border border-gray-100">
                <p className="font-bold text-base text-[#1E293B] mb-4">Content Creation Workflow</p>

                {/* 4 steps row */}
                <div className="flex items-start justify-between gap-1">
                  {WORKFLOW_STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.label} className="flex items-center gap-1 flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div className={`w-12 h-12 rounded-lg ${step.bg} flex items-center justify-center`}>
                            <Icon size={20} className={step.color} />
                          </div>
                          <p className="text-xs font-medium mt-1 text-center text-[#1E293B]">{step.label}</p>
                          <p className="text-[10px] text-gray-400 text-center">{step.tool}</p>
                        </div>
                        {idx < WORKFLOW_STEPS.length - 1 && (
                          <ArrowRight size={14} className="text-gray-300 shrink-0 mb-4 mt-1" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Bottom 2-col box */}
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-gray-100">
                  {/* Checklist */}
                  <ul className="flex flex-col gap-1.5">
                    {CHECKLIST.map((item) => (
                      <li key={item} className="flex items-center gap-1.5">
                        <CheckCircle size={13} className="text-emerald-500 shrink-0" />
                        <span className="text-xs text-gray-600">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Time saved box */}
                  <div className="bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <Clock size={18} className="text-blue-600" />
                    <p className="text-lg font-bold text-[#1E293B] mt-1">4.5 hrs</p>
                    <p className="text-xs text-gray-500">Time Saved</p>
                    <p className="text-[10px] text-gray-400">per workflow</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: Browse Workflows by Business Function ── */}
      <section className="py-12 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Browse Workflows by Business Function
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find the right workflow for the tasks you do every day.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {BIZ_FUNCTIONS.map(({ label, icon: Icon, sub }) => {
              const theme = BIZ_THEME[label];
              return (
                <a
                  key={label}
                  href="#latest-workflows"
                  className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className={`w-10 h-10 rounded-lg ${theme.iconBg} flex items-center justify-center shrink-0`}>
                    <Icon size={20} className={theme.iconColor} />
                  </div>
                  <p className="font-semibold text-sm text-[#1E293B] mt-2">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                  <span className="text-blue-600 text-xs mt-1 hover:underline inline-block">→</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Workflows by Industry ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Workflows by Industry</h2>
              <p className="text-sm text-gray-500 mt-1">Built for furniture, architecture, construction and real estate teams.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INDUSTRY_COLLECTIONS.map((col, idx) => (
              <Link href={col.href} key={col.key} className="border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow flex flex-col">
                {/* Thumbnail — workflow diagram decoration */}
                <div className="bg-gray-900 aspect-[2/1] relative overflow-hidden">
                  {COLL_ICON_POSITIONS.map((pos, i) => (
                    <div
                      key={i}
                      className={`absolute ${pos.top} ${pos.left} w-10 h-10 rounded-lg ${pos.bg} opacity-80 flex items-center justify-center`}
                    >
                      <Workflow size={16} className="text-white" />
                    </div>
                  ))}
                  {/* connector lines */}
                  <div className="absolute top-8 left-[3.75rem] w-8 h-px bg-gray-500" />
                  <div className="absolute top-8 left-[7.5rem] w-8 h-px bg-gray-500" />
                  <span className="absolute bottom-2 right-2 text-[10px] font-semibold uppercase tracking-wide text-white/70">
                    0{idx + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-1">
                  <p className="font-semibold text-base text-[#1E293B] leading-snug">{col.title}</p>
                  <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-relaxed flex-1">{col.desc}</p>

                  <div className="flex justify-between items-center mt-3">
                    <div>
                      <p className="font-semibold text-sm text-[#1E293B]">{col.count}</p>
                      <p className="text-xs text-gray-400">{col.count === 1 ? "Workflow" : "Workflows"}</p>
                    </div>
                  </div>

                  <span className="text-blue-600 text-sm font-medium mt-2 inline-block">
                    Explore {col.title} tools →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Featured Workflows ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Featured Workflows</h2>
              <p className="text-sm text-gray-500 mt-1">Step-by-step workflows trusted by professionals.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_WORKFLOWS.map((wf) => (
              <Link key={wf.slug} href={wf.href} className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md transition-shadow flex flex-col">
                {/* Icon chain — real tool logos */}
                <div className="flex items-center gap-1.5 mb-3">
                  {wf.toolsUsed.map((tool, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <WfToolLogo logoUrl={tool.logoUrl} bg={tool.bg} text={tool.text} name={tool.name} size={36} />
                      {idx < wf.toolsUsed.length - 1 && (
                        <ArrowRight size={12} className="text-gray-300 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>

                <p className="font-semibold text-sm text-[#1E293B] leading-snug">{wf.title}</p>
                <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed flex-1">{wf.description}</p>
                <p className="text-xs text-blue-600 font-medium mt-2">{wf.category}</p>

                <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <ListOrdered size={11} className="shrink-0" />
                    {wf.steps} Steps
                  </span>
                  <span className="flex items-center gap-1">
                    <Wrench size={11} className="shrink-0" />
                    {wf.toolCount} Tools
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} className="shrink-0" />
                    {wf.duration}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 + SIDEBAR: 2-column layout ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── LEFT COL: Section 5 + Section 6 ── */}
            <div className="lg:col-span-2">

              {/* ── SECTION 5: How AI Workflows Work ── */}
              <div className="mb-10">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">How AI Workflows Work</h2>
                  <p className="text-sm text-gray-500 mt-1">Simple steps to get started and see results.</p>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-start gap-4">
                  {HOW_STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={step.title} className="flex sm:flex-col items-start sm:items-center sm:text-center flex-1 gap-3 sm:gap-0">
                        <div className={`w-12 h-12 rounded-xl ${step.bg} flex items-center justify-center shrink-0`}>
                          <Icon size={22} className={step.color} />
                        </div>
                        <div className="sm:mt-2">
                          <p className="font-semibold text-sm text-[#1E293B]">{step.title}</p>
                          <p className="text-xs text-gray-500 mt-1 leading-relaxed">{step.desc}</p>
                        </div>
                        {idx < HOW_STEPS.length - 1 && (
                          <ArrowRight size={16} className="text-gray-300 shrink-0 hidden sm:block sm:absolute" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── SECTION 6: Latest Workflows ── */}
              <div className="mt-8 scroll-mt-24" id="latest-workflows">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1E293B]">Latest Workflows</h2>
                    <p className="text-sm text-gray-500 mt-1">The most recent workflows added to the library.</p>
                  </div>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-xl bg-white shadow-sm">
                  <table className="w-full min-w-[640px] text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Workflow</th>
                        <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Category</th>
                        <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Steps</th>
                        <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Tools</th>
                        <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Time</th>
                        <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {LATEST_WORKFLOWS_DATA.map((row) => (
                        <tr key={row.slug} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                          {/* Workflow */}
                          <td className="py-3 px-4">
                            <div className="flex items-start gap-2.5">
                              <div className="mt-0.5">
                                <WfToolLogo
                                  logoUrl={row.toolsUsed[0]?.logoUrl ?? ""}
                                  bg={row.toolsUsed[0]?.bg ?? row.iconBg}
                                  text={row.toolsUsed[0]?.text ?? ""}
                                  name={row.toolsUsed[0]?.name ?? row.title}
                                  size={32}
                                />
                              </div>
                              <div className="min-w-0">
                                <Link href={row.href} className="font-medium text-sm text-[#1E293B] hover:text-blue-600 transition-colors block leading-snug">
                                  {row.title}
                                </Link>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{row.description}</p>
                              </div>
                            </div>
                          </td>
                          {/* Category */}
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{row.category}</td>
                          {/* Steps */}
                          <td className="py-3 px-4 text-sm text-gray-700 text-center">{row.steps}</td>
                          {/* Tools */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-1">
                              {row.toolsUsed.map((tool, i) => (
                                <WfToolLogo
                                  key={i}
                                  logoUrl={tool.logoUrl}
                                  bg={tool.bg}
                                  text={tool.text}
                                  name={tool.name}
                                  size={24}
                                  rounded="rounded"
                                />
                              ))}
                            </div>
                          </td>
                          {/* Time */}
                          <td className="py-3 px-4 text-sm text-gray-700 whitespace-nowrap">{row.duration}</td>
                          {/* Updated */}
                          <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">{row.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* ── RIGHT COL: Sidebar ── */}
            <div className="lg:col-span-1">

              {/* Box 1: Popular Workflows */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white mb-6">
                <h3 className="font-bold text-base text-[#1E293B] mb-3">Popular Workflows</h3>
                <ul>
                  {SIDEBAR_TOPICS_WF.map((topic) => (
                    <li key={topic.href}>
                      <Link
                        href={topic.href}
                        className="flex justify-between items-center gap-2 text-sm text-gray-700 hover:text-blue-600 py-1.5 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <span className="line-clamp-1">{topic.label}</span>
                        <ChevronRight size={14} className="shrink-0 text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <a
                  href="#latest-workflows"
                  className="block w-full border border-blue-600 text-blue-600 rounded-lg py-2 text-sm font-medium text-center mt-3 hover:bg-blue-50 transition-colors"
                >
                  Browse all workflows
                </a>
              </div>

              {/* Box 2: Popular Tools */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white">
                <h3 className="font-bold text-base text-[#1E293B] mb-3">Popular Tools</h3>
                <ul>
                  {POPULAR_TOOLS_WF.map((tool) => (
                    <li key={tool.slug} className="border-b border-gray-100 last:border-0">
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="flex items-center gap-3 py-2 group"
                      >
                        <WfToolLogo logoUrl={tool.logoUrl} bg={tool.logoBg} text={tool.logoText} name={tool.name} size={32} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-800 leading-snug truncate group-hover:text-blue-600 transition-colors">{tool.name}</p>
                          <p className="text-xs text-gray-400">Read review</p>
                        </div>
                        <ChevronRight size={14} className="shrink-0 text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/all-reviews"
                  className="block w-full border border-gray-300 rounded-lg py-2 text-sm font-medium text-center mt-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  View all reviews
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
}
