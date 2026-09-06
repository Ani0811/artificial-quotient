"use client";

import React from "react";
import { Eye, EyeOff, Sparkles, CheckCircle2, Play, Users, TrendingUp, Globe, ShieldCheck } from "lucide-react";
import { LogoImage } from "@/components/ui/logo-image";
import { CountryFlag } from "@/components/audience-snapshot";
import { AdminTabType } from "../AdminSidebar";
import { HeroConfig, CountryItem, SponsorItem, PerformItem, BrandItem, AdminUser } from "@/types";
import { getYoutubeId } from "../../utils";

interface AdminPreviewPanelProps {
  activeTab: AdminTabType;
  heroForm: HeroConfig;
  statsForm: {
    subscribers: string;
    monthlyViews: string;
    [key: string]: any;
  };
  ratesForm: {
    dedicatedRate: string;
    integrationRate: string;
  };
  geoForm: CountryItem[];
  sponsorResults: SponsorItem[];
  whatPerforms: PerformItem[];
  brandsList: BrandItem[];
  adminUsers: AdminUser[];
}

export function AdminPreviewPanel({
  activeTab,
  heroForm,
  statsForm,
  ratesForm,
  geoForm,
  sponsorResults,
  whatPerforms,
  brandsList,
  adminUsers,
}: AdminPreviewPanelProps) {
  return (
    <div className="w-full bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] backdrop-blur-xl rounded-2xl p-4 sm:p-7 shadow-md transition-colors duration-200">
      <div className="flex items-center justify-between flex-wrap gap-2 pb-5 mb-6 border-b border-brand-border dark:border-[#16382e]">
        <div className="flex items-center gap-2.5 min-w-0">
          <Eye className="w-5 h-5 text-emerald-500 animate-pulse shrink-0" />
          <h3 className="font-heading text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider truncate">
            Live Pre-Publish Preview
          </h3>
        </div>
        <span className="text-xs bg-emerald-500/10 text-emerald-500 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20 shrink-0">
          Real-time
        </span>
      </div>

      {/* PREVIEW TAB: HERO SNAPSHOT CARD */}
      {activeTab === "hero" && (
        <div className="space-y-4">
          <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Live Hero Snapshot Card Preview
          </div>

          <div className="relative group p-[2px] rounded-3xl shadow-xl transition-all duration-300">
            {heroForm.enableRgbEffect !== false && (
              <div className="absolute -inset-1.5 rounded-3xl rgb-aura-glow opacity-80 pointer-events-none -z-10"></div>
            )}

            <div className={`p-[2px] rounded-[24px] ${heroForm.enableRgbEffect !== false ? "rgb-border-card" : "bg-emerald-500/40"}`}>
              <div className="bg-[#091512] rounded-[22px] p-4 sm:p-5 text-white relative overflow-hidden">
                {/* Corner Accents */}
                <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-emerald-400/60 rounded-tl-sm pointer-events-none"></div>
                <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-sm pointer-events-none"></div>
                <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-teal-400/60 rounded-bl-sm pointer-events-none"></div>
                <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-blue-400/60 rounded-br-sm pointer-events-none"></div>

                {/* Card Header */}
                <div className="flex justify-between items-start mb-4 gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="relative shrink-0">
                      <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/50 bg-zinc-900 flex items-center justify-center">
                        {heroForm.channelLogo ? (
                          <img src={heroForm.channelLogo} alt="Logo" className="w-full h-full object-contain p-1" />
                        ) : (
                          <LogoImage alt="Logo" width={40} height={40} className="w-full h-full object-contain p-1" />
                        )}
                      </div>
                      <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-zinc-950 p-0.5 rounded-full border border-zinc-950">
                        <CheckCircle2 className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    </div>

                    <div className="min-w-0">
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-white truncate">
                        {heroForm.channelName || "Artificial Quotient"}
                      </h4>
                      <p className="text-zinc-400 text-[10px] flex items-center gap-1 truncate">
                        <span>{heroForm.channelHandle || "@ArtificialQuotient"}</span>
                        <span className="text-emerald-400 font-semibold">• {heroForm.channelCategory || "Tech & AI"}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-600 to-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider shrink-0 flex items-center gap-1 shadow-sm shadow-red-600/30">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>{heroForm.subscribeButtonText || "Subscribe"}</span>
                  </div>
                </div>

                {/* Card Metrics */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-[#0d221c] p-2.5 rounded-xl border border-emerald-500/20">
                    <div className="text-[10px] text-emerald-200/70 flex items-center gap-1">
                      <Users className="w-3 h-3 text-emerald-400" /> Subscribers
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-base font-extrabold text-white">{heroForm.subscribersCount || statsForm.subscribers || ""}</span>
                      <span className="text-[9px] font-bold text-emerald-400 flex items-center">
                        <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> {heroForm.subscribersBadge || "Active"}
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0d221c] p-2.5 rounded-xl border border-cyan-500/20">
                    <div className="text-[10px] text-cyan-200/70 flex items-center gap-1">
                      <Play className="w-3 h-3 text-cyan-400" /> Total Views
                    </div>
                    <div className="flex items-baseline gap-1 mt-0.5">
                      <span className="text-base font-extrabold text-white">{heroForm.monthlyViewsCount || statsForm.monthlyViews || ""}</span>
                      <span className="text-[9px] font-bold text-cyan-400 flex items-center">
                        <Sparkles className="w-2.5 h-2.5 mr-0.5" /> {heroForm.monthlyViewsBadge || "Growing"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Retention Gauge */}
                <div className="bg-[#0d221c]/60 p-2.5 rounded-xl border border-emerald-500/15">
                  <div className="flex justify-between items-center text-[10px] mb-1.5">
                    <span className="text-emerald-200/80 font-medium">
                      {heroForm.retentionLabel || "Avg. Viewer Retention"}
                    </span>
                    <span className="font-bold text-white bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[9px] border border-emerald-500/30">
                      {heroForm.retentionPercent || "27%"}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-900 rounded-full h-2 overflow-hidden p-0.5 border border-emerald-500/20">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full"
                      style={{ width: `${Math.min(100, Math.max(5, parseInt((heroForm.retentionPercent || "27").replace(/[^0-9]/g, ""), 10) || 27))}%` }}
                    ></div>
                  </div>
                  <div className="text-[9px] text-emerald-200/60 mt-1.5 flex justify-between">
                    <span>{heroForm.retentionLeftText || "Top Tier Engagement"}</span>
                    <span className="text-emerald-200/80 font-semibold">{heroForm.retentionRightText || "Targeted Tech Audience"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW TAB 1: STATS & PRICING */}
      {activeTab === "stats" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] rounded-xl p-4">
              <div className="text-xs font-bold text-brand-muted dark:text-emerald-200/60 uppercase">Subscribers</div>
              <div className="text-xl font-bold text-brand-text dark:text-white mt-1">{statsForm.subscribers}</div>
            </div>

            <div className="bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] rounded-xl p-4">
              <div className="text-xs font-bold text-brand-muted dark:text-emerald-200/60 uppercase">Total Views</div>
              <div className="text-xl font-bold text-brand-text dark:text-white mt-1">{statsForm.monthlyViews}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e]">
              <div className="text-xs text-emerald-500 font-bold uppercase">Dedicated Rate</div>
              <div className="text-xl font-bold text-brand-text dark:text-white mt-1">{ratesForm.dedicatedRate}</div>
            </div>
            <div className="p-4 rounded-xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e]">
              <div className="text-xs text-brand-muted dark:text-emerald-200/70 font-bold uppercase">Integration Rate</div>
              <div className="text-xl font-bold text-brand-text dark:text-white mt-1">{ratesForm.integrationRate}</div>
            </div>
          </div>

          {/* Top Geographies Real-time Preview */}
          <div className="p-4 rounded-xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-wider">
              <Globe className="w-3.5 h-3.5" /> Top Geographies ({geoForm.length})
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {geoForm.map((country, idx) => (
                <div key={country.id || idx} className="p-2.5 bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] rounded-xl">
                  <div className="flex items-center gap-1.5 mb-1 min-w-0">
                    <CountryFlag name={country.name} />
                    <span className="text-xs font-semibold truncate text-brand-text dark:text-white" title={country.name}>{country.name || "Unnamed"}</span>
                  </div>
                  <div className="text-xs font-bold text-emerald-500">{country.percent || "0%"}</div>
                </div>
              ))}
              {geoForm.length === 0 && (
                <div className="col-span-full py-2 text-center text-xs text-brand-muted dark:text-emerald-200/60">
                  No countries configured.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW TAB 2: SPONSOR CASE STUDIES */}
      {activeTab === "case-studies" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <div className="text-sm font-bold text-brand-text dark:text-white">Live Case Studies Preview</div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
              {sponsorResults.filter(s => !s.hidden).length} Public / {sponsorResults.length} Total
            </span>
          </div>
          <div className="space-y-4">
            {sponsorResults.map((item, idx) => {
              const ytId = getYoutubeId(item.ytUrl);
              const thumbImg = item.thumbnailUrl === "none" ? null : (item.thumbnailUrl || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null));

              return (
                <div 
                  key={item.id} 
                  className={`p-4 rounded-xl border space-y-3 transition-all ${
                    item.hidden 
                      ? "border-amber-500/30 bg-amber-500/[0.02] opacity-80" 
                      : "border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612]"
                  }`}
                >
                  {/* Thumbnail preview banner */}
                  {thumbImg && (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-brand-border/60 dark:border-[#16382e]/60 shadow-inner">
                      <img src={thumbImg} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-bold text-white">
                        #{idx + 1}
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      {!thumbImg && (
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          #{idx + 1}
                        </span>
                      )}
                      <span className="font-bold text-sm text-brand-text dark:text-white truncate min-w-0">{item.partnerName}</span>
                      {item.hidden ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/30 shrink-0">
                          <EyeOff className="w-2.5 h-2.5" /> Hidden
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 shrink-0">
                          <Eye className="w-2.5 h-2.5" /> Live
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0">{item.campaignType}</span>
                  </div>
                  {item.quote && item.quote.trim() !== "" && (
                    <p 
                      style={{ fontFamily: item.quoteFont ? `'${item.quoteFont}', cursive, sans-serif` : undefined }}
                      className="font-handwritten text-sm text-brand-muted dark:text-emerald-200/80 italic leading-relaxed"
                    >
                      &quot;{item.quote}&quot;
                    </p>
                  )}
                  <div className="flex justify-between items-center flex-wrap gap-2 text-xs font-bold border-t border-brand-border dark:border-[#16382e] pt-2">
                    <span className="min-w-0">{item.stat1Label || "Metric"}: <span className="text-emerald-500">{item.stat1Value || "—"}</span></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PREVIEW TAB 3: WHAT PERFORMS */}
      {activeTab === "what-performs" && (
        <div className="space-y-5">
          <div className="text-sm font-bold text-brand-text dark:text-white mb-2">What Performs Preview ({whatPerforms.length} Videos)</div>
          <div className="grid grid-cols-1 gap-4">
            {whatPerforms.map((item, idx) => {
              const ytId = getYoutubeId(item.ytUrl);
              const thumbImg = item.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : null);

              return (
                <div key={item.id} className="p-4 rounded-xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-3">
                  {thumbImg && (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-brand-border/60 dark:border-[#16382e]/60">
                      <img src={thumbImg} alt="" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm text-white flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] font-bold text-white flex items-center gap-1">
                        <span>#{idx + 1}</span>
                        <span>•</span>
                        <span>{item.type || "Video"}</span>
                      </div>
                    </div>
                  )}
                  <div className="font-bold text-sm text-brand-text dark:text-white line-clamp-2">
                    {!thumbImg && <span className="text-emerald-500 font-mono mr-1.5">#{idx + 1}</span>}
                    {item.title}
                  </div>
                  <div className="flex justify-between items-center text-xs font-bold border-t border-brand-border dark:border-[#16382e] pt-2">
                    <span className="text-brand-muted dark:text-emerald-200/70">{item.views} views</span>
                    <span className="text-emerald-500">{item.clicks} clicks</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* PREVIEW TAB 4: BRANDS & PARTNERS */}
      {activeTab === "brands" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm font-bold text-brand-text dark:text-white">Brands &amp; Partners</div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">{brandsList.length} Brands</span>
          </div>
          {brandsList.length === 0 ? (
            <div className="text-xs text-brand-muted dark:text-emerald-200/50 italic text-center py-6">No brands yet. Add one to get started.</div>
          ) : brandsList.map((brand, idx) => (
            <div key={brand.id} className="bg-brand-bg dark:bg-[#061612] rounded-xl border border-brand-border dark:border-[#16382e] p-4 shadow-sm relative overflow-hidden">
              <div className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${["from-emerald-500 to-teal-400","from-amber-400 to-orange-500","from-indigo-500 to-purple-500","from-purple-500 to-pink-500","from-cyan-400 to-blue-500","from-rose-500 to-red-400"][idx % 6]}`}></div>
              <div className="flex justify-between items-start mb-2 gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                    #{idx + 1}
                  </span>
                  <span className="font-heading font-bold text-sm text-brand-text dark:text-white truncate">{brand.logoText || brand.name}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">Sponsor</span>
              </div>
              <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">{brand.category}</div>
              <p className="text-xs text-brand-muted dark:text-zinc-400 leading-relaxed">{brand.tagline}</p>
            </div>
          ))}
        </div>
      )}

      {/* PREVIEW TAB: ADMIN USERS */}
      {activeTab === "users" && (
        <div className="space-y-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="text-sm font-bold text-brand-text dark:text-white">Active System Admins ({adminUsers.filter(u => u.status === "Active").length})</div>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">
              {adminUsers.length} Total Registered
            </span>
          </div>
          <div className="space-y-3">
            {adminUsers.map((u) => (
              <div key={u.id} className="p-4 rounded-xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30 shrink-0">
                    {u.name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-sm text-brand-text dark:text-white flex items-center gap-2 flex-wrap">
                      <span className="truncate">{u.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                        u.status === "Active" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"
                      }`}>
                        {u.status}
                      </span>
                    </div>
                    <div className="text-xs text-brand-muted dark:text-emerald-200/70 truncate">{u.email}</div>
                  </div>
                </div>
                <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-brand-border dark:border-[#16382e]">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shrink-0">
                    {u.role}
                  </span>
                  <span className="text-[10px] text-brand-muted dark:text-emerald-200/50 font-mono shrink-0">
                    PIN: {u.recoveryKey}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PREVIEW TAB 6: BACKUP SUMMARY */}
      {activeTab === "backup" && (
        <div className="p-5 rounded-xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-emerald-500">
            <ShieldCheck className="w-5 h-5" /> System Health Status
          </div>
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex justify-between border-b border-brand-border/40 pb-2">
              <span className="text-brand-muted dark:text-emerald-200/60">Backup System</span>
              <span className="text-emerald-400 font-bold">Operational</span>
            </div>
            <div className="flex justify-between border-b border-brand-border/40 pb-2">
              <span className="text-brand-muted dark:text-emerald-200/60">Auto Snapshots</span>
              <span className="text-emerald-400 font-bold">Rolling (Limit 20)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-muted dark:text-emerald-200/60">Data Store</span>
              <span className="text-white font-bold">site-data.json</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
