"use client";

import React, { useState } from "react";
import { Plus, Trash2, Sparkles, Save, Eye, EyeOff, ChevronUp, ChevronDown, ChevronsUp, ChevronsDown, GripVertical } from "lucide-react";
import { SponsorItem } from "@/types";
import { QUOTE_FONT_OPTIONS, loadGoogleFont } from "@/components/font-provider";
import { getYoutubeId } from "../../utils";
import defaultSiteData from "@/data/site-data.json";

interface CaseStudiesTabProps {
  sponsorResults: SponsorItem[];
  setSponsorResults: React.Dispatch<React.SetStateAction<SponsorItem[]>>;
  isViewer: boolean;
  uploadingField: string | null;
  handleInlineMediaUpload: (files: FileList | null, setFieldUrl: (url: string) => void, fieldId: string) => Promise<void>;
  setNotification?: React.Dispatch<React.SetStateAction<{ type: "success" | "error"; message: string } | null>>;
  onSave: () => Promise<void>;
}

export function CaseStudiesTab({
  sponsorResults,
  setSponsorResults,
  isViewer,
  uploadingField,
  handleInlineMediaUpload,
  setNotification,
  onSave,
}: CaseStudiesTabProps) {
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);

  const moveCaseStudy = (fromIdx: number, toIdx: number) => {
    if (toIdx < 0 || toIdx >= sponsorResults.length || fromIdx === toIdx) return;
    const next = [...sponsorResults];
    const [movedItem] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, movedItem);
    setSponsorResults(next);
    if (setNotification) {
      setNotification({
        type: "success",
        message: `Moved "${movedItem.partnerName}" to position #${toIdx + 1}. Click 'Save Sponsor Results' to publish.`,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">Partner Case Studies</h3>
          <p className="text-xs text-brand-muted dark:text-emerald-200/60 mt-0.5">
            Reorder freely: pick any position from the <strong>Pos #</strong> dropdown, use <strong>arrow buttons</strong>, or <strong>drag &amp; drop</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isViewer}
            onClick={() => {
              if (window.confirm("Reset Sponsor Case Studies to the latest default seeded case studies (including Flova AI)?")) {
                setSponsorResults(defaultSiteData.sponsorResults as any);
                setNotification?.({
                  type: "success",
                  message: "Sponsor Case Studies reset to default seed data (including Flova AI)! Click 'Save Changes' to publish.",
                });
              }
            }}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Reset to Default Seed Data
          </button>
          <button
            type="button"
            disabled={isViewer}
            onClick={() => setSponsorResults([...sponsorResults, {
              id: Date.now().toString(),
              partnerName: "New Sponsor",
              campaignType: "Integration",
              quote: "Awesome results!",
              stat1Label: "Conversions",
              stat1Value: "200+",
              stat2Label: "ROI",
              stat2Value: "2.5x",
              hidden: false,
            }])}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Case Study
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {sponsorResults.map((item, idx) => {
          const isDraggingThis = draggedIdx === idx;
          const isOverThis = dragOverIdx === idx && draggedIdx !== idx;

          return (
            <div 
              key={item.id} 
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (dragOverIdx !== idx) setDragOverIdx(idx);
              }}
              onDragLeave={() => {
                if (dragOverIdx === idx) setDragOverIdx(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                const fromStr = e.dataTransfer.getData("text/plain");
                const fromIdx = fromStr !== "" ? parseInt(fromStr, 10) : draggedIdx;
                if (fromIdx !== null && !isNaN(fromIdx) && fromIdx !== idx) {
                  moveCaseStudy(fromIdx, idx);
                }
                setDraggedIdx(null);
                setDragOverIdx(null);
              }}
              className={`p-5 rounded-2xl border bg-brand-bg dark:bg-[#061612] space-y-4 relative transition-all ${
                isDraggingThis 
                  ? "opacity-30 scale-[0.99] border-dashed border-emerald-500" 
                  : isOverThis
                  ? "border-emerald-500 ring-2 ring-emerald-500/50 bg-emerald-500/[0.08]"
                  : item.hidden 
                  ? "border-amber-500/40 dark:border-amber-500/30 bg-amber-500/[0.02]" 
                  : "border-brand-border dark:border-[#16382e]"
              }`}
            >
              {/* Card Action Controls: Reorder, Visibility, Delete */}
              <div className="absolute top-4 right-4 flex items-center gap-1.5 sm:gap-2">
                {/* Reorder Buttons (Top, Up, Down, Bottom) */}
                <div className="flex items-center bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] rounded-xl p-0.5 shadow-sm">
                  <button
                    type="button"
                    disabled={isViewer || idx === 0}
                    onClick={() => moveCaseStudy(idx, 0)}
                    className="p-1 sm:p-1.5 text-brand-muted hover:text-emerald-600 dark:text-emerald-200/70 dark:hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                    title={idx === 0 ? "Already at the top" : "Jump to first position (#1)"}
                    aria-label="Jump to top"
                  >
                    <ChevronsUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={isViewer || idx === 0}
                    onClick={() => moveCaseStudy(idx, idx - 1)}
                    className="p-1 sm:p-1.5 text-brand-muted hover:text-emerald-600 dark:text-emerald-200/70 dark:hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                    title={idx === 0 ? "Already at the top" : "Move case study up 1 position"}
                    aria-label="Move case study up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={isViewer || idx === sponsorResults.length - 1}
                    onClick={() => moveCaseStudy(idx, idx + 1)}
                    className="p-1 sm:p-1.5 text-brand-muted hover:text-emerald-600 dark:text-emerald-200/70 dark:hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                    title={idx === sponsorResults.length - 1 ? "Already at the bottom" : "Move case study down 1 position"}
                    aria-label="Move case study down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    disabled={isViewer || idx === sponsorResults.length - 1}
                    onClick={() => moveCaseStudy(idx, sponsorResults.length - 1)}
                    className="p-1 sm:p-1.5 text-brand-muted hover:text-emerald-600 dark:text-emerald-200/70 dark:hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-colors disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
                    title={idx === sponsorResults.length - 1 ? "Already at the bottom" : `Jump to last position (#${sponsorResults.length})`}
                    aria-label="Jump to bottom"
                  >
                    <ChevronsDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Visibility Toggle Button */}
                <button
                  type="button"
                  disabled={isViewer}
                  onClick={() => {
                    const next = [...sponsorResults];
                    const newHidden = !next[idx].hidden;
                    next[idx] = { ...next[idx], hidden: newHidden };
                    setSponsorResults(next);
                    if (setNotification) {
                      setNotification({
                        type: "success",
                        message: newHidden
                          ? `"${item.partnerName}" is now hidden from the public landing page. Click 'Save Sponsor Results' to publish.`
                          : `"${item.partnerName}" is now visible on the public landing page. Click 'Save Sponsor Results' to publish.`,
                      });
                    }
                  }}
                  className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${
                    item.hidden
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25"
                      : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                  }`}
                  title={item.hidden ? "Case study is currently hidden from the public site. Click to make visible." : "Case study is currently visible on the public site. Click to hide."}
                >
                  {item.hidden ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Hidden</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Visible</span>
                    </>
                  )}
                </button>

                {/* Delete Button */}
                <button
                  type="button"
                  disabled={isViewer}
                  onClick={() => setSponsorResults(sponsorResults.filter(s => s.id !== item.id))}
                  className="text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  title="Delete case study"
                  aria-label="Delete case study"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Position Jump Dropdown & Drag Handle */}
              <div className="flex items-center gap-2.5 pb-1 flex-wrap">
                <div 
                  draggable={!isViewer}
                  onDragStart={(e) => {
                    setDraggedIdx(idx);
                    e.dataTransfer.effectAllowed = "move";
                    e.dataTransfer.setData("text/plain", idx.toString());
                  }}
                  onDragEnd={() => {
                    setDraggedIdx(null);
                    setDragOverIdx(null);
                  }}
                  className={`flex items-center gap-1.5 text-brand-muted dark:text-emerald-300/70 p-1 rounded-lg hover:bg-brand-card dark:hover:bg-[#0c201a] border border-transparent hover:border-brand-border dark:hover:border-[#16382e] ${!isViewer ? "cursor-grab active:cursor-grabbing hover:text-emerald-500 dark:hover:text-emerald-400" : ""}`}
                  title={!isViewer ? "Drag this handle to place card at any position" : ""}
                >
                  <GripVertical className="w-4 h-4 shrink-0" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">Drag</span>
                </div>

                {/* Direct Position Dropdown */}
                <div className="flex items-center gap-1.5 bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] px-2 py-0.5 rounded-lg">
                  <span className="text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 uppercase">Pos:</span>
                  <select
                    disabled={isViewer}
                    value={idx + 1}
                    onChange={(e) => {
                      const targetPos = parseInt(e.target.value, 10) - 1;
                      moveCaseStudy(idx, targetPos);
                    }}
                    className="bg-transparent text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs py-0.5 pr-1 focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Change position sequence number"
                  >
                    {sponsorResults.map((_, i) => (
                      <option key={i + 1} value={i + 1} className="bg-white dark:bg-[#061612] text-brand-text dark:text-white">
                        #{i + 1}{i === 0 ? " (First)" : i === sponsorResults.length - 1 ? " (Last)" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {item.hidden && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[11px] font-bold">
                    <EyeOff className="w-3 h-3" />
                    <span>Hidden from Public Site (Draft / Paused)</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-36 sm:pr-48">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Partner Brand Name</label>
                  <input 
                    type="text" 
                    value={item.partnerName} 
                    disabled={isViewer}
                    onChange={(e) => {
                      const next = [...sponsorResults];
                      next[idx].partnerName = e.target.value;
                      setSponsorResults(next);
                    }}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
                  />
                </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Campaign Type</label>
                <input 
                  type="text" 
                  value={item.campaignType} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...sponsorResults];
                    next[idx].campaignType = e.target.value;
                    setSponsorResults(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
                />
              </div>
            </div>

            {/* Video Thumbnail Control */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80">
                  Video Thumbnail Image
                </label>
                <div className="flex items-center gap-2">
                  {item.thumbnailUrl === "none" ? (
                    <button
                      type="button"
                      disabled={isViewer}
                      onClick={() => {
                        const next = [...sponsorResults];
                        const ytId = getYoutubeId(item.ytUrl);
                        next[idx] = { 
                          ...next[idx], 
                          thumbnailUrl: ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : "" 
                        };
                        setSponsorResults(next);
                        if (ytId && setNotification) {
                          setNotification({
                            type: "success",
                            message: `High-resolution thumbnail auto-generated for ${item.partnerName}! Click 'Save Changes' to publish.`,
                          });
                        }
                      }}
                      className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> Auto-fetch High-Res
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isViewer}
                      onClick={() => {
                        const next = [...sponsorResults];
                        next[idx] = { ...next[idx], thumbnailUrl: "none" };
                        setSponsorResults(next);
                      }}
                      className="text-[11px] font-bold text-red-500 hover:text-red-400 flex items-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" /> Remove Thumbnail
                    </button>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                {(() => {
                  const ytId = getYoutubeId(item.ytUrl);
                  const effectiveThumb = item.thumbnailUrl === "none" ? null : (item.thumbnailUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null));
                  return effectiveThumb ? (
                    <div className="w-16 h-10 rounded-lg bg-black border border-brand-border dark:border-[#16382e] shrink-0 overflow-hidden relative shadow-sm">
                      <img src={effectiveThumb} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-16 h-10 rounded-lg bg-brand-card dark:bg-[#0c201a] border border-dashed border-brand-border dark:border-[#16382e] shrink-0 flex items-center justify-center text-[10px] text-brand-muted dark:text-emerald-200/50">
                      No thumb
                    </div>
                  );
                })()}

                <input 
                  type="text" 
                  placeholder={item.thumbnailUrl === "none" ? "Thumbnail disabled (type URL or click Auto-fetch)" : "Auto from YouTube, or enter custom URL..."}
                  value={item.thumbnailUrl === "none" ? "" : (item.thumbnailUrl || "")} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...sponsorResults];
                    next[idx] = { ...next[idx], thumbnailUrl: e.target.value };
                    setSponsorResults(next);
                  }}
                  className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                />

                <label 
                  htmlFor={`sponsor-thumb-input-${item.id}`}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl cursor-pointer text-xs flex items-center gap-1.5 border border-emerald-500/30 shrink-0 whitespace-nowrap shadow-sm"
                >
                  {uploadingField === `sponsor-thumb-${item.id}` ? "Saving..." : "Upload"}
                  <input 
                    id={`sponsor-thumb-input-${item.id}`}
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleInlineMediaUpload(
                      e.target.files, 
                      (url) => {
                        const next = [...sponsorResults];
                        next[idx] = { ...next[idx], thumbnailUrl: url };
                        setSponsorResults(next);
                      },
                      `sponsor-thumb-${item.id}`
                    )}
                  />
                </label>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80">
                  Testimonial Quote
                </label>
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 uppercase">
                    Quote Font:
                  </span>
                  <select
                    value={item.quoteFont || "Caveat"}
                    disabled={isViewer}
                    onChange={(e) => {
                      const next = [...sponsorResults];
                      next[idx] = { ...next[idx], quoteFont: e.target.value };
                      setSponsorResults(next);
                      loadGoogleFont(e.target.value);
                    }}
                    className="border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer disabled:opacity-50"
                  >
                    {QUOTE_FONT_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <textarea 
                rows={2}
                value={item.quote} 
                disabled={isViewer}
                onChange={(e) => {
                  const next = [...sponsorResults];
                  next[idx].quote = e.target.value;
                  setSponsorResults(next);
                }}
                style={{ fontFamily: `'${item.quoteFont || "Caveat"}', cursive, sans-serif` }}
                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Primary Metric Label (e.g. Videos Created, Link Clicks)</label>
                <input 
                  type="text" 
                  value={item.stat1Label} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...sponsorResults];
                    next[idx].stat1Label = e.target.value;
                    setSponsorResults(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Primary Metric Value (e.g. 2 Videos, 1,200+)</label>
                <input 
                  type="text" 
                  value={item.stat1Value} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...sponsorResults];
                    next[idx].stat1Value = e.target.value;
                    setSponsorResults(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                />
              </div>
            </div>

            <div className="pt-3 border-t border-brand-border dark:border-[#16382e] space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Extended Case Study Details (Modal View)</span>
                </div>
                <span className="text-[11px] text-brand-muted dark:text-emerald-300/70">
                  Formatted bullet points and line breaks display as structured cards in the public modal.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                    Brand Logo Image URL
                  </label>
                  <div className="flex items-center gap-2">
                    {item.logoUrl ? (
                      <div className="w-8 h-8 rounded-lg bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                        <img src={item.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                      </div>
                    ) : null}
                    <input 
                      type="text" 
                      placeholder="/logo/flova.png or /logo/flova.svg"
                      value={item.logoUrl || ""} 
                      disabled={isViewer}
                      onChange={(e) => {
                        const next = [...sponsorResults];
                        next[idx].logoUrl = e.target.value;
                        setSponsorResults(next);
                      }}
                      className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm disabled:opacity-50" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                    Official Website URL
                  </label>
                  <input 
                    type="text" 
                    placeholder="https://www.flova.ai/en/"
                    value={item.websiteUrl || ""} 
                    disabled={isViewer}
                    onChange={(e) => {
                      const next = [...sponsorResults];
                      next[idx].websiteUrl = e.target.value;
                      setSponsorResults(next);
                    }}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm disabled:opacity-50" 
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80">
                      Featured YouTube Video URL
                    </label>
                    {item.ytUrl && (
                      <a 
                        href={item.ytUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-[11px] font-semibold text-emerald-500 hover:underline flex items-center gap-1"
                      >
                        Open Video &rarr;
                      </a>
                    )}
                  </div>
                  <input 
                    type="text" 
                    placeholder="https://youtube.com/watch?v=1tbJ3WJ9_po"
                    value={item.ytUrl || ""} 
                    disabled={isViewer}
                    onChange={(e) => {
                      const val = e.target.value;
                      const next = [...sponsorResults];
                      const newYtId = getYoutubeId(val);
                      const prevYtId = getYoutubeId(item.ytUrl);

                      let updatedThumb = next[idx].thumbnailUrl;
                      if (newYtId && updatedThumb !== "none") {
                        if (!updatedThumb || updatedThumb === "" || (prevYtId && updatedThumb.includes(prevYtId)) || updatedThumb.includes("img.youtube.com") || updatedThumb.includes("i.ytimg.com")) {
                          updatedThumb = `https://img.youtube.com/vi/${newYtId}/maxresdefault.jpg`;
                        }
                      }

                      next[idx] = {
                        ...next[idx],
                        ytUrl: val,
                        thumbnailUrl: updatedThumb,
                      };
                      setSponsorResults(next);
                    }}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm disabled:opacity-50" 
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                    Publish Date / Period
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Dedicated Video Integration, Q2 2026"
                    value={item.publishDate || ""} 
                    disabled={isViewer}
                    onChange={(e) => {
                      const next = [...sponsorResults];
                      next[idx].publishDate = e.target.value;
                      setSponsorResults(next);
                    }}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm disabled:opacity-50" 
                  />
                </div>
              </div>

              {/* 1. Campaign Overview & Narrative */}
              <div className="space-y-1.5 bg-brand-card/50 dark:bg-[#0c201a]/50 p-3.5 rounded-xl border border-brand-border/80 dark:border-[#16382e]">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-text dark:text-emerald-300">
                    Campaign Overview &amp; Narrative
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      disabled={isViewer}
                      onClick={() => {
                        const next = [...sponsorResults];
                        const curr = next[idx].description || "";
                        const template = `Goal: Demonstrate how creators and developers can leverage ${item.partnerName} (${item.websiteUrl || "https://..."}) to streamline AI workflows and generate high-impact results.`;
                        next[idx].description = curr ? `${curr}\n\n${template}` : template;
                        setSponsorResults(next);
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-colors cursor-pointer"
                    >
                      + Insert Goal Template
                    </button>
                    <button
                      type="button"
                      disabled={isViewer}
                      onClick={() => {
                        const next = [...sponsorResults];
                        const curr = next[idx].description || "";
                        next[idx].description = curr ? `${curr}\n• ` : "• ";
                        setSponsorResults(next);
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-colors cursor-pointer"
                    >
                      + Bullet Point
                    </button>
                  </div>
                </div>
                <textarea 
                  rows={4}
                  placeholder="e.g. Goal: Demonstrate how creators and filmmakers can leverage Flova AI (https://www.flova.ai/en/) to generate high-production cinematic AI videos, maintain character consistency across scenes, and turn scripts into finished animations."
                  value={item.description || ""} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...sponsorResults];
                    next[idx].description = e.target.value;
                    setSponsorResults(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl p-3 text-xs sm:text-sm font-sans leading-relaxed disabled:opacity-50 focus:border-emerald-500 focus:outline-none" 
                />
              </div>

              {/* 2. Videos & Deliverables Provided */}
              <div className="space-y-1.5 bg-brand-card/50 dark:bg-[#0c201a]/50 p-3.5 rounded-xl border border-brand-border/80 dark:border-[#16382e]">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text dark:text-emerald-300">
                      Videos &amp; Deliverables Provided
                    </label>
                    <span className="text-[10px] text-brand-muted dark:text-emerald-300/60 block">
                      Enter 1 deliverable per line or numbered list (e.g. 1. Tutorial Video, 2. Pinned Tracked Link)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      disabled={isViewer}
                      onClick={() => {
                        const next = [...sponsorResults];
                        const curr = next[idx].deliverables || "";
                        const itemStr = "1. Dedicated Step-by-Step Tutorial & Prompt Engineering Breakdown";
                        next[idx].deliverables = curr ? `${curr}\n${itemStr}` : `Videos Made:\n${itemStr}`;
                        setSponsorResults(next);
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-colors cursor-pointer"
                    >
                      + Video Item
                    </button>
                    <button
                      type="button"
                      disabled={isViewer}
                      onClick={() => {
                        const next = [...sponsorResults];
                        const curr = next[idx].deliverables || "";
                        const itemStr = "• Tracked Pinned Comment Link & Workflow JSON Blueprint Download";
                        next[idx].deliverables = curr ? `${curr}\n${itemStr}` : itemStr;
                        setSponsorResults(next);
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-colors cursor-pointer"
                    >
                      + Pinned Link / Asset
                    </button>
                  </div>
                </div>
                <textarea 
                  rows={4}
                  placeholder={`Videos Made:\n1. Flova AI Tutorial: Create Cinematic AI Videos With Consistent Characters!\n2. Dedicated Step-by-Step Workflow & Prompt Engineering Breakdown\n3. First-Line Hashtags (#Flovaai, #Flovatutorial) & Tracked Pinned Link`}
                  value={item.deliverables || ""} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...sponsorResults];
                    next[idx].deliverables = e.target.value;
                    setSponsorResults(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl p-3 text-xs sm:text-sm font-sans leading-relaxed disabled:opacity-50 focus:border-emerald-500 focus:outline-none" 
                />
              </div>

              {/* 3. Campaign Results & ROI Breakdown */}
              <div className="space-y-1.5 bg-brand-card/50 dark:bg-[#0c201a]/50 p-3.5 rounded-xl border border-brand-border/80 dark:border-[#16382e]">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-text dark:text-emerald-300">
                      Campaign Results &amp; ROI Breakdown
                    </label>
                    <span className="text-[10px] text-brand-muted dark:text-emerald-300/60 block">
                      Displays impact bullets, CPV bonuses, and return on investment in the modal.
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <button
                      type="button"
                      disabled={isViewer}
                      onClick={() => {
                        const next = [...sponsorResults];
                        const curr = next[idx].roiBreakdown || "";
                        const itemStr = "• $100 base guaranteed + $0.50 CPV performance bonus";
                        next[idx].roiBreakdown = curr ? `${curr}\n${itemStr}` : `Results:\n${itemStr}`;
                        setSponsorResults(next);
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-colors cursor-pointer"
                    >
                      + CPV Bonus
                    </button>
                    <button
                      type="button"
                      disabled={isViewer}
                      onClick={() => {
                        const next = [...sponsorResults];
                        const curr = next[idx].roiBreakdown || "";
                        const itemStr = "• High creator engagement on consistent character & multi-shot AI storytelling";
                        next[idx].roiBreakdown = curr ? `${curr}\n${itemStr}` : itemStr;
                        setSponsorResults(next);
                      }}
                      className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 transition-colors cursor-pointer"
                    >
                      + Engagement Stat
                    </button>
                  </div>
                </div>
                <textarea 
                  rows={4}
                  placeholder={`Results:\n• $100 base guaranteed + $0.50 CPV performance bonus\n• Tiered exposure model reaching up to $2,000 total payout\n• High creator engagement on consistent character & multi-shot AI storytelling`}
                  value={item.roiBreakdown || ""} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...sponsorResults];
                    next[idx].roiBreakdown = e.target.value;
                    setSponsorResults(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl p-3 text-xs sm:text-sm font-sans leading-relaxed disabled:opacity-50 focus:border-emerald-500 focus:outline-none" 
                />
              </div>
            </div>
          </div>
        );
      })}
      </div>

      <div className="flex justify-end pt-5 border-t border-brand-border dark:border-[#16382e]">
        <button 
          type="button" 
          onClick={onSave} 
          disabled={isViewer}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Sponsor Results
        </button>
      </div>
    </div>
  );
}
