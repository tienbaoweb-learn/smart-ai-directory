import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us | SmartAI for Work",
  description:
    "Have a question, partnership inquiry, or tool submission request? Get in touch with the SmartAI for Work team.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Us | SmartAI for Work",
    description:
      "Have a question, partnership inquiry, or tool submission request? Get in touch with the SmartAI for Work team.",
    url: "/contact",
    type: "website",
  },
};

export default function Page() {
  return <ContactClient />;
}
