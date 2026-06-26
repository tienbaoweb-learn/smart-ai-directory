"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Clock, Tag, Zap, FileText, GitCompare, Star, Hash } from "lucide-react";
import Navbar from "../../components/Navbar";
import Newsletter from "../../components/Newsletter";
import Footer from "../../components/Footer";
import { tagsData } from "@/lib/tags-data";
import { caseStudiesData } from "@/lib/case-studies-data";
import { guidesData } from "@/lib/guides-data";
import { tutorialsData } from "@/lib/tutorials-data";
import { comparisonsData } from "@/lib/comparisons-data";
import { workflowsData } from "@/lib/workflows-data";
import { aiToolCards } from "@/lib/ai-tools-data";
import { TOOL_LOGO_URLS } from "../../data/tool-logos";

export default function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = React.use(params);

  const tag = tagsData.find((t) => t.slug === slug);
  const tagName = tag?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const relatedTools       = aiToolCards.filter((t) => t.tags.includes(slug));
  const relatedGuides      = guidesData.filter((g) => g.tags.includes(slug));
  const relatedTutorials   = tutorialsData.filter((t) => t.tags.includes(slug));
  const relatedCaseStudies = caseStudiesData.filter((c) => c.tags.includes(slug));
  const relatedComparisons = comparisonsData.filter((c) => c.tags.includes(slug));
  const relatedWorkflows   = workflowsData.filter((w) => w.tags.includes(slug));

  const totalCount =
    relatedTools.length +
    relatedGuides.length +
    relatedTutorials.length +
    relatedCaseStudies.length +
    relatedComparisons.length +
    relatedWorkflows.length;

  const hasContent = totalCount > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-orange-500">Home</Link>
            <span>/</span>
            <Link href="/tags" className="hover:text-orange-500">Tags</Link>
            <span>/</span>
            <span className="text-gray-900">{tagName}</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <Hash className="w-5 h-5 text-orange-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{tagName}</h1>
            {tag?.isTrending && (
              <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2.5 py-1 rounded-full">
                Trending
              </span>
            )}
          </div>
          {tag?.description && (
            <p className="text-gray-600 max-w-2xl">{tag.description}</p>
          )}
          <p className="mt-2 text-sm text-gray-500">
            {totalCount} resource{totalCount !== 1 ? "s" : ""} tagged with &ldquo;{tagName}&rdquo;
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">

        {/* AI Tools */}
        {relatedTools.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900">AI Tools</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {relatedTools.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={tool.affiliateHref}
                  className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-3">
                    {TOOL_LOGO_URLS[tool.slug] ? (
                      <img
                        src={TOOL_LOGO_URLS[tool.slug]}
                        alt={tool.name}
                        className="w-10 h-10 rounded-xl object-contain bg-white border border-gray-100"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-xl ${tool.logo.bg} flex items-center justify-center text-white font-bold text-sm`}>
                        {tool.logo.text}
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">{tool.name}</div>
                      <div className="text-xs text-gray-500">{tool.category}</div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2">{tool.shortDesc}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-gray-500">{tool.pricing}</span>
                    <div className="flex items-center gap-1 text-xs text-orange-500 font-medium">
                      <Star className="w-3 h-3 fill-orange-400 stroke-orange-400" />
                      {tool.editorialRating}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Guides */}
        {relatedGuides.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <h2 className="text-xl font-bold text-gray-900">Guides</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {relatedGuides.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedGuides.map((guide) => (
                <Link
                  key={guide.slug}
                  href={guide.href}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-36 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <BookOpen className="w-10 h-10 text-blue-300" />
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded mb-2">
                      {guide.badge}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">{guide.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{guide.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{guide.readTime}</span>
                      <span>·</span>
                      <span>{guide.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Tutorials */}
        {relatedTutorials.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl font-bold text-gray-900">Tutorials</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {relatedTutorials.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedTutorials.map((tutorial) => (
                <Link
                  key={tutorial.slug}
                  href={tutorial.href}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-36 bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center">
                    <FileText className="w-10 h-10 text-emerald-300" />
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded mb-2">
                      {tutorial.badge}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">{tutorial.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{tutorial.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span>{tutorial.duration}</span>
                      <span>·</span>
                      <span>{tutorial.steps} steps</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Tag className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl font-bold text-gray-900">Case Studies</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {relatedCaseStudies.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedCaseStudies.map((cs) => (
                <Link
                  key={cs.slug}
                  href={cs.href}
                  className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-36 bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-xl ${cs.company.logo.bg} flex items-center justify-center text-white font-bold`}>
                      {cs.company.logo.text}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded mb-2">
                      {cs.badge}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">{cs.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2">{cs.description}</p>
                    <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                      <span>{cs.company.name}</span>
                      <span>·</span>
                      <span>{cs.readTime}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comparisons */}
        {relatedComparisons.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <GitCompare className="w-5 h-5 text-orange-500" />
              <h2 className="text-xl font-bold text-gray-900">Comparisons</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {relatedComparisons.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedComparisons.map((comp) => (
                <Link
                  key={comp.slug}
                  href={comp.href}
                  className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <span className="inline-block bg-orange-100 text-orange-700 text-xs font-semibold px-2 py-0.5 rounded mb-3">
                    {comp.badge}
                  </span>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-9 h-9 rounded-lg ${comp.toolA.logo.bg} flex items-center justify-center text-white font-bold text-xs`}>
                      {comp.toolA.logo.text}
                    </div>
                    <span className="text-gray-400 font-semibold text-sm">vs</span>
                    <div className={`w-9 h-9 rounded-lg ${comp.toolB.logo.bg} flex items-center justify-center text-white font-bold text-xs`}>
                      {comp.toolB.logo.text}
                    </div>
                    <div className="ml-2">
                      <div className="text-xs font-semibold text-gray-900">{comp.toolA.name} vs {comp.toolB.name}</div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">{comp.title}</h3>
                  <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{comp.readTime}</span>
                    <span>·</span>
                    <span>{comp.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Workflows */}
        {relatedWorkflows.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-teal-500" />
              <h2 className="text-xl font-bold text-gray-900">Workflows</h2>
              <span className="bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
                {relatedWorkflows.length}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedWorkflows.map((wf) => (
                <Link
                  key={wf.slug}
                  href={wf.href}
                  className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow"
                >
                  <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold px-2 py-0.5 rounded mb-3">
                    {wf.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-2">{wf.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-3">{wf.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{wf.steps} steps</span>
                    <span>·</span>
                    <span>{wf.toolCount} tools</span>
                    <span>·</span>
                    <Clock className="w-3 h-3" />
                    <span>{wf.duration}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Empty state */}
        {!hasContent && (
          <div className="text-center py-24">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Hash className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No resources yet</h2>
            <p className="text-gray-500 mb-6">
              We haven&apos;t tagged any content with &ldquo;{tagName}&rdquo; yet. Check back soon!
            </p>
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Browse all resources
            </Link>
          </div>
        )}
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}
