"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { TOOL_LOGO_URLS } from "../../data/tool-logos";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    title: "Save Time",
    desc: "Automate documentation & drawings",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Reduce Costs",
    desc: "Cut rendering & revision costs",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-4-4l4 4 4-4M6 10h12" />
      </svg>
    ),
  },
  {
    title: "Win More Clients",
    desc: "Create stunning presentations fast",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <polyline strokeLinecap="round" strokeLinejoin="round" points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    title: "Stay Competitive",
    desc: "Leverage AI to design smarter",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const CHALLENGES = [
  {
    title: "Complex 3D Modeling",
    desc: "Creating accurate 3D models and BIM data is time-intensive and requires specialist skills.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    title: "Long Design Cycles",
    desc: "Iterative design revisions and approvals extend project timelines and increase costs.",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Client Revision Delays",
    desc: "Communicating design intent to clients leads to repeated revision cycles and lost time.",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    title: "Manual Documentation",
    desc: "Creating specifications, reports, and documentation manually consumes valuable design time.",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Site Coordination Issues",
    desc: "Coordinating between architects, engineers, and contractors causes delays and errors.",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    num: 1,
    title: "Concept Design",
    desc: "Generate design concepts, mood boards, and architectural sketches instantly with AI.",
    badgeColor: "bg-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-100",
    linkColor: "text-blue-600 hover:text-blue-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.93l-3.414.975.975-3.414a4 4 0 01.93-1.414z" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "BIM Modeling",
    desc: "Build intelligent BIM models faster with AI-assisted tools that automate repetitive tasks.",
    badgeColor: "bg-indigo-600",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    borderColor: "border-indigo-100",
    linkColor: "text-indigo-600 hover:text-indigo-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Visualization & Rendering",
    desc: "Produce photorealistic renders and immersive walkthroughs in a fraction of the time.",
    badgeColor: "bg-teal-600",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    borderColor: "border-teal-100",
    linkColor: "text-teal-600 hover:text-teal-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "Client Presentation",
    desc: "Create compelling pitch decks, reports, and interactive presentations that win approvals.",
    badgeColor: "bg-emerald-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-100",
    linkColor: "text-emerald-600 hover:text-emerald-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
];

type StepTool = { name: string; slug?: string; rating: string; initials: string; iconBg: string };

const STEP_TOOLS_DATA: { step: string; tab: string; stepNum: number; badgeColor: string; headerText: string; totalCount: number; tools: StepTool[] }[] = [
  {
    step: "Concept Design",
    tab: "Concept",
    stepNum: 1,
    badgeColor: "bg-blue-600",
    headerText: "text-blue-700",
    totalCount: 10,
    tools: [
      { name: "Midjourney", slug: "midjourney", rating: "4.8", initials: "MJ", iconBg: "bg-slate-800" },
      { name: "ArchiVinci", rating: "4.7", initials: "AV", iconBg: "bg-blue-600" },
      { name: "Archicad AI", rating: "4.6", initials: "AC", iconBg: "bg-blue-700" },
      { name: "Adobe Firefly", rating: "4.5", initials: "AF", iconBg: "bg-red-600" },
    ],
  },
  {
    step: "BIM Modeling",
    tab: "BIM",
    stepNum: 2,
    badgeColor: "bg-indigo-600",
    headerText: "text-indigo-700",
    totalCount: 8,
    tools: [
      { name: "Archicad AI", rating: "4.9", initials: "AC", iconBg: "bg-blue-700" },
      { name: "Notion AI", rating: "4.7", initials: "N", iconBg: "bg-gray-900" },
      { name: "Copy.ai", rating: "4.6", initials: "C", iconBg: "bg-blue-600" },
      { name: "Pixelcut", rating: "4.5", initials: "PX", iconBg: "bg-indigo-600" },
    ],
  },
  {
    step: "Visualization",
    tab: "Render",
    stepNum: 3,
    badgeColor: "bg-teal-600",
    headerText: "text-teal-700",
    totalCount: 10,
    tools: [
      { name: "D5 Render", slug: "d5-render", rating: "4.9", initials: "D5", iconBg: "bg-purple-600" },
      { name: "Twinmotion AI", rating: "4.8", initials: "TM", iconBg: "bg-blue-500" },
      { name: "Veras", rating: "4.7", initials: "V", iconBg: "bg-teal-500" },
      { name: "Adobe Firefly", rating: "4.6", initials: "AF", iconBg: "bg-red-600" },
    ],
  },
  {
    step: "Client Presentation",
    tab: "Presentation",
    stepNum: 4,
    badgeColor: "bg-emerald-500",
    headerText: "text-emerald-700",
    totalCount: 9,
    tools: [
      { name: "Canva AI", rating: "4.9", initials: "CA", iconBg: "bg-[#0CC0DF]" },
      { name: "Notion AI", rating: "4.8", initials: "N", iconBg: "bg-gray-900" },
      { name: "Copy.ai", rating: "4.7", initials: "C", iconBg: "bg-blue-600" },
      { name: "ManyChat", rating: "4.5", initials: "MC", iconBg: "bg-blue-500" },
    ],
  },
];

const TABS = ["All Steps", "Concept", "BIM", "Render", "Presentation"];

// ─── STAR RATING ──────────────────────────────────────────────────────────────

function Stars({ rating }: { rating: string }) {
  const val = parseFloat(rating);
  return (
    <span className="text-amber-400 text-xs">
      {"★".repeat(Math.floor(val))}
      {val % 1 >= 0.5 ? "½" : ""}
    </span>
  );
}

// ─── TOP TOOLS DATA ───────────────────────────────────────────────────────────

const USE_CASES = [
  { label: "Concept Design", count: 22 },
  { label: "BIM Modeling", count: 18 },
  { label: "3D Rendering", count: 28 },
  { label: "Visualization", count: 26 },
  { label: "Client Presentation", count: 20 },
  { label: "Site Analysis", count: 14 },
  { label: "Documentation", count: 16 },
  { label: "Project Management", count: 24 },
];

const PRICING_TYPES = [
  { label: "Free", count: 12 },
  { label: "Freemium", count: 28 },
  { label: "Paid", count: 60 },
];

const BEST_FOR_FILTERS = [
  { label: "Architects", count: 35 },
  { label: "Interior Designers", count: 22 },
  { label: "Urban Planners", count: 18 },
  { label: "Construction Managers", count: 15 },
  { label: "Students", count: 20 },
];

const INTEGRATIONS_FILTERS = [
  { label: "Revit", count: 22 },
  { label: "AutoCAD", count: 30 },
  { label: "SketchUp", count: 26 },
  { label: "Adobe CC", count: 28 },
  { label: "Rhino", count: 18 },
  { label: "Others", count: 16 },
];

const TOP_TOOLS = [
  {
    rank: 1,
    name: "Insightful",
    featured: true,
    reviewHref: "/tools/insightful",
    affiliateHref: "https://www.insightful.io/?red=smartaa4fdcb&utm_source=reditus&utm_medium=affiliate&utm_campaign=smartaa4fdcb",
    price: "Contact for pricing",
    rating: "4.8",
    desc: "Insightful is an advanced employee monitoring and time tracking software suited for architecture, construction, and real estate teams looking to optimize productivity and track billable hours.",
    bestFor: "Architecture firms tracking time spent on CAD and design phases",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "I",
    iconBg: "bg-blue-700",
    iconText: "text-white",
  },
  {
    rank: 2,
    name: "D5 Render",
    featured: false,
    reviewHref: "/tools/d5-render",
    affiliateHref: "https://myspace.d5render.com/subscribe/year/?aff=lepham",
    price: "Free version available / Pro from $38/month",
    rating: "4.7",
    desc: "D5 Render is a real-time ray tracing renderer used by 80% architecture professionals, cutting rendering time from 12-18 hours (V-Ray) to 1-2 hours with higher quality results. It integrates natively with SketchUp, Revit, Rhino, ARCHICAD, and Blender via live-sync — with a free version and Pro from $38/month.",
    bestFor: "Architecture firms producing client presentations and design approvals",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "D5",
    iconBg: "bg-purple-600",
    iconText: "text-white",
  },
  {
    rank: 3,
    name: "Midjourney",
    featured: false,
    reviewHref: "/tools/midjourney",
    affiliateHref: "https://midjourney.com",
    price: "From $10/month",
    rating: "4.6",
    desc: "Midjourney remains the gold standard for AI image generation in 2026, delivering photorealistic renders and concept visuals that architecture, interior design, construction, and real estate professionals can use directly in client workflows.",
    bestFor: "Interior designers creating mood boards and concept visuals",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "M",
    iconBg: "bg-slate-800",
    iconText: "text-white",
  },
  {
    rank: 4,
    name: "CustomGPT.ai",
    featured: false,
    reviewHref: "/tools/customgpt-ai",
    affiliateHref: "https://customgpt.ai/?fpr=smartaiforwork",
    price: "Contact for pricing",
    rating: "4.5",
    desc: "CustomGPT.ai is best suited for architecture, construction, and real estate firms that want a no-code way to build a custom AI chatbot trained on their own documents, websites, and project data.",
    bestFor: "Architecture firms answering client questions from project documentation",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "CA",
    iconBg: "bg-teal-500",
    iconText: "text-white",
  },
  {
    rank: 5,
    name: "Jasper AI",
    featured: false,
    reviewHref: "/tools/jasper-ai",
    affiliateHref: "https://www.jasper.ai",
    price: "From $39/month",
    rating: "4.5",
    desc: "Jasper is one of the best AI writing tools for marketing teams and agencies in 2026 — offering brand voice training, 50+ templates, and team collaboration features that help content creators produce high-quality copy at scale.",
    bestFor: "Marketing teams that need content at scale",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "JA",
    iconBg: "bg-orange-600",
    iconText: "text-white",
  },
  {
    rank: 6,
    name: "Buzz.ai",
    featured: false,
    reviewHref: "/tools/buzz-ai",
    affiliateHref: "https://buzz.ai/?red=smartaa4fdcb",
    price: "Contact for pricing",
    rating: "4.4",
    desc: "Buzz.ai is best suited for office professionals and client-facing teams in architecture, construction, interior design, and real estate who want to automate prospecting and outreach without juggling multiple sales tools.",
    bestFor: "Architecture firms generating and nurturing project leads",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "BA",
    iconBg: "bg-emerald-600",
    iconText: "text-white",
  },
  {
    rank: 7,
    name: "Planner 5D",
    featured: false,
    reviewHref: "/tools/planner-5d",
    affiliateHref: "https://go.planner5d.com/click?pid=2472&offer_id=43&sub1=yourclickid&sub2=your_sub_pub_id&sub3=any_side_info",
    price: "Free plan available / Premium from $4.99/month",
    rating: "4.4",
    desc: "Planner 5D is an AI-powered floor plan and interior design platform used by 120+ million users worldwide. It converts uploaded images or text prompts into 2D/3D floor plans instantly, with 8,000+ furniture items, 4K rendering, and VR walkthroughs — from a free plan to professional and enterprise white-label tiers.",
    bestFor: "Interior designers creating client concept visuals and mood boards",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "P5",
    iconBg: "bg-rose-600",
    iconText: "text-white",
  },
  {
    rank: 8,
    name: "SearchAtlas",
    featured: false,
    reviewHref: "/tools/searchatlas",
    affiliateHref: "https://searchatlas.com/?red=smartaa4fdcb",
    price: "From $99/month",
    rating: "4.4",
    desc: "SearchAtlas is an all-in-one AI SEO platform combining keyword research, content optimization, backlink analysis, and OTTO — an AI automation engine that implements SEO fixes automatically instead of just flagging them. Used by 50,000+ marketers and agencies.",
    bestFor: "Digital marketing agencies managing multiple client sites",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "S",
    iconBg: "bg-indigo-600",
    iconText: "text-white",
  },
];

// Filter metadata per tool (keyed by name) — drives the left-column filters
// without changing how the cards render.
const TOOL_FILTER_META: Record<
  string,
  { useCases: string[]; bestForTags: string[]; integrationTags: string[] }
> = {
  "Insightful":    { useCases: ["Project Management", "Documentation"],                              bestForTags: ["Architects", "Construction Managers"],       integrationTags: ["Others"] },
  "D5 Render":     { useCases: ["3D Rendering", "Visualization", "BIM Modeling", "Client Presentation", "Concept Design"], bestForTags: ["Architects", "Interior Designers", "Students"], integrationTags: ["Revit", "SketchUp", "Rhino"] },
  "Midjourney":    { useCases: ["Concept Design", "Visualization", "Client Presentation"],            bestForTags: ["Interior Designers", "Architects", "Students"], integrationTags: ["Adobe CC"] },
  "CustomGPT.ai":  { useCases: ["Documentation", "Project Management"],                              bestForTags: ["Architects", "Construction Managers"],       integrationTags: ["Others"] },
  "Jasper AI":     { useCases: ["Documentation", "Client Presentation"],                            bestForTags: ["Architects", "Students"],                    integrationTags: ["Adobe CC", "Others"] },
  "Buzz.ai":       { useCases: ["Project Management", "Client Presentation"],                        bestForTags: ["Architects", "Construction Managers"],       integrationTags: ["Others"] },
  "Planner 5D":    { useCases: ["Concept Design", "3D Rendering", "Visualization", "Client Presentation", "Documentation"], bestForTags: ["Interior Designers", "Architects", "Students"], integrationTags: ["Others"] },
  "SearchAtlas":   { useCases: ["Documentation", "Project Management"],                              bestForTags: ["Architects"],                                integrationTags: ["Others"] },
};

// Derive the pricing tier / monthly price from the free-text price string.
function pricingTypeOf(price: string): "Free" | "Freemium" | "Paid" {
  const p = price.toLowerCase();
  if (p.includes("free")) return /\$|month|premium|pro/.test(p) ? "Freemium" : "Free";
  return "Paid";
}
function priceValueOf(price: string): number | null {
  const m = price.match(/\$\s*(\d+(?:\.\d+)?)/);
  return m ? Math.round(Number(m[1])) : null;
}

// ─── REAL RESULTS DATA ────────────────────────────────────────────────────────

const CASE_STUDIES = [
  {
    stat: "-60%",
    label: "Reduction in Concept Design Time",
    company: "Design Forward Studio",
    type: "Architecture Firm",
    desc: "AI-powered design workflow cut concept time by 60%, winning 3 major projects.",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=300&q=80",
  },
  {
    stat: "+45%",
    label: "Client Approval Rate",
    company: "Bloc Architecture",
    type: "Boutique Design Firm",
    desc: "Photorealistic renders via AI helped clients visualize projects and approve faster.",
    img: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=300&q=80",
  },
  {
    stat: "+3X",
    label: "Renders per Week",
    company: "Vertex Design Group",
    type: "Architecture & Planning",
    desc: "AI rendering tools tripled output capacity without adding headcount.",
    img: "https://images.unsplash.com/photo-1542621334-a254cf47733d?w=300&q=80",
  },
];

// ─── BEST OF DATA ─────────────────────────────────────────────────────────────

const BEST_OF_LISTS = [
  {
    title: "Best AI Tools for Architecture",
    count: 12,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21h18M12 3L4 8.5h16L12 3z" />
        <line x1="6.5" y1="8.5" x2="6.5" y2="21" />
        <line x1="17.5" y1="8.5" x2="17.5" y2="21" />
      </svg>
    ),
  },
  {
    title: "Best AI Rendering Tools for Architects",
    count: 10,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    title: "Best AI Tools for BIM",
    count: 9,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    title: "Best AI Presentation Tools",
    count: 11,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
      </svg>
    ),
  },
  {
    title: "Best AI Tools for Small Firms",
    count: 10,
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

// ─── FILTER HELPER ────────────────────────────────────────────────────────────

function CheckGroup({
  title,
  items,
  checked,
  onToggle,
  dotColor,
}: {
  title: string;
  items: { label: string; count: number }[];
  checked: string[];
  onToggle: (label: string) => void;
  dotColor?: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        {dotColor && <span className={`w-2 h-2 rounded-full ${dotColor} shrink-0`} />}
        <p className="text-xs font-bold text-[#1E293B] uppercase tracking-wide">{title}</p>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <label key={item.label} className="flex items-center justify-between gap-2 cursor-pointer group">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={checked.includes(item.label)}
                onChange={() => onToggle(item.label)}
                className="w-3.5 h-3.5 rounded border-gray-300 accent-blue-600 cursor-pointer"
              />
              <span className="text-xs text-gray-600 group-hover:text-[#1E293B] transition-colors">{item.label}</span>
            </div>
            <span className="text-[10px] text-gray-400">{item.count}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// ─── SECTIONS ─────────────────────────────────────────────────────────────────

function BreadcrumbSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
      <nav className="flex items-center gap-1.5 text-xs text-gray-400">
        <Link href="/" className="hover:text-[#F97316] transition-colors">Home</Link>
        <span>›</span>
        <Link href="/industries" className="hover:text-[#F97316] transition-colors">Industries</Link>
        <span>›</span>
        <span className="text-[#1E293B] font-medium">Architecture</span>
      </nav>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-white py-10 sm:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          {/* Left */}
          <div className="flex-1 min-w-0">
            <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-5">
              AI for Architecture Firms
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] leading-tight mb-5">
              AI Tools for
              <br />
              <span className="text-blue-600">Architecture</span>{" "}
              <span className="text-[#F97316]">Firms</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
              From concept design and BIM modeling to rendering and client presentations, discover AI tools that help architecture firms work faster, impress clients, and win more projects.
            </p>
            {/* Benefits row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex flex-col gap-1.5">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${b.iconBg} ${b.iconColor}`}>
                    {b.icon}
                  </div>
                  <p className="text-sm font-bold text-[#1E293B]">{b.title}</p>
                  <p className="text-xs text-gray-400 leading-snug">{b.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image + floating cards + blobs */}
          <div className="flex-1 relative w-full min-h-[320px] sm:min-h-[400px]">
            {/* Gradient blobs */}
            <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-blue-300 blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute -bottom-8 right-16 w-56 h-56 rounded-full bg-teal-300 blur-3xl opacity-30 pointer-events-none" />

            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden w-full h-[300px] sm:h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80"
                alt="Architecture building"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating card — top left */}
            <div className="absolute -top-4 -left-4 sm:left-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.93l-3.414.975.975-3.414a4 4 0 01.93-1.414z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Design Faster</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">Generate concepts and renders in minutes.</p>
              </div>
            </div>

            {/* Floating card — bottom right */}
            <div className="absolute -bottom-4 -right-4 sm:right-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Win Clients</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">Impress with photorealistic presentations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ChallengesSection() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
            Common Challenges in Architecture Business
          </h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {CHALLENGES.map((c) => (
            <div key={c.title} className="bg-white rounded-2xl p-3 sm:p-5 border border-gray-100 shadow-sm">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${c.iconBg} ${c.iconColor}`}>
                {c.icon}
              </div>
              <p className="font-bold text-sm text-[#1E293B] mb-1.5">{c.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-2">
            AI-Powered Workflow for Architecture Firms
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            A step-by-step workflow to streamline your operations with AI
          </p>
        </div>

        {/* Desktop: flex row with arrows */}
        <div className="hidden lg:flex items-start gap-3">
          {STEPS.map((step, i) => (
            <React.Fragment key={step.num}>
              <div className={`flex-1 bg-white rounded-2xl p-5 border ${step.borderColor} shadow-sm`}>
                <div className={`w-8 h-8 rounded-full ${step.badgeColor} text-white text-sm font-extrabold flex items-center justify-center mb-4`}>
                  {step.num}
                </div>
                <div className={`w-11 h-11 rounded-xl ${step.iconBg} ${step.iconColor} flex items-center justify-center mb-3`}>
                  {step.icon}
                </div>
                <p className="font-bold text-sm text-[#1E293B] mb-2">{step.title}</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-4">{step.desc}</p>
                <a href="#recommended-tools" className={`text-xs font-semibold ${step.linkColor} transition-colors`}>
                  View Tools →
                </a>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flex items-center justify-center mt-14 shrink-0">
                  <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile 2-col grid */}
        <div className="lg:hidden grid grid-cols-2 gap-4">
          {STEPS.map((step) => (
            <div key={step.num} className={`bg-white rounded-2xl p-4 border ${step.borderColor} shadow-sm`}>
              <div className={`w-7 h-7 rounded-full ${step.badgeColor} text-white text-xs font-extrabold flex items-center justify-center mb-3`}>
                {step.num}
              </div>
              <div className={`w-9 h-9 rounded-xl ${step.iconBg} ${step.iconColor} flex items-center justify-center mb-2`}>
                {step.icon}
              </div>
              <p className="font-bold text-xs text-[#1E293B] mb-1.5">{step.title}</p>
              <p className="text-[11px] text-gray-400 leading-relaxed mb-3">{step.desc}</p>
              <a href="#recommended-tools" className={`text-[11px] font-semibold ${step.linkColor}`}>
                View Tools →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecommendedToolsSection({
  onSelectUseCase,
}: {
  onSelectUseCase: (useCase: string) => void;
}) {
  const [activeTab, setActiveTab] = useState("All Steps");

  const visibleSteps =
    activeTab === "All Steps"
      ? STEP_TOOLS_DATA
      : STEP_TOOLS_DATA.filter((s) => s.tab === activeTab);

  return (
    <section id="recommended-tools" className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-1">
              Recommended AI Tools for Each Step
            </h2>
            <p className="text-gray-400 text-sm">Handpicked tools to help you at every stage</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors border ${
                  activeTab === tab
                    ? "bg-[#1E293B] text-white border-[#1E293B]"
                    : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className={`grid gap-3 sm:gap-4 ${visibleSteps.length === 1 ? "grid-cols-1 max-w-sm" : "grid-cols-2 lg:grid-cols-4"}`}>
          {visibleSteps.map((stepData) => (
            <div key={stepData.step} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100">
                <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${stepData.badgeColor} text-white text-[10px] sm:text-xs font-extrabold flex items-center justify-center shrink-0`}>
                  {stepData.stepNum}
                </span>
                <p className={`text-xs sm:text-sm font-bold ${stepData.headerText} truncate`}>{stepData.step}</p>
              </div>
              <div className="divide-y divide-gray-50">
                {stepData.tools.map((tool) => {
                  const logoUrl = tool.slug ? TOOL_LOGO_URLS[tool.slug] : undefined;
                  return (
                  <div key={tool.name} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg overflow-hidden ${logoUrl ? "bg-white border border-gray-100 p-0.5" : tool.iconBg} flex items-center justify-center text-white text-[9px] sm:text-[10px] font-black shrink-0`}>
                      {logoUrl ? (
                        <Image src={logoUrl} alt={tool.name} width={32} height={32} className="object-contain w-full h-full" />
                      ) : (
                        tool.initials
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-[#1E293B] truncate">{tool.name}</p>
                      <div className="flex items-center gap-1">
                        <Stars rating={tool.rating} />
                        <span className="text-[10px] sm:text-xs font-semibold text-[#1E293B]">{tool.rating}</span>
                        
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => onSelectUseCase(stepData.step)}
                  className={`text-[10px] sm:text-xs font-semibold ${stepData.headerText} hover:opacity-80 transition-opacity`}
                >
                  View all {stepData.totalCount} tools →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopToolsSection({
  useCases,
  setUseCases,
}: {
  useCases: string[];
  setUseCases: (v: string[]) => void;
}) {
  const [pricingTypes, setPricingTypes] = useState<string[]>([]);
  const [bestForFilters, setBestForFilters] = useState<string[]>([]);
  const [integrations, setIntegrations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState(500);
  const [sortBy, setSortBy] = useState("Featured");

  function toggle(list: string[], setList: (v: string[]) => void, label: string) {
    setList(list.includes(label) ? list.filter((x) => x !== label) : [...list, label]);
  }

  function resetAll() {
    setUseCases([]);
    setPricingTypes([]);
    setBestForFilters([]);
    setIntegrations([]);
    setPriceRange(500);
  }

  // Apply the left-column filters.
  let visibleTools = TOP_TOOLS.filter((tool) => {
    const meta = TOOL_FILTER_META[tool.name] ?? {
      useCases: [],
      bestForTags: [],
      integrationTags: [],
    };
    if (useCases.length && !useCases.some((u) => meta.useCases.includes(u))) return false;
    if (pricingTypes.length && !pricingTypes.includes(pricingTypeOf(tool.price))) return false;
    if (bestForFilters.length && !bestForFilters.some((b) => meta.bestForTags.includes(b))) return false;
    if (integrations.length && !integrations.some((i) => meta.integrationTags.includes(i))) return false;
    const pv = priceValueOf(tool.price);
    if (pv !== null && pv > priceRange) return false; // "Contact for pricing" always passes
    return true;
  });

  // Apply sorting.
  if (sortBy === "Highest Rated" || sortBy === "Most Reviews") {
    visibleTools = [...visibleTools].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  } else if (sortBy === "Lowest Price") {
    visibleTools = [...visibleTools].sort(
      (a, b) => (priceValueOf(a.price) ?? Infinity) - (priceValueOf(b.price) ?? Infinity),
    );
  }

  return (
    <section id="top-tools" className="scroll-mt-24 py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
              Top Tools for Architecture Firms
            </h2>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1E293B] pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600/30 cursor-pointer"
              >
                <option>Featured</option>
                <option>Highest Rated</option>
                <option>Most Reviews</option>
                <option>Lowest Price</option>
              </select>
              <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm lg:sticky lg:top-24 space-y-6">
              <CheckGroup title="Use Case" items={USE_CASES} checked={useCases} onToggle={(l) => toggle(useCases, setUseCases, l)} dotColor="bg-blue-400" />
              <div className="border-t border-gray-100" />
              <CheckGroup title="Pricing" items={PRICING_TYPES} checked={pricingTypes} onToggle={(l) => toggle(pricingTypes, setPricingTypes, l)} />
              <div className="border-t border-gray-100" />
              <CheckGroup title="Best For" items={BEST_FOR_FILTERS} checked={bestForFilters} onToggle={(l) => toggle(bestForFilters, setBestForFilters, l)} />
              <div className="border-t border-gray-100" />
              <div>
                <p className="text-xs font-bold text-[#1E293B] uppercase tracking-wide mb-3">Pricing Range</p>
                <input
                  type="range"
                  min={0}
                  max={500}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                  <span>$0</span>
                  <span>${priceRange === 500 ? "500+" : priceRange}/month</span>
                </div>
              </div>
              <div className="border-t border-gray-100" />
              <CheckGroup title="Integrations" items={INTEGRATIONS_FILTERS} checked={integrations} onToggle={(l) => toggle(integrations, setIntegrations, l)} />
              <div className="border-t border-gray-100" />
              <button onClick={resetAll} className="w-full py-2 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors">
                Reset Filters
              </button>
            </div>
          </div>

          {/* Tool list — 2 columns on desktop, single column on mobile */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {visibleTools.length === 0 && (
              <div className="lg:col-span-2 text-center py-12 text-sm text-gray-400 border border-dashed border-gray-200 rounded-2xl">
                No tools match your filters. Try adjusting them.
              </div>
            )}
            {visibleTools.map((tool) => (
              <div key={tool.name} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${tool.rank === 1 ? "bg-amber-400 text-white" : tool.rank === 2 ? "bg-gray-400 text-white" : "bg-gray-200 text-gray-700"}`}>
                    {tool.rank}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Pricing</p>
                    <p className="text-sm font-bold text-[#1E293B]">{tool.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-12 h-12 rounded-xl overflow-hidden ${TOOL_LOGO_URLS[tool.reviewHref.replace("/tools/", "")] ? "bg-white border border-gray-100 p-1.5" : tool.iconBg} flex items-center justify-center text-sm font-black ${tool.iconText} shrink-0`}>
                    {TOOL_LOGO_URLS[tool.reviewHref.replace("/tools/", "")] ? (
                      <Image src={TOOL_LOGO_URLS[tool.reviewHref.replace("/tools/", "")]} alt={tool.name} width={48} height={48} className="object-contain w-full h-full" />
                    ) : (
                      tool.initials
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-base text-[#1E293B] leading-tight">{tool.name}</p>
                    {tool.featured && (
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded-full inline-block mt-0.5">Featured</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-amber-400 text-sm">{"★".repeat(Math.floor(parseFloat(tool.rating)))}</span>
                  <span className="text-sm font-semibold text-[#1E293B]">{tool.rating}</span>
                  <span className="text-xs text-gray-400">Editorial Rating</span>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-2 line-clamp-3">{tool.desc}</p>
                <div className="text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-[#1E293B]">Best For </span>{tool.bestFor}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-gray-400 font-semibold">Integrations</span>
                  <div className="flex gap-1">
                    {tool.integrations.map((intg) => (
                      <span key={intg.label} title={intg.title} className={`w-6 h-6 rounded-md ${intg.bg} text-white text-[9px] font-bold flex items-center justify-center`}>
                        {intg.label}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <a href={tool.reviewHref} className="flex-1 text-center text-xs font-semibold text-[#1E293B] border border-gray-300 rounded-lg px-3 py-2 hover:border-[#1E293B] transition-colors whitespace-nowrap">
                    Read Review →
                  </a>
                  <a href={tool.affiliateHref} className="flex-1 text-center text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-3 py-2 transition-colors whitespace-nowrap">
                    Visit Website →
                  </a>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer mt-2">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-blue-600 cursor-pointer" />
                  <span className="text-[11px] text-gray-400 hover:text-gray-600 transition-colors">Add to Compare</span>
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RealResultsSection() {
  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-1">
              Real Results from Architecture Firms
            </h2>
            <p className="text-gray-400 text-sm">See how firms use AI to grow</p>
          </div>
          <a href="#" className="text-sm font-semibold text-[#F97316] hover:text-orange-600 transition-colors shrink-0">
            View all case studies →
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {CASE_STUDIES.map((cs) => (
            <div key={cs.company} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative w-full h-[140px]">
                <Image src={cs.img} alt={cs.company} fill className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-3xl font-extrabold text-[#F97316] mb-0.5">{cs.stat}</p>
                <p className="text-xs text-gray-400 mb-3">{cs.label}</p>
                <p className="font-bold text-sm text-[#1E293B] mb-0.5">{cs.company}</p>
                <p className="text-xs text-gray-400 mb-3">{cs.type}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{cs.desc}</p>
                <a href="#" className="text-xs font-semibold text-[#F97316] hover:text-orange-600 transition-colors">
                  Read Story →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestOfSection() {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-1">
              Rest Of Architecture AI Tools
            </h2>
            <p className="text-gray-400 text-sm">Curated lists of top-performing tools</p>
          </div>
          <a href="#" className="text-sm font-semibold text-[#F97316] hover:text-orange-600 transition-colors shrink-0">
            View all Best Of lists →
          </a>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {BEST_OF_LISTS.map((item) => (
            <div key={item.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-200 transition-all cursor-pointer">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${item.iconBg} ${item.iconColor}`}>
                {item.icon}
              </div>
              <p className="font-bold text-sm text-[#1E293B] leading-snug mb-1.5">{item.title}</p>
              <p className="text-xs text-gray-400">{item.count} Tools</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function ArchitecturePage() {
  // Shared so the "Recommended Tools" step cards can pre-select a Use Case
  // filter in the "Top Tools for Architecture Firms" section.
  const [useCases, setUseCases] = useState<string[]>([]);

  function selectUseCase(useCase: string) {
    setUseCases([useCase]);
    requestAnimationFrame(() =>
      document.getElementById("top-tools")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <BreadcrumbSection />
        <HeroSection />
        <ChallengesSection />
        <WorkflowSection />
        <RecommendedToolsSection onSelectUseCase={selectUseCase} />
        <TopToolsSection useCases={useCases} setUseCases={setUseCases} />
        <RealResultsSection />
        <BestOfSection />
      </main>
      <Newsletter
        heading="Get Weekly AI Tools & Architecture Insights"
        subtitle="Join 10,000+ architects and design firms who get AI tips, workflows, and tool recommendations."
      />
      <Footer />
    </>
  );
}
