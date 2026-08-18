"use client";

import { BarChart3, Globe, ShieldCheck, Users, Eye, TrendingUp, PlaySquare } from "lucide-react";
import { useEffect, useState } from "react";
import { CountryItem, ChannelGeographies } from "@/types";

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

const PakistanFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#01411c" d="M0 0h640v480H0z"/>
    <path fill="#fff" d="M0 0h160v480H0z"/>
    <path fill="#fff" d="M410.7 131.6a143.9 143.9 0 0 0-42.6 256.4 144 144 0 1 1 42.6-256.4z"/>
    <path fill="#fff" d="m424 207.2 24.3 74.8-63.6-46.2h78.6l-63.6 46.2z"/>
  </svg>
);

const NigeriaFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#fff" d="M0 0h640v480H0z"/>
    <path fill="#008751" d="M0 0h213.3v480H0zM426.7 0H640v480H426.7z"/>
  </svg>
);

const BangladeshFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#006a4e" d="M0 0h640v480H0z"/>
    <circle cx="280" cy="240" r="160" fill="#f42a41"/>
  </svg>
);

const CanadaFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#f00" d="M0 0h160v480H0zm480 0h160v480H480z"/>
    <path fill="#fff" d="M160 0h320v480H160z"/>
    <path fill="#f00" d="m320 110 15 45h35l-25 25 10 45-35-25-35 25 10-45-25-25h35z"/>
  </svg>
);

const AustraliaFlag = () => (
  <svg className="w-5 h-3.5 rounded-[2px] shadow-sm flex-shrink-0 object-cover" viewBox="0 0 640 480">
    <path fill="#00008b" d="M0 0h640v480H0z"/>
    <path stroke="#fff" strokeWidth="30" d="m0 0 320 240M320 0 0 240"/>
    <path stroke="#C8102E" strokeWidth="20" d="m0 0 320 240M320 0 0 240"/>
    <path stroke="#fff" strokeWidth="50" d="M160 0v240M0 120h320"/>
    <path stroke="#C8102E" strokeWidth="30" d="M160 0v240M0 120h320"/>
    <circle cx="160" cy="360" r="28" fill="#fff"/>
    <circle cx="480" cy="140" r="14" fill="#fff"/>
    <circle cx="530" cy="200" r="14" fill="#fff"/>
    <circle cx="480" cy="320" r="14" fill="#fff"/>
    <circle cx="420" cy="220" r="14" fill="#fff"/>
  </svg>
);

import { getCountryCode } from "@/lib/countries";

export function CountryFlag({ name }: { name: string }) {
  const norm = (name || "").toLowerCase().trim();
  if (norm === "india" || norm === "in") return <IndiaFlag />;
  if (norm === "usa" || norm === "united states" || norm === "us" || norm === "united states of america") return <USAFlag />;
  if (norm === "uk" || norm === "united kingdom" || norm === "gb" || norm === "great britain" || norm === "england") return <UKFlag />;
  if (norm === "germany" || norm === "de") return <GermanyFlag />;
  if (norm === "pakistan" || norm === "pk") return <PakistanFlag />;
  if (norm === "nigeria" || norm === "ng") return <NigeriaFlag />;
  if (norm === "bangladesh" || norm === "bd") return <BangladeshFlag />;
  if (norm === "canada" || norm === "ca") return <CanadaFlag />;
  if (norm === "australia" || norm === "au") return <AustraliaFlag />;

  const code = getCountryCode(name);
  if (code && code.length === 2) {
    return (
      <img
        src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
        srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
        alt={name || code}
        className="w-5 h-3.5 object-cover rounded-[2px] shadow-sm flex-shrink-0 inline-block align-middle"
        loading="lazy"
      />
    );
  }

  return (
    <span className="w-5 h-3.5 inline-flex items-center justify-center text-xs flex-shrink-0 select-none">
      🌐
    </span>
  );
}

export function parseGeographies(geoData: any): CountryItem[] {
  if (!geoData) return [];
  if (Array.isArray(geoData)) {
    return geoData
      .filter((item: any) => item && (item.name || item.percent))
      .map((item: any, idx: number) => ({
        id: item.id || `geo-${idx}`,
        name: item.name || "Unknown",
        percent: item.percent || "0%",
      }));
  }
  if (typeof geoData === "object") {
    const nameMap: Record<string, string> = {
      india: "India",
      usa: "USA",
      pakistan: "Pakistan",
      nigeria: "Nigeria",
      bangladesh: "Bangladesh",
      uk: "United Kingdom",
      germany: "Germany",
    };
    return Object.entries(geoData)
      .filter(([_, val]) => typeof val === "string" && val !== "0%" && val.trim() !== "")
      .map(([key, val], idx) => ({
        id: `geo-legacy-${idx}`,
        name: nameMap[key.toLowerCase()] || (key.charAt(0).toUpperCase() + key.slice(1)),
        percent: val as string,
      }));
  }
  return [];
}

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
    uniqueViewers?: string;
    watchTimeHours?: string;
    avgViewDuration?: string;
    avgPercentageViewed?: string;
    returningViewers?: string;
  };
  demographics?: {
    age13_17?: string;
    age18_24?: string;
    age25_34?: string;
    age35_44?: string;
    age45_54?: string;
    age55_64?: string;
    age65_plus?: string;
    malePercent?: string;
    femalePercent?: string;
  };
  geographies?: ChannelGeographies;
  buyerIntent?: {
    title?: string;
    desc?: string;
    badges?: string[];
  };
}

interface AudienceSnapshotProps {
  siteData?: any;
  isLoading?: boolean;
}

export default function AudienceSnapshot({ siteData, isLoading }: AudienceSnapshotProps) {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (siteData !== undefined) {
      setData(siteData);
      setLoading(isLoading !== undefined ? isLoading : false);
      return;
    }

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
  }, [siteData, isLoading]);

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
      label: "Subscribers (Lifetime)",
      value: stats.subscribers || "0",
      sub: stats.subscribersSub || "",
      icon: Users,
      color: "text-emerald-500 dark:text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
    },
    {
      label: "Videos published (Lifetime)",
      value: stats.videosCount || "0",
      sub: stats.videosCountSub || "",
      icon: PlaySquare,
      color: "text-red-500 dark:text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
    },
    {
      label: "Unique Viewers",
      value: stats.uniqueViewers || "0",
      sub: "",
      icon: Eye,
      color: "text-blue-500 dark:text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Views",
      value: stats.monthlyViews || "0",
      sub: stats.monthlyViewsSub || "",
      icon: BarChart3,
      color: "text-amber-500 dark:text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
    },
    {
      label: "Watch Time (hours)",
      value: stats.watchTimeHours || "0",
      sub: "",
      icon: TrendingUp,
      color: "text-purple-500 dark:text-purple-400",
      bg: "bg-purple-500/10 border-purple-500/20",
    },
    {
      label: "Average View Duration",
      value: stats.avgViewDuration || "0",
      sub: "",
      icon: PlaySquare,
      color: "text-pink-500 dark:text-pink-400",
      bg: "bg-pink-500/10 border-pink-500/20",
    },
    {
      label: "Average Percentage Viewed",
      value: stats.avgPercentageViewed || "0",
      sub: "",
      icon: BarChart3,
      color: "text-indigo-500 dark:text-indigo-400",
      bg: "bg-indigo-500/10 border-indigo-500/20",
    },
    {
      label: "Returning Viewers",
      value: stats.returningViewers || "0",
      sub: "",
      icon: Users,
      color: "text-teal-500 dark:text-teal-400",
      bg: "bg-teal-500/10 border-teal-500/20",
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 px-4 border-t border-brand-border dark:border-[#14352b] transition-colors">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {channelMetrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div
                key={i}
                className="bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-lg dark:hover:border-emerald-500/40 transition-all duration-300 hover:-translate-y-1"
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

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {/* Demographics Card */}
          <div className="group relative bg-brand-bg dark:bg-[#0c201a] rounded-2xl p-5 sm:p-8 border border-brand-border dark:border-[#16382e] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 overflow-hidden">
            {/* Ambient top border glow line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2 text-brand-text dark:text-white">
              <BarChart3 className="w-5 h-5 text-emerald-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6" />
              Demographics
            </h3>
            
            <div className="space-y-4">
              {[
                { label: "Age 13-17", value: demographics.age13_17 || "0%", opacity: "opacity-40" },
                { label: "Age 18-24", value: demographics.age18_24 || "0%", opacity: "opacity-70" },
                { label: "Age 25-34", value: demographics.age25_34 || "0%", opacity: "opacity-100" },
                { label: "Age 35-44", value: demographics.age35_44 || "0%", opacity: "opacity-80" },
                { label: "Age 45-54", value: demographics.age45_54 || "0%", opacity: "opacity-60" },
                { label: "Age 55-64", value: demographics.age55_64 || "0%", opacity: "opacity-50" },
                { label: "Age 65+", value: demographics.age65_plus || "0%", opacity: "opacity-30" },
              ].map((item, idx) => (
                <div key={idx} className="transition-transform duration-300 group-hover:translate-x-0.5">
                  <div className="flex justify-between text-xs font-medium mb-1.5 text-brand-text dark:text-zinc-300">
                    <span>{item.label}</span>
                    <span className="text-emerald-500 font-bold transition-transform duration-300 group-hover:scale-105 inline-block">{item.value}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-[#16382e] rounded-full h-1.5 overflow-hidden">
                    <div className={`bg-emerald-500 h-1.5 rounded-full ${item.opacity} transition-all duration-500 group-hover:shadow-[0_0_8px_rgba(16,185,129,0.5)]`} style={{ width: item.value }}></div>
                  </div>
                </div>
              ))}

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
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="group relative bg-brand-bg dark:bg-[#0c201a] rounded-2xl p-5 sm:p-8 border border-brand-border dark:border-[#16382e] shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 hover:border-emerald-500/40 dark:hover:border-emerald-500/40 overflow-hidden">
              {/* Ambient top border glow line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <h3 className="font-heading text-xl font-bold mb-6 flex items-center gap-2 text-brand-text dark:text-white">
                <Globe className="w-5 h-5 text-emerald-500 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                Top Geographies
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {parseGeographies(geographies).length > 0 ? (
                  parseGeographies(geographies).map((country, idx) => (
                    <div 
                      key={country.id || `${country.name}-${idx}`} 
                      className="group/item flex flex-col p-3 bg-white dark:bg-[#102922] rounded-xl border border-brand-border dark:border-[#16382e] shadow-sm text-brand-text dark:text-white transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.02] hover:border-emerald-500/40 hover:bg-emerald-500/5 dark:hover:bg-[#14332a] hover:shadow-md cursor-pointer"
                    >
                      <span className="flex items-center gap-2 mb-2 font-medium min-w-0">
                        <span className="transition-transform duration-200 group-hover/item:scale-125 inline-block">
                          <CountryFlag name={country.name} />
                        </span>
                        <span className="font-semibold text-xs truncate" title={country.name}>{country.name}</span>
                      </span>
                      <span className="font-bold text-emerald-500 text-sm transition-transform duration-200 group-hover/item:scale-110">
                        {country.percent}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-4 text-center text-xs text-brand-muted dark:text-emerald-200/60 font-medium">
                    No top countries configured.
                  </div>
                )}
              </div>
            </div>

            <div className="group relative bg-brand-bg dark:bg-[#0c201a] rounded-2xl p-5 sm:p-6 shadow-sm overflow-hidden border border-brand-border dark:border-[#16382e] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 dark:hover:shadow-emerald-500/5 hover:border-emerald-500/40 dark:hover:border-emerald-500/40">
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
                  <span key={bIdx} className="text-xs font-bold px-3 py-1.5 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 rounded-lg shadow-sm">
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
