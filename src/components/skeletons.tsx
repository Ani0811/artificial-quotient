"use client";

export function AudienceSnapshotSkeleton() {
  return (
    <section className="w-full py-16 px-4 border-t border-brand-border dark:border-zinc-800 bg-brand-bg/50 dark:bg-zinc-950/50">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Title skeleton */}
        <div className="text-center space-y-3">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-28 mx-auto animate-pulse"></div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-72 mx-auto animate-pulse"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-96 mx-auto animate-pulse"></div>
        </div>

        {/* Cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="bg-white/80 dark:bg-zinc-900/80 border border-brand-border/60 dark:border-zinc-800/80 rounded-2xl p-6 space-y-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-32 animate-pulse"></div>
                <div className="w-8 h-8 rounded-lg bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
              </div>
              <div className="space-y-3">
                <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-20 animate-pulse"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48 animate-pulse"></div>
              </div>
              <div className="space-y-2 pt-4">
                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full w-full animate-pulse"></div>
                <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full w-5/6 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhatPerformsSkeleton() {
  return (
    <section className="w-full py-16 px-4 border-t border-brand-border dark:border-zinc-800 bg-brand-bg/50 dark:bg-zinc-950/50">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-32 mx-auto animate-pulse"></div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-80 mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className="bg-white/80 dark:bg-zinc-900/80 border border-brand-border/60 dark:border-zinc-800/80 rounded-2xl p-6 space-y-4 shadow-sm"
            >
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-md w-48 animate-pulse"></div>
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full animate-pulse"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-11/12 animate-pulse"></div>
              </div>
              <div className="h-40 bg-zinc-100 dark:bg-zinc-950/65 rounded-xl border border-brand-border/30 dark:border-zinc-850 animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SponsorResultsSkeleton() {
  return (
    <section className="w-full py-16 px-4 border-t border-brand-border dark:border-zinc-800 bg-brand-bg/50 dark:bg-zinc-950/50">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-28 mx-auto animate-pulse"></div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-72 mx-auto animate-pulse"></div>
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-96 mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {[1, 2].map((i) => (
            <div 
              key={i} 
              className="bg-white/80 dark:bg-zinc-900/80 border border-brand-border/60 dark:border-zinc-800/80 rounded-2xl p-6 space-y-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
                  <div className="space-y-1.5">
                    <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-24 animate-pulse"></div>
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-16 animate-pulse"></div>
                  </div>
                </div>
                <div className="w-16 h-6 rounded-full bg-zinc-200 dark:bg-zinc-800 animate-pulse"></div>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-12 animate-pulse"></div>
                    <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-20 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function RateCardSkeleton() {
  return (
    <section className="w-full py-16 px-4 border-t border-brand-border dark:border-zinc-800 bg-brand-bg/50 dark:bg-zinc-950/50">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-36 mx-auto animate-pulse"></div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-80 mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div 
              key={i} 
              className="bg-white/80 dark:bg-zinc-900/80 border border-brand-border/60 dark:border-zinc-800/80 rounded-2xl p-6 space-y-6 shadow-sm"
            >
              <div className="space-y-2">
                <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-md w-24 animate-pulse"></div>
                <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-32 animate-pulse"></div>
              </div>
              <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-850">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full animate-pulse"></div>
                ))}
              </div>
              <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full animate-pulse pt-2"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CampaignWorkflowSkeleton() {
  return (
    <section className="w-full py-16 px-4 border-t border-brand-border dark:border-zinc-800 bg-brand-bg/50 dark:bg-zinc-950/50">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-3">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-24 mx-auto animate-pulse"></div>
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-72 mx-auto animate-pulse"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i} 
              className="bg-white/80 dark:bg-zinc-900/80 border border-brand-border/60 dark:border-zinc-800/80 rounded-2xl p-6 space-y-4 shadow-sm"
            >
              <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center animate-pulse"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-20 animate-pulse"></div>
              <div className="space-y-1.5">
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-full animate-pulse"></div>
                <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-md w-4/5 animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
