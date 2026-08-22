"use client";

import React from "react";
import { UploadCloud, Sparkles, Download, ShieldCheck, FileJson, CheckCircle2, Database, AlertTriangle } from "lucide-react";

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
    <div className="space-y-6 sm:space-y-8">
      {/* Header section */}
      <div>
        <h3 className="font-heading font-bold text-base sm:text-lg text-brand-text dark:text-white mb-1 flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-500 shrink-0" />
          Data Backup &amp; Disaster Recovery
        </h3>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed max-w-3xl">
          Export complete system backups, restore your website data from a saved JSON snapshot, or reset all sections to default seed data.
        </p>
      </div>

      {/* Main Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-3 min-[1680px]:grid-cols-3 gap-4 sm:gap-5">
        
        {/* Card 1: Export JSON Backup */}
        <div className="p-5 sm:p-6 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] flex flex-col justify-between gap-5 hover:border-emerald-500/40 transition-all shadow-sm">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0 shadow-sm">
                <Download className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-heading font-bold text-sm sm:text-base text-brand-text dark:text-white leading-snug">
                  Export JSON Backup
                </h4>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <CheckCircle2 className="w-3 h-3 shrink-0" /> Offline Snapshot
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed">
              Download a complete offline copy of your channel stats, pricing, tools, and case studies.
            </p>
          </div>

          <button
            type="button"
            onClick={onDownloadBackup}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span>Download Backup File</span>
          </button>
        </div>

        {/* Card 2: Restore JSON Backup */}
        <div className="p-5 sm:p-6 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] flex flex-col justify-between gap-5 hover:border-emerald-500/40 transition-all shadow-sm">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-500 dark:text-blue-400 shrink-0 shadow-sm">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-heading font-bold text-sm sm:text-base text-brand-text dark:text-white leading-snug">
                  Restore JSON Backup
                </h4>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 mt-0.5">
                  <FileJson className="w-3 h-3 shrink-0" /> JSON Import
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed">
              Upload a previously exported JSON backup file to instantly restore your entire website configuration.
            </p>
          </div>

          <label className={`w-full bg-brand-card dark:bg-[#102922] border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${isViewer ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-emerald-500/20 cursor-pointer active:scale-[0.98]"}`}>
            <UploadCloud className="w-4 h-4 shrink-0" />
            <span>Select Backup File</span>
            <input type="file" accept=".json" disabled={isViewer} onChange={onRestoreBackup} className="hidden" />
          </label>
        </div>

        {/* Card 3: Reset to Seed Data */}
        {onResetSeed && (
          <div className="p-5 sm:p-6 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] flex flex-col justify-between gap-5 hover:border-amber-500/40 transition-all shadow-sm sm:col-span-2 xl:col-span-1 2xl:col-span-1 min-[1680px]:col-span-1">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-heading font-bold text-sm sm:text-base text-brand-text dark:text-white leading-snug">
                    Reset to Seed Data
                  </h4>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-0.5">
                    <AlertTriangle className="w-3 h-3 shrink-0" /> Factory Defaults
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed">
                Restore all sections (Stats, What Performs, Case Studies, Brands, Interests) to the latest default repository seed data.
              </p>
            </div>

            <button
              type="button"
              disabled={isViewer}
              onClick={onResetSeed}
              className="w-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-600 dark:text-amber-300 font-bold text-xs sm:text-sm py-3 px-4 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 shrink-0 text-amber-500" />
              <span>Reset All Default Seed Data</span>
            </button>
          </div>
        )}
      </div>

      {/* Snapshot Information & Coverage Panel */}
      <div className="p-4 sm:p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-card/60 dark:bg-[#081b16] space-y-3">
        <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Backup Coverage &amp; Data Integrity</span>
        </div>
        <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed">
          System snapshots capture all data partitions including <strong className="text-brand-text dark:text-white">Hero Identity</strong>, <strong className="text-brand-text dark:text-white">Analytics &amp; Rates</strong>, <strong className="text-brand-text dark:text-white">Partner Case Studies</strong>, <strong className="text-brand-text dark:text-white">What Performs Cards</strong>, and <strong className="text-brand-text dark:text-white">Brands List</strong>. Restoring a snapshot immediately validates the JSON payload and updates both memory and persistent storage.
        </p>
      </div>
    </div>
  );
}
