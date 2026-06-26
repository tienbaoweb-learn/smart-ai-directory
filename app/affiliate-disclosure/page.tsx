import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Affiliate Disclosure | SmartAI for Work",
  description:
    "SmartAI for Work may earn a commission from affiliate links. Learn how this supports our independent AI tool reviews.",
  alternates: { canonical: "/affiliate-disclosure" },
  robots: { index: true, follow: true },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-white font-sans text-[#1E293B]">
      <Navbar />

      <main className="py-12 sm:py-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ── Page Title & Last Updated ── */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1E293B]">Affiliate Disclosure</h1>
          <p className="text-sm text-gray-400 mt-2 mb-8">Last updated: June 2025</p>

          {/* ── Intro ── */}
          <p className="text-gray-600 leading-relaxed mb-10">
            SmartAIforWork (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) believes in full transparency with our audience. This page discloses our affiliate relationships in accordance with the Federal Trade Commission (FTC) guidelines and the requirements of affiliate networks including Impact, PartnerStack, and ShareASale.
          </p>

          {/* ── Section 1 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">1. What Is an Affiliate Link?</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              When you click certain links on smartaiforwork.com and make a purchase or sign up for a service, we may receive a commission from the company at no additional cost to you. These are called affiliate links.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Affiliate links look identical to regular links. They work by placing a small tracking cookie in your browser that attributes the referral to SmartAIforWork if you complete a qualifying action (such as a purchase or free trial signup) within a defined window of time.
            </p>
          </section>

          {/* ── Section 2 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">2. Which Content Contains Affiliate Links?</h2>
            <p className="text-gray-600 leading-relaxed mb-3">Affiliate links may appear in:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>AI tool reviews and ratings pages</li>
              <li>&ldquo;Best AI tools for [industry]&rdquo; roundup articles</li>
              <li>Individual tool listing pages in our directory</li>
              <li>Comparison articles between two or more tools</li>
              <li>Newsletter content and resource guides</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Pages containing affiliate links are marked with the following notice at the top of the content:{" "}
              <em className="text-gray-500">&ldquo;This page contains affiliate links. We may earn a commission if you purchase through our links, at no extra cost to you.&rdquo;</em>
            </p>
          </section>

          {/* ── Section 3 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">3. Our Editorial Independence Commitment</h2>
            <p className="text-gray-600 leading-relaxed mb-3">Affiliate relationships do not influence:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>How we rate or rank any AI tool</li>
              <li>The content of our reviews or comparisons</li>
              <li>Which tools we choose to cover or recommend</li>
              <li>Our assessment of a tool&apos;s limitations or weaknesses</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-3">
              We only enter affiliate partnerships with tools we have evaluated and believe provide genuine value to professionals in Furniture, Architecture, Construction, and Real Estate. A tool being an affiliate partner does not guarantee positive coverage.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to publish critical or negative reviews of affiliate partners if our evaluation warrants it.
            </p>
          </section>

          {/* ── Section 4 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">4. Current Affiliate Partnerships</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We maintain affiliate relationships with select AI tool providers. Our active partnerships may include tools in the following categories:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>AI design and visualization tools</li>
              <li>AI-powered project management platforms</li>
              <li>AI writing and content generation tools</li>
              <li>AI-based real estate and property technology</li>
              <li>General-purpose AI productivity platforms</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              A complete and current list of our affiliate partners is maintained internally and updated as partnerships change. If you have questions about whether a specific tool on our site is an affiliate partner, contact us at:{" "}
              <a href="mailto:affiliate@smartaiforwork.com" className="text-blue-600 hover:underline">
                affiliate@smartaiforwork.com
              </a>
            </p>
          </section>

          {/* ── Section 5 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">5. Affiliate Networks We Work With</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              We may participate in affiliate programs managed through the following networks:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm mb-4 pl-1">
              <li>Impact (impact.com)</li>
              <li>PartnerStack (partnerstack.com)</li>
              <li>ShareASale (shareasale.com)</li>
              <li>Rewardful (rewardful.com)</li>
              <li>Direct affiliate programs operated by individual vendors</li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              Each network operates its own tracking and commission infrastructure. Clicking an affiliate link may set a cookie from one of these networks in your browser.
            </p>
          </section>

          {/* ── Section 6 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">6. No Extra Cost to You</h2>
            <p className="text-gray-600 leading-relaxed">
              Using our affiliate links does not increase the price you pay. In many cases, affiliate links may direct you to special offers, free trials, or discounted pricing negotiated for our audience.
            </p>
          </section>

          {/* ── Section 7 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">7. FTC Compliance</h2>
            <p className="text-gray-600 leading-relaxed">
              This disclosure is made in accordance with the FTC&apos;s Guides Concerning the Use of Endorsements and Testimonials in Advertising (16 CFR Part 255). We are committed to honest, transparent communication with our audience and take our compliance obligations seriously.
            </p>
          </section>

          {/* ── Section 8 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">8. Cookie Consent</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Affiliate tracking relies on browser cookies. By continuing to use smartaiforwork.com, you consent to the use of affiliate tracking cookies as described in our{" "}
              <Link href="/privacy-policy" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
            <p className="text-gray-600 leading-relaxed">
              You may opt out of cookie tracking at any time through your browser settings. Note that opting out does not affect the price you pay — it only means we will not receive a commission for the referral.
            </p>
          </section>

          {/* ── Section 9 ── */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1E293B] mb-4">9. Contact</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              If you have questions about our affiliate relationships or this disclosure, please contact us:
            </p>
            <ul className="space-y-1 text-gray-600 text-sm">
              <li><span className="font-semibold text-[#1E293B]">SmartAIforWork</span></li>
              <li>Email: <a href="mailto:affiliate@smartaiforwork.com" className="text-blue-600 hover:underline">affiliate@smartaiforwork.com</a></li>
              <li>
                Contact form:{" "}
                <Link href="/contact" className="text-blue-600 hover:underline">
                  smartaiforwork.com/contact
                </Link>
              </li>
              <li>Website: <a href="https://www.smartaiforwork.com" className="text-blue-600 hover:underline">smartaiforwork.com</a></li>
            </ul>
          </section>

        </article>
      </main>

      <Footer />
    </div>
  );
}
