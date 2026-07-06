"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";

export interface ResourceSearchItem {
  title: string;
  description: string;
  href: string;
  type: string;
  keywords: string;
}

const TYPE_BADGE: Record<string, string> = {
  Guide: "bg-blue-50 text-blue-600",
  Tutorial: "bg-emerald-50 text-emerald-600",
  Workflow: "bg-orange-50 text-orange-500",
  Comparison: "bg-purple-50 text-purple-600",
  "Use Case": "bg-teal-50 text-teal-600",
};

export default function ResourceSearch({ items }: { items: ResourceSearchItem[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const blurTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items
      .filter((it) => it.keywords.includes(q))
      .slice(0, 8);
  }, [query, items]);

  const go = () => {
    if (results.length > 0) router.push(results[0].href);
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
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
          placeholder="Search resources (e.g. ChatGPT tutorial, workflows, automation...)"
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
        />
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
              {results.map((it) => (
                <li key={it.href}>
                  <Link
                    href={it.href}
                    className="flex items-start gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    <Search size={15} className="text-gray-400 mt-0.5 shrink-0" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-[#1E293B] truncate">{it.title}</p>
                        <span
                          className={`shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded ${
                            TYPE_BADGE[it.type] ?? "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {it.type}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">{it.description}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="px-4 py-3 text-sm text-gray-500">
              No resources found for “{query.trim()}”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
