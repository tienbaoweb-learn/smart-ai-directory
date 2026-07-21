import type { Metadata } from "next";
import { tagsData } from "@/lib/tags-data";
import { guidesData } from "@/lib/guides-data";
import { comparisonsData } from "@/lib/comparisons-data";
import { workflowsData } from "@/lib/workflows-data";
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

  const tag = tagsData.find((t) => t.slug === slug);
  const tagName =
    tag?.name ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  // Reflects the visible breadcrumb (TagPageClient): Home > Tags > [tagName].
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.smartaiforwork.com/" },
      { "@type": "ListItem", position: 2, name: "Tags", item: "https://www.smartaiforwork.com/tags" },
      { "@type": "ListItem", position: 3, name: tagName, item: `https://www.smartaiforwork.com/tags/${slug}` },
    ],
  };

  // Same filters TagPageClient applies for the guides/comparisons/workflows
  // sections (tutorials/case-studies are excluded — those render as non-link
  // cards on this page since they have no real detail page, so they must
  // never get a schema url either).
  const relatedGuides = guidesData.filter((g) => g.tags.includes(slug));
  const relatedComparisons = comparisonsData.filter((c) => c.tags.includes(slug));
  const relatedWorkflows = workflowsData.filter((w) => w.tags.includes(slug));

  const itemListElement = [
    ...relatedTools.map((t) => ({ name: t.name, url: `https://www.smartaiforwork.com/tools/${t.slug}` })),
    ...relatedGuides.map((g) => ({ name: g.title, url: `https://www.smartaiforwork.com${g.href}` })),
    ...relatedComparisons.map((c) => ({ name: c.title, url: `https://www.smartaiforwork.com${c.href}` })),
    ...relatedWorkflows.map((w) => ({ name: w.title, url: `https://www.smartaiforwork.com${w.href}` })),
  ]
    .slice(0, 30)
    .map((item, i) => ({ "@type": "ListItem", position: i + 1, ...item }));

  const collectionSchema =
    itemListElement.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${tagName} AI Tools, Guides & Resources`,
          url: `https://www.smartaiforwork.com/tags/${slug}`,
          mainEntity: { "@type": "ItemList", itemListElement },
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {collectionSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
      )}
      <TagPageClient slug={slug} relatedTools={relatedTools} />
    </>
  );
}
