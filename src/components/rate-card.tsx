"use client";

import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function RateCard() {
  const [rates, setRates] = useState({
    dedicatedRate: "",
    integrationRate: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          if (data.rates) setRates(data.rates);
        }
      } catch {
        // Fall back to initial state
      }
    }
    load();
  }, []);

  return (
    <section className="w-full py-12 sm:py-16 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col gap-2 mb-12 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
            Simple, Transparent Pricing
          </h2>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg">
            Choose the sponsorship format that fits your launch goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
          {/* Tier 2: Integration */}
          <div className="bg-brand-card dark:bg-zinc-950 rounded-2xl p-5 sm:p-8 border border-brand-border dark:border-zinc-800 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-brand-blue/10 dark:hover:shadow-brand-blue/5 hover:border-brand-blue/40 dark:hover:border-brand-blue/40 group">
            <div className="mb-8">
              <h3 className="font-heading text-2xl font-bold mb-2 text-brand-text dark:text-white">60s Integration</h3>
              <p className="text-brand-muted dark:text-zinc-400 mb-4">A dedicated 60-second mid-roll segment seamlessly woven into a video tutorial.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-brand-text dark:text-white">{rates.integrationRate}</span>
                <span className="text-brand-muted dark:text-zinc-400 font-medium">/ video</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow text-brand-text dark:text-zinc-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <span className="font-medium">60-second dedicated segment</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <span>Link in description (above fold)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <span>Pinned comment with tracked link</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" />
                <span>Logo on screen</span>
              </li>
            </ul>
            
            <a 
              href="https://forms.gle/4uTUZkEi5o3iqYrs5"
              target="_blank"
              rel="noreferrer"
              className="block text-center w-full bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-700 text-brand-text dark:text-white group-hover:bg-brand-blue group-hover:text-white group-hover:border-brand-blue dark:group-hover:bg-brand-blue hover:bg-brand-blue-hover hover:text-white dark:hover:bg-brand-blue-hover font-bold py-3 rounded-lg transition-all duration-200 shadow-sm"
            >
              Book Integration
            </a>
          </div>

          {/* Tier 1: Dedicated */}
          <div className="bg-brand-card dark:bg-zinc-950 rounded-2xl p-5 sm:p-8 border-2 border-brand-blue shadow-md flex flex-col relative transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-brand-blue/15 group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-blue text-white px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
              Most Impact
            </div>
            
            <div className="mb-8">
              <h3 className="font-heading text-2xl font-bold mb-2 text-brand-text dark:text-white">Dedicated Video</h3>
              <p className="text-brand-muted dark:text-zinc-400 mb-4">A full 8-12 minute tutorial completely focused on your tool.</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold text-brand-text dark:text-white">{rates.dedicatedRate}</span>
                <span className="text-brand-muted dark:text-zinc-400 font-medium">/ video</span>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8 flex-grow text-brand-text dark:text-zinc-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <span className="font-medium">Full dedicated tutorial</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <span>Custom workflow &amp; resource links</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <span>Link in description (top line)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                <span>Permanent spot in Tool Vault</span>
              </li>
            </ul>
            
            <a 
              href="https://forms.gle/4uTUZkEi5o3iqYrs5"
              target="_blank"
              rel="noreferrer"
              className="block text-center w-full bg-brand-blue hover:bg-brand-blue-hover text-white font-bold py-3 rounded-lg transition-all duration-200 shadow-sm group-hover:shadow-md group-hover:scale-[1.02]"
            >
              Book Dedicated Video
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
