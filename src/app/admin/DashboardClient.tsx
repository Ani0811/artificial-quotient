"use client";

import { 
  Save, BarChart, BarChart3, DollarSign, Globe, ShoppingBag, Database, FileText, LogOut, Check, ExternalLink, 
  UploadCloud, Eye, EyeOff, Edit3, Sparkles, Award, Plus, Trash2, ShieldCheck, Users, Layers, Play, TrendingUp, CheckCircle2, Zap
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { QUOTE_FONT_OPTIONS, loadGoogleFont } from "@/components/font-provider";
import { ToolItem, PerformItem, SponsorItem, AdminUser, BrandItem, InterestItem, CountryItem, HeroConfig } from "@/types";
import { LogoImage } from "@/components/ui/logo-image";
import { CountryFlag, parseGeographies } from "@/components/audience-snapshot";
import { ALL_COUNTRIES } from "@/lib/countries";

function getYoutubeId(url?: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function DashboardClient({ currentUser }: { currentUser?: AdminUser }) {
  const isViewer = currentUser?.role === "Viewer";
  const canEditUsers = currentUser?.role !== "Viewer" && (currentUser?.role === "Super Admin" || currentUser?.permissions?.includes("users"));
  const canEditBackup = currentUser?.role !== "Viewer" && (currentUser?.role === "Super Admin" || currentUser?.permissions?.includes("backup"));
  const [activeTab, setActiveTab] = useState<"hero" | "stats" | "case-studies" | "what-performs" | "tools" | "brands" | "users" | "backup">("hero");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === "users" && !canEditUsers) {
      setActiveTab("stats");
    } else if (activeTab === "backup" && !canEditBackup) {
      setActiveTab("stats");
    }
  }, [activeTab, canEditUsers, canEditBackup]);

  useEffect(() => {
    if (savedSuccess) {
      setTimeout(() => {
        if (bannerRef.current) {
          bannerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 50);
    }
  }, [savedSuccess]);
  const [layoutMode, setLayoutMode] = useState<"split" | "edit" | "preview">("split");
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<string>("Connected to MySQL: AQ-Dashboard");
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});
  const [statsForm, setStatsForm] = useState({
    subscribers: "",
    subscribersSub: "",
    monthlyViews: "",
    monthlyViewsSub: "",
    newSubs: "",
    newSubsSub: "",
    videosCount: "",
    videosCountSub: "",
    retention: "",
    channelBanner: "",
    uniqueViewers: "",
    watchTimeHours: "",
    avgViewDuration: "",
    avgPercentageViewed: "",
    returningViewers: "",
  });

  const [ratesForm, setRatesForm] = useState({
    dedicatedRate: "",
    integrationRate: "",
  });

  const [demoForm, setDemoForm] = useState({
    age13_17: "",
    age18_24: "",
    age25_34: "",
    age35_44: "",
    age45_54: "",
    age55_64: "",
    age65_plus: "",
    malePercent: "",
    femalePercent: "",
  });

  const [geoForm, setGeoForm] = useState<CountryItem[]>([]);

  const [whatPerforms, setWhatPerforms] = useState<PerformItem[]>([]);
  const [sponsorResults, setSponsorResults] = useState<SponsorItem[]>([]);
  const [toolsList, setToolsList] = useState<ToolItem[]>([]);
  const [brandsList, setBrandsList] = useState<BrandItem[]>([]);
  const [uploadingField, setUploadingField] = useState<string | null>(null);
  const [audienceInterests, setAudienceInterests] = useState<InterestItem[]>([]);
  const [shoppingInterests, setShoppingInterests] = useState<InterestItem[]>([]);
  const [heroForm, setHeroForm] = useState<HeroConfig>({
    badgeText: "Open for Q3 Sponsorships",
    headline: "Actionable AI Workflows",
    headlineHighlight: "For Everyone",
    subheadline: "Artificial Quotient turns AI software into step-by-step workflow tutorials for 10K+ subscribers and 55K+ monthly viewers who create with AI tools every day.",
    sponsorButtonText: "Sponsor the Channel",
    sponsorButtonUrl: "https://forms.gle/4uTUZkEi5o3iqYrs5",
    caseStudiesButtonText: "View Case Studies",
    channelName: "Artificial Quotient",
    channelHandle: "@ArtificialQuotient",
    channelCategory: "Tech & AI",
    channelLogo: "",
    subscribeUrl: "https://www.youtube.com/@ArtificialQuotient01",
    subscribeButtonText: "Subscribe",
    subscribersCount: "10.1k",
    subscribersBadge: "Active",
    monthlyViewsCount: "69.5k",
    monthlyViewsBadge: "Growing",
    retentionPercent: "27%",
    retentionLabel: "Avg. Viewer Retention",
    retentionLeftText: "Top Tier Engagement",
    retentionRightText: "Targeted Tech Audience",
    enableRgbEffect: true,
  });

  const [availableCountries, setAvailableCountries] = useState<{ code: string; name: string }[]>(ALL_COUNTRIES);

  // Fetch initial site data from API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          if (data.stats) setStatsForm(data.stats);
          if (data.heroConfig) setHeroForm((prev) => ({ ...prev, ...data.heroConfig }));
          if (data.rates) setRatesForm(data.rates);
          if (data.demographics) setDemoForm(data.demographics);
          if (data.geographies) setGeoForm(parseGeographies(data.geographies));
          if (data.countries && data.countries.length > 0) setAvailableCountries(data.countries);
          if (data.whatPerforms) setWhatPerforms(data.whatPerforms);
          if (data.sponsorResults) {
            setSponsorResults(data.sponsorResults);
            data.sponsorResults.forEach((s: { quoteFont?: string }) => {
              if (s.quoteFont) loadGoogleFont(s.quoteFont);
            });
          }
          if (data.tools && data.tools.length > 0) setToolsList(data.tools);
          if (data.brandItems && data.brandItems.length > 0) setBrandsList(data.brandItems);
          if (data.audienceInterests && data.audienceInterests.length > 0) setAudienceInterests(data.audienceInterests);
          if (data.shoppingInterests && data.shoppingInterests.length > 0) setShoppingInterests(data.shoppingInterests);
          if (data.dbStatus) setDbStatus(data.dbStatus);
        }

        const usersRes = await fetch("/api/admin/users");
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          if (usersData.users) setAdminUsers(usersData.users);
          if (usersData.dbStatus) setDbStatus(usersData.dbStatus);
        }
      } catch {
        // Fall back to initial defaults
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleInlineMediaUpload = async (files: FileList | null, setFieldUrl: (url: string) => void, fieldId: string) => {
    if (!files || files.length === 0) return;
    setUploadingField(fieldId);

    const formData = new FormData();
    formData.append("file", files[0]);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.files && data.files.length > 0) {
          setFieldUrl(data.files[0].url);
        }
      }
    } catch {
      // Ignore error
    } finally {
      setUploadingField(null);
    }
  };

  const handleSaveUsers = async () => {
    if (isViewer || !canEditUsers) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users: adminUsers }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch {
      // Ignore error
    }
  };

  const handleSaveAll = async () => {
    if (isViewer) return;
    const payload = {
      heroConfig: heroForm,
      stats: statsForm,
      rates: ratesForm,
      demographics: demoForm,
      geographies: geoForm,
      whatPerforms,
      sponsorResults,
      tools: toolsList,
      brandItems: brandsList,
      audienceInterests,
      shoppingInterests,
    };

    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch {
      // Ignore error
    }
  };

  const handleDownloadBackup = async () => {
    const payload = {
      heroConfig: heroForm,
      stats: statsForm,
      rates: ratesForm,
      demographics: demoForm,
      geographies: geoForm,
      whatPerforms,
      sponsorResults,
      tools: toolsList,
      brandItems: brandsList,
      audienceInterests,
      shoppingInterests,
    };

    const jsonStr = JSON.stringify(payload, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const dateStr = new Date().toISOString().split("T")[0];

    const a = document.createElement("a");
    a.href = url;
    a.download = `artificial-quotient-backup-${dateStr}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (data.stats) setStatsForm(data.stats);
      if (data.heroConfig) setHeroForm(data.heroConfig);
      if (data.rates) setRatesForm(data.rates);
      if (data.demographics) setDemoForm(data.demographics);
      if (data.geographies) setGeoForm(parseGeographies(data.geographies));
      if (data.whatPerforms) setWhatPerforms(data.whatPerforms);
      if (data.sponsorResults) {
        setSponsorResults(data.sponsorResults);
        data.sponsorResults.forEach((s: { quoteFont?: string }) => {
          if (s.quoteFont) loadGoogleFont(s.quoteFont);
        });
      }
      if (data.tools) setToolsList(data.tools);
      if (data.brandItems) setBrandsList(data.brandItems);
      if (data.audienceInterests) setAudienceInterests(data.audienceInterests);
      if (data.shoppingInterests) setShoppingInterests(data.shoppingInterests);

      // Persist restored backup
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: text,
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    } catch {
      alert("Failed to restore backup file. Ensure it is a valid JSON backup file.");
    } finally {
      e.target.value = "";
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-brand-bg dark:bg-[#061612] text-emerald-50 font-bold text-lg">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div ref={topRef} id="admin-portal-top" className="w-full py-4 sm:py-10 px-3 sm:px-6 lg:px-8 bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-emerald-50 min-h-[calc(100vh-4rem)] transition-colors duration-200 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1700px] mx-auto relative z-10 space-y-4 sm:space-y-8">
        
        {/* Admin Header */}
        <div className="bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-md">
          {/* Top row: logo + title + actions */}
          <div className="flex items-start sm:items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl overflow-hidden shrink-0 border border-emerald-500/30 flex items-center justify-center shadow-sm p-1">
                <LogoImage 
                  alt="Artificial Quotient Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h1 className="font-heading text-base sm:text-2xl font-bold text-brand-text dark:text-white tracking-tight leading-tight">
                  Admin Management Portal
                </h1>
                <p className="text-[10px] sm:text-sm text-brand-muted dark:text-emerald-200/70 font-medium mt-0.5 truncate">
                  Logged in as <span className="text-emerald-600 dark:text-emerald-400 font-bold">{currentUser?.email || "Administrator"}</span>
                </p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <Link 
                href="/" 
                className="px-3 py-2 rounded-xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#102922] text-xs font-bold text-brand-text dark:text-emerald-100 hover:bg-emerald-500/10 transition-all flex items-center gap-1 shadow-sm"
              >
                <span className="hidden sm:inline">Live Site</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 hover:bg-red-500/20 text-xs font-bold transition-all flex items-center gap-1 shadow-sm"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Info badges */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <span className="text-[10px] sm:text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
              {currentUser?.name || "Auth Active"} · {currentUser?.role || "Admin"}
            </span>
            <span className="text-[10px] sm:text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Database className="w-3 h-3 text-emerald-400" />
              <span className="hidden sm:inline">{dbStatus}</span>
              <span className="sm:hidden">DB Connected</span>
            </span>
          </div>

          {/* View Mode Toggle — horizontal scroll on mobile */}
          <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <div className="inline-flex p-1 rounded-xl bg-brand-bg dark:bg-[#102922] border border-brand-border dark:border-[#16382e] flex-shrink-0">
              <button
                type="button"
                onClick={() => setLayoutMode("split")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  layoutMode === "split"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-brand-muted dark:text-emerald-200/70 hover:text-white"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" /> Split View
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("edit")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  layoutMode === "edit"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-brand-muted dark:text-emerald-200/70 hover:text-white"
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" /> Form Only
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("preview")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 whitespace-nowrap ${
                  layoutMode === "preview"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-brand-muted dark:text-emerald-200/70 hover:text-white"
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> Preview Only
              </button>
            </div>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8">

          {/* Navigation: horizontal scrollable tabs on mobile, vertical sidebar on lg+ */}
          <div className="lg:col-span-3">
            {/* Mobile horizontal tab strip */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: "hero", label: "Hero Card", Icon: Zap },
                { id: "stats", label: "Stats & Rates", Icon: BarChart },
                { id: "case-studies", label: "Case Studies", Icon: Award },
                { id: "what-performs", label: "Performs", Icon: Sparkles },
                { id: "tools", label: "Tools", Icon: Database },
                { id: "brands", label: "Brands", Icon: Layers },
                ...(canEditUsers ? [{ id: "users", label: `Admins (${adminUsers.filter(u => u.status === "Active").length})`, Icon: Users }] : []),
                ...(canEditBackup ? [{ id: "backup", label: "Backup", Icon: ShieldCheck }] : []),
              ].map(({ id, label, Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as typeof activeTab)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex-shrink-0 ${
                    activeTab === id
                      ? "bg-emerald-600 text-white shadow-sm shadow-emerald-600/20"
                      : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" /> {label}
                </button>
              ))}
            </div>

            {/* Desktop vertical sidebar */}
            <div className="hidden lg:flex flex-col gap-2.5">
              <button
                onClick={() => setActiveTab("hero")}
                className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                  activeTab === "hero"
                    ? "bg-emerald-600 text-white shadow-emerald-600/20"
                    : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70 hover:text-white hover:bg-emerald-50 dark:hover:bg-[#102922]"
                }`}
              >
                <Zap className="w-4 h-4 text-emerald-400" /> Hero Snapshot Card
              </button>
              <button
                onClick={() => setActiveTab("stats")}
                className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                  activeTab === "stats"
                    ? "bg-emerald-600 text-white shadow-emerald-600/20"
                    : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70 hover:text-white hover:bg-emerald-50 dark:hover:bg-[#102922]"
                }`}
              >
                <BarChart className="w-4 h-4" /> Channel Stats &amp; Rates
              </button>
              <button
                onClick={() => setActiveTab("case-studies")}
                className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                  activeTab === "case-studies"
                    ? "bg-emerald-600 text-white shadow-emerald-600/20"
                    : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70 hover:text-white hover:bg-emerald-50 dark:hover:bg-[#102922]"
                }`}
              >
                <Award className="w-4 h-4" /> Sponsor Case Studies
              </button>
              <button
                onClick={() => setActiveTab("what-performs")}
                className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                  activeTab === "what-performs"
                    ? "bg-emerald-600 text-white shadow-emerald-600/20"
                    : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70 hover:text-white hover:bg-emerald-50 dark:hover:bg-[#102922]"
                }`}
              >
                <Sparkles className="w-4 h-4" /> What Performs
              </button>
              <button
                onClick={() => setActiveTab("tools")}
                className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                  activeTab === "tools"
                    ? "bg-emerald-600 text-white shadow-emerald-600/20"
                    : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70 hover:text-white hover:bg-emerald-50 dark:hover:bg-[#102922]"
                }`}
              >
                <Database className="w-4 h-4" /> AI Tool Vault
              </button>
              <button
                onClick={() => setActiveTab("brands")}
                className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                  activeTab === "brands"
                    ? "bg-emerald-600 text-white shadow-emerald-600/20"
                    : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70 hover:text-white hover:bg-emerald-50 dark:hover:bg-[#102922]"
                }`}
              >
                <Layers className="w-4 h-4" /> Brands &amp; Partners
              </button>
              {canEditUsers && (
                <button
                  onClick={() => setActiveTab("users")}
                  className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                    activeTab === "users"
                      ? "bg-emerald-600 text-white shadow-emerald-600/20"
                      : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70 hover:text-white hover:bg-emerald-50 dark:hover:bg-[#102922]"
                  }`}
                >
                  <Users className="w-4 h-4" /> Admins &amp; Permissions ({adminUsers.filter(u => u.status === "Active").length})
                </button>
              )}
              {canEditBackup && (
                <button
                  onClick={() => setActiveTab("backup")}
                  className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                    activeTab === "backup"
                      ? "bg-emerald-600 text-white shadow-emerald-600/20"
                      : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70 hover:text-white hover:bg-emerald-50 dark:hover:bg-[#102922]"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" /> Backup &amp; System
                </button>
              )}
            </div>
          </div>

          {/* Main Workspace */}
          <div className="lg:col-span-9 flex flex-col gap-4 sm:gap-6">
            
            {savedSuccess && (
              <div ref={bannerRef} className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-5 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2.5 animate-fade-in shadow-sm">
                <Check className="w-5 h-5 text-emerald-500" /> Changes saved &amp; published live on site!
              </div>
            )}

            <div className={`grid gap-8 ${layoutMode === "split" ? "xl:grid-cols-12" : "grid-cols-1"}`}>
              
              {/* EDIT FORM CONTAINER */}
              {(layoutMode === "split" || layoutMode === "edit") && (
                <div className={`${layoutMode === "split" ? "xl:col-span-7" : "w-full"} bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] backdrop-blur-xl rounded-2xl p-4 sm:p-7 shadow-md transition-colors duration-200`}>
                  <div className="flex items-center justify-between pb-5 mb-6 border-b border-brand-border dark:border-[#16382e]">
                    <h2 className="font-heading text-lg font-bold text-brand-text dark:text-white flex items-center gap-2.5">
                      <Edit3 className="w-5 h-5 text-emerald-500" />
                      {activeTab === "hero" && "Manage Hero Snapshot & Dynamic RGB Frame"}
                      {activeTab === "stats" && "Edit Channel Stats & Pricing"}
                      {activeTab === "case-studies" && "Manage Sponsor Case Studies"}
                      {activeTab === "what-performs" && "Manage What Performs Cards"}
                      {activeTab === "tools" && "Manage AI Tool Vault"}
                      {activeTab === "brands" && "Manage Brands & Partners"}
                      {activeTab === "users" && "Manage Administrators & Access Permissions"}
                      {activeTab === "backup" && "System Backup & Data Operations"}
                    </h2>
                  </div>

                  {isViewer && (
                    <div className="bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 mb-6 shadow-sm">
                      <ShieldCheck className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                      <span>Read-Only Viewer Mode: Form fields and action buttons are disabled for your account.</span>
                    </div>
                  )}

                  {/* TAB: HERO SNAPSHOT CARD */}
                  {activeTab === "hero" && (
                    <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-5 p-5 sm:p-6 rounded-2xl bg-brand-bg/80 dark:bg-[#061612] border border-emerald-500/30 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between pb-3 border-b border-brand-border dark:border-[#16382e] flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <Zap className="w-4 h-4 text-emerald-500 animate-pulse" />
                            <div>
                              <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-300 uppercase tracking-wider">
                                Hero Snapshot Card &amp; Dynamic RGB Framing
                              </h3>
                              <p className="text-[11px] text-brand-muted dark:text-emerald-200/60 mt-0.5">
                                Customize the animated RGB glow, 3D interactive tilt, and all live stats displayed inside the Hero card picture.
                              </p>
                            </div>
                          </div>

                          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-300 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={heroForm.enableRgbEffect !== false}
                              disabled={isViewer}
                              onChange={(e) => setHeroForm({ ...heroForm, enableRgbEffect: e.target.checked })}
                              className="rounded accent-emerald-500 w-4 h-4"
                            />
                            <span>RGB Glow Effect Active</span>
                          </label>
                        </div>

                        {/* Card Branding */}
                        <div className="space-y-2">
                          <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                            <span>Channel Branding &amp; Identity</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                Channel Name
                              </label>
                              <input 
                                type="text" 
                                value={heroForm.channelName || ""} 
                                disabled={isViewer}
                                placeholder="Artificial Quotient"
                                onChange={(e) => setHeroForm({ ...heroForm, channelName: e.target.value })}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                Channel Handle
                              </label>
                              <input 
                                type="text" 
                                value={heroForm.channelHandle || ""} 
                                disabled={isViewer}
                                placeholder="@ArtificialQuotient"
                                onChange={(e) => setHeroForm({ ...heroForm, channelHandle: e.target.value })}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                Category / Tagline
                              </label>
                              <input 
                                type="text" 
                                value={heroForm.channelCategory || ""} 
                                disabled={isViewer}
                                placeholder="Tech & AI"
                                onChange={(e) => setHeroForm({ ...heroForm, channelCategory: e.target.value })}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                YouTube Subscribe URL
                              </label>
                              <input 
                                type="text" 
                                value={heroForm.subscribeUrl || ""} 
                                disabled={isViewer}
                                placeholder="https://www.youtube.com/@..."
                                onChange={(e) => setHeroForm({ ...heroForm, subscribeUrl: e.target.value })}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                Channel Custom Logo URL
                              </label>
                              <div className="flex items-center gap-2">
                                <input 
                                  type="text" 
                                  value={heroForm.channelLogo || ""} 
                                  disabled={isViewer}
                                  placeholder="/logo.png or uploaded image"
                                  onChange={(e) => setHeroForm({ ...heroForm, channelLogo: e.target.value })}
                                  className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                />
                                <label 
                                  htmlFor="hero-channel-logo-upload"
                                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl cursor-pointer text-xs flex items-center gap-1.5 border border-emerald-500/30 shrink-0 whitespace-nowrap"
                                >
                                  {uploadingField === "hero-channel-logo" ? "Saving..." : "Upload Logo"}
                                  <input 
                                    id="hero-channel-logo-upload"
                                    type="file" 
                                    accept="image/*" 
                                    className="hidden" 
                                    onChange={(e) => handleInlineMediaUpload(
                                      e.target.files, 
                                      (url) => setHeroForm({ ...heroForm, channelLogo: url }),
                                      "hero-channel-logo"
                                    )}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Stats inside Picture */}
                        <div className="space-y-2 pt-2 border-t border-brand-border dark:border-[#16382e]">
                          <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                            <span>Stats Inside Card Picture</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="p-3 bg-brand-card dark:bg-[#0c201a] rounded-xl border border-brand-border dark:border-[#16382e] space-y-2">
                              <span className="text-[11px] font-bold uppercase text-emerald-400 block">Metric 1 (Subscribers)</span>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Value (e.g. 10.1k)</label>
                                  <input 
                                    type="text" 
                                    value={heroForm.subscribersCount || ""} 
                                    disabled={isViewer}
                                    placeholder="10.1k"
                                    onChange={(e) => setHeroForm({ ...heroForm, subscribersCount: e.target.value })}
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Badge (e.g. Active)</label>
                                  <input 
                                    type="text" 
                                    value={heroForm.subscribersBadge || ""} 
                                    disabled={isViewer}
                                    placeholder="Active"
                                    onChange={(e) => setHeroForm({ ...heroForm, subscribersBadge: e.target.value })}
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                  />
                                </div>
                              </div>
                            </div>

                            <div className="p-3 bg-brand-card dark:bg-[#0c201a] rounded-xl border border-brand-border dark:border-[#16382e] space-y-2">
                              <span className="text-[11px] font-bold uppercase text-cyan-400 block">Metric 2 (Monthly Views)</span>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Value (e.g. 69.5k)</label>
                                  <input 
                                    type="text" 
                                    value={heroForm.monthlyViewsCount || ""} 
                                    disabled={isViewer}
                                    placeholder="69.5k"
                                    onChange={(e) => setHeroForm({ ...heroForm, monthlyViewsCount: e.target.value })}
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Badge (e.g. Growing)</label>
                                  <input 
                                    type="text" 
                                    value={heroForm.monthlyViewsBadge || ""} 
                                    disabled={isViewer}
                                    placeholder="Growing"
                                    onChange={(e) => setHeroForm({ ...heroForm, monthlyViewsBadge: e.target.value })}
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="p-3.5 bg-brand-card dark:bg-[#0c201a] rounded-xl border border-brand-border dark:border-[#16382e] space-y-2.5">
                            <span className="text-[11px] font-bold uppercase text-emerald-400 block">Metric 3 (Viewer Retention Gauge &amp; Subtext)</span>
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
                              <div>
                                <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Gauge % (e.g. 27%)</label>
                                <input 
                                  type="text" 
                                  value={heroForm.retentionPercent || ""} 
                                  disabled={isViewer}
                                  placeholder="27%"
                                  onChange={(e) => setHeroForm({ ...heroForm, retentionPercent: e.target.value })}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Gauge Title</label>
                                <input 
                                  type="text" 
                                  value={heroForm.retentionLabel || ""} 
                                  disabled={isViewer}
                                  placeholder="Avg. Viewer Retention"
                                  onChange={(e) => setHeroForm({ ...heroForm, retentionLabel: e.target.value })}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Bottom Left Subtext</label>
                                <input 
                                  type="text" 
                                  value={heroForm.retentionLeftText || ""} 
                                  disabled={isViewer}
                                  placeholder="Top Tier Engagement"
                                  onChange={(e) => setHeroForm({ ...heroForm, retentionLeftText: e.target.value })}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Bottom Right Subtext</label>
                                <input 
                                  type="text" 
                                  value={heroForm.retentionRightText || ""} 
                                  disabled={isViewer}
                                  placeholder="Targeted Tech Audience"
                                  onChange={(e) => setHeroForm({ ...heroForm, retentionRightText: e.target.value })}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Hero Section Copy */}
                        <div className="space-y-2 pt-2 border-t border-brand-border dark:border-[#16382e]">
                          <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider flex items-center gap-1.5">
                            <span>Hero Copy &amp; Headline</span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                Top Badge Text
                              </label>
                              <input 
                                type="text" 
                                value={heroForm.badgeText || ""} 
                                disabled={isViewer}
                                placeholder="Open for Q3 Sponsorships"
                                onChange={(e) => setHeroForm({ ...heroForm, badgeText: e.target.value })}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                Main Headline
                              </label>
                              <input 
                                type="text" 
                                value={heroForm.headline || ""} 
                                disabled={isViewer}
                                placeholder="Actionable AI Workflows"
                                onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                Headline Highlight
                              </label>
                              <input 
                                type="text" 
                                value={heroForm.headlineHighlight || ""} 
                                disabled={isViewer}
                                placeholder="For Everyone"
                                onChange={(e) => setHeroForm({ ...heroForm, headlineHighlight: e.target.value })}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                              Hero Subtitle Description
                            </label>
                            <textarea 
                              rows={2}
                              value={heroForm.subheadline || ""} 
                              disabled={isViewer}
                              placeholder="Artificial Quotient turns AI software into step-by-step workflow tutorials..."
                              onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                Primary CTA Button Text &amp; URL
                              </label>
                              <div className="grid grid-cols-2 gap-2">
                                <input 
                                  type="text" 
                                  value={heroForm.sponsorButtonText || ""} 
                                  disabled={isViewer}
                                  placeholder="Sponsor the Channel"
                                  onChange={(e) => setHeroForm({ ...heroForm, sponsorButtonText: e.target.value })}
                                  className="border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                />
                                <input 
                                  type="text" 
                                  value={heroForm.sponsorButtonUrl || ""} 
                                  disabled={isViewer}
                                  placeholder="https://forms.gle/..."
                                  onChange={(e) => setHeroForm({ ...heroForm, sponsorButtonUrl: e.target.value })}
                                  className="border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                Secondary CTA Button Text
                              </label>
                              <input 
                                type="text" 
                                value={heroForm.caseStudiesButtonText || ""} 
                                disabled={isViewer}
                                placeholder="View Case Studies"
                                onChange={(e) => setHeroForm({ ...heroForm, caseStudiesButtonText: e.target.value })}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-4 border-t border-brand-border dark:border-[#16382e]">
                        <button
                          type="button"
                          onClick={handleSaveAll}
                          disabled={isViewer}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save className="w-4 h-4" /> Save Hero Configuration
                        </button>
                      </div>
                    </form>
                  )}

                  {/* TAB 1: STATS & PRICING */}
                  {activeTab === "stats" && (
                    <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                      {/* SECTION 1: Channel Performance Metrics */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 pb-2.5 border-b border-brand-border dark:border-[#16382e]">
                          <BarChart3 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                          <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">
                            Audience Snapshot Stats &amp; YouTube Analytics
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Subscribers</label>
                            <input 
                              type="text" 
                              value={statsForm.subscribers} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, subscribers: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 disabled:opacity-50" 
                            />
                            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Subscribers Subtext</label>
                            <input 
                              type="text" 
                              value={statsForm.subscribersSub} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, subscribersSub: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Total View Count</label>
                            <input 
                              type="text" 
                              value={statsForm.monthlyViews} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, monthlyViews: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 disabled:opacity-50" 
                            />
                            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">View Count Subtext</label>
                            <input 
                              type="text" 
                              value={statsForm.monthlyViewsSub} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, monthlyViewsSub: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">New Subs (30D)</label>
                            <input 
                              type="text" 
                              value={statsForm.newSubs} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, newSubs: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 disabled:opacity-50" 
                            />
                            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">New Subs Subtext</label>
                            <input 
                              type="text" 
                              value={statsForm.newSubsSub} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, newSubsSub: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Videos Published</label>
                            <input 
                              type="text" 
                              value={statsForm.videosCount} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, videosCount: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2 disabled:opacity-50" 
                            />
                            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Videos Subtext</label>
                            <input 
                              type="text" 
                              value={statsForm.videosCountSub} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, videosCountSub: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Unique Viewers</label>
                            <input 
                              type="text" 
                              value={statsForm.uniqueViewers} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, uniqueViewers: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Watch Time (hours)</label>
                            <input 
                              type="text" 
                              value={statsForm.watchTimeHours} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, watchTimeHours: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Avg. View Duration</label>
                            <input 
                              type="text" 
                              value={statsForm.avgViewDuration} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, avgViewDuration: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Avg. Percentage Viewed</label>
                            <input 
                              type="text" 
                              value={statsForm.avgPercentageViewed} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, avgPercentageViewed: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Returning Viewers</label>
                            <input 
                              type="text" 
                              value={statsForm.returningViewers} 
                              disabled={isViewer}
                              onChange={(e) => setStatsForm({ ...statsForm, returningViewers: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                        </div>
                      </div>

                      {/* SECTION 2: Sponsorship Rates */}
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center gap-2 pb-2.5 border-b border-brand-border dark:border-[#16382e]">
                          <DollarSign className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                          <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">
                            Sponsorship Rates
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Dedicated Video ($)</label>
                            <input 
                              type="text" 
                              value={ratesForm.dedicatedRate} 
                              disabled={isViewer}
                              onChange={(e) => setRatesForm({ ...ratesForm, dedicatedRate: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Integration ($)</label>
                            <input 
                              type="text" 
                              value={ratesForm.integrationRate} 
                              disabled={isViewer}
                              onChange={(e) => setRatesForm({ ...ratesForm, integrationRate: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                            />
                          </div>
                        </div>
                      </div>

                      {/* SECTION 3: Geography Top Countries */}
                      {/* SECTION 3: Geography Top Countries */}
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between pb-2.5 border-b border-brand-border dark:border-[#16382e]">
                          <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                            <Globe className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Geography Top Countries
                          </h3>
                          <button
                            type="button"
                            disabled={isViewer}
                            onClick={() => setGeoForm([...geoForm, { id: `geo-${Date.now()}`, name: "", percent: "" }])}
                            className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 border border-emerald-500/30 disabled:opacity-50 transition-colors shadow-sm cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Country
                          </button>
                        </div>

                        <datalist id="countries-autocomplete-list">
                          {availableCountries.map((c) => (
                            <option key={c.code} value={c.name} />
                          ))}
                        </datalist>

                        <div className="space-y-2.5">
                          {geoForm.map((country, idx) => (
                            <div key={country.id || idx} className="flex items-center gap-2">
                              <div className="w-9 h-9 rounded-xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] flex items-center justify-center shrink-0">
                                <CountryFlag name={country.name} />
                              </div>
                              <input 
                                type="text" 
                                list="countries-autocomplete-list"
                                placeholder="Country Name (e.g. United States, India)"
                                value={country.name} 
                                disabled={isViewer}
                                onChange={(e) => {
                                  const next = [...geoForm];
                                  next[idx] = { ...next[idx], name: e.target.value };
                                  setGeoForm(next);
                                }}
                                className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                              />
                              <input 
                                type="text" 
                                placeholder="Share (e.g. 21.8%)"
                                value={country.percent} 
                                disabled={isViewer}
                                onChange={(e) => {
                                  const next = [...geoForm];
                                  next[idx] = { ...next[idx], percent: e.target.value };
                                  setGeoForm(next);
                                }}
                                className="w-28 sm:w-32 border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 shrink-0" 
                              />
                              <button
                                type="button"
                                disabled={isViewer}
                                onClick={() => setGeoForm(geoForm.filter((_, i) => i !== idx))}
                                className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors disabled:opacity-50 shrink-0 cursor-pointer"
                                title="Delete Country"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                          {geoForm.length === 0 && (
                            <div className="text-center py-4 text-xs text-brand-muted dark:text-emerald-200/60 font-medium">
                              No countries added yet. Click &quot;Add Country&quot; above to add one.
                            </div>
                          )}
                        </div>
                      </div>

                      {/* SECTION 4 & 5: Audience & Shopping Interests Stacked for Width */}
                      <div className="space-y-6 pt-2">
                        {/* Audience Interests */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-2.5 border-b border-brand-border dark:border-[#16382e]">
                            <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                              <Users className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Audience Interests
                            </h3>
                            <button
                              type="button"
                              disabled={isViewer}
                              onClick={() => setAudienceInterests([...audienceInterests, { name: "", level: "Medium" }])}
                              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 border border-emerald-500/30 disabled:opacity-50"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add
                            </button>
                          </div>
                          <div className="space-y-2.5">
                            {audienceInterests.map((interest, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Interest Name"
                                  value={interest.name} 
                                  disabled={isViewer}
                                  onChange={(e) => {
                                    const next = [...audienceInterests];
                                    next[idx].name = e.target.value;
                                    setAudienceInterests(next);
                                  }}
                                  className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                />
                                <select
                                  value={interest.level}
                                  disabled={isViewer}
                                  onChange={(e) => {
                                    const next = [...audienceInterests];
                                    next[idx].level = e.target.value;
                                    setAudienceInterests(next);
                                  }}
                                  className="w-28 sm:w-32 border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-2.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 shrink-0"
                                >
                                  <option value="Low">Low</option>
                                  <option value="Medium">Medium</option>
                                  <option value="High">High</option>
                                  <option value="Very High">Very High</option>
                                </select>
                                <button
                                  type="button"
                                  disabled={isViewer}
                                  onClick={() => setAudienceInterests(audienceInterests.filter((_, i) => i !== idx))}
                                  className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors disabled:opacity-50 shrink-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shopping Interests */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between pb-2.5 border-b border-brand-border dark:border-[#16382e]">
                            <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                              <ShoppingBag className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> Shopping Interests
                            </h3>
                            <button
                              type="button"
                              disabled={isViewer}
                              onClick={() => setShoppingInterests([...shoppingInterests, { name: "", level: "High" }])}
                              className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-1 rounded-lg text-xs flex items-center gap-1 border border-emerald-500/30 disabled:opacity-50"
                            >
                              <Plus className="w-3.5 h-3.5" /> Add
                            </button>
                          </div>
                          <div className="space-y-2.5">
                            {shoppingInterests.map((interest, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <input 
                                  type="text" 
                                  placeholder="Category Name"
                                  value={interest.name} 
                                  disabled={isViewer}
                                  onChange={(e) => {
                                    const next = [...shoppingInterests];
                                    next[idx].name = e.target.value;
                                    setShoppingInterests(next);
                                  }}
                                  className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                                />
                                <select
                                  value={interest.level}
                                  disabled={isViewer}
                                  onChange={(e) => {
                                    const next = [...shoppingInterests];
                                    next[idx].level = e.target.value;
                                    setShoppingInterests(next);
                                  }}
                                  className="w-28 sm:w-32 border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-2.5 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 shrink-0"
                                >
                                  <option value="Low">Low</option>
                                  <option value="Medium">Medium</option>
                                  <option value="High">High</option>
                                  <option value="Very High">Very High</option>
                                </select>
                                <button
                                  type="button"
                                  disabled={isViewer}
                                  onClick={() => setShoppingInterests(shoppingInterests.filter((_, i) => i !== idx))}
                                  className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg transition-colors disabled:opacity-50 shrink-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-5 border-t border-brand-border dark:border-[#16382e]">
                        <button 
                          type="button" 
                          onClick={handleSaveAll} 
                          disabled={isViewer}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save className="w-4 h-4" /> Save &amp; Publish Stats
                        </button>
                      </div>
                    </form>
                  )}

                  {/* TAB 2: SPONSOR CASE STUDIES */}
                  {activeTab === "case-studies" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">Partner Case Studies</h3>
                        <button
                          type="button"
                          disabled={isViewer}
                          onClick={() => setSponsorResults([...sponsorResults, {
                            id: Date.now().toString(),
                            partnerName: "New Sponsor",
                            campaignType: "Integration",
                            quote: "Awesome results!",
                            stat1Label: "Conversions",
                            stat1Value: "200+",
                            stat2Label: "ROI",
                            stat2Value: "2.5x"
                          }])}
                          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" /> Add Case Study
                        </button>
                      </div>

                      <div className="space-y-5">
                        {sponsorResults.map((item, idx) => (
                          <div key={item.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
                            <button
                              type="button"
                              disabled={isViewer}
                              onClick={() => setSponsorResults(sponsorResults.filter(s => s.id !== item.id))}
                              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Delete case study"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Partner Brand Name</label>
                                <input 
                                  type="text" 
                                  value={item.partnerName} 
                                  onChange={(e) => {
                                    const next = [...sponsorResults];
                                    next[idx].partnerName = e.target.value;
                                    setSponsorResults(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Campaign Type</label>
                                <input 
                                  type="text" 
                                  value={item.campaignType} 
                                  onChange={(e) => {
                                    const next = [...sponsorResults];
                                    next[idx].campaignType = e.target.value;
                                    setSponsorResults(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                            </div>

                            <div>
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80">
                                  Testimonial Quote
                                </label>
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 uppercase">
                                    Quote Font:
                                  </span>
                                  <select
                                    value={item.quoteFont || "Caveat"}
                                    onChange={(e) => {
                                      const next = [...sponsorResults];
                                      next[idx] = { ...next[idx], quoteFont: e.target.value };
                                      setSponsorResults(next);
                                      loadGoogleFont(e.target.value);
                                    }}
                                    className="border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
                                  >
                                    {QUOTE_FONT_OPTIONS.map((opt) => (
                                      <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <textarea 
                                rows={2}
                                value={item.quote} 
                                onChange={(e) => {
                                  const next = [...sponsorResults];
                                  next[idx].quote = e.target.value;
                                  setSponsorResults(next);
                                }}
                                style={{ fontFamily: `'${item.quoteFont || "Caveat"}', cursive, sans-serif` }}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Primary Metric Label (e.g. Videos Created, Link Clicks)</label>
                                <input 
                                  type="text" 
                                  value={item.stat1Label} 
                                  onChange={(e) => {
                                    const next = [...sponsorResults];
                                    next[idx].stat1Label = e.target.value;
                                    setSponsorResults(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Primary Metric Value (e.g. 2 Videos, 1,200+)</label>
                                <input 
                                  type="text" 
                                  value={item.stat1Value} 
                                  onChange={(e) => {
                                    const next = [...sponsorResults];
                                    next[idx].stat1Value = e.target.value;
                                    setSponsorResults(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>
                            </div>

                            <div className="pt-2 border-t border-brand-border dark:border-[#16382e] space-y-3">
                              <div className="text-xs font-bold text-emerald-500 uppercase tracking-wider">
                                Extended Case Study Details (Modal View)
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                                <div>
                                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                                    Brand Logo Image URL
                                  </label>
                                  <div className="flex items-center gap-2">
                                    {item.logoUrl ? (
                                      <div className="w-8 h-8 rounded-lg bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                                        <img src={item.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                                      </div>
                                    ) : null}
                                    <input 
                                      type="text" 
                                      placeholder="/logo/revid.png or https://..."
                                      value={item.logoUrl || ""} 
                                      onChange={(e) => {
                                        const next = [...sponsorResults];
                                        next[idx] = { ...next[idx], logoUrl: e.target.value };
                                        setSponsorResults(next);
                                      }}
                                      className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm" 
                                    />
                                    <label 
                                      htmlFor={`sponsor-logo-input-${item.id}`}
                                      className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl cursor-pointer text-xs flex items-center gap-1.5 border border-emerald-500/30 shrink-0 whitespace-nowrap shadow-sm"
                                    >
                                      {uploadingField === `sponsor-logo-${item.id}` ? "Saving..." : "Upload Logo"}
                                      <input 
                                        id={`sponsor-logo-input-${item.id}`}
                                        type="file" 
                                        accept="image/*" 
                                        className="hidden" 
                                        onChange={(e) => handleInlineMediaUpload(
                                          e.target.files, 
                                          (url) => {
                                            const next = [...sponsorResults];
                                            next[idx] = { ...next[idx], logoUrl: url };
                                            setSponsorResults(next);
                                          },
                                          `sponsor-logo-${item.id}`
                                        )}
                                      />
                                    </label>
                                  </div>
                                </div>

                                <div>
                                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                                    Partner Official Website URL
                                  </label>
                                  <input 
                                    type="text" 
                                    placeholder="https://www.revid.ai/"
                                    value={item.websiteUrl || ""} 
                                    onChange={(e) => {
                                      const next = [...sponsorResults];
                                      next[idx] = { ...next[idx], websiteUrl: e.target.value };
                                      setSponsorResults(next);
                                    }}
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm" 
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                                    Featured YouTube Video URL
                                  </label>
                                  <input 
                                    type="text" 
                                    placeholder="https://youtube.com/watch?v=..."
                                    value={item.ytUrl || ""} 
                                    onChange={(e) => {
                                      const next = [...sponsorResults];
                                      next[idx] = { ...next[idx], ytUrl: e.target.value };
                                      setSponsorResults(next);
                                    }}
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm" 
                                  />
                                </div>

                                <div>
                                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                                    Publish Date / Period
                                  </label>
                                  <input 
                                    type="text" 
                                    placeholder="e.g. Q2 2026"
                                    value={item.publishDate || ""} 
                                    onChange={(e) => {
                                      const next = [...sponsorResults];
                                      next[idx] = { ...next[idx], publishDate: e.target.value };
                                      setSponsorResults(next);
                                    }}
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm" 
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">
                                  Campaign Overview &amp; Narrative
                                </label>
                                <textarea 
                                  rows={2}
                                  placeholder="Full campaign narrative and target audience fit..."
                                  value={item.description || ""} 
                                  onChange={(e) => {
                                    const next = [...sponsorResults];
                                    next[idx] = { ...next[idx], description: e.target.value };
                                    setSponsorResults(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>

                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">
                                  Deliverables Provided
                                </label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. 10-min YouTube video, workflow JSON download, newsletter link"
                                  value={item.deliverables || ""} 
                                  onChange={(e) => {
                                    const next = [...sponsorResults];
                                    next[idx] = { ...next[idx], deliverables: e.target.value };
                                    setSponsorResults(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end pt-5 border-t border-brand-border dark:border-[#16382e]">
                        <button 
                          type="button" 
                          onClick={handleSaveAll} 
                          disabled={isViewer}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save className="w-4 h-4" /> Save Sponsor Results
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: WHAT PERFORMS */}
                  {activeTab === "what-performs" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">What Performs Cards</h3>
                        <button
                          type="button"
                          onClick={() => setWhatPerforms([...whatPerforms, {
                            id: Date.now().toString(),
                            title: "New Highlight",
                            views: "10.0k",
                            clicks: "800+",
                            type: "Integration",
                            thumb: "🚀",
                            highlight: "High CTR",
                            ytUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                            thumbnail: ""
                          }])}
                          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-500/30"
                        >
                          <Plus className="w-4 h-4" /> Add Perform Card
                        </button>
                      </div>

                      <div className="space-y-5">
                        {whatPerforms.map((item, idx) => (
                          <div key={item.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
                            <button
                              type="button"
                              onClick={() => setWhatPerforms(whatPerforms.filter(w => w.id !== item.id))}
                              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors"
                              title="Delete item"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Title / Tool Name</label>
                                <input 
                                  type="text" 
                                  value={item.title} 
                                  onChange={(e) => {
                                    const next = [...whatPerforms];
                                    next[idx].title = e.target.value;
                                    setWhatPerforms(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Sponsorship Type</label>
                                <input 
                                  type="text" 
                                  value={item.type} 
                                  onChange={(e) => {
                                    const next = [...whatPerforms];
                                    next[idx].type = e.target.value;
                                    setWhatPerforms(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">YouTube Video Link</label>
                                <input 
                                  type="text" 
                                  placeholder="https://youtube.com/watch?v=..."
                                  value={item.ytUrl || ""} 
                                  onChange={(e) => {
                                    const next = [...whatPerforms];
                                    next[idx] = { ...next[idx], ytUrl: e.target.value };
                                    setWhatPerforms(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Thumbnail Media</label>
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="text" 
                                    placeholder="/uploads/file.png or YouTube thumb..."
                                    value={item.thumbnail || ""} 
                                    onChange={(e) => {
                                      const next = [...whatPerforms];
                                      next[idx] = { ...next[idx], thumbnail: e.target.value };
                                      setWhatPerforms(next);
                                    }}
                                    className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs sm:text-sm" 
                                  />
                                  <label 
                                    htmlFor={`perform-thumb-input-${item.id}`}
                                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl cursor-pointer text-xs flex items-center gap-1.5 border border-emerald-500/30 shrink-0 whitespace-nowrap"
                                  >
                                    {uploadingField === `perform-thumb-${item.id}` ? "Saving..." : "Upload"}
                                    <input 
                                      id={`perform-thumb-input-${item.id}`}
                                      type="file" 
                                      accept="image/*" 
                                      className="hidden" 
                                      onChange={(e) => handleInlineMediaUpload(
                                        e.target.files, 
                                        (url) => {
                                          const next = [...whatPerforms];
                                          next[idx] = { ...next[idx], thumbnail: url };
                                          setWhatPerforms(next);
                                        },
                                        `perform-thumb-${item.id}`
                                      )}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Views Count</label>
                                <input 
                                  type="text" 
                                  value={item.views} 
                                  onChange={(e) => {
                                    const next = [...whatPerforms];
                                    next[idx].views = e.target.value;
                                    setWhatPerforms(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Clicks Count</label>
                                <input 
                                  type="text" 
                                  value={item.clicks} 
                                  onChange={(e) => {
                                    const next = [...whatPerforms];
                                    next[idx].clicks = e.target.value;
                                    setWhatPerforms(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Emoji Fallback</label>
                                <input 
                                  type="text" 
                                  value={item.thumb || "🎬"} 
                                  onChange={(e) => {
                                    const next = [...whatPerforms];
                                    next[idx].thumb = e.target.value;
                                    setWhatPerforms(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end pt-5 border-t border-brand-border dark:border-[#16382e]">
                        <button 
                          type="button" 
                          onClick={handleSaveAll} 
                          disabled={isViewer}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save className="w-4 h-4" /> Save What Performs
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: AI TOOL VAULT */}
                  {activeTab === "tools" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">AI Tool Vault Directory</h3>
                        <button
                          type="button"
                          onClick={() => setToolsList([...toolsList, {
                            id: Date.now().toString(),
                            name: "New AI Tool",
                            category: "Automation",
                            discount: "10% OFF",
                            desc: "Tool description...",
                            tryUrl: "https://example.com",
                            tutorialUrl: "",
                            logo: ""
                          }])}
                          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-500/30"
                        >
                          <Plus className="w-4 h-4" /> Add Tool Entry
                        </button>
                      </div>

                      <div className="space-y-5">
                        {toolsList.map((tool, idx) => (
                          <div key={tool.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
                            <button
                              type="button"
                              onClick={() => setToolsList(toolsList.filter(t => t.id !== tool.id))}
                              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors"
                              title="Delete tool entry"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pr-10">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Tool Name</label>
                                <input 
                                  type="text" 
                                  value={tool.name} 
                                  onChange={(e) => {
                                    const next = [...toolsList];
                                    next[idx].name = e.target.value;
                                    setToolsList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Category</label>
                                <input 
                                  type="text" 
                                  value={tool.category} 
                                  onChange={(e) => {
                                    const next = [...toolsList];
                                    next[idx].category = e.target.value;
                                    setToolsList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Discount Tag</label>
                                <input 
                                  type="text" 
                                  value={tool.discount} 
                                  onChange={(e) => {
                                    const next = [...toolsList];
                                    next[idx].discount = e.target.value;
                                    setToolsList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Description</label>
                              <textarea 
                                rows={2}
                                value={tool.desc} 
                                onChange={(e) => {
                                  const next = [...toolsList];
                                  next[idx].desc = e.target.value;
                                  setToolsList(next);
                                }}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Try Link URL</label>
                                <input 
                                  type="text" 
                                  value={tool.tryUrl} 
                                  onChange={(e) => {
                                    const next = [...toolsList];
                                    next[idx].tryUrl = e.target.value;
                                    setToolsList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Tutorial URL</label>
                                <input 
                                  type="text" 
                                  value={tool.tutorialUrl} 
                                  onChange={(e) => {
                                    const next = [...toolsList];
                                    next[idx].tutorialUrl = e.target.value;
                                    setToolsList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end pt-5 border-t border-brand-border dark:border-[#16382e]">
                        <button 
                          type="button" 
                          onClick={handleSaveAll} 
                          disabled={isViewer}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save className="w-4 h-4" /> Save Tool Directory
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: BRANDS & PARTNERS */}
                  {activeTab === "brands" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">Brands &amp; Partner Directory</h3>
                        <button
                          type="button"
                          disabled={isViewer}
                          onClick={() => setBrandsList([...brandsList, {
                            id: Date.now().toString(),
                            name: "New Brand",
                            category: "Sponsor",
                            tagline: "Brand tagline goes here.",
                            logoText: "🚀 New Brand",
                            ytUrl: "",
                            logoUrl: "",
                          }])}
                          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="w-4 h-4" /> Add Brand
                        </button>
                      </div>

                      <div className="space-y-5">
                        {brandsList.map((brand, idx) => (
                          <div key={brand.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
                            <button
                              type="button"
                              onClick={() => setBrandsList(brandsList.filter(b => b.id !== brand.id))}
                              disabled={isViewer}
                              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                              title="Delete brand"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Brand Name</label>
                                <input
                                  type="text"
                                  disabled={isViewer}
                                  value={brand.name}
                                  onChange={(e) => {
                                    const next = [...brandsList];
                                    next[idx] = { ...next[idx], name: e.target.value };
                                    setBrandsList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Category</label>
                                <input
                                  type="text"
                                  disabled={isViewer}
                                  value={brand.category}
                                  onChange={(e) => {
                                    const next = [...brandsList];
                                    next[idx] = { ...next[idx], category: e.target.value };
                                    setBrandsList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Tagline / Short Description</label>
                              <input
                                type="text"
                                disabled={isViewer}
                                value={brand.tagline}
                                onChange={(e) => {
                                  const next = [...brandsList];
                                  next[idx] = { ...next[idx], tagline: e.target.value };
                                  setBrandsList(next);
                                }}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Logo Text (Emoji + Name)</label>
                                <input
                                  type="text"
                                  disabled={isViewer}
                                  placeholder="e.g. 🎬 Revid.AI"
                                  value={brand.logoText}
                                  onChange={(e) => {
                                    const next = [...brandsList];
                                    next[idx] = { ...next[idx], logoText: e.target.value };
                                    setBrandsList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">YouTube / Website URL</label>
                                <input
                                  type="text"
                                  disabled={isViewer}
                                  placeholder="https://youtu.be/..."
                                  value={brand.ytUrl || ""}
                                  onChange={(e) => {
                                    const next = [...brandsList];
                                    next[idx] = { ...next[idx], ytUrl: e.target.value };
                                    setBrandsList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Logo Image URL</label>
                              <div className="flex items-center gap-2">
                                {brand.logoUrl ? (
                                  <div className="w-8 h-8 rounded-lg bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] p-1 shrink-0 flex items-center justify-center overflow-hidden">
                                    <img src={brand.logoUrl} alt="Logo" className="w-full h-full object-contain" />
                                  </div>
                                ) : null}
                                <input
                                  type="text"
                                  disabled={isViewer}
                                  placeholder="/logo/revid.png or https://..."
                                  value={brand.logoUrl || ""}
                                  onChange={(e) => {
                                    const next = [...brandsList];
                                    next[idx] = { ...next[idx], logoUrl: e.target.value };
                                    setBrandsList(next);
                                  }}
                                  className="flex-1 min-w-0 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                                <label 
                                  htmlFor={`brand-logo-input-${brand.id}`}
                                  className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl cursor-pointer text-xs flex items-center gap-1.5 border border-emerald-500/30 shrink-0 whitespace-nowrap shadow-sm"
                                >
                                  {uploadingField === `brand-logo-${brand.id}` ? "Saving..." : "Upload Logo"}
                                  <input 
                                    id={`brand-logo-input-${brand.id}`}
                                    type="file" 
                                    accept="image/*" 
                                    disabled={isViewer}
                                    className="hidden" 
                                    onChange={(e) => handleInlineMediaUpload(
                                      e.target.files, 
                                      (url) => {
                                        const next = [...brandsList];
                                        next[idx] = { ...next[idx], logoUrl: url };
                                        setBrandsList(next);
                                      },
                                      `brand-logo-${brand.id}`
                                    )}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end pt-5 border-t border-brand-border dark:border-[#16382e]">
                        <button
                          type="button"
                          onClick={handleSaveAll}
                          disabled={isViewer}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save className="w-4 h-4" /> Save Brands
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB: ADMIN USERS & PERMISSIONS */}
                  {activeTab === "users" && (
                    <div className="space-y-6 pt-1">
                      <div className="flex justify-between items-start sm:items-center flex-wrap gap-3">
                        <div>
                          <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                            <Users className="w-4 h-4 text-emerald-500" /> Active System Administrators
                          </h3>
                          <p className="text-xs text-brand-muted dark:text-emerald-200/70 mt-0.5">
                            Manage system admin credentials, assign access permissions, and copy security recovery PINs.
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            const newAdmin: AdminUser = {
                              id: `admin-${Date.now()}`,
                              name: "New Administrator",
                              email: `admin${adminUsers.length + 1}@artificialquotient.com`,
                              password: "",
                              role: "Editor",
                              permissions: ["hero", "case-studies", "what-performs", "tools"],
                              recoveryKey: `AQ-SEC-${Math.floor(1000 + Math.random() * 9000)}`,
                              status: "Active",
                              lastLogin: new Date().toISOString(),
                            };
                            setAdminUsers([...adminUsers, newAdmin]);
                          }}
                          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-500/30 shadow-sm hover:bg-emerald-500/20 transition-all shrink-0"
                        >
                          <Plus className="w-4 h-4" /> Add Admin User
                        </button>
                      </div>

                      <div className="space-y-4">
                        {adminUsers.map((user, idx) => (
                          <div key={user.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
                            <button
                              type="button"
                              onClick={() => setAdminUsers(adminUsers.filter(u => u.id !== user.id))}
                              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors"
                              title="Remove Admin User"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            {/* Row 1: Name & Email */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                                  Admin Name
                                </label>
                                <input 
                                  type="text" 
                                  value={user.name} 
                                  onChange={(e) => {
                                    const next = [...adminUsers];
                                    next[idx].name = e.target.value;
                                    setAdminUsers(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-semibold" 
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                                  Email Address
                                </label>
                                <input 
                                  type="email" 
                                  value={user.email} 
                                  onChange={(e) => {
                                    const next = [...adminUsers];
                                    next[idx].email = e.target.value;
                                    setAdminUsers(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-semibold" 
                                />
                              </div>
                            </div>

                            {/* Row 2: Password & Account Status */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                                  Password
                                </label>
                                <div className="relative flex items-center">
                                  <input 
                                    type={showPasswordMap[user.id] ? "text" : "password"} 
                                    value={user.password} 
                                    placeholder="Enter custom password..."
                                    onChange={(e) => {
                                      const next = [...adminUsers];
                                      next[idx].password = e.target.value;
                                      setAdminUsers(next);
                                    }}
                                    disabled={isViewer}
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl pl-3.5 pr-10 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed" 
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPasswordMap(prev => ({ ...prev, [user.id]: !prev[user.id] }))}
                                    className="absolute right-3 text-brand-muted dark:text-emerald-200/60 hover:text-brand-text dark:hover:text-white transition-colors"
                                    title={showPasswordMap[user.id] ? "Hide password" : "Show password"}
                                  >
                                    {showPasswordMap[user.id] ? (
                                      <EyeOff className="w-4 h-4 text-emerald-400" />
                                    ) : (
                                      <Eye className="w-4 h-4" />
                                    )}
                                  </button>
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                                  Account Status
                                </label>
                                <select
                                  value={user.status}
                                  onChange={(e) => {
                                    const next = [...adminUsers];
                                    next[idx].status = e.target.value as "Active" | "Inactive";
                                    setAdminUsers(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-semibold cursor-pointer"
                                >
                                  <option value="Active">Active</option>
                                  <option value="Inactive">Inactive (Disabled)</option>
                                </select>
                              </div>
                            </div>

                            {/* Row 3: Role & Recovery PIN */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                                  Role &amp; Permissions
                                </label>
                                <select
                                  value={user.role}
                                  onChange={(e) => {
                                    const next = [...adminUsers];
                                    const newRole = e.target.value as "Super Admin" | "Editor" | "Viewer";
                                    next[idx].role = newRole;
                                    if (newRole === "Super Admin") {
                                      next[idx].permissions = ["hero", "stats", "case-studies", "what-performs", "tools", "backup", "users"];
                                    } else if (newRole === "Editor") {
                                      next[idx].permissions = ["hero", "case-studies", "what-performs", "tools"];
                                    } else {
                                      next[idx].permissions = ["hero", "stats"];
                                    }
                                    setAdminUsers(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-semibold cursor-pointer truncate"
                                >
                                  <option value="Super Admin">Super Admin (Full Access)</option>
                                  <option value="Editor">Editor (Content Management)</option>
                                  <option value="Viewer">Viewer (Read-Only Preview)</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                                  Password Recovery Key
                                </label>
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="text" 
                                    value={user.recoveryKey} 
                                    onChange={(e) => {
                                      const next = [...adminUsers];
                                      next[idx].recoveryKey = e.target.value;
                                      setAdminUsers(next);
                                    }}
                                    disabled={isViewer}
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(user.recoveryKey);
                                      alert(`Recovery Key copied: ${user.recoveryKey}`);
                                    }}
                                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl text-xs border border-emerald-500/30 shrink-0"
                                  >
                                    Copy
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-end pt-5 border-t border-brand-border dark:border-[#16382e]">
                        <button 
                          type="button" 
                          onClick={handleSaveUsers} 
                          disabled={isViewer}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Save className="w-4 h-4" /> Save &amp; Publish Admin Users
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: BACKUP & SYSTEM CONTROL */}
                  {activeTab === "backup" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-heading font-bold text-base text-brand-text dark:text-white mb-1">
                          Data Backup &amp; Disaster Recovery
                        </h3>
                        <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70">
                          Export complete system backups or restore your website data from a previously saved JSON snapshot.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="p-6 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] flex flex-col justify-between space-y-5">
                          <div>
                            <div className="flex items-center gap-2.5 text-emerald-500 font-bold text-base mb-1.5">
                              <UploadCloud className="w-5 h-5 rotate-180" /> Export JSON Backup
                            </div>
                            <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed">
                              Download a complete offline copy of your channel stats, pricing, tools, and case studies.
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={handleDownloadBackup}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                          >
                            <UploadCloud className="w-4 h-4 rotate-180" /> Download Backup File
                          </button>
                        </div>

                        <div className="p-6 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] flex flex-col justify-between space-y-5">
                          <div>
                            <div className="flex items-center gap-2.5 text-emerald-500 font-bold text-base mb-1.5">
                              <UploadCloud className="w-5 h-5" /> Restore JSON Backup
                            </div>
                            <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed">
                              Upload a previously exported JSON backup file to instantly restore your entire website configuration.
                            </p>
                          </div>
                          <label className={`w-full bg-brand-card dark:bg-[#102922] border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 font-bold text-xs sm:text-sm py-3 rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 ${isViewer ? "opacity-50 cursor-not-allowed pointer-events-none" : "hover:bg-emerald-500/20 cursor-pointer"}`}>
                            <UploadCloud className="w-4 h-4" /> Select Backup File
                            <input type="file" accept=".json" disabled={isViewer} onChange={handleRestoreBackup} className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* LIVE PREVIEW CONTAINER */}
              {(layoutMode === "split" || layoutMode === "preview") && (
                <div className={`${layoutMode === "split" ? "xl:col-span-5" : "w-full"} bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] backdrop-blur-xl rounded-2xl p-4 sm:p-7 shadow-md transition-colors duration-200`}>
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
                                  <span className="text-base font-extrabold text-white">{heroForm.subscribersCount || "10.1k"}</span>
                                  <span className="text-[9px] font-bold text-emerald-400 flex items-center">
                                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" /> {heroForm.subscribersBadge || "Active"}
                                  </span>
                                </div>
                              </div>

                              <div className="bg-[#0d221c] p-2.5 rounded-xl border border-cyan-500/20">
                                <div className="text-[10px] text-cyan-200/70 flex items-center gap-1">
                                  <Play className="w-3 h-3 text-cyan-400" /> Monthly Views
                                </div>
                                <div className="flex items-baseline gap-1 mt-0.5">
                                  <span className="text-base font-extrabold text-white">{heroForm.monthlyViewsCount || "69.5k"}</span>
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
                          <div className="text-xs font-bold text-brand-muted dark:text-emerald-200/60 uppercase">View Count</div>
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
                      <div className="text-sm font-bold text-brand-text dark:text-white mb-2">Live Case Studies Preview</div>
                      <div className="space-y-4">
                        {sponsorResults.map((item) => (
                          <div key={item.id} className="p-4 rounded-xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-3">
                            <div className="flex justify-between items-center flex-wrap gap-2">
                              <span className="font-bold text-sm text-brand-text dark:text-white truncate min-w-0">{item.partnerName}</span>
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
                        ))}
                      </div>
                    </div>
                  )}

                  {/* PREVIEW TAB 3: WHAT PERFORMS */}
                  {activeTab === "what-performs" && (
                    <div className="space-y-5">
                      <div className="text-sm font-bold text-brand-text dark:text-white mb-2">What Performs Preview</div>
                      <div className="grid grid-cols-1 gap-4">
                        {whatPerforms.map((item) => {
                          const ytId = getYoutubeId(item.ytUrl);
                          const thumbImg = item.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : null);

                          return (
                            <div key={item.id} className="p-4 rounded-xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3.5">
                                <div className="w-16 h-10 bg-zinc-800 rounded-lg overflow-hidden flex items-center justify-center text-sm shrink-0 border border-brand-border/40">
                                  {thumbImg ? (
                                    <img src={thumbImg} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <span>{item.thumb || "🎬"}</span>
                                  )}
                                </div>
                                <div>
                                  <div className="font-bold text-sm text-brand-text dark:text-white">{item.title}</div>
                                  <div className="text-xs text-brand-muted dark:text-emerald-200/70">{item.type}</div>
                                </div>
                              </div>
                              <div className="text-right text-xs font-bold shrink-0">
                                <div className="text-brand-text dark:text-white">{item.views} views</div>
                                <div className="text-emerald-500">{item.clicks} clicks</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* PREVIEW TAB 4: TOOL VAULT */}
                  {activeTab === "tools" && (
                    <div className="space-y-4">
                      <div className="text-sm font-bold text-brand-text dark:text-white mb-2">AI Tool Vault Directory</div>
                      {toolsList.map(tool => (
                        <div key={tool.id} className="bg-brand-bg dark:bg-[#061612] rounded-xl border border-brand-border dark:border-[#16382e] p-5 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-heading font-bold text-base text-brand-text dark:text-white">{tool.name}</h4>
                            {tool.discount && (
                              <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                                {tool.discount}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2 block">{tool.category}</span>
                          <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 mb-3 leading-relaxed">{tool.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* PREVIEW TAB 5: BRANDS & PARTNERS */}
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
                            <span className="font-heading font-bold text-sm text-brand-text dark:text-white truncate">{brand.logoText || brand.name}</span>
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
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
