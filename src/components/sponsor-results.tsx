"use client";

import { ArrowUpRight, ExternalLink, X, Play, Sparkles, CheckCircle, Calendar, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { loadGoogleFont } from "./font-provider";
import Link from "next/link";

export interface SponsorResult {
  id: string;
  partnerName: string;
  campaignType: string;
  quote: string;
  quoteFont?: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  description?: string;
  deliverables?: string;
  ytUrl?: string;
  roiBreakdown?: string;
  publishDate?: string;
  logoUrl?: string;
  websiteUrl?: string;
  thumbnailUrl?: string;
}

function getYoutubeId(url?: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

function getYoutubeEmbedUrl(url?: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

interface SponsorResultsProps {
  sponsorResults?: SponsorResult[];
  isLoading?: boolean;
}

export default function SponsorResults({ sponsorResults, isLoading }: SponsorResultsProps) {
  const [results, setResults] = useState<SponsorResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<SponsorResult | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const touchStartX = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);

  useEffect(() => {
    if (sponsorResults !== undefined) {
      setResults(sponsorResults || []);
      setLoading(isLoading !== undefined ? isLoading : false);
      if (sponsorResults) {
        sponsorResults.forEach((s) => {
          if (s.quoteFont) loadGoogleFont(s.quoteFont);
        });
      }
      return;
    }

    async function load() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          if (data.sponsorResults) {
            setResults(data.sponsorResults);
            data.sponsorResults.forEach((s: SponsorResult) => {
              if (s.quoteFont) loadGoogleFont(s.quoteFont);
            });
          }
        }
      } catch {
        // Ignore error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [sponsorResults, isLoading]);

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

  const maxIndex = Math.max(0, results.length - itemsPerView);

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

  // Mouse Drag Support
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    dragStartXRef.current = e.clientX;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const diff = dragStartXRef.current - e.clientX;
    if (diff > 60) {
      handleNext();
    } else if (diff < -60) {
      handlePrev();
    }
    isDraggingRef.current = false;
  };

  const handleMouseLeave = () => {
    isDraggingRef.current = false;
  };

  useEffect(() => {
    if (loading || results.length === 0 || typeof window === "undefined") return;

    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#case-studies" || hash === "#case-studies-section") {
        const elem = document.getElementById("case-studies") || document.getElementById("case-studies-section");
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        }
      } else if (hash.startsWith("#case-study-") || hash.startsWith("#case-studies-")) {
        const query = hash.replace(/^#case-stud(y|ies)-/, "").toLowerCase();
        const found = results.find(
          (r) =>
            r.id.toLowerCase() === query ||
            r.partnerName.toLowerCase().replace(/[^a-z0-9]/g, "").includes(query.replace(/[^a-z0-9]/g, "")) ||
            query.replace(/[^a-z0-9]/g, "").includes(r.partnerName.toLowerCase().replace(/[^a-z0-9]/g, ""))
        );
        if (found) {
          const itemIndex = results.findIndex((r) => r.id === found.id);
          if (itemIndex !== -1) {
            setCurrentIndex(Math.min(maxIndex, itemIndex));
          }
          setSelectedCaseStudy(found);
          const elem = document.getElementById("case-studies") || document.getElementById("case-studies-section");
          if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
          }
        }
      }
    };

    const handleOpenCaseStudy = (e: Event) => {
      const customEvent = e as CustomEvent<{ id?: string; partnerName?: string }>;
      const { id, partnerName } = customEvent.detail || {};
      const found = results.find((r) => {
        if (id && r.id.toLowerCase() === id.toLowerCase()) return true;
        if (partnerName) {
          const normP = partnerName.toLowerCase().replace(/[^a-z0-9]/g, "");
          const normR = r.partnerName.toLowerCase().replace(/[^a-z0-9]/g, "");
          return normR.includes(normP) || normP.includes(normR);
        }
        return false;
      });

      if (found) {
        const itemIndex = results.findIndex((r) => r.id === found.id);
        if (itemIndex !== -1) {
          setCurrentIndex(Math.min(maxIndex, itemIndex));
        }
        setSelectedCaseStudy(found);
      }
      const elem = document.getElementById("case-studies") || document.getElementById("case-studies-section");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("open-case-study", handleOpenCaseStudy);
    window.addEventListener("hashchange", handleHash);

    const timer = setTimeout(handleHash, 150);

    return () => {
      window.removeEventListener("open-case-study", handleOpenCaseStudy);
      window.removeEventListener("hashchange", handleHash);
      clearTimeout(timer);
    };
  }, [loading, results, maxIndex]);

  if (loading) {
    return (
      <section id="case-studies" className="w-full py-20 px-4 bg-brand-bg dark:bg-[#061612] border-t border-brand-border dark:border-[#14352b] transition-colors">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-8 bg-emerald-500/10 rounded-lg w-64"></div>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="h-64 bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] rounded-2xl"></div>
            <div className="h-64 bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] rounded-2xl"></div>
            <div className="h-64 bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (results.length === 0) return null;

  const showControls = results.length > itemsPerView;

  return (
    <section id="case-studies" className="w-full py-16 sm:py-20 px-4 bg-brand-bg dark:bg-[#061612] border-t border-brand-border dark:border-[#14352b] transition-colors">
      <div className="max-w-6xl mx-auto">
        {/* Section Header with Carousel Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 text-center sm:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs w-fit mx-auto sm:mx-0">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Proven Campaign Results</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
              Sponsor Case Studies
            </h2>
            <p className="text-brand-muted dark:text-zinc-400 font-medium text-base sm:text-lg">
              Real outcomes and verified metrics from forward-thinking tech &amp; AI brand integrations.
            </p>
          </div>

          {/* Slideshow Controls */}
          {showControls && (
            <div className="flex items-center justify-center sm:justify-end gap-2.5 shrink-0 pt-2 sm:pt-0">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="w-10 h-10 rounded-xl border border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-text dark:text-white flex items-center justify-center transition-all hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                title="Previous Case Studies"
                aria-label="Previous Case Studies"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="w-10 h-10 rounded-xl border border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-text dark:text-white flex items-center justify-center transition-all hover:bg-emerald-500/10 hover:border-emerald-500/40 hover:text-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                title="Next Case Studies"
                aria-label="Next Case Studies"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Carousel Viewport Container */}
        <div 
          className="overflow-hidden relative select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
            }}
          >
            {results.map((item, idx) => {
              const ytId = getYoutubeId(item.ytUrl);
              const thumbImg = item.thumbnailUrl === "none" ? null : (item.thumbnailUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null));

              return (
                <div
                  key={item.id || idx}
                  className="px-2.5 sm:px-3 shrink-0 transition-all duration-300 flex flex-col"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div 
                    onClick={() => setSelectedCaseStudy(item)}
                    className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-6 border border-brand-border dark:border-zinc-800 shadow-sm flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 overflow-hidden cursor-pointer"
                  >
                    {/* Ambient top border glow line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div>
                      {/* Thumbnail Image Banner */}
                      {thumbImg && (
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-5 bg-zinc-950 border border-brand-border/80 dark:border-zinc-800/80 shadow-sm group/thumb">
                          <img 
                            src={thumbImg} 
                            alt={`${item.partnerName} Case Study Thumbnail`}
                            loading="lazy" 
                            decoding="async" 
                            onError={(e) => {
                              const target = e.currentTarget;
                              if (target.src.includes("maxresdefault.jpg")) {
                                target.src = target.src.replace("maxresdefault.jpg", "hqdefault.jpg");
                              }
                            }}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-600/90 group-hover:border-emerald-400">
                              <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between gap-2 mb-4">
                        {item.websiteUrl ? (
                          <a
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 bg-brand-bg dark:bg-zinc-950 px-2.5 sm:px-3 py-1.5 rounded-xl border border-brand-border dark:border-zinc-800 font-bold text-xs sm:text-sm text-brand-text dark:text-white transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 group/link shrink-0 min-w-0"
                            title={`Visit ${item.partnerName} Website`}
                          >
                            {item.logoUrl ? (
                              <img src={item.logoUrl} alt={item.partnerName} width={18} height={18} loading="lazy" decoding="async" className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain rounded shrink-0" />
                            ) : null}
                            <span className="whitespace-nowrap truncate">{item.partnerName}</span>
                            <ExternalLink className="w-3 h-3 text-emerald-500 opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all shrink-0" />
                          </a>
                        ) : (
                          <div className="bg-brand-bg dark:bg-zinc-950 px-2.5 sm:px-3 py-1.5 rounded-xl border border-brand-border dark:border-zinc-800 font-bold text-xs sm:text-sm text-brand-text dark:text-white flex items-center gap-1.5 shrink-0 min-w-0">
                            {item.logoUrl ? (
                              <img src={item.logoUrl} alt={item.partnerName} width={18} height={18} loading="lazy" decoding="async" className="w-4 h-4 sm:w-4.5 sm:h-4.5 object-contain rounded shrink-0" />
                            ) : null}
                            <span className="whitespace-nowrap truncate">{item.partnerName}</span>
                          </div>
                        )}

                        <span className="text-[10px] sm:text-xs font-bold px-2.5 py-1 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-full border border-emerald-500/20 leading-tight whitespace-nowrap shrink-0">
                          {item.campaignType}
                        </span>
                      </div>

                      {item.quote && (
                        <p 
                          style={{ fontFamily: item.quoteFont ? `'${item.quoteFont}', cursive, sans-serif` : undefined }}
                          className="font-handwritten text-xl sm:text-2xl text-brand-text dark:text-zinc-200 mb-6 transition-colors duration-300 group-hover:text-brand-text dark:group-hover:text-white line-clamp-3"
                        >
                          &quot;{item.quote}&quot;
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <div className="border-t border-brand-border dark:border-zinc-800 pt-4 transition-colors duration-300 group-hover:border-emerald-500/20 dark:group-hover:border-zinc-700 mb-4">
                        <div className="p-2.5 rounded-xl bg-brand-bg/60 dark:bg-zinc-950/40 border border-brand-border/60 dark:border-zinc-800/60 transition-all duration-300 hover:bg-emerald-500/5 dark:hover:bg-zinc-800/50">
                          <p className="text-xs text-brand-muted dark:text-zinc-400 mb-0.5 font-medium">{item.stat1Label}</p>
                          <p className="text-lg sm:text-xl font-bold text-brand-text dark:text-white flex items-center justify-between">
                            <span>{item.stat1Value}</span>
                            <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform pt-1">
                        <span>View Breakdown &amp; Deliverables &rarr;</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        {showControls && (
          <div className="flex justify-center items-center gap-1.5 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={() => setCurrentIndex(dotIdx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === dotIdx
                    ? "w-8 bg-emerald-500"
                    : "w-2 bg-brand-border dark:bg-zinc-800 hover:bg-emerald-500/40"
                }`}
                title={`Go to slide ${dotIdx + 1}`}
                aria-label={`Go to slide ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* CASE STUDY DETAIL MODAL */}
      {selectedCaseStudy && (
        <div 
          className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-start sm:items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in pt-16 sm:pt-20 pb-10"
          onClick={() => setSelectedCaseStudy(null)}
        >
          <div 
            className="bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative space-y-5 my-auto max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-brand-border dark:border-[#16382e]">
              <div className="space-y-1.5 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold px-3 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                    {selectedCaseStudy.campaignType}
                  </span>
                  {selectedCaseStudy.publishDate && (
                    <span className="text-xs text-brand-muted dark:text-emerald-200/70 font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {selectedCaseStudy.publishDate}
                    </span>
                  )}
                </div>

                <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-brand-text dark:text-white flex items-center gap-2.5">
                  {selectedCaseStudy.logoUrl && (
                    <img src={selectedCaseStudy.logoUrl} alt="" width={28} height={28} loading="lazy" decoding="async" className="w-7 h-7 object-contain rounded shrink-0" />
                  )}
                  <span className="truncate">{selectedCaseStudy.partnerName} Case Study</span>
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                className="w-9 h-9 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/30 transition-colors shrink-0"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* YouTube Video Embed or Thumbnail Preview */}
            {getYoutubeEmbedUrl(selectedCaseStudy.ytUrl) ? (
              <div className="w-full aspect-video rounded-2xl overflow-hidden border border-brand-border dark:border-[#16382e] shadow-md bg-black">
                <iframe
                  src={getYoutubeEmbedUrl(selectedCaseStudy.ytUrl)!}
                  title={`${selectedCaseStudy.partnerName} Sponsorship Integration`}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (selectedCaseStudy.thumbnailUrl && selectedCaseStudy.thumbnailUrl !== "none") ? (
              <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-brand-border dark:border-[#16382e] shadow-md bg-black group/modal-thumb">
                <img 
                  src={selectedCaseStudy.thumbnailUrl} 
                  alt={`${selectedCaseStudy.partnerName} Thumbnail`}
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes("maxresdefault.jpg")) {
                      target.src = target.src.replace("maxresdefault.jpg", "hqdefault.jpg");
                    }
                  }}
                  className="w-full h-full object-cover" 
                />
                {selectedCaseStudy.ytUrl && (
                  <a
                    href={selectedCaseStudy.ytUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="absolute inset-0 bg-black/40 hover:bg-black/20 flex items-center justify-center transition-all"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl border border-emerald-400">
                      <Play className="w-6 h-6 fill-current ml-1" />
                    </div>
                  </a>
                )}
              </div>
            ) : selectedCaseStudy.ytUrl ? (
              <a
                href={selectedCaseStudy.ytUrl}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 font-bold text-sm flex items-center justify-between hover:bg-emerald-500/20 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <Play className="w-5 h-5 text-emerald-500 fill-current" />
                  <span>Watch Featured Integration Video on YouTube</span>
                </div>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : null}

            {/* Testimonial Quote */}
            {selectedCaseStudy.quote && (
              <div className="p-4 sm:p-5 rounded-2xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e]">
                <p 
                  style={{ fontFamily: selectedCaseStudy.quoteFont ? `'${selectedCaseStudy.quoteFont}', cursive, sans-serif` : undefined }}
                  className="font-handwritten text-lg sm:text-xl text-brand-text dark:text-emerald-100 italic leading-relaxed"
                >
                  &quot;{selectedCaseStudy.quote}&quot;
                </p>
              </div>
            )}

            {/* Stat Badges Stack */}
            <div className="flex flex-col gap-3">
              <div className="p-3.5 rounded-2xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e]">
                <span className="text-xs font-bold text-brand-muted dark:text-emerald-200/60 uppercase block mb-1">
                  {selectedCaseStudy.stat1Label}
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-brand-text dark:text-white">
                  {selectedCaseStudy.stat1Value}
                </span>
              </div>

              {selectedCaseStudy.roiBreakdown && (
                <div className="p-3.5 rounded-2xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e]">
                  <span className="text-xs font-bold text-brand-muted dark:text-emerald-200/60 uppercase block mb-1">
                    Campaign Impact
                  </span>
                  <div className="text-xs sm:text-sm font-semibold text-brand-text dark:text-emerald-200 space-y-1">
                    {selectedCaseStudy.roiBreakdown.includes("\n") ? (
                      selectedCaseStudy.roiBreakdown.split("\n").map((line, i) => (
                        <p key={i} className="leading-snug">{line}</p>
                      ))
                    ) : (
                      <span>{selectedCaseStudy.roiBreakdown}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Extended Description & Deliverables */}
            <div className="space-y-4 pt-1">
              {selectedCaseStudy.description && (
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-brand-text dark:text-white uppercase tracking-wider mb-1 flex items-center gap-2">
                    <Target className="w-4 h-4 text-emerald-500" /> Campaign Overview &amp; Goal
                  </h4>
                  <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/80 leading-relaxed bg-brand-bg dark:bg-[#061612] p-3.5 rounded-xl border border-brand-border dark:border-[#16382e]">
                    {selectedCaseStudy.description}
                  </p>
                </div>
              )}

              {selectedCaseStudy.deliverables && (
                <div>
                  <h4 className="font-heading font-bold text-xs sm:text-sm text-brand-text dark:text-white uppercase tracking-wider mb-1.5 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500" /> Videos &amp; Deliverables Made
                  </h4>
                  <div className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/90 leading-relaxed bg-brand-bg dark:bg-[#061612] p-3.5 rounded-xl border border-brand-border dark:border-[#16382e] space-y-2">
                    {selectedCaseStudy.deliverables.includes("\n") ? (
                      selectedCaseStudy.deliverables.split("\n").map((line, i) => (
                        <div key={i} className="flex items-start gap-2">
                          {line.startsWith("Videos Made:") ? (
                            <span className="font-bold text-emerald-400 block mb-1">{line}</span>
                          ) : (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                              <span className="font-medium text-brand-text dark:text-white">{line}</span>
                            </>
                          )}
                        </div>
                      ))
                    ) : (
                      <p>{selectedCaseStudy.deliverables}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Action Footer */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between pt-4 border-t border-brand-border dark:border-[#16382e] gap-3">
              <button
                type="button"
                onClick={() => setSelectedCaseStudy(null)}
                className="px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#16382e] text-xs font-bold text-brand-muted dark:text-emerald-200/70 hover:text-white transition-colors text-center cursor-pointer"
              >
                Close Breakdown
              </button>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {selectedCaseStudy.websiteUrl && (
                  <a
                    href={selectedCaseStudy.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all text-center"
                  >
                    <span>Visit Official Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                <a
                  href="https://forms.gle/4uTUZkEi5o3iqYrs5"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  Book Similar Campaign &rarr;
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
