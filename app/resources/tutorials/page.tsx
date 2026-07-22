import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BlocksIcon,
  BookOpen,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Grid3x3,
  Image,
  Layers,
  ListOrdered,
  MessageSquare,
  PlayCircle,
  Quote,
  RefreshCw,
  Rocket,
  Smile,
  Star,
  TrendingUp,
  Workflow,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import ResourceCard from "../../components/ResourceCard";
import ResourceListRow from "../../components/ResourceListRow";
import { tutorialsData } from "../../../lib/tutorials-data";

// ─── CATEGORY CARD THEMES ─────────────────────────────────────────────────────

const CAT_THEME: Record<string, { iconBg: string; iconColor: string }> = {
  "Getting Started":      { iconBg: "bg-blue-50",   iconColor: "text-blue-600"   },
  "ChatGPT & AI Chat":    { iconBg: "bg-emerald-50",iconColor: "text-emerald-600"},
  "AI Automation":        { iconBg: "bg-orange-50", iconColor: "text-orange-500" },
  "AI Image & Design":    { iconBg: "bg-purple-50", iconColor: "text-purple-600" },
  "No-code Tools":        { iconBg: "bg-teal-50",   iconColor: "text-teal-600"   },
  "View All Tutorials":   { iconBg: "bg-gray-100",  iconColor: "text-gray-500"   },
};

// ─── FEATURED TUTORIAL BADGE STYLES ──────────────────────────────────────────

const FEAT_BADGE: Record<string, string> = {
  BEGINNER:     "bg-emerald-500 text-white",
  "BEGINNER TO INTERMEDIATE": "bg-emerald-500 text-white",
  INTERMEDIATE: "bg-orange-500 text-white",
  ADVANCED:     "bg-red-500 text-white",
  "NO-CODE":    "bg-blue-500 text-white",
};

// ─── RESULT CARD THEMES ───────────────────────────────────────────────────────

const RESULT_THEME: Record<string, { bg: string; color: string }> = {
  blue:   { bg: "bg-blue-50",   color: "text-blue-600"   },
  green:  { bg: "bg-emerald-50",color: "text-emerald-600"},
  orange: { bg: "bg-orange-50", color: "text-orange-500" },
  yellow: { bg: "bg-yellow-50", color: "text-yellow-600" },
  purple: { bg: "bg-purple-50", color: "text-purple-600" },
};

// ─── LATEST TUTORIAL BADGE STYLES ────────────────────────────────────────────

const LATEST_BADGE: Record<string, string> = {
  PROMPTS:     "text-blue-600 bg-blue-50",
  AUTOMATION:  "text-orange-600 bg-orange-50",
  DESIGN:      "text-purple-600 bg-purple-50",
  PRODUCTIVITY:"text-blue-600 bg-blue-50",
  WRITING:     "text-green-600 bg-green-50",
  "AI AGENTS": "text-pink-600 bg-pink-50",
};

const LEVEL_BADGE: Record<string, string> = {
  Beginner:     "text-emerald-600 bg-emerald-50",
  "Beginner to Intermediate": "text-emerald-600 bg-emerald-50",
  Intermediate: "text-orange-600 bg-orange-50",
  Advanced:     "text-red-600 bg-red-50",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────

const STATS = [
  { icon: BookOpen,   count: "120+",    label: "Tutorials"              },
  { icon: Layers,     count: "15+",     label: "Skill Levels & Tools"   },
  { icon: PlayCircle, count: "200+",    label: "Video Walkthroughs"     },
  { icon: Calendar,   count: "Updated", label: "Every Week"             },
];

const CATEGORIES = [
  { label: "Getting Started",    icon: Rocket,        sub: "18 Tutorials"  },
  { label: "ChatGPT & AI Chat",  icon: MessageSquare, sub: "22 Tutorials"  },
  { label: "AI Automation",      icon: Workflow,      sub: "20 Tutorials"  },
  { label: "AI Image & Design",  icon: Image,         sub: "16 Tutorials"  },
  { label: "No-code Tools",      icon: BlocksIcon,    sub: "14 Tutorials"  },
  { label: "View All Tutorials", icon: Grid3x3,       sub: "All Tutorials" },
];

// Only real, published tutorials appear on the hub — placeholders are hidden
// until they have real content.
const FEATURED_TUTORIALS = tutorialsData.filter((t) => t.isFeatured && !t.isPlaceholder);
const LATEST_TUTORIALS_DATA = tutorialsData.filter((t) => !t.isPlaceholder);

const RESULT_CARDS = [
  { value: "120+",   label: "Step-by-step tutorials",  icon: BookOpen,    theme: "blue"   },
  { value: "98%",    label: "Completion rate",          icon: CheckCircle, theme: "green"  },
  { value: "12 min", label: "Average tutorial length",  icon: Clock,       theme: "orange" },
  { value: "4.8/5",  label: "Average user rating",      icon: Star,        theme: "yellow" },
  { value: "Weekly", label: "New tutorials added",      icon: RefreshCw,   theme: "purple" },
];


const SIDEBAR_TOPICS = [
  { label: "ChatGPT",             href: "/tags/chatgpt"             },
  { label: "Prompt Engineering",  href: "/tags/prompt-engineering"  },
  { label: "AI Automation",       href: "/tags/automation"          },
  { label: "AI Image Generation", href: "/tags/ai-image-generation" },
  { label: "No-code AI",          href: "/tags/no-code"             },
  { label: "AI for Productivity", href: "/tags/productivity"        },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "AI Tutorials: Learn to Use AI Tools Step by Step",
  description:
    "Step-by-step AI tutorials for furniture, architecture, construction, and real estate professionals — from setup to advanced workflows.",
  alternates: { canonical: "/resources/tutorials" },
  openGraph: {
    title: "AI Tutorials | SmartAI for Work",
    description:
      "Step-by-step AI tutorials for furniture, architecture, construction, and real estate professionals — from setup to advanced workflows.",
    url: "/resources/tutorials",
    type: "website",
  },
};

// Reflects the visible breadcrumb: Home > Resources > Tutorials.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
    { "@type": "ListItem", position: 2, name: "Resources", item: "https://www.smartaiforwork.com/resources" },
    { "@type": "ListItem", position: 3, name: "Tutorials", item: "https://www.smartaiforwork.com/resources/tutorials" },
  ],
};

// Only non-placeholder tutorials have a real detail page — placeholders
// render without a link on this same page (see FEATURED_TUTORIALS /
// LATEST_TUTORIALS_DATA above), so they must never get a schema url either.
const REAL_TUTORIALS = tutorialsData.filter((t) => !t.isPlaceholder);

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "AI Tutorials",
  url: "https://www.smartaiforwork.com/resources/tutorials",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: REAL_TUTORIALS.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.title,
      url: `https://www.smartaiforwork.com${t.href}`,
    })),
  },
};

export default function TutorialsPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
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
            <span className="text-[#1E293B] font-medium">Tutorials</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <div className="mb-5">
                <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
                  Step-by-Step Tutorials
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-4">
                AI Tutorials
                <br />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #2563eb 0%, #9333ea 100%)" }}
                >
                  Learn by Doing
                </span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                Step-by-step tutorials to help you master AI tools, build automations, and apply AI to real tasks — no experience required.
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
                  placeholder="Search tutorials (e.g. how to use ChatGPT, automate with Zapier...)"
                  className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors shrink-0">
                  Search
                </button>
              </div>
            </div>

            {/* Right — image + decorative cards */}
            <div className="relative hidden lg:block">
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-40" />
              <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-orange-100 rounded-full blur-3xl opacity-40" />

              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img src="/tutorials.webp" alt="Tutorials illustration" className="w-full h-auto object-cover" />
              </div>

              {/* Decorative card 1 — stats stack (top-left) */}
              <div className="absolute -left-6 top-6 bg-white rounded-xl shadow-lg border border-gray-100 p-3 flex flex-col gap-2 min-w-[200px]">
                {[
                  { icon: ListOrdered, bg: "bg-purple-50", color: "text-purple-600", value: "Step 1-2-3",        label: "Follow Along Easily"    },
                  { icon: Clock,       bg: "bg-blue-50",   color: "text-blue-600",   value: "12 min",            label: "Average Tutorial Length" },
                  { icon: Smile,       bg: "bg-emerald-50",color: "text-emerald-600",value: "Beginner Friendly", label: "No Experience Needed"   },
                ].map(({ icon: Icon, bg, color, value, label }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-full ${bg} flex items-center justify-center shrink-0`}>
                      <Icon size={14} className={color} />
                    </div>
                    <div className="leading-tight">
                      <p className="text-sm font-bold text-[#1E293B]">{value}</p>
                      <p className="text-xs text-gray-500">{label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Decorative quote card (bottom-right) */}
              <div className="absolute -right-4 -bottom-4 bg-gray-900 text-white rounded-xl p-4 max-w-[240px] shadow-xl">
                <Quote size={14} className="text-gray-400 mb-1" />
                <p className="text-xs text-gray-200 leading-relaxed">
                  This tutorial saved me hours — I automated my entire reporting workflow in one afternoon.
                </p>
                <p className="text-xs text-gray-400 mt-2">— Minh T. · Freelance Marketer</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: Explore by Category ── */}
      <section className="py-12 sm:py-14 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Explore Tutorials by Category
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find tutorials that match your skill level and interests.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {CATEGORIES.map(({ label, icon: Icon, sub }) => {
              const theme = CAT_THEME[label];
              return (
                <div
                  key={label}
                  className="border border-gray-100 rounded-xl p-4 bg-white text-center flex flex-col items-center"
                >
                  <div className={`w-10 h-10 rounded-lg ${theme.iconBg} flex items-center justify-center`}>
                    <Icon size={20} className={theme.iconColor} />
                  </div>
                  <p className="font-semibold text-sm text-[#1E293B] mt-2">{label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Featured Tutorials ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Featured Tutorials</h2>
              <p className="text-sm text-gray-500 mt-1">Handpicked tutorials to get you started fast.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURED_TUTORIALS.map((t) => (
              <ResourceCard
                key={t.slug}
                href={t.isPlaceholder ? undefined : t.href}
                thumbnailSrc={t.thumbnail}
                thumbnailAlt={t.imageHint}
                thumbnailContent={
                  <span className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${FEAT_BADGE[t.level.toUpperCase()]}`}>
                    {t.level}
                  </span>
                }
                title={t.title}
                description={t.description}
                footer={
                  <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                    <Clock size={11} className="shrink-0" />
                    <span>{t.duration}{t.steps ? ` • ${t.steps} steps` : " read"}</span>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Why Learn With Our Tutorials ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Why Learn With Our Tutorials</h2>
            <p className="text-sm text-gray-500 mt-1">Built for busy professionals who want real results, fast.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {RESULT_CARDS.map(({ value, label, icon: Icon, theme }) => {
              const t = RESULT_THEME[theme];
              return (
                <div key={label} className="border border-gray-100 rounded-xl p-4 bg-white text-center">
                  <div className={`w-10 h-10 mx-auto rounded-full ${t.bg} flex items-center justify-center`}>
                    <Icon size={18} className={t.color} />
                  </div>
                  <p className="text-xl font-bold text-[#1E293B] mt-2">{value}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SECTION 5 + SIDEBAR: 2-column layout ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* ── LEFT COL: Latest Tutorials ── */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h2 className="text-2xl font-bold text-[#1E293B]">Latest Tutorials</h2>
                <p className="text-sm text-gray-500 mt-1">Fresh step-by-step guides to keep your skills up to date.</p>
              </div>

              <ul>
                {LATEST_TUTORIALS_DATA.map((item) => (
                  <ResourceListRow
                    key={item.slug}
                    href={item.isPlaceholder ? undefined : item.href}
                    thumbnailSrc={item.thumbnail}
                    thumbnailAlt={item.imageHint}
                    title={item.title}
                    badge={{ label: item.badge, className: LATEST_BADGE[item.badge] }}
                    metaContent={
                      <>
                        <span className="text-gray-500 flex items-center gap-1">
                          <Clock size={11} className="shrink-0" />
                          {item.duration}{item.steps ? ` • ${item.steps} steps` : " read"}
                        </span>
                        <span className={`rounded-full px-2 py-0.5 font-semibold ${LEVEL_BADGE[item.level]}`}>
                          {item.level}
                        </span>
                      </>
                    }
                    date={item.date}
                  />
                ))}
              </ul>
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

              {/* Box 2: Request a Tutorial */}
              <div className="border border-gray-100 rounded-xl p-5 bg-white">
                <h3 className="font-bold text-base text-[#1E293B] mb-1">Request a Tutorial</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Can&apos;t find what you&apos;re looking for? Let us know what you&apos;d like to learn.
                </p>
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2.5 text-sm font-medium transition-colors"
                >
                  Suggest a Topic
                  <ArrowRight size={15} className="shrink-0" />
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
