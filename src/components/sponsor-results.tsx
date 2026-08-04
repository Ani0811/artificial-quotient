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
          <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-brand-border dark:border-zinc-800 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-blue/10 dark:hover:shadow-brand-blue/5 hover:border-brand-blue/40 dark:hover:border-brand-blue/40 overflow-hidden">
            {/* Ambient top border glow line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-brand-bg dark:bg-zinc-950 px-4 py-2 rounded-lg border border-brand-border dark:border-zinc-800 font-bold text-lg text-brand-text dark:text-white transition-all duration-300 group-hover:border-brand-blue/40 group-hover:bg-brand-blue/5 dark:group-hover:bg-brand-blue/10 group-hover:text-brand-blue dark:group-hover:text-blue-400">
                  Revid.AI
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-blue group-hover:text-white group-hover:shadow-sm group-hover:shadow-brand-blue/30 cursor-default">
                  Dedicated Video
                </span>
              </div>
              <p className="font-handwritten text-2xl text-brand-text dark:text-zinc-200 mb-6 transition-colors duration-300 group-hover:text-brand-text dark:group-hover:text-white">
                &quot;The highest converting sponsorship we&apos;ve ran this quarter. Incredible audience fit.&quot;
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-brand-border dark:border-zinc-800 pt-6 transition-colors duration-300 group-hover:border-brand-blue/20 dark:group-hover:border-zinc-700">
              <div className="p-2 rounded-xl transition-all duration-300 hover:bg-brand-blue/5 dark:hover:bg-zinc-800/50">
                <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1 font-medium transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">Signups Generated</p>
                <p className="text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
                  <span className="transition-transform duration-300 group-hover:scale-105 inline-block">450+</span>
                  <ArrowUpRight className="w-5 h-5 text-brand-green transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110" />
                </p>
              </div>
              <div className="p-2 rounded-xl transition-all duration-300 hover:bg-brand-blue/5 dark:hover:bg-zinc-800/50">
                <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1 font-medium transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">Est. ROI Multiplier</p>
                <p className="text-2xl font-bold text-brand-green transition-transform duration-300 group-hover:scale-110 inline-block">3.2x</p>
              </div>
            </div>
          </div>

          {/* Result Card 2 */}
          <div className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-brand-border dark:border-zinc-800 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-green/10 dark:hover:shadow-brand-green/5 hover:border-brand-green/40 dark:hover:border-brand-green/40 overflow-hidden">
            {/* Ambient top border glow line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-green to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="bg-brand-bg dark:bg-zinc-950 px-4 py-2 rounded-lg border border-brand-border dark:border-zinc-800 font-bold text-lg text-brand-text dark:text-white transition-all duration-300 group-hover:border-brand-green/40 group-hover:bg-brand-green/5 dark:group-hover:bg-brand-green/10 group-hover:text-brand-green dark:group-hover:text-emerald-400">
                  Flashloop
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-brand-green/10 text-brand-green rounded-full transition-all duration-300 group-hover:scale-105 group-hover:bg-brand-green group-hover:text-white group-hover:shadow-sm group-hover:shadow-brand-green/30 cursor-default">
                  Integration
                </span>
              </div>
              <p className="font-handwritten text-2xl text-brand-text dark:text-zinc-200 mb-6 transition-colors duration-300 group-hover:text-brand-text dark:group-hover:text-white">
                &quot;We saw an immediate spike in traffic during the first 48 hours of upload.&quot;
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 border-t border-brand-border dark:border-zinc-800 pt-6 transition-colors duration-300 group-hover:border-brand-green/20 dark:group-hover:border-zinc-700">
              <div className="p-2 rounded-xl transition-all duration-300 hover:bg-brand-green/5 dark:hover:bg-zinc-800/50">
                <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1 font-medium transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">Link Clicks</p>
                <p className="text-2xl font-bold text-brand-text dark:text-white flex items-center gap-2">
                  <span className="transition-transform duration-300 group-hover:scale-105 inline-block">1,200+</span>
                  <ArrowUpRight className="w-5 h-5 text-brand-green transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-110" />
                </p>
              </div>
              <div className="p-2 rounded-xl transition-all duration-300 hover:bg-brand-green/5 dark:hover:bg-zinc-800/50">
                <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1 font-medium transition-colors duration-300 group-hover:text-zinc-600 dark:group-hover:text-zinc-300">Cost Per Click</p>
                <p className="text-2xl font-bold text-brand-green transition-transform duration-300 group-hover:scale-110 inline-block">$0.25</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
