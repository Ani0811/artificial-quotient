"use client";

import { useRef, useEffect, useState } from "react";
import { Sparkles, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { BrandItem } from "@/types";

// Cycling palette for brand cards — assigned by index modulo
const ACCENT_PALETTE = [
  "from-emerald-500 to-teal-400",
  "from-amber-400 to-orange-500",
  "from-indigo-500 to-purple-500",
  "from-purple-500 to-pink-500",
  "from-cyan-400 to-blue-500",
  "from-rose-500 to-red-400",
  "from-lime-400 to-emerald-500",
  "from-sky-400 to-indigo-500",
];

interface BrandCarouselProps {
  brands?: BrandItem[];
}

export default function BrandCarousel({ brands }: BrandCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<BrandItem[]>(brands ?? []);

  // Fetch from API if no brands passed as props
  useEffect(() => {
    if (brands && brands.length > 0) {
      setItems(brands);
      return;
    }
    fetch("/api/admin/data")
      .then((r) => r.json())
      .then((data) => {
        if (data.brandItems && data.brandItems.length > 0) {
          setItems(data.brandItems);
        }
      })
      .catch(() => {});
  }, [brands]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Duplicate items for seamless continuous looping
  const displayItems = items.length > 0 ? [...items, ...items] : [];

  if (items.length === 0) {
    return (
      <section id="brands" className="w-full py-12 sm:py-16 px-4 border-t border-brand-border dark:border-zinc-800/80 transition-colors relative overflow-hidden bg-brand-bg/50 dark:bg-zinc-950/40">
        <div className="max-w-6xl mx-auto text-center py-10 text-brand-muted dark:text-zinc-500 text-sm font-medium">
          No brands configured yet.
        </div>
      </section>
    );
  }

  return (
    <section id="brands" className="w-full py-12 sm:py-16 px-4 border-t border-brand-border dark:border-zinc-800/80 transition-colors relative overflow-hidden bg-brand-bg/50 dark:bg-zinc-950/40">
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[250px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-10 text-center sm:text-left">
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
              className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 text-brand-text dark:text-white flex items-center justify-center hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm active:scale-95 z-30"
              aria-label="Previous Brands"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-xl bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 text-brand-text dark:text-white flex items-center justify-center hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:border-emerald-500 transition-all shadow-sm active:scale-95 z-30"
              aria-label="Next Brands"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Continuous GPU-Accelerated Marquee Carousel */}
        <div className="relative group/container overflow-hidden rounded-2xl">
          {/* Left & Right Gradient Mask Fades */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-brand-bg dark:from-zinc-950 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-brand-bg dark:from-zinc-950 to-transparent z-20 pointer-events-none"></div>

          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-none py-2 select-none"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="animate-marquee-smooth gap-6 py-1">
              {displayItems.map((brand, idx) => {
                const accent = ACCENT_PALETTE[idx % ACCENT_PALETTE.length];
                return (
                  <div
                    key={`${brand.id}-${idx}`}
                    className="shrink-0 w-[290px] sm:w-[320px] bg-white dark:bg-zinc-900/90 rounded-2xl p-6 border border-brand-border dark:border-zinc-800/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:border-emerald-500/40 relative overflow-hidden"
                  >
                    {/* Top Gradient Line on Hover */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accent} opacity-70 group-hover:opacity-100 transition-opacity`}></div>

                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-heading font-extrabold text-xl text-brand-text dark:text-white tracking-tight flex items-center gap-2">
                          {brand.logoUrl ? (
                            <img
                              src={brand.logoUrl}
                              alt={brand.name}
                              width={24}
                              height={24}
                              className="w-6 h-6 object-contain rounded"
                              loading="lazy"
                              decoding="async"
                            />
                          ) : null}
                          {(brand.logoText || brand.name).replace(/^\?\s*/, "")}
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
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
