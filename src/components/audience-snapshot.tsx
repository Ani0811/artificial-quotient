import { BarChart3, Globe, ShieldCheck } from "lucide-react";

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
          <div className="bg-brand-bg dark:bg-zinc-950 rounded-xl p-8 border border-brand-border dark:border-zinc-800 shadow-sm">
            <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2 text-brand-text dark:text-white">
              <BarChart3 className="w-5 h-5 text-brand-blue" />
              Demographics
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-medium mb-2 text-brand-text dark:text-zinc-300">
                  <span>Age 25-34</span>
                  <span className="text-brand-blue font-bold">39.9%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-2">
                  <div className="bg-brand-blue h-2 rounded-full w-[39.9%]"></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm font-medium mb-2 text-brand-text dark:text-zinc-300">
                  <span>Age 18-24</span>
                  <span className="text-brand-blue font-bold">28.5%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-zinc-800 rounded-full h-2">
                  <div className="bg-brand-blue h-2 rounded-full w-[28.5%] opacity-70"></div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border dark:border-zinc-800">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1">Male</p>
                    <p className="text-xl font-bold text-brand-text dark:text-white">84.7%</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-brand-muted dark:text-zinc-400 mb-1">Female</p>
                    <p className="text-xl font-bold text-brand-text dark:text-white">15.3%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Geographies & Intent Card */}
          <div className="flex flex-col gap-8">
            <div className="bg-brand-bg dark:bg-zinc-950 rounded-xl p-8 border border-brand-border dark:border-zinc-800 shadow-sm">
              <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2 text-brand-text dark:text-white">
                <Globe className="w-5 h-5 text-brand-blue" />
                Top Geographies
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg border border-brand-border dark:border-zinc-800 shadow-sm text-brand-text dark:text-white">
                  <span className="flex items-center gap-2 font-medium"><span className="text-xl">🇺🇸</span> USA</span>
                  <span className="font-bold text-brand-blue">24.1%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg border border-brand-border dark:border-zinc-800 shadow-sm text-brand-text dark:text-white">
                  <span className="flex items-center gap-2 font-medium"><span className="text-xl">🇮🇳</span> India</span>
                  <span className="font-bold text-brand-blue">21.6%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg border border-brand-border dark:border-zinc-800 shadow-sm text-brand-text dark:text-white">
                  <span className="flex items-center gap-2 font-medium"><span className="text-xl">🇬🇧</span> UK</span>
                  <span className="font-bold text-brand-blue">4.6%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded-lg border border-brand-border dark:border-zinc-800 shadow-sm text-brand-text dark:text-white">
                  <span className="flex items-center gap-2 font-medium"><span className="text-xl">🇩🇪</span> Germany</span>
                  <span className="font-bold text-brand-blue">3.9%</span>
                </div>
              </div>
            </div>

            <div className="bg-brand-bg dark:bg-zinc-950 rounded-xl p-6 shadow-sm relative overflow-hidden border border-brand-border dark:border-zinc-800 transition-colors">
               <div className="absolute top-0 right-0 p-4 text-brand-blue/10 dark:text-brand-blue/20">
                 <ShieldCheck className="w-24 h-24" />
               </div>
               <h3 className="font-heading text-lg font-bold mb-2 text-brand-text dark:text-white relative z-10">High Buyer Intent</h3>
               <p className="text-brand-muted dark:text-zinc-400 text-sm mb-4 relative z-10">Our audience actively searches for SaaS tools to solve their workflow bottlenecks.</p>
               <div className="flex flex-wrap gap-2 relative z-10">
                 <span className="text-xs font-bold px-2.5 py-1 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-blue-300 rounded-md">Automation Builders</span>
                 <span className="text-xs font-bold px-2.5 py-1 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-blue-300 rounded-md">Tech Professionals</span>
                 <span className="text-xs font-bold px-2.5 py-1 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-blue-300 rounded-md">Agency Owners</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
