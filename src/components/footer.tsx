"use client";

import Link from "next/link";
import { Mail, Sparkles } from "lucide-react";
import { handleSmoothScroll } from "@/lib/scroll";
import { LogoImage } from "@/components/ui/logo-image";

export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-border/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md transition-colors relative overflow-hidden">
      {/* Background Accent Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 dark:bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-500/5 dark:bg-teal-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10 pb-12 border-b border-brand-border dark:border-zinc-800/80">
          
          {/* Brand & Mission Column (Spans full on mobile/tablet, 2 cols on lg) */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/30 shadow-md flex items-center justify-center bg-brand-dark dark:bg-zinc-800">
                <LogoImage 
                  alt="Artificial Quotient Logo" 
                  width={40} 
                  height={40} 
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <span className="font-heading font-bold text-xl text-brand-text dark:text-white tracking-tight">
                Artificial<span className="text-emerald-500">Quotient</span>
              </span>
            </div>

            <p className="text-brand-muted dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
              The premier hub for AI automation tutorials, workflow deep-dives, and tool reviews. Connecting tech builders with high-performing SaaS.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href={"https://www.youtube.com/" + "@" + "ArtificialQuotient01"}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center transition-all hover:scale-105 border border-red-500/20"
                aria-label="YouTube Channel"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a
                href="mailto:artificialquotient01@gmail.com"
                className="w-10 h-10 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center transition-all hover:scale-105 border border-emerald-500/20"
                aria-label="Email Us"
              >
                <Mail className="w-5 h-5" />
              </a>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 text-xs font-semibold text-brand-text dark:text-zinc-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>10.1k Subscribers</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="col-span-1 flex flex-col gap-3">
            <h3 className="font-heading font-bold text-sm text-brand-text dark:text-white uppercase tracking-wider">
              Explore
            </h3>
            <Link 
              href="/#brands" 
              onClick={(e) => handleSmoothScroll(e, "brands")}
              className="text-sm text-brand-muted dark:text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              Sponsor Brands
            </Link>
            <Link 
              href="/#stats" 
              onClick={(e) => handleSmoothScroll(e, "stats")}
              className="text-sm text-brand-muted dark:text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              Channel Stats
            </Link>
            <Link 
              href="/#case-studies" 
              onClick={(e) => handleSmoothScroll(e, "case-studies")}
              className="text-sm text-brand-muted dark:text-zinc-400 hover:text-emerald-500 transition-colors"
            >
              Case Studies
            </Link>
          </div>

          {/* Sponsoring Column */}
          <div className="col-span-1 flex flex-col gap-3">
            <h3 className="font-heading font-bold text-sm text-brand-text dark:text-white uppercase tracking-wider">
              Sponsorships
            </h3>
            <a href="https://forms.gle/4uTUZkEi5o3iqYrs5" target="_blank" rel="noreferrer" className="text-sm text-brand-muted dark:text-zinc-400 hover:text-emerald-500 transition-colors">
              Book Dedicated Video
            </a>
            <a href="https://forms.gle/4uTUZkEi5o3iqYrs5" target="_blank" rel="noreferrer" className="text-sm text-brand-muted dark:text-zinc-400 hover:text-emerald-500 transition-colors">
              Book Integration
            </a>
            <a href="mailto:artificialquotient01@gmail.com?subject=Sponsorship%20Inquiry" className="text-sm text-brand-muted dark:text-zinc-400 hover:text-emerald-500 transition-colors">
              Custom Campaign
            </a>
          </div>

          {/* Admin & Legal Column */}
          <div className="col-span-1 flex flex-col gap-3">
            <h3 className="font-heading font-bold text-sm text-brand-text dark:text-white uppercase tracking-wider">
              Management
            </h3>
            <Link href="/admin" className="text-sm text-brand-muted dark:text-zinc-400 hover:text-emerald-500 transition-colors">
              Admin Portal
            </Link>
            <Link href="/admin/login" className="text-sm text-brand-muted dark:text-zinc-400 hover:text-emerald-500 transition-colors">
              Admin Login
            </Link>
            <Link href="/contact" className="text-sm text-brand-muted dark:text-zinc-400 hover:text-emerald-500 transition-colors">
              Support &amp; Contact
            </Link>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-muted dark:text-zinc-500">
          <p>&copy; {new Date().getFullYear()} Artificial Quotient. All rights reserved.</p>
          <p>Built for AI Creators &amp; SaaS Partners.</p>
        </div>
      </div>
    </footer>
  );
}
