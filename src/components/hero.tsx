import { Play, Users, TrendingUp, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full pt-24 pb-16 px-4 relative overflow-hidden transition-colors">
      
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 dark:bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        
        {/* Left Column: Copy */}
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card dark:bg-zinc-900/90 border border-brand-border dark:border-emerald-500/20 shadow-sm w-fit">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-semibold text-brand-muted dark:text-emerald-400 uppercase tracking-wider">Open for Q3 Sponsorships</span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-6xl font-bold leading-tight text-brand-text dark:text-white text-balance">
            Automate Your Workflows. <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">Scale Your Impact.</span>
          </h1>
          
          <p className="text-lg text-brand-muted dark:text-zinc-300 max-w-xl font-body leading-relaxed">
            Artificial Quotient is the premier destination for automation builders and AI enthusiasts looking to optimize their tech stack. Put your tool in front of an audience that builds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a 
              href="https://forms.gle/4uTUZkEi5o3iqYrs5" 
              target="_blank" 
              rel="noreferrer" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-xl font-bold text-lg text-center transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Sponsor the Channel
            </a>
            <Link href="/#case-studies" className="bg-brand-card dark:bg-zinc-900/90 hover:bg-gray-50 dark:hover:bg-zinc-800 text-brand-text dark:text-white border border-brand-border dark:border-zinc-800 px-8 py-4 rounded-xl font-bold text-lg text-center transition-all shadow-sm hover:-translate-y-0.5">
              View Case Studies
            </Link>
          </div>
        </div>

        {/* Right Column: Premium Floating Snapshot Card */}
        <div className="relative group">
          {/* Ambient Card Background Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-blue-500/30 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>

          <div className="bg-zinc-950/95 dark:bg-zinc-950/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl text-white transform md:rotate-2 group-hover:rotate-0 transition-all duration-500 relative z-10 border border-zinc-800/80 group-hover:border-emerald-500/40 overflow-hidden">
            
            {/* Top Decorative Line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-blue-500"></div>

            {/* Header: Logo, Branding & Subscribe Button */}
            <div className="flex justify-between items-start mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500/40 shadow-lg bg-zinc-900 flex items-center justify-center transition-transform group-hover:scale-105">
                    <img 
                      src="/logo/logo.jpeg" 
                      alt="Artificial Quotient Official Logo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-zinc-950 p-1 rounded-full border-2 border-zinc-950 shadow-md">
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-extrabold text-xl tracking-tight text-white">Artificial Quotient</h3>
                  </div>
                  <p className="text-zinc-400 text-xs font-medium flex items-center gap-1 mt-0.5">
                    <span>@ArtificialQuotient</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-600"></span>
                    <span className="text-emerald-400 font-semibold">Tech &amp; AI</span>
                  </p>
                </div>
              </div>

              <a
                href="https://www.youtube.com/@ArtificialQuotient01"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-md shadow-red-600/30 cursor-pointer shrink-0"
              >
                <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe
              </a>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800/80 transition-all hover:border-emerald-500/30 hover:bg-zinc-900">
                <p className="text-zinc-400 text-xs mb-1 font-medium flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" /> Subscribers
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-heading font-extrabold text-white">10.1k</span>
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-0.5">
                    <TrendingUp className="w-3 h-3" /> Active
                  </span>
                </div>
              </div>

              <div className="bg-zinc-900/80 rounded-2xl p-4 border border-zinc-800/80 transition-all hover:border-cyan-500/30 hover:bg-zinc-900">
                <p className="text-zinc-400 text-xs mb-1 font-medium flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-cyan-400" /> Monthly Views
                </p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-heading font-extrabold text-white">69.5k</span>
                  <span className="text-xs font-bold text-cyan-400 flex items-center gap-0.5">
                    <Sparkles className="w-3 h-3" /> Growing
                  </span>
                </div>
              </div>
            </div>
            
            {/* Avg Retention Gauge Section */}
            <div className="bg-zinc-900/50 rounded-2xl p-4 border border-zinc-800/60">
              <div className="flex justify-between items-center mb-2 text-xs">
                <span className="text-zinc-400 font-medium flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Avg. Viewer Retention
                </span>
                <span className="font-bold text-white bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30">
                  27%
                </span>
              </div>

              <div className="w-full bg-zinc-800/80 rounded-full h-2.5 overflow-hidden p-0.5 border border-zinc-700/50">
                <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full w-[27%] transition-all duration-1000 shadow-[0_0_12px_rgba(16,185,129,0.6)]"></div>
              </div>

              <p className="text-[11px] text-zinc-400 mt-2 flex justify-between items-center">
                <span>Top Tier Engagement</span>
                <span className="text-zinc-400 font-semibold">Targeted Tech Audience</span>
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

