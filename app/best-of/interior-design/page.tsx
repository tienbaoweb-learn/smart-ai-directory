import type { Metadata } from "next";
import BestInteriorDesignClient from "./BestInteriorDesignClient";

export const metadata: Metadata = {
  title: "The Best AI Tools for Interior Designers | SmartAI for Work",
  description:
    "Hand-ranked list of the best AI tools for interior designers — mood boards, space planning, and 3D rendering.",
  alternates: { canonical: "/best-of/interior-design" },
  openGraph: {
    title: "The Best AI Tools for Interior Designers | SmartAI for Work",
    description:
      "Hand-ranked list of the best AI tools for interior designers — mood boards, space planning, and 3D rendering.",
    url: "/best-of/interior-design",
    type: "website",
  },
};

export default function Page() {
  return <BestInteriorDesignClient />;
}
