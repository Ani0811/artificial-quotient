"use client";

import React, { useState } from "react";
import { Plus, Trash2, Sparkles, Save, Eye, EyeOff, Loader2, Link2, RefreshCw, Zap } from "lucide-react";
import { PerformItem } from "@/types";
import defaultSiteData from "@/data/site-data.json";
import { getYoutubeId } from "../../utils";

interface WhatPerformsTabProps {
  whatPerforms: PerformItem[];
  setWhatPerforms: React.Dispatch<React.SetStateAction<PerformItem[]>>;
  isViewer: boolean;
  uploadingField: string | null;
  handleInlineMediaUpload: (files: FileList | null, setFieldUrl: (url: string) => void, fieldId: string) => Promise<void>;
  setNotification?: React.Dispatch<React.SetStateAction<{ type: "success" | "error"; message: string } | null>>;
  onSave: () => Promise<void>;
}

export function WhatPerformsTab({
  whatPerforms,
  setWhatPerforms,
  isViewer,
  uploadingField,
  handleInlineMediaUpload,
  setNotification,
  onSave,
}: WhatPerformsTabProps) {
  const [quickAddUrl, setQuickAddUrl] = useState("");
  const [isQuickAdding, setIsQuickAdding] = useState(false);
  const [fetchingCardId, setFetchingCardId] = useState<string | null>(null);
  const [isBatchRefreshing, setIsBatchRefreshing] = useState(false);

  // Helper to fetch details for a single video link
  const fetchVideoDetails = async (url: string) => {
    const res = await fetch("/api/admin/youtube-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.message || "Failed to fetch video details from YouTube");
    }
    return json.data;
  };

  // Quick Add handler from top URL bar
  const handleQuickAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickAddUrl.trim()) return;

    setIsQuickAdding(true);
    try {
      const data = await fetchVideoDetails(quickAddUrl.trim());
      const newItem: PerformItem = {
        id: Date.now().toString(),
        title: data.title || "New Highlight",
        views: data.views || "25.0k",
        clicks: data.clicks || "1.0k+",
        type: data.type || "Dedicated Video",
        thumb: data.thumb || "🎬",
        highlight: data.highlight || "High CTR",
        ytUrl: data.ytUrl || quickAddUrl.trim(),
        thumbnail: data.thumbnail || `https://img.youtube.com/vi/${data.videoId}/maxresdefault.jpg`,
        hidden: false,
      };

      setWhatPerforms([...whatPerforms, newItem]);
      setQuickAddUrl("");
      setNotification?.({
        type: "success",
        message: `Successfully pulled video "${data.title}" from YouTube! Click 'Save What Performs' to publish.`,
      });
    } catch (err: any) {
      setNotification?.({
        type: "error",
        message: err.message || "Could not fetch video from YouTube. Please check the URL.",
      });
    } finally {
      setIsQuickAdding(false);
    }
  };

  // Auto-fetch details for a specific card in the list
  const handleAutoFetchCard = async (idx: number) => {
    const item = whatPerforms[idx];
    if (!item.ytUrl || !item.ytUrl.trim()) {
      setNotification?.({
        type: "error",
        message: "Please enter a valid YouTube Video Link first.",
      });
      return;
    }

    setFetchingCardId(item.id);
    try {
      const data = await fetchVideoDetails(item.ytUrl.trim());
      const next = [...whatPerforms];
      next[idx] = {
        ...next[idx],
        title: data.title || next[idx].title,
        views: data.views || next[idx].views,
        clicks: data.clicks || next[idx].clicks,
        thumbnail: data.thumbnail || next[idx].thumbnail,
        highlight: data.highlight || next[idx].highlight,
        thumb: data.thumb || next[idx].thumb,
        type: data.type || next[idx].type,
        ytUrl: data.ytUrl || next[idx].ytUrl,
      };
      setWhatPerforms(next);
      setNotification?.({
        type: "success",
        message: `Video details for "${data.title}" updated from YouTube! Click 'Save What Performs' to publish.`,
      });
    } catch (err: any) {
      setNotification?.({
        type: "error",
        message: err.message || "Failed to auto-fetch video details from YouTube.",
      });
    } finally {
      setFetchingCardId(null);
    }
  };

  // Batch refresh all cards with YouTube URLs
  const handleBatchRefreshAll = async () => {
    const validCards = whatPerforms.filter(i => getYoutubeId(i.ytUrl));
    if (validCards.length === 0) {
      setNotification?.({
        type: "error",
        message: "No cards with valid YouTube video URLs found.",
      });
      return;
    }

    setIsBatchRefreshing(true);
    let updatedCount = 0;
    const next = [...whatPerforms];

    for (let i = 0; i < next.length; i++) {
      if (getYoutubeId(next[i].ytUrl)) {
        try {
          const data = await fetchVideoDetails(next[i].ytUrl!);
          next[i] = {
            ...next[i],
            title: data.title || next[i].title,
            views: data.views || next[i].views,
            clicks: data.clicks || next[i].clicks,
            thumbnail: data.thumbnail || next[i].thumbnail,
            highlight: data.highlight || next[i].highlight,
            thumb: data.thumb || next[i].thumb,
          };
          updatedCount++;
        } catch {
          // Continue with next
        }
      }
    }

    setWhatPerforms(next);
    setIsBatchRefreshing(false);
    setNotification?.({
      type: "success",
      message: `Refreshed details for ${updatedCount} YouTube videos! Click 'Save What Performs' to publish.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Title and Global Action Buttons */}
      <div className="flex justify-between items-center flex-wrap gap-2">
        <div>
          <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">What Performs on Channel</h3>
          <p className="text-xs text-brand-muted dark:text-emerald-200/60 mt-0.5">Showcase high-performing video case studies, tutorials, and sponsor breakdowns.</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            disabled={isViewer || isBatchRefreshing}
            onClick={handleBatchRefreshAll}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 transition-colors cursor-pointer"
            title="Refresh views, titles, and HD thumbnails for all videos from YouTube API"
          >
            {isBatchRefreshing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            Refresh All Videos
          </button>
          <button
            type="button"
            disabled={isViewer}
            onClick={() => {
              if (window.confirm("Reset What Performs cards to the latest default seeded videos?")) {
                setWhatPerforms(defaultSiteData.whatPerforms as any);
                setNotification?.({
                  type: "success",
                  message: "What Performs cards reset to default seed data! Click 'Save Changes' to publish.",
                });
              }
            }}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Reset Default Seed
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
              thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
              hidden: false,
            }])}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Blank Card
          </button>
        </div>
      </div>

      {/* Automated Quick Add Bar (Just Add Video Link) */}
      <form 
        onSubmit={handleQuickAdd}
        className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-brand-bg to-brand-bg dark:from-emerald-950/40 dark:via-[#061612] dark:to-[#061612] border border-emerald-500/30 shadow-sm space-y-2"
      >
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-500 shrink-0" />
          <span className="text-xs font-bold text-brand-text dark:text-white uppercase tracking-wider">
            Automated Video Importer
          </span>
          <span className="text-[11px] text-brand-muted dark:text-emerald-200/70">
            — Paste any YouTube URL and we will automatically extract the title, high-res thumbnail, views, and clicks!
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <div className="relative flex-1">
            <Link2 className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted dark:text-emerald-200/60" />
            <input
              type="text"
              disabled={isViewer || isQuickAdding}
              placeholder="Paste YouTube Video URL (e.g. https://youtu.be/... or https://youtube.com/watch?v=...)"
              value={quickAddUrl}
              onChange={(e) => setQuickAddUrl(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 border border-brand-border dark:border-[#16382e] bg-white dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl text-xs sm:text-sm disabled:opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={isViewer || isQuickAdding || !quickAddUrl.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isQuickAdding ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Pulling Video...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                <span>Auto-Create Card</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Cards Directory */}
      <div className="space-y-5">
        {whatPerforms.map((item, idx) => {
          const isCardFetching = fetchingCardId === item.id;

          return (
            <div 
              key={item.id} 
              className={`p-5 rounded-2xl border bg-brand-bg dark:bg-[#061612] space-y-4 relative transition-all ${
                item.hidden 
                  ? "border-amber-500/40 dark:border-amber-500/30 bg-amber-500/[0.02]" 
                  : "border-brand-border dark:border-[#16382e]"
              }`}
            >
              {/* Card Action Buttons (Eye Toggle + Delete) */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  disabled={isViewer}
                  onClick={() => {
                    const next = [...whatPerforms];
                    const newHidden = !next[idx].hidden;
                    next[idx] = { ...next[idx], hidden: newHidden };
                    setWhatPerforms(next);
                    if (setNotification) {
                      setNotification({
                        type: "success",
                        message: newHidden
                          ? `"${item.title}" is now hidden from the public landing page. Click 'Save What Performs' to publish.`
                          : `"${item.title}" is now visible on the public landing page. Click 'Save What Performs' to publish.`,
                      });
                    }
                  }}
                  className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${
                    item.hidden
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25"
                      : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                  }`}
                  title={item.hidden ? "Card is currently hidden from the public site. Click to make visible." : "Card is currently visible on the public site. Click to hide."}
                >
                  {item.hidden ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hidden</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Visible</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  disabled={isViewer}
                  onClick={() => setWhatPerforms(whatPerforms.filter(w => w.id !== item.id))}
                  className="text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Title and Sponsorship Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-24 sm:pr-28">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Title / Video Topic</label>
                  <input 
                    type="text" 
                    value={item.title} 
                    disabled={isViewer}
                    onChange={(e) => {
                      const next = [...whatPerforms];
                      next[idx] = { ...next[idx], title: e.target.value };
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
                      next[idx] = { ...next[idx], type: e.target.value };
                      setWhatPerforms(next);
                    }}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
                  />
                </div>
              </div>

              {/* YouTube Link & Auto-Fetch Button + Thumbnail Media */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80">
                      YouTube Video Link
                    </label>
                    {item.ytUrl && getYoutubeId(item.ytUrl) && (
                      <button
                        type="button"
                        disabled={isViewer || isCardFetching}
                        onClick={() => handleAutoFetchCard(idx)}
                        className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 transition-colors disabled:opacity-50 cursor-pointer"
                        title="Auto-pull title, thumbnail, views & clicks from YouTube for this video"
                      >
                        {isCardFetching ? (
                          <Loader2 className="w-3 h-3 animate-spin" />
                        ) : (
                          <Zap className="w-3 h-3 fill-current" />
                        )}
                        <span>{isCardFetching ? "Fetching..." : "Auto-Fetch Info"}</span>
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
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
                      className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-xs sm:text-sm disabled:opacity-50" 
                    />
                    {item.ytUrl && getYoutubeId(item.ytUrl) && (
                      <button
                        type="button"
                        disabled={isViewer || isCardFetching}
                        onClick={() => handleAutoFetchCard(idx)}
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-500/30 shrink-0 whitespace-nowrap disabled:opacity-50 cursor-pointer shadow-sm"
                        title="Pull title, views, and thumbnail from YouTube"
                      >
                        {isCardFetching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                        <span>Pull Details</span>
                      </button>
                    )}
                  </div>
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
                            next[idx] = {
                              ...next[idx],
                              thumbnail: `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`,
                            };
                            setWhatPerforms(next);
                            setNotification?.({
                              type: "success",
                              message: `High-resolution thumbnail generated for "${item.title}"! Click 'Save What Performs' to publish.`,
                            });
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
                        next[idx] = { ...next[idx], thumbnail: e.target.value };
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
                            next[idx] = { ...next[idx], thumbnail: url };
                            setWhatPerforms(next);
                          },
                          `perform-thumb-${item.id}`
                        )}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Metrics Row: Views, Clicks, Highlight Tag, and Emoji */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Views Count</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 105.3k"
                    value={item.views} 
                    disabled={isViewer}
                    onChange={(e) => {
                      const next = [...whatPerforms];
                      next[idx] = { ...next[idx], views: e.target.value };
                      setWhatPerforms(next);
                    }}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Clicks Count</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 4.2k+"
                    value={item.clicks} 
                    disabled={isViewer}
                    onChange={(e) => {
                      const next = [...whatPerforms];
                      next[idx] = { ...next[idx], clicks: e.target.value };
                      setWhatPerforms(next);
                    }}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Highlight Badge</label>
                  <input 
                    type="text" 
                    placeholder="e.g. AI Lip Sync"
                    value={item.highlight || ""} 
                    disabled={isViewer}
                    onChange={(e) => {
                      const next = [...whatPerforms];
                      next[idx] = { ...next[idx], highlight: e.target.value };
                      setWhatPerforms(next);
                    }}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Emoji Icon</label>
                  <input 
                    type="text" 
                    value={item.thumb || "🎬"} 
                    disabled={isViewer}
                    onChange={(e) => {
                      const next = [...whatPerforms];
                      next[idx] = { ...next[idx], thumb: e.target.value };
                      setWhatPerforms(next);
                    }}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
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

