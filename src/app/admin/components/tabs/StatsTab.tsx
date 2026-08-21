"use client";

import React from "react";
import { BarChart3, DollarSign, Globe, Plus, Trash2, Save } from "lucide-react";
import { CountryFlag } from "@/components/audience-snapshot";
import { CountryItem } from "@/types";

interface StatsTabProps {
  statsForm: {
    subscribers: string;
    subscribersSub: string;
    monthlyViews: string;
    monthlyViewsSub: string;
    newSubs: string;
    newSubsSub: string;
    videosCount: string;
    videosCountSub: string;
    retention: string;
    channelBanner: string;
    uniqueViewers: string;
    watchTimeHours: string;
    avgViewDuration: string;
    avgPercentageViewed: string;
    returningViewers: string;
  };
  setStatsForm: React.Dispatch<React.SetStateAction<any>>;
  ratesForm: {
    dedicatedRate: string;
    integrationRate: string;
  };
  setRatesForm: React.Dispatch<React.SetStateAction<any>>;
  geoForm: CountryItem[];
  setGeoForm: React.Dispatch<React.SetStateAction<CountryItem[]>>;
  availableCountries: { code: string; name: string }[];
  isViewer: boolean;
  onSave: () => Promise<void>;
}

export function StatsTab({
  statsForm,
  setStatsForm,
  ratesForm,
  setRatesForm,
  geoForm,
  setGeoForm,
  availableCountries,
  isViewer,
  onSave,
}: StatsTabProps) {
  return (
    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
      {/* SECTION 1: Channel Performance Metrics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2.5 border-b border-brand-border dark:border-[#16382e]">
          <BarChart3 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">
            Audience Snapshot Stats &amp; YouTube Analytics
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Subscribers</label>
            <input 
              type="text" 
              value={statsForm.subscribers} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, subscribers: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 disabled:opacity-50" 
            />
            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Subscribers Subtext</label>
            <input 
              type="text" 
              value={statsForm.subscribersSub} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, subscribersSub: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Total View Count</label>
            <input 
              type="text" 
              value={statsForm.monthlyViews} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, monthlyViews: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 disabled:opacity-50" 
            />
            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">View Count Subtext</label>
            <input 
              type="text" 
              value={statsForm.monthlyViewsSub} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, monthlyViewsSub: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">New Subs (30D)</label>
            <input 
              type="text" 
              value={statsForm.newSubs} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, newSubs: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 disabled:opacity-50" 
            />
            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">New Subs Subtext</label>
            <input 
              type="text" 
              value={statsForm.newSubsSub} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, newSubsSub: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Videos Published</label>
            <input 
              type="text" 
              value={statsForm.videosCount} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, videosCount: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 disabled:opacity-50" 
            />
            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Videos Subtext</label>
            <input 
              type="text" 
              value={statsForm.videosCountSub} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, videosCountSub: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Monthly Viewers</label>
            <input 
              type="text" 
              value={statsForm.uniqueViewers} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, uniqueViewers: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Watch Time (hours)</label>
            <input 
              type="text" 
              value={statsForm.watchTimeHours} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, watchTimeHours: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Avg. View Duration</label>
            <input 
              type="text" 
              value={statsForm.avgViewDuration} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, avgViewDuration: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Avg. Percentage Viewed</label>
            <input 
              type="text" 
              value={statsForm.avgPercentageViewed} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, avgPercentageViewed: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Returning Viewers</label>
            <input 
              type="text" 
              value={statsForm.returningViewers} 
              disabled={isViewer}
              onChange={(e) => setStatsForm({ ...statsForm, returningViewers: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Sponsorship Rates */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2 pb-2.5 border-b border-brand-border dark:border-[#16382e]">
          <DollarSign className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">
            Sponsorship Rates
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Dedicated Video ($)</label>
            <input 
              type="text" 
              value={ratesForm.dedicatedRate} 
              disabled={isViewer}
              onChange={(e) => setRatesForm({ ...ratesForm, dedicatedRate: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Integration ($)</label>
            <input 
              type="text" 
              value={ratesForm.integrationRate} 
              disabled={isViewer}
              onChange={(e) => setRatesForm({ ...ratesForm, integrationRate: e.target.value })}
              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
            />
          </div>
        </div>
      </div>

      {/* SECTION 3: Geography Top Countries */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2.5 border-b border-brand-border dark:border-[#16382e]">
          <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Geography Top Countries
          </h3>
          <button
            type="button"
            disabled={isViewer}
            onClick={() => setGeoForm([...geoForm, { id: `geo-${Date.now()}`, name: "", percent: "" }])}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 border border-emerald-500/30 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Country
          </button>
        </div>

        <datalist id="countries-autocomplete-list">
          {availableCountries.map((c) => (
            <option key={c.code} value={c.name} />
          ))}
        </datalist>

        <div className="space-y-2.5">
          {geoForm.map((country, idx) => (
            <div key={country.id || idx} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] flex items-center justify-center shrink-0">
                <CountryFlag name={country.name} />
              </div>
              <input 
                type="text" 
                list="countries-autocomplete-list"
                placeholder="Country Name (e.g. United States, India)"
                value={country.name} 
                disabled={isViewer}
                onChange={(e) => {
                  const next = [...geoForm];
                  next[idx] = { ...next[idx], name: e.target.value };
                  setGeoForm(next);
                }}
                className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
              />
              <input 
                type="text" 
                placeholder="Share (e.g. 21.8%)"
                value={country.percent} 
                disabled={isViewer}
                onChange={(e) => {
                  const next = [...geoForm];
                  next[idx] = { ...next[idx], percent: e.target.value };
                  setGeoForm(next);
                }}
                className="w-28 sm:w-32 border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 shrink-0" 
              />
              <button
                type="button"
                disabled={isViewer}
                onClick={() => setGeoForm(geoForm.filter((_, i) => i !== idx))}
                className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                title="Delete Country"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
          {geoForm.length === 0 && (
            <div className="text-center py-4 text-xs text-brand-muted dark:text-emerald-200/60 font-medium">
              No countries added yet. Click &quot;Add Country&quot; above to add one.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-5 border-t border-brand-border dark:border-[#16382e]">
        <button 
          type="button" 
          onClick={onSave} 
          disabled={isViewer}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save &amp; Publish Stats
        </button>
      </div>
    </form>
  );
}
