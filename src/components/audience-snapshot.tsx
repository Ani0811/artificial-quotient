"use client";

import { BarChart3, Globe, ShieldCheck, Users, Eye, TrendingUp, PlaySquare } from "lucide-react";
import { useEffect, useState } from "react";

// Country SVG Flags
const USAFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#bd3d44" d="M0 0h640v480H0z"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.4h640M0 129.2h640M0 203h640M0 276.9h640M0 350.8h640M0 424.6h640"/>
    <path fill="#192f5d" d="M0 0h288v258.5H0z"/>
    <g fill="#fff">
      <circle cx="24" cy="24" r="8"/><circle cx="72" cy="24" r="8"/><circle cx="120" cy="24" r="8"/><circle cx="168" cy="24" r="8"/><circle cx="216" cy="24" r="8"/><circle cx="264" cy="24" r="8"/>
      <circle cx="48" cy="48" r="8"/><circle cx="96" cy="48" r="8"/><circle cx="144" cy="48" r="8"/><circle cx="192" cy="48" r="8"/><circle cx="240" cy="48" r="8"/>
      <circle cx="24" cy="72" r="8"/><circle cx="72" cy="72" r="8"/><circle cx="120" cy="72" r="8"/><circle cx="168" cy="72" r="8"/><circle cx="216" cy="72" r="8"/><circle cx="264" cy="72" r="8"/>
      <circle cx="48" cy="96" r="8"/><circle cx="96" cy="96" r="8"/><circle cx="144" cy="96" r="8"/><circle cx="192" cy="96" r="8"/><circle cx="240" cy="96" r="8"/>
      <circle cx="24" cy="120" r="8"/><circle cx="72" cy="120" r="8"/><circle cx="120" cy="120" r="8"/><circle cx="168" cy="120" r="8"/><circle cx="216" cy="120" r="8"/><circle cx="264" cy="120" r="8"/>
      <circle cx="48" cy="144" r="8"/><circle cx="96" cy="144" r="8"/><circle cx="144" cy="144" r="8"/><circle cx="192" cy="144" r="8"/><circle cx="240" cy="144" r="8"/>
      <circle cx="24" cy="168" r="8"/><circle cx="72" cy="168" r="8"/><circle cx="120" cy="168" r="8"/><circle cx="168" cy="168" r="8"/><circle cx="216" cy="168" r="8"/><circle cx="264" cy="168" r="8"/>
      <circle cx="48" cy="192" r="8"/><circle cx="96" cy="192" r="8"/><circle cx="144" cy="192" r="8"/><circle cx="192" cy="192" r="8"/><circle cx="240" cy="192" r="8"/>
      <circle cx="24" cy="216" r="8"/><circle cx="72" cy="216" r="8"/><circle cx="120" cy="216" r="8"/><circle cx="168" cy="216" r="8"/><circle cx="216" cy="216" r="8"/><circle cx="264" cy="216" r="8"/>
    </g>
  </svg>
);

const IndiaFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#f93" d="M0 0h640v160H0z"/>
    <path fill="#fff" d="M0 160h640v160H0z"/>
    <path fill="#128807" d="M0 320h640v160H0z"/>
    <circle cx="320" cy="240" r="50" fill="none" stroke="#000080" strokeWidth="10"/>
    <circle cx="320" cy="240" r="12" fill="#000080"/>
  </svg>
);

const UKFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#012169" d="M0 0h640v480H0z"/>
    <path stroke="#fff" strokeWidth="60" d="m0 0 640 480M640 0 0 480"/>
    <path stroke="#C8102E" strokeWidth="40" d="m0 0 640 480M640 0 0 480"/>
    <path stroke="#fff" strokeWidth="100" d="M320 0v480M0 240h640"/>
    <path stroke="#C8102E" strokeWidth="60" d="M320 0v480M0 240h640"/>
  </svg>
);

const GermanyFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#000" d="M0 0h640v160H0z"/>
    <path fill="#D00" d="M0 160h640v160H0z"/>
    <path fill="#FFCE00" d="M0 320h640v160H0z"/>
  </svg>
);

interface SiteData {
  stats?: {
    subscribers?: string;
    subscribersSub?: string;
    monthlyViews?: string;
    monthlyViewsSub?: string;
    newSubs?: string;
    newSubsSub?: string;
    videosCount?: string;
    videosCountSub?: string;
  };
  demographics?: {
    age25_34?: string;
    age18_24?: string;
    malePercent?: string;
    femalePercent?: string;
  };
  geographies?: {
    usa?: string;
    india?: string;
    uk?: string;
    germany?: string;
  };
  buyerIntent?: {
    title?: string;
    desc?: string;
    badges?: string[];
  };
}

export default function AudienceSnapshot() {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const json = await res.json();
          setData(json);
        }
      } catch {
        // Handle error
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading || !data) {
    return (
      <section className="w-full py-20 px-4 border-t border-brand-border dark:border-[#14352b] transition-colors">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-8 bg-emerald-500/10 rounded-lg w-64"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const stats = data.stats || {};
  const demographics = data.demographics || {};
  const geographies = data.geographies || {};
  const buyerIntent = data.buyerIntent || {};

  const channelMetrics = [
    {
      label: "Subscribers",
      value: stats.subscribers || "0",
      sub: stats.subscribersSub || "",
      icon: Users,
      color: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "View Count",
      value: stats.monthlyViews || "0",
      sub: stats.monthlyViewsSub || "",
      icon: Eye,
      color: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "New Subs (30D)",
      value: stats.newSubs || "0",
      sub: stats.newSubsSub || "",
      icon: TrendingUp,
      color: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Videos Published",
      value: stats.videosCount || "0",
      sub: stats.videosCountSub || "",
      icon: PlaySquare,
      color: "text-red-500 dark:text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
    },
  ];

  return (
    <section className="w-full py-20 px-4 border-t border-brand-border dark:border-[#14352b] transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-2 mb-12 text-center md:text-left">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text dark:text-white">
            Audience &amp; Channel Snapshot
          </h2>
          <p className="text-brand-muted dark:text-emerald-200/70 font-medium text-lg">
            Real-time performance metrics and demographic reach for Artificial Quotient.
          </p>
        </div>

        {/* Dynamic Stat Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {channelMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={i}
                className="bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] rounded-2xl p-6 shadow-sm hover:shadow-lg dark:hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-300/60">
                    {metric.label}
                  </span>
                  <div className={`p-2.5 rounded-xl border ${metric.bg}`}>
                    <Icon className={`w-5 h-5 ${metric.color}`} />
                  </div>
                </div>
                <div className="font-heading text-3xl font-extrabold text-brand-text dark:text-white mb-1">
                  {metric.value}
                </div>
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  {metric.sub}
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Demographics Card */}
          <div className="group relative bg-brand-bg dark:bg-[#0c201a] rounded-2xl p-8 border border-brand-border dark:border-[#16382e] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 overflow-hidden">
            {/* Ambient top border glow line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2 text-brand-text dark:text-white">
              <BarChart3 className="w-5 h-5 text-emerald-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              Demographics
            </h3>
            
            <div className="space-y-6">
              <div className="transition-transform duration-300 group-hover:translate-x-0.5">
                <div className="flex justify-between text-sm font-medium mb-2 text-brand-text dark:text-zinc-300">
                  <span>Age 25-34</span>
                  <span className="text-emerald-500 font-bold transition-transform duration-300 group-hover:scale-105 inline-block">{demographics.age25_34 || "0%"}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-[#16382e] rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full transition-all duration-500 group-hover:shadow-[0_0_12px_rgba(16,185,129,0.6)] group-hover:brightness-110" style={{ width: demographics.age25_34 || "0%" }}></div>
                </div>
              </div>
              
              <div className="transition-transform duration-300 group-hover:translate-x-0.5">
                <div className="flex justify-between text-sm font-medium mb-2 text-brand-text dark:text-zinc-300">
                  <span>Age 18-24</span>
                  <span className="text-emerald-500 font-bold transition-transform duration-300 group-hover:scale-105 inline-block">{demographics.age18_24 || "0%"}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-[#16382e] rounded-full h-2 overflow-hidden">
                  <div className="bg-emerald-500 h-2 rounded-full opacity-70 transition-all duration-500 group-hover:opacity-90 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.4)]" style={{ width: demographics.age18_24 || "0%" }}></div>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border dark:border-[#16382e] transition-colors duration-300 group-hover:border-emerald-500/20 dark:group-hover:border-[#1e483b]">
                <div className="flex gap-4">
                  <div className="flex-1 p-2 rounded-lg transition-all duration-300 hover:bg-emerald-500/5 dark:hover:bg-[#102922]">
                    <p className="text-sm text-brand-muted dark:text-emerald-200/60 mb-1">Male</p>
                    <p className="text-xl font-bold text-brand-text dark:text-white transition-transform duration-300 group-hover:scale-105 inline-block">{demographics.malePercent || "0%"}</p>
                  </div>
                  <div className="flex-1 p-2 rounded-lg transition-all duration-300 hover:bg-emerald-500/5 dark:hover:bg-[#102922]">
                    <p className="text-sm text-brand-muted dark:text-emerald-200/60 mb-1">Female</p>
                    <p className="text-xl font-bold text-brand-text dark:text-white transition-transform duration-300 group-hover:scale-105 inline-block">{demographics.femalePercent || "0%"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Geographies & Intent Card */}
          <div className="flex flex-col gap-8">
            <div className="group relative bg-brand-bg dark:bg-[#0c201a] rounded-2xl p-8 border border-brand-border dark:border-[#16382e] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 overflow-hidden">
              {/* Ambient top border glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2 text-brand-text dark:text-white">
                <Globe className="w-5 h-5 text-emerald-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                Top Geographies
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="group/item flex items-center justify-between p-3.5 bg-white dark:bg-[#102922] rounded-xl border border-brand-border dark:border-[#16382e] shadow-sm text-brand-text dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-emerald-500/40 hover:bg-emerald-500/5 dark:hover:bg-[#14332a] hover:shadow-md cursor-pointer">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="transition-transform duration-200 group-hover/item:scale-125 inline-block">
                      <USAFlag />
                    </span>
                    <span className="font-semibold">USA</span>
                  </span>
                  <span className="font-bold text-emerald-500 transition-transform duration-200 group-hover/item:scale-110">{geographies.usa || "0%"}</span>
                </div>
                <div className="group/item flex items-center justify-between p-3.5 bg-white dark:bg-[#102922] rounded-xl border border-brand-border dark:border-[#16382e] shadow-sm text-brand-text dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-emerald-500/40 hover:bg-emerald-500/5 dark:hover:bg-[#14332a] hover:shadow-md cursor-pointer">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="transition-transform duration-200 group-hover/item:scale-125 inline-block">
                      <IndiaFlag />
                    </span>
                    <span className="font-semibold">India</span>
                  </span>
                  <span className="font-bold text-emerald-500 transition-transform duration-200 group-hover/item:scale-110">{geographies.india || "0%"}</span>
                </div>
                <div className="group/item flex items-center justify-between p-3.5 bg-white dark:bg-[#102922] rounded-xl border border-brand-border dark:border-[#16382e] shadow-sm text-brand-text dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-emerald-500/40 hover:bg-emerald-500/5 dark:hover:bg-[#14332a] hover:shadow-md cursor-pointer">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="transition-transform duration-200 group-hover/item:scale-125 inline-block">
                      <UKFlag />
                    </span>
                    <span className="font-semibold">UK</span>
                  </span>
                  <span className="font-bold text-emerald-500 transition-transform duration-200 group-hover/item:scale-110">{geographies.uk || "0%"}</span>
                </div>
                <div className="group/item flex items-center justify-between p-3.5 bg-white dark:bg-[#102922] rounded-xl border border-brand-border dark:border-[#16382e] shadow-sm text-brand-text dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-emerald-500/40 hover:bg-emerald-500/5 dark:hover:bg-[#14332a] hover:shadow-md cursor-pointer">
                  <span className="flex items-center gap-2.5 font-medium">
                    <span className="transition-transform duration-200 group-hover/item:scale-125 inline-block">
                      <GermanyFlag />
                    </span>
                    <span className="font-semibold">Germany</span>
                  </span>
                  <span className="font-bold text-emerald-500 transition-transform duration-200 group-hover/item:scale-110">{geographies.germany || "0%"}</span>
                </div>
              </div>
            </div>

            <div className="group relative bg-brand-bg dark:bg-[#0c201a] rounded-2xl p-6 shadow-sm overflow-hidden border border-brand-border dark:border-[#16382e] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 hover:border-emerald-500/40 dark:hover:border-emerald-500/40">
              {/* Ambient top border glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="absolute top-0 right-0 p-4 text-emerald-500/10 dark:text-emerald-500/20 transition-all duration-500 ease-out group-hover:scale-125 group-hover:rotate-6 pointer-events-none">
                <ShieldCheck className="w-24 h-24" />
              </div>
              <h3 className="font-heading text-lg font-bold mb-2 text-brand-text dark:text-white relative z-10 transition-colors duration-300 group-hover:text-emerald-500 dark:group-hover:text-emerald-400">
                {buyerIntent.title || "High Buyer Intent"}
              </h3>
              <p className="text-brand-muted dark:text-emerald-200/70 text-sm mb-4 relative z-10">
                {buyerIntent.desc || "Our audience actively searches for SaaS tools to solve their workflow bottlenecks."}
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {(buyerIntent.badges || ["Automation Builders", "Tech Professionals", "Agency Owners"]).map((badge: string, bIdx: number) => (
                  <span key={bIdx} className="text-xs font-bold px-3 py-1.5 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 rounded-lg transition-all duration-200 hover:scale-105 hover:bg-emerald-500 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white cursor-pointer shadow-sm">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
