"use client";

import { ArrowUpRight, ExternalLink, X, Play, Sparkles, CheckCircle, Calendar, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
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
}

function getYoutubeEmbedUrl(url?: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : null;
}

export default function SponsorResults() {
  const [results, setResults] = useState<SponsorResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<SponsorResult | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          if (data.sponsorResults) {
            setResults(data.sponsorResults);
            data.sponsorResults.forEach((item: SponsorResult) => {
              if (item.quoteFont) loadGoogleFont(item.quoteFont);
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
  }, []);

  if (loading) {
    return (
      <section className="w-full py-20 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-8 bg-emerald-500/10 rounded-lg w-56"></div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="h-64 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl"></div>
            <div className="h-64 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (results.length === 0) return null;

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedResults = results.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      const sectionElem = document.getElementById("case-studies-section");
      if (sectionElem) {
        sectionElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const getGridLayout = (count: number) => {
    if (count === 1) return "grid grid-cols-1 max-w-xl mx-auto gap-4 sm:gap-6";
    if (count === 2) return "grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-4 sm:gap-6";
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6";
  };

  return (
    <section id="case-studies-section" className="w-full py-12 sm:py-16 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-semibold text-xs w-fit mx-auto md:mx-0">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Success Stories</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
            Sponsor Case Studies &amp; Performance
          </h2>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg">
            Click on any partner card below to explore full campaign deliverables and performance breakdown.
          </p>
        </div>

        <div className={getGridLayout(paginatedResults.length)}>
          {paginatedResults.map((item, idx) => (
            <div 
              key={item.id || idx} 
              onClick={() => setSelectedCaseStudy(item)}
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-5 sm:p-8 border border-brand-border dark:border-zinc-800 shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 overflow-hidden cursor-pointer"
            >
              {/* Ambient top border glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div>
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  {item.websiteUrl ? (
                    <a
                      href={item.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-2 bg-brand-bg dark:bg-zinc-950 px-3.5 py-1.5 rounded-xl border border-brand-border dark:border-zinc-800 font-bold text-sm sm:text-base text-brand-text dark:text-white transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:text-emerald-400 group/link shrink-0"
                      title={`Visit ${item.partnerName} Website`}
                    >
                      {item.logoUrl ? (
                        <img src={item.logoUrl} alt={item.partnerName} width={20} height={20} loading="lazy" decoding="async" className="w-5 h-5 object-contain rounded shrink-0" />
                      ) : null}
                      <span className="whitespace-nowrap">{item.partnerName}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-500 opacity-70 group-hover/link:opacity-100 group-hover/link:translate-x-0.5 transition-all" />
                    </a>
                  ) : (
                    <div className="bg-brand-bg dark:bg-zinc-950 px-3.5 py-1.5 rounded-xl border border-brand-border dark:border-zinc-800 font-bold text-sm sm:text-base text-brand-text dark:text-white flex items-center gap-2 shrink-0">
                      {item.logoUrl ? (
                        <img src={item.logoUrl} alt={item.partnerName} width={20} height={20} loading="lazy" decoding="async" className="w-5 h-5 object-contain rounded shrink-0" />
                      ) : null}
                      <span className="whitespace-nowrap">{item.partnerName}</span>
                    </div>
                  )}

                  <span className="text-[11px] sm:text-xs font-bold px-3 py-1 bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 rounded-full border border-emerald-500/20 leading-tight">
                    {item.campaignType}
                  </span>
                </div>
                {item.quote && (
                  <p 
                    style={{ fontFamily: item.quoteFont ? `'${item.quoteFont}', cursive, sans-serif` : undefined }}
                    className="font-handwritten text-2xl text-brand-text dark:text-zinc-200 mb-6 transition-colors duration-300 group-hover:text-brand-text dark:group-hover:text-white"
                  >
                    &quot;{item.quote}&quot;
                  </p>
                )}
              </div>
              
              <div>
                <div className="grid grid-cols-2 gap-4 border-t border-brand-border dark:border-zinc-800 pt-6 transition-colors duration-300 group-hover:border-emerald-500/20 dark:group-hover:border-zinc-700 mb-4">
                  <div className="p-2 rounded-xl transition-all duration-300 hover:bg-emerald-500/5 dark:hover:bg-zinc-800/50">
                    <p className="text-xs text-brand-muted dark:text-zinc-400 mb-1 font-medium">{item.stat1Label}</p>
                    <p className="text-xl font-bold text-brand-text dark:text-white flex items-center gap-1.5">
                      <span>{item.stat1Value}</span>
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    </p>
                  </div>
                  <div className="p-2 rounded-xl transition-all duration-300 hover:bg-emerald-500/5 dark:hover:bg-zinc-800/50">
                    <p className="text-xs text-brand-muted dark:text-zinc-400 mb-1 font-medium">{item.stat2Label}</p>
                    <p className="text-xl font-bold text-emerald-500">{item.stat2Value}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform pt-1">
                  <span>View Detailed Case Study &amp; Video &rarr;</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-brand-border dark:border-zinc-800">
            <span className="text-xs sm:text-sm font-semibold text-brand-muted dark:text-zinc-400">
              Showing <span className="font-bold text-brand-text dark:text-white">{startIndex + 1}</span>–<span className="font-bold text-brand-text dark:text-white">{Math.min(startIndex + ITEMS_PER_PAGE, results.length)}</span> of <span className="font-bold text-brand-text dark:text-white">{results.length}</span> Case Studies
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="p-2 rounded-xl border border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-text dark:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center border ${
                    currentPage === page
                      ? "bg-emerald-600 border-emerald-500 text-white shadow-md shadow-emerald-500/20"
                      : "border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-text dark:text-zinc-300 hover:bg-emerald-500/10 hover:border-emerald-500/30"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="p-2 rounded-xl border border-brand-border dark:border-zinc-800 bg-white dark:bg-zinc-900 text-brand-text dark:text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
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

            {/* YouTube Video Embed if available */}
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

            {/* Stat Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e]">
                <span className="text-xs font-bold text-brand-muted dark:text-emerald-200/60 uppercase block mb-1">
                  {selectedCaseStudy.stat1Label}
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-brand-text dark:text-white">
                  {selectedCaseStudy.stat1Value}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e]">
                <span className="text-xs font-bold text-brand-muted dark:text-emerald-200/60 uppercase block mb-1">
                  {selectedCaseStudy.stat2Label}
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-emerald-500">
                  {selectedCaseStudy.stat2Value}
                </span>
              </div>

              {selectedCaseStudy.roiBreakdown && (
                <div className="sm:col-span-2 md:col-span-1 p-3.5 rounded-2xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e]">
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
                className="px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#16382e] text-xs font-bold text-brand-muted dark:text-emerald-200/70 hover:text-white transition-colors text-center"
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

                <Link
                  href="/contact"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all text-center"
                >
                  Book Similar Campaign &rarr;
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
