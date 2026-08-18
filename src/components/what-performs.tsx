"use client";

import { Play, ChevronLeft, ChevronRight, Eye, MousePointerClick, Sparkles, ExternalLink } from "lucide-react";
import { useEffect, useState, useRef } from "react";

interface PerformItem {
  id: string | number;
  title: string;
  views: string;
  clicks: string;
  type: string;
  thumb?: string;
  thumbnail?: string;
  ytUrl?: string;
  highlight?: string;
}

function getYoutubeId(url?: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

interface WhatPerformsProps {
  whatPerforms?: PerformItem[];
  isLoading?: boolean;
}

export default function WhatPerforms({ whatPerforms, isLoading }: WhatPerformsProps) {
  const [items, setItems] = useState<PerformItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const touchStartX = useRef<number | null>(null);

  // Sync / fetch data
  useEffect(() => {
    if (whatPerforms !== undefined) {
      setItems(whatPerforms || []);
      setLoading(isLoading !== undefined ? isLoading : false);
      return;
    }

    async function load() {
      try {
        const res = await fetch("/api/admin/data", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.whatPerforms) {
            setItems(data.whatPerforms);
          }
        }
      } catch {
        // Ignore error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [whatPerforms, isLoading]);

  // Responsive window resize listener for cards per view
  useEffect(() => {
    function updateItemsPerView() {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    }

    updateItemsPerView();
    window.addEventListener("resize", updateItemsPerView);
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  const maxIndex = Math.max(0, items.length - itemsPerView);

  // Clamp current index if itemsPerView changes
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  // Touch Swipe Support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  if (loading) {
    return (
      <section className="w-full py-16 sm:py-20 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-8 bg-emerald-500/10 rounded-lg w-64"></div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="h-64 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl"></div>
            <div className="h-64 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl"></div>
            <div className="h-64 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  const showControls = items.length > itemsPerView;
  const totalPages = maxIndex + 1;

  return (
    <section className="w-full py-16 sm:py-20 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors bg-brand-bg dark:bg-[#061612]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-center sm:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs w-fit mx-auto sm:mx-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Audience Engagement</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
              What Performs on the Channel
            </h2>
            <p className="text-brand-muted dark:text-zinc-400 font-medium text-base sm:text-lg">
              Our audience loves actionable workflow tutorials, AI tool reviews, and step-by-step guides.
            </p>
          </div>

          {/* Slideshow Arrow Controls */}
          {showControls && (
            <div className="flex items-center justify-center sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-xl border border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-text dark:text-white flex items-center justify-center transition-all hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                title="Previous videos"
                aria-label="Previous videos"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="w-10 h-10 rounded-xl border border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-text dark:text-white flex items-center justify-center transition-all hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                title="Next videos"
                aria-label="Next videos"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Viewport Container */}
        <div 
          className="overflow-hidden relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {items.map((study, idx) => {
              const ytId = getYoutubeId(study.ytUrl);
              const thumbImg = study.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null);

              return (
                <div
                  key={study.id || idx}
                  className="px-2.5 sm:px-3 shrink-0 transition-all duration-300 flex flex-col"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-brand-border dark:border-zinc-800/90 overflow-hidden shadow-sm flex flex-col h-full group hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all duration-300 relative">
                    {/* Top Ambient Glow Line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Video Thumbnail Media Card */}
                    <div className="aspect-video bg-zinc-950 flex items-center justify-center text-5xl relative overflow-hidden group/thumb shrink-0">
                      {thumbImg ? (
                        <img
                          src={thumbImg}
                          alt={study.title}
                          width={480}
                          height={270}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <span className="text-4xl">{study.thumb || "🎬"}</span>
                      )}

                      {/* Centered Play Button Overlay */}
                      {study.ytUrl ? (
                        <a
                          href={study.ytUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors flex items-center justify-center cursor-pointer"
                          title={`Watch "${study.title}" on YouTube`}
                        >
                          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-600/90 group-hover:border-emerald-400">
                            <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                          </div>
                        </a>
                      ) : (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center">
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          </div>
                        </div>
                      )}

                      {/* Top Category Badge */}
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[11px] font-bold px-2.5 py-1 rounded-lg text-white border border-white/10 shadow-sm">
                        {study.type || "Tutorial"}
                      </div>

                      {/* Top Right Highlight Badge */}
                      {study.highlight && (
                        <div className="absolute top-3 right-3 bg-emerald-500/90 backdrop-blur-md text-[10px] font-extrabold px-2 py-0.5 rounded-md text-zinc-950 uppercase tracking-wider shadow-sm">
                          {study.highlight}
                        </div>
                      )}
                    </div>

                    {/* Card Content: Title + Metrics + Action in a flex-1 flex flex-col justify-between container */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
                      {/* Video Title Section with min-height for uniform alignment */}
                      <div className="min-h-[4.2rem] sm:min-h-[4.75rem] flex flex-col justify-start">
                        {study.ytUrl ? (
                          <a
                            href={study.ytUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="block font-heading text-base sm:text-lg font-bold text-brand-text dark:text-white line-clamp-3 group-hover:text-emerald-500 transition-colors leading-snug"
                            title={study.title}
                          >
                            {study.title}
                          </a>
                        ) : (
                          <h3 className="font-heading text-base sm:text-lg font-bold text-brand-text dark:text-white line-clamp-3 leading-snug">
                            {study.title}
                          </h3>
                        )}
                      </div>

                      {/* Bottom Section: Metrics + Button pinned together */}
                      <div className="mt-4 space-y-3.5">
                        {/* Performance Metrics Row */}
                        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-brand-border dark:border-zinc-800/80">
                          <div className="bg-brand-bg/60 dark:bg-zinc-950/60 p-2 rounded-xl border border-brand-border/60 dark:border-zinc-800/60 flex items-center gap-2">
                            <Eye className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-[10px] uppercase font-bold text-brand-muted dark:text-zinc-400">Views</div>
                              <div className="text-xs sm:text-sm font-extrabold text-brand-text dark:text-white truncate">{study.views}</div>
                            </div>
                          </div>

                          <div className="bg-brand-bg/60 dark:bg-zinc-950/60 p-2 rounded-xl border border-brand-border/60 dark:border-zinc-800/60 flex items-center gap-2">
                            <MousePointerClick className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                            <div className="min-w-0">
                              <div className="text-[10px] uppercase font-bold text-brand-muted dark:text-zinc-400">Clicks</div>
                              <div className="text-xs sm:text-sm font-extrabold text-brand-text dark:text-white truncate">{study.clicks}</div>
                            </div>
                          </div>
                        </div>

                        {/* Watch on YouTube Link */}
                        {study.ytUrl && (
                          <a
                            href={study.ytUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-2 px-3 rounded-xl bg-brand-bg dark:bg-zinc-950 text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-between border border-brand-border dark:border-zinc-800 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group/link"
                          >
                            <span>Watch Video on YouTube</span>
                            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slideshow Pagination Dots */}
        {showControls && totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, pageIdx) => (
              <button
                key={pageIdx}
                type="button"
                onClick={() => setCurrentIndex(pageIdx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === pageIdx
                    ? "w-8 bg-emerald-500 shadow-sm shadow-emerald-500/50"
                    : "w-2 bg-gray-300 dark:bg-zinc-800 hover:bg-emerald-500/40"
                }`}
                title={`Go to slide ${pageIdx + 1}`}
                aria-label={`Go to slide ${pageIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
