"use client";

import React from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

// ─── DATA ────────────────────────────────────────────────────────────────────

const INDUSTRIES = [
  {
    id: "furniture",
    label: "Furniture",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    iconSrc: "/icons/furniture.svg",
    toolCount: 35,
    guideCount: 12,
    workflowCount: 8,
    desc: "AI tools for furniture designers, retailers, and manufacturers.",
    btnClass: "bg-emerald-600 hover:bg-emerald-700",
    iconBg: "bg-emerald-100",
    titleColor: "text-emerald-700",
  },
  {
    id: "architecture",
    label: "Architecture",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80",
    iconSrc: "/icons/architecture.svg",
    toolCount: 28,
    guideCount: 10,
    workflowCount: 7,
    desc: "AI tools for architects, designers, and planning professionals.",
    btnClass: "bg-blue-600 hover:bg-blue-700",
    iconBg: "bg-blue-100",
    titleColor: "text-blue-700",
  },
  {
    id: "construction",
    label: "Construction",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80",
    iconSrc: "/icons/construction.svg",
    toolCount: 24,
    guideCount: 9,
    workflowCount: 6,
    desc: "AI tools for contractors, project managers, and builders.",
    btnClass: "bg-orange-500 hover:bg-orange-600",
    iconBg: "bg-orange-100",
    titleColor: "text-orange-600",
  },
  {
    id: "realestate",
    label: "Real Estate",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    iconSrc: "/icons/realestate.svg",
    toolCount: 31,
    guideCount: 11,
    workflowCount: 9,
    desc: "AI tools for agents, brokers, and property managers.",
    btnClass: "bg-purple-600 hover:bg-purple-700",
    iconBg: "bg-purple-100",
    titleColor: "text-purple-700",
  },
];

const CHALLENGES = [
  {
    industry: "Furniture Businesses",
    iconSrc: "/icons/furniture.svg",
    iconBg: "bg-emerald-100",
    points: [
      "High cost of product visualization",
      "Time-consuming content creation",
      "Managing large product catalogs",
      "Generating quality leads",
    ],
  },
  {
    industry: "Architecture Firms",
    iconSrc: "/icons/architecture.svg",
    iconBg: "bg-blue-100",
    points: [
      "Time-consuming concept design",
      "Complex 3D rendering processes",
      "Manual documentation workload",
      "Client presentation challenges",
    ],
  },
  {
    industry: "Construction Companies",
    iconSrc: "/icons/construction.svg",
    iconBg: "bg-orange-100",
    points: [
      "Project delays and cost overruns",
      "Lack of real-time site visibility",
      "Inaccurate progress tracking",
      "Manual reporting and paperwork",
    ],
  },
  {
    industry: "Real Estate Professionals",
    iconSrc: "/icons/realestate.svg",
    iconBg: "bg-purple-100",
    points: [
      "Finding and qualifying leads",
      "Creating engaging property listings",
      "Time-consuming virtual staging",
      "Following up with prospects",
    ],
  },
];

const WORKFLOWS = [
  {
    industry: "Furniture Workflow",
    titleColor: "text-emerald-600",
    linkColor: "text-emerald-600 hover:text-emerald-700",
    stepBg: "bg-emerald-50 border-emerald-200",
    stepColor: "text-emerald-600",
    steps: [
      { emoji: "✏️", label: "Design" },
      { emoji: "🖥️", label: "Render" },
      { emoji: "📢", label: "Market" },
      { emoji: "💰", label: "Sell" },
    ],
    tagline: "From idea to customer with AI-powered tools.",
    link: "Explore Furniture",
  },
  {
    industry: "Architecture Workflow",
    titleColor: "text-blue-600",
    linkColor: "text-blue-600 hover:text-blue-700",
    stepBg: "bg-blue-50 border-blue-200",
    stepColor: "text-blue-600",
    steps: [
      { emoji: "💡", label: "Concept" },
      { emoji: "🏗️", label: "BIM" },
      { emoji: "🖥️", label: "Visualize" },
      { emoji: "📊", label: "Present" },
    ],
    tagline: "Design smarter. Present with impact.",
    link: "Explore Architecture",
  },
  {
    industry: "Construction Workflow",
    titleColor: "text-orange-500",
    linkColor: "text-orange-500 hover:text-orange-600",
    stepBg: "bg-orange-50 border-orange-200",
    stepColor: "text-orange-500",
    steps: [
      { emoji: "📋", label: "Plan" },
      { emoji: "👁️", label: "Monitor" },
      { emoji: "📈", label: "Track" },
      { emoji: "📄", label: "Report" },
    ],
    tagline: "Build better with real-time AI insights.",
    link: "Explore Construction",
  },
  {
    industry: "Real Estate Workflow",
    titleColor: "text-purple-600",
    linkColor: "text-purple-600 hover:text-purple-700",
    stepBg: "bg-purple-50 border-purple-200",
    stepColor: "text-purple-600",
    steps: [
      { emoji: "👥", label: "Leads" },
      { emoji: "📋", label: "Listings" },
      { emoji: "🏠", label: "Staging" },
      { emoji: "🤝", label: "Close" },
    ],
    tagline: "Attract leads. Close deals. Grow faster.",
    link: "Explore Real Estate",
  },
];

const TOP_TOOLS = [
  {
    name: "Midjourney",
    desc: "AI image generation for designs",
    logo: "🎨",
    logoBg: "bg-slate-800",
    logoIsText: false,
    industries: ["furniture", "architecture", "construction", "realestate"],
  },
  {
    name: "ChatGPT",
    desc: "AI assistant for writing and research",
    logo: "GP",
    logoBg: "bg-[#10A37F]",
    logoIsText: true,
    logoClass: "text-white font-black text-sm",
    industries: ["furniture", "architecture", "construction", "realestate"],
  },
  {
    name: "D5 Render",
    desc: "Real-time rendering for 3D",
    logo: "D5",
    logoBg: "bg-purple-600",
    logoIsText: true,
    logoClass: "text-white font-black text-sm",
    industries: ["furniture", "architecture"],
  },
  {
    name: "Notion AI",
    desc: "AI powered docs and knowledge",
    logo: "N",
    logoBg: "bg-white border border-gray-200",
    logoIsText: true,
    logoClass: "text-gray-900 font-black text-xl",
    industries: ["furniture", "architecture", "construction", "realestate"],
  },
  {
    name: "Canva AI",
    desc: "AI powered content creation",
    logo: "C",
    logoBg: "bg-[#0CC0DF]",
    logoIsText: true,
    logoClass: "text-white font-black text-xl",
    industries: ["furniture", "architecture", "construction", "realestate"],
  },
  {
    name: "Buildots",
    desc: "AI construction analytics",
    logo: "B",
    logoBg: "bg-amber-500",
    logoIsText: true,
    logoClass: "text-white font-black text-xl",
    industries: ["construction", "furniture", "realestate"],
  },
  {
    name: "REimagineHome",
    desc: "AI virtual staging and design",
    logo: "R",
    logoBg: "bg-[#FF6B6B]",
    logoIsText: true,
    logoClass: "text-white font-black text-xl",
    industries: ["realestate", "furniture", "architecture"],
  },
];

const CASE_STUDIES = [
  {
    stat: "+70%",
    statColor: "text-emerald-500",
    desc: "Increase in product engagement",
    company: "Modern Wood Co.",
    type: "Furniture Retailer",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
  },
  {
    stat: "-60%",
    statColor: "text-blue-500",
    desc: "Reduction in concept design time",
    company: "Design Forward Studio",
    type: "Architecture Firm",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80",
  },
  {
    stat: "-20%",
    statColor: "text-orange-500",
    desc: "Decrease in project delays",
    company: "BuildWell Construction",
    type: "Construction Company",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80",
  },
  {
    stat: "+40%",
    statColor: "text-purple-500",
    desc: "More qualified leads",
    company: "PropertyMax Realty",
    type: "Real Estate Agency",
    img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80",
  },
];

const BEST_OF = [
  { industry: "Furniture", iconSrc: "/icons/furniture.svg", count: 12, iconBg: "bg-emerald-100" },
  { industry: "Architecture", iconSrc: "/icons/architecture.svg", count: 10, iconBg: "bg-blue-100" },
  { industry: "Construction", iconSrc: "/icons/construction.svg", count: 10, iconBg: "bg-orange-100" },
  { industry: "Real Estate", iconSrc: "/icons/realestate.svg", count: 12, iconBg: "bg-purple-100" },
];

// ─── WORKFLOW ICONS ───────────────────────────────────────────────────────────

const WORKFLOW_ICONS: Record<string, React.ReactNode> = {
  Design: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487z" />
    </svg>
  ),
  Render: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
    </svg>
  ),
  Market: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" />
    </svg>
  ),
  Sell: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
    </svg>
  ),
  Concept: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
    </svg>
  ),
  BIM: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  ),
  Visualize: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  Present: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
    </svg>
  ),
  Plan: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
    </svg>
  ),
  Monitor: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
  ),
  Track: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  Report: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  Leads: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
  ),
  Listings: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  Staging: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  ),
  Close: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

// ─── HERO ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="bg-white pt-8 pb-10 sm:pt-12 sm:pb-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12">
          {/* ── Left ── */}
          <div className="w-full lg:w-[42%] lg:shrink-0">
            <span className="inline-block text-xs font-bold tracking-widest uppercase mb-4 text-[#0EA5E9] bg-sky-50 border border-sky-200 rounded-full px-4 py-1.5">
              AI Solutions for Every Industry
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#1E293B] leading-tight mb-3">
              AI Tools{" "}
              <span className="text-[#F97316]">
                by Industry
              </span>
            </h1>
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-5 max-w-md">
              Explore AI tools, workflows, and best practices customized for your industry. Solve problems, save time, and grow your business with AI.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 mb-5">
              <a
                href="#explore"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm shadow-md shadow-blue-100"
              >
                Explore Industries →
              </a>
              <a
                href="/ai-tools"
                className="inline-flex items-center gap-2 border-2 border-gray-200 text-[#1E293B] hover:border-blue-300 hover:text-blue-600 font-semibold px-6 py-3 rounded-xl transition-colors text-sm bg-white"
              >
                View Best AI Tools →
              </a>
            </div>

            {/* Stat badges */}
            <div className="grid grid-cols-4 gap-3 sm:flex sm:flex-wrap sm:gap-6">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                    </svg>
                  ),
                  value: "4",
                  label: "Industries",
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                    </svg>
                  ),
                  value: "120+",
                  label: "Curated Tools",
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                    </svg>
                  ),
                  value: "50+",
                  label: "Workflows",
                },
                {
                  icon: (
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  ),
                  value: "300+",
                  label: "Case Studies",
                },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  {s.icon}
                  <div>
                    <p className="text-sm font-extrabold text-[#1E293B] leading-none">{s.value}</p>
                    <p className="text-xs text-gray-500 leading-none mt-0.5">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — 2×2 on mobile / 4 cols on desktop ── */}
          <div className="w-full lg:flex-1">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {INDUSTRIES.map((ind) => (
                <a
                  key={ind.id}
                  href={`#${ind.id}`}
                  className="relative rounded-2xl overflow-hidden group h-[150px] sm:h-[200px] lg:h-[390px] cursor-pointer block"
                >
                  <Image
                    src={ind.img}
                    alt={ind.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  {/* Icon circle — top center */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2">
                    <div className={`w-9 h-9 rounded-full ${ind.iconBg} flex items-center justify-center shadow-md`}>
                      <Image src={ind.iconSrc} alt={ind.label} width={22} height={22} />
                    </div>
                  </div>
                  {/* Bottom overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 pr-8">
                    <p className="text-white font-bold text-sm leading-tight">{ind.label}</p>
                    <p className="text-white/75 text-xs">{ind.toolCount} Tools</p>
                  </div>
                  {/* Plus badge */}
                  <div className="absolute bottom-3 right-3 w-5 h-5 rounded-full bg-white/25 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold leading-none">
                    +
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CHALLENGES ───────────────────────────────────────────────────────────────

function ChallengesSection() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-2">
            Common Business Challenges AI Can Solve
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Across different industries, AI helps solve critical problems and unlock new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {CHALLENGES.map((c) => (
            <div key={c.industry} className="bg-white rounded-2xl p-3 sm:p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-xl ${c.iconBg} flex items-center justify-center shrink-0`}>
                  <Image src={c.iconSrc} alt={c.industry} width={22} height={22} />
                </div>
                <p className="font-bold text-[#1E293B] text-sm leading-tight">{c.industry}</p>
              </div>
              <ul className="space-y-2">
                {c.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-xs text-gray-500">
                    <svg className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WORKFLOWS ────────────────────────────────────────────────────────────────

function WorkflowsSection() {
  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-2">
            Industry Workflows Enhanced by AI
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            See how AI fits into key workflows to streamline operations and drive results.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {WORKFLOWS.map((wf) => (
            <div key={wf.industry} className="bg-white rounded-2xl p-3 sm:p-5 border border-gray-100 shadow-sm">
              <p className={`font-bold text-xs sm:text-sm mb-3 sm:mb-4 ${wf.titleColor}`}>{wf.industry}</p>

              {/* Steps row with labels */}
              <div className="flex items-start gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                {wf.steps.map((step, i) => (
                  <div key={step.label} className="flex items-start gap-0.5 sm:gap-1">
                    <div className="flex flex-col items-center gap-1">
                      <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center shrink-0 ${wf.stepBg} ${wf.stepColor}`}>
                        {WORKFLOW_ICONS[step.label]}
                      </div>
                      <p className="text-[8px] sm:text-[9px] text-gray-400 text-center leading-tight w-6 sm:w-8">{step.label}</p>
                    </div>
                    {i < wf.steps.length - 1 && (
                      <svg className="w-2 h-2 sm:w-3 sm:h-3 text-gray-300 shrink-0 mt-2 sm:mt-2.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-500 mb-3 leading-relaxed">{wf.tagline}</p>
              <a href="#explore" className={`text-xs font-semibold ${wf.linkColor} transition-colors`}>
                {wf.link} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPLORE INDUSTRIES ───────────────────────────────────────────────────────

function ExploreSection() {
  return (
    <section id="explore" className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1E293B] mb-2">
            Explore AI Solutions for Your Industry
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Choose your industry to discover curated tools, workflows, guides, and case studies.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {INDUSTRIES.map((ind) => (
            <div key={ind.id} id={ind.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              {/* Image */}
              <div className="relative h-28 sm:h-40 w-full">
                <Image
                  src={ind.img}
                  alt={ind.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Icon circle overlapping image bottom-left */}
                <div className={`absolute -bottom-4 left-4 w-10 h-10 rounded-full ${ind.iconBg} border-2 border-white flex items-center justify-center shadow-md z-10`}>
                  <Image src={ind.iconSrc} alt={ind.label} width={22} height={22} />
                </div>
              </div>

              {/* Content */}
              <div className="pt-7 px-4 pb-4">
                <p className="font-extrabold text-[#1E293B] text-base mb-1">{ind.label}</p>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">{ind.desc}</p>

                {/* Mini stats */}
                <div className="grid grid-cols-3 gap-2 mb-4 border-t border-gray-100 pt-3">
                  {[
                    { label: "Tools", value: ind.toolCount },
                    { label: "Guides", value: ind.guideCount },
                    { label: "Workflows", value: ind.workflowCount },
                  ].map((s) => (
                    <div key={s.label} className="text-center">
                      <p className="font-extrabold text-[#1E293B] text-sm leading-none">{s.value}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                <a
                  href={`/ai-tools?industry=${ind.id}`}
                  className={`block w-full text-center text-white text-sm font-semibold py-2.5 rounded-xl transition-colors ${ind.btnClass}`}
                >
                  Explore {ind.label} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TOP TOOLS ────────────────────────────────────────────────────────────────

function TopToolsSection() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
              Top Recommended AI Tools Across Industries
            </h2>
            <p className="text-gray-500 text-sm mt-1">Popular tools used by professionals in multiple industries.</p>
          </div>
          <a href="/ai-tools" className="text-sm font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0 ml-4">
            View all tools →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {TOP_TOOLS.map((tool) => (
            <div
              key={tool.name}
              className="bg-white border border-gray-100 rounded-xl p-3 shadow-sm hover:shadow-md hover:border-gray-200 transition-all"
            >
              <div className={`w-10 h-10 rounded-lg ${tool.logoBg} flex items-center justify-center mb-2 shrink-0`}>
                {tool.logoIsText ? (
                  <span className={tool.logoClass ?? "text-white font-black text-sm"}>{tool.logo}</span>
                ) : (
                  <span className="text-base">{tool.logo}</span>
                )}
              </div>
              <p className="text-sm font-bold text-[#1E293B] mb-1">{tool.name}</p>
              <p className="text-xs text-gray-500 line-clamp-2 mb-2">{tool.desc}</p>
              <p className="text-xs text-gray-400 mb-1">Used in:</p>
              <div className="flex gap-1">
                {tool.industries.map((ind) => (
                  <Image key={ind} src={`/icons/${ind}.svg`} alt={ind} width={14} height={14} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CASE STUDIES ─────────────────────────────────────────────────────────────

function CaseStudiesSection() {
  return (
    <section className="py-8 sm:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">
              Real Results from AI-Powered Businesses
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              See how companies in different industries are achieving measurable results.
            </p>
          </div>
          <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0 ml-4">
            View all case studies →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {CASE_STUDIES.map((cs) => (
            <div
              key={cs.company}
              className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-row h-[100px] sm:h-[120px]"
            >
              {/* Image — fixed left column */}
              <div className="relative w-[70px] sm:w-[100px] shrink-0 h-full">
                <Image src={cs.img} alt={cs.company} fill className="object-cover" />
              </div>
              {/* Text */}
              <div className="p-2 sm:p-3 flex-1 flex flex-col justify-center min-w-0">
                <p className={`text-lg sm:text-2xl font-extrabold leading-none mb-1 ${cs.statColor}`}>{cs.stat}</p>
                <p className="text-[11px] text-gray-600 leading-snug mb-2">{cs.desc}</p>
                <p className="text-[11px] font-bold text-[#1E293B] truncate">{cs.company}</p>
                <p className="text-[10px] text-gray-400">{cs.type}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── BEST OF ──────────────────────────────────────────────────────────────────

function BestOfSection() {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1E293B]">Best Of AI Tools by Industry</h2>
            <p className="text-gray-500 text-sm mt-1">Curated lists of the best-performing AI tools for each industry.</p>
          </div>
          <a href="/ai-tools" className="text-sm font-semibold text-blue-600 hover:text-blue-700 whitespace-nowrap shrink-0 ml-4">
            View all Best Of lists →
          </a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {BEST_OF.map((b) => (
            <a
              key={b.industry}
              href={`/ai-tools?industry=${b.industry.toLowerCase().replace(" ", "")}`}
              className="flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-200 transition-all group"
            >
              <div className={`w-12 h-12 rounded-2xl ${b.iconBg} flex items-center justify-center shrink-0`}>
                <Image src={b.iconSrc} alt={b.industry} width={28} height={28} />
              </div>
              <div>
                <p className="font-bold text-[#1E293B] text-sm leading-tight">
                  Best AI Tools<br />for {b.industry}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{b.count} Tools</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function IndustriesPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ChallengesSection />
        <WorkflowsSection />
        <ExploreSection />
        <TopToolsSection />
        <CaseStudiesSection />
        <BestOfSection />
      </main>
      <Newsletter />
      <Footer />
    </>
  );
}
