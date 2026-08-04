import Link from "next/link";
import { Mail, ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-brand-border/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-md transition-colors relative overflow-hidden">
      {/* Background Accent Orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-blue/5 dark:bg-brand-blue/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 dark:bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-border dark:border-zinc-800/80">
          
          {/* Brand & Mission Column (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-purple-600 flex items-center justify-center text-xl shadow-md text-white">
                🐼
              </div>
              <span className="font-heading font-bold text-xl text-brand-text dark:text-white tracking-tight">
                Artificial<span className="text-brand-blue">Quotient</span>
              </span>
            </div>

            <p className="text-brand-muted dark:text-zinc-400 text-sm leading-relaxed max-w-sm">
              The premier hub for AI automation tutorials, workflow deep-dives, and tool reviews. Connecting tech builders with high-performing SaaS.
            </p>

            <div className="flex items-center gap-3 pt-2">
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
                href="mailto:sponsor@artificialquotient.com"
                className="w-10 h-10 rounded-xl bg-brand-blue/10 hover:bg-brand-blue/20 text-brand-blue dark:text-blue-400 flex items-center justify-center transition-all hover:scale-105 border border-brand-blue/20"
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

          {/* Navigation Links Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-text dark:text-white">
              Sponsorship
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/sponsor" className="text-brand-muted dark:text-zinc-400 hover:text-brand-blue dark:hover:text-white transition-colors flex items-center gap-1">
                  Rate Cards
                </Link>
              </li>
              <li>
                <Link href="/stats" className="text-brand-muted dark:text-zinc-400 hover:text-brand-blue dark:hover:text-white transition-colors">
                  Audience Snapshot
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-brand-muted dark:text-zinc-400 hover:text-brand-blue dark:hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-text dark:text-white">
              Content Hub
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools" className="text-brand-muted dark:text-zinc-400 hover:text-brand-blue dark:hover:text-white transition-colors">
                  Tool Vault
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-brand-muted dark:text-zinc-400 hover:text-brand-blue dark:hover:text-white transition-colors">
                  Blog & Guides
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:sponsor@artificialquotient.com?subject=Custom%20Partnership"
                  className="text-brand-muted dark:text-zinc-400 hover:text-brand-blue dark:hover:text-white transition-colors flex items-center gap-1"
                >
                  Custom Media Kit <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Admin Column */}
          <div className="flex flex-col gap-3">
            <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-brand-text dark:text-white">
              Direct Contact
            </h4>
            <div className="space-y-2 text-sm">
              <p className="text-brand-muted dark:text-zinc-400">
                Bookings & Inquiries:
              </p>
              <a 
                href="mailto:sponsor@artificialquotient.com" 
                className="font-medium text-brand-blue dark:text-blue-400 hover:underline block truncate"
              >
                sponsor@artificialquotient.com
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-brand-muted dark:text-zinc-500">
          <p>
            &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Artificial Quotient. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/10 text-brand-green font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
            <span>Q3 Sponsorships Available</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
