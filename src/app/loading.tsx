"use client";

import { Lock } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-6 relative overflow-hidden bg-brand-bg dark:bg-zinc-950 transition-colors duration-200">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-brand-blue/10 dark:bg-brand-blue/20 blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col items-center justify-center relative z-10 space-y-6">
        {/* Animated logo loader */}
        <div className="relative flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl bg-brand-dark dark:bg-zinc-900 flex items-center justify-center text-4xl shadow-lg border border-brand-border dark:border-zinc-800 animate-pulse">
            🐼
          </div>
          <div className="absolute -inset-2 rounded-3xl border-2 border-brand-blue/30 border-t-brand-blue animate-spin [animation-duration:1.5s]"></div>
        </div>

        {/* Text indicators */}
        <div className="text-center space-y-2">
          <h2 className="font-heading text-lg font-bold text-brand-text dark:text-white tracking-wide animate-pulse">
            Artificial<span className="text-brand-blue">Quotient</span>
          </h2>
          <p className="text-brand-muted dark:text-zinc-500 text-xs font-medium tracking-widest uppercase">
            Optimizing Workflows...
          </p>
        </div>

        {/* Grid layout skeleton simulator */}
        <div className="w-full max-w-md bg-white/40 dark:bg-zinc-900/40 border border-brand-border/40 dark:border-zinc-850/60 backdrop-blur-md rounded-2xl p-5 space-y-4 shadow-sm">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4 animate-pulse"></div>
          <div className="space-y-2">
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full animate-pulse"></div>
            <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-5/6 animate-pulse"></div>
          </div>
          <div className="pt-2 flex items-center gap-3">
            <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-20 animate-pulse"></div>
            <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-28 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
