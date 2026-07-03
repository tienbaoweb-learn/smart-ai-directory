"use client";

import { useMemo, useState } from "react";
import ResourceCard from "../../components/ResourceCard";
import type { Comparison } from "../../../lib/comparisons-data";

const VISIBLE = 4; // one row of cards
const FILTERS = ["Newest", "Most Read", "Trending Topics"] as const;
type Filter = (typeof FILTERS)[number];

function minutesOf(readTime: string): number {
  const m = readTime.match(/(\d+)/);
  return m ? Number(m[1]) : 0;
}
function timeOf(date: string): number {
  const t = Date.parse(date);
  return Number.isNaN(t) ? 0 : t;
}

export default function FeaturedComparisons({
  comparisons,
  featBadge,
}: {
  comparisons: Comparison[];
  featBadge: Record<string, string>;
}) {
  const [filter, setFilter] = useState<Filter>("Newest");

  const sorted = useMemo(() => {
    const arr = [...comparisons];
    if (filter === "Newest") {
      arr.sort((a, b) => timeOf(b.date) - timeOf(a.date));
    } else if (filter === "Most Read") {
      arr.sort((a, b) => minutesOf(b.readTime) - minutesOf(a.readTime));
    } else if (filter === "Trending Topics") {
      arr.sort((a, b) => (b.tags?.length ?? 0) - (a.tags?.length ?? 0));
    }
    return arr;
  }, [comparisons, filter]);

  const visible = sorted.slice(0, VISIBLE);

  return (
    <section className="py-14 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B]">Featured Comparisons</h2>
            <p className="text-sm text-gray-500 mt-1">In-depth comparisons of the most popular AI tools.</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                  filter === f
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((c) => (
            <ResourceCard
              key={c.slug}
              href={c.href}
              thumbnailBgClassName="bg-gray-900"
              thumbnailExtraClassName="flex items-center justify-center gap-3"
              thumbnailContent={
                <>
                  <span className={`absolute top-2 left-2 rounded-full px-2.5 py-1 text-xs font-semibold uppercase ${featBadge[c.badge]}`}>
                    {c.badge}
                  </span>
                  <div className={`w-12 h-12 rounded-full ${c.toolA.logo.bg} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-xs font-bold">{c.toolA.logo.text}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white text-gray-900 flex items-center justify-center text-xs font-bold shrink-0">
                    vs
                  </div>
                  <div className={`w-12 h-12 rounded-full ${c.toolB.logo.bg} flex items-center justify-center shrink-0`}>
                    <span className="text-white text-xs font-bold">{c.toolB.logo.text}</span>
                  </div>
                </>
              }
              title={c.title}
              titleClassName="font-semibold text-sm text-[#1E293B]"
              description={c.description}
              descriptionClassName="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed flex-1"
              footer={<p className="text-xs text-gray-400 mt-2">Updated {c.date} • {c.readTime}</p>}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
