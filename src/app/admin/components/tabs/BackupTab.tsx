"use client";

import React from "react";
import { UploadCloud, Sparkles } from "lucide-react";

interface BackupTabProps {
  isViewer: boolean;
  onDownloadBackup: () => Promise<void>;
  onRestoreBackup: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  onResetSeed?: () => Promise<void>;
}

export function BackupTab({
  isViewer,
  onDownloadBackup,
  onRestoreBackup,
  onResetSeed,
}: BackupTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-heading font-bold text-base text-brand-text dark:text-white mb-1">
          Data Backup &amp; Disaster Recovery
        </h3>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70">
          Export complete system backups, restore your website data from a saved JSON snapshot, or reset all sections to default seed data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-6 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2.5 text-emerald-500 font-bold text-base mb-1.5">
              <UploadCloud className="w-5 h-5 rotate-180" /> Export JSON Backup
            </div>
            <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed">
              Download a complete offline copy of your channel stats, pricing, tools, and case studies.
            </p>
          </div>
          <button
            type="button"
            onClick={onDownloadBackup}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <UploadCloud className="w-4 h-4 rotate-180" /> Download Backup File
          </button>
        </div>

        <div className="p-6 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center gap-2.5 text-emerald-500 font-bold text-base mb-1.5">
              <UploadCloud className="w-5 h-5" /> Restore JSON Backup
            </div>
            <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed">
              Upload a previously exported JSON backup file to instantly restore your entire website configuration.
            </p>
          </div>
          <label className={`w-full bg-brand-card dark:bg-[#102922] border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${isViewer ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-emerald-500/20 cursor-pointer"}`}>
            <UploadCloud className="w-4 h-4" /> Select Backup File
            <input type="file" accept=".json" disabled={isViewer} onChange={onRestoreBackup} className="hidden" />
          </label>
        </div>

        {onResetSeed && (
          <div className="p-6 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2.5 text-emerald-500 font-bold text-base mb-1.5">
                <Sparkles className="w-5 h-5" /> Reset to Seed Data
              </div>
              <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed">
                Restore all sections (Stats, What Performs, Case Studies, Brands, Interests) to the latest default repository seed data.
              </p>
            </div>
            <button
              type="button"
              disabled={isViewer}
              onClick={onResetSeed}
              className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" /> Reset All Default Seed Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
