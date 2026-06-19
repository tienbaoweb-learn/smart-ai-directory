import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export interface ResourceCardProps {
  href: string;
  /** When true, the entire card is the link (no separate "read more" link rendered). */
  wholeCardLink?: boolean;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  /** Placeholder background when thumbnailSrc is not provided. Default: "bg-gray-300". */
  thumbnailBgClassName?: string;
  /** Extra classes appended to the thumbnail wrapper (e.g. flex centering for overlay content). */
  thumbnailExtraClassName?: string;
  /** Badge / company pill / vs-logos overlay rendered inside the thumbnail. */
  thumbnailContent?: ReactNode;
  title: string;
  titleClassName?: string;
  description: string;
  descriptionClassName?: string;
  /** Stats grid / meta row / plain text rendered below the description. */
  footer: ReactNode;
  /** Bottom link text. Ignored when wholeCardLink is true. */
  linkText?: string;
}

const DEFAULT_TITLE_CLASS = "font-semibold text-sm text-[#1E293B] line-clamp-2 leading-snug";
const DEFAULT_DESCRIPTION_CLASS = "text-xs text-gray-500 mt-1.5 line-clamp-3 leading-relaxed flex-1";

export default function ResourceCard({
  href,
  wholeCardLink = false,
  thumbnailSrc,
  thumbnailAlt,
  thumbnailBgClassName = "bg-gray-300",
  thumbnailExtraClassName,
  thumbnailContent,
  title,
  titleClassName,
  description,
  descriptionClassName,
  footer,
  linkText,
}: ResourceCardProps) {
  const thumbnail = (
    <div className={`aspect-[2/1] relative ${thumbnailBgClassName}${thumbnailExtraClassName ? ` ${thumbnailExtraClassName}` : ""}`}>
      {thumbnailSrc && (
        <Image src={thumbnailSrc} alt={thumbnailAlt ?? title} fill className="object-cover" />
      )}
      {thumbnailContent}
    </div>
  );

  const content = (
    <div className="p-4 flex flex-col flex-1">
      <p className={titleClassName ?? DEFAULT_TITLE_CLASS}>{title}</p>
      <p className={descriptionClassName ?? DEFAULT_DESCRIPTION_CLASS}>{description}</p>
      {footer}
      {!wholeCardLink && (
        <Link href={href} className="text-blue-600 text-xs font-medium mt-3 hover:underline inline-block">
          {linkText ?? "Read more →"}
        </Link>
      )}
    </div>
  );

  const cardClassName =
    "border border-gray-100 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow flex flex-col";

  if (wholeCardLink) {
    return (
      <Link href={href} className={cardClassName}>
        {thumbnail}
        {content}
      </Link>
    );
  }

  return (
    <div className={cardClassName}>
      {thumbnail}
      {content}
    </div>
  );
}
