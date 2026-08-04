import { BarChart3, Globe, ShieldCheck } from "lucide-react";

// Country SVG Flags
const USAFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#bd3d44" d="M0 0h640v480H0z"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203h640M0 276.9h640M0 350.8h640M0 424.6h640"/>
    <path fill="#192f5d" d="M0 0h288v258.5H0z"/>
    <g fill="#fff">
      <circle cx="24" cy="24" r="8"/><circle cx="72" cy="24" r="8"/><circle cx="120" cy="24" r="8"/><circle cx="168" cy="24" r="8"/><circle cx="216" cy="24" r="8"/><circle cx="264" cy="24" r="8"/>
      <circle cx="48" cy="48" r="8"/><circle cx="96" cy="48" r="8"/><circle cx="144" cy="48" r="8"/><circle cx="192" cy="48" r="8"/><circle cx="240" cy="48" r="8"/>
      <circle cx="24" cy="72" r="8"/><circle cx="72" cy="72" r="8"/><circle cx="120" cy="72" r="8"/><circle cx="168" cy="72" r="8"/><circle cx="216" cy="72" r="8"/><circle cx="264" cy="72" r="8"/>
      <circle cx="48" cy="96" r="8"/><circle cx="96" cy="96" r="8"/><circle cx="144" cy="96" r="8"/><circle cx="192" cy="96" r="8"/><circle cx="240" cy="96" r="8"/>
      <circle cx="24" cy="120" r="8"/><circle cx="72" cy="120" r="8"/><circle cx="120" cy="120" r="8"/><circle cx="168" cy="120" r="8"/><circle cx="216" cy="120" r="8"/><circle cx="264" cy="120" r="8"/>
      <circle cx="48" cy="144" r="8"/><circle cx="96" cy="144" r="8"/><circle cx="144" cy="144" r="8"/><circle cx="192" cy="144" r="8"/><circle cx="240" cy="144" r="8"/>
      <circle cx="24" cy="168" r="8"/><circle cx="72" cy="168" r="8"/><circle cx="120" cy="168" r="8"/><circle cx="168" cy="168" r="8"/><circle cx="216" cy="168" r="8"/><circle cx="264" cy="168" r="8"/>
      <circle cx="48" cy="192" r="8"/><circle cx="96" cy="192" r="8"/><circle cx="144" cy="192" r="8"/><circle cx="192" cy="192" r="8"/><circle cx="240" cy="192" r="8"/>
      <circle cx="24" cy="216" r="8"/><circle cx="72" cy="216" r="8"/><circle cx="120" cy="216" r="8"/><circle cx="168" cy="216" r="8"/><circle cx="216" cy="216" r="8"/><circle cx="264" cy="216" r="8"/>
    </g>
  </svg>
);

const IndiaFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#f93" d="M0 0h640v160H0z"/>
    <path fill="#fff" d="M0 160h640v160H0z"/>
    <path fill="#128807" d="M0 320h640v160H0z"/>
    <circle cx="320" cy="240" r="50" fill="none" stroke="#000080" strokeWidth="10"/>
    <circle cx="320" cy="240" r="12" fill="#000080"/>
  </svg>
);

const UKFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path stroke="#fff" strokeWidth="60" d="m0 0 640 480M640 0 0 480"/>
    <path stroke="#C8102E" strokeWidth="40" d="m0 0 640 480M640 0 0 480"/>
    <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640"/>
    <path stroke="#C8102E" strokeWidth="60" d="M320 0v480M0 240h640"/>
  </svg>
);

const GermanyFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#000" d="M0 0h640v160H0z"/>
    <path fill="#D00" d="M0 160h640v160H0z"/>
    <path fill="#FFCE00" d="M0 320h640v160H0z"/>
  </svg>
);

export default function AudienceSnapshot() {
  return (
    <section className="w-full py-20 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
            Audience Snapshot
          </h2>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg">
            Who you&apos;re reaching when you sponsor Artificial Quotient.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Demographics Card */}
          <div className="group relative bg-brand-bg dark:bg-zinc-950 rounded-2xl p-8 border border-brand-border dark:border-zinc-800 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-blue/10 dark:hover:shadow-brand-blue/5 hover:border-brand-blue/40 dark:hover:border-brand-blue/40 overflow-hidden">
            {/* Ambient top border glow line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2 text-brand-text dark:text-white">
              <BarChart3 className="w-5 h-5 text-brand-blue transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              Demographics
            </h3>
            
            <div className="space-y-6">
              <div className="transition-transform duration-300 group-hover:translate-x-0.5">
                <div className="flex justify-between text-sm font-medium mb-2 text-brand-text dark:text-zinc-300">
                  <span>Age 25-34</span>
                  <span className="text-brand-blue font-bold transition-transform duration-300 group-hover:scale-105 inline-block">39.9%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-brand-blue h-2 rounded-full w-[39.9%] transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.6)] group-hover:brightness-110"></div>
                </div>
              </div>
              
              <div className="transition-transform duration-300 group-hover:translate-x-0.5">
                <div className="flex justify-between text-sm font-medium mb-2 text-brand-text dark:text-zinc-300">
                  <span>Age 18-24</span>
                  <span className="text-brand-blue font-bold transition-transform duration-300 group-hover:scale-105 inline-block">28.5%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-2 overflow-hidden">
                  <div className="bg-brand-blue h-2 rounded-full w-[28.5%] opacity-70 transition-all duration-500 group-hover:opacity-90 group-hover:shadow-[0_0_10px_rgba(59,130,246,0.4)]"></div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border dark:border-zinc-800 transition-colors duration-300 group-hover:border-brand-blue/20 dark:group-hover:border-zinc-700">
                <div className="flex gap-4">
                  <div className="flex-1 p-2 rounded-lg transition-all duration-300 hover:bg-brand-blue/5 dark:hover:bg-zinc-900/80">
                    <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1">Male</p>
                    <p className="text-xl font-bold text-brand-text dark:text-white transition-transform duration-300 group-hover:scale-105 inline-block">84.7%</p>
                  </div>
                  <div className="flex-1 p-2 rounded-lg transition-all duration-300 hover:bg-brand-blue/5 dark:hover:bg-zinc-900/80">
                    <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1">Female</p>
                    <p className="text-xl font-bold text-brand-text dark:text-white transition-transform duration-300 group-hover:scale-105 inline-block">15.3%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Geographies & Intent Card */}
          <div className="flex flex-col gap-8">
            <div className="group relative bg-brand-bg dark:bg-zinc-950 rounded-2xl p-8 border border-brand-border dark:border-zinc-800 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-blue/10 dark:hover:shadow-brand-blue/5 hover:border-brand-blue/40 dark:hover:border-brand-blue/40 overflow-hidden">
              {/* Ambient top border glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2 text-brand-text dark:text-white">
                <Globe className="w-5 h-5 text-brand-blue transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                Top Geographies
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="group/item flex items-center justify-between p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-brand-border dark:border-zinc-800 shadow-sm text-brand-text dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-brand-blue/40 hover:bg-brand-blue/5 dark:hover:bg-zinc-900/90 hover:shadow-md hover:shadow-brand-blue/10 cursor-pointer">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="transition-transform duration-200 group-hover/item:scale-125 inline-block">
                      <USAFlag />
                    </span>
                    <span className="font-semibold">USA</span>
                  </span>
                  <span className="font-bold text-brand-blue transition-transform duration-200 group-hover/item:scale-110">24.1%</span>
                </div>
                <div className="group/item flex items-center justify-between p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-brand-border dark:border-zinc-800 shadow-sm text-brand-text dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-brand-blue/40 hover:bg-brand-blue/5 dark:hover:bg-zinc-900/90 hover:shadow-md hover:shadow-brand-blue/10 cursor-pointer">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="transition-transform duration-200 group-hover/item:scale-125 inline-block">
                      <IndiaFlag />
                    </span>
                    <span className="font-semibold">India</span>
                  </span>
                  <span className="font-bold text-brand-blue transition-transform duration-200 group-hover/item:scale-110">21.6%</span>
                </div>
                <div className="group/item flex items-center justify-between p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-brand-border dark:border-zinc-800 shadow-sm text-brand-text dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-brand-blue/40 hover:bg-brand-blue/5 dark:hover:bg-zinc-900/90 hover:shadow-md hover:shadow-brand-blue/10 cursor-pointer">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="transition-transform duration-200 group-hover/item:scale-125 inline-block">
                      <UKFlag />
                    </span>
                    <span className="font-semibold">UK</span>
                  </span>
                  <span className="font-bold text-brand-blue transition-transform duration-200 group-hover/item:scale-110">4.6%</span>
                </div>
                <div className="group/item flex items-center justify-between p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-brand-border dark:border-zinc-800 shadow-sm text-brand-text dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-brand-blue/40 hover:bg-brand-blue/5 dark:hover:bg-zinc-900/90 hover:shadow-md hover:shadow-brand-blue/10 cursor-pointer">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="transition-transform duration-200 group-hover/item:scale-125 inline-block">
                      <GermanyFlag />
                    </span>
                    <span className="font-semibold">Germany</span>
                  </span>
                  <span className="font-bold text-brand-blue transition-transform duration-200 group-hover/item:scale-110">3.9%</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-brand-bg dark:bg-zinc-950 rounded-2xl p-6 shadow-sm overflow-hidden border border-brand-border dark:border-zinc-800 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-blue/10 dark:hover:shadow-brand-blue/5 hover:border-brand-blue/40 dark:hover:border-brand-blue/40">
              {/* Ambient top border glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-blue to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute top-0 right-0 p-4 text-brand-blue/10 dark:text-brand-blue/20 transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-6 group-hover:text-brand-blue/25 dark:group-hover:text-brand-blue/35 pointer-events-none">
                <ShieldCheck className="w-24 h-24" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-brand-text dark:text-white relative z-10 transition-colors duration-300 group-hover:text-brand-blue dark:group-hover:text-blue-400">
                High Buyer Intent
              </h3>
              <p className="text-brand-muted dark:text-zinc-400 text-sm mb-4 relative z-10">
                Our audience actively searches for SaaS tools to solve their workflow bottlenecks.
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                <span className="text-xs font-bold px-3 py-1.5 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-blue-300 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue dark:hover:text-white cursor-pointer hover:shadow-md hover:shadow-brand-blue/20">
                  Automation Builders
                </span>
                <span className="text-xs font-bold px-3 py-1.5 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-blue-300 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue dark:hover:text-white cursor-pointer hover:shadow-md hover:shadow-brand-blue/20">
                  Tech Professionals
                </span>
                <span className="text-xs font-bold px-3 py-1.5 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-blue-300 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-brand-blue hover:text-white dark:hover:bg-brand-blue dark:hover:text-white cursor-pointer hover:shadow-md hover:shadow-brand-blue/20">
                  Agency Owners
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
