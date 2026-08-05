"use client";

import { Lock } from "lucide-react";

export default function AdminLoading() {
  return (
    <div className="w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-6 relative overflow-hidden bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-emerald-50 transition-colors duration-200">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col items-center justify-center relative z-10 space-y-6">
        {/* Animated Lock Shield */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] flex items-center justify-center text-emerald-500 shadow-xl">
            <Lock className="w-8 h-8 animate-pulse" />
          </div>
          <div className="absolute -inset-2.5 rounded-3xl border-2 border-emerald-500/30 border-t-emerald-500 animate-spin [animation-duration:1.2s]"></div>
        </div>

        {/* Text indicator */}
        <div className="text-center space-y-1">
          <h2 className="font-heading text-lg font-bold text-brand-text dark:text-white tracking-wide">
            Admin Portal
          </h2>
          <p className="text-brand-muted dark:text-emerald-200/60 text-xs font-medium tracking-widest uppercase">
            Authenticating Session &amp; Loading Management System...
          </p>
        </div>
      </div>
    </div>
  );
}
