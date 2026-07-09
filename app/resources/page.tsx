import type { Metadata } from "next";
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
import { guidesData } from "../../lib/guides-data";
import { comparisonsData } from "../../lib/comparisons-data";
import { tagsData } from "../../lib/tags-data";
import { tutorialsData } from "../../lib/tutorials-data";
import { workflowsData } from "../../lib/workflows-data";
import { caseStudiesData } from "../../lib/case-studies-data";
import ResourceSearch, { type ResourceSearchItem } from "./ResourceSearch";

// ─── SEARCH INDEX ─────────────────────────────────────────────────────────────
// Flat, static index across all resource content types so the hero search box
// can filter titles/descriptions/tags client-side.

const SEARCH_INDEX: ResourceSearchItem[] = [
  ...guidesData.map((g) => ({ item: g, type: "Guide" })),
  // Placeholder tutorials have no detail page yet — keep them out of search.
  ...tutorialsData.filter((t) => !t.isPlaceholder).map((t) => ({ item: t, type: "Tutorial" })),
  ...workflowsData.map((w) => ({ item: w, type: "Workflow" })),
  ...comparisonsData.map((c) => ({ item: c, type: "Comparison" })),
  ...caseStudiesData.map((cs) => ({ item: cs, type: "Use Case" })),
].map(({ item, type }) => ({
  title: item.title,
  description: item.description,
  href: item.href,
  type,
  keywords: [item.title, item.description, ...(item.tags ?? [])]
    .join(" ")
    .toLowerCase(),
}));

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
  ARCHITECTURE:  "bg-sky-600 text-white",
  CONSTRUCTION:  "bg-amber-600 text-white",
  "REAL ESTATE": "bg-emerald-600 text-white",
};

// ─── FREE RESOURCE ICON THEMES ────────────────────────────────────────────────

const FREE_RES_THEME: Record<string, { bg: string; color: string; icon: "text" | "image" }> = {
  "AI Prompt Cheat Sheet":             { bg: "bg-red-50",    color: "text-red-500",    icon: "text"  },
  "Top 50 AI Tools Checklist":         { bg: "bg-blue-50",   color: "text-blue-600",   icon: "text"  },
  "AI Automation Workflow Template":   { bg: "bg-emerald-50",color: "text-emerald-600",icon: "image" },
  "Content Creation Prompt Pack":      { bg: "bg-orange-50", color: "text-orange-500", icon: "text"  },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const FEATURED_SLUGS = ["architecture-ai-tools", "construction-ai-tools", "real-estate-ai-tools"];

const FEATURED_GUIDES = FEATURED_SLUGS.map((slug) => {
  const g = guidesData.find((guide) => guide.slug === slug)!;
  return {
    badge: g.badge,
    title: g.title,
    desc: g.description,
    date: g.date,
    read: g.readTime,
    href: g.href,
  };
});

const SIDEBAR_TOPICS = [
  { label: "AI Agents",           href: "/tags/ai-agents"          },
  { label: "Prompt Engineering",  href: "/tags/prompt-engineering" },
  { label: "ChatGPT",             href: "/tags/chatgpt"            },
  { label: "AI Automation",       href: "/tags/automation"         },
  { label: "No-code AI Tools",    href: "/tags/no-code"            },
  { label: "AI Writing",          href: "/tags/ai-writing"         },
];

const LATEST_BADGE: Record<string, string> = {
  COMPARISON:  "text-purple-600 bg-purple-50",
  GUIDES:      "text-blue-600 bg-blue-50",
  TUTORIALS:   "text-emerald-600 bg-emerald-50",
  "AI AGENTS": "text-orange-600 bg-orange-50",
};

// Latest resources, sourced from real content so every item links somewhere.
const LATEST_RESOURCES = [
  ...comparisonsData.slice(0, 3).map((c) => ({
    badge: "COMPARISON",
    title: c.title,
    desc: c.description,
    date: c.date,
    read: c.readTime,
    href: c.href,
  })),
  ...guidesData.slice(0, 2).map((g) => ({
    badge: "GUIDES",
    title: g.title,
    desc: g.description,
    date: g.date,
    read: g.readTime,
    href: g.href,
  })),
];

const FREE_RESOURCES = [
  { title: "AI Prompt Cheat Sheet",           type: "PDF"      },
  { title: "Top 50 AI Tools Checklist",        type: "PDF"      },
  { title: "AI Automation Workflow Template",  type: "Template" },
  { title: "Content Creation Prompt Pack",     type: "PDF"      },
];

const CATEGORIES = [
  { label: "Guides",      icon: BookOpen,      href: "/resources/guides",       desc: "Step-by-step AI guides for every skill level." },
  { label: "Tutorials",   icon: GraduationCap, href: "/resources/tutorials",    desc: "Learn how to use AI tools effectively." },
  { label: "Workflows",   icon: Workflow,      href: "/resources/workflows",    desc: "Automate tasks and save hours every week." },
  { label: "Comparisons", icon: Scale,         href: "/resources/comparisons",  desc: "Compare AI tools side by side." },
  { label: "Use Cases",   icon: Lightbulb,     href: "/resources/case-studies", desc: "Real-world AI applications for your industry." },
  { label: "AI News",     icon: Newspaper,     href: "/resources/ai-news",      desc: "Latest updates and insights on AI." },
];

const STATS = [
  { icon: BookOpen,    count: "200+",   label: "Guides & Tutorials" },
  { icon: Workflow,    count: "50+",    label: "Workflows"          },
  { icon: GitCompare,  count: "30+",    label: "Comparisons"        },
  { icon: Calendar,    count: "Weekly", label: "New Content"        },
];

const POPULAR_TOPICS = [
  { label: "ChatGPT",       href: "/tags/chatgpt"         },
  { label: "AI Automation", href: "/tags/automation"      },
  { label: "Productivity",  href: "/tags/productivity"    },
  { label: "Marketing",     href: "/tags/ai-for-business" },
  { label: "No-code",       href: "/tags/no-code"         },
  { label: "AI Agents",     href: "/tags/ai-agents"       },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI Resources Hub: Guides, News, Case Studies & Comparisons",
  description:
    "Learn, build, and grow with AI: guides, tutorials, news, case studies, workflows, and tool comparisons for furniture, architecture, construction, and real estate.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "AI Resources Hub | SmartAI for Work",
    description:
      "Learn, build, and grow with AI: guides, tutorials, news, case studies, workflows, and tool comparisons for furniture, architecture, construction, and real estate.",
    url: "/resources",
    type: "website",
  },
};

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
              <ResourceSearch items={SEARCH_INDEX} />

              {/* Popular topics */}
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-sm text-gray-500 shrink-0">Popular topics:</span>
                {POPULAR_TOPICS.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    {label}
                  </Link>
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
            {CATEGORIES.map(({ label, icon: Icon, href, desc }) => {
              const theme = CATEGORY_THEME[label];
              return (
                <Link
                  key={label}
                  href={href}
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
                </Link>
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
                  <Link
                    href="/resources/guides"
                    className="hidden md:inline-block text-blue-600 text-sm font-medium hover:underline shrink-0"
                  >
                    View all guides →
                  </Link>
                </div>

                {/* 3 cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {FEATURED_GUIDES.map((guide) => (
                    <Link key={guide.title} href={guide.href} className="group flex flex-col">
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
                    </Link>
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
                  <Link
                    href="/resources/comparisons"
                    className="hidden md:inline-block text-blue-600 text-sm font-medium hover:underline shrink-0"
                  >
                    View all articles →
                  </Link>
                </div>

                {/* List */}
                <ul>
                  {LATEST_RESOURCES.map((item) => {
                    const badge = LATEST_BADGE[item.badge];
                    return (
                      <li key={item.title} className="flex gap-4 items-start py-4 border-b border-gray-100 last:border-0">
                        {/* Thumbnail */}
                        <div className="bg-gray-800 rounded-lg w-20 sm:w-24 aspect-[2/1] relative overflow-hidden flex-shrink-0">
                          {/* TODO: replace with image */}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <Link href={item.href} className="font-semibold text-sm md:text-base text-[#1E293B] hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                            {item.title}
                          </Link>
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
                  {SIDEBAR_TOPICS.map(({ label, href }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="flex justify-between items-center text-sm text-gray-700 hover:text-blue-600 py-1.5 border-b border-gray-100 last:border-0 transition-colors"
                      >
                        <span>{label}</span>
                        <ChevronRight size={14} className="shrink-0 text-gray-400" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/tags"
                  className="block w-full border border-blue-600 text-blue-600 rounded-lg py-2 text-sm font-medium text-center mt-3 hover:bg-blue-50 transition-colors"
                >
                  View all topics
                </Link>
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
                <Link
                  href="/#newsletter"
                  className="block w-full border border-gray-300 rounded-lg py-2 text-sm font-medium text-center mt-3 text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Get free resources via newsletter
                </Link>
              </div>

              {/* Box 3: Trending Tags */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white">
                <h3 className="font-bold text-base text-[#1E293B] mb-3">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tagsData.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/tags/${tag.slug}`}
                      className={`rounded-full border px-3 py-1.5 text-xs transition-colors hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 ${
                        tag.isTrending
                          ? "border-blue-300 text-blue-700 font-medium"
                          : "border-gray-200 text-gray-700"
                      }`}
                    >
                      {tag.name}
                    </Link>
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
