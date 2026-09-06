"use client";

import { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, Clock, Sparkles, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    inquiryType: "Sponsorship & Advertising",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "An error occurred. Please try again.");
      }
    } catch (err) {
      setError("Failed to submit inquiry. Please check your internet connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
    setFormData({
      name: "",
      email: "",
      inquiryType: "Sponsorship & Advertising",
      subject: "",
      message: "",
    });
  };

  const faqs = [
    {
      q: "What is your typical turnaround time for sponsorships?",
      a: "Dedicated video integration scripts are aligned 1-2 weeks in advance. Production and publishing typically take 5-7 business days once product access is granted.",
    },
    {
      q: "Do you build custom AI automation workflows for businesses?",
      a: "Yes! We design, build, and optimize custom Make.com, n8n, and Python AI agent workflows tailored to your specific business operations.",
    },
    {
      q: "What types of AI software and tools do you feature?",
      a: "We feature and create workflow tutorials for high-performing AI video generators, automation agents, productivity software, and SaaS platforms that solve real bottlenecks.",
    },
  ];

  return (
    <div className="w-full min-h-screen py-16 px-4 bg-brand-bg dark:bg-zinc-950 text-brand-text dark:text-zinc-100 transition-colors relative overflow-hidden">
      {/* Background Accent Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Page Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue font-semibold text-xs mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Let&apos;s Connect & Build</span>
          </div>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-brand-text dark:text-white mb-4 tracking-tight">
            Get in Touch
          </h1>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg max-w-2xl mx-auto leading-relaxed">
            Have a question about sponsorships, custom AI automation workflows, or general inquiries? We&apos;d love to hear from you.
          </p>
        </div>

        {/* Main Grid: Contact Info Cards + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Direct Info Cards (4 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Email Contact Card */}
            <div className="bg-brand-card dark:bg-zinc-900/90 border border-brand-border dark:border-zinc-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-brand-blue/50 dark:hover:border-zinc-700 transition-all">
              <div className="w-12 h-12 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-4 border border-brand-blue/20 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-text dark:text-white mb-1">Direct Email</h3>
              <p className="text-brand-muted dark:text-zinc-400 text-sm mb-4">For booking inquiries, sponsorships, and direct partnerships.</p>
              <a
                href="mailto:artificialquotient01@gmail.com"
                className="inline-flex items-center gap-2 text-brand-blue hover:text-blue-400 font-semibold text-sm transition-colors"
              >
                artificialquotient01@gmail.com
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* YouTube & Community Card */}
            <div className="bg-brand-card dark:bg-zinc-900/90 border border-brand-border dark:border-zinc-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-red-500/50 dark:hover:border-zinc-700 transition-all">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-500 dark:text-red-400 flex items-center justify-center mb-4 border border-red-500/20 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-text dark:text-white mb-1">YouTube Channel</h3>
              <p className="text-brand-muted dark:text-zinc-400 text-sm mb-4">Join 10K+ automation builders learning weekly AI workflows.</p>
              <a
                href="https://www.youtube.com/@ArtificialQuotient01"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-semibold text-sm transition-colors"
              >
                @ArtificialQuotient01
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Response Time Notice Card */}
            <div className="bg-brand-card/50 dark:bg-zinc-900/50 border border-brand-border dark:border-zinc-800/80 rounded-2xl p-6 flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-500/10 dark:bg-zinc-800 text-amber-500 dark:text-amber-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-brand-text dark:text-white text-sm mb-1">Quick Response Guarantee</h4>
                <p className="text-brand-muted dark:text-zinc-400 text-xs leading-relaxed">
                  We review all inquiries promptly and typically respond within 24 hours during business days.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Form (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl p-8 shadow-2xl relative">
              {submitted ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-brand-text dark:text-white mb-2">Message Received!</h3>
                  <p className="text-brand-muted dark:text-zinc-400 text-sm max-w-md mb-8">
                    Thank you for reaching out. We have received your message and will get back to you shortly at <span className="text-brand-text dark:text-white font-medium">{formData.email}</span>.
                  </p>
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-brand-bg dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 text-brand-text dark:text-white font-medium text-sm transition-colors border border-brand-border dark:border-zinc-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="flex items-center gap-2 mb-2 pb-4 border-b border-brand-border dark:border-zinc-800">
                    <MessageSquare className="w-5 h-5 text-brand-blue" />
                    <h2 className="font-heading text-xl font-bold text-brand-text dark:text-white">Send Us a Message</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-zinc-400 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-brand-bg dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-zinc-400 mb-2">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-brand-bg dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-zinc-400 mb-2">
                        Inquiry Type
                      </label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="w-full bg-brand-bg dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-brand-text dark:text-white focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
                      >
                        <option value="Sponsorship & Advertising">Sponsorship & Advertising</option>
                        <option value="Custom AI Automation Workflow">Custom AI Automation Workflow</option>
                        <option value="Tool Feature Request">Tool Feature Request</option>
                        <option value="Media Kit Request">Media Kit Request</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-zinc-400 mb-2">
                        Subject
                      </label>
                      <input
                        type="text"
                        placeholder="Project or Inquiry Subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-brand-bg dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-muted dark:text-zinc-400 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us about your project, timeline, or inquiry..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-brand-bg dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-600 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-colors resize-none"
                    ></textarea>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-brand-blue hover:bg-blue-600 disabled:opacity-50 text-white font-bold text-sm py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQs Section */}
        <div className="mt-20 pt-12 border-t border-brand-border dark:border-zinc-800/80">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-brand-text dark:text-white mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-brand-muted dark:text-zinc-400 text-sm">
              Quick answers to common questions about working with Artificial Quotient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-brand-card dark:bg-zinc-900/60 border border-brand-border dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <h4 className="font-heading font-semibold text-brand-text dark:text-white text-base mb-2">{faq.q}</h4>
                <p className="text-brand-muted dark:text-zinc-400 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
