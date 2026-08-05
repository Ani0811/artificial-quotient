"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/hero";
import {
  AudienceSnapshotSkeleton,
  WhatPerformsSkeleton,
  SponsorResultsSkeleton,
  RateCardSkeleton,
  CampaignWorkflowSkeleton,
} from "@/components/skeletons";

// Helper to simulate network latency for demonstrating skeleton loaders
const delayImport = (importFunc: () => Promise<any>, ms: number) => {
  return () => new Promise((resolve) => setTimeout(resolve, ms)).then(importFunc);
};

const AudienceSnapshot = dynamic(
  delayImport(() => import("@/components/audience-snapshot"), 600),
  {
    loading: () => <AudienceSnapshotSkeleton />,
    ssr: false,
  }
);

const WhatPerforms = dynamic(
  delayImport(() => import("@/components/what-performs"), 900),
  {
    loading: () => <WhatPerformsSkeleton />,
    ssr: false,
  }
);

const SponsorResults = dynamic(
  delayImport(() => import("@/components/sponsor-results"), 1200),
  {
    loading: () => <SponsorResultsSkeleton />,
    ssr: false,
  }
);

const RateCard = dynamic(
  delayImport(() => import("@/components/rate-card"), 1500),
  {
    loading: () => <RateCardSkeleton />,
    ssr: false,
  }
);

const CampaignWorkflow = dynamic(
  delayImport(() => import("@/components/campaign-workflow"), 1800),
  {
    loading: () => <CampaignWorkflowSkeleton />,
    ssr: false,
  }
);

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <div id="stats" className="scroll-mt-16">
        <AudienceSnapshot />
      </div>
      <div id="case-studies" className="scroll-mt-16">
        <WhatPerforms />
      </div>
      <div id="sponsor-results" className="scroll-mt-16">
        <SponsorResults />
      </div>
      <div id="sponsor" className="scroll-mt-16">
        <RateCard />
      </div>
      <div id="workflow" className="scroll-mt-16">
        <CampaignWorkflow />
      </div>
      
      {/* Bottom CTA */}
      <section className="w-full py-24 px-4 border-t border-brand-border dark:border-zinc-800 relative transition-colors duration-200 bg-grid-pattern overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-500/20 via-indigo-500/15 to-purple-500/20 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-4xl mx-auto bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-brand-border/80 dark:border-zinc-800 rounded-3xl p-10 md:p-14 text-center shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors duration-200">
          {/* Subtle Accent Glow bar on top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-blue via-indigo-500 to-purple-600"></div>

          <div className="absolute inset-0 z-0 opacity-30 bg-dots-pattern pointer-events-none"></div>
          
          <div className="relative z-10">
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-6 text-brand-text dark:text-white leading-tight">
              Put your AI tool in front of the people already looking for it.
            </h2>
            <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg mb-8 max-w-xl mx-auto">
              Join leading AI automation tools sponsoring Artificial Quotient.
            </p>
            <a
              href="https://forms.gle/4uTUZkEi5o3iqYrs5"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-brand-blue hover:bg-brand-blue-hover text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-brand-blue/25 hover:shadow-xl hover:shadow-brand-blue/35 hover:-translate-y-0.5"
            >
              Inquire About Sponsorship
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
