"use client";

import { useEffect, useState, useRef } from "react";
import { Sparkles, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface Brand {
  id: string;
  name: string;
  category: string;
  tagline: string;
  ytUrl?: string;
  accentColor: string;
  logoText: string;
}

const BRANDS: Brand[] = [
  {
    id: "revid",
    name: "Revid.AI",
    category: "AI Video Generator",
    tagline: "Automated viral short-form video generation platform.",
    ytUrl: "https://youtu.be/G_MW3vpfLxA?si=J-vDcmEjOt_P_M6u",
    accentColor: "from-emerald-500 to-teal-400",
    logoText: "🎬 Revid.AI",
  },
  {
    id: "flashloop",
    name: "Flashloop AI",
    category: "Character Animation",
    tagline: "Talking fruit & consistent character video creator.",
    ytUrl: "https://youtu.be/CO59xAteGRM?si=JMLIywF1ydT1MOsJ",
    accentColor: "from-amber-400 to-orange-500",
    logoText: "⚡ Flashloop",
  },
  {
    id: "marky",
    name: "Marky Agent",
    category: "Autonomous AI Agent",
    tagline: "File analysis, task automation & custom app builder.",
    ytUrl: "https://youtu.be/Oo9H89i6SYk?si=flMdazfrd1ef-feb",
    accentColor: "from-indigo-500 to-purple-500",
    logoText: "🤖 Marky Agent",
  },
  {
    id: "make",
    name: "Make.com",
    category: "Visual Automation",
    tagline: "The premier no-code visual workflow automation engine.",
    ytUrl: "https://make.com",
    accentColor: "from-purple-500 to-pink-500",
    logoText: "🟣 Make.com",
  },
  {
    id: "easypeasy",
    name: "Easy-Peasy.AI",
    category: "AI Workspace",
    tagline: "All-in-one AI copilot and content generation suite.",
    ytUrl: "https://easy-peasy.ai",
    accentColor: "from-cyan-400 to-blue-500",
    logoText: "✨ Easy-Peasy",
  },
];

export default function BrandCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll loop
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 320, behavior: "smooth" });
        }
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="brands" className="w-full py-16 px-4 border-t border-brand-border dark:border-zinc-800/80 transition-colors relative overflow-hidden bg-brand-bg/50 dark:bg-zinc-950/40">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-center sm:text-left">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified Creator Partnerships</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
              Brands We Have Partnered With
            </h2>
            <p className="text-brand-muted dark:text-zinc-400 font-medium text-sm md:text-base mt-1.5 max-w-xl">
              High-converting sponsorships &amp; dedicated workflow integrations for leading AI tools.
            </p>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 text-brand-text dark:text-white flex items-center justify-center hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm"
              aria-label="Previous Brands"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 text-brand-text dark:text-white flex items-center justify-center hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm"
              aria-label="Next Brands"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Brands Carousel */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex gap-6 overflow-x-auto scrollbar-none pb-4 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="snap-start shrink-0 w-[290px] sm:w-[320px] bg-white dark:bg-zinc-900/90 rounded-2xl p-6 border border-brand-border dark:border-zinc-800/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:border-emerald-500/40 relative overflow-hidden"
            >
              {/* Top Gradient Line on Hover */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${brand.accentColor} opacity-70 group-hover:opacity-100 transition-opacity`}></div>

              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-heading font-extrabold text-xl text-brand-text dark:text-white tracking-tight flex items-center gap-2">
                    {brand.logoText}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Sponsor
                  </span>
                </div>

                <span className="text-xs font-semibold text-brand-muted dark:text-emerald-400/90 mb-2 block">
                  {brand.category}
                </span>

                <p className="text-xs text-brand-muted dark:text-zinc-400 leading-relaxed mb-6 font-medium">
                  {brand.tagline}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-brand-border/60 dark:border-zinc-800/80 text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-0.5 transition-transform">
                <Link href="/#case-studies" className="hover:underline flex items-center gap-1">
                  <span>View Breakdown</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
                <Sparkles className="w-4 h-4 text-emerald-500/40 group-hover:text-emerald-500 transition-colors" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
