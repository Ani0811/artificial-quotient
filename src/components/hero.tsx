"use client";

import Link from "next/link";
import { Play, Users, TrendingUp, Sparkles, CheckCircle2, ShieldCheck, Flame, Zap } from "lucide-react";
import { handleSmoothScroll } from "@/lib/scroll";
import { LogoImage } from "@/components/ui/logo-image";
import { HeroConfig, ChannelStats } from "@/types";
import { useState, useRef, MouseEvent } from "react";

interface HeroProps {
  heroConfig?: HeroConfig | null;
  stats?: ChannelStats | null;
  isLoading?: boolean;
}

export default function Hero({ heroConfig, stats, isLoading }: HeroProps) {
  // 3D Perspective Tilt State
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation (-10 to 10 deg)
    const rotateY = ((mouseX - width / 2) / (width / 2)) * 8;
    const rotateX = -((mouseY - height / 2) / (height / 2)) * 8;
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  // Resolve config values with fallbacks
  const badgeText = heroConfig?.badgeText || "Open for Q3 Sponsorships";
  const headline = heroConfig?.headline || "Actionable AI Workflows";
  const headlineHighlight = heroConfig?.headlineHighlight || "For Everyone";
  const subheadline = heroConfig?.subheadline || "Artificial Quotient turns AI software into step-by-step workflow tutorials for 10K+ subscribers and 55K+ monthly viewers who create with AI tools every day.";
  const sponsorButtonText = heroConfig?.sponsorButtonText || "Sponsor the Channel";
  const sponsorButtonUrl = heroConfig?.sponsorButtonUrl || "https://forms.gle/4uTUZkEi5o3iqYrs5";
  const caseStudiesButtonText = heroConfig?.caseStudiesButtonText || "View Case Studies";

  // Card stats with fallbacks
  const channelName = heroConfig?.channelName || "Artificial Quotient";
  const channelHandle = heroConfig?.channelHandle || "@ArtificialQuotient";
  const channelCategory = heroConfig?.channelCategory || "Tech & AI";
  const subscribeUrl = heroConfig?.subscribeUrl || "https://www.youtube.com/@ArtificialQuotient01";
  const subscribeButtonText = heroConfig?.subscribeButtonText || "Subscribe";

  const subscribersCount = heroConfig?.subscribersCount || stats?.subscribers || "10.1k";
  const subscribersBadge = heroConfig?.subscribersBadge || "Active";
  const monthlyViewsCount = heroConfig?.monthlyViewsCount || stats?.monthlyViews || "69.5k";
  const monthlyViewsBadge = heroConfig?.monthlyViewsBadge || "Growing";
  
  const retentionRaw = heroConfig?.retentionPercent || stats?.retention || "27%";
  const retentionNum = parseInt(retentionRaw.replace(/[^0-9]/g, ""), 10) || 27;
  const retentionDisplay = retentionRaw.includes("%") ? retentionRaw : `${retentionNum}%`;
  const retentionLabel = heroConfig?.retentionLabel || "Avg. Viewer Retention";
  const retentionLeftText = heroConfig?.retentionLeftText || "Top Tier Engagement";
  const retentionRightText = heroConfig?.retentionRightText || "Targeted Tech Audience";
  const isRgbEnabled = heroConfig?.enableRgbEffect !== false;

  return (
    <section className="w-full pt-10 pb-8 sm:pt-20 sm:pb-14 px-4 relative overflow-hidden transition-colors">
      
      {/* Background Ambient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-blue/10 dark:bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/10 dark:bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-6 lg:gap-12 items-center relative z-10">
        
        {/* Left Column: Copy */}
        <div className="flex flex-col gap-3 sm:gap-5 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-brand-card dark:bg-zinc-900/90 border border-brand-border dark:border-emerald-500/20 shadow-sm w-fit">
            <span className="w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[9px] sm:text-xs font-semibold text-brand-muted dark:text-emerald-400 uppercase tracking-wider">
              {badgeText}
            </span>
          </div>
          
          <h1 className="font-heading text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-text dark:text-white">
            {headline} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">{headlineHighlight}</span>
          </h1>
          
          <p className="text-sm sm:text-base text-brand-muted dark:text-zinc-300 max-w-xl font-body leading-relaxed">
            {subheadline}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 pt-1 sm:pt-3">
            <a 
              href={sponsorButtonUrl} 
              target="_blank" 
              rel="noreferrer" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-lg text-center transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              {sponsorButtonText}
            </a>
            <Link 
              href="/#case-studies" 
              onClick={(e) => handleSmoothScroll(e, "case-studies")}
              className="bg-brand-card dark:bg-zinc-900/90 hover:bg-gray-50 dark:hover:bg-zinc-800 text-brand-text dark:text-white border border-brand-border dark:border-zinc-800 px-5 py-3 sm:px-8 sm:py-4 rounded-xl font-bold text-sm sm:text-lg text-center transition-all shadow-sm hover:-translate-y-0.5"
            >
              {caseStudiesButtonText}
            </Link>
          </div>
        </div>

        {/* Right Column: Dynamic RGB-Framed Floating Snapshot Card */}
        <div 
          className="relative group order-1 lg:order-2 perspective-[1200px]"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Multi-layer RGB Ambient Glow Aura */}
          {isRgbEnabled && (
            <div 
              className="absolute -inset-2.5 rounded-[32px] rgb-aura-glow opacity-80 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10"
            ></div>
          )}

          {/* Dynamic RGB Border Frame Container */}
          <div
            ref={cardRef}
            style={{
              transform: isHovered 
                ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`
                : "perspective(1000px) rotateX(1.5deg) rotateY(-3deg) scale3d(1, 1, 1)",
              transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-in-out",
            }}
            className={`p-[2px] rounded-[28px] shadow-2xl relative transition-all duration-300 ${
              isRgbEnabled ? "rgb-border-card" : "bg-gradient-to-r from-emerald-500/50 via-teal-400/50 to-blue-500/50"
            }`}
          >
            {/* Card Inner Face */}
            <div className="bg-[#091512]/95 dark:bg-[#071310]/95 backdrop-blur-2xl rounded-[26px] p-4 sm:p-6 shadow-2xl text-white relative overflow-hidden">
              
              {/* Animated Glass Shimmer Sweep */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[26px]">
                <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer"></div>
              </div>

              {/* Cybernetic High-Tech Corner Framing Accents */}
              <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t-2 border-l-2 border-emerald-400/60 rounded-tl-md pointer-events-none"></div>
              <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-md pointer-events-none"></div>
              <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b-2 border-l-2 border-teal-400/60 rounded-bl-md pointer-events-none"></div>
              <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b-2 border-r-2 border-blue-400/60 rounded-br-md pointer-events-none"></div>

              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 via-cyan-400 to-blue-500"></div>

              {/* Header: Logo, Branding & Subscribe Button */}
              <div className="flex justify-between items-start mb-5 gap-3 relative z-10">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-emerald-500/50 shadow-lg bg-zinc-900 flex items-center justify-center transition-transform group-hover:scale-105">
                      {heroConfig?.channelLogo ? (
                        <img 
                          src={heroConfig.channelLogo} 
                          alt={channelName} 
                          className="w-full h-full object-contain p-1" 
                        />
                      ) : (
                        <LogoImage 
                          alt="Artificial Quotient Official Logo" 
                          width={56}
                          height={56}
                          className="w-full h-full object-contain p-1"
                        />
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-zinc-950 p-1 rounded-full border-2 border-zinc-950 shadow-md animate-pulse">
                      <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                    </div>
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-heading font-extrabold text-sm sm:text-lg tracking-tight text-white truncate flex items-center gap-1.5">
                      {channelName}
                    </h3>
                    <p className="text-zinc-400 text-[10px] sm:text-xs font-medium flex items-center gap-1 mt-0.5 flex-wrap">
                      <span>{channelHandle}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-600 flex-shrink-0"></span>
                      <span className="text-emerald-400 font-semibold">{channelCategory}</span>
                    </p>
                  </div>
                </div>

                <a
                  href={subscribeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-600 text-white text-[10px] sm:text-xs font-bold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl uppercase tracking-wider transition-all hover:scale-105 active:scale-95 flex items-center gap-1 shadow-md shadow-red-600/40 cursor-pointer shrink-0"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  {subscribeButtonText}
                </a>
              </div>

              {/* Main Stats Grid */}
              <div className="grid grid-cols-2 gap-3 mb-4 relative z-10">
                <div className="bg-[#0d221c]/80 rounded-2xl p-3 sm:p-4 border border-emerald-500/20 transition-all hover:border-emerald-500/50 hover:bg-[#102b23] hover:shadow-lg hover:shadow-emerald-500/10">
                  <p className="text-emerald-200/70 text-[10px] sm:text-xs mb-1 font-medium flex items-center gap-1.5">
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" /> Subscribers
                  </p>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xl sm:text-3xl font-heading font-extrabold text-white">{subscribersCount}</span>
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-400 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-500/15 border border-emerald-500/20">
                      <TrendingUp className="w-3 h-3" /> {subscribersBadge}
                    </span>
                  </div>
                </div>

                <div className="bg-[#0d221c]/80 rounded-2xl p-3 sm:p-4 border border-cyan-500/20 transition-all hover:border-cyan-500/50 hover:bg-[#102b23] hover:shadow-lg hover:shadow-cyan-500/10">
                  <p className="text-cyan-200/70 text-[10px] sm:text-xs mb-1 font-medium flex items-center gap-1.5">
                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400" /> Monthly Views
                  </p>
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-xl sm:text-3xl font-heading font-extrabold text-white">{monthlyViewsCount}</span>
                    <span className="text-[10px] sm:text-xs font-bold text-cyan-400 flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/20">
                      <Sparkles className="w-3 h-3" /> {monthlyViewsBadge}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Avg Retention Gauge Section */}
              <div className="bg-[#0d221c]/60 rounded-2xl p-3 sm:p-4 border border-emerald-500/15 relative z-10">
                <div className="flex justify-between items-center mb-2 text-xs">
                  <span className="text-emerald-200/80 font-medium flex items-center gap-1.5 text-[10px] sm:text-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 -ml-3.5"></span>
                    {retentionLabel}
                  </span>
                  <span className="font-bold text-white bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-md border border-emerald-500/30 text-[10px] sm:text-xs shadow-sm">
                    {retentionDisplay}
                  </span>
                </div>

                <div className="w-full bg-zinc-900/90 rounded-full h-2.5 overflow-hidden p-0.5 border border-emerald-500/20 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 h-full rounded-full transition-all duration-1000 shadow-[0_0_14px_rgba(16,185,129,0.8)]"
                    style={{ width: `${Math.min(100, Math.max(5, retentionNum))}%` }}
                  ></div>
                </div>

                <div className="text-[10px] text-emerald-200/60 mt-2 flex justify-between items-center flex-wrap gap-1">
                  <span>{retentionLeftText}</span>
                  <span className="text-emerald-200/80 font-semibold">{retentionRightText}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
