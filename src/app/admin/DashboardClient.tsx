"use client";

import { 
  Save, BarChart, Database, FileText, LogOut, Check, ExternalLink, 
  UploadCloud, Eye, Edit3, Sparkles, Award, Plus, Trash2, ShieldCheck, Users
} from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { QUOTE_FONT_OPTIONS, loadGoogleFont } from "@/components/font-provider";

interface ToolItem {
  id: string;
  name: string;
  category: string;
  discount: string;
  desc: string;
  tryUrl: string;
  tutorialUrl: string;
  logo: string;
}

interface BlogItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  ytUrl: string;
  author: string;
  cover: string;
}

interface PerformItem {
  id: string;
  title: string;
  views: string;
  clicks: string;
  type: string;
  thumb: string;
  highlight: string;
  ytUrl?: string;
  thumbnail?: string;
}

interface SponsorItem {
  id: string;
  partnerName: string;
  campaignType: string;
  quote: string;
  quoteFont?: string;
  stat1Label: string;
  stat1Value: string;
  stat2Label: string;
  stat2Value: string;
  description?: string;
  deliverables?: string;
  ytUrl?: string;
  roiBreakdown?: string;
  publishDate?: string;
  logoUrl?: string;
}

interface AdminUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "Super Admin" | "Editor" | "Viewer";
  permissions: string[];
  recoveryKey: string;
  status: "Active" | "Inactive";
  lastLogin?: string;
}

function getYoutubeId(url?: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<"stats" | "case-studies" | "what-performs" | "tools" | "blog" | "users" | "backup">("stats");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"split" | "edit" | "preview">("split");
  const [loading, setLoading] = useState(true);
  const [dbStatus, setDbStatus] = useState<string>("Connected to MySQL: AQ-Dashboard");
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [statsForm, setStatsForm] = useState({
    subscribers: "10,100+",
    subscribersSub: "+12.4% this month",
    monthlyViews: "850,000+",
    monthlyViewsSub: "~120K monthly views",
    newSubs: "+1,200",
    newSubsSub: "High velocity growth",
    videosCount: "222",
    videosCountSub: "Active weekly cadence",
    retention: "27",
    channelBanner: "",
  });

  const [ratesForm, setRatesForm] = useState({
    dedicatedRate: "$500",
    integrationRate: "$300",
  });

  const [demoForm, setDemoForm] = useState({
    age25_34: "39.9%",
    age18_24: "28.5%",
    malePercent: "84.7%",
    femalePercent: "15.3%",
  });

  const [geoForm, setGeoForm] = useState({
    usa: "24.1%",
    india: "21.6%",
    uk: "4.6%",
    germany: "3.9%",
  });

  const [whatPerforms, setWhatPerforms] = useState<PerformItem[]>([
    {
      id: "1",
      title: "Revid.AI",
      views: "18.2k",
      clicks: "1.4k+",
      type: "Dedicated Video",
      thumb: "🎬",
      highlight: "High Conversion",
      ytUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "",
    },
    {
      id: "2",
      title: "Flashloop AI",
      views: "12.5k",
      clicks: "950+",
      type: "Integration",
      thumb: "⚡",
      highlight: "Solid ROI",
      ytUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "",
    },
    {
      id: "3",
      title: "Marky Agent",
      views: "21.1k",
      clicks: "2.1k+",
      type: "Dedicated Video",
      thumb: "🤖",
      highlight: "Viral Reach",
      ytUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      thumbnail: "",
    },
  ]);

  const [sponsorResults, setSponsorResults] = useState<SponsorItem[]>([
    {
      id: "1",
      partnerName: "Revid.AI",
      campaignType: "Dedicated Video",
      quote: "The highest converting sponsorship we've ran this quarter. Incredible audience fit.",
      stat1Label: "Signups Generated",
      stat1Value: "450+",
      stat2Label: "Est. ROI Multiplier",
      stat2Value: "3.2x",
    },
    {
      id: "2",
      partnerName: "Flashloop",
      campaignType: "Integration",
      quote: "We saw an immediate spike in traffic during the first 48 hours of upload.",
      stat1Label: "Link Clicks",
      stat1Value: "1,200+",
      stat2Label: "Cost Per Click",
      stat2Value: "$0.25",
    },
  ]);

  const [toolsList, setToolsList] = useState<ToolItem[]>([
    {
      id: "1",
      name: "Make.com",
      category: "Automation",
      discount: "20% OFF 1st Year",
      desc: "The ultimate visual automation platform for building advanced workflows without code.",
      tryUrl: "https://make.com",
      tutorialUrl: "https://youtube.com",
      logo: "",
    }
  ]);

  const [blogList, setBlogList] = useState<BlogItem[]>([
    {
      id: "1",
      title: "How to Automate Short Form Videos with Make.com & AI",
      category: "Tutorials & Workflows",
      excerpt: "Learn step-by-step how to build fully automated video generation workflows using Make.com and AI tools.",
      ytUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      author: "Artificial Quotient",
      cover: "",
    }
  ]);

  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Fetch initial site data from API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          if (data.stats) setStatsForm(data.stats);
          if (data.rates) setRatesForm(data.rates);
          if (data.demographics) setDemoForm(data.demographics);
          if (data.geographies) setGeoForm(data.geographies);
          if (data.whatPerforms) setWhatPerforms(data.whatPerforms);
          if (data.sponsorResults) {
            setSponsorResults(data.sponsorResults);
            data.sponsorResults.forEach((s: { quoteFont?: string }) => {
              if (s.quoteFont) loadGoogleFont(s.quoteFont);
            });
          }
          if (data.tools && data.tools.length > 0) setToolsList(data.tools);
          if (data.blog && data.blog.length > 0) setBlogList(data.blog);
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
    const payload = {
      stats: statsForm,
      rates: ratesForm,
      demographics: demoForm,
      geographies: geoForm,
      whatPerforms,
      sponsorResults,
      tools: toolsList,
      blog: blogList,
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
      stats: statsForm,
      rates: ratesForm,
      demographics: demoForm,
      geographies: geoForm,
      whatPerforms,
      sponsorResults,
      tools: toolsList,
      blog: blogList,
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
      if (data.rates) setRatesForm(data.rates);
      if (data.demographics) setDemoForm(data.demographics);
      if (data.geographies) setGeoForm(data.geographies);
      if (data.whatPerforms) setWhatPerforms(data.whatPerforms);
      if (data.sponsorResults) {
        setSponsorResults(data.sponsorResults);
        data.sponsorResults.forEach((s: { quoteFont?: string }) => {
          if (s.quoteFont) loadGoogleFont(s.quoteFont);
        });
      }
      if (data.tools) setToolsList(data.tools);
      if (data.blog) setBlogList(data.blog);

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
    <div className="w-full py-10 px-6 sm:px-8 bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-emerald-50 min-h-[calc(100vh-4rem)] transition-colors duration-200 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1700px] mx-auto relative z-10 space-y-8">
        
        {/* Redesigned Clean Admin Header */}
        <div className="bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] backdrop-blur-xl rounded-2xl p-6 shadow-md flex flex-wrap items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/10 dark:bg-emerald-500/20 rounded-xl overflow-hidden shrink-0 border border-emerald-500/30 flex items-center justify-center shadow-sm">
              <img src="/logo/logo.jpeg" alt="Artificial Quotient Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="font-heading text-2xl font-bold text-brand-text dark:text-white tracking-tight">
                  Admin Management Portal
                </h1>
                <span className="text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  Auth Active
                </span>
                <span className="text-xs bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-emerald-400" /> {dbStatus}
                </span>
              </div>
              <p className="text-sm text-brand-muted dark:text-emerald-200/70 font-medium mt-0.5">
                System Control &bull; Artificial Quotient Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* View Mode Toggle Pill */}
            <div className="inline-flex p-1.5 rounded-xl bg-brand-bg dark:bg-[#102922] border border-brand-border dark:border-[#16382e]">
              <button
                type="button"
                onClick={() => setLayoutMode("split")}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  layoutMode === "split"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-brand-muted dark:text-emerald-200/70 hover:text-white"
                }`}
              >
                <Sparkles className="w-4 h-4" /> Split View
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("edit")}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  layoutMode === "edit"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-brand-muted dark:text-emerald-200/70 hover:text-white"
                }`}
              >
                <Edit3 className="w-4 h-4" /> Form Only
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode("preview")}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                  layoutMode === "preview"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-brand-muted dark:text-emerald-200/70 hover:text-white"
                }`}
              >
                <Eye className="w-4 h-4" /> Preview Only
              </button>
            </div>

            <Link 
              href="/" 
              className="px-4 py-2.5 rounded-xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#102922] text-xs sm:text-sm font-bold text-brand-text dark:text-emerald-100 hover:bg-emerald-500/10 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>Live Site</span>
              <ExternalLink className="w-4 h-4 text-emerald-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2.5 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/40 hover:bg-red-500/20 text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid md:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="md:col-span-3 lg:col-span-3 flex flex-col gap-2.5">
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
              onClick={() => setActiveTab("blog")}
              className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                activeTab === "blog"
                  ? "bg-emerald-600 text-white shadow-emerald-600/20"
                  : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70 hover:text-white hover:bg-emerald-50 dark:hover:bg-[#102922]"
              }`}
            >
              <FileText className="w-4 h-4" /> Script-to-Blog Hub
            </button>

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
          </div>

          {/* Main Workspace */}
          <div className="md:col-span-9 lg:col-span-9 flex flex-col gap-6">
            
            {savedSuccess && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-5 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2.5 animate-fade-in shadow-sm">
                <Check className="w-5 h-5 text-emerald-500" /> Changes saved &amp; published live on site!
              </div>
            )}

            <div className={`grid gap-8 ${layoutMode === "split" ? "lg:grid-cols-12" : "grid-cols-1"}`}>
              
              {/* EDIT FORM CONTAINER */}
              {(layoutMode === "split" || layoutMode === "edit") && (
                <div className={`${layoutMode === "split" ? "lg:col-span-7" : "w-full"} bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] backdrop-blur-xl rounded-2xl p-7 shadow-md transition-colors duration-200`}>
                  <div className="flex items-center justify-between pb-5 mb-6 border-b border-brand-border dark:border-[#16382e]">
                    <h2 className="font-heading text-lg font-bold text-brand-text dark:text-white flex items-center gap-2.5">
                      <Edit3 className="w-5 h-5 text-emerald-500" />
                      {activeTab === "stats" && "Edit Channel Stats & Pricing"}
                      {activeTab === "case-studies" && "Manage Sponsor Case Studies"}
                      {activeTab === "what-performs" && "Manage What Performs Cards"}
                      {activeTab === "tools" && "Manage AI Tool Vault"}
                      {activeTab === "blog" && "Manage Script-to-Blog Hub"}
                      {activeTab === "users" && "Manage Administrators & Access Permissions"}
                      {activeTab === "backup" && "System Backup & Data Operations"}
                    </h2>
                  </div>

                  {/* TAB 1: STATS & PRICING */}
                  {activeTab === "stats" && (
                    <form className="space-y-6">
                      <div className="space-y-4">
                        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">Channel Performance Metrics</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Subscribers</label>
                            <input 
                              type="text" 
                              value={statsForm.subscribers} 
                              onChange={(e) => setStatsForm({ ...statsForm, subscribers: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2" 
                            />
                            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Subscribers Subtext</label>
                            <input 
                              type="text" 
                              value={statsForm.subscribersSub} 
                              onChange={(e) => setStatsForm({ ...statsForm, subscribersSub: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Total View Count</label>
                            <input 
                              type="text" 
                              value={statsForm.monthlyViews} 
                              onChange={(e) => setStatsForm({ ...statsForm, monthlyViews: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2" 
                            />
                            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">View Count Subtext</label>
                            <input 
                              type="text" 
                              value={statsForm.monthlyViewsSub} 
                              onChange={(e) => setStatsForm({ ...statsForm, monthlyViewsSub: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">New Subs (30D)</label>
                            <input 
                              type="text" 
                              value={statsForm.newSubs} 
                              onChange={(e) => setStatsForm({ ...statsForm, newSubs: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2" 
                            />
                            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">New Subs Subtext</label>
                            <input 
                              type="text" 
                              value={statsForm.newSubsSub} 
                              onChange={(e) => setStatsForm({ ...statsForm, newSubsSub: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Videos Published</label>
                            <input 
                              type="text" 
                              value={statsForm.videosCount} 
                              onChange={(e) => setStatsForm({ ...statsForm, videosCount: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2" 
                            />
                            <label className="block text-[11px] font-bold text-brand-muted dark:text-emerald-200/60 mb-1">Videos Subtext</label>
                            <input 
                              type="text" 
                              value={statsForm.videosCountSub} 
                              onChange={(e) => setStatsForm({ ...statsForm, videosCountSub: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-5 border-t border-brand-border dark:border-[#16382e] space-y-4">
                        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">Sponsorship Rates</h3>
                        <div className="grid grid-cols-2 gap-5">
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Dedicated Video ($)</label>
                            <input 
                              type="text" 
                              value={ratesForm.dedicatedRate} 
                              onChange={(e) => setRatesForm({ ...ratesForm, dedicatedRate: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Integration ($)</label>
                            <input 
                              type="text" 
                              value={ratesForm.integrationRate} 
                              onChange={(e) => setRatesForm({ ...ratesForm, integrationRate: e.target.value })}
                              className="w-full border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500" 
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end pt-5 border-t border-brand-border dark:border-[#16382e]">
                        <button 
                          type="button" 
                          onClick={handleSaveAll} 
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm"
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
                          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-500/30"
                        >
                          <Plus className="w-4 h-4" /> Add Case Study
                        </button>
                      </div>

                      <div className="space-y-5">
                        {sponsorResults.map((item, idx) => (
                          <div key={item.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
                            <button
                              type="button"
                              onClick={() => setSponsorResults(sponsorResults.filter(s => s.id !== item.id))}
                              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors"
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

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Stat 1 Label</label>
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
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Stat 1 Value</label>
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
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Stat 2 Label</label>
                                <input 
                                  type="text" 
                                  value={item.stat2Label} 
                                  onChange={(e) => {
                                    const next = [...sponsorResults];
                                    next[idx].stat2Label = e.target.value;
                                    setSponsorResults(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Stat 2 Value</label>
                                <input 
                                  type="text" 
                                  value={item.stat2Value} 
                                  onChange={(e) => {
                                    const next = [...sponsorResults];
                                    next[idx].stat2Value = e.target.value;
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

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">
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
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                  />
                                </div>

                                <div>
                                  <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">
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
                                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
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
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm"
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
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm"
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
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm"
                        >
                          <Save className="w-4 h-4" /> Save Tool Directory
                        </button>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: SCRIPT-TO-BLOG HUB */}
                  {activeTab === "blog" && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">Script-to-Blog Articles</h3>
                        <button
                          type="button"
                          onClick={() => setBlogList([...blogList, {
                            id: Date.now().toString(),
                            title: "New Tutorial Guide",
                            category: "Tutorials & Workflows",
                            excerpt: "Guide excerpt...",
                            ytUrl: "https://youtube.com",
                            author: "Artificial Quotient",
                            cover: ""
                          }])}
                          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-500/30"
                        >
                          <Plus className="w-4 h-4" /> Publish Article
                        </button>
                      </div>

                      <div className="space-y-5">
                        {blogList.map((post, idx) => (
                          <div key={post.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
                            <button
                              type="button"
                              onClick={() => setBlogList(blogList.filter(b => b.id !== post.id))}
                              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors"
                              title="Delete article"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pr-10">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Article Title</label>
                                <input 
                                  type="text" 
                                  value={post.title} 
                                  onChange={(e) => {
                                    const next = [...blogList];
                                    next[idx].title = e.target.value;
                                    setBlogList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Category</label>
                                <input 
                                  type="text" 
                                  value={post.category} 
                                  onChange={(e) => {
                                    const next = [...blogList];
                                    next[idx].category = e.target.value;
                                    setBlogList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Excerpt</label>
                              <textarea 
                                rows={2}
                                value={post.excerpt} 
                                onChange={(e) => {
                                  const next = [...blogList];
                                  next[idx].excerpt = e.target.value;
                                  setBlogList(next);
                                }}
                                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">YouTube Video Link</label>
                                <input 
                                  type="text" 
                                  value={post.ytUrl} 
                                  onChange={(e) => {
                                    const next = [...blogList];
                                    next[idx].ytUrl = e.target.value;
                                    setBlogList(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs" 
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Author</label>
                                <input 
                                  type="text" 
                                  value={post.author} 
                                  onChange={(e) => {
                                    const next = [...blogList];
                                    next[idx].author = e.target.value;
                                    setBlogList(next);
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
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm"
                        >
                          <Save className="w-4 h-4" /> Save Blog Articles
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
                              password: "password123",
                              role: "Editor",
                              permissions: ["case-studies", "what-performs", "tools", "blog"],
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
                          <div key={user.id} className="p-4 sm:p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-3.5 relative">
                            {adminUsers.length > 1 && (
                              <button
                                type="button"
                                onClick={() => setAdminUsers(adminUsers.filter((u) => u.id !== user.id))}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors"
                                title="Remove administrator"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}

                            {/* Row 1: Name & Email */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pr-10">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                  Admin Full Name
                                </label>
                                <input 
                                  type="text" 
                                  value={user.name} 
                                  onChange={(e) => {
                                    const next = [...adminUsers];
                                    next[idx].name = e.target.value;
                                    setAdminUsers(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-bold" 
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
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
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm" 
                                />
                              </div>
                            </div>

                            {/* Row 2: Password & Status */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                  Access Password
                                </label>
                                <input 
                                  type="text" 
                                  value={user.password} 
                                  onChange={(e) => {
                                    const next = [...adminUsers];
                                    next[idx].password = e.target.value;
                                    setAdminUsers(next);
                                  }}
                                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-mono" 
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                              <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                  Role &amp; Permissions
                                </label>
                                <select
                                  value={user.role}
                                  onChange={(e) => {
                                    const next = [...adminUsers];
                                    const newRole = e.target.value as "Super Admin" | "Editor" | "Viewer";
                                    next[idx].role = newRole;
                                    if (newRole === "Super Admin") {
                                      next[idx].permissions = ["stats", "case-studies", "what-performs", "tools", "blog", "backup", "users"];
                                    } else if (newRole === "Editor") {
                                      next[idx].permissions = ["case-studies", "what-performs", "tools", "blog"];
                                    } else {
                                      next[idx].permissions = ["stats"];
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
                                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1">
                                  Password Recovery Key
                                </label>
                                <div className="flex items-center gap-2">
                                  <input 
                                    type="text" 
                                    readOnly
                                    value={user.recoveryKey} 
                                    className="w-0 flex-1 border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3 py-2 text-xs font-mono font-bold" 
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      navigator.clipboard.writeText(user.recoveryKey);
                                      alert(`Recovery Key copied: ${user.recoveryKey}`);
                                    }}
                                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl text-xs border border-emerald-500/30 shrink-0 whitespace-nowrap"
                                  >
                                    Copy PIN
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
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm"
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
                              Download a complete offline copy of your channel stats, pricing, tools, case studies, and blog articles.
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
                          <label className="w-full bg-brand-card dark:bg-[#102922] border border-emerald-500/40 text-emerald-600 dark:text-emerald-300 font-bold text-xs sm:text-sm py-3 rounded-xl hover:bg-emerald-500/20 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer">
                            <UploadCloud className="w-4 h-4" /> Select Backup File
                            <input type="file" accept=".json" onChange={handleRestoreBackup} className="hidden" />
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* LIVE PREVIEW CONTAINER */}
              {(layoutMode === "split" || layoutMode === "preview") && (
                <div className={`${layoutMode === "split" ? "lg:col-span-5" : "w-full"} bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] backdrop-blur-xl rounded-2xl p-7 shadow-md transition-colors duration-200`}>
                  <div className="flex items-center justify-between pb-5 mb-6 border-b border-brand-border dark:border-[#16382e]">
                    <div className="flex items-center gap-2.5">
                      <Eye className="w-5 h-5 text-emerald-500 animate-pulse" />
                      <h3 className="font-heading text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                        Live Pre-Publish Preview
                      </h3>
                    </div>
                    <span className="text-xs bg-emerald-500/10 text-emerald-500 font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Real-time
                    </span>
                  </div>

                  {/* PREVIEW TAB 1: STATS & PRICING */}
                  {activeTab === "stats" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] rounded-xl p-4">
                          <div className="text-xs font-bold text-brand-muted dark:text-emerald-200/60 uppercase">Subscribers</div>
                          <div className="text-xl font-bold text-brand-text dark:text-white mt-1">{statsForm.subscribers}</div>
                        </div>

                        <div className="bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e] rounded-xl p-4">
                          <div className="text-xs font-bold text-brand-muted dark:text-emerald-200/60 uppercase">View Count</div>
                          <div className="text-xl font-bold text-brand-text dark:text-white mt-1">{statsForm.monthlyViews}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="p-4 rounded-xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e]">
                          <div className="text-xs text-emerald-500 font-bold uppercase">Dedicated Rate</div>
                          <div className="text-xl font-bold text-brand-text dark:text-white mt-1">{ratesForm.dedicatedRate}</div>
                        </div>
                        <div className="p-4 rounded-xl bg-brand-bg dark:bg-[#061612] border border-brand-border dark:border-[#16382e]">
                          <div className="text-xs text-brand-muted dark:text-emerald-200/70 font-bold uppercase">Integration Rate</div>
                          <div className="text-xl font-bold text-brand-text dark:text-white mt-1">{ratesForm.integrationRate}</div>
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
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-sm text-brand-text dark:text-white">{item.partnerName}</span>
                              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500">{item.campaignType}</span>
                            </div>
                            <p 
                              style={{ fontFamily: item.quoteFont ? `'${item.quoteFont}', cursive, sans-serif` : undefined }}
                              className="font-handwritten text-sm text-brand-muted dark:text-emerald-200/80 italic"
                            >
                              &quot;{item.quote}&quot;
                            </p>
                            <div className="flex justify-between text-xs font-bold border-t border-brand-border dark:border-[#16382e] pt-2">
                              <span>{item.stat1Label}: <span className="text-emerald-500">{item.stat1Value}</span></span>
                              <span>{item.stat2Label}: <span className="text-emerald-500">{item.stat2Value}</span></span>
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

                  {/* PREVIEW TAB 5: BLOG HUB */}
                  {activeTab === "blog" && (
                    <div className="space-y-4">
                      <div className="text-sm font-bold text-brand-text dark:text-white mb-2">Script-to-Blog Hub Articles</div>
                      {blogList.map(post => (
                        <div key={post.id} className="bg-brand-bg dark:bg-[#061612] rounded-xl border border-brand-border dark:border-[#16382e] p-5 shadow-sm">
                          <h4 className="font-heading font-bold text-base text-brand-text dark:text-white mb-1">{post.title}</h4>
                          <span className="text-xs text-emerald-500 font-bold mb-2 block">{post.category}</span>
                          <p className="text-xs sm:text-sm text-brand-muted dark:text-emerald-200/70 leading-relaxed">{post.excerpt}</p>
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
