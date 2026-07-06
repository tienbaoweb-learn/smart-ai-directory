"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import type { Comparison } from "../../../lib/comparisons-data";

export default function ComparisonSearch({ comparisons }: { comparisons: Comparison[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return comparisons
      .filter((c) => {
        const haystack = [
          c.title,
          c.description,
          c.category,
          c.toolA.name,
          c.toolB.name,
          ...c.tags,
        ]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
      })
      .slice(0, 8);
  }, [query, comparisons]);

  const go = () => {
    if (results.length > 0) {
      router.push(results[0].href);
    }
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <div className="relative flex-1 min-w-0">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => {
              blurTimer.current = setTimeout(() => setOpen(false), 150);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") go();
              if (e.key === "Escape") setOpen(false);
            }}
            placeholder="Search comparisons (e.g. Midjourney vs DALL·E 3)"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button
          type="button"
          onClick={go}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-6 py-2.5 text-sm transition-colors shrink-0"
        >
          Search
        </button>
      </div>

      {open && query.trim() && (
        <div className="absolute z-20 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {results.length > 0 ? (
            <ul
              className="max-h-80 overflow-y-auto"
              onMouseDown={() => {
                if (blurTimer.current) clearTimeout(blurTimer.current);
              }}
            >
              {results.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={c.href}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Search size={15} className="text-gray-400 mt-0.5 shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#1E293B] truncate">{c.title}</p>
                      <p className="text-xs text-gray-500 truncate">{c.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-gray-500">
              No comparisons found for “{query.trim()}”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
