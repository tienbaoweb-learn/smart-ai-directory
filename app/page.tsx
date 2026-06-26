import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: "SmartAI for Work - AI Tools Directory",
  description:
    "Discover handpicked AI tools for furniture, architecture, construction, and real estate. Save time, reduce costs, and grow your business with AI.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomeClient />;
}
