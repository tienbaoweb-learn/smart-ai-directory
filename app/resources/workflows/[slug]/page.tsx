import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Briefcase,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  HelpCircle,
  Lightbulb,
  ListOrdered,
  PenTool,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";

import Navbar from "../../../components/Navbar";
import Newsletter from "../../../components/Newsletter";
import Footer from "../../../components/Footer";
import {
  workflowsData,
  getWorkflowBySlug,
  workflowToolLogoUrl,
  WORKFLOW_TOOLS,
  type Workflow,
  type WorkflowStep,
} from "../../../../lib/workflows-data";
import { getComparisonBySlug } from "../../../../lib/comparisons";
import { getToolBySlug } from "../../../../lib/tools";

const SITE = "https://www.smartaiforwork.com";

// Industry → Best Of hub (for the "up" link).
const INDUSTRY_HUBS: Record<string, { label: string; href: string }> = {
  architecture: { label: "Architecture", href: "/best-of/architecture" },
  construction: { label: "Construction", href: "/best-of/construction" },
  "interior-design": { label: "Interior Design", href: "/best-of/interior-design" },
  realestate: { label: "Real Estate", href: "/best-of/real-estate" },
  "real-estate": { label: "Real Estate", href: "/best-of/real-estate" },
  furniture: { label: "Furniture", href: "/industries/furniture" },
};

// A step's display name, whether it's a registry tool, a named-only tool, or manual.
function stepToolName(s: WorkflowStep): string {
  if (s.toolSlug) return WORKFLOW_TOOLS[s.toolSlug].name;
  if (s.toolName) return s.toolName;
  return "Manual step";
}

// ── Static params + metadata ───────────────────────────────────────────────────

export async function generateStaticParams() {
  return workflowsData.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const wf = getWorkflowBySlug(slug);
  if (!wf) return { title: "Workflow Not Found" };
  return {
    title: `${wf.title} | SmartAI for Work`,
    description: wf.description,
    alternates: { canonical: `/resources/workflows/${slug}` },
    openGraph: {
      title: wf.title,
      description: wf.description,
      type: "article",
      url: `${SITE}/resources/workflows/${slug}`,
    },
  };
}

// ── Tool logo chip ──────────────────────────────────────────────────────────────

function ToolLogo({ slug, size = "md" }: { slug: keyof typeof WORKFLOW_TOOLS; size?: "sm" | "md" }) {
  const t = WORKFLOW_TOOLS[slug];
  const logoUrl = workflowToolLogoUrl(t.slug);
  const px = size === "sm" ? 32 : 40;
  const dim = size === "sm" ? "w-8 h-8" : "w-10 h-10";

  if (logoUrl) {
    return (
      <div className={`${dim} rounded-lg overflow-hidden bg-white border border-gray-100 flex items-center justify-center shrink-0 p-1`}>
        <Image src={logoUrl} alt={t.name} width={px} height={px} className="object-contain w-full h-full" />
      </div>
    );
  }
  return (
    <div className={`${dim} rounded-lg ${t.logoBg} text-white font-bold ${size === "sm" ? "text-xs" : "text-sm"} flex items-center justify-center shrink-0`}>
      {t.logoText}
    </div>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────────

export default async function WorkflowDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const wf = getWorkflowBySlug(slug);
  if (!wf) notFound();

  const related: Workflow[] = workflowsData
    .filter((w) => w.slug !== wf.slug && (w.industry === wf.industry || w.category === wf.category))
    .slice(0, 3);

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: wf.title,
    description: wf.description,
    totalTime: `PT${parseInt(wf.duration, 10) || 30}M`,
    tool: wf.stepsList
      .filter((s) => s.toolSlug || s.toolName)
      .map((s) => ({ "@type": "HowToTool", name: stepToolName(s) })),
    step: wf.stepsList.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
      url: `${SITE}/resources/workflows/${slug}#step-${i + 1}`,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${SITE}/resources` },
      { "@type": "ListItem", position: 3, name: "Workflows", item: `${SITE}/resources/workflows` },
      { "@type": "ListItem", position: 4, name: wf.title, item: `${SITE}/resources/workflows/${slug}` },
    ],
  };

  const faqSchema =
    wf.faq && wf.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: wf.faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  const hub = INDUSTRY_HUBS[wf.industry];
  // Reviewed tools referenced by steps (for the "reviews" links in related block).
  const stepReviewSlugs = [
    ...new Set(
      wf.stepsList
        .map((s) => s.toolSlug)
        .filter((s): s is NonNullable<typeof s> => Boolean(s)),
    ),
  ];
  const relatedComparisons = (wf.relatedComparisons ?? [])
    .map((cs) => getComparisonBySlug(cs))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div className="bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight size={13} className="text-gray-300 shrink-0" />
            <Link href="/resources" className="hover:text-blue-600 transition-colors">Resources</Link>
            <ChevronRight size={13} className="text-gray-300 shrink-0" />
            <Link href="/resources/workflows" className="hover:text-blue-600 transition-colors">Workflows</Link>
            <ChevronRight size={13} className="text-gray-300 shrink-0" />
            <span className="text-[#1E293B] font-medium line-clamp-1">{wf.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Header ── */}
      <section className="py-10 sm:py-12 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            {wf.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1E293B] leading-tight">{wf.title}</h1>
          <p className="text-gray-600 mt-3 leading-relaxed">{wf.intro}</p>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <ListOrdered size={13} className="shrink-0" /> {wf.steps} Steps
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <Wrench size={13} className="shrink-0" /> {wf.toolCount} Tools
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <Clock size={13} className="shrink-0" /> {wf.duration}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5 capitalize">
              <Briefcase size={13} className="shrink-0" /> {wf.industry}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-600 text-xs font-medium rounded-full px-3 py-1.5">
              <Calendar size={13} className="shrink-0" /> {wf.date}
            </span>
          </div>
        </div>
      </section>

      {/* ── Body ── */}
      <section className="py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Tools used overview */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5 mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
              Tools in this workflow
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {wf.toolsUsed.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full pl-1.5 pr-3 py-1.5 hover:border-blue-300 hover:shadow-sm transition-all"
                >
                  <ToolLogo slug={tool.slug as keyof typeof WORKFLOW_TOOLS} size="sm" />
                  <span className="text-sm font-medium text-[#1E293B]">{tool.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* At a glance (featured-snippet target) */}
          <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5 mb-10">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700 mb-3">
              The workflow at a glance
            </h2>
            <ol className="list-decimal list-inside space-y-1.5 text-sm text-gray-700">
              {wf.stepsList.map((step, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="font-semibold text-[#1E293B]">
                    {stepToolName(step)}
                  </span>
                  {step.role ? ` — ${step.role}` : ""}
                  {step.manual && (
                    <span className="ml-1.5 inline-block rounded-full bg-amber-100 text-amber-700 text-[10px] font-semibold px-1.5 py-0.5 align-middle">
                      manual
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* Steps */}
          <h2 className="text-2xl font-bold text-[#1E293B] mb-6">Step-by-step</h2>
          <ol className="relative border-l-2 border-gray-100 ml-4 sm:ml-5 space-y-8">
            {wf.stepsList.map((step, idx) => {
              return (
                <li key={idx} id={`step-${idx + 1}`} className="relative pl-6 sm:pl-8 scroll-mt-24">
                  {/* Number marker */}
                  <span className="absolute -left-[1.05rem] sm:-left-[1.1rem] top-0 w-8 h-8 rounded-full bg-blue-600 text-white text-sm font-bold flex items-center justify-center ring-4 ring-white">
                    {idx + 1}
                  </span>

                  <h3 className="text-lg font-bold text-[#1E293B] leading-snug">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed mt-2">{step.description}</p>

                  {/* Tool card — reviewed tool, named-only tool, or manual step */}
                  {step.toolSlug ? (
                    <Link
                      href={`/tools/${step.toolSlug}`}
                      className="group mt-4 flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-3 hover:border-blue-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <ToolLogo slug={step.toolSlug} />
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400">Tool for this step</p>
                          <p className="text-sm font-semibold text-[#1E293B] truncate">
                            {WORKFLOW_TOOLS[step.toolSlug].name}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 shrink-0">
                        Review <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  ) : step.manual ? (
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50/60 p-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                        <PenTool size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-amber-600 font-medium">Manual step</p>
                        <p className="text-sm font-semibold text-[#1E293B]">
                          Hands-on — no AI tool
                        </p>
                      </div>
                    </div>
                  ) : step.toolName ? (
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-700 text-white font-bold text-sm flex items-center justify-center shrink-0">
                        {step.toolName.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-400">Tool for this step</p>
                        <p className="text-sm font-semibold text-[#1E293B]">
                          {step.toolName}{" "}
                          <span className="font-normal text-gray-400">
                            (review coming soon)
                          </span>
                        </p>
                      </div>
                    </div>
                  ) : null}

                  {/* Tip */}
                  {step.tip && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg bg-amber-50 border border-amber-100 p-3">
                      <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-800 leading-relaxed">{step.tip}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>

          {/* Outcome */}
          <div className="mt-12 rounded-2xl border border-emerald-100 bg-emerald-50 p-6">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={20} className="text-emerald-600 shrink-0" />
              <h2 className="text-lg font-bold text-[#1E293B]">What you get</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">{wf.outcome}</p>
          </div>

          {/* The tool stack at a glance (summary table) */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
              The tool stack at a glance
            </h2>
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="min-w-[560px] w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {["Stage", "Tool", "Role", "AI or manual", "Full review"].map(
                      (h) => (
                        <th
                          key={h}
                          className="text-left text-xs uppercase text-gray-500 font-medium py-3 px-4 whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {wf.stepsList.map((step, idx) => (
                    <tr key={idx} className="border-t border-gray-100">
                      <td className="py-3 px-4 text-gray-500">{idx + 1}</td>
                      <td className="py-3 px-4 font-medium text-[#1E293B] whitespace-nowrap">
                        {stepToolName(step)}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {step.role ?? "—"}
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {step.manual ? "Manual" : "AI"}
                      </td>
                      <td className="py-3 px-4">
                        {step.toolSlug ? (
                          <Link
                            href={`/tools/${step.toolSlug}`}
                            className="text-blue-600 font-medium hover:underline"
                          >
                            Read review →
                          </Link>
                        ) : (
                          <span className="text-gray-400">
                            {step.manual ? "—" : "Coming soon"}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Common mistakes & pro tips */}
          {wf.mistakes && wf.mistakes.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle size={20} className="text-amber-500 shrink-0" />
                <h2 className="text-2xl font-bold text-[#1E293B]">
                  Common mistakes &amp; pro tips
                </h2>
              </div>
              <div className="space-y-3">
                {wf.mistakes.map((m) => (
                  <div
                    key={m.title}
                    className="rounded-xl border border-gray-100 bg-white p-4"
                  >
                    <p className="font-semibold text-sm text-[#1E293B]">
                      {m.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {m.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ */}
          {wf.faq && wf.faq.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle size={20} className="text-blue-600 shrink-0" />
                <h2 className="text-2xl font-bold text-[#1E293B]">
                  Frequently asked questions
                </h2>
              </div>
              <div className="space-y-3">
                {wf.faq.map((f) => (
                  <div
                    key={f.question}
                    className="rounded-xl border border-gray-100 bg-white p-4"
                  >
                    <p className="font-semibold text-sm text-[#1E293B]">
                      {f.question}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {f.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related resources (hub + reviews + comparisons) */}
          <div className="mt-12 border-t border-gray-100 pt-8">
            <h2 className="text-2xl font-bold text-[#1E293B] mb-4">
              Related resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {hub && (
                <Link
                  href={hub.href}
                  className="group border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Best Of hub
                  </p>
                  <p className="font-semibold text-sm text-[#1E293B] mt-0.5 group-hover:text-blue-600">
                    Best AI tools for {hub.label}
                  </p>
                </Link>
              )}
              {relatedComparisons.map((cmp) => {
                const ca = getToolBySlug(cmp.toolASlug);
                const cb = getToolBySlug(cmp.toolBSlug);
                if (!ca || !cb) return null;
                const caN = ca.frontmatter.toolName || ca.frontmatter.title.split(":")[0].trim();
                const cbN = cb.frontmatter.toolName || cb.frontmatter.title.split(":")[0].trim();
                return (
                  <Link
                    key={cmp.slug}
                    href={`/compare/${cmp.slug}`}
                    className="group border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      Comparison
                    </p>
                    <p className="font-semibold text-sm text-[#1E293B] mt-0.5 group-hover:text-blue-600">
                      {caN} vs {cbN}
                    </p>
                  </Link>
                );
              })}
              {stepReviewSlugs.map((s) => (
                <Link
                  key={s}
                  href={`/tools/${s}`}
                  className="group border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md hover:border-blue-200 transition-all"
                >
                  <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    Review
                  </p>
                  <p className="font-semibold text-sm text-[#1E293B] mt-0.5 group-hover:text-blue-600">
                    {WORKFLOW_TOOLS[s].name} review
                  </p>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs text-gray-400 flex items-center gap-1.5">
              <Trophy size={12} className="shrink-0" />
              Independent editorial workflow — based on our own tool research, not
              a paid placement.
            </p>
          </div>
        </div>
      </section>

      {/* ── Related workflows ── */}
      {related.length > 0 && (
        <section className="py-12 sm:py-14 bg-gray-50 border-t border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={18} className="text-orange-500 shrink-0" />
              <h2 className="text-2xl font-bold text-[#1E293B]">Related workflows</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={r.href}
                  className="border border-gray-100 rounded-xl p-4 bg-white hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="flex items-center gap-1.5 mb-3">
                    {r.toolsUsed.map((tool, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <ToolLogo slug={tool.slug as keyof typeof WORKFLOW_TOOLS} size="sm" />
                        {i < r.toolsUsed.length - 1 && (
                          <ArrowRight size={12} className="text-gray-300 shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="font-semibold text-sm text-[#1E293B] leading-snug">{r.title}</p>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed flex-1">{r.description}</p>
                  <p className="text-xs text-blue-600 font-medium mt-2">{r.category}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
      <Footer />
    </div>
  );
}
