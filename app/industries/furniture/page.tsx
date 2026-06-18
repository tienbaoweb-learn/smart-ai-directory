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
    title: "Stunning Visuals",
    desc: "AI product photos without a studio",
    iconBg: "bg-orange-100",
    iconColor: "text-[#e67e22]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Automate Catalogs",
    desc: "Generate product content at scale",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Boost Sales",
    desc: "AR try-before-you-buy experiences",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Save Time",
    desc: "Cut design & listing time by 80%",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
];

const CHALLENGES = [
  {
    title: "Expensive Product Photography",
    desc: "Professional furniture shoots cost thousands per collection and take weeks to produce.",
    iconBg: "bg-orange-100",
    iconColor: "text-[#e67e22]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    title: "Slow Catalog Production",
    desc: "Writing hundreds of product descriptions and creating catalog layouts takes months.",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: "High Return Rates",
    desc: "Customers can't visualize furniture in their space, leading to costly returns and dissatisfaction.",
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
    title: "3D Modeling Costs",
    desc: "Creating accurate 3D models for every SKU is time-consuming and expensive to outsource.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    title: "SEO & Content at Scale",
    desc: "Optimizing hundreds of product pages with unique, engaging copy is nearly impossible manually.",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    num: 1,
    title: "Product Photography",
    desc: "Use AI to remove backgrounds, generate lifestyle scenes, and create studio-quality photos from raw shots.",
    badgeColor: "bg-[#e67e22]",
    iconBg: "bg-orange-100",
    iconColor: "text-[#e67e22]",
    borderColor: "border-orange-100",
    linkColor: "text-[#e67e22] hover:text-[#ca6f1e]",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    num: 2,
    title: "3D & AR Visualization",
    desc: "Generate 3D models and AR experiences so customers can place furniture in their own rooms before buying.",
    badgeColor: "bg-amber-500",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    borderColor: "border-amber-100",
    linkColor: "text-amber-600 hover:text-amber-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    num: 3,
    title: "Catalog & Descriptions",
    desc: "Auto-generate SEO-optimized product descriptions, catalog layouts, and marketing copy at scale.",
    badgeColor: "bg-blue-600",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    borderColor: "border-blue-100",
    linkColor: "text-blue-600 hover:text-blue-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    num: 4,
    title: "Ecommerce Optimization",
    desc: "Optimize listings on Shopify, WooCommerce, and marketplaces with AI-driven pricing and content tools.",
    badgeColor: "bg-emerald-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-100",
    linkColor: "text-emerald-600 hover:text-emerald-700",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
];

const STEP_TOOLS_DATA = [
  {
    step: "Product Photography",
    tab: "Photography",
    stepNum: 1,
    badgeColor: "bg-[#e67e22]",
    headerText: "text-[#e67e22]",
    totalCount: 10,
    tools: [
      { name: "Photoroom", rating: "4.7", initials: "PR", iconBg: "bg-black" },
      { name: "Remove.bg", rating: "4.8", initials: "RB", iconBg: "bg-green-600" },
      { name: "Pebblely", rating: "4.6", initials: "PB", iconBg: "bg-purple-500" },
      { name: "Clipping Magic", rating: "4.5", initials: "CM", iconBg: "bg-blue-600" },
    ],
  },
  {
    step: "3D & AR Visualization",
    tab: "3D & AR",
    stepNum: 2,
    badgeColor: "bg-amber-500",
    headerText: "text-amber-600",
    totalCount: 8,
    tools: [
      { name: "Roomvo", rating: "4.8", initials: "RV", iconBg: "bg-[#e67e22]" },
      { name: "Zakeke", rating: "4.7", initials: "ZK", iconBg: "bg-purple-600" },
      { name: "Cylindo", rating: "4.6", initials: "CY", iconBg: "bg-amber-600" },
      { name: "Marxent", rating: "4.5", initials: "MX", iconBg: "bg-blue-700" },
    ],
  },
  {
    step: "Catalog & Descriptions",
    tab: "Catalog",
    stepNum: 3,
    badgeColor: "bg-blue-600",
    headerText: "text-blue-700",
    totalCount: 11,
    tools: [
      { name: "Jasper", rating: "4.6", initials: "J", iconBg: "bg-purple-700" },
      { name: "Copy.ai", rating: "4.6", initials: "C", iconBg: "bg-blue-600" },
      { name: "Canva AI", rating: "4.6", initials: "CA", iconBg: "bg-cyan-500" },
      { name: "Writesonic", rating: "4.5", initials: "WS", iconBg: "bg-emerald-600" },
    ],
  },
  {
    step: "Ecommerce Optimization",
    tab: "Ecommerce",
    stepNum: 4,
    badgeColor: "bg-emerald-500",
    headerText: "text-emerald-700",
    totalCount: 9,
    tools: [
      { name: "Shopify Magic", rating: "4.7", initials: "SM", iconBg: "bg-green-600" },
      { name: "DataFeedWatch", rating: "4.6", initials: "DF", iconBg: "bg-blue-600" },
      { name: "Jasper", rating: "4.6", initials: "J", iconBg: "bg-purple-700" },
      { name: "Canva AI", rating: "4.6", initials: "CA", iconBg: "bg-cyan-500" },
    ],
  },
];

const TABS = ["All Steps", "Photography", "3D & AR", "Catalog", "Ecommerce"];

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
  { label: "Product Photography", count: 18 },
  { label: "3D Modeling", count: 14 },
  { label: "Catalog Generation", count: 20 },
  { label: "Room Scene Creation", count: 16 },
  { label: "Product Descriptions", count: 22 },
  { label: "Ecommerce Optimization", count: 19 },
];

const PRICING_TYPES = [
  { label: "Free", count: 7 },
  { label: "Freemium", count: 18 },
  { label: "Paid", count: 55 },
];

const BEST_FOR_FILTERS = [
  { label: "Furniture Manufacturers", count: 28 },
  { label: "Furniture Retailers", count: 32 },
  { label: "Furniture Designers", count: 20 },
  { label: "Ecommerce Sellers", count: 26 },
  { label: "Interior Brands", count: 14 },
];

const INTEGRATIONS_FILTERS = [
  { label: "Shopify", count: 30 },
  { label: "WooCommerce", count: 24 },
  { label: "Adobe Suite", count: 22 },
  { label: "Canva", count: 28 },
  { label: "AutoCAD", count: 14 },
  { label: "Others", count: 18 },
];

const TOP_TOOLS = [
  {
    rank: 1,
    name: "Roomvo",
    featured: true,
    price: "Custom",
    rating: "4.8",
   
    desc: "AI-powered room visualizer that lets shoppers see furniture in their own space before buying.",
    bestFor: "Furniture Retailers, Ecommerce",
    integrations: [
      { label: "SP", bg: "bg-green-600", title: "Shopify" },
      { label: "WC", bg: "bg-purple-600", title: "WooCommerce" },
    ],
    initials: "RV",
    iconBg: "bg-[#e67e22]",
    iconText: "text-white",
    affiliateHref: "#",
    reviewHref: "/ai-tools/roomvo",
  },
  {
    rank: 2,
    name: "Zakeke",
    featured: true,
    price: "~$49/month",
    rating: "4.7",
   
    desc: "3D product configurator and AR visualization platform for furniture and home decor brands.",
    bestFor: "Manufacturers, Retailers",
    integrations: [
      { label: "SP", bg: "bg-green-600", title: "Shopify" },
      { label: "WC", bg: "bg-purple-600", title: "WooCommerce" },
    ],
    initials: "ZK",
    iconBg: "bg-purple-600",
    iconText: "text-white",
    affiliateHref: "#",
    reviewHref: "/ai-tools/zakeke",
  },
  {
    rank: 3,
    name: "Photoroom",
    featured: false,
    price: "~$10/month",
    rating: "4.7",
   
    desc: "AI product photography tool to create professional furniture photos without a studio.",
    bestFor: "Ecommerce Sellers, Retailers",
    integrations: [
      { label: "CA", bg: "bg-cyan-500", title: "Canva" },
      { label: "SP", bg: "bg-green-600", title: "Shopify" },
    ],
    initials: "PR",
    iconBg: "bg-black",
    iconText: "text-white",
    affiliateHref: "#",
    reviewHref: "/ai-tools/photoroom",
  },
  {
    rank: 4,
    name: "Jasper",
    featured: false,
    price: "~$39/month",
    rating: "4.6",
   
    desc: "AI writing tool to generate compelling product descriptions, ad copy, and catalog content at scale.",
    bestFor: "Retailers, Marketing Teams",
    integrations: [
      { label: "SP", bg: "bg-green-600", title: "Shopify" },
      { label: "AD", bg: "bg-orange-500", title: "Adobe Suite" },
    ],
    initials: "J",
    iconBg: "bg-purple-700",
    iconText: "text-white",
    affiliateHref: "#",
    reviewHref: "/ai-tools/jasper",
  },
  {
    rank: 5,
    name: "Canva AI",
    featured: false,
    price: "~$15/month",
    rating: "4.6",
   
    desc: "AI-powered design platform to create furniture catalogs, social media visuals, and marketing materials.",
    bestFor: "Designers, Marketing Teams",
    integrations: [
      { label: "CA", bg: "bg-cyan-500", title: "Canva native" },
      { label: "AD", bg: "bg-orange-500", title: "Adobe Suite" },
    ],
    initials: "CA",
    iconBg: "bg-cyan-500",
    iconText: "text-white",
    affiliateHref: "#",
    reviewHref: "/ai-tools/canva-ai",
  },
];

// ─── REAL RESULTS DATA ────────────────────────────────────────────────────────

const CASE_STUDIES = [
  {
    stat: "-70%",
    label: "Reduction in Photography Costs",
    company: "Nordic Wood Co.",
    type: "Furniture Manufacturer",
    desc: "AI product photography replaced costly studio shoots, cutting visual production time from weeks to hours.",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&q=80",
  },
  {
    stat: "+28%",
    label: "Increase in Conversion Rate",
    company: "HomeStyle Retailers",
    type: "Online Furniture Store",
    desc: "AR room visualization tools reduced purchase hesitation and boosted add-to-cart rates significantly.",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=300&q=80",
  },
  {
    stat: "10x",
    label: "Faster Catalog Production",
    company: "Artisan Furnishings",
    type: "Mid-size Furniture Brand",
    desc: "AI-generated product descriptions cut catalog launch time from 3 months to under 2 weeks.",
    img: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&q=80",
  },
];

// ─── BEST OF DATA ─────────────────────────────────────────────────────────────

const BEST_OF_LISTS = [
  {
    title: "Best AI Product Photography Tools",
    count: 12,
    iconBg: "bg-orange-100",
    iconColor: "text-[#e67e22]",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    title: "Best 3D & AR Visualization Tools",
    count: 9,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
  },
  {
    title: "Best AI Writing Tools for Ecommerce",
    count: 10,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
  },
  {
    title: "Best AI Catalog Design Tools",
    count: 8,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
  },
  {
    title: "Best AI Tools for Furniture Startups",
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
                className="w-3.5 h-3.5 rounded border-gray-300 accent-[#e67e22] cursor-pointer"
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
        <span className="text-[#1E293B] font-medium">Furniture</span>
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
            <span className="inline-block bg-orange-100 text-[#e67e22] text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full mb-5">
              AI Tools for Your Industry
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#1E293B] leading-tight mb-5">
              AI Tools for
              <br />
              <span className="text-[#e67e22]">Furniture</span>{" "}
              <span className="text-amber-600">Businesses</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-lg">
              Discover the best AI tools for furniture manufacturers, retailers, and designers. Create stunning product visuals, automate catalogs, and sell more with AI.
            </p>

            {/* Stats 2×2 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { value: "40+", label: "Tools" },
                { value: "Expert", label: "Tested & Reviewed" },
                { value: "Unbiased", label: "Independent Reviews" },
                { value: "Updated", label: "Weekly" },
              ].map((s) => (
                <div key={s.label} className="bg-[#fdf2e9] rounded-2xl p-3 text-center">
                  <p className="text-lg font-extrabold text-[#e67e22]">{s.value}</p>
                  <p className="text-[11px] text-gray-500 leading-tight mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a href="#top-tools" className="inline-flex items-center gap-2 bg-[#e67e22] hover:bg-[#ca6f1e] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors shadow-md shadow-orange-100">
                Explore AI Tools →
              </a>
              <a href="#top-tools" className="inline-flex items-center gap-2 border border-gray-300 text-[#1E293B] hover:border-[#e67e22] hover:text-[#e67e22] font-semibold text-sm px-5 py-3 rounded-xl transition-colors">
                See Top Picks
              </a>
            </div>
          </div>

          {/* Right — image + floating cards + blobs */}
          <div className="flex-1 relative w-full min-h-[320px] sm:min-h-[400px]">
            <div className="absolute -top-8 -right-8 w-64 h-64 rounded-full bg-orange-200 blur-3xl opacity-40 pointer-events-none" />
            <div className="absolute -bottom-8 right-16 w-56 h-56 rounded-full bg-amber-200 blur-3xl opacity-30 pointer-events-none" />

            <div className="relative rounded-2xl overflow-hidden w-full h-[300px] sm:h-[380px]">
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80"
                alt="Furniture showroom"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Floating card — top left */}
            <div className="absolute -top-4 -left-4 sm:left-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#e67e22] flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Studio Quality</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">AI photos without the shoot.</p>
              </div>
            </div>

            {/* Floating card — bottom right */}
            <div className="absolute -bottom-4 -right-4 sm:right-2 bg-white rounded-2xl shadow-lg px-4 py-3 flex items-start gap-3 max-w-[200px]">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-[#1E293B]">Boost Sales</p>
                <p className="text-xs text-gray-400 leading-tight mt-0.5">AR try-before-you-buy.</p>
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
            Common Challenges in the Furniture Industry
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
            AI-Powered Workflow for Furniture Businesses
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            A step-by-step workflow to sell more furniture with AI
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
    setSortBy("Featured");
  }

  return (
    <section id="top-tools" className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B]">
            Top Tools for Furniture Businesses
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1E293B] pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-[#e67e22]/30 cursor-pointer"
              >
                <option>Featured</option>
                <option>Top Rated</option>
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
              <svg className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filter sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm lg:sticky lg:top-24 space-y-6">
              <CheckGroup title="Use Case" items={USE_CASES} checked={useCases} onToggle={(l) => toggle(useCases, setUseCases, l)} dotColor="bg-[#e67e22]" />
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
                  className="w-full h-1.5 accent-[#e67e22] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1.5">
                  <span>$0</span>
                  <span>${priceRange === 1000 ? "1000+" : priceRange}/month</span>
                </div>
              </div>
              <div className="border-t border-gray-100" />
              <CheckGroup title="Integrations" items={INTEGRATIONS_FILTERS} checked={integrations} onToggle={(l) => toggle(integrations, setIntegrations, l)} />
              <div className="border-t border-gray-100" />
              <button onClick={resetAll} className="w-full py-2 rounded-xl border border-gray-300 text-sm font-semibold text-gray-600 hover:border-[#e67e22] hover:text-[#e67e22] transition-colors">
                Reset Filters
              </button>
            </div>
          </div>

          {/* Tool cards */}
          <div className="lg:col-span-3 space-y-4">
            {TOP_TOOLS.map((tool) => (
              <div key={tool.name} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                {/* Rank + pricing */}
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-extrabold ${tool.rank === 1 ? "bg-amber-400 text-white" : tool.rank === 2 ? "bg-gray-400 text-white" : "bg-gray-200 text-gray-700"}`}>
                    {tool.rank}
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wide">Pricing</p>
                    <p className="text-sm font-bold text-[#1E293B]">{tool.price}</p>
                  </div>
                </div>
                {/* Logo + name + badge */}
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
                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-amber-400 text-sm">{"★".repeat(Math.floor(parseFloat(tool.rating)))}</span>
                  <span className="text-sm font-semibold text-[#1E293B]">{tool.rating}</span>
                  <span className="text-xs text-gray-400">Editorial Rating</span>
                </div>
                {/* Description */}
                <p className="text-sm text-gray-500 leading-relaxed mb-2 line-clamp-3">{tool.desc}</p>
                {/* Best For */}
                <div className="text-xs text-gray-500 mb-2">
                  <span className="font-semibold text-[#1E293B]">Best For </span>{tool.bestFor}
                </div>
                {/* Integrations */}
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
                {/* Buttons */}
                <div className="flex gap-2">
                  <a href={tool.reviewHref} className="flex-1 text-center text-xs font-semibold text-[#1E293B] border border-gray-300 rounded-lg px-3 py-2 hover:border-[#1E293B] transition-colors whitespace-nowrap">
                    Read Review →
                  </a>
                  <a href={tool.affiliateHref} className="flex-1 text-center text-xs font-semibold text-white bg-[#e67e22] hover:bg-[#ca6f1e] rounded-lg px-3 py-2 transition-colors whitespace-nowrap">
                    Visit Website →
                  </a>
                </div>
                <label className="flex items-center gap-1.5 cursor-pointer mt-2">
                  <input type="checkbox" className="w-3.5 h-3.5 rounded border-gray-300 accent-[#e67e22] cursor-pointer" />
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
              Real Results from Furniture Businesses
            </h2>
            <p className="text-gray-400 text-sm">See how brands use AI to sell more furniture</p>
          </div>
          <a href="#" className="text-sm font-semibold text-[#e67e22] hover:text-[#ca6f1e] transition-colors shrink-0">
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
                <p className="text-3xl font-extrabold text-[#e67e22] mb-0.5">{cs.stat}</p>
                <p className="text-xs text-gray-400 mb-3">{cs.label}</p>
                <p className="font-bold text-sm text-[#1E293B] mb-0.5">{cs.company}</p>
                <p className="text-xs text-gray-400 mb-3">{cs.type}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{cs.desc}</p>
                <a href="#" className="text-xs font-semibold text-[#e67e22] hover:text-[#ca6f1e] transition-colors">
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
              Best Of Furniture AI Tools
            </h2>
            <p className="text-gray-400 text-sm">Curated lists of top-performing tools</p>
          </div>
          <a href="#" className="text-sm font-semibold text-[#e67e22] hover:text-[#ca6f1e] transition-colors shrink-0">
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

export default function FurniturePage() {
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
        heading="Get Weekly AI Tools & Furniture Industry Tips"
        subtitle="Join 6,000+ furniture professionals who get AI tool reviews, ecommerce tips, and visual content ideas every week."
      />
      <Footer />
    </>
  );
}
