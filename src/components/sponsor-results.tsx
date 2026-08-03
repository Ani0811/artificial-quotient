import { ArrowUpRight } from "lucide-react";

export default function SponsorResults() {
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
          {/* Result Card 1 */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-brand-border dark:border-zinc-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-brand-bg dark:bg-zinc-950 px-4 py-2 rounded-lg border border-brand-border dark:border-zinc-800 font-bold text-lg text-brand-text dark:text-white">
                  Revid.AI
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full">Dedicated Video</span>
              </div>
              <p className="font-handwritten text-2xl text-brand-text dark:text-zinc-200 mb-6">
                &quot;The highest converting sponsorship we&apos;ve ran this quarter. Incredible audience fit.&quot;
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-brand-border dark:border-zinc-800 pt-6">
              <div>
                <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1 font-medium">Signups Generated</p>
                <p className="text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
                  450+ <ArrowUpRight className="w-5 h-5 text-brand-green" />
                </p>
              </div>
              <div>
                <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1 font-medium">Est. ROI Multiplier</p>
                <p className="text-2xl font-bold text-brand-green">3.2x</p>
              </div>
            </div>
          </div>

          {/* Result Card 2 */}
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-brand-border dark:border-zinc-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-brand-bg dark:bg-zinc-950 px-4 py-2 rounded-lg border border-brand-border dark:border-zinc-800 font-bold text-lg text-brand-text dark:text-white">
                  Flashloop
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-brand-green/10 text-brand-green rounded-full">Integration</span>
              </div>
              <p className="font-handwritten text-2xl text-brand-text dark:text-zinc-200 mb-6">
                &quot;We saw an immediate spike in traffic during the first 48 hours of upload.&quot;
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-brand-border dark:border-zinc-800 pt-6">
              <div>
                <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1 font-medium">Link Clicks</p>
                <p className="text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
                  1,200+ <ArrowUpRight className="w-5 h-5 text-brand-green" />
                </p>
              </div>
              <div>
                <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1 font-medium">Cost Per Click</p>
                <p className="text-2xl font-bold text-brand-green">$0.25</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
