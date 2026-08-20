"use client";

import React from "react";
import { Plus, Trash2, Sparkles, Save, Image as ImageIcon } from "lucide-react";
import { PerformItem } from "@/types";
import defaultSiteData from "@/data/site-data.json";
import { getYoutubeId } from "../../utils";

interface WhatPerformsTabProps {
  whatPerforms: PerformItem[];
  setWhatPerforms: React.Dispatch<React.SetStateAction<PerformItem[]>>;
  isViewer: boolean;
  uploadingField: string | null;
  handleInlineMediaUpload: (files: FileList | null, setFieldUrl: (url: string) => void, fieldId: string) => Promise<void>;
  onSave: () => Promise<void>;
}

export function WhatPerformsTab({
  whatPerforms,
  setWhatPerforms,
  isViewer,
  uploadingField,
  handleInlineMediaUpload,
  onSave,
}: WhatPerformsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">What Performs Cards</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isViewer}
            onClick={() => {
              if (window.confirm("Reset What Performs cards to the latest 3 default seeded videos?")) {
                setWhatPerforms(defaultSiteData.whatPerforms as any);
              }
            }}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Reset to Default Seed Data
          </button>
          <button
            type="button"
            disabled={isViewer}
            onClick={() => setWhatPerforms([...whatPerforms, {
              id: Date.now().toString(),
              title: "New Highlight",
              views: "10.0k",
              clicks: "800+",
              type: "Dedicated Video",
              thumb: "🚀",
              highlight: "High CTR",
              ytUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
              thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            }])}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Perform Card
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {whatPerforms.map((item, idx) => (
          <div key={item.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
            <button
              type="button"
              disabled={isViewer}
              onClick={() => setWhatPerforms(whatPerforms.filter(w => w.id !== item.id))}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
              title="Delete item"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Title / Tool Name</label>
                <input 
                  type="text" 
                  value={item.title} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...whatPerforms];
                    next[idx].title = e.target.value;
                    setWhatPerforms(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Sponsorship Type</label>
                <input 
                  type="text" 
                  value={item.type} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...whatPerforms];
                    next[idx].type = e.target.value;
                    setWhatPerforms(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">YouTube Video Link</label>
                <input 
                  type="text" 
                  placeholder="https://youtube.com/watch?v=..."
                  value={item.ytUrl || ""} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const val = e.target.value;
                    const next = [...whatPerforms];
                    const newYtId = getYoutubeId(val);
                    const prevYtId = getYoutubeId(item.ytUrl);

                    let updatedThumb = next[idx].thumbnail;
                    if (newYtId) {
                      if (!updatedThumb || updatedThumb === "" || (prevYtId && updatedThumb.includes(prevYtId)) || updatedThumb.includes("img.youtube.com") || updatedThumb.includes("i.ytimg.com")) {
                        updatedThumb = `https://img.youtube.com/vi/${newYtId}/maxresdefault.jpg`;
                      }
                    }

                    next[idx] = {
                      ...next[idx],
                      ytUrl: val,
                      thumbnail: updatedThumb,
                    };
                    setWhatPerforms(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
                />
              </div>
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80">Thumbnail Media</label>
                  {getYoutubeId(item.ytUrl) && (
                    <button
                      type="button"
                      disabled={isViewer}
                      onClick={() => {
                        const ytId = getYoutubeId(item.ytUrl);
                        if (ytId) {
                          const next = [...whatPerforms];
                          next[idx].thumbnail = `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`;
                          setWhatPerforms(next);
                        }
                      }}
                      className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Sparkles className="w-3 h-3" /> Auto High-Res
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {(() => {
                    const ytId = getYoutubeId(item.ytUrl);
                    const effectiveThumb = item.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null);
                    return effectiveThumb ? (
                      <div className="w-14 h-9 rounded-lg bg-black border border-brand-border dark:border-[#16382e] shrink-0 overflow-hidden relative shadow-sm">
                        <img src={effectiveThumb} alt="Thumbnail preview" className="w-full h-full object-cover" />
                      </div>
                    ) : null;
                  })()}
                  <input 
                    type="text" 
                    placeholder="/uploads/file.png or YouTube thumb..."
                    value={item.thumbnail || ""} 
                    disabled={isViewer}
                    onChange={(e) => {
                      const next = [...whatPerforms];
                      next[idx].thumbnail = e.target.value;
                      setWhatPerforms(next);
                    }}
                    className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm disabled:opacity-50" 
                  />
                  <label 
                    htmlFor={`perform-thumb-input-${item.id}`}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl cursor-pointer text-xs flex items-center gap-1.5 border border-emerald-500/30 shrink-0 whitespace-nowrap shadow-sm"
                  >
                    {uploadingField === `perform-thumb-${item.id}` ? "Saving..." : "Upload"}
                    <input 
                      id={`perform-thumb-input-${item.id}`}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => handleInlineMediaUpload(
                        e.target.files, 
                        (url) => {
                          const next = [...whatPerforms];
                          next[idx].thumbnail = url;
                          setWhatPerforms(next);
                        },
                        `perform-thumb-${item.id}`
                      )}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Views Count</label>
                <input 
                  type="text" 
                  value={item.views} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...whatPerforms];
                    next[idx].views = e.target.value;
                    setWhatPerforms(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Clicks Count</label>
                <input 
                  type="text" 
                  value={item.clicks} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...whatPerforms];
                    next[idx].clicks = e.target.value;
                    setWhatPerforms(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Emoji Fallback</label>
                <input 
                  type="text" 
                  value={item.thumb || "🎬"} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...whatPerforms];
                    next[idx].thumb = e.target.value;
                    setWhatPerforms(next);
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
          <Save className="w-4 h-4" /> Save What Performs
        </button>
      </div>
    </div>
  );
}
