"use client";

import React from "react";
import { Plus, Trash2, Save, Sparkles, Eye, EyeOff } from "lucide-react";
import { BrandItem } from "@/types";
import defaultSiteData from "@/data/site-data.json";

interface BrandsTabProps {
  brandsList: BrandItem[];
  setBrandsList: React.Dispatch<React.SetStateAction<BrandItem[]>>;
  isViewer: boolean;
  uploadingField: string | null;
  handleInlineMediaUpload: (files: FileList | null, setFieldUrl: (url: string) => void, fieldId: string) => Promise<void>;
  setNotification?: React.Dispatch<React.SetStateAction<{ type: "success" | "error"; message: string } | null>>;
  onSave: () => Promise<void>;
}

export function BrandsTab({
  brandsList,
  setBrandsList,
  isViewer,
  uploadingField,
  handleInlineMediaUpload,
  setNotification,
  onSave,
}: BrandsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-wrap gap-2">
        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">Brands &amp; Partner Directory</h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isViewer}
            onClick={() => {
              if (window.confirm("Reset Brands & Partners to the latest default seeded brands (including Flova AI)?")) {
                setBrandsList(defaultSiteData.brandItems as any);
                setNotification?.({
                  type: "success",
                  message: "Brands & Partners reset to default seed data (including Flova AI)! Click 'Save Changes' to publish.",
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
            onClick={() => setBrandsList([...brandsList, {
              id: Date.now().toString(),
              name: "New Brand",
              category: "Sponsor",
              tagline: "Brand tagline goes here.",
              logoText: "🚀 New Brand",
              ytUrl: "",
              logoUrl: "",
              hidden: false,
            }])}
            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Brand
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {brandsList.map((brand, idx) => (
          <div 
            key={brand.id} 
            className={`p-5 rounded-2xl border bg-brand-bg dark:bg-[#061612] space-y-4 relative transition-all ${
              brand.hidden 
                ? "border-amber-500/40 dark:border-amber-500/30 bg-amber-500/[0.02]" 
                : "border-brand-border dark:border-[#16382e]"
            }`}
          >
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                type="button"
                disabled={isViewer}
                onClick={() => {
                  const next = [...brandsList];
                  const newHidden = !next[idx].hidden;
                  next[idx] = { ...next[idx], hidden: newHidden };
                  setBrandsList(next);
                  if (setNotification) {
                    setNotification({
                      type: "success",
                      message: newHidden
                        ? `"${brand.name}" is now hidden from the public landing page. Click 'Save Brands' to publish.`
                        : `"${brand.name}" is now visible on the public landing page. Click 'Save Brands' to publish.`,
                    });
                  }
                }}
                className={`px-2.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm ${
                  brand.hidden
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 hover:bg-amber-500/25"
                    : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25"
                }`}
                title={brand.hidden ? "Brand is currently hidden from the public site. Click to make visible." : "Brand is currently visible on the public site. Click to hide."}
              >
                {brand.hidden ? (
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
                onClick={() => setBrandsList(brandsList.filter(b => b.id !== brand.id))}
                disabled={isViewer}
                className="text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                title="Delete brand"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-28">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Brand Name</label>
                <input
                  type="text"
                  disabled={isViewer}
                  value={brand.name}
                  onChange={(e) => {
                    const next = [...brandsList];
                    next[idx] = { ...next[idx], name: e.target.value };
                    setBrandsList(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Category / Tag</label>
                <input
                  type="text"
                  disabled={isViewer}
                  value={brand.category}
                  onChange={(e) => {
                    const next = [...brandsList];
                    next[idx] = { ...next[idx], category: e.target.value };
                    setBrandsList(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Tagline / Short Description</label>
              <input
                type="text"
                disabled={isViewer}
                value={brand.tagline}
                onChange={(e) => {
                  const next = [...brandsList];
                  next[idx] = { ...next[idx], tagline: e.target.value };
                  setBrandsList(next);
                }}
                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Logo Text (Emoji + Name)</label>
                <input
                  type="text"
                  disabled={isViewer}
                  placeholder="e.g. 🎬 Revid.AI"
                  value={brand.logoText}
                  onChange={(e) => {
                    const next = [...brandsList];
                    next[idx] = { ...next[idx], logoText: e.target.value };
                    setBrandsList(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">YouTube / Website URL</label>
                <input
                  type="text"
                  disabled={isViewer}
                  placeholder="https://youtu.be/..."
                  value={brand.ytUrl || ""}
                  onChange={(e) => {
                    const next = [...brandsList];
                    next[idx] = { ...next[idx], ytUrl: e.target.value };
                    setBrandsList(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Logo Image URL</label>
              <div className="flex items-center gap-2">
                {brand.logoUrl ? (
                  <div className="w-8 h-8 rounded-lg bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                    <img src={brand.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                  </div>
                ) : null}
                <input
                  type="text"
                  disabled={isViewer}
                  placeholder="/logo/revid.png or https://..."
                  value={brand.logoUrl || ""}
                  onChange={(e) => {
                    const next = [...brandsList];
                    next[idx] = { ...next[idx], logoUrl: e.target.value };
                    setBrandsList(next);
                  }}
                  className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <label 
                  htmlFor={`brand-logo-input-${brand.id}`}
                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl cursor-pointer text-xs flex items-center gap-1.5 border border-emerald-500/30 shrink-0 whitespace-nowrap shadow-sm"
                >
                  {uploadingField === `brand-logo-${brand.id}` ? "Saving..." : "Upload Logo"}
                  <input 
                    id={`brand-logo-input-${brand.id}`}
                    type="file" 
                    accept="image/*" 
                    disabled={isViewer}
                    className="hidden" 
                    onChange={(e) => handleInlineMediaUpload(
                      e.target.files, 
                      (url) => {
                        const next = [...brandsList];
                        next[idx] = { ...next[idx], logoUrl: url };
                        setBrandsList(next);
                      },
                      `brand-logo-${brand.id}`
                    )}
                  />
                </label>
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
          <Save className="w-4 h-4" /> Save Brands
        </button>
      </div>
    </div>
  );
}
