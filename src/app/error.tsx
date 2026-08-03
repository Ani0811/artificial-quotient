"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw, ArrowLeft } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled runtime error:", error);
  }, [error]);

  return (
    <div className="w-full py-32 px-4 bg-brand-bg dark:bg-zinc-950 min-h-screen flex items-center justify-center transition-colors">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center text-4xl mx-auto mb-6 shadow-md border border-red-500/20">
          ⚠️
        </div>
        <span className="text-red-500 font-bold text-sm uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full">
          Runtime Error
        </span>
        <h1 className="font-heading text-3xl font-bold text-brand-text dark:text-white mt-4 mb-3">
          Something went wrong
        </h1>
        <p className="text-brand-muted dark:text-zinc-400 font-medium mb-8 text-sm">
          An unexpected system exception occurred. We have logged the trace and are looking into it.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm"
          >
            <RefreshCw className="w-4 h-4" /> Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 text-brand-text dark:text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </Link>
        </div>
      </div>
    </div>
  );
}
