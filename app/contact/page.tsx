"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";

const SUBJECTS = [
  "General Inquiry",
  "Partnership & Affiliate",
  "Tool Submission",
  "Consulting Request",
  "Press & Media",
];

const FAQS = [
  {
    question: "How do I submit an AI tool for review?",
    answer:
      'Use the contact form and select "Tool Submission" as the subject. Include the tool name, website URL, and a brief description. Our team reviews all submissions within 5–7 business days.',
  },
  {
    question: "Do you offer sponsored reviews or paid placements?",
    answer:
      "No. Our editorial process is fully independent. We do not accept payment for reviews or ratings. We may earn affiliate commissions on tools we genuinely recommend, which are always disclosed.",
  },
  {
    question: "How can I become an affiliate partner?",
    answer:
      'If you represent an AI tool relevant to Furniture, Architecture, Construction, or Real Estate, select "Partnership & Affiliate" in the form. We evaluate partnerships based on product quality and relevance to our audience.',
  },
  {
    question: "How quickly do you respond to inquiries?",
    answer:
      "We aim to respond to all inquiries within 2 business days. Complex consulting or partnership requests may take slightly longer.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      <main>
        {/* ── Section 1: Hero ── */}
        <section className="border-b border-gray-100 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600 leading-relaxed">
              Have a question, partnership inquiry, or tool submission request? We&apos;d love to hear from you.
            </p>
          </div>
        </section>

        {/* ── Section 2: Form + FAQ ── */}
        <section className="py-12 sm:py-16 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">

              {/* ── LEFT: Contact Form ── */}
              <div>
                <h2 className="text-xl font-bold text-[#1E293B] mb-6">Send Us a Message</h2>

                {submitted ? (
                  <div className="flex items-start gap-3 border border-emerald-200 bg-emerald-50 rounded-xl p-5">
                    <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-emerald-800 text-sm">Message sent!</p>
                      <p className="text-sm text-emerald-700 mt-0.5">
                        Thank you! We&apos;ll get back to you within 2 business days.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate={false}>
                    {/* Full Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-[#1E293B] mb-1.5">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#447df7] focus:border-transparent transition"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#1E293B] mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#447df7] focus:border-transparent transition"
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-[#1E293B] mb-1.5">
                        Subject
                      </label>
                      <select
                        id="subject"
                        required
                        defaultValue=""
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#447df7] focus:border-transparent transition appearance-none"
                      >
                        <option value="" disabled>Select a subject</option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-[#1E293B] mb-1.5">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        placeholder="Tell us how we can help..."
                        rows={5}
                        className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#447df7] focus:border-transparent transition resize-none min-h-[140px]"
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      className="w-full bg-[#447df7] hover:bg-blue-600 text-white font-semibold rounded-lg py-3 text-sm transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                )}
              </div>

              {/* ── RIGHT: FAQ ── */}
              <div>
                <h2 className="text-xl font-bold text-[#1E293B] mb-6">Frequently Asked Questions</h2>
                <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden bg-white">
                  {FAQS.map((faq, i) => (
                    <div key={i}>
                      <button
                        onClick={() => setOpenFaq(openFaq === i ? null : i)}
                        className="w-full flex justify-between items-start text-left px-4 py-4 text-sm font-semibold text-[#1E293B] hover:bg-gray-50 transition-colors gap-3"
                      >
                        <span>{faq.question}</span>
                        <span className="text-gray-400 shrink-0 mt-0.5 text-base leading-none">
                          {openFaq === i ? "−" : "+"}
                        </span>
                      </button>
                      {openFaq === i && (
                        <div className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── Section 3: Trust Line ── */}
        <section className="py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-xs text-gray-400 italic">
              SmartAIforWork is an independent platform. We do not sell your contact information and will never send unsolicited emails.
            </p>
          </div>
        </section>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}
