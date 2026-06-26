import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of Use | SmartAI for Work",
  description:
    "Review the terms and conditions for using the SmartAI for Work AI tools directory.",
  alternates: { canonical: "/terms-of-use" },
  robots: { index: true, follow: true },
};

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      <main className="py-12 sm:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Page Title & Last Updated ── */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">Terms of Use</h1>
          <p className="text-sm text-gray-400 mt-2 mb-8">Last updated: June 2025</p>

          {/* ── Intro ── */}
          <p className="text-gray-600 leading-relaxed mb-10">
            Welcome to SmartAIforWork. By accessing or using smartaiforwork.com (the &ldquo;Site&rdquo;), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our Site. These terms apply to all visitors, users, and anyone who accesses the Site.
          </p>

          {/* ── Section 1 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">1. About SmartAIforWork</h2>
            <p className="text-gray-600 leading-relaxed">
              SmartAIforWork is an independent AI research, review, and consulting platform. We publish editorial content, tool reviews, and industry guidance for professionals in the Furniture, Architecture, Construction, and Real Estate sectors. We operate independently and are not affiliated with any AI vendor or software provider.
            </p>
          </section>

          {/* ── Section 2 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">2. Use of Content</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              All content published on smartaiforwork.com — including articles, reviews, tool comparisons, and guides — is the intellectual property of SmartAIforWork unless otherwise stated.
            </p>
            <p className="text-gray-600 leading-relaxed mb-2">You may:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>Read, share, and link to our content for personal or professional reference</li>
              <li>Quote brief excerpts (under 100 words) with clear attribution and a link back to the original page</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-2">You may not:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>Reproduce, republish, or redistribute our content in full without written permission</li>
              <li>Scrape or systematically copy content for commercial use</li>
              <li>Present our content as your own without attribution</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              For licensing or syndication inquiries, contact us at:{" "}
              <a href="mailto:editorial@smartaiforwork.com" className="text-blue-600 hover:underline">
                editorial@smartaiforwork.com
              </a>
            </p>
          </section>

          {/* ── Section 3 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">3. Affiliate Links &amp; Commercial Relationships</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Some links on this Site are affiliate links. When you click an affiliate link and make a purchase, we may earn a commission at no additional cost to you.
            </p>
            <p className="text-gray-600 leading-relaxed mb-3">
              Affiliate relationships do not influence our editorial content, tool ratings, or recommendations. Our reviews reflect the independent assessment of our team.
            </p>
            <p className="text-gray-600 leading-relaxed">
              All material affiliate relationships are disclosed on relevant pages in accordance with FTC guidelines.
            </p>
          </section>

          {/* ── Section 4 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">4. Accuracy of Information</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We strive to ensure all content on SmartAIforWork is accurate, current, and relevant. However:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm pl-1">
              <li>AI tools, pricing, and features change frequently. Information on this Site may not always reflect the most current state of a product.</li>
              <li>Tool reviews represent our team&apos;s assessment at the time of publication and may be updated periodically.</li>
              <li>Nothing on this Site constitutes professional legal, financial, or technical advice. Always verify information with the relevant vendor before making purchasing decisions.</li>
            </ul>
          </section>

          {/* ── Section 5 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">5. Third-Party Links</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Our Site contains links to third-party websites, including AI tool vendors, affiliate networks, and reference sources. These links are provided for convenience and informational purposes only.
            </p>
            <p className="text-gray-600 leading-relaxed">
              SmartAIforWork does not endorse, control, or take responsibility for the content, privacy practices, or terms of any third-party website. Accessing third-party sites is at your own risk.
            </p>
          </section>

          {/* ── Section 6 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">6. User-Submitted Content</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              If you submit content to us via the contact form or any future community features:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm mb-4 pl-1">
              <li>You grant SmartAIforWork a non-exclusive right to use, reproduce, and reference your submission for editorial or operational purposes</li>
              <li>You confirm the submission does not infringe on the rights of any third party</li>
              <li>You agree not to submit content that is false, defamatory, unlawful, or spam</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to decline or remove any submission at our discretion.
            </p>
          </section>

          {/* ── Section 7 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">7. Disclaimer of Warranties</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              SmartAIforWork is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied. We do not warrant that:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>The Site will be uninterrupted or error-free</li>
              <li>Information on the Site is complete, accurate, or up to date at all times</li>
              <li>The Site is free from viruses or other harmful components</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Your use of the Site is at your sole risk.
            </p>
          </section>

          {/* ── Section 8 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">8. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              To the fullest extent permitted by law, SmartAIforWork and its team members shall not be liable for any indirect, incidental, special, or consequential damages arising from:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>Your use of or inability to use the Site</li>
              <li>Reliance on any content published on the Site</li>
              <li>Unauthorized access to or alteration of your data</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Our total liability for any claim related to the Site shall not exceed the amount you paid us in the past 12 months (if any).
            </p>
          </section>

          {/* ── Section 9 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">9. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              The SmartAIforWork name, logo, and all original content on this Site are protected under applicable intellectual property laws. Unauthorized use of our branding or content may result in legal action.
            </p>
            <p className="text-gray-600 leading-relaxed">
              If you believe any content on our Site infringes your intellectual property rights, please contact us at:{" "}
              <a href="mailto:legal@smartaiforwork.com" className="text-blue-600 hover:underline">
                legal@smartaiforwork.com
              </a>
            </p>
          </section>

          {/* ── Section 10 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">10. Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Your use of the Site is also governed by our{" "}
              <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              , available at smartaiforwork.com/privacy-policy. By using this Site, you consent to the data practices described in that policy.
            </p>
          </section>

          {/* ── Section 11 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">11. Modifications to Terms</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We reserve the right to update these Terms of Use at any time. Changes will be reflected by the &ldquo;Last updated&rdquo; date at the top of this page. Continued use of the Site after changes are posted constitutes your acceptance of the revised terms.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We encourage you to review this page periodically.
            </p>
          </section>

          {/* ── Section 12 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">12. Governing Law</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms of Use shall be governed by and construed in accordance with applicable law. Any disputes arising from use of this Site shall be resolved through good-faith negotiation before pursuing formal legal proceedings.
            </p>
          </section>

          {/* ── Section 13 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">13. Contact</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              If you have questions about these Terms of Use, please contact us:
            </p>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><span className="font-semibold text-[#1E293B]">SmartAIforWork</span></li>
              <li>Website: <a href="https://www.smartaiforwork.com" className="text-blue-600 hover:underline">smartaiforwork.com</a></li>
              <li>Email: <a href="mailto:legal@smartaiforwork.com" className="text-blue-600 hover:underline">legal@smartaiforwork.com</a></li>
              <li>
                Contact form:{" "}
                <Link href="/contact" className="text-blue-600 hover:underline">
                  smartaiforwork.com/contact
                </Link>
              </li>
            </ul>
          </section>

        </article>
      </main>

      <Footer />
    </div>
  );
}
