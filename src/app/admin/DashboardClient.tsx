"use client";

import React, { useState, useEffect, useRef } from "react";
import { Check, Edit3, ShieldCheck, AlertCircle, X, Save, Sparkles, Loader2 } from "lucide-react";
import { PerformItem, SponsorItem, AdminUser, BrandItem, InterestItem, CountryItem, HeroConfig } from "@/types";
import { parseGeographies } from "@/components/audience-snapshot";
import { ALL_COUNTRIES } from "@/lib/countries";
import { loadGoogleFont } from "@/components/font-provider";

// Admin Subcomponents
import { AdminHeader } from "./components/AdminHeader";
import { AdminSidebar, AdminTabType } from "./components/AdminSidebar";
import { HeroTab } from "./components/tabs/HeroTab";
import { StatsTab } from "./components/tabs/StatsTab";
import { CaseStudiesTab } from "./components/tabs/CaseStudiesTab";
import { WhatPerformsTab } from "./components/tabs/WhatPerformsTab";
import { BrandsTab } from "./components/tabs/BrandsTab";
import { UsersTab } from "./components/tabs/UsersTab";
import { BackupTab } from "./components/tabs/BackupTab";
import { AdminPreviewPanel } from "./components/preview/AdminPreviewPanel";
import defaultSiteData from "@/data/site-data.json";

interface DashboardClientProps {
  currentUser?: AdminUser;
}

export default function DashboardClient({ currentUser }: DashboardClientProps) {
  const isViewer = currentUser?.role === "Viewer";
  const canEditUsers = Boolean(currentUser?.role !== "Viewer" && (currentUser?.role === "Super Admin" || currentUser?.permissions?.includes("users")));
  const canEditBackup = Boolean(currentUser?.role !== "Viewer" && (currentUser?.role === "Super Admin" || currentUser?.permissions?.includes("backup")));

  const [activeTab, setActiveTab] = useState<AdminTabType>("hero");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncingYoutube, setIsSyncingYoutube] = useState(false);
  const [layoutMode, setLayoutMode] = useState<"split" | "edit" | "preview">("split");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [dbStatus, setDbStatus] = useState<string>("Connected to MySQL: AQ-Dashboard");
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  // Form States
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [geoForm, setGeoForm] = useState<CountryItem[]>([]);
  const [whatPerforms, setWhatPerforms] = useState<PerformItem[]>([]);
  const [sponsorResults, setSponsorResults] = useState<SponsorItem[]>([]);
  const [brandsList, setBrandsList] = useState<BrandItem[]>([]);
  const [audienceInterests, setAudienceInterests] = useState<InterestItem[]>([]);
  const [shoppingInterests, setShoppingInterests] = useState<InterestItem[]>([]);
  const [availableCountries, setAvailableCountries] = useState<{ code: string; name: string }[]>(ALL_COUNTRIES);

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

  // Permissions safeguard for tabs
  useEffect(() => {
    if (activeTab === "users" && !canEditUsers) {
      setActiveTab("stats");
    } else if (activeTab === "backup" && !canEditBackup) {
      setActiveTab("stats");
    }
  }, [activeTab, canEditUsers, canEditBackup]);

  // Scroll to banner on save
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

  // Scroll and handle notification auto-clear
  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        if (bannerRef.current) {
          bannerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }, 50);

      // Auto-clear success notifications after 5 seconds
      if (notification.type === "success") {
        const timer = setTimeout(() => {
          setNotification(null);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [notification]);

  // Fetch initial site data from API on mount
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/data", { cache: "no-store" });
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
      } catch (err) {
        console.error("Failed to load initial data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  // Auto-scroll and auto-clear timer for inline alert notifications
  useEffect(() => {
    if (notification) {
      bannerRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      const timer = setTimeout(() => {
        setNotification(null);
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Global Keyboard Shortcut (Ctrl+S / Cmd+S) to Save Instantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!isViewer && activeTab !== "backup") {
          if (activeTab === "users") {
            handleSaveUsers();
          } else {
            handleSaveAll();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isViewer, 
    activeTab, 
    heroForm, 
    statsForm, 
    ratesForm, 
    demoForm, 
    geoForm, 
    whatPerforms, 
    sponsorResults, 
    brandsList, 
    audienceInterests, 
    shoppingInterests, 
    adminUsers
  ]);

  const handleInlineMediaUpload = async (
    files: FileList | null, 
    setFieldUrl: (url: string) => void,
    fieldId: string
  ) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const formData = new FormData();
    formData.append("file", file);

    setUploadingField(fieldId);
    setNotification(null);
    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        if (data.url) {
          setFieldUrl(data.url);
        }
      } else {
        setNotification({
          type: "error",
          message: "Upload failed. Please check server logs.",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Network error during file upload.",
      });
    } finally {
      setUploadingField(null);
    }
  };

  const handleSaveUsers = async () => {
    if (isViewer || isSaving) return;
    setIsSaving(true);
    setNotification(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ users: adminUsers }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setNotification({
          type: "success",
          message: "Admin users & permissions successfully updated in database!",
        });
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        setNotification({
          type: "error",
          message: "Failed to update admin users. Please try again.",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Network error occurred while saving users.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAll = async () => {
    if (isViewer || isSaving) return;
    setIsSaving(true);
    setNotification(null);
    const payload = {
      heroConfig: heroForm,
      stats: statsForm,
      rates: ratesForm,
      demographics: demoForm,
      geographies: geoForm,
      whatPerforms,
      sponsorResults,
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
        setNotification({
          type: "success",
          message: "All changes successfully saved and published live to database!",
        });
        setTimeout(() => setSavedSuccess(false), 3000);
      } else {
        setNotification({
          type: "error",
          message: "Failed to save changes to database. Please check your connection.",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Network error occurred while saving changes.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSyncYoutube = async () => {
    if (isViewer) return;
    setIsSyncingYoutube(true);
    setNotification(null);
    try {
      const res = await fetch("/api/admin/youtube-sync", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        if (data.data?.whatPerforms) {
          setWhatPerforms(data.data.whatPerforms);
        }
        if (data.data?.sponsorResults) {
          setSponsorResults(data.data.sponsorResults);
        }
        if (data.data?.stats) {
          setStatsForm(data.data.stats);
        }
        setNotification({
          type: "success",
          message: data.message || "Successfully refreshed YouTube stats across What Performs, Case Studies & Channel stats!",
        });
      } else {
        setNotification({
          type: "error",
          message: data.message || "Failed to sync YouTube stats. Check your API key.",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Network error occurred while syncing YouTube stats.",
      });
    } finally {
      setIsSyncingYoutube(false);
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
      brandItems: brandsList,
      audienceInterests,
      shoppingInterests,
      exportedAt: new Date().toISOString(),
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `artificial-quotient-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRestoreBackup = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNotification(null);

    try {
      const text = await file.text();
      const backupData = JSON.parse(text);

      if (!backupData.stats && !backupData.rates && !backupData.whatPerforms) {
        setNotification({
          type: "error",
          message: "Invalid backup file structure.",
        });
        return;
      }

      if (backupData.stats) setStatsForm(backupData.stats);
      if (backupData.heroConfig) setHeroForm(backupData.heroConfig);
      if (backupData.rates) setRatesForm(backupData.rates);
      if (backupData.demographics) setDemoForm(backupData.demographics);
      if (backupData.geographies) setGeoForm(parseGeographies(backupData.geographies));
      if (backupData.whatPerforms) setWhatPerforms(backupData.whatPerforms);
      if (backupData.sponsorResults) setSponsorResults(backupData.sponsorResults);
      if (backupData.brandItems) setBrandsList(backupData.brandItems);
      if (backupData.audienceInterests) setAudienceInterests(backupData.audienceInterests);
      if (backupData.shoppingInterests) setShoppingInterests(backupData.shoppingInterests);

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(backupData),
      });

      if (res.ok) {
        setNotification({
          type: "success",
          message: "Backup restored successfully and saved to database!",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Failed to restore backup file. Ensure it is a valid JSON backup file.",
      });
    } finally {
      e.target.value = "";
    }
  };

  const handleResetAllDefaultSeed = async () => {
    if (isViewer) return;
    if (!window.confirm("Are you sure you want to reset ALL sections (Stats, What Performs, Case Studies, Brands, Interests) to the latest default repository seed data?")) {
      return;
    }
    setNotification(null);
    try {
      if (defaultSiteData.stats) setStatsForm(defaultSiteData.stats);
      if (defaultSiteData.heroConfig) setHeroForm(defaultSiteData.heroConfig);
      if (defaultSiteData.rates) setRatesForm(defaultSiteData.rates);
      if (defaultSiteData.demographics) setDemoForm(defaultSiteData.demographics);
      if (defaultSiteData.geographies) setGeoForm(parseGeographies(defaultSiteData.geographies));
      if (defaultSiteData.whatPerforms) setWhatPerforms(defaultSiteData.whatPerforms as any);
      if (defaultSiteData.sponsorResults) setSponsorResults(defaultSiteData.sponsorResults as any);
      if (defaultSiteData.brandItems) setBrandsList(defaultSiteData.brandItems as any);
      if (defaultSiteData.audienceInterests) setAudienceInterests(defaultSiteData.audienceInterests);
      if (defaultSiteData.shoppingInterests) setShoppingInterests(defaultSiteData.shoppingInterests);

      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(defaultSiteData),
      });

      if (res.ok) {
        setNotification({
          type: "success",
          message: "All sections successfully reset to latest default seed data and saved to database!",
        });
      } else {
        setNotification({
          type: "error",
          message: "Failed to save reset data to database.",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "An error occurred while resetting seed data.",
      });
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

  const tabTitles: Record<AdminTabType, string> = {
    hero: "Manage Hero Snapshot & Dynamic RGB Frame",
    stats: "Edit Channel Stats & Pricing",
    "case-studies": "Manage Sponsor Case Studies",
    "what-performs": "Manage What Performs Cards",
    brands: "Manage Brands & Partners",
    users: "Manage Administrators & Access Permissions",
    backup: "System Backup & Data Operations",
  };

  return (
    <div ref={topRef} id="admin-portal-top" className="w-full py-4 sm:py-10 px-3 sm:px-6 lg:px-8 bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-emerald-50 min-h-[calc(100vh-4rem)] transition-colors duration-200 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-[1700px] mx-auto relative z-10 space-y-4 sm:space-y-8">
        
        {/* Header Component */}
        <AdminHeader
          currentUser={currentUser}
          dbStatus={dbStatus}
          isViewer={isViewer}
          isSyncingYoutube={isSyncingYoutube}
          isSaving={isSaving}
          layoutMode={layoutMode}
          setLayoutMode={setLayoutMode}
          onSyncYoutube={handleSyncYoutube}
          onSave={!isViewer && activeTab !== "backup" ? (activeTab === "users" ? handleSaveUsers : handleSaveAll) : undefined}
          onLogout={handleLogout}
        />

        {/* Main Dashboard Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4 sm:gap-8">

          {/* Navigation Sidebar */}
          <AdminSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            canEditUsers={canEditUsers}
            canEditBackup={canEditBackup}
            adminUsers={adminUsers}
          />

          {/* Main Workspace */}
          <div className="lg:col-span-9 flex flex-col gap-4 sm:gap-6">
            
            <div ref={bannerRef} className="space-y-4">
              {savedSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 px-5 py-3.5 rounded-xl text-sm font-bold flex items-center gap-2.5 animate-fade-in shadow-sm">
                  <Check className="w-5 h-5 text-emerald-500" /> Changes saved &amp; published live on site!
                </div>
              )}

              {notification && (
                <div className={`border px-5 py-3.5 rounded-xl text-sm font-bold flex items-center justify-between gap-2.5 animate-fade-in shadow-sm ${
                  notification.type === "success" 
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                    : "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                }`}>
                  <div className="flex items-center gap-2.5">
                    {notification.type === "success" ? (
                      <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
                    )}
                    <span>{notification.message}</span>
                  </div>
                  <button 
                    onClick={() => setNotification(null)}
                    className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors shrink-0 text-brand-muted hover:text-brand-text dark:text-emerald-300 dark:hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className={`grid gap-8 ${layoutMode === "split" ? "xl:grid-cols-12" : "grid-cols-1"}`}>
              
              {/* EDIT FORM CONTAINER */}
              {(layoutMode === "split" || layoutMode === "edit") && (
                <div className={`${layoutMode === "split" ? "xl:col-span-7" : "w-full"} bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] backdrop-blur-xl rounded-2xl p-4 sm:p-7 shadow-md transition-colors duration-200`}>
                  <div className="flex items-center justify-between pb-5 mb-6 border-b border-brand-border dark:border-[#16382e]">
                    <h2 className="font-heading text-lg font-bold text-brand-text dark:text-white flex items-center gap-2.5">
                      <Edit3 className="w-5 h-5 text-emerald-500" />
                      {tabTitles[activeTab]}
                    </h2>
                  </div>

                  {isViewer && (
                    <div className="bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-300 px-4 py-3 rounded-xl text-xs font-bold flex items-center gap-2.5 mb-6 shadow-sm">
                      <ShieldCheck className="w-4.5 h-4.5 text-amber-500 shrink-0" />
                      <span>Read-Only Viewer Mode: Form fields and action buttons are disabled for your account.</span>
                    </div>
                  )}

                  {activeTab === "hero" && (
                    <HeroTab
                      heroForm={heroForm}
                      setHeroForm={setHeroForm}
                      isViewer={isViewer}
                      uploadingField={uploadingField}
                      handleInlineMediaUpload={handleInlineMediaUpload}
                      onSave={handleSaveAll}
                    />
                  )}

                  {activeTab === "stats" && (
                    <StatsTab
                      statsForm={statsForm}
                      setStatsForm={setStatsForm}
                      ratesForm={ratesForm}
                      setRatesForm={setRatesForm}
                      geoForm={geoForm}
                      setGeoForm={setGeoForm}
                      availableCountries={availableCountries}
                      isViewer={isViewer}
                      onSave={handleSaveAll}
                    />
                  )}

                  {activeTab === "case-studies" && (
                    <CaseStudiesTab
                      sponsorResults={sponsorResults}
                      setSponsorResults={setSponsorResults}
                      isViewer={isViewer}
                      uploadingField={uploadingField}
                      handleInlineMediaUpload={handleInlineMediaUpload}
                      setNotification={setNotification}
                      onSave={handleSaveAll}
                    />
                  )}

                  {activeTab === "what-performs" && (
                    <WhatPerformsTab
                      whatPerforms={whatPerforms}
                      setWhatPerforms={setWhatPerforms}
                      isViewer={isViewer}
                      uploadingField={uploadingField}
                      handleInlineMediaUpload={handleInlineMediaUpload}
                      setNotification={setNotification}
                      onSave={handleSaveAll}
                    />
                  )}

                  {activeTab === "brands" && (
                    <BrandsTab
                      brandsList={brandsList}
                      setBrandsList={setBrandsList}
                      isViewer={isViewer}
                      uploadingField={uploadingField}
                      handleInlineMediaUpload={handleInlineMediaUpload}
                      setNotification={setNotification}
                      onSave={handleSaveAll}
                    />
                  )}

                  {activeTab === "users" && (
                    <UsersTab
                      adminUsers={adminUsers}
                      setAdminUsers={setAdminUsers}
                      isViewer={isViewer}
                      onSaveUsers={handleSaveUsers}
                    />
                  )}

                  {activeTab === "backup" && (
                    <BackupTab
                      isViewer={isViewer}
                      onDownloadBackup={handleDownloadBackup}
                      onRestoreBackup={handleRestoreBackup}
                      onResetSeed={handleResetAllDefaultSeed}
                    />
                  )}
                </div>
              )}

              {/* LIVE PREVIEW CONTAINER */}
              {(layoutMode === "split" || layoutMode === "preview") && (
                <div className={`${layoutMode === "split" ? "xl:col-span-5" : "w-full"}`}>
                  <AdminPreviewPanel
                    activeTab={activeTab}
                    heroForm={heroForm}
                    statsForm={statsForm}
                    ratesForm={ratesForm}
                    geoForm={geoForm}
                    sponsorResults={sponsorResults}
                    whatPerforms={whatPerforms}
                    brandsList={brandsList}
                    adminUsers={adminUsers}
                  />
                </div>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* Floating Sticky Quick Save Bar */}
      {!isViewer && activeTab !== "backup" && (
        <div className="fixed bottom-6 right-6 sm:right-10 z-40 animate-fade-in flex items-center gap-2.5 bg-brand-card/90 dark:bg-[#0c201a]/90 backdrop-blur-xl border border-emerald-500/30 p-2 sm:p-2.5 rounded-2xl shadow-2xl shadow-emerald-950/40 transition-all hover:border-emerald-500/50">
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2 text-[11px] font-bold text-brand-muted dark:text-emerald-300/80">
            <kbd className="px-1.5 py-0.5 bg-black/10 dark:bg-white/10 rounded text-[10px] font-mono border border-emerald-500/20">Ctrl+S</kbd> Quick Save
          </span>
          <button
            type="button"
            disabled={isSaving}
            onClick={activeTab === "users" ? handleSaveUsers : handleSaveAll}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Live...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
