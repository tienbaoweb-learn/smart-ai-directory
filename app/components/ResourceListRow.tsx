import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export interface ResourceListRowProps {
  href: string;
  thumbnailSrc?: string;
  thumbnailAlt?: string;
  /** Placeholder background when thumbnailSrc is not provided. Default: "bg-gray-300". */
  thumbnailBgClassName?: string;
  title: string;
  badge: { label: string; className: string };
  /** Middle meta fields between badge and date (category+readTime, or company+tools+result, etc). */
  metaContent: ReactNode;
  date: string;
}

export default function ResourceListRow({
  href,
  thumbnailSrc,
  thumbnailAlt,
  thumbnailBgClassName = "bg-gray-300",
  title,
  badge,
  metaContent,
  date,
}: ResourceListRowProps) {
  return (
    <li className="flex gap-4 items-start py-4 border-b border-gray-100 last:border-0">
      <div className={`${thumbnailBgClassName} rounded-lg w-20 md:w-24 aspect-[2/1] relative overflow-hidden flex-shrink-0`}>
        {thumbnailSrc && (
          <Image src={thumbnailSrc} alt={thumbnailAlt ?? title} fill className="object-cover" />
        )}
      </div>

      <div className="flex-1 min-w-0">
        <Link
          href={href}
          className="font-semibold text-sm md:text-base text-[#1E293B] hover:text-blue-600 transition-colors line-clamp-2 leading-snug"
        >
          {title}
        </Link>
        <div className="flex flex-wrap items-center gap-2 mt-1.5 text-xs">
          <span className={`rounded-full px-2 py-0.5 font-semibold ${badge.className}`}>
            {badge.label}
          </span>
          {metaContent}
          <span className="text-gray-400 ml-auto hidden sm:inline">{date}</span>
        </div>
      </div>
    </li>
  );
}
