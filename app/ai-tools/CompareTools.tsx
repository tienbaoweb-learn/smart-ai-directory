"use client";

import { useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { AITool } from "../data/tools";
import { TOOL_LOGO_URLS } from "../data/tool-logos";

const MAX_SELECT = 3;

// ── Small logo helper (image from review page, fallback to colored box) ──────────
function ToolLogo({ tool, size = 48 }: { tool: AITool; size?: number }) {
  const dim = { width: size, height: size };
  if (TOOL_LOGO_URLS[tool.slug]) {
    return (
      <div
        className="rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden p-1 shrink-0"
        style={{ width: size, height: size }}
      >
        <Image
          src={TOOL_LOGO_URLS[tool.slug]}
          alt={tool.name}
          {...dim}
          className="object-contain w-full h-full"
        />
      </div>
    );
  }
  return (
    <div
      className={`rounded-xl ${tool.logoBg} flex items-center justify-center shrink-0`}
      style={{ width: size, height: size }}
    >
      <span className={tool.logoTextClass}>{tool.logoText}</span>
    </div>
  );
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          className={`w-3.5 h-3.5 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function CompareTools({ tools }: { tools: AITool[] }) {
  const [selected, setSelected] = useState<AITool[]>([]);
  const [pickerSlot, setPickerSlot] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  // Trending pairs auto-built from the top-rated tools in this category.
  const trendingPairs = useMemo(() => {
    const ranked = [...tools].sort((a, b) => b.rating - a.rating).slice(0, 6);
    const pairs: [AITool, AITool][] = [];
    for (let i = 0; i + 1 < ranked.length && pairs.length < 3; i += 2) {
      pairs.push([ranked[i], ranked[i + 1]]);
    }
    return pairs;
  }, [tools]);

  const selectedSlugs = new Set(selected.map((t) => t.slug));
  const available = tools.filter((t) => !selectedSlugs.has(t.slug));

  function addTool(tool: AITool) {
    setSelected((prev) =>
      prev.length >= MAX_SELECT || prev.some((t) => t.slug === tool.slug)
        ? prev
        : [...prev, tool],
    );
    setPickerSlot(null);
    setShowResult(false);
  }

  function removeTool(slug: string) {
    setSelected((prev) => prev.filter((t) => t.slug !== slug));
    setShowResult(false);
  }

  function compareNow(pair?: [AITool, AITool]) {
    if (pair) setSelected(pair);
    setShowResult(true);
    // Defer scroll until the table renders.
    requestAnimationFrame(() =>
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  const slots = Array.from({ length: MAX_SELECT }, (_, i) => selected[i] ?? null);
  const canCompare = selected.length >= 2;

  const rows: { label: string; render: (t: AITool) => React.ReactNode }[] = [
    {
      label: "Rating",
      render: (t) => (
        <div className="flex flex-col items-center gap-1">
          <StarRow rating={t.rating} />
          <span className="text-sm font-bold text-[#1E293B]">{t.rating}</span>
        </div>
      ),
    },
    {
      label: "Pricing",
      render: (t) => (
        <div>
          <span
            className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
              t.pricing === "Freemium"
                ? "bg-green-50 text-green-700"
                : t.pricing === "Free"
                  ? "bg-teal-50 text-teal-700"
                  : "bg-blue-50 text-blue-700"
            }`}
          >
            {t.pricing}
          </span>
          <p className="text-xs text-gray-500 mt-1">{t.pricingDetail}</p>
        </div>
      ),
    },
    { label: "Best For", render: (t) => <span className="text-xs text-gray-600">{t.bestFor}</span> },
    {
      label: "Key Features",
      render: (t) => <span className="text-xs text-gray-600 leading-relaxed">{t.keyFeatures}</span>,
    },
    {
      label: "Industries",
      render: (t) => (
        <span className="text-xs text-gray-600 capitalize">{t.industries.join(", ")}</span>
      ),
    },
    {
      label: "",
      render: (t) =>
        t.hasReview ? (
          <Link
            href={`/tools/${t.slug}`}
            className="inline-block text-xs font-semibold border border-gray-200 text-gray-600 hover:border-gray-300 px-3 py-1.5 rounded-lg transition-colors"
          >
            Read Review →
          </Link>
        ) : (
          <a
            href={t.affiliateHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs font-semibold bg-[#2B7FFF] hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Visit Website →
          </a>
        ),
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-gray-100 rounded-2xl overflow-hidden">
          {/* ── Header bar ── */}
          <div className="bg-gray-50 rounded-t-2xl px-6 py-4 flex items-center gap-3 border-b border-gray-100">
            <div className="w-9 h-9 rounded-xl bg-teal-50 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
              </svg>
            </div>
            <h2 className="font-extrabold text-[#1E293B] text-base sm:text-lg leading-snug">
              Compare AI Tools: Find the Right Fit for Your Needs
            </h2>
          </div>

          <div className="p-6 bg-white">
            {/* ── Tool selector row ── */}
            <p className="text-sm font-semibold text-[#1E293B] mb-3">
              Add up to {MAX_SELECT} AI tools to compare
            </p>
            <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-3 gap-4 mb-4">
              {slots.map((tool, i) => (
                <div key={i} className="relative flex flex-col items-center gap-1.5">
                  {tool ? (
                    <>
                      <ToolLogo tool={tool} size={56} />
                      <span className="text-xs font-semibold text-[#1E293B] text-center leading-tight line-clamp-1">
                        {tool.name}
                      </span>
                      <button
                        onClick={() => removeTool(tool.slug)}
                        className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setPickerSlot(pickerSlot === i ? null : i)}
                        disabled={available.length === 0}
                        className="w-14 h-14 rounded-full border-2 border-dashed border-gray-300 hover:border-[#F97316] flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed group"
                      >
                        <span className="text-gray-400 group-hover:text-[#F97316] text-2xl leading-none transition-colors">
                          +
                        </span>
                      </button>
                      <span className="text-xs text-gray-400">+ Add tool</span>

                      {/* Picker dropdown */}
                      {pickerSlot === i && (
                        <div className="absolute top-16 z-20 w-56 max-h-64 overflow-y-auto bg-white border border-gray-200 rounded-xl shadow-lg p-1">
                          {available.map((t) => (
                            <button
                              key={t.slug}
                              onClick={() => addTool(t)}
                              className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 text-left transition-colors"
                            >
                              <ToolLogo tool={t} size={28} />
                              <span className="text-xs font-medium text-[#1E293B] truncate">{t.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* ── Compare button ── */}
            <div className="flex justify-end mb-8">
              <button
                onClick={() => compareNow()}
                disabled={!canCompare}
                className="bg-gradient-to-r from-[#F97316] to-orange-500 hover:opacity-90 text-white font-semibold px-6 py-2.5 rounded-full text-sm transition-opacity shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Compare AI Tools
              </button>
            </div>

            {/* ── Comparison result table ── */}
            {showResult && canCompare && (
              <div ref={resultRef} className="mb-10 scroll-mt-24">
                <h3 className="font-bold text-[#1E293B] text-base mb-4">Comparison Result</h3>
                <div className="overflow-x-auto border border-gray-100 rounded-xl">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide w-32">
                          Tool
                        </th>
                        {selected.map((t) => (
                          <th key={t.slug} className="px-4 py-3 text-center">
                            <div className="flex flex-col items-center gap-1.5">
                              <ToolLogo tool={t} size={44} />
                              <span className="text-sm font-bold text-[#1E293B]">{t.name}</span>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {rows.map((row, ri) => (
                        <tr key={ri} className="align-top">
                          <td className="px-4 py-3 text-xs font-semibold text-gray-500">{row.label}</td>
                          {selected.map((t) => (
                            <td key={t.slug} className="px-4 py-3 text-center">
                              {row.render(t)}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ── Trending comparisons ── */}
            {trendingPairs.length > 0 && (
              <>
                <h3 className="font-bold text-[#1E293B] text-base mb-4">
                  Today&apos;s Trending AI Tools: A Comparison
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {trendingPairs.map(([a, b]) => (
                    <div key={`${a.slug}-${b.slug}`} className="bg-gray-50 rounded-xl overflow-hidden flex flex-col">
                      <div className="flex items-center justify-center gap-4 p-6 flex-1">
                        <div className="flex flex-col items-center gap-2">
                          <ToolLogo tool={a} size={48} />
                          <span className="text-xs font-semibold text-[#1E293B] text-center leading-tight">{a.name}</span>
                        </div>
                        <div className="w-7 h-7 text-[10px] rounded-full bg-[#1E293B] flex items-center justify-center shrink-0">
                          <span className="text-white font-bold">vs</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <ToolLogo tool={b} size={48} />
                          <span className="text-xs font-semibold text-[#1E293B] text-center leading-tight">{b.name}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => compareNow([a, b])}
                        className="w-full bg-gradient-to-r from-[#F97316] to-orange-500 hover:opacity-90 text-white font-semibold py-3 text-sm transition-opacity"
                      >
                        Compare AI&apos;s
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
