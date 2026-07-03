"use client";

import { useState } from "react";
import Link from "next/link";
import type { Comparison } from "../../../lib/comparisons-data";

const PAGE_SIZE = 10; // 10 rows per page

export default function LatestComparisons({ comparisons }: { comparisons: Comparison[] }) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(comparisons.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const rows = comparisons.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <>
      <div className="overflow-x-auto border border-gray-100 rounded-xl bg-white shadow-sm">
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Comparison</th>
              <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Tools</th>
              <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Key Focus</th>
              <th className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4">Updated</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.slug} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                {/* Comparison */}
                <td className="py-3 px-4">
                  <Link href={row.href} className="font-medium text-sm text-[#1E293B] hover:text-blue-600 transition-colors block">
                    {row.title}
                  </Link>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{row.description}</p>
                </td>
                {/* Tools */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-1">
                    <span className={`w-6 h-6 rounded ${row.toolA.logo.bg} flex items-center justify-center`}>
                      <span className="text-white text-[9px] font-bold">{row.toolA.logo.text}</span>
                    </span>
                    <span className={`w-6 h-6 rounded ${row.toolB.logo.bg} flex items-center justify-center`}>
                      <span className="text-white text-[9px] font-bold">{row.toolB.logo.text}</span>
                    </span>
                  </div>
                </td>
                {/* Key Focus */}
                <td className="py-3 px-4 text-xs text-gray-500 max-w-[160px]">
                  <span className="line-clamp-2">{row.focus}</span>
                </td>
                {/* Updated */}
                <td className="py-3 px-4 text-xs text-gray-400 whitespace-nowrap">{row.date} • {row.readTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination — 10 rows per page, shown when there are more than 10 comparisons */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            disabled={safePage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className={`border border-gray-300 rounded-lg px-3 py-1.5 text-sm transition-colors ${
              safePage === 1 ? "text-gray-400 opacity-50 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            ← Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                p === safePage ? "bg-blue-600 text-white" : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {p}
            </button>
          ))}
          <button
            disabled={safePage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className={`border border-gray-300 rounded-lg px-3 py-1.5 text-sm transition-colors ${
              safePage === totalPages ? "text-gray-400 opacity-50 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50"
            }`}
          >
            Next →
          </button>
        </div>
      )}
    </>
  );
}
