"use client";

import React from "react";
import { Zap, Save } from "lucide-react";
import { HeroConfig } from "@/types";

interface HeroTabProps {
  heroForm: HeroConfig;
  setHeroForm: React.Dispatch<React.SetStateAction<HeroConfig>>;
  isViewer: boolean;
  uploadingField: string | null;
  handleInlineMediaUpload: (files: FileList | null, setFieldUrl: (url: string) => void, fieldId: string) => Promise<void>;
  onSave: () => Promise<void>;
}

export function HeroTab({
  heroForm,
  setHeroForm,
  isViewer,
  uploadingField,
  handleInlineMediaUpload,
  onSave,
}: HeroTabProps) {
  return (
    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-5 p-5 sm:p-6 rounded-2xl bg-brand-bg/80 dark:bg-[#061612] border border-emerald-500/30 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-brand-border dark:border-[#16382e] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-500 animate-pulse" />
            <div>
              <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-300 uppercase tracking-wider">
                Hero Snapshot Card &amp; Dynamic RGB Framing
              </h3>
              <p className="text-[11px] text-brand-muted dark:text-emerald-200/60 mt-0.5">
                Customize the animated RGB glow, 3D interactive tilt, and all live stats displayed inside the Hero card picture.
              </p>
            </div>
          </div>

          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={heroForm.enableRgbEffect !== false}
              disabled={isViewer}
              onChange={(e) => setHeroForm({ ...heroForm, enableRgbEffect: e.target.checked })}
              className="rounded accent-emerald-500 w-4 h-4"
            />
            <span>RGB Glow Effect Active</span>
          </label>
        </div>

        {/* Card Branding */}
        <div className="space-y-2">
          <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
            <span>Channel Branding &amp; Identity</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                Channel Name
              </label>
              <input 
                type="text" 
                value={heroForm.channelName || ""} 
                disabled={isViewer}
                placeholder="Artificial Quotient"
                onChange={(e) => setHeroForm({ ...heroForm, channelName: e.target.value })}
                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                Channel Handle
              </label>
              <input 
                type="text" 
                value={heroForm.channelHandle || ""} 
                disabled={isViewer}
                placeholder="@ArtificialQuotient"
                onChange={(e) => setHeroForm({ ...heroForm, channelHandle: e.target.value })}
                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                Category / Tagline
              </label>
              <input 
                type="text" 
                value={heroForm.channelCategory || ""} 
                disabled={isViewer}
                placeholder="Tech & AI"
                onChange={(e) => setHeroForm({ ...heroForm, channelCategory: e.target.value })}
                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                YouTube Subscribe URL
              </label>
              <input 
                type="text" 
                value={heroForm.subscribeUrl || ""} 
                disabled={isViewer}
                placeholder="https://www.youtube.com/@..."
                onChange={(e) => setHeroForm({ ...heroForm, subscribeUrl: e.target.value })}
                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                Channel Custom Logo URL
              </label>
              <div className="flex items-center gap-2">
                <input 
                  type="text" 
                  value={heroForm.channelLogo || ""} 
                  disabled={isViewer}
                  placeholder="/logo.png or uploaded image"
                  onChange={(e) => setHeroForm({ ...heroForm, channelLogo: e.target.value })}
                  className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                />
                <label 
                  htmlFor="hero-channel-logo-upload"
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl cursor-pointer text-xs flex items-center gap-1.5 border border-emerald-500/30 shrink-0 whitespace-nowrap"
                >
                  {uploadingField === "hero-channel-logo" ? "Saving..." : "Upload Logo"}
                  <input 
                    id="hero-channel-logo-upload"
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleInlineMediaUpload(
                      e.target.files, 
                      (url) => setHeroForm({ ...heroForm, channelLogo: url }),
                      "hero-channel-logo"
                    )}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Stats inside Picture */}
        <div className="space-y-2 pt-2 border-t border-brand-border dark:border-[#16382e]">
          <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
            <span>Stats Inside Card Picture</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-brand-card dark:bg-[#0c201a] rounded-xl border border-brand-border dark:border-[#16382e] space-y-2">
              <span className="text-[11px] font-bold uppercase text-emerald-400 block">Metric 1 (Subscribers)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Value (Auto-synced from YouTube)</label>
                  <input 
                    type="text" 
                    value={heroForm.subscribersCount || ""} 
                    disabled={isViewer}
                    placeholder="Auto-synced"
                    onChange={(e) => setHeroForm({ ...heroForm, subscribersCount: e.target.value })}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Badge (e.g. Active)</label>
                  <input 
                    type="text" 
                    value={heroForm.subscribersBadge || ""} 
                    disabled={isViewer}
                    placeholder="Active"
                    onChange={(e) => setHeroForm({ ...heroForm, subscribersBadge: e.target.value })}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-brand-card dark:bg-[#0c201a] rounded-xl border border-brand-border dark:border-[#16382e] space-y-2">
              <span className="text-[11px] font-bold uppercase text-cyan-400 block">Metric 2 (Total Views)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Value (Auto-synced from YouTube)</label>
                  <input 
                    type="text" 
                    value={heroForm.monthlyViewsCount || ""} 
                    disabled={isViewer}
                    placeholder="Auto-synced"
                    onChange={(e) => setHeroForm({ ...heroForm, monthlyViewsCount: e.target.value })}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Badge (e.g. Growing)</label>
                  <input 
                    type="text" 
                    value={heroForm.monthlyViewsBadge || ""} 
                    disabled={isViewer}
                    placeholder="Growing"
                    onChange={(e) => setHeroForm({ ...heroForm, monthlyViewsBadge: e.target.value })}
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-brand-card dark:bg-[#0c201a] rounded-xl border border-brand-border dark:border-[#16382e] space-y-2.5">
            <span className="text-[11px] font-bold uppercase text-emerald-400 block">Metric 3 (Viewer Retention Gauge &amp; Subtext)</span>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              <div>
                <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Gauge % (e.g. 27%)</label>
                <input 
                  type="text" 
                  value={heroForm.retentionPercent || ""} 
                  disabled={isViewer}
                  placeholder="27%"
                  onChange={(e) => setHeroForm({ ...heroForm, retentionPercent: e.target.value })}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Gauge Title</label>
                <input 
                  type="text" 
                  value={heroForm.retentionLabel || ""} 
                  disabled={isViewer}
                  placeholder="Avg. Viewer Retention"
                  onChange={(e) => setHeroForm({ ...heroForm, retentionLabel: e.target.value })}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Bottom Left Subtext</label>
                <input 
                  type="text" 
                  value={heroForm.retentionLeftText || ""} 
                  disabled={isViewer}
                  placeholder="Top Tier Engagement"
                  onChange={(e) => setHeroForm({ ...heroForm, retentionLeftText: e.target.value })}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Bottom Right Subtext</label>
                <input 
                  type="text" 
                  value={heroForm.retentionRightText || ""} 
                  disabled={isViewer}
                  placeholder="Targeted Tech Audience"
                  onChange={(e) => setHeroForm({ ...heroForm, retentionRightText: e.target.value })}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-brand-border dark:border-[#16382e]">
        <button
          type="button"
          onClick={onSave}
          disabled={isViewer}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Hero Configuration
        </button>
      </div>
    </form>
  );
}
