import type { Metadata } from "next";
import DesignToolsClient from "./DesignToolsClient";

export const metadata: Metadata = {
  title: "AI Design & Visualization Tools | SmartAI for Work",
  description:
    "The best AI design and visualization tools for rendering, concept art, and photorealistic 3D — tested for real business use.",
  alternates: { canonical: "/ai-tools/design" },
  openGraph: {
    title: "AI Design & Visualization Tools | SmartAI for Work",
    description:
      "The best AI design and visualization tools for rendering, concept art, and photorealistic 3D.",
    url: "/ai-tools/design",
    type: "website",
  },
};

export default function Page() {
  return <DesignToolsClient />;
}
