"use client";

import { PlayCircle, MousePointerClick } from "lucide-react";
import { useEffect, useState } from "react";

interface PerformItem {
  id: string | number;
  title: string;
  views: string;
  clicks: string;
  type: string;
  thumb?: string;
  thumbnail?: string;
  ytUrl?: string;
  highlight?: string;
}

function getYoutubeId(url?: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function WhatPerforms() {
  const [items, setItems] = useState<PerformItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          if (data.whatPerforms) {
            setItems(data.whatPerforms);
          }
        }
      } catch {
        // Ignore error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-12 sm:py-16 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-8 bg-emerald-500/10 rounded-lg w-64"></div>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <div className="h-56 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl"></div>
            <div className="h-56 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl"></div>
            <div className="h-56 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) return null;

  return (
    <section className="w-full py-12 sm:py-16 px-4 border-t border-brand-border dark:border-zinc-800 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
            What Performs on the Channel
          </h2>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg">
            Our audience loves workflow tutorials and automation deep-dives.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {items.map((study) => {
            const ytId = getYoutubeId(study.ytUrl);
            const thumbImg = study.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

            return (
              <div key={study.id} className="bg-brand-card dark:bg-zinc-900 rounded-xl border border-brand-border dark:border-zinc-800 overflow-hidden transition-all group flex flex-col justify-between">
                <div>
                  <div className="aspect-video bg-gray-100 dark:bg-zinc-800 flex items-center justify-center text-5xl relative overflow-hidden">
                    {thumbImg ? (
                      <img src={thumbImg} alt={study.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    ) : (
                      <span>{study.thumb || "🎬"}</span>
                    )}

                    {study.ytUrl ? (
                      <a 
                        href={study.ytUrl} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center cursor-pointer"
                      >
                        <PlayCircle className="w-14 h-14 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] transform group-hover:scale-110 transition-transform duration-200" />
                      </a>
                    ) : (
                      <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors flex items-center justify-center">
                        <PlayCircle className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}

                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded text-brand-text dark:text-white border border-brand-border/20">
                      {study.type}
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className="font-heading text-xl font-bold text-brand-text dark:text-white group-hover:text-emerald-500 transition-colors">
                      {study.title}
                    </h3>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
