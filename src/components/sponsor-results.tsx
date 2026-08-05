"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

interface SponsorResult {
  id: string;
  partnerName: string;
  campaignType: string;
  quote: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
}

export default function SponsorResults() {
  const [results, setResults] = useState<SponsorResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          if (data.sponsorResults) {
            setResults(data.sponsorResults);
          }
        }
      } catch {
        // Ignore error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-8 bg-emerald-500/10 rounded-lg w-56"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl"></div>
            <div className="h-64 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (results.length === 0) return null;

  return (
    <section className="w-full py-20 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
            Sponsor Results
          </h2>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg">
            Real campaign metrics from our recent brand partners.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {results.map((item, idx) => (
            <div 
              key={item.id || idx} 
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-brand-border dark:border-zinc-800 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 overflow-hidden"
            >
              {/* Ambient top border glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div>
                <div className="flex justify-between items-start mb-6">
                  <div className="bg-brand-bg dark:bg-zinc-950 px-4 py-2 rounded-lg border border-brand-border dark:border-zinc-800 font-bold text-lg text-brand-text dark:text-white transition-all duration-300 group-hover:border-emerald-500/40 group-hover:bg-emerald-500/5 dark:group-hover:bg-emerald-500/10 group-hover:text-emerald-500 dark:group-hover:text-emerald-400">
                    {item.partnerName}
                  </div>
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full transition-all duration-300 group-hover:scale-105 group-hover:bg-emerald-500 group-hover:text-white group-hover:shadow-sm cursor-default">
                    {item.campaignType}
                  </span>
                </div>
                <p className="font-handwritten text-2xl text-brand-text dark:text-zinc-200 mb-6 transition-colors duration-300 group-hover:text-brand-text dark:group-hover:text-white">
                  &quot;{item.quote}&quot;
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 border-t border-brand-border dark:border-zinc-800 pt-6 transition-colors duration-300 group-hover:border-emerald-500/20 dark:group-hover:border-zinc-700">
                <div className="p-2 rounded-xl transition-all duration-300 hover:bg-emerald-500/5 dark:hover:bg-zinc-800/50">
                  <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1 font-medium transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">{item.stat1Label}</p>
                  <p className="text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
                    <span className="transition-transform duration-300 group-hover:scale-105 inline-block">{item.stat1Value}</span>
                    <ArrowUpRight className="w-5 h-5 text-emerald-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110" />
                  </p>
                </div>
                <div className="p-2 rounded-xl transition-all duration-300 hover:bg-emerald-500/5 dark:hover:bg-zinc-800/50">
                  <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1 font-medium transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">{item.stat2Label}</p>
                  <p className="text-2xl font-bold text-emerald-500 transition-transform duration-300 group-hover:scale-110 inline-block">{item.stat2Value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
