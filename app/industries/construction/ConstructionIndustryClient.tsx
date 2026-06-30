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
    desc: "Automate reports & documentation",
    iconBg: "bg-[#eef2f6]",
    iconColor: "text-[#6484A4]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Reduce Costs",
    desc: "Cut overruns & material waste",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-4-4l4 4 4-4M6 10h12" />
      </svg>
    ),
  },
  {
    title: "Improve Safety",
    desc: "AI-powered site hazard detection",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Stay Competitive",
    desc: "Win bids with AI-powered insights",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const CHALLENGES = [
  {
    title: "Project Delays & Cost Overruns",
    desc: "Unexpected delays and budget overruns are the leading causes of project failure.",
    iconBg: "bg-[#eef2f6]",
    iconColor: "text-[#6484A4]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: "Lack of Real-time Site Visibility",
    desc: "Without live data, managers miss critical progress updates and on-site issues.",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "Manual Documentation",
    desc: "Creating daily reports, RFIs, and compliance docs manually consumes hours every day.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "Inaccurate Progress Tracking",
    desc: "Relying on manual inspections leads to inaccurate schedules and reactive decisions.",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <polyline strokeLinecap="round" strokeLinejoin="round" points="23 18 13.5 8.5 8.5 13.5 1 6" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="17 18 23 18 23 12" />
      </svg>
    ),
  },
  {
    title: "Safety & Compliance Issues",
    desc: "Managing safety protocols and regulatory compliance across large sites is complex.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    num: 1,
    title: "Project Planning",
    desc: "Use AI to generate project schedules, cost estimates, and resource plans in minutes.",
    badgeColor: "bg-[#6484A4]",
    iconBg: "bg-[#eef2f6]",
    iconColor: "text-[#6484A4]",
    borderColor: "border-[#eef2f6]",
    linkColor: "text-[#6484A4] hover:text-[#6484A4]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "Site Monitoring",
    desc: "AI-powered cameras and sensors provide real-time visibility into every corner of your site.",
    badgeColor: "bg-amber-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    borderColor: "border-amber-100",
    linkColor: "text-amber-600 hover:text-amber-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Progress Tracking",
    desc: "Automatically compare as-built conditions vs. plans to identify delays before they escalate.",
    badgeColor: "bg-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-100",
    linkColor: "text-blue-600 hover:text-blue-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <polyline strokeLinecap="round" strokeLinejoin="round" points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "Reporting & Documentation",
    desc: "Auto-generate daily reports, safety logs, and compliance documents with AI assistance.",
    badgeColor: "bg-emerald-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-100",
    linkColor: "text-emerald-600 hover:text-emerald-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

const STEP_TOOLS_DATA = [
  {
    step: "Project Planning",
    tab: "Planning",
    stepNum: 1,
    badgeColor: "bg-[#6484A4]",
    headerText: "text-[#6484A4]",
    totalCount: 11,
    tools: [
      { name: "Procore AI", rating: "4.8", initials: "PC", iconBg: "bg-orange-600" },
      { name: "ALICE Technologies", rating: "4.7", initials: "AT", iconBg: "bg-blue-700" },
      { name: "Notion AI", rating: "4.7", initials: "N", iconBg: "bg-gray-900" },
      { name: "Copy.ai", rating: "4.6", initials: "C", iconBg: "bg-blue-600" },
    ],
  },
  {
    step: "Site Monitoring",
    tab: "Monitoring",
    stepNum: 2,
    badgeColor: "bg-amber-500",
    headerText: "text-amber-600",
    totalCount: 9,
    tools: [
      { name: "Buildots", rating: "4.8", initials: "BD", iconBg: "bg-amber-500" },
      { name: "OpenSpace", rating: "4.7", initials: "OS", iconBg: "bg-blue-500" },
      { name: "Doxel", rating: "4.6", initials: "DX", iconBg: "bg-indigo-600" },
      { name: "PlanGrid", rating: "4.5", initials: "PG", iconBg: "bg-emerald-600" },
    ],
  },
  {
    step: "Progress Tracking",
    tab: "Tracking",
    stepNum: 3,
    badgeColor: "bg-blue-600",
    headerText: "text-blue-700",
    totalCount: 10,
    tools: [
      { name: "Procore AI", rating: "4.8", initials: "PC", iconBg: "bg-orange-600" },
      { name: "PlanGrid", rating: "4.7", initials: "PG", iconBg: "bg-emerald-600" },
      { name: "Fieldwire", rating: "4.6", initials: "FW", iconBg: "bg-blue-600" },
      { name: "Microsoft Copilot", rating: "4.5", initials: "MC", iconBg: "bg-blue-700" },
    ],
  },
  {
    step: "Reporting",
    tab: "Reporting",
    stepNum: 4,
    badgeColor: "bg-emerald-500",
    headerText: "text-emerald-700",
    totalCount: 8,
    tools: [
      { name: "Canva AI", rating: "4.9", initials: "CA", iconBg: "bg-[#0CC0DF]" },
      { name: "Notion AI", rating: "4.8", initials: "N", iconBg: "bg-gray-900" },
      { name: "Jasper", rating: "4.7", initials: "J", iconBg: "bg-orange-500" },
      { name: "Copy.ai", rating: "4.6", initials: "C", iconBg: "bg-blue-600" },
    ],
  },
];

const TABS = ["All Steps", "Planning", "Monitoring", "Tracking", "Reporting"];

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
  { label: "Project Planning", count: 24 },
  { label: "Site Monitoring", count: 18 },
  { label: "Progress Tracking", count: 22 },
  { label: "Safety & Compliance", count: 16 },
  { label: "Cost Estimation", count: 20 },
  { label: "Documentation", count: 19 },
  { label: "BIM & Modeling", count: 14 },
];

const PRICING_TYPES = [
  { label: "Free", count: 8 },
  { label: "Freemium", count: 22 },
  { label: "Paid", count: 70 },
];

const BEST_FOR_FILTERS = [
  { label: "General Contractors", count: 30 },
  { label: "Project Managers", count: 28 },
  { label: "Site Engineers", count: 20 },
  { label: "Safety Officers", count: 16 },
  { label: "Subcontractors", count: 18 },
];

const INTEGRATIONS_FILTERS = [
  { label: "Procore", count: 28 },
  { label: "AutoCAD", count: 30 },
  { label: "Revit", count: 22 },
  { label: "Trimble", count: 18 },
  { label: "BIM 360", count: 24 },
  { label: "Others", count: 20 },
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
    name: "Joiin",
    featured: false,
    reviewHref: "/tools/joiin",
    affiliateHref: "https://joiin.co/?red=smartaa4fdcb&utm_source=smartaa4fdcb&utm_medium=revshare&utm_affiliate_network=reditus",
    price: "From $23/month",
    rating: "4.6",
    desc: "Joiin is an AI-powered financial reporting and consolidation platform that connects Xero, QuickBooks, Sage, and spreadsheets to deliver real-time consolidated group accounts, multi-currency reporting, and board-ready packs — starting from $23/month with unlimited users.",
    bestFor: "Multi-entity architecture or construction group companies",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "J",
    iconBg: "bg-slate-800",
    iconText: "text-white",
  },
  {
    rank: 4,
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
    iconBg: "bg-teal-500",
    iconText: "text-white",
  },
  {
    rank: 5,
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
    iconBg: "bg-orange-600",
    iconText: "text-white",
  },
  {
    rank: 6,
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
    iconBg: "bg-emerald-600",
    iconText: "text-white",
  },
  {
    rank: 7,
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

// Filter metadata per tool (keyed by name) — drives the left-column filters.
const TOOL_FILTER_META: Record<
  string,
  { useCases: string[]; bestForTags: string[]; integrationTags: string[] }
> = {
  "Insightful": { useCases: ["Project Planning","Progress Tracking","Documentation"], bestForTags: ["Project Managers","General Contractors"], integrationTags: ["Others"] },
  "D5 Render": { useCases: ["BIM & Modeling","Documentation"], bestForTags: ["Project Managers","Site Engineers"], integrationTags: ["Revit","AutoCAD","Others"] },
  "Joiin": { useCases: ["Cost Estimation","Documentation"], bestForTags: ["Project Managers","General Contractors"], integrationTags: ["Others"] },
  "Midjourney": { useCases: ["Documentation"], bestForTags: ["Project Managers"], integrationTags: ["Others"] },
  "CustomGPT.ai": { useCases: ["Documentation","Safety & Compliance"], bestForTags: ["Project Managers","Safety Officers"], integrationTags: ["Others"] },
  "Jasper AI": { useCases: ["Documentation"], bestForTags: ["Project Managers"], integrationTags: ["Others"] },
  "Buzz.ai": { useCases: ["Project Planning","Documentation"], bestForTags: ["General Contractors","Subcontractors"], integrationTags: ["Others"] },
  "SearchAtlas": { useCases: ["Documentation"], bestForTags: ["General Contractors"], integrationTags: ["Others"] },
};

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
    stat: "-20%",
    label: "Decrease in Project Delays",
    company: "BuildWell Construction",
    type: "General Contractor",
    desc: "AI progress tracking caught schedule drift early, saving weeks on a $15M project.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&q=80",
  },
  {
    stat: "+35%",
    label: "Safety Compliance Rate",
    company: "SkyBuild Group",
    type: "Commercial Builder",
    desc: "AI-powered site monitoring flagged safety violations in real time, reducing incidents.",
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=300&q=80",
  },
  {
    stat: "+50%",
    label: "Faster Report Generation",
    company: "Metro Construction Co.",
    type: "Infrastructure Contractor",
    desc: "Automated AI reporting cut daily documentation time from 2 hours to under 30 minutes.",
    img: "https://images.unsplash.com/photo-1590644365607-5cf36869a51c?w=300&q=80",
  },
];

// ─── BEST OF DATA ─────────────────────────────────────────────────────────────

const BEST_OF_LISTS = [
  {
    title: "Best AI Tools for Construction Planning",
    count: 12,
    iconBg: "bg-[#eef2f6]",
    iconColor: "text-[#6484A4]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Best AI Site Monitoring Tools",
    count: 9,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
  },
  {
    title: "Best AI Tools for Safety & Compliance",
    count: 8,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: "Best AI BIM Tools",
    count: 10,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    title: "Best AI Tools for Small Construction Firms",
    count: 11,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
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
                className="w-3.5 h-3.5 rounded border-gray-300 accent-[#6484A4] cursor-pointer"
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
        <Link href="/" className="hover:text-[#6484A4] transition-colors">Home</Link>
        <span>›</span>
        <Link href="/industries" className="hover:text-[#6484A4] transition-colors">Industries</Link>
        <span>›</span>
        <span className="text-[#1E293B] font-medium">Construction</span>
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
            <span className="inline-block bg-[#eef2f6] text-[#6484A4] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-5">
              AI for Construction Companies
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] leading-tight mb-5">
              AI Tools for
              <br />
              <span className="text-amber-600">Construction</span>{" "}
              <span className="text-[#6484A4]">Companies</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
              From project planning and site monitoring to progress tracking and compliance reporting, discover AI tools that help construction companies deliver projects on time, on budget, and safely.
            </p>
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
            <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-amber-300 blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute -bottom-8 right-16 w-56 h-56 rounded-full bg-[#6484A4] blur-3xl opacity-30 pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden w-full h-[300px] sm:h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80"
                alt="Construction site"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating card — top left */}
            <div className="absolute -top-4 -left-4 sm:left-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-[#eef2f6] text-[#6484A4] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Build Smarter</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">AI-powered planning and site intelligence.</p>
              </div>
            </div>

            {/* Floating card — bottom right */}
            <div className="absolute -bottom-4 -right-4 sm:right-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-4-4l4 4 4-4M6 10h12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Save Costs</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">Reduce overruns with real-time AI insights.</p>
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
            Common Challenges in Construction Business
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
            AI-Powered Workflow for Construction Companies
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            A step-by-step workflow to streamline your operations with AI
          </p>
        </div>

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

function RecommendedToolsSection() {
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
                {stepData.tools.map((tool) => (
                  <div key={tool.name} className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg ${tool.iconBg} flex items-center justify-center text-white text-[9px] sm:text-[10px] font-black shrink-0`}>
                      {tool.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-[#1E293B] truncate">{tool.name}</p>
                      <div className="flex items-center gap-1">
                        <Stars rating={tool.rating} />
                        <span className="text-[10px] sm:text-xs font-semibold text-[#1E293B]">{tool.rating}</span>
                        
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-100">
                <a href="/ai-tools" className={`text-[10px] sm:text-xs font-semibold ${stepData.headerText} hover:opacity-80 transition-opacity`}>
                  View all {stepData.totalCount} tools →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TopToolsSection() {
  const [useCases, setUseCases] = useState<string[]>([]);
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
    const meta = TOOL_FILTER_META[tool.name] ?? { useCases: [], bestForTags: [], integrationTags: [] };
    if (useCases.length && !useCases.some((u) => meta.useCases.includes(u))) return false;
    if (pricingTypes.length && !pricingTypes.includes(pricingTypeOf(tool.price))) return false;
    if (bestForFilters.length && !bestForFilters.some((b) => meta.bestForTags.includes(b))) return false;
    if (integrations.length && !integrations.some((i) => meta.integrationTags.includes(i))) return false;
    const pv = priceValueOf(tool.price);
    if (pv !== null && pv > priceRange) return false;
    return true;
  });
  if (sortBy === "Highest Rated" || sortBy === "Most Reviews") {
    visibleTools = [...visibleTools].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  } else if (sortBy === "Lowest Price") {
    visibleTools = [...visibleTools].sort((a, b) => (priceValueOf(a.price) ?? Infinity) - (priceValueOf(b.price) ?? Infinity));
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
            Top Tools for Construction Companies
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="relative">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1E293B] pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#6484A4]/30 cursor-pointer">
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
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm lg:sticky lg:top-24 space-y-6">
              <CheckGroup title="Use Case" items={USE_CASES} checked={useCases} onToggle={(l) => toggle(useCases, setUseCases, l)} dotColor="bg-[#6484A4]" />
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
                  max={1000}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 accent-[#6484A4] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                  <span>$0</span>
                  <span>${priceRange === 1000 ? "1000+" : priceRange}/month</span>
                </div>
              </div>
              <div className="border-t border-gray-100" />
              <CheckGroup title="Integrations" items={INTEGRATIONS_FILTERS} checked={integrations} onToggle={(l) => toggle(integrations, setIntegrations, l)} />
              <div className="border-t border-gray-100" />
              <button onClick={resetAll} className="w-full py-2 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 hover:border-[#6484A4] hover:text-[#6484A4] transition-colors">
                Reset Filters
              </button>
            </div>
          </div>

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
                  <a href={tool.affiliateHref} className="flex-1 text-center text-xs font-semibold text-white bg-[#6484A4] hover:bg-[#527090] rounded-lg px-3 py-2 transition-colors whitespace-nowrap">
                    Visit Website →
                  </a>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer mt-2">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-[#6484A4] cursor-pointer" />
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
              Real Results from Construction Companies
            </h2>
            <p className="text-gray-400 text-sm">See how companies use AI to deliver better projects</p>
          </div>
          <a href="#" className="text-sm font-semibold text-[#6484A4] hover:text-[#6484A4] transition-colors shrink-0">
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
                <p className="text-3xl font-extrabold text-[#6484A4] mb-0.5">{cs.stat}</p>
                <p className="text-xs text-gray-400 mb-3">{cs.label}</p>
                <p className="font-bold text-sm text-[#1E293B] mb-0.5">{cs.company}</p>
                <p className="text-xs text-gray-400 mb-3">{cs.type}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{cs.desc}</p>
                <a href="#" className="text-xs font-semibold text-[#6484A4] hover:text-[#6484A4] transition-colors">
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
              Rest Of Construction AI Tools
            </h2>
            <p className="text-gray-400 text-sm">Curated lists of top-performing tools</p>
          </div>
          <a href="#" className="text-sm font-semibold text-[#6484A4] hover:text-[#6484A4] transition-colors shrink-0">
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

export default function ConstructionPage() {
  return (
    <>
      <Navbar />
      <main>
        <BreadcrumbSection />
        <HeroSection />
        <ChallengesSection />
        <WorkflowSection />
        <RecommendedToolsSection />
        <TopToolsSection />
        <RealResultsSection />
        <BestOfSection />
      </main>
      <Newsletter
        heading="Get Weekly AI Tools & Construction Insights"
        subtitle="Join 10,000+ contractors and project managers who get AI tips, workflows, and tool recommendations."
      />
      <Footer />
    </>
  );
}
