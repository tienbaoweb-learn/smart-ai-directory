"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const BENEFITS = [
  {
    title: "Save Time",
    desc: "Automate listings & follow-ups",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Generate More Leads",
    desc: "AI-powered prospecting & outreach",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Close Deals Faster",
    desc: "Impress buyers with AI visuals",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <polyline strokeLinecap="round" strokeLinejoin="round" points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline strokeLinecap="round" strokeLinejoin="round" points="17 6 23 6 23 12" />
      </svg>
    ),
  },
  {
    title: "Stay Competitive",
    desc: "Use AI insights to price & win",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

const CHALLENGES = [
  {
    title: "Finding & Qualifying Leads",
    desc: "Identifying serious buyers and sellers from a sea of inquiries is time-consuming and costly.",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
      </svg>
    ),
  },
  {
    title: "Creating Engaging Listings",
    desc: "Writing compelling property descriptions and sourcing great visuals takes hours per listing.",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "Time-consuming Virtual Staging",
    desc: "Professional staging is expensive; empty homes are harder to sell and take longer to close.",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-8 9 8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10.4V19a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1V10.4" />
      </svg>
    ),
  },
  {
    title: "Following Up with Prospects",
    desc: "Manually nurturing leads across email, SMS, and social media leads to missed opportunities.",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Market Analysis Complexity",
    desc: "Manually researching comps, trends, and pricing data is slow and prone to human error.",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    num: 1,
    title: "Lead Generation",
    desc: "Use AI to identify, score, and reach out to the most promising buyers and sellers automatically.",
    badgeColor: "bg-purple-600",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    borderColor: "border-purple-100",
    linkColor: "text-purple-600 hover:text-purple-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "Property Listings",
    desc: "Auto-generate compelling listing descriptions, social posts, and marketing copy in seconds.",
    badgeColor: "bg-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    borderColor: "border-orange-100",
    linkColor: "text-orange-500 hover:text-orange-600",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Virtual Staging",
    desc: "Transform empty rooms into beautifully furnished spaces with AI virtual staging in minutes.",
    badgeColor: "bg-violet-600",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    borderColor: "border-violet-100",
    linkColor: "text-violet-600 hover:text-violet-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-8 9 8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10.4V19a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1V10.4" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "Close Deals",
    desc: "Nurture leads with AI chatbots, automate follow-ups, and move prospects from inquiry to contract.",
    badgeColor: "bg-emerald-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-100",
    linkColor: "text-emerald-600 hover:text-emerald-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

const STEP_TOOLS_DATA = [
  {
    step: "Lead Generation",
    tab: "Leads",
    stepNum: 1,
    badgeColor: "bg-purple-600",
    headerText: "text-purple-700",
    totalCount: 10,
    tools: [
      { name: "HouseCanary", rating: "4.8", reviews: "340", initials: "HC", iconBg: "bg-purple-600" },
      { name: "ManyChat", rating: "4.7", reviews: "380", initials: "MC", iconBg: "bg-blue-500" },
      { name: "Copy.ai", rating: "4.6", reviews: "430", initials: "C", iconBg: "bg-blue-600" },
      { name: "Jasper", rating: "4.5", reviews: "510", initials: "J", iconBg: "bg-orange-500" },
    ],
  },
  {
    step: "Property Listings",
    tab: "Listings",
    stepNum: 2,
    badgeColor: "bg-orange-500",
    headerText: "text-orange-600",
    totalCount: 9,
    tools: [
      { name: "Copy.ai", rating: "4.8", reviews: "430", initials: "C", iconBg: "bg-blue-600" },
      { name: "Jasper", rating: "4.7", reviews: "510", initials: "J", iconBg: "bg-orange-500" },
      { name: "ChatGPT", rating: "4.7", reviews: "2,100", initials: "GP", iconBg: "bg-[#10A37F]" },
      { name: "Canva AI", rating: "4.6", reviews: "980", initials: "CA", iconBg: "bg-[#0CC0DF]" },
    ],
  },
  {
    step: "Virtual Staging",
    tab: "Staging",
    stepNum: 3,
    badgeColor: "bg-violet-600",
    headerText: "text-violet-700",
    totalCount: 8,
    tools: [
      { name: "REimagineHome", rating: "4.8", reviews: "290", initials: "RH", iconBg: "bg-[#FF6B6B]" },
      { name: "Virtual Staging AI", rating: "4.7", reviews: "210", initials: "VS", iconBg: "bg-violet-600" },
      { name: "Canva AI", rating: "4.6", reviews: "980", initials: "CA", iconBg: "bg-[#0CC0DF]" },
      { name: "Adobe Firefly", rating: "4.5", reviews: "820", initials: "AF", iconBg: "bg-red-600" },
    ],
  },
  {
    step: "Close Deals",
    tab: "Closing",
    stepNum: 4,
    badgeColor: "bg-emerald-500",
    headerText: "text-emerald-700",
    totalCount: 9,
    tools: [
      { name: "ManyChat", rating: "4.8", reviews: "380", initials: "MC", iconBg: "bg-blue-500" },
      { name: "ChatGPT", rating: "4.7", reviews: "2,100", initials: "GP", iconBg: "bg-[#10A37F]" },
      { name: "Notion AI", rating: "4.7", reviews: "640", initials: "N", iconBg: "bg-gray-900" },
      { name: "Shopify Magic", rating: "4.5", reviews: "260", initials: "SM", iconBg: "bg-emerald-600" },
    ],
  },
];

const TABS = ["All Steps", "Leads", "Listings", "Staging", "Closing"];

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
  { label: "Lead Generation", count: 22 },
  { label: "Listing Copywriting", count: 18 },
  { label: "Virtual Staging", count: 20 },
  { label: "Market Analysis", count: 16 },
  { label: "Client Follow-up", count: 24 },
  { label: "Social Media", count: 19 },
  { label: "Property Valuation", count: 14 },
];

const PRICING_TYPES = [
  { label: "Free", count: 10 },
  { label: "Freemium", count: 30 },
  { label: "Paid", count: 52 },
];

const BEST_FOR_FILTERS = [
  { label: "Real Estate Agents", count: 38 },
  { label: "Property Managers", count: 22 },
  { label: "Brokerages", count: 18 },
  { label: "Real Estate Investors", count: 20 },
  { label: "New Agents", count: 16 },
];

const INTEGRATIONS_FILTERS = [
  { label: "Zillow", count: 24 },
  { label: "MLS", count: 28 },
  { label: "Salesforce", count: 20 },
  { label: "HubSpot", count: 22 },
  { label: "Zapier", count: 30 },
  { label: "Others", count: 18 },
];

const TOP_TOOLS = [
  {
    rank: 1,
    name: "REimagineHome",
    featured: true,
    price: "~$29/month",
    rating: "4.8",
    reviews: "290",
    desc: "AI virtual staging and redesign tool that transforms empty rooms into stunning furnished spaces in seconds.",
    bestFor: "Real Estate Agents, Brokerages",
    integrations: [
      { label: "ZL", bg: "bg-blue-600", title: "Zillow" },
      { label: "ZP", bg: "bg-orange-500", title: "Zapier" },
    ],
    initials: "RH",
    iconBg: "bg-[#FF6B6B]",
    iconText: "text-white",
  },
  {
    rank: 2,
    name: "Copy.ai",
    featured: false,
    price: "~$36/month",
    rating: "4.7",
    reviews: "430",
    desc: "AI writing tool that generates compelling property descriptions, email campaigns, and social media content.",
    bestFor: "Real Estate Agents, Property Managers",
    integrations: [
      { label: "HS", bg: "bg-orange-600", title: "HubSpot" },
      { label: "ZP", bg: "bg-orange-500", title: "Zapier" },
    ],
    initials: "C",
    iconBg: "bg-blue-600",
    iconText: "text-white",
  },
  {
    rank: 3,
    name: "HouseCanary",
    featured: false,
    price: "~$79/month",
    rating: "4.7",
    reviews: "340",
    desc: "AI-powered property valuation and market analytics platform providing accurate home price estimates and trends.",
    bestFor: "Agents, Investors, Brokerages",
    integrations: [
      { label: "ML", bg: "bg-purple-600", title: "MLS" },
      { label: "SF", bg: "bg-blue-500", title: "Salesforce" },
    ],
    initials: "HC",
    iconBg: "bg-purple-600",
    iconText: "text-white",
  },
  {
    rank: 4,
    name: "ManyChat",
    featured: false,
    price: "~$15/month",
    rating: "4.6",
    reviews: "380",
    desc: "AI chatbot platform that automates lead capture, qualification, and follow-up across Instagram, Facebook, and SMS.",
    bestFor: "Real Estate Agents, New Agents",
    integrations: [
      { label: "HS", bg: "bg-orange-600", title: "HubSpot" },
      { label: "ZP", bg: "bg-orange-500", title: "Zapier" },
    ],
    initials: "MC",
    iconBg: "bg-blue-500",
    iconText: "text-white",
  },
  {
    rank: 5,
    name: "Canva AI",
    featured: false,
    price: "~$13/month",
    rating: "4.9",
    reviews: "980",
    desc: "AI-powered design platform for creating stunning property flyers, social media graphics, and presentation decks.",
    bestFor: "Agents, Property Managers, Brokerages",
    integrations: [
      { label: "ZP", bg: "bg-orange-500", title: "Zapier" },
      { label: "HS", bg: "bg-orange-600", title: "HubSpot" },
    ],
    initials: "CA",
    iconBg: "bg-[#0CC0DF]",
    iconText: "text-white",
  },
];

// ─── REAL RESULTS DATA ────────────────────────────────────────────────────────

const CASE_STUDIES = [
  {
    stat: "+40%",
    label: "More Qualified Leads",
    company: "PropertyMax Realty",
    type: "Real Estate Agency",
    desc: "AI-generated content and automated follow-ups increased qualified lead volume by 40% in 3 months.",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&q=80",
  },
  {
    stat: "+3X",
    label: "Listing Views",
    company: "Urban Homes Group",
    type: "Property Brokerage",
    desc: "AI virtual staging and copywriting tripled online listing views and cut days-on-market by 28%.",
    img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300&q=80",
  },
  {
    stat: "-50%",
    label: "Time Spent on Listings",
    company: "Prime Property Group",
    type: "Luxury Real Estate Firm",
    desc: "AI listing tools cut the time spent writing and marketing each property by half.",
    img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80",
  },
];

// ─── BEST OF DATA ─────────────────────────────────────────────────────────────

const BEST_OF_LISTS = [
  {
    title: "Best AI Tools for Real Estate Agents",
    count: 14,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-8 9 8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10.4V19a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1V10.4" />
      </svg>
    ),
  },
  {
    title: "Best AI Virtual Staging Tools",
    count: 9,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Best AI Lead Generation Tools",
    count: 10,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-500",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Best AI Market Analysis Tools",
    count: 8,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: "Best AI Tools for Property Management",
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
                className="w-3.5 h-3.5 rounded border-gray-300 accent-purple-600 cursor-pointer"
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
        <span className="text-[#1E293B] font-medium">Real Estate</span>
      </nav>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="bg-white py-10 sm:py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">
          <div className="flex-1 min-w-0">
            <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-5">
              AI for Real Estate Professionals
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] leading-tight mb-5">
              AI Tools for
              <br />
              <span className="text-purple-600">Real Estate</span>{" "}
              <span className="text-[#F97316]">Professionals</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
              From lead generation and listing copywriting to virtual staging and deal closing, discover AI tools that help real estate professionals attract more clients, sell properties faster, and grow their business.
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

          <div className="flex-1 relative w-full min-h-[320px] sm:min-h-[400px]">
            <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-purple-300 blur-3xl opacity-30 pointer-events-none" />
            <div className="absolute -bottom-8 right-16 w-56 h-56 rounded-full bg-violet-300 blur-3xl opacity-30 pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden w-full h-[300px] sm:h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=900&q=80"
                alt="Real estate property"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="absolute -top-4 -left-4 sm:left-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Attract Leads</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">Close deals faster with AI prospecting tools.</p>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 sm:right-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-8 9 8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 10.4V19a1 1 0 001 1h4v-4h4v4h4a1 1 0 001-1V10.4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Stage Virtually</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">Turn empty rooms into stunning listings.</p>
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
            Common Challenges in Real Estate Business
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
            AI-Powered Workflow for Real Estate Professionals
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
                        <span className="hidden sm:inline text-xs text-gray-400">({tool.reviews})</span>
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
  const [priceRange, setPriceRange] = useState(200);

  function toggle(list: string[], setList: (v: string[]) => void, label: string) {
    setList(list.includes(label) ? list.filter((x) => x !== label) : [...list, label]);
  }

  function resetAll() {
    setUseCases([]);
    setPricingTypes([]);
    setBestForFilters([]);
    setIntegrations([]);
    setPriceRange(200);
  }

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
            Top Tools for Real Estate Professionals
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1E293B] pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600/30 cursor-pointer">
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
              <CheckGroup title="Use Case" items={USE_CASES} checked={useCases} onToggle={(l) => toggle(useCases, setUseCases, l)} dotColor="bg-purple-400" />
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
                  max={200}
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full h-1.5 accent-purple-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                  <span>$0</span>
                  <span>${priceRange === 200 ? "200+" : priceRange}/month</span>
                </div>
              </div>
              <div className="border-t border-gray-100" />
              <CheckGroup title="Integrations" items={INTEGRATIONS_FILTERS} checked={integrations} onToggle={(l) => toggle(integrations, setIntegrations, l)} />
              <div className="border-t border-gray-100" />
              <button onClick={resetAll} className="w-full py-2 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 hover:border-purple-600 hover:text-purple-600 transition-colors">
                Reset Filters
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            {TOP_TOOLS.map((tool) => (
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
                  <div className={`w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center text-sm font-black ${tool.iconText} shrink-0`}>
                    {tool.initials}
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
                  <span className="text-xs text-gray-400">({tool.reviews} reviews)</span>
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
                  <a href="#" className="flex-1 text-center text-xs font-semibold text-[#1E293B] border border-gray-300 rounded-lg px-3 py-2 hover:border-[#1E293B] transition-colors whitespace-nowrap">
                    Read Review →
                  </a>
                  <a href="#" className="flex-1 text-center text-xs font-semibold text-white bg-purple-600 hover:bg-purple-700 rounded-lg px-3 py-2 transition-colors whitespace-nowrap">
                    Visit Website →
                  </a>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer mt-2">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-purple-600 cursor-pointer" />
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
              Real Results from Real Estate Professionals
            </h2>
            <p className="text-gray-400 text-sm">See how agents and brokerages use AI to grow</p>
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
              Rest Of Real Estate AI Tools
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

export default function RealEstatePage() {
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
        heading="Get Weekly AI Tools & Real Estate Insights"
        subtitle="Join 10,000+ real estate agents and brokers who get AI tips, workflows, and tool recommendations."
      />
      <Footer />
    </>
  );
}
