import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText, Shield, CheckCircle, Scale, AlertCircle, Mail } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Terms and Conditions | Artificial Quotient",
  description: "Terms of service and sponsorship agreement guidelines for Artificial Quotient media partnerships, sponsored content, and client collaborations.",
};

export default function TermsPage() {
  const lastUpdated = "August 17, 2026";

  return (
    <div className="min-h-screen bg-brand-bg dark:bg-[#040d0a] text-brand-text dark:text-white flex flex-col selection:bg-emerald-500 selection:text-white transition-colors">
      <Navbar />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-16 sm:py-24">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 dark:hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Media Kit
          </Link>
        </div>

        {/* Header Section */}
        <div className="space-y-4 mb-12 border-b border-brand-border dark:border-[#16382e] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">
            <FileText className="w-3.5 h-3.5" /> Legal Agreement
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm sm:text-base text-brand-muted dark:text-emerald-200/70">
            Last Updated: <span className="font-semibold text-brand-text dark:text-white">{lastUpdated}</span>
          </p>
          <p className="text-sm sm:text-base text-brand-muted dark:text-emerald-200/80 leading-relaxed">
            Welcome to Artificial Quotient (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms &amp; Conditions govern all sponsorship agreements, media partnerships, content placements, and interactions with our YouTube channel and digital media portfolio.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-brand-muted dark:text-emerald-100/90">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" /> 1. Scope of Sponsorships &amp; Services
            </h2>
            <p>
              Artificial Quotient provides creator marketing, software tool breakdowns, sponsored video integrations, and dedicated product tutorials across our digital properties, including YouTube, community feeds, and web channels.
            </p>
            <p>
              Each sponsorship campaign will be defined by an agreed scope of work (SOW) specifying deliverables such as:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-brand-text dark:text-white font-medium">
              <li><strong className="text-emerald-500">Dedicated Video:</strong> A comprehensive, full-length tutorial or walkthrough focused exclusively on the client&apos;s product or platform.</li>
              <li><strong className="text-emerald-500">Sponsored Integration:</strong> A seamless 60–120 second promotional segment positioned within an organic video tutorial.</li>
              <li><strong className="text-emerald-500">Multi-Video Package:</strong> Bundled sponsorship placements across multiple release cycles with tracked conversion links.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" /> 2. Booking, Deliverables &amp; Production Timeline
            </h2>
            <p>
              Upon campaign agreement, the client will provide all necessary brand assets, product access (demo accounts/API keys), tracking URLs, and key messaging points.
            </p>
            <p>
              Standard production timelines run 5 to 10 business days from receipt of all required assets, unless an expedited schedule is explicitly confirmed in writing.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-500" /> 3. Editorial Independence &amp; FTC Compliance
            </h2>
            <p>
              To maintain audience trust and channel integrity, Artificial Quotient retains creative and editorial control over the narrative structure, video style, and technical demonstration.
            </p>
            <p>
              All sponsored content will comply with Federal Trade Commission (FTC) guidelines and YouTube endorsement policies, including clear visual and audible disclosures (such as &quot;Includes paid promotion&quot; and on-screen sponsorship badges).
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" /> 4. Review &amp; Revision Policy
            </h2>
            <p>
              Clients may review a preview draft of the sponsored segment or video prior to public broadcast. 
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Review feedback is limited to factual corrections, trademark accuracy, and messaging alignments as agreed in the initial briefing.</li>
              <li>One (1) round of reasonable revisions is included in standard campaigns.</li>
              <li>Revisions requested outside the initial brief or requiring significant re-recording may incur additional production fees.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-emerald-500" /> 5. Payment Terms &amp; Invoicing
            </h2>
            <p>
              Unless otherwise specified in a custom agreement:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Invoices are issued upon agreement and are due prior to public publication or on Net-15/Net-30 terms as mutually agreed.</li>
              <li>Accepted payment methods include bank wire, Stripe invoice, or direct ACH transfer.</li>
              <li>Published content will remain live indefinitely on the channel as long as the video remains active.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" /> 6. Intellectual Property &amp; Brand Usage
            </h2>
            <p>
              Clients grant Artificial Quotient a non-exclusive, worldwide license to display client logos, brand names, and software screenshots solely for the purpose of producing the sponsored content and displaying case study metrics in our portfolio.
            </p>
            <p>
              All video footage, voiceover, scripts, animations, and channel branding remain the intellectual property of Artificial Quotient.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-emerald-500" /> 7. Limitation of Liability &amp; Disclaimers
            </h2>
            <p>
              While we optimize all content for maximum reach, engagement, and conversion based on historical performance, Artificial Quotient does not guarantee specific view counts, sales figures, or revenue targets from organic viewer actions.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3 pt-6 border-t border-brand-border dark:border-[#16382e]">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-500" /> 8. Inquiries &amp; Contact Information
            </h2>
            <p>
              For legal inquiries, partnership contracts, or questions regarding these Terms &amp; Conditions, please contact:
            </p>
            <div className="p-4 rounded-xl bg-white dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] space-y-1">
              <p className="font-bold text-brand-text dark:text-white">Artificial Quotient</p>
              <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
                <a href="mailto:artificialquotient01@gmail.com" className="hover:underline">
                  artificialquotient01@gmail.com
                </a>
              </p>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
