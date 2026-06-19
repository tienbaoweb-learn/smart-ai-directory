import Link from "next/link";
import {
  AlertCircle,
  Blocks,
  Bot,
  Camera,
  Check,
  CheckCircle,
  ChevronRight,
  Circle,
  ClipboardList,
  Globe,
  Image,
  Megaphone,
  MessageSquare,
  Palette,
  PenLine,
  Plus,
  RefreshCw,
  Scale,
  Send,
  Settings,
  Star,
  TrendingUp,
  Video,
  Workflow,
  Wrench,
  Zap,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import ResourceCard from "../../components/ResourceCard";
import { comparisonsData } from "../../../lib/comparisons-data";

// ─── CATEGORY CARD THEMES ─────────────────────────────────────────────────────

const CAT_THEME: Record<string, { iconBg: string; iconColor: string }> = {
  "AI Writing":          { iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
  "AI Automation":       { iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  "AI Design & Visuals": { iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  "Productivity":        { iconBg: "bg-green-50",  iconColor: "text-green-600"  },
  "Marketing":           { iconBg: "bg-red-50",    iconColor: "text-red-500"    },
  "AI Agents":           { iconBg: "bg-teal-50",   iconColor: "text-teal-600"   },
  "Video & Audio":       { iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  "No-code Tools":       { iconBg: "bg-yellow-50", iconColor: "text-yellow-600" },
  "Sales & CRM":         { iconBg: "bg-emerald-50",iconColor: "text-emerald-600"},
  "Project Management":  { iconBg: "bg-pink-50",   iconColor: "text-pink-600"   },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FEATURE_ROWS = [
  { icon: MessageSquare, label: "Conversation" },
  { icon: Image,         label: "Image Gen"    },
  { icon: Zap,           label: "Speed"        },
  { icon: Globe,         label: "Web Access"   },
];

// ─── FEATURED COMPARISON BADGE STYLES ────────────────────────────────────────

const FEAT_BADGE: Record<string, string> = {
  WRITING:      "bg-blue-600 text-white",
  DESIGN:       "bg-purple-600 text-white",
  PRODUCTIVITY: "bg-emerald-600 text-white",
  MARKETING:    "bg-orange-500 text-white",
};

const FEATURED_COMPARISONS = comparisonsData.filter((c) => c.isFeatured);
const LATEST_COMPARISONS   = comparisonsData.filter((c) => !c.isFeatured);

const SIDEBAR_TOPICS_CMP = [
  "Getting Started with AI",
  "Best AI Tools for Small Business",
  "AI for Content Creation",
  "AI Automation Workflows",
  "AI Agents Explained",
  "No-code AI Tools",
];

const TRENDING_PAIRS = [
  {
    a: { name: "Offrs",         bg: "bg-emerald-600", letter: "OF" },
    b: { name: "Revaluate",     bg: "bg-gray-900",    letter: "RV" },
  },
  {
    a: { name: "HouseCanary",   bg: "bg-blue-600",    letter: "HC" },
    b: { name: "ManyChat",      bg: "bg-purple-500",  letter: "MC" },
  },
  {
    a: { name: "REimagineHome", bg: "bg-purple-700",  letter: "RI" },
    b: { name: "Copy.ai",       bg: "bg-yellow-500",  letter: "CP" },
  },
];

const CATEGORIES = [
  { label: "AI Writing",          icon: PenLine,      sub: "12 comparisons" },
  { label: "AI Automation",       icon: Workflow,     sub: "14 comparisons" },
  { label: "AI Design & Visuals", icon: Palette,      sub: "15 comparisons" },
  { label: "Productivity",        icon: Zap,          sub: "10 comparisons" },
  { label: "Marketing",           icon: Megaphone,    sub: "11 comparisons" },
  { label: "AI Agents",           icon: Bot,          sub: "9 comparisons"  },
  { label: "Video & Audio",       icon: Video,        sub: "8 comparisons"  },
  { label: "No-code Tools",       icon: Blocks,       sub: "7 comparisons"  },
  { label: "Sales & CRM",         icon: TrendingUp,   sub: "6 comparisons"  },
  { label: "Project Management",  icon: ClipboardList,sub: "6 comparisons"  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ComparisonsPage() {
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
            <span className="text-[#1E293B] font-medium">Comparisons</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <div className="mb-5">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                  AI Tool Comparisons
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-4">
                Compare AI Tools
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #2563eb 0%, #9333ea 100%)" }}
                >
                  Side by Side
                </span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                Find the right AI tools for your needs. We compare features, pricing, pros &amp; cons, and real use cases so you can choose with confidence.
              </p>

              {/* 4 feature mini row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { icon: Settings,  l1: "Unbiased",      l2: "Comparisons" },
                  { icon: Wrench,    l1: "Hands-on",      l2: "Testing"     },
                  { icon: Camera,    l1: "Feature & Price",l2: "Breakdown"  },
                  { icon: RefreshCw, l1: "Updated",       l2: "Regularly"   },
                ].map(({ icon: Icon, l1, l2 }) => (
                  <div key={l1} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon size={15} className="text-blue-600" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-xs font-semibold text-[#1E293B]">{l1}</p>
                      <p className="text-xs text-gray-500">{l2}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Search bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search comparisons (e.g. Midjourney vs DALL·E 3)"
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors shrink-0">
                  Search
                </button>
              </div>

              {/* Popular searches */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-sm text-gray-500 shrink-0">Popular searches:</span>
                {[
                  "ChatGPT vs Claude",
                  "Midjourney vs DALL·E 3",
                  "Notion AI vs ClickUp AI",
                  "Jasper vs Copy.ai",
                ].map((label) => (
                  <a key={label} href="#" className="text-sm text-blue-600 hover:underline">
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right — comparison mockup card */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40" />
              <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-blue-100 rounded-full blur-3xl opacity-40" />

              <div className="relative bg-white rounded-2xl shadow-lg p-6 border border-gray-100">

                {/* Tool header row */}
                <div className="flex items-center justify-between mb-5">
                  {/* ChatGPT */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">G</span>
                    </div>
                    <p className="font-semibold text-sm text-[#1E293B]">ChatGPT</p>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">4.9</span>
                    </div>
                  </div>

                  {/* VS badge */}
                  <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                    VS
                  </div>

                  {/* Claude */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="w-14 h-14 rounded-xl bg-orange-600 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">C</span>
                    </div>
                    <p className="font-semibold text-sm text-[#1E293B]">Claude</p>
                    <div className="flex items-center gap-0.5">
                      {[1,2,3,4,5].map((i) => (
                        <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">4.7</span>
                    </div>
                  </div>
                </div>

                {/* Feature comparison rows */}
                <div className="flex flex-col gap-3">
                  {FEATURE_ROWS.map(({ icon: Icon, label }, idx) => (
                    <div key={label} className="grid grid-cols-[1fr_auto_1fr] gap-2 items-center">
                      {/* Left — ChatGPT result */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-100 rounded-full" />
                        <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                      </div>

                      {/* Centre — feature label */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-7 h-7 rounded-lg bg-gray-50 flex items-center justify-center">
                          <Icon size={13} className="text-gray-400" />
                        </div>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{label}</span>
                      </div>

                      {/* Right — Claude result */}
                      <div className="flex items-center gap-2">
                        {idx < 3
                          ? <CheckCircle size={16} className="text-emerald-500 shrink-0" />
                          : <AlertCircle size={16} className="text-orange-400 shrink-0" />
                        }
                        <div className="flex-1 h-2 bg-gray-100 rounded-full" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA row */}
                <a
                  href="#"
                  className="mt-5 flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg py-2.5 transition-colors"
                >
                  See Full Comparison →
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: Browse Comparisons by Category ── */}
      <section className="py-12 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Browse Comparisons by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Explore the most useful AI tool comparisons for your workflow.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.map(({ label, icon: Icon, sub }) => {
              const theme = CAT_THEME[label];
              return (
                <a
                  key={label}
                  href="#"
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

      {/* ── SECTION 3: Compare AI Tools — Find the Right Fit ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header bar */}
          <div className="flex items-center gap-2 bg-blue-50 rounded-xl p-4 mb-6">
            <Scale size={20} className="text-blue-600 shrink-0" />
            <p className="font-bold text-base text-[#1E293B]">
              Compare AI Tools: Find the Right Fit for Your Needs
            </p>
          </div>

          {/* Label */}
          <p className="text-sm font-medium text-gray-700 mb-3">Add AI tools for comparison</p>

          {/* 3 add-tool slots */}
          <div className="bg-gray-50 rounded-xl p-6 md:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center py-8 text-gray-400 cursor-pointer hover:border-blue-400 hover:text-blue-400 transition-colors"
                >
                  <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center">
                    <Plus size={18} />
                  </div>
                  <span className="text-sm mt-2">+ Add tool</span>
                </div>
              ))}
            </div>

            {/* Compare button — right aligned */}
            <div className="flex justify-end mt-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors">
                Compare AI Tools
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Today's Trending AI Tools: A Comparison ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#1E293B] mb-4">
            Today&apos;s Trending AI Tools: A Comparison
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TRENDING_PAIRS.map(({ a, b }) => (
              <div key={`${a.name}-${b.name}`} className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                {/* Tools header */}
                <div className="p-5 flex items-center justify-center gap-4">
                  {/* Tool A */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${a.bg} flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{a.letter}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#1E293B] mt-1 text-center">{a.name}</p>
                  </div>

                  {/* VS badge */}
                  <div className="w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                    vs
                  </div>

                  {/* Tool B */}
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${b.bg} flex items-center justify-center`}>
                      <span className="text-white text-xs font-bold">{b.letter}</span>
                    </div>
                    <p className="text-xs font-semibold text-[#1E293B] mt-1 text-center">{b.name}</p>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold text-center py-2.5 transition-colors"
                >
                  Compare AI&apos;s
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Featured Comparisons ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Featured Comparisons</h2>
              <p className="text-sm text-gray-500 mt-1">In-depth comparisons of the most popular AI tools.</p>
            </div>
            <a href="#" className="hidden md:inline-block text-blue-600 text-sm font-medium hover:underline shrink-0">
              View all comparisons →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_COMPARISONS.map((c) => (
              <ResourceCard
                key={c.slug}
                href={c.href}
                wholeCardLink
                thumbnailBgClassName="bg-gray-900"
                thumbnailExtraClassName="flex items-center justify-center gap-3"
                thumbnailContent={
                  <>
                    <span className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${FEAT_BADGE[c.badge]}`}>
                      {c.badge}
                    </span>
                    <div className={`w-12 h-12 rounded-full ${c.toolA.logo.bg} flex items-center justify-center shrink-0`}>
                      <span className="text-white text-xs font-bold">{c.toolA.logo.text}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center text-xs font-bold shrink-0">
                      vs
                    </div>
                    <div className={`w-12 h-12 rounded-full ${c.toolB.logo.bg} flex items-center justify-center shrink-0`}>
                      <span className="text-white text-xs font-bold">{c.toolB.logo.text}</span>
                    </div>
                  </>
                }
                title={c.title}
                titleClassName="font-semibold text-sm text-[#1E293B]"
                description={c.description}
                descriptionClassName="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed flex-1"
                footer={<p className="text-xs text-gray-400 mt-2">Updated {c.date} • {c.readTime}</p>}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: Latest Comparisons + Sidebar ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── LEFT COL: Latest Comparisons table ── */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#1E293B]">Latest Comparisons</h2>
                <p className="text-sm text-gray-500 mt-1">Fresh comparisons to help you make better decisions.</p>
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-xl bg-white shadow-sm">
                <table className="w-full min-w-[640px] text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Comparison</th>
                      <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Tools</th>
                      <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Key Focus</th>
                      <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {LATEST_COMPARISONS.map((row) => (
                      <tr key={row.slug} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                        {/* Comparison */}
                        <td className="py-3 px-4">
                          <Link href={row.href} className="font-medium text-sm text-[#1E293B] hover:text-blue-600 transition-colors block">
                            {row.title}
                          </Link>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{row.description}</p>
                        </td>
                        {/* Tools */}
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <span className={`w-6 h-6 rounded ${row.toolA.logo.bg} flex items-center justify-center`}>
                              <span className="text-white text-[9px] font-bold">{row.toolA.logo.text}</span>
                            </span>
                            <span className={`w-6 h-6 rounded ${row.toolB.logo.bg} flex items-center justify-center`}>
                              <span className="text-white text-[9px] font-bold">{row.toolB.logo.text}</span>
                            </span>
                          </div>
                        </td>
                        {/* Key Focus */}
                        <td className="py-3 px-4 text-xs text-gray-500 max-w-[160px]">
                          <span className="line-clamp-2">{row.focus}</span>
                        </td>
                        {/* Updated */}
                        <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">{row.date} • {row.readTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <a href="#" className="text-blue-600 text-sm font-medium mt-4 hover:underline block text-center">
                Load more comparisons ↓
              </a>
            </div>

            {/* ── RIGHT COL: Sidebar ── */}
            <div className="lg:col-span-1">

              {/* Box 1: Popular Topics */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white mb-6">
                <h3 className="font-bold text-base text-[#1E293B] mb-3">Popular Topics</h3>
                <ul>
                  {SIDEBAR_TOPICS_CMP.map((topic) => (
                    <li key={topic}>
                      <a href="#" className="flex justify-between items-center text-sm text-gray-700 hover:text-blue-600 py-1.5 border-b border-gray-100 last:border-0 transition-colors">
                        <span>{topic}</span>
                        <ChevronRight size={14} className="shrink-0 text-gray-400" />
                      </a>
                    </li>
                  ))}
                </ul>
                <a href="#" className="block w-full border border-blue-600 text-blue-600 rounded-lg py-2 text-sm font-medium text-center mt-3 hover:bg-blue-50 transition-colors">
                  View all topics
                </a>
              </div>

              {/* Box 2: Stay Updated */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white">
                <h3 className="font-bold text-base text-[#1E293B] mb-1">Stay Updated</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Get the latest comparison guides and AI insights in your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 transition-colors shrink-0">
                    <Send size={16} />
                  </button>
                </div>
                <ul className="mt-2 flex flex-col gap-1">
                  {["No spam", "Unsubscribe anytime", "100% Free"].map((item) => (
                    <li key={item} className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Check size={12} className="text-blue-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
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
