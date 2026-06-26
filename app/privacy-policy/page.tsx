import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | SmartAI for Work",
  description:
    "Read the SmartAI for Work privacy policy to learn how we collect, use, and protect your data.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      <main className="py-12 sm:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Page Title & Last Updated ── */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mt-2 mb-8">Last updated: June 2025</p>

          {/* ── Intro ── */}
          <p className="text-gray-600 leading-relaxed mb-10">
            SmartAIforWork (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) operates the website smartaiforwork.com. This Privacy Policy explains how we collect, use, and protect information when you visit our website. By using our site, you agree to the practices described in this policy.
          </p>

          {/* ── Section 1 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">1. Information We Collect</h2>

            <h3 className="text-base font-semibold text-[#1E293B] mb-2">Information You Provide</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              When you submit our contact form, we collect:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>Your full name</li>
              <li>Your email address</li>
              <li>Your selected inquiry type</li>
              <li>The content of your message</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-6">
              We do not store this information in a database. Messages are delivered directly to our team via email.
            </p>

            <h3 className="text-base font-semibold text-[#1E293B] mb-2">Information Collected Automatically</h3>
            <p className="text-gray-600 leading-relaxed mb-3">
              When you visit smartaiforwork.com, we and our third-party partners may automatically collect:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referring URL</li>
              <li>IP address (anonymized where applicable)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              This data is collected through standard web analytics tools (such as Google Analytics) and is used solely to understand site usage and improve our content.
            </p>
          </section>

          {/* ── Section 2 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">2. Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We use cookies and similar tracking technologies to operate and improve our website. These include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm mb-4 pl-1">
              <li><span className="font-semibold text-[#1E293B]">Essential cookies:</span> Required for the website to function properly.</li>
              <li><span className="font-semibold text-[#1E293B]">Analytics cookies:</span> Help us understand how visitors interact with our content (e.g., Google Analytics).</li>
              <li><span className="font-semibold text-[#1E293B]">Affiliate tracking cookies:</span> Used to track referrals when you click links to third-party AI tools. If you purchase a product through one of our affiliate links, we may earn a commission at no additional cost to you.</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              You can control cookie preferences through your browser settings. Disabling cookies may affect some functionality of the site.
            </p>
          </section>

          {/* ── Section 3 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">3. Affiliate Disclosure</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              SmartAIforWork participates in affiliate programs. Some links on our website are affiliate links, meaning we may earn a commission if you purchase a product or service through those links. This comes at no extra cost to you.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our editorial content and tool ratings are never influenced by affiliate relationships. We only recommend tools we believe provide genuine value to professionals in our covered industries.
            </p>
          </section>

          {/* ── Section 4 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">4. How We Use Your Information</h2>
            <p className="text-gray-600 leading-relaxed mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>Respond to your contact form inquiries</li>
              <li>Improve website content and user experience</li>
              <li>Analyze site traffic and performance</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              We do not sell, rent, or trade your personal information to any third party.
            </p>
          </section>

          {/* ── Section 5 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">5. Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Our website may link to or integrate with third-party services, including:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm mb-4 pl-1">
              <li><span className="font-semibold text-[#1E293B]">Google Analytics</span> — for website traffic analysis. See Google&apos;s Privacy Policy at policies.google.com/privacy</li>
              <li><span className="font-semibold text-[#1E293B]">Affiliate networks</span> (such as Impact, PartnerStack, ShareASale) — for tracking referral commissions</li>
              <li><span className="font-semibold text-[#1E293B]">Third-party AI tool websites</span> — linked for review purposes; their privacy practices are governed by their own policies</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              We are not responsible for the privacy practices of third-party websites.
            </p>
          </section>

          {/* ── Section 6 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">6. Data Retention</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We do not maintain a user database or store personal data on our servers. Contact form submissions are delivered via email and retained only as long as necessary to respond to your inquiry.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Analytics data is retained in accordance with the default retention settings of the analytics provider (typically 14–26 months).
            </p>
          </section>

          {/* ── Section 7 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">7. Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt out of analytics tracking (via browser settings or tools such as the Google Analytics Opt-out Browser Add-on)</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              To exercise any of these rights, contact us at:{" "}
              <a href="mailto:privacy@smartaiforwork.com" className="text-blue-600 hover:underline">
                privacy@smartaiforwork.com
              </a>
            </p>
          </section>

          {/* ── Section 8 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">8. Children&apos;s Privacy</h2>
            <p className="text-gray-600 leading-relaxed">
              Our website is intended for professionals and business users. We do not knowingly collect personal information from individuals under the age of 16. If you believe a minor has submitted information through our site, please contact us immediately.
            </p>
          </section>

          {/* ── Section 9 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">9. Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed">
              We may update this Privacy Policy from time to time. When we do, we will revise the &ldquo;Last updated&rdquo; date at the top of this page. We encourage you to review this page periodically to stay informed about how we protect your information.
            </p>
          </section>

          {/* ── Section 10 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">10. Contact</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              If you have questions about this Privacy Policy, please contact us:
            </p>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><span className="font-semibold text-[#1E293B]">SmartAIforWork</span></li>
              <li>Website: <a href="https://www.smartaiforwork.com" className="text-blue-600 hover:underline">smartaiforwork.com</a></li>
              <li>Email: <a href="mailto:privacy@smartaiforwork.com" className="text-blue-600 hover:underline">privacy@smartaiforwork.com</a></li>
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
