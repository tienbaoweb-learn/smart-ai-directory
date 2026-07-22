import type { Metadata } from "next";
import { tagsData } from "@/lib/tags-data";
import { getUseCaseToolsByTag } from "@/lib/tools";
import TagPageClient from "./TagPageClient";

export function generateStaticParams() {
  return tagsData.map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tag = tagsData.find((t) => t.slug === slug);
  const tagName =
    tag?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const title = `${tagName} AI Tools, Guides & Resources | SmartAI for Work`;
  const description =
    tag?.description ??
    `Explore AI tools, guides, tutorials, and case studies tagged "${tagName}" for furniture, architecture, construction, and real estate.`;

  return {
    title,
    description,
    alternates: { canonical: `/tags/${slug}` },
    openGraph: {
      title,
      description,
      url: `/tags/${slug}`,
      type: "website",
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // Resolved server-side (getUseCaseToolsByTag uses fs via getAllTools) and
  // passed down as a plain prop — this is what powers the tag page's
  // "AI Tools" section; see lib/tools.ts.
  const relatedTools = getUseCaseToolsByTag(slug);
  return <TagPageClient slug={slug} relatedTools={relatedTools} />;
}
