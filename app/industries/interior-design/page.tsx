import type { Metadata } from "next";
import InteriorDesignIndustryClient from "./InteriorDesignIndustryClient";

export const metadata: Metadata = {
  title: "AI Tools for Interior Designers | SmartAI for Work",
  description:
    "From AI mood boards and space planning to photorealistic 3D rendering, discover the tools that help interior designers win more projects.",
  alternates: { canonical: "/industries/interior-design" },
  openGraph: {
    title: "AI Tools for Interior Designers | SmartAI for Work",
    description:
      "From AI mood boards and space planning to photorealistic 3D rendering, discover the tools that help interior designers win more projects.",
    url: "/industries/interior-design",
    type: "website",
  },
};

export default function Page() {
  return <InteriorDesignIndustryClient />;
}
