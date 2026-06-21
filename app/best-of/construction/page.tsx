"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Briefcase,
  Building,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock,
  HardHat,
  ListChecks,
  Search,
  Sparkles,
  Star,
  Trophy,
  User,
  Wrench,
} from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";

// ─── RANK BADGE STYLES ────────────────────────────────────────────────────────

const RANK_BADGE: Record<number, string> = {
  1: "bg-yellow-500 text-white",
  2: "bg-gray-400 text-white",
  3: "bg-orange-700 text-white",
  4: "bg-gray-300 text-gray-700",
  5: "bg-gray-300 text-gray-700",
};

// ─── TOP PICKS DATA ───────────────────────────────────────────────────────────

const TOP_PICKS = [
  {
    rank: 1,
    name: "Insightful",
    logoBg: "bg-[#2d5cf3]",
    logoText: "I",
    rating: 4.8,
    bestFor: "Architecture firms tracking time spent on CAD and design phases",
    desc: "Insightful is an advanced employee monitoring and time tracking software suited for architecture, construction, and real estate teams looking to optimize productivity and track billable hours.",
    pricingLabel: "Custom",
    price: "Contact for pricing",
    href: "/tools/insightful",
    affiliateHref: "https://www.insightful.io/?red=smartaa4fdcb&utm_source=reditus&utm_medium=affiliate&utm_campaign=smartaa4fdcb",
  },
  {
    rank: 2,
    name: "Signeasy",
    logoBg: "bg-gray-900",
    logoText: "S",
    rating: 4.4,
    bestFor: "Architecture and construction firms managing client contracts and proposals",
    desc: "Signeasy is a legally binding e-signature and contract management platform used by 48,000+ businesses across 100 countries. It combines document signing, multi-party workflows, audit trails, and AI-powered contract management — at pricing that undercuts DocuSign and Adobe Sign.",
    pricingLabel: "Freemium",
    price: "Free plan available / From $10/user/month",
    href: "/tools/signeasy",
    affiliateHref: "https://signeasy.com/?red=smartaa4fdcb",
  },
  {
    rank: 3,
    name: "Team Pulse",
    logoBg: "bg-gray-700",
    logoText: "TP",
    rating: 4.0,
    bestFor: "Architecture studios managing project tasks and team activity",
    desc: "Team Pulse is a simple, AI-assisted project management platform that gives teams instant visibility across tasks, projects, and pipelines — without the learning curve of tools like Asana or Monday.com. No credit card required to get started.",
    pricingLabel: "Freemium",
    price: "Free plan available / Paid plans available",
    href: "/tools/team-pulse",
    affiliateHref: "https://goteampulse.io/?red=smartaa4fdcb",
  },
];

// ─── COMPARE TABLE DATA ───────────────────────────────────────────────────────

const COMPARE_TOOLS = [
  { name: "Buildots", href: "/ai-tools/buildots",          logoBg: "bg-[#f27313]",  logoText: "BD", bestFor: "Site Monitoring",      ease: 9.1, features: 9.3, quality: 9.2, price: 8.6, overall: 9.3 },
  { name: "OpenSpace", href: "/ai-tools/openspace",         logoBg: "bg-gray-900",   logoText: "OS", bestFor: "Site Documentation",   ease: 9.3, features: 8.9, quality: 9.0, price: 8.5, overall: 9.0 },
  { name: "ALICE Technologies", href: "/ai-tools/alice-technologies", logoBg: "bg-gray-700",   logoText: "AT", bestFor: "Scheduling",           ease: 8.5, features: 9.2, quality: 9.0, price: 8.2, overall: 8.7 },
  { name: "Procore AI", href: "/ai-tools/procore-ai",        logoBg: "bg-orange-700", logoText: "PA", bestFor: "Project Management",   ease: 8.9, features: 9.0, quality: 8.8, price: 8.7, overall: 8.9 },
  { name: "Pillar", href: "/ai-tools/pillar",            logoBg: "bg-[#fbac6a]",  logoText: "PL", bestFor: "Quality Control",      ease: 8.6, features: 8.4, quality: 8.7, price: 8.8, overall: 8.5 },
];

const MAX_OVERALL = Math.max(...COMPARE_TOOLS.map((t) => t.overall));

// ─── FAQ DATA ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS = [
  {
    q: "How are these AI tools for construction tested?",
    a: "Our team tests each tool hands-on in real construction workflows — from site documentation to project scheduling and cost tracking. We evaluate ease of use, output quality, integration capabilities, and value for money.",
  },
  {
    q: "Which AI tool is best for small contractors?",
    a: "Procore AI and OpenSpace are the most accessible for smaller teams — both offer scalable pricing and are straightforward to deploy without a large IT team.",
  },
  {
    q: "Can these tools track project progress in real time?",
    a: "Yes. Buildots and OpenSpace specialise in real-time site monitoring, using computer vision and 360° cameras to automatically track construction progress against BIM models.",
  },
  {
    q: "Do these tools integrate with Procore or BIM software?",
    a: "Most tools on this list offer integrations with Procore, Autodesk BIM 360, or both. ALICE Technologies and Buildots have native BIM integrations for seamless workflow connectivity.",
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function BestConstructionToolsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-[#f27313] transition-colors">Home</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/best-of" className="hover:text-[#f27313] transition-colors">Best Of</Link>
            <svg className="w-3 h-3 text-gray-300 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-[#1E293B] font-medium">Best AI Tools for Construction Teams</span>
          </nav>
        </div>
      </div>

      {/* ── SECTION 1: Hero ── */}
      <section className="pt-14 pb-12 sm:pt-20 sm:pb-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#fef0e3] rounded-full blur-3xl opacity-50 -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-50 rounded-full blur-3xl opacity-50 -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left — text */}
            <div>
              <div className="mb-5">
                <span className="inline-block bg-[#fef0e3] text-[#f27313] text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full">
                  Best of Construction
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#1E293B] leading-tight mb-5">
                The Best AI Tools for{" "}
                <br className="hidden sm:block" />
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, #f27313 0%, #fbac6a 100%)" }}
                >
                  Construction Teams
                </span>
              </h1>

              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
                We tested and ranked the top AI tools that help construction teams plan projects, monitor progress, and reduce costs.
              </p>

              {/* Stats row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-200 rounded-xl overflow-hidden divide-x divide-y sm:divide-y-0 divide-gray-200 mb-6">
                <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center">
                  <Wrench size={15} className="text-[#f27313]" />
                  <span className="text-lg font-bold text-[#1E293B] leading-none">15</span>
                  <span className="text-xs text-gray-500">Tools Tested</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center">
                  <Clock size={15} className="text-[#f27313]" />
                  <span className="text-lg font-bold text-[#1E293B] leading-none">80+</span>
                  <span className="text-xs text-gray-500">Hours of Research</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center">
                  <span className="text-lg font-bold text-[#1E293B] leading-none">6</span>
                  <span className="text-xs text-gray-500">Key Criteria</span>
                </div>
                <div className="flex flex-col items-center justify-center gap-1 px-4 py-3 text-center">
                  <span className="text-xs text-gray-400">Last updated</span>
                  <span className="text-sm font-medium text-gray-600">Jun 4, 2026</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#top-picks"
                  className="inline-flex items-center gap-2 bg-[#f27313] hover:bg-[#cf5e0a] text-white font-semibold px-6 py-3 rounded-lg transition-colors text-sm shadow-sm"
                >
                  See Top Picks →
                </a>
                <a
                  href="#compare"
                  className="inline-flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-colors text-sm"
                >
                  Compare Tools →
                </a>
              </div>
            </div>

            {/* Right — image + overlays */}
            <div className="relative hidden lg:block">
              <div className="relative bg-gray-200 rounded-2xl aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1512207736890-6ffed8a84e8d?fm=jpg&q=80&w=1200"
                  alt="Selective color photo of a man atop a gray building"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Overlay card 1 — Plan Smarter */}
              <div className="absolute -left-5 top-6 bg-white rounded-xl shadow-lg border border-gray-100 p-3 max-w-[210px]">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={16} className="text-[#f27313] shrink-0" />
                  <p className="font-semibold text-sm text-[#1E293B]">Plan Smarter</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Schedule, budget, and track projects in real time.
                </p>
              </div>

              {/* Overlay card 2 — Reduce Costs */}
              <div className="absolute -right-5 bottom-6 bg-white rounded-xl shadow-lg border border-gray-100 p-3 max-w-[210px]">
                <div className="flex items-center gap-2 mb-1">
                  <Star size={16} className="text-amber-400 fill-amber-400 shrink-0" />
                  <p className="font-semibold text-sm text-[#1E293B]">Reduce Costs</p>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Spot delays and risks before they become expensive.
                </p>
              </div>

              {/* Badge tròn — Expert Ranked */}
              <div className="absolute -right-4 top-5 bg-[#f27313] rounded-full p-3 flex flex-col items-center justify-center w-16 h-16 shadow-lg">
                <Trophy size={18} className="text-white" />
                <p className="text-white text-[9px] font-semibold leading-tight mt-0.5 text-center">Expert Ranked</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: Who is this for? ── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#fef0e3] rounded-2xl p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold text-[#f27313]">Who is this for?</h2>
              <p className="text-sm text-gray-600 mt-1">
                These rankings are for construction professionals who want to work smarter with AI.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {[
                { icon: ClipboardList, title: "Project Managers",    desc: "Track progress and manage timelines faster." },
                { icon: Building,      title: "Construction Firms",  desc: "Standardize workflows and scale projects." },
                { icon: HardHat,       title: "Site Supervisors",    desc: "Monitor quality and safety on-site with AI." },
                { icon: Briefcase,     title: "General Contractors", desc: "Win more bids and increase profitability." },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="flex flex-col items-center text-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                      <Icon size={20} className="text-[#f27313]" />
                    </div>
                    <p className="font-semibold text-sm text-[#1E293B]">{item.title}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: Top Picks for Construction Teams ── */}
      <section id="top-picks" className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Top Picks for Construction Teams
            </h2>
            <Link
              href="/ai-tools"
              className="hidden sm:inline-flex text-[#f27313] font-medium text-sm hover:underline"
            >
              View all tools →
            </Link>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {TOP_PICKS.map((tool) => (
              <div key={tool.name} className="border border-gray-100 rounded-xl p-3 sm:p-4 bg-white relative flex flex-col h-full items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <span className={`absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${RANK_BADGE[tool.rank]}`}>
                  {tool.rank}
                </span>

                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${tool.logoBg} flex items-center justify-center mt-5 shrink-0`}>
                  <span className="text-white text-sm font-bold">{tool.logoText}</span>
                </div>

                <p className="font-semibold text-sm text-[#1E293B] mt-2">{tool.name}</p>

                <div className="flex items-center justify-center gap-1 mt-1">
                  <Star size={12} className="text-amber-400 fill-amber-400 shrink-0" />
                  <span className="text-[10px] sm:text-xs font-medium text-[#1E293B]">{tool.rating}</span>
                  <span className="text-[10px] sm:text-xs text-gray-400">Editorial Rating</span>
                </div>

                <p className="text-[10px] sm:text-xs text-[#f27313] font-medium mt-1">{tool.bestFor}</p>

                <p className="text-[11px] sm:text-xs text-gray-600 mt-2 leading-relaxed line-clamp-3">
                  {tool.desc}
                </p>

                <div className="mt-2">
                  <span className="text-[10px] sm:text-xs font-medium text-[#1E293B]">{tool.pricingLabel}</span>
                  <span className="text-[10px] sm:text-xs text-gray-500"> · {tool.price}</span>
                </div>

                <div className="flex flex-row flex-nowrap gap-1.5 mt-auto pt-3 w-full">
                  <Link
                    href={tool.href}
                    className="flex-1 text-center bg-[#f27313] hover:bg-[#cf5e0a] text-white text-[10px] sm:text-xs font-medium px-1.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
                  >
                    Read Review →
                  </Link>
                  <a
                    href={tool.affiliateHref}
                    className="flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-700 text-[10px] sm:text-xs font-medium px-1.5 sm:px-3 py-1.5 rounded-md transition-colors whitespace-nowrap"
                  >
                    Visit Site ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: Compare Top Construction AI Tools ── */}
      <section id="compare" className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
                Compare Top Construction AI Tools
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Side-by-side comparison to help you choose the right tool.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                All Pricing <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-1.5 border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Sort by: Overall Score <ChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-gray-100 rounded-xl bg-white shadow-sm">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Tool</th>
                  <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Best For</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Ease of Use</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Features</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Quality</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Price</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Overall Score</th>
                  <th className="text-center text-xs uppercase text-gray-500 font-medium py-3 px-4">Learn More</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_TOOLS.map((tool) => {
                  const isWinner = tool.overall === MAX_OVERALL;
                  return (
                    <tr key={tool.name} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-8 h-8 rounded-lg ${tool.logoBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {tool.logoText}
                          </span>
                          <span className="font-medium text-[#1E293B] whitespace-nowrap">{tool.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-gray-600 whitespace-nowrap">{tool.bestFor}</td>
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.ease}</td>
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.features}</td>
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.quality}</td>
                      <td className="py-3 px-4 text-center font-medium text-gray-700">{tool.price}</td>
                      <td className="py-3 px-4 text-center">
                        <span className={`inline-flex items-center gap-1.5 font-bold ${isWinner ? "text-[#f27313]" : "text-[#1E293B]"}`}>
                          {isWinner && <Trophy size={14} className="text-amber-400 fill-amber-400 shrink-0" />}
                          <span className={isWinner ? "bg-[#fef0e3] px-2 py-0.5 rounded-md" : ""}>{tool.overall}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <Link
                          href={tool.href}
                          className="text-[#f27313] text-sm font-medium hover:underline whitespace-nowrap"
                        >
                          Read Review →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── SECTION 5: Best AI Tools by Use Case ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              Best AI Tools by Use Case
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Find the perfect AI tool for your specific construction needs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
            {[
              { label: "Best for Site Monitoring",    labelClass: "text-[#f27313]",  logoBg: "bg-[#f27313]",  logoText: "BD", name: "Buildots",          desc: "Automated progress tracking from site cameras.",      href: "/ai-tools/buildots",
    affiliateHref: "#" },
              { label: "Best for Scheduling",          labelClass: "text-blue-600",   logoBg: "bg-gray-700",   logoText: "AT", name: "ALICE Technologies", desc: "AI-generated construction schedules in minutes.",      href: "/ai-tools/alice-technologies",
    affiliateHref: "#" },
              { label: "Best for Quality Control",     labelClass: "text-purple-600", logoBg: "bg-[#fbac6a]",  logoText: "PL", name: "Pillar",             desc: "AI-powered quality and safety inspections.",          href: "/ai-tools/pillar",
    affiliateHref: "#" },
              { label: "Best for Cost Estimation",     labelClass: "text-red-500",    logoBg: "bg-orange-700", logoText: "PA", name: "Procore AI",         desc: "Smart cost forecasting and budget management.",        href: "/ai-tools/procore-ai",
    affiliateHref: "#" },
              { label: "Best for Safety Management",   labelClass: "text-orange-600", logoBg: "bg-gray-900",   logoText: "OS", name: "OpenSpace",          desc: "360° site capture for safety and compliance.",         href: "/ai-tools/openspace",
    affiliateHref: "#" },
              { label: "Best for Progress Tracking",   labelClass: "text-indigo-600", logoBg: "bg-[#f27313]",  logoText: "BD", name: "Buildots",           desc: "Real-time progress vs. BIM model comparison.",        href: "/ai-tools/buildots",
    affiliateHref: "#" },
            ].map((card) => (
              <div key={card.label} className="border border-gray-100 rounded-xl p-4 bg-white text-center flex flex-col items-center hover:shadow-md transition-shadow">
                <p className={`text-xs font-semibold leading-snug ${card.labelClass}`}>{card.label}</p>
                <div className={`w-10 h-10 rounded-lg ${card.logoBg} flex items-center justify-center mt-2 shrink-0`}>
                  <span className="text-white text-xs font-bold">{card.logoText}</span>
                </div>
                <p className="font-semibold text-sm text-[#1E293B] mt-2">{card.name}</p>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed line-clamp-2 flex-1">{card.desc}</p>
                <Link href={card.href} className="text-xs text-[#f27313] font-medium mt-2 hover:underline inline-block">
                  See why →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 6: How We Choose the Best ── */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">
              How We Choose the Best
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Our expert process ensures you get reliable recommendations.
            </p>
          </div>

          <div className="relative">
            <div className="hidden lg:block absolute top-6 left-[calc(12.5%+1.5rem)] right-[calc(12.5%+1.5rem)] border-t-2 border-dashed border-gray-200 z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                { icon: Search,        title: "1. Research",         desc: "We analyze hundreds of tools and user feedback." },
                { icon: User,          title: "2. Hands-on Testing", desc: "Our team tests each tool in real workflows." },
                { icon: ClipboardList, title: "3. Score & Evaluate", desc: "We rate tools across key criteria and use cases." },
                { icon: Award,         title: "4. Rank & Review",    desc: "We rank the best and write detailed reviews." },
              ].map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 rounded-full bg-[#fef0e3] flex items-center justify-center shrink-0">
                      <Icon size={22} className="text-[#f27313]" />
                    </div>
                    <p className="font-semibold text-sm text-[#1E293B] mt-2">{step.title}</p>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed max-w-[180px]">{step.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FAQ + Need Help Choosing ── */}
      <section className="py-14 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left — FAQ */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-4">
                Frequently Asked Questions
              </h2>
              <div className="divide-y divide-gray-200">
                {FAQ_ITEMS.map((item, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div key={idx} className="py-4">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full flex justify-between items-center text-left font-medium text-sm text-[#1E293B] hover:text-[#f27313] transition-colors gap-3"
                      >
                        <span>{item.q}</span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isOpen && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                          {item.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right — Need Help Choosing */}
            <div>
              <div className="relative bg-[#fef0e3] rounded-2xl p-6 overflow-hidden">
                <h3 className="font-bold text-lg text-[#1E293B]">Need Help Choosing?</h3>
                <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                  Not sure which tool is right for you? Our guides and workflows can help you decide.
                </p>

                <ul className="mt-4 flex flex-col gap-3">
                  {[
                    "How to Choose the Right AI Construction Tool",
                    "AI Workflow for Construction Teams",
                    "Compare All Tools",
                  ].map((label) => (
                    <li key={label}>
                      <Link
                        href="/ai-tools/automation"
                        className="flex items-center gap-1 text-sm text-[#f27313] font-medium hover:underline"
                      >
                        <ChevronRight size={14} className="shrink-0" />
                        {label} →
                      </Link>
                    </li>
                  ))}
                </ul>

                <ClipboardCheck
                  size={80}
                  className="absolute -bottom-4 -right-4 text-[#f27313] opacity-20 pointer-events-none"
                />
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
