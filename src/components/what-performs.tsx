import { PlayCircle, MousePointerClick } from "lucide-react";

export default function WhatPerforms() {
  const caseStudies = [
    {
      id: 1,
      title: "Revid.AI",
      views: "18.2k",
      clicks: "1.4k+",
      type: "Dedicated Video",
      thumb: "🎬",
      highlight: "High Conversion"
    },
    {
      id: 2,
      title: "Flashloop AI",
      views: "12.5k",
      clicks: "950+",
      type: "Integration",
      thumb: "⚡",
      highlight: "Solid ROI"
    },
    {
      id: 3,
      title: "Marky Agent",
      views: "21.1k",
      clicks: "2.1k+",
      type: "Dedicated Video",
      thumb: "🤖",
      highlight: "Viral Reach"
    }
  ];

  return (
    <section className="w-full py-20 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
            What Performs on the Channel
          </h2>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg">
            Our audience loves workflow tutorials and automation deep-dives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <div key={study.id} className="bg-brand-card dark:bg-zinc-900 rounded-xl border border-brand-border dark:border-zinc-800 overflow-hidden hover:shadow-lg transition-all group shadow-sm">
              <div className="aspect-video bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-5xl relative">
                {study.thumb}
                <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors flex items-center justify-center">
                  <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded text-brand-text dark:text-white shadow-sm border border-brand-border/20">
                  {study.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold mb-4 text-brand-text dark:text-white">{study.title}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-brand-bg dark:bg-zinc-950 rounded-lg p-3 border border-brand-border dark:border-zinc-800">
                    <p className="text-xs text-brand-muted dark:text-zinc-400 font-medium mb-1 flex items-center gap-1"><PlayCircle className="w-3 h-3"/> Views</p>
                    <p className="font-bold text-lg text-brand-text dark:text-white">{study.views}</p>
                  </div>
                  <div className="bg-brand-bg dark:bg-zinc-950 rounded-lg p-3 border border-brand-border dark:border-zinc-800 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-8 h-8 bg-brand-green/10 rounded-bl-full"></div>
                    <p className="text-xs text-brand-muted dark:text-zinc-400 font-medium mb-1 flex items-center gap-1"><MousePointerClick className="w-3 h-3"/> Clicks</p>
                    <p className="font-bold text-lg text-brand-green">{study.clicks}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
