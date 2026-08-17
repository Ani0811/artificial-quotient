import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock, Eye, Server, UserCheck, Mail, FileText } from "lucide-react";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Artificial Quotient",
  description: "Privacy policy for Artificial Quotient. Learn how we handle client data, sponsorship inquiries, and visitor information with security and transparency.",
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-3.5 h-3.5" /> Privacy &amp; Data Protection
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm sm:text-base text-brand-muted dark:text-emerald-200/70">
            Last Updated: <span className="font-semibold text-brand-text dark:text-white">{lastUpdated}</span>
          </p>
          <p className="text-sm sm:text-base text-brand-muted dark:text-emerald-200/80 leading-relaxed">
            Artificial Quotient (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) values your privacy. This Privacy Policy outlines how we collect, use, and protect information when you visit our website, submit sponsorship inquiries, or collaborate with us on creator partnerships.
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-brand-muted dark:text-emerald-100/90">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <Eye className="w-5 h-5 text-emerald-500" /> 1. Information We Collect
            </h2>
            <p>
              We only collect information necessary to fulfill sponsorship inquiries, communicate with partners, and maintain portfolio functionality:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-brand-text dark:text-white font-medium">
              <li><strong className="text-emerald-500">Contact &amp; Proposal Details:</strong> Names, business email addresses, company/brand names, website URLs, and campaign briefs submitted via our contact forms or sponsorship intake questionnaires.</li>
              <li><strong className="text-emerald-500">Communications:</strong> Email correspondences and messages related to campaign planning, asset delivery, and contract execution.</li>
              <li><strong className="text-emerald-500">Technical Log Information:</strong> Standard, non-personally identifiable server requests (such as browser type and response status) used exclusively for performance monitoring and site uptime.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-500" /> 2. How We Use Your Information
            </h2>
            <p>
              The information we collect is strictly utilized for legitimate business purposes:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Evaluating and responding to sponsorship proposals and media inquiries.</li>
              <li>Executing campaign deliverables, video production, and tracking link setups.</li>
              <li>Displaying aggregated, verified public case studies and campaign benchmarks (with partner consent).</li>
              <li>Sending invoices, contracts, and administrative campaign updates.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-500" /> 3. Data Sharing &amp; Third-Party Services
            </h2>
            <p>
              <strong className="text-brand-text dark:text-white">We do not sell, rent, or trade your personal information.</strong> We only share information with trusted third-party providers required to operate our services:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong className="text-brand-text dark:text-white">Google Workspace &amp; Forms:</strong> Used for secure email communication and sponsorship intake processing.</li>
              <li><strong className="text-brand-text dark:text-white">YouTube / Google Services:</strong> Content is distributed via YouTube under the standard YouTube Terms of Service and Google Privacy Policy.</li>
              <li><strong className="text-brand-text dark:text-white">Hosting Infrastructure:</strong> Secure cloud servers that host this media kit application.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" /> 4. Data Security &amp; Retention
            </h2>
            <p>
              We implement industry-standard security safeguards (including SSL/TLS encryption and strict access controls) to protect your information from unauthorized access, alteration, or disclosure.
            </p>
            <p>
              Client records and campaign correspondences are retained only for as long as necessary to maintain legal, accounting, and active sponsorship relationship records.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-emerald-500" /> 5. Your Rights &amp; Data Choices
            </h2>
            <p>
              You have the right to request access to the personal information we hold about you, request corrections, or request deletion of your contact data from our active records. To exercise these rights, please email us directly.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-500" /> 6. Policy Updates
            </h2>
            <p>
              We may update this Privacy Policy periodically to reflect changes in our practices or regulatory standards. The updated effective date will always be displayed at the top of this document.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-6 border-t border-brand-border dark:border-[#16382e]">
            <h2 className="font-heading text-xl sm:text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-emerald-500" /> 7. Contact Us
            </h2>
            <p>
              If you have any questions or concerns regarding our privacy practices or this policy, please reach out to us at:
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
