"use client";

import React from "react";
import { Plus, Trash2, Sparkles, Save } from "lucide-react";
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
  onSave: () => Promise<void>;
}

export function CaseStudiesTab({
  sponsorResults,
  setSponsorResults,
  isViewer,
  uploadingField,
  handleInlineMediaUpload,
  onSave,
}: CaseStudiesTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">Partner Case Studies</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isViewer}
            onClick={() => {
              if (window.confirm("Reset Sponsor Case Studies to the latest default seeded case studies (including Flova AI)?")) {
                setSponsorResults(defaultSiteData.sponsorResults as any);
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
              stat2Value: "2.5x"
            }])}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Case Study
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {sponsorResults.map((item, idx) => (
          <div key={item.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
            <button
              type="button"
              disabled={isViewer}
              onClick={() => setSponsorResults(sponsorResults.filter(s => s.id !== item.id))}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              title="Delete case study"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
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

            <div className="pt-2 border-t border-brand-border dark:border-[#16382e] space-y-3">
              <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
                Extended Case Study Details (Modal View)
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
                      placeholder="/logo/revid.png or https://..."
                      value={item.logoUrl || ""} 
                      disabled={isViewer}
                      onChange={(e) => {
                        const next = [...sponsorResults];
                        next[idx].logoUrl = e.target.value;
                        setSponsorResults(next);
                      }}
                      className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm disabled:opacity-50" 
                    />
                    <label 
                      htmlFor={`sponsor-logo-input-${item.id}`}
                      className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl cursor-pointer text-xs flex items-center gap-1.5 border border-emerald-500/30 shrink-0 whitespace-nowrap shadow-sm"
                    >
                      {uploadingField === `sponsor-logo-${item.id}` ? "Saving..." : "Upload Logo"}
                      <input 
                        id={`sponsor-logo-input-${item.id}`}
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleInlineMediaUpload(
                          e.target.files, 
                          (url) => {
                            const next = [...sponsorResults];
                            next[idx].logoUrl = url;
                            setSponsorResults(next);
                          },
                          `sponsor-logo-${item.id}`
                        )}
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                    Partner Official Website URL
                  </label>
                  <input 
                    type="text" 
                    placeholder="https://www.revid.ai/"
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
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                    Featured YouTube Video URL
                  </label>
                  <input 
                    type="text" 
                    placeholder="https://youtube.com/watch?v=..."
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
                    placeholder="e.g. Q2 2026"
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

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">
                  Campaign Overview &amp; Narrative
                </label>
                <textarea 
                  rows={2}
                  placeholder="Full campaign narrative and target audience fit..."
                  value={item.description || ""} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...sponsorResults];
                    next[idx].description = e.target.value;
                    setSponsorResults(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">
                  Deliverables Provided
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. 10-min YouTube video, workflow JSON download, newsletter link"
                  value={item.deliverables || ""} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...sponsorResults];
                    next[idx].deliverables = e.target.value;
                    setSponsorResults(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                />
              </div>
            </div>
          </div>
        ))}
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
