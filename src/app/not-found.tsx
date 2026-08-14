"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="w-full py-32 px-4 bg-brand-bg dark:bg-zinc-950 min-h-screen flex items-center justify-center transition-colors">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-md overflow-hidden p-1">
          <img 
            src="/logo/logo-removebg-preview.png" 
            alt="Artificial Quotient Logo" 
            className="w-full h-full object-cover rounded-2xl"
            onError={(e) => {
              const t = e.currentTarget;
              if (t.src.includes("/logo/logo-removebg-preview.png")) {
                t.src = "/logo-removebg-preview.png";
              } else if (t.src.includes("/logo-removebg-preview.png")) {
                t.src = "/logo.png";
              }
            }}
          />
        </div>
        <span className="text-brand-blue font-bold text-sm uppercase tracking-widest bg-brand-blue/10 px-3 py-1 rounded-full">
          404 Error
        </span>
        <h1 className="font-heading text-4xl font-bold text-brand-text dark:text-white mt-4 mb-3">
          Page Not Found
        </h1>
        <p className="text-brand-muted dark:text-zinc-400 font-medium mb-8">
          The page you are looking for doesn&apos;t exist or has been moved to another workflow.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-brand-blue hover:bg-brand-blue-hover text-white px-6 py-3 rounded-lg font-bold text-sm transition-all shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
}
