"use client";

import React from "react";
import Link from "next/link";
import { Zap, ExternalLink, LogOut, Database, Sparkles, Edit3, Eye } from "lucide-react";
import { LogoImage } from "@/components/ui/logo-image";
import { AdminUser } from "@/types";

interface AdminHeaderProps {
  currentUser?: AdminUser;
  dbStatus: string;
  isViewer: boolean;
  isSyncingYoutube: boolean;
  layoutMode: "split" | "edit" | "preview";
  setLayoutMode: (mode: "split" | "edit" | "preview") => void;
  onSyncYoutube: () => void;
  onSave?: () => void;
  onLogout: () => void;
}

export function AdminHeader({
  currentUser,
  dbStatus,
  isViewer,
  isSyncingYoutube,
  layoutMode,
  setLayoutMode,
  onSyncYoutube,
  onSave,
  onLogout,
}: AdminHeaderProps) {
  return (
    <div className="bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-md">
      {/* Top row: logo + title + actions */}
      <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl overflow-hidden shrink-0 border border-emerald-500/30 flex items-center justify-center shadow-sm p-1">
            <LogoImage 
              alt="Artificial Quotient Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <h1 className="font-heading text-base sm:text-2xl font-bold text-brand-text dark:text-white tracking-tight leading-tight">
              Admin Management Portal
            </h1>
            <p className="text-[10px] sm:text-sm text-brand-muted dark:text-emerald-200/70 font-medium mt-0.5 truncate">
              Logged in as <span className="text-emerald-600 dark:text-emerald-400 font-bold">{currentUser?.email || "Administrator"}</span>
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap flex-shrink-0">
          {!isViewer && onSave && (
            <button
              type="button"
              onClick={onSave}
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
              title="Save all changes (Ctrl+S)"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          )}
          <button
            type="button"
            onClick={onSyncYoutube}
            disabled={isSyncingYoutube || isViewer}
            className="px-3 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-bold text-emerald-600 dark:text-emerald-400 transition-all flex items-center gap-1 shadow-sm disabled:opacity-50"
          >
            <Zap className={`w-3.5 h-3.5 ${isSyncingYoutube ? 'animate-pulse' : ''}`} />
            <span className="hidden sm:inline">{isSyncingYoutube ? 'Syncing...' : 'Sync Live Stats'}</span>
          </button>
          <Link 
            href="/" 
            className="px-3 py-2 rounded-xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#102922] text-xs font-bold text-brand-text dark:text-emerald-100 hover:bg-emerald-500/10 transition-all flex items-center gap-1 shadow-sm"
          >
            <span className="hidden sm:inline">Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
          </Link>
          <button
            type="button"
            onClick={onLogout}
            className="px-3 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 hover:bg-red-500/20 text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Info badges */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        <span className="text-[10px] sm:text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
          {currentUser?.name || "Auth Active"} · {currentUser?.role || "Admin"}
        </span>
        <span className="text-[10px] sm:text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
          <Database className="w-3 h-3 text-emerald-400" />
          <span className="hidden sm:inline">{dbStatus}</span>
          <span className="sm:hidden">DB Connected</span>
        </span>
      </div>

      {/* View Mode Toggle */}
      <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <div className="inline-flex p-1 rounded-xl bg-brand-bg dark:bg-[#102922] border border-brand-border dark:border-[#16382e] flex-shrink-0">
          <button
            type="button"
            onClick={() => setLayoutMode("split")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
              layoutMode === "split"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-brand-muted dark:text-emerald-200/70 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" /> Split View
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode("edit")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
              layoutMode === "edit"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-brand-muted dark:text-emerald-200/70 hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Form Only
          </button>
          <button
            type="button"
            onClick={() => setLayoutMode("preview")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
              layoutMode === "preview"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-brand-muted dark:text-emerald-200/70 hover:text-white"
            }`}
          >
            <Eye className="w-3.5 h-3.5" /> Preview Only
          </button>
        </div>
      </div>
    </div>
  );
}
