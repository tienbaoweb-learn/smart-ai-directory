"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { TOOL_LOGO_URLS } from "../../data/tool-logos";
import IndustryToolsGrid, {
  type GridTool,
} from "../../components/IndustryToolsGrid";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    title: "Visualize Spaces",
    desc: "Generate photorealistic renders instantly",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Impress Clients",
    desc: "Deliver stunning presentations faster",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
      </svg>
    ),
  },
  {
    title: "Save Hours",
    desc: "Automate mood boards & floor plans",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Win More Projects",
    desc: "Stand out with AI-powered proposals",
    iconBg: "bg-lime-100",
    iconColor: "text-lime-700",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const CHALLENGES = [
  {
    title: "Time-Consuming Visualizations",
    desc: "Creating realistic renders manually takes days, slowing down the design review process.",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: "Client Communication Gaps",
    desc: "Clients struggle to visualize designs from 2D drawings, leading to costly revisions.",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Space Planning Complexity",
    desc: "Optimizing furniture layout and traffic flow for different room sizes is tedious and error-prone.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Concept Consistency",
    desc: "Maintaining a cohesive design style across mood boards, renders, and presentations is challenging.",
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Sourcing & Procurement",
    desc: "Finding the right furniture and materials that fit style, budget, and availability takes hours.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    num: 1,
    title: "Concept & Mood Board",
    desc: "Use AI to generate mood boards, color palettes, and style concepts from a brief in minutes.",
    badgeColor: "bg-[#35966a]",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    borderColor: "border-green-100",
    linkColor: "text-green-700 hover:text-green-800",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "Space Planning",
    desc: "AI floor plan tools optimize furniture placement and traffic flow for any room dimensions.",
    badgeColor: "bg-teal-500",
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    borderColor: "border-teal-100",
    linkColor: "text-teal-600 hover:text-teal-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "3D Rendering",
    desc: "Transform floor plans into photorealistic 3D renders to help clients visualize the final space.",
    badgeColor: "bg-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-100",
    linkColor: "text-blue-600 hover:text-blue-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "Client Presentation",
    desc: "Auto-generate polished presentations, virtual tours, and proposal decks with AI assistance.",
    badgeColor: "bg-emerald-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-100",
    linkColor: "text-emerald-600 hover:text-emerald-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

type StepTool = { name: string; slug?: string; href?: string; rating: string; initials: string; iconBg: string };

const STEP_TOOLS_DATA: { step: string; tab: string; stepNum: number; badgeColor: string; headerText: string; totalCount: number; tools: StepTool[] }[] = [
  {
    step: "Concept & Mood Board",
    tab: "Concept",
    stepNum: 1,
    badgeColor: "bg-[#35966a]",
    headerText: "text-green-700",
    totalCount: 10,
    tools: [
      { name: "Midjourney", slug: "midjourney", rating: "4.9", initials: "MJ", iconBg: "bg-gray-900" },
      { name: "Canva AI", slug: "canva-ai", rating: "4.8", initials: "CA", iconBg: "bg-[#0CC0DF]" },
      { name: "Adobe Firefly", slug: "adobe-firefly", rating: "4.7", initials: "AF", iconBg: "bg-orange-500" },
      { name: "Moodboard AI", slug: "moodboard-ai", rating: "4.6", initials: "MB", iconBg: "bg-pink-500" },
    ],
  },
  {
    step: "Space Planning",
    tab: "Planning",
    stepNum: 2,
    badgeColor: "bg-teal-500",
    headerText: "text-teal-600",
    totalCount: 8,
    tools: [
      { name: "Planner 5D", slug: "planner-5d", rating: "4.8", initials: "P5", iconBg: "bg-[#35966a]" },
      { name: "RoomGPT", slug: "roomgpt", rating: "4.7", initials: "RG", iconBg: "bg-purple-600" },
      { name: "Homestyler", slug: "homestyler", rating: "4.6", initials: "H", iconBg: "bg-teal-500" },
      { name: "Coohom", rating: "4.6", initials: "C", iconBg: "bg-blue-600" },
    ],
  },
  {
    step: "3D Rendering",
    tab: "Rendering",
    stepNum: 3,
    badgeColor: "bg-blue-600",
    headerText: "text-blue-700",
    totalCount: 11,
    tools: [
      { name: "Foyr", slug: "foyr", href: "/tools/foyr", rating: "4.8", initials: "FN", iconBg: "bg-indigo-600" },
      { name: "Coohom", rating: "4.7", initials: "C", iconBg: "bg-blue-600" },
      { name: "Planner 5D", slug: "planner-5d", rating: "4.8", initials: "P5", iconBg: "bg-[#35966a]" },
      { name: "SketchUp AI", slug: "sketchup-ai", rating: "4.6", initials: "SK", iconBg: "bg-red-500" },
    ],
  },
  {
    step: "Client Presentation",
    tab: "Presentation",
    stepNum: 4,
    badgeColor: "bg-emerald-500",
    headerText: "text-emerald-700",
    totalCount: 7,
    tools: [
      { name: "Canva AI", slug: "canva-ai", rating: "4.9", initials: "CA", iconBg: "bg-[#0CC0DF]" },
      { name: "Gamma", slug: "gamma", rating: "4.8", initials: "G", iconBg: "bg-violet-600" },
      { name: "Jasper", slug: "jasper-ai", rating: "4.7", initials: "J", iconBg: "bg-orange-500" },
      { name: "Beautiful.ai", slug: "beautiful-ai", rating: "4.6", initials: "BA", iconBg: "bg-emerald-600" },
    ],
  },
];

const TABS = ["All Steps", "Concept", "Planning", "Rendering", "Presentation"];

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
  { label: "Space Planning", count: 22 },
  { label: "3D Rendering", count: 28 },
  { label: "Concept Design", count: 20 },
  { label: "Client Presentation", count: 18 },
  { label: "Mood Board", count: 16 },
  { label: "Furniture Layout", count: 14 },
];

const PRICING_TYPES = [
  { label: "Free", count: 10 },
  { label: "Freemium", count: 24 },
  { label: "Paid", count: 60 },
];

const BEST_FOR_FILTERS = [
  { label: "Interior Designers", count: 32 },
  { label: "Design Studios", count: 24 },
  { label: "Freelancers", count: 20 },
  { label: "Homeowners", count: 18 },
  { label: "Architects", count: 14 },
];

const INTEGRATIONS_FILTERS = [
  { label: "SketchUp", count: 26 },
  { label: "AutoCAD", count: 22 },
  { label: "Revit", count: 18 },
  { label: "Canva", count: 30 },
  { label: "Adobe Suite", count: 24 },
  { label: "Others", count: 16 },
];

const TOP_TOOLS = [
  {
    rank: 1,
    name: "D5 Render",
    featured: true,
    reviewHref: "/tools/d5-render",
    affiliateHref: "https://myspace.d5render.com/subscribe/year/?aff=lepham",
    price: "Free version available / Pro from $38/month",
    rating: "4.7",
    desc: "D5 Render is a real-time ray tracing renderer used by 80% architecture professionals, cutting rendering time from 12-18 hours (V-Ray) to 1-2 hours with higher quality results. It integrates natively with SketchUp, Revit, Rhino, ARCHICAD, and Blender via live-sync — with a free version and Pro from $38/month.",
    bestFor: "Architecture firms producing client presentations and design approvals",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "D5",
    iconBg: "bg-blue-700",
    iconText: "text-white",
  },
  {
    rank: 2,
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
    iconBg: "bg-purple-600",
    iconText: "text-white",
  },
  {
    rank: 3,
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
    iconBg: "bg-slate-800",
    iconText: "text-white",
  },
  {
    rank: 4,
    name: "Collov AI",
    featured: false,
    reviewHref: "/tools/collov-ai",
    affiliateHref: "https://collov.ai/?via=smartaiforwork",
    price: "Contact for pricing",
    rating: "4.4",
    desc: "Collov AI is best suited for homeowners, designers, and real estate professionals who want comprehensive AI-generated interior design concepts and virtual staging from real room photos.",
    bestFor: "Homeowners planning a full room or whole-home redesign",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "CA",
    iconBg: "bg-teal-500",
    iconText: "text-white",
  },
  {
    rank: 5,
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
    iconBg: "bg-orange-600",
    iconText: "text-white",
  },
  {
    rank: 6,
    name: "AI Home Design",
    featured: false,
    reviewHref: "/tools/aihomedesign",
    affiliateHref: "https://aihomedesign.com/?via=smartaiforwork",
    price: "Contact for pricing",
    rating: "4.3",
    desc: "AI Home Design is best suited for homeowners and renters who want quick, photorealistic interior and exterior makeovers from existing photos, without needing design software or a professional.",
    bestFor: "Homeowners exploring renovation ideas before hiring a contractor",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "AH",
    iconBg: "bg-emerald-600",
    iconText: "text-white",
  },
  {
    rank: 7,
    name: "Homedesigns.ai",
    featured: false,
    reviewHref: "/tools/homedesigns",
    affiliateHref: "https://homedesigns.ai?fpr=-smartaiforwork",
    price: "Contact for pricing",
    rating: "4.3",
    desc: "Homedesigns.ai is best suited for homeowners, renters, and interior design enthusiasts who want fast, photorealistic room makeovers generated from a single photo, without hiring a designer.",
    bestFor: "Homeowners planning a renovation who want visual direction first",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "HA",
    iconBg: "bg-rose-600",
    iconText: "text-white",
  },
  {
    rank: 8,
    name: "DesignSense.ai",
    featured: false,
    reviewHref: "/tools/designsense",
    affiliateHref: "https://www.designsense.ai?fpr=smartaiforwork",
    price: "Contact for pricing",
    rating: "4.2",
    desc: "DesignSense.ai is best suited for homeowners and design enthusiasts who want AI-generated room styling and personalized recommendations based on their own space and taste.",
    bestFor: "Homeowners trying to define their interior design style",
    integrations: [] as { label: string; bg: string; title: string }[],
    initials: "DA",
    iconBg: "bg-indigo-600",
    iconText: "text-white",
  },
];

// Filter metadata per tool (keyed by name) — drives the left-column filters.
const TOOL_FILTER_META: Record<
  string,
  { useCases: string[]; bestForTags: string[]; integrationTags: string[] }
> = {
  "D5 Render": { useCases: ["3D Rendering","Client Presentation","Concept Design"], bestForTags: ["Interior Designers","Architects","Design Studios"], integrationTags: ["SketchUp","Revit","AutoCAD"] },
  "Midjourney": { useCases: ["Concept Design","Mood Board","Client Presentation"], bestForTags: ["Interior Designers","Freelancers","Homeowners"], integrationTags: ["Adobe Suite"] },
  "Buzz.ai": { useCases: ["Client Presentation"], bestForTags: ["Design Studios","Freelancers"], integrationTags: ["Others"] },
  "Collov AI": { useCases: ["Concept Design","Mood Board","Space Planning"], bestForTags: ["Interior Designers","Homeowners"], integrationTags: ["Others"] },
  "Planner 5D": { useCases: ["Space Planning","Furniture Layout","3D Rendering","Concept Design"], bestForTags: ["Interior Designers","Homeowners","Freelancers"], integrationTags: ["Others"] },
  "AI Home Design": { useCases: ["Concept Design","Mood Board"], bestForTags: ["Homeowners","Interior Designers"], integrationTags: ["Others"] },
  "Homedesigns.ai": { useCases: ["3D Rendering","Concept Design"], bestForTags: ["Interior Designers","Homeowners"], integrationTags: ["Others"] },
  "DesignSense.ai": { useCases: ["Space Planning","Concept Design"], bestForTags: ["Interior Designers","Design Studios"], integrationTags: ["Others"] },
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
    stat: "-60%",
    label: "Faster Visualization Turnaround",
    company: "Studio Verde Design",
    type: "Interior Design Studio",
    desc: "AI rendering tools cut client visualization time from 3 days to under 4 hours per project.",
    img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&q=80",
  },
  {
    stat: "+40%",
    label: "Increase in Client Approvals",
    company: "Casa Forma",
    type: "Luxury Residential Designer",
    desc: "Photorealistic AI renders helped clients approve designs faster, reducing revision cycles by half.",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
  },
  {
    stat: "+3x",
    label: "More Projects Handled",
    company: "Maya Interiors",
    type: "Freelance Interior Designer",
    desc: "Automated mood boards and space planning tools tripled her monthly project capacity.",
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&q=80",
  },
];

// ─── BEST OF DATA ─────────────────────────────────────────────────────────────

const BEST_OF_LISTS = [
  {
    title: "Best AI Tools for 3D Rendering",
    count: 14,
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    title: "Best AI Floor Plan Tools",
    count: 10,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9h18M9 21V9" />
      </svg>
    ),
  },
  {
    title: "Best AI Mood Board Generators",
    count: 8,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
  },
  {
    title: "Best AI Tools for Client Presentations",
    count: 9,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Best AI Tools for Freelance Designers",
    count: 11,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
                className="w-3.5 h-3.5 rounded border-gray-300 accent-[#35966a] cursor-pointer"
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
        <span className="text-[#1E293B] font-medium">Interior Design</span>
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
            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-5">
              AI for Interior Designers
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] leading-tight mb-5">
              AI Tools for
              <br />
              <span className="text-[#35966a]">Interior</span>{" "}
              <span className="text-teal-500">Designers</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
              From AI mood boards and space planning to photorealistic 3D rendering and client presentations, discover the tools that help interior designers create stunning spaces faster and win more projects.
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
            <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-green-300 blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute -bottom-8 right-16 w-56 h-56 rounded-full bg-teal-300 blur-3xl opacity-30 pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden w-full h-[300px] sm:h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=900&q=80"
                alt="Interior design"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating card — top left */}
            <div className="absolute -top-4 -left-4 sm:left-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-green-100 text-green-700 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Design Faster</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">AI renders in minutes, not days.</p>
              </div>
            </div>

            {/* Floating card — bottom right */}
            <div className="absolute -bottom-4 -right-4 sm:right-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3l14 9-14 9V3z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Impress Clients</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">Photorealistic 3D in one click.</p>
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
            Common Challenges in Interior Design
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
            AI-Powered Workflow for Interior Designers
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            A step-by-step workflow to create stunning spaces faster with AI
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

// Which Use Case filter(s) each step's "View all" pre-selects on
// "Top Tools for Interior Designers".
const STEP_USE_CASES: Record<string, string[]> = {
  "Concept & Mood Board": ["Concept Design", "Mood Board"],
  "Space Planning": ["Space Planning"],
  "3D Rendering": ["3D Rendering"],
  "Client Presentation": ["Client Presentation"],
};

function RecommendedToolsSection({
  onSelectUseCases,
}: {
  onSelectUseCases: (useCases: string[]) => void;
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
                  const rowClassName = `flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3${tool.href ? " hover:bg-gray-50 transition-colors" : ""}`;
                  const rowContent = (
                    <>
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
                    </>
                  );
                  return tool.href ? (
                    <Link key={tool.name} href={tool.href} className={rowClassName}>
                      {rowContent}
                    </Link>
                  ) : (
                    <div key={tool.name} className={rowClassName}>
                      {rowContent}
                    </div>
                  );
                })}
              </div>
              <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-100">
                {STEP_USE_CASES[stepData.step] ? (
                  <button
                    type="button"
                    onClick={() => onSelectUseCases(STEP_USE_CASES[stepData.step])}
                    className={`text-[10px] sm:text-xs font-semibold ${stepData.headerText} hover:opacity-80 transition-opacity`}
                  >
                    View all {stepData.totalCount} tools →
                  </button>
                ) : (
                  <a href="/ai-tools" className={`text-[10px] sm:text-xs font-semibold ${stepData.headerText} hover:opacity-80 transition-opacity`}>
                    View all {stepData.totalCount} tools →
                  </a>
                )}
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
    <section id="top-tools" className="scroll-mt-24 py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
            Top Tools for Interior Designers
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="relative">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="appearance-none bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1E293B] pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#35966a]/30 cursor-pointer">
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
              <CheckGroup title="Use Case" items={USE_CASES} checked={useCases} onToggle={(l) => toggle(useCases, setUseCases, l)} dotColor="bg-[#35966a]" />
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
                  className="w-full h-1.5 accent-[#35966a] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                  <span>$0</span>
                  <span>${priceRange === 1000 ? "1000+" : priceRange}/month</span>
                </div>
              </div>
              <div className="border-t border-gray-100" />
              <CheckGroup title="Integrations" items={INTEGRATIONS_FILTERS} checked={integrations} onToggle={(l) => toggle(integrations, setIntegrations, l)} />
              <div className="border-t border-gray-100" />
              <button onClick={resetAll} className="w-full py-2 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 hover:border-[#35966a] hover:text-[#35966a] transition-colors">
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
                  <a href={tool.affiliateHref} className="flex-1 text-center text-xs font-semibold text-white bg-[#35966a] hover:bg-[#2c7d58] rounded-lg px-3 py-2 transition-colors whitespace-nowrap">
                    Visit Website →
                  </a>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer mt-2">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-[#35966a] cursor-pointer" />
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
              Real Results from Interior Designers
            </h2>
            <p className="text-gray-400 text-sm">See how designers use AI to create better spaces</p>
          </div>
          <a href="/resources/case-studies" className="text-sm font-semibold text-[#35966a] hover:text-[#2c7d58] transition-colors shrink-0">
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
                <p className="text-3xl font-extrabold text-[#35966a] mb-0.5">{cs.stat}</p>
                <p className="text-xs text-gray-400 mb-3">{cs.label}</p>
                <p className="font-bold text-sm text-[#1E293B] mb-0.5">{cs.company}</p>
                <p className="text-xs text-gray-400 mb-3">{cs.type}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{cs.desc}</p>
                <a href="/resources/case-studies" className="text-xs font-semibold text-[#35966a] hover:text-[#2c7d58] transition-colors">
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
              Best Of Interior Design AI Tools
            </h2>
            <p className="text-gray-400 text-sm">Curated lists of top-performing tools</p>
          </div>
          <a href="/best-of" className="text-sm font-semibold text-[#35966a] hover:text-[#2c7d58] transition-colors shrink-0">
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

export default function InteriorDesignPage({
  allTools,
}: {
  allTools: GridTool[];
}) {
  // Shared so the "Recommended Tools" step cards can pre-select Use Case
  // filter(s) in the "Top Tools for Interior Designers" section.
  const [useCases, setUseCases] = useState<string[]>([]);

  function selectUseCases(labels: string[]) {
    setUseCases(labels);
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
        <RecommendedToolsSection onSelectUseCases={selectUseCases} />
        <TopToolsSection useCases={useCases} setUseCases={setUseCases} />
        <RealResultsSection />
        <BestOfSection />
      </main>
      <Newsletter
        heading="Get Weekly AI Tools & Design Inspiration"
        subtitle="Join 8,000+ interior designers who get AI tips, tool reviews, and design workflow ideas every week."
      />
      <IndustryToolsGrid
        title="All AI Tools for Interior Design"
        subtitle="Browse every interior design tool we've reviewed."
        tools={allTools}
      />

      <Footer />
    </>
  );
}
