import Link from "next/link";
import {
  BookOpen,
  Calendar,
  ChevronRight,
  FileImage,
  FileText,
  GitCompare,
  GraduationCap,
  Lightbulb,
  Newspaper,
  Scale,
  Workflow,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

// ─── CATEGORY CARD THEMES ─────────────────────────────────────────────────────

const CATEGORY_THEME: Record<
  string,
  { iconBg: string; iconColor: string }
> = {
  Guides:      { iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
  Tutorials:   { iconBg: "bg-emerald-50",iconColor: "text-emerald-600" },
  Workflows:   { iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  Comparisons: { iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  "Use Cases": { iconBg: "bg-teal-50",   iconColor: "text-teal-600"   },
  "AI News":   { iconBg: "bg-red-50",    iconColor: "text-red-500"    },
};

// ─── FEATURED GUIDE BADGE STYLES ─────────────────────────────────────────────

const GUIDE_BADGE: Record<string, string> = {
  GUIDE:    "bg-blue-600 text-white",
  TUTORIAL: "bg-emerald-600 text-white",
  WORKFLOW: "bg-orange-500 text-white",
};

// ─── FREE RESOURCE ICON THEMES ────────────────────────────────────────────────

const FREE_RES_THEME: Record<string, { bg: string; color: string; icon: "text" | "image" }> = {
  "AI Prompt Cheat Sheet":             { bg: "bg-red-50",    color: "text-red-500",    icon: "text"  },
  "Top 50 AI Tools Checklist":         { bg: "bg-blue-50",   color: "text-blue-600",   icon: "text"  },
  "AI Automation Workflow Template":   { bg: "bg-emerald-50",color: "text-emerald-600",icon: "image" },
  "Content Creation Prompt Pack":      { bg: "bg-orange-50", color: "text-orange-500", icon: "text"  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FEATURED_GUIDES = [
  {
    badge: "GUIDE",
    title: "How to Use ChatGPT to 10x Your Productivity",
    desc: "A complete guide with proven prompts, workflows, and real examples.",
    date: "May 18, 2026",
    read: "12 min read",
  },
  {
    badge: "TUTORIAL",
    title: "Build Your First AI Automation (No Code)",
    desc: "Automate repetitive tasks using Make, Zapier, and AI in under 30 minutes.",
    date: "May 16, 2026",
    read: "8 min read",
  },
  {
    badge: "WORKFLOW",
    title: "10 AI Workflows That Save 10+ Hours Per Week",
    desc: "Ready-to-use workflows for content, marketing, sales, and operations.",
    date: "May 14, 2026",
    read: "10 min read",
  },
];

const SIDEBAR_TOPICS = [
  "Getting Started with AI",
  "ChatGPT Tips & Tricks",
  "AI for Marketing",
  "AI Automation",
  "No-code AI Tools",
  "AI Agents",
];

const LATEST_BADGE: Record<string, string> = {
  COMPARISON:  "text-purple-600 bg-purple-50",
  GUIDES:      "text-blue-600 bg-blue-50",
  TUTORIALS:   "text-emerald-600 bg-emerald-50",
  "AI AGENTS": "text-orange-600 bg-orange-50",
};

const LATEST_RESOURCES = [
  { badge: "COMPARISON",  title: "Claude vs ChatGPT: Which One Is Better in 2026?",    desc: "In-depth comparison of features, performance, pricing, and best use cases.",              date: "May 20, 2026", read: "9 min read"  },
  { badge: "GUIDES",      title: "Best AI Tools for Content Creation in 2026",           desc: "Top AI writing, editing, and content creation tools tested and reviewed.",                date: "May 18, 2026", read: "11 min read" },
  { badge: "TUTORIALS",   title: "How to Automate Lead Generation with AI",              desc: "Step-by-step tutorial to build an end-to-end lead gen automation system.",                date: "May 16, 2026", read: "8 min read"  },
  { badge: "COMPARISON",  title: "Make vs Zapier: Which Automation Tool Wins?",          desc: "Complete comparison to help you choose the right automation platform.",                    date: "May 14, 2026", read: "10 min read" },
  { badge: "AI AGENTS",   title: "AI Agents Explained: The Future of Work",              desc: "What are AI agents, how they work, and real business use cases.",                         date: "May 12, 2026", read: "7 min read"  },
];

const FREE_RESOURCES = [
  { title: "AI Prompt Cheat Sheet",           type: "PDF"      },
  { title: "Top 50 AI Tools Checklist",        type: "PDF"      },
  { title: "AI Automation Workflow Template",  type: "Template" },
  { title: "Content Creation Prompt Pack",     type: "PDF"      },
];

const CATEGORIES = [
  { label: "Guides",      icon: BookOpen,      desc: "Step-by-step AI guides for every skill level." },
  { label: "Tutorials",   icon: GraduationCap, desc: "Learn how to use AI tools effectively." },
  { label: "Workflows",   icon: Workflow,      desc: "Automate tasks and save hours every week." },
  { label: "Comparisons", icon: Scale,         desc: "Compare AI tools side by side." },
  { label: "Use Cases",   icon: Lightbulb,     desc: "Real-world AI applications for your industry." },
  { label: "AI News",     icon: Newspaper,     desc: "Latest updates and insights on AI." },
];

const STATS = [
  { icon: BookOpen,    count: "200+",   label: "Guides & Tutorials" },
  { icon: Workflow,    count: "50+",    label: "Workflows"          },
  { icon: GitCompare,  count: "30+",    label: "Comparisons"        },
  { icon: Calendar,    count: "Weekly", label: "New Content"        },
];

const POPULAR_TOPICS = [
  "ChatGPT",
  "AI Automation",
  "Productivity",
  "Marketing",
  "No-code",
  "AI Agents",
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <svg
              className="w-3 h-3 text-gray-300 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium">Resources</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-50 rounded-full blur-3xl opacity-60 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-full blur-3xl opacity-60 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-4">
                AI Resources to
                <br />
                <span className="text-blue-600">Learn</span>
                <span className="text-gray-800">, </span>
                <span className="text-emerald-500">Build</span>
                <span className="text-gray-800"> &amp; </span>
                <span className="text-orange-500">Grow</span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                Practical guides, tutorials, workflows, and insights to help you work smarter with AI and automate your business.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 w-full mb-6">
                {STATS.map(({ icon: Icon, count, label }) => (
                  <div key={label} className="flex items-center gap-2.5 px-4 py-3">
                    <Icon size={18} className="text-blue-600 shrink-0" />
                    <div className="flex flex-col leading-tight">
                      <span className="text-sm font-bold text-[#1E293B]">{count}</span>
                      <span className="text-xs text-gray-500">{label}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Search bar */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search resources (e.g. ChatGPT tutorial, workflows, automation...)"
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors shrink-0">
                  Search
                </button>
              </div>

              {/* Popular topics */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-sm text-gray-500 shrink-0">Popular topics:</span>
                {POPULAR_TOPICS.map((topic) => (
                  <button
                    key={topic}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            {/* Right — hero illustration */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-40" />
              <div className="absolute -bottom-8 -left-8 w-52 h-52 bg-blue-100 rounded-full blur-3xl opacity-40" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/resources.webp"
                  alt="Resources overview"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: 6 Category cards ── */}
      <section className="py-12 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Browse by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Explore resources organised by type to find exactly what you need.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(({ label, icon: Icon, desc }) => {
              const theme = CATEGORY_THEME[label];
              return (
                <a
                  key={label}
                  href="#"
                  className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md transition-shadow flex flex-col"
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${theme.iconBg} flex items-center justify-center shrink-0`}
                  >
                    <Icon size={20} className={theme.iconColor} />
                  </div>
                  <p className="font-semibold text-sm text-[#1E293B] mt-3">{label}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-2 flex-1">
                    {desc}
                  </p>
                  <span className="text-blue-600 text-sm mt-2 hover:underline inline-block">
                    Explore →
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 + 4 + SIDEBAR: 2-column layout ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── LEFT COL (lg:col-span-2): Section 3 + Section 4 ── */}
            <div className="lg:col-span-2">

              {/* ── SECTION 3: Featured Guides & Tutorials ── */}
              <div>
                {/* Header row */}
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1E293B]">
                      Featured Guides &amp; Tutorials
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Handpicked resources to help you master AI.
                    </p>
                  </div>
                  <a
                    href="#"
                    className="hidden md:inline-block text-blue-600 text-sm font-medium hover:underline shrink-0"
                  >
                    View all guides →
                  </a>
                </div>

                {/* 3 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {FEATURED_GUIDES.map((guide) => (
                    <a key={guide.title} href="#" className="group flex flex-col">
                      {/* Thumbnail */}
                      <div className="bg-gray-800 rounded-xl aspect-[2/1] relative overflow-hidden">
                        {/* TODO: replace with image */}
                        <span
                          className={`absolute top-2 left-2 rounded-full px-2 py-0.5 text-xs font-semibold uppercase ${GUIDE_BADGE[guide.badge]}`}
                        >
                          {guide.badge}
                        </span>
                      </div>
                      {/* Text */}
                      <p className="font-semibold text-sm text-[#1E293B] mt-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {guide.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                        {guide.desc}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {guide.date} &bull; {guide.read}
                      </p>
                    </a>
                  ))}
                </div>
              </div>

              {/* ── SECTION 4: Latest Resources ── */}
              <div className="mt-8">
                {/* Header row */}
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1E293B]">Latest Resources</h2>
                    <p className="text-sm text-gray-500 mt-1">Fresh content to keep you ahead.</p>
                  </div>
                  <a
                    href="#"
                    className="hidden md:inline-block text-blue-600 text-sm font-medium hover:underline shrink-0"
                  >
                    View all articles →
                  </a>
                </div>

                {/* List */}
                <ul>
                  {LATEST_RESOURCES.map((item) => {
                    const badge = LATEST_BADGE[item.badge];
                    return (
                      <li key={item.title} className="flex gap-4 items-start py-4 border-b border-gray-100 last:border-0">
                        {/* Thumbnail */}
                        <div className="bg-gray-800 rounded-lg w-20 h-16 sm:w-24 sm:h-20 flex-shrink-0">
                          {/* TODO: replace with image */}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <a href="#" className="font-semibold text-sm md:text-base text-[#1E293B] hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </a>
                          <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                            {item.desc}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 text-xs text-gray-400">
                            <span>{item.date}</span>
                            <span>&bull;</span>
                            <span>{item.read}</span>
                          </div>
                        </div>

                        {/* Badge */}
                        <span className={`hidden sm:inline-block rounded-full px-2.5 py-1 text-xs font-semibold flex-shrink-0 ${badge}`}>
                          {item.badge}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

            </div>

            {/* ── RIGHT COL: Sidebar ── */}
            <div className="lg:col-span-1">

              {/* Box 1: Popular Topics */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white mb-6">
                <h3 className="font-bold text-base text-[#1E293B] mb-3">Popular Topics</h3>
                <ul>
                  {SIDEBAR_TOPICS.map((topic) => (
                    <li key={topic}>
                      <a
                        href="#"
                        className="flex justify-between items-center text-sm text-gray-700 hover:text-blue-600 py-1.5 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <span>{topic}</span>
                        <ChevronRight size={14} className="shrink-0 text-gray-400" />
                      </a>
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className="block w-full border border-blue-600 text-blue-600 rounded-lg py-2 text-sm font-medium text-center mt-3 hover:bg-blue-50 transition-colors"
                >
                  View all topics
                </a>
              </div>

              {/* Box 2: Free Resources */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white mb-6">
                <h3 className="font-bold text-base text-[#1E293B] mb-1">Free Resources</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Download our free templates and cheat sheets.
                </p>
                <ul>
                  {FREE_RESOURCES.map((res) => {
                    const th = FREE_RES_THEME[res.title];
                    const Icon = th.icon === "image" ? FileImage : FileText;
                    return (
                      <li key={res.title} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                        <div className={`w-8 h-8 rounded-lg ${th.bg} flex items-center justify-center shrink-0`}>
                          <Icon size={16} className={th.color} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 leading-snug truncate">
                            {res.title}
                          </p>
                          <p className="text-xs text-gray-400">{res.type}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="#"
                  className="block w-full border border-gray-300 rounded-lg py-2 text-sm font-medium text-center mt-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Download all free resources
                </a>
              </div>

              {/* Box 3: Trending Tags */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white">
                <h3 className="font-bold text-base text-[#1E293B] mb-3">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "ChatGPT",              prominent: true  },
                    { label: "Automation",            prominent: true  },
                    { label: "Prompt Engineering",    prominent: true  },
                    { label: "AI Design",             prominent: false },
                    { label: "Midjourney",            prominent: false },
                    { label: "Interior Design",       prominent: false },
                    { label: "AI Writing",            prominent: false },
                    { label: "Workflow",              prominent: false },
                    { label: "Design Visualization",  prominent: false },
                    { label: "Productivity",          prominent: false },
                    { label: "AI Render",             prominent: false },
                    { label: "BIM",                   prominent: false },
                  ].map(({ label, prominent }) => (
                    <a
                      key={label}
                      href="#"
                      className={`rounded-full border px-3 py-1.5 text-xs transition-colors hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 ${
                        prominent
                          ? "border-blue-300 text-blue-700 font-medium"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {label}
                    </a>
                  ))}
                </div>
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
