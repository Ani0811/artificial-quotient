"use client";

import { useEffect, useState, useRef } from "react";
import { Sparkles, ChevronLeft, ChevronRight, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { BrandItem } from "@/types";
import { handleSmoothScroll } from "@/lib/scroll";

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
  const [items, setItems] = useState<BrandItem[]>(brands ?? []);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState<"forward" | "reverse">("forward");
  const touchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch from API if no brands passed as props
  useEffect(() => {
    if (brands !== undefined) {
      setItems(brands || []);
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

  // Clean up touch pause timer on unmount
  useEffect(() => {
    return () => {
      if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    };
  }, []);

  const handleTouchStart = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    setIsPaused(true);
  };

  const handleTouchEnd = () => {
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  };

  // Toggle or switch direction with previous / next buttons
  const handleDirectionChange = (newDirection: "forward" | "reverse") => {
    setDirection(newDirection);
    // Momentary pause to give clean visual feedback before resuming in new direction
    setIsPaused(true);
    if (touchTimeoutRef.current) clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 400);
  };

  if (items.length === 0) {
    return (
      <section id="brands" className="w-full py-12 sm:py-16 px-4 border-t border-brand-border dark:border-zinc-800/80 transition-colors relative overflow-hidden bg-brand-bg/50 dark:bg-zinc-950/40">
        <div className="max-w-6xl mx-auto text-center py-10 text-brand-muted dark:text-zinc-500 text-sm font-medium">
          No brands configured yet.
        </div>
      </section>
    );
  }

  // Double the items array for a seamless 2-track infinite loop (reduces DOM by 66% vs 6 sets)
  const displayItems = [...items, ...items];

  // Dynamic animation duration based on item count (approx 4.2 seconds per card)
  const animationDuration = `${Math.max(items.length * 4.2, 28)}s`;

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
              onClick={() => handleDirectionChange("reverse")}
              className={`w-10 h-10 rounded-xl border transition-all shadow-sm active:scale-95 z-30 cursor-pointer flex items-center justify-center ${
                direction === "reverse"
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white dark:bg-zinc-900 border-brand-border dark:border-zinc-800 text-brand-text dark:text-white hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:border-emerald-500"
              }`}
              aria-label="Previous Brands (Reverse Flow)"
              title="Reverse Marquee Flow"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDirectionChange("forward")}
              className={`w-10 h-10 rounded-xl border transition-all shadow-sm active:scale-95 z-30 cursor-pointer flex items-center justify-center ${
                direction === "forward"
                  ? "bg-emerald-500 text-white border-emerald-500"
                  : "bg-white dark:bg-zinc-900 border-brand-border dark:border-zinc-800 text-brand-text dark:text-white hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:border-emerald-500"
              }`}
              aria-label="Next Brands (Forward Flow)"
              title="Forward Marquee Flow"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hardware-Accelerated Infinite Marquee Carousel */}
        <div 
          className="relative group/container overflow-hidden rounded-2xl select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
        >
          {/* Left & Right Gradient Mask Fades */}
          <div className="absolute top-0 bottom-0 left-0 w-12 sm:w-20 bg-gradient-to-r from-brand-bg dark:from-zinc-950 to-transparent z-20 pointer-events-none"></div>
          <div className="absolute top-0 bottom-0 right-0 w-12 sm:w-20 bg-gradient-to-l from-brand-bg dark:from-zinc-950 to-transparent z-20 pointer-events-none"></div>

          {/* GPU Composited Track */}
          <div className="overflow-hidden py-3">
            <div 
              className={`flex gap-6 py-1 w-max ${
                direction === "forward" ? "animate-marquee-smooth" : "animate-marquee-reverse"
              } ${isPaused ? "pause-marquee" : ""}`}
              style={{ animationDuration }}
            >
              {displayItems.map((brand, idx) => {
                const accent = ACCENT_PALETTE[idx % ACCENT_PALETTE.length];
                return (
                  <div
                    key={`${brand.id}-${idx}`}
                    className="shrink-0 w-[285px] sm:w-[320px] bg-white dark:bg-zinc-900/90 rounded-2xl p-6 border border-brand-border dark:border-zinc-800/80 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:border-emerald-500/40 relative overflow-hidden transform-gpu"
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
                      <Link 
                        href="/#case-studies" 
                        onClick={(e) => handleSmoothScroll(e, "case-studies")}
                        className="hover:underline flex items-center gap-1"
                      >
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
