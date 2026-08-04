import { Play, Users } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full pt-24 pb-16 px-4 relative overflow-hidden transition-colors">
      
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Copy */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 shadow-sm w-fit">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
            <span className="text-xs font-medium text-brand-muted dark:text-zinc-400 uppercase tracking-wider">Open for Q3 Sponsorships</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight text-brand-text dark:text-white text-balance">
            Automate Your Workflows. <span className="text-brand-blue">Scale Your Impact.</span>
          </h1>
          
          <p className="text-lg text-brand-muted dark:text-zinc-400 max-w-xl font-body leading-relaxed">
            Artificial Quotient is the premier destination for automation builders and AI enthusiasts looking to optimize their tech stack. Put your tool in front of an audience that builds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/sponsor" className="bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-4 rounded-lg font-bold text-lg text-center transition-all shadow-sm">
              Sponsor the Channel
            </Link>
            <Link href="/case-studies" className="bg-brand-card dark:bg-zinc-900 hover:bg-gray-50 dark:hover:bg-zinc-800 text-brand-text dark:text-white border border-brand-border dark:border-zinc-800 px-8 py-4 rounded-lg font-bold text-lg text-center transition-all shadow-sm">
              View Case Studies
            </Link>
          </div>
        </div>

        {/* Right Column: Floating Snapshot Card */}
        <div className="relative">
          <div className="bg-brand-dark dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl text-white transform md:rotate-2 hover:rotate-0 transition-transform duration-300 relative z-10 border border-white/10 dark:border-zinc-800">
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/10 dark:bg-zinc-800 flex items-center justify-center text-2xl">
                  🐼
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl">Artificial Quotient</h3>
                  <p className="text-gray-400 text-sm">{"@" + "ArtificialQuotient"}</p>
                </div>
              </div>
              <a
                href={"https://www.youtube.com/" + "@" + "ArtificialQuotient01"}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wide transition-all hover:scale-105 active:scale-95 inline-block cursor-pointer shadow-sm hover:shadow-red-600/30"
              >
                Subscribe
              </a>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-400 text-sm mb-1 font-medium flex items-center gap-1">
                  <Users className="w-4 h-4" /> Subscribers
                </p>
                <p className="text-3xl font-heading font-bold">10.1k</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1 font-medium flex items-center gap-1">
                  <Play className="w-4 h-4" /> Monthly Views
                </p>
                <p className="text-3xl font-heading font-bold">69.5k</p>
              </div>
            </div>
            
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div className="bg-brand-green h-2 rounded-full w-[27%]"></div>
            </div>
            <p className="text-sm text-gray-400 flex justify-between">
              <span>Avg. Retention</span>
              <span className="font-bold text-white">27%</span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
