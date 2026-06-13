"use client";

import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import {
  Building2,
  Calendar,
  Check,
  CheckCircle,
  CheckCircle2,
  ChevronDown,
  Clock,
  FileEdit,
  FileText,
  Globe,
  LayoutDashboard,
  Layers,
  Mail,
  MapPin,
  Megaphone,
  Mic,
  Plug,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  StarHalf,
  Trophy,
  Users,
  XCircle,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { aiToolsData } from "../../data/ai-tools-reviews";

// ─── DYNAMIC ICON MAP ─────────────────────────────────────────────────────────

const ICON_MAP: Record<string, LucideIcon> = {
  Building2, Calendar, CheckCircle, Clock, FileEdit, FileText,
  Globe, Layers, Mail, MapPin, Megaphone, Mic, Plug,
  Search, Share2, Sparkles, Users, Zap,
};

// ─── FEATURE CARD THEMES (cycling) ────────────────────────────────────────────

const FEATURE_THEMES = [
  { bg: "bg-blue-50",    icon: "text-blue-600"    },
  { bg: "bg-purple-50",  icon: "text-purple-600"  },
  { bg: "bg-orange-50",  icon: "text-orange-500"  },
  { bg: "bg-emerald-50", icon: "text-emerald-600" },
  { bg: "bg-pink-50",    icon: "text-pink-600"    },
  { bg: "bg-teal-50",    icon: "text-teal-600"    },
];

// ─── TOC ITEMS ────────────────────────────────────────────────────────────────

const TOC_ITEMS = [
  { label: "Overview",      href: "overview"      },
  { label: "Key Features",  href: "key-features"  },
  { label: "Use Cases",     href: "best-for"      },
  { label: "Pricing",       href: "pricing"       },
  { label: "Pros & Cons",   href: "pros-cons"     },
  { label: "Alternatives",  href: "alternatives"  },
  { label: "Comparison",    href: "comparison"    },
  { label: "Final Verdict", href: "final-verdict" },
  { label: "FAQ",           href: "faq"           },
];

// ─── HERO MOCKUP SIDEBAR ITEMS ────────────────────────────────────────────────

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard"    },
  { icon: Layers,          label: "Templates"    },
  { icon: FileText,        label: "Documents"    },
  { icon: Zap,             label: "Recipes"      },
  { icon: Mic,             label: "Brand Voice"  },
  { icon: Sparkles,        label: "Apps"         },
];

const CONTENT_TYPES = [
  "Blog Post",
  "Social Media",
  "Email",
  "Ads",
  "More",
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function AIToolReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [activeSection, setActiveSection] = useState<string>("overview");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-100px 0px -75% 0px", threshold: 0 }
    );
    TOC_ITEMS.forEach(({ href }) => {
      const el = document.getElementById(href);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  const tool = aiToolsData.find((t) => t.slug === slug);

  if (!tool) {
    return (
      <div className="min-h-screen bg-white font-sans text-[#1E293B]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <p className="text-2xl font-semibold text-gray-400">Tool not found.</p>
          <Link href="/ai-tools" className="mt-4 inline-block text-blue-600 hover:underline">
            ← Back to AI Tools
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

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
            <Link href="/ai-tools" className="hover:text-blue-600 transition-colors">AI Tools</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="hover:text-blue-600 transition-colors cursor-default">AI Writing</span>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium">{tool.name} Review</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="py-10 sm:py-14 border-b border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

            {/* ── Left: Text ── */}
            <div>
              {/* Logo chip */}
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-9 h-9 rounded-lg ${tool.logo.bg} flex items-center justify-center shrink-0`}>
                  <span className="text-white font-bold text-sm">{tool.logo.text}</span>
                </div>
                <span className="text-sm font-medium text-gray-500">{tool.name}</span>
              </div>

              {/* Heading */}
              <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-tight">
                <span className="text-purple-700">{tool.name} Review:</span>
                <br />
                <span>{tool.tagline}</span>
              </h1>

              {/* Description */}
              <p className="text-gray-600 mt-3 max-w-lg leading-relaxed">
                {tool.description}
              </p>

              {/* Meta row 2×2 */}
              <div className="flex flex-wrap items-start gap-x-6 gap-y-3 mt-4">
                {[
                  { icon: Calendar,    title: "Updated",       subtitle: tool.updatedDate    },
                  { icon: Clock,       title: tool.readTime,   subtitle: "Read Time"         },
                  { icon: ShieldCheck, title: "Independent",   subtitle: "Review"            },
                  { icon: CheckCircle, title: "Tested &",      subtitle: "Researched"        },
                ].map(({ icon: Icon, title, subtitle }) => (
                  <div key={title} className="flex items-start gap-2">
                    <Icon size={18} className="text-blue-600 shrink-0 mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900">{title}</span>
                      <span className="text-sm text-gray-500">{subtitle}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 mt-5">
                <a
                  href={tool.ctaPrimary.href}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors"
                >
                  {tool.ctaPrimary.text}
                </a>
                <a
                  href={tool.ctaSecondary.href}
                  className="border border-gray-300 hover:bg-gray-50 text-[#1E293B] font-medium rounded-lg px-6 py-2.5 text-sm transition-colors"
                >
                  {tool.ctaSecondary.text}
                </a>
              </div>

              {/* Affiliate disclosure */}
              <p className="text-xs text-gray-400 mt-3">{tool.affiliateDisclosure}</p>
            </div>

            {/* ── Right: Dashboard mockup ── */}
            <div className="relative flex justify-center lg:justify-end">
              {/* Decorative blur */}
              <div
                className="absolute -right-8 -top-8 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
                style={{ background: "radial-gradient(circle, #F97316 0%, #a855f7 100%)" }}
              />

              {/* Card */}
              <div className="relative bg-white border border-gray-200 rounded-2xl shadow-xl p-4 w-full max-w-md">

                {/* Mockup header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded-md ${tool.logo.bg} flex items-center justify-center`}>
                      <span className="text-white font-bold text-[9px]">{tool.logo.text}</span>
                    </div>
                    <span className="text-xs font-semibold text-gray-800">{tool.name}</span>
                  </div>
                  <button className="bg-gray-100 text-gray-600 text-[10px] font-medium rounded-full px-2.5 py-1 hover:bg-gray-200 transition-colors">
                    Upgrade {tool.name}
                  </button>
                </div>

                {/* Mockup body */}
                <div className="flex gap-3">

                  {/* Sidebar */}
                  <div className="w-20 shrink-0 flex flex-col gap-1 border-r border-gray-100 pr-3">
                    {SIDEBAR_ITEMS.map(({ icon: Icon, label }) => (
                      <div key={label} className="flex flex-col items-center gap-0.5 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <Icon size={12} className="text-gray-400" />
                        <span className="text-[9px] text-gray-400 text-center leading-none">{label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Content area */}
                  <div className="flex-1 min-w-0">
                    {/* Headline with purple accent */}
                    <p className="text-xs font-bold text-gray-800 leading-snug mb-1">
                      {tool.heroImage.headline.split("AI").map((part, i, arr) =>
                        i < arr.length - 1 ? (
                          <span key={i}>
                            {part}
                            <span className="text-purple-600">AI</span>
                          </span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </p>

                    {/* Subheadline */}
                    <p className="text-[10px] text-gray-500 leading-relaxed mb-2">
                      {tool.heroImage.subheadline}
                    </p>

                    {/* CTA buttons */}
                    <div className="flex gap-1.5 mb-3">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white text-[9px] font-medium rounded-md px-2.5 py-1 transition-colors whitespace-nowrap">
                        {tool.heroImage.ctaText}
                      </button>
                      <button className="border border-gray-300 text-gray-600 text-[9px] font-medium rounded-md px-2.5 py-1 hover:bg-gray-50 transition-colors whitespace-nowrap">
                        Get a Demo
                      </button>
                    </div>

                    {/* Content type grid */}
                    <p className="text-[9px] font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">
                      Create New Content
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {CONTENT_TYPES.map((type) => (
                        <div
                          key={type}
                          className="bg-gray-50 border border-gray-100 rounded-lg px-2 py-1 flex flex-col items-center gap-0.5 cursor-pointer hover:border-purple-200 hover:bg-purple-50 transition-colors"
                        >
                          <Sparkles size={10} className="text-purple-400" />
                          <span className="text-[8px] text-gray-500 whitespace-nowrap">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative AI assistant icon */}
                <div
                  className="absolute -bottom-3 -right-3 w-9 h-9 rounded-full shadow-lg flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #a855f7 0%, #F97316 100%)" }}
                >
                  <Sparkles size={14} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Rating Summary Bar ── */}
      <section className="py-8 sm:py-10 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-gray-100 rounded-xl bg-white p-6 grid grid-cols-1 md:grid-cols-4 gap-6 divide-y md:divide-y-0 md:divide-x divide-gray-100">

            {/* Col 1: Overall Rating */}
            <div className="pt-6 md:pt-0 first:pt-0">
              <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">Our Overall Rating</p>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-3xl font-bold text-[#1E293B]">{tool.overallRating}</span>
                <span className="text-base text-gray-400 font-medium">/10</span>
              </div>
              {/* Star row */}
              <div className="flex items-center gap-0.5 mt-1.5">
                {(() => {
                  const full = Math.floor(tool.ratingStars);
                  const half = tool.ratingStars % 1 >= 0.5;
                  const empty = 5 - full - (half ? 1 : 0);
                  return (
                    <>
                      {Array.from({ length: full }).map((_, i) => (
                        <Star key={`f${i}`} size={14} className="text-amber-400 fill-amber-400" />
                      ))}
                      {half && <StarHalf size={14} className="text-amber-400 fill-amber-400" />}
                      {Array.from({ length: empty }).map((_, i) => (
                        <Star key={`e${i}`} size={14} className="text-gray-200 fill-gray-200" />
                      ))}
                    </>
                  );
                })()}
              </div>
              <p className="text-xs text-gray-400 mt-1">{tool.ratingBasis}</p>
            </div>

            {/* Col 2: Best For */}
            <div className="pt-6 md:pt-0 md:pl-6">
              <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">Best For</p>
              <ul className="mt-1 space-y-1">
                {tool.bestFor.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-sm text-gray-700">
                    <CheckCircle size={13} className="text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Pricing */}
            <div className="pt-6 md:pt-0 md:pl-6">
              <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">Pricing</p>
              <p className="text-xs text-gray-400 mt-1">Starts at</p>
              <div className="flex items-baseline gap-1 mt-0.5 flex-wrap">
                <span className="text-2xl font-bold text-blue-600">{tool.pricingStartsAt}</span>
                <span className="text-xs text-gray-500">{tool.pricingNote}</span>
              </div>
            </div>

            {/* Col 4: Bottom Line */}
            <div className="pt-6 md:pt-0 md:pl-6">
              <p className="text-xs text-gray-500 uppercase font-medium tracking-wide">Bottom Line</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">{tool.bottomLine}</p>
              <a
                href={tool.ctaPrimary.href}
                className="inline-block text-blue-600 text-sm font-medium mt-2 hover:underline"
              >
                Visit {tool.name} →
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 3–5: TOC Sidebar + Main Content ── */}
      <section className="py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            {/* ── TOC Sidebar ── */}
            <aside className="lg:col-span-1">
              <div className="border border-gray-100 rounded-xl p-4 bg-white sticky top-20">
                <p className="font-bold text-xs uppercase text-gray-400 mb-3 tracking-wide">On This Page</p>
                <nav>
                  {TOC_ITEMS.map(({ label, href }) => {
                    const active = activeSection === href;
                    return (
                      <a
                        key={href}
                        href={`#${href}`}
                        className={`block text-sm py-1.5 pl-3 -ml-px border-l-2 transition-colors ${
                          active
                            ? "border-blue-600 text-blue-600 font-medium"
                            : "border-transparent text-gray-500 hover:text-gray-900"
                        }`}
                      >
                        {label}
                      </a>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* ── Main Content (col-span-3) ── */}
            <div className="lg:col-span-3 space-y-10">

              {/* ── Section: Overview (What Is) ── */}
              <div id="overview" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-3">{tool.whatIsTitle}</h2>
                {tool.whatIsParagraphs.map((p, i) => (
                  <p key={i} className="text-gray-600 mb-3 leading-relaxed">{p}</p>
                ))}

                {/* Company info box */}
                <div className="bg-amber-50 rounded-xl p-4 mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { icon: Calendar, label: "Founded",      value: tool.companyInfo.founded,      link: false },
                    { icon: MapPin,   label: "Headquarters", value: tool.companyInfo.headquarters, link: false },
                    { icon: Users,    label: "Team Size",    value: tool.companyInfo.teamSize,     link: false },
                    { icon: Globe,    label: "Website",      value: tool.companyInfo.website,      link: true  },
                  ].map(({ icon: Icon, label, value, link }) => (
                    <div key={label}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon size={12} className="text-amber-600 shrink-0" />
                        <p className="text-xs text-gray-500">{label}</p>
                      </div>
                      {link ? (
                        <a href={`https://${value}`} target="_blank" rel="noopener noreferrer"
                          className="text-sm font-semibold text-blue-600 hover:underline break-all">
                          {value}
                        </a>
                      ) : (
                        <p className="text-sm font-semibold text-[#1E293B]">{value}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Section: Key Features ── */}
              <div id="key-features" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Key Features</h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {tool.keyFeatures.map(({ icon, title, description }, i) => {
                    const theme = FEATURE_THEMES[i % FEATURE_THEMES.length];
                    const Icon = ICON_MAP[icon] ?? Sparkles;
                    return (
                      <div key={title} className="border border-gray-100 rounded-xl p-3 sm:p-4 bg-white hover:shadow-sm transition-shadow">
                        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg ${theme.bg} flex items-center justify-center`}>
                          <Icon size={16} className={theme.icon} />
                        </div>
                        <p className="font-semibold text-sm text-[#1E293B] mt-2 leading-snug">{title}</p>
                        <p className="text-xs text-gray-500 mt-1 leading-relaxed line-clamp-3">{description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Section: Use Cases (Best For) ── */}
              <div id="best-for" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Best For</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {tool.bestForCards.map(({ icon, title, description }, i) => {
                    const theme = FEATURE_THEMES[i % FEATURE_THEMES.length];
                    const Icon = ICON_MAP[icon] ?? Sparkles;
                    return (
                      <div key={title} className="border border-gray-100 rounded-xl p-3 bg-white text-center hover:shadow-sm transition-shadow">
                        <div className={`w-9 h-9 rounded-lg ${theme.bg} flex items-center justify-center mx-auto`}>
                          <Icon size={16} className={theme.icon} />
                        </div>
                        <p className="font-semibold text-xs text-[#1E293B] mt-2 leading-snug">{title}</p>
                        <p className="text-[10px] text-gray-500 mt-1 leading-snug line-clamp-2">{description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Section: Pricing ── */}
              <div id="pricing" className="scroll-mt-24">
                {/* Header row */}
                <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                  <h2 className="text-2xl font-bold text-[#1E293B]">{tool.name} Pricing</h2>
                  <div className="flex gap-1 bg-gray-100 rounded-lg p-1 text-xs">
                    <button className="bg-white shadow-sm rounded-md px-3 py-1.5 font-medium text-[#1E293B]">
                      Pay Monthly
                    </button>
                    <button className="px-3 py-1.5 text-gray-500 hover:text-gray-700 transition-colors">
                      Pay Yearly (Save 20%)
                    </button>
                  </div>
                </div>

                {/* Pricing cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tool.pricingPlans.map((plan) => (
                    <div
                      key={plan.name}
                      className={`rounded-xl p-5 bg-white relative ${
                        plan.highlighted
                          ? "border-2 border-blue-600"
                          : "border border-gray-100"
                      }`}
                    >
                      {plan.highlighted && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-semibold rounded-full px-2.5 py-0.5 whitespace-nowrap">
                          Most Popular
                        </span>
                      )}
                      <p className="font-semibold text-sm text-gray-500">{plan.name}</p>
                      <div className="flex items-baseline gap-1 mt-1">
                        <span className="text-2xl font-bold text-[#1E293B]">{plan.price}</span>
                        {plan.period && (
                          <span className="text-sm text-gray-400">{plan.period}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{plan.description}</p>
                      <button
                        className={`w-full mt-3 rounded-lg py-2 text-sm font-medium transition-colors ${
                          plan.highlighted
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "border border-gray-300 hover:bg-gray-50 text-[#1E293B]"
                        }`}
                      >
                        {plan.ctaText}
                      </button>
                      <ul className="mt-4 space-y-1.5">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-1.5 text-xs text-gray-600">
                            <Check size={12} className="text-emerald-500 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Note */}
                <p className="text-xs text-gray-400 text-center mt-3">{tool.pricingNote2}</p>
              </div>

              {/* ── Section: Pros & Cons ── */}
              <div id="pros-cons" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">Pros &amp; Cons</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* Pros */}
                  <div className="border border-emerald-100 rounded-xl p-4 bg-emerald-50/30">
                    <p className="font-semibold text-emerald-700 mb-2">What We Like</p>
                    <ul className="space-y-1.5">
                      {tool.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="border border-red-100 rounded-xl p-4 bg-red-50/30">
                    <p className="font-semibold text-red-600 mb-2">What We Don&apos;t Like</p>
                    <ul className="space-y-1.5">
                      {tool.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-gray-700">
                          <XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              {/* ── Section: Alternatives ── */}
              <div id="alternatives" className="scroll-mt-24">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                  <h2 className="text-2xl font-bold text-[#1E293B]">Top {tool.name} Alternatives</h2>
                  <a href="#" className="text-blue-600 text-sm font-medium hover:underline">
                    View all alternatives →
                  </a>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {tool.alternatives.map((alt) => {
                    const full  = Math.floor(alt.rating);
                    const half  = alt.rating % 1 >= 0.5;
                    const empty = 5 - full - (half ? 1 : 0);
                    return (
                      <div key={alt.name} className="border border-gray-100 rounded-xl p-4 bg-white text-center hover:shadow-sm transition-shadow">
                        <div className={`w-10 h-10 rounded-lg ${alt.logo.bg} flex items-center justify-center mx-auto`}>
                          <span className="text-white font-bold text-xs">{alt.logo.text}</span>
                        </div>
                        <p className="font-semibold text-sm text-[#1E293B] mt-2">{alt.name}</p>
                        <div className="flex justify-center items-center gap-0.5 mt-1">
                          {Array.from({ length: full  }).map((_, i) => <Star key={`f${i}`} size={10} className="text-amber-400 fill-amber-400" />)}
                          {half && <StarHalf size={10} className="text-amber-400 fill-amber-400" />}
                          {Array.from({ length: empty }).map((_, i) => <Star key={`e${i}`} size={10} className="text-gray-200 fill-gray-200" />)}
                          <span className="text-xs text-gray-500 ml-1">{alt.rating}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-snug">{alt.bestFor}</p>
                        <a href={alt.href} className="inline-block text-blue-600 text-xs font-medium mt-2 hover:underline">
                          Read Review →
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Section: Comparison ── */}
              <div id="comparison" className="scroll-mt-24">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                  <h2 className="text-2xl font-bold text-[#1E293B]">{tool.name} vs Top Alternatives</h2>
                </div>

                <div className="overflow-x-auto border border-gray-100 rounded-xl bg-white">
                  <table className="min-w-[700px] w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {["Tool", "Best For", "Price", "AI Quality", "Templates", "SEO", "Ease of Use", "Rating", ""].map((h) => (
                          <th key={h} className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4 whitespace-nowrap">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tool.comparisonTable.map((row) => {
                        const starRow = (val: number) => {
                          const f = Math.floor(val);
                          const h = val % 1 >= 0.5;
                          const e = 5 - f - (h ? 1 : 0);
                          return (
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: f }).map((_, i) => <Star key={`f${i}`} size={10} className="text-amber-400 fill-amber-400" />)}
                              {h && <StarHalf size={10} className="text-amber-400 fill-amber-400" />}
                              {Array.from({ length: e }).map((_, i) => <Star key={`e${i}`} size={10} className="text-gray-200 fill-gray-200" />)}
                            </div>
                          );
                        };
                        return (
                          <tr
                            key={row.name}
                            className={`border-t border-gray-100 ${row.isCurrent ? "bg-blue-50/50" : "hover:bg-gray-50"} transition-colors`}
                          >
                            {/* Tool */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-md ${row.logo.bg} flex items-center justify-center shrink-0`}>
                                  <span className="text-white font-bold text-[9px]">{row.logo.text}</span>
                                </div>
                                <span className={`text-sm ${row.isCurrent ? "font-semibold text-[#1E293B]" : "text-gray-700"}`}>
                                  {row.name}
                                </span>
                              </div>
                            </td>
                            {/* Best For */}
                            <td className="py-3 px-4 text-xs text-gray-600 whitespace-nowrap">{row.bestFor}</td>
                            {/* Price */}
                            <td className="py-3 px-4 text-xs text-gray-600 whitespace-nowrap">{row.startingPrice}</td>
                            {/* AI Quality */}
                            <td className="py-3 px-4">{starRow(row.aiQuality)}</td>
                            {/* Templates */}
                            <td className="py-3 px-4">{starRow(row.templates)}</td>
                            {/* SEO */}
                            <td className="py-3 px-4">{starRow(row.seoFeatures)}</td>
                            {/* Ease of Use */}
                            <td className="py-3 px-4">{starRow(row.easeOfUse)}</td>
                            {/* Rating */}
                            <td className="py-3 px-4">
                              <span className={`text-xs ${row.isCurrent ? "font-bold text-[#1E293B]" : "text-gray-600"}`}>
                                {row.overallRating}/10
                              </span>
                            </td>
                            {/* Link */}
                            <td className="py-3 px-4 whitespace-nowrap">
                              {row.isCurrent ? (
                                <span className="text-gray-400 text-xs">Current</span>
                              ) : (
                                <a href="#" className="text-blue-600 text-xs font-medium hover:underline">
                                  Read Review →
                                </a>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* ── Section: Final Verdict ── */}
              <div id="final-verdict" className="scroll-mt-24">
                <div className="rounded-2xl text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
                  style={{ background: "linear-gradient(to right, #2563eb, #F97316)" }}>
                  {/* Left */}
                  <div className="flex items-start gap-4">
                    <div className="bg-white/20 rounded-full p-3 shrink-0">
                      <Trophy size={24} className="text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-bold">{tool.finalVerdictTitle}</h2>
                      <p className="text-sm opacity-90 mt-1 max-w-md">{tool.finalVerdictDescription}</p>
                      <div className="flex flex-wrap gap-3 mt-2">
                        {tool.finalVerdictBullets.map((b) => (
                          <span key={b} className="flex items-center gap-1 text-xs opacity-90">
                            <Check size={12} className="shrink-0" />
                            {b}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Right */}
                  <div className="shrink-0 text-center">
                    <a
                      href={tool.ctaPrimary.href}
                      className="inline-block bg-white text-gray-900 rounded-lg px-6 py-3 font-semibold text-sm hover:bg-gray-50 transition-colors"
                    >
                      Visit {tool.name} Now →
                    </a>
                    <p className="text-xs opacity-80 mt-1 flex items-center justify-center gap-1">
                      <Check size={11} className="shrink-0" />
                      14-day money-back guarantee
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Section: FAQ ── */}
              <div id="faq" className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-[#1E293B] mb-4">FAQ</h2>
                <div className="divide-y divide-gray-200 border border-gray-100 rounded-xl overflow-hidden bg-white">
                  {tool.faqs.map((faq, i) => (
                    <div key={i}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex justify-between items-center text-left px-4 py-3 text-sm font-medium text-[#1E293B] hover:bg-gray-50 transition-colors"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 shrink-0 ml-3 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-3 text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <a href="#" className="inline-block text-blue-600 text-sm font-medium mt-3 hover:underline">
                  View all FAQs →
                </a>
              </div>

              {/* ── Section: Related Articles ── */}
              <div className="scroll-mt-24">
                <div className="flex flex-wrap justify-between items-center gap-2 mb-4">
                  <h2 className="text-2xl font-bold text-[#1E293B]">Related Articles</h2>
                  <a href="#" className="text-blue-600 text-sm font-medium hover:underline">View all articles →</a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {tool.relatedArticles.map((article) => {
                    const badgeClass =
                      article.category === "REVIEW"
                        ? "bg-blue-50 text-blue-600"
                        : article.category === "COMPARISON"
                        ? "bg-purple-50 text-purple-600"
                        : "bg-emerald-50 text-emerald-600";
                    return (
                      <div key={article.title} className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-sm transition-shadow">
                        <span className={`inline-block text-xs font-semibold uppercase px-2 py-0.5 rounded-full ${badgeClass}`}>
                          {article.category}
                        </span>
                        <p className="font-semibold text-sm text-[#1E293B] mt-1 leading-snug">{article.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{article.description}</p>
                        <a href={article.href} className="inline-block text-blue-600 text-xs font-medium mt-2 hover:underline">
                          {article.ctaText}
                        </a>
                      </div>
                    );
                  })}
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
