import type { Metadata } from "next";
import BestArchitectureClient from "./BestArchitectureClient";

export const metadata: Metadata = {
  title: "The Best AI Tools for Architects | SmartAI for Work",
  description:
    "Hand-ranked list of the best AI tools for architects — concept design, BIM, rendering, and client presentations.",
  alternates: { canonical: "/best-of/architecture" },
  openGraph: {
    title: "The Best AI Tools for Architects | SmartAI for Work",
    description:
      "Hand-ranked list of the best AI tools for architects — concept design, BIM, rendering, and client presentations.",
    url: "/best-of/architecture",
    type: "website",
  },
};

export default function Page() {
  return <BestArchitectureClient />;
}
