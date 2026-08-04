"use client";

import { Save, BarChart, Database, FileText, LogOut, Check, Lock, ExternalLink, UploadCloud, Image as ImageIcon, Trash2, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<"stats" | "tools" | "blog">("stats");
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form states with uploaded media URLs
  const [toolLogo, setToolLogo] = useState<string>("");
  const [blogCover, setBlogCover] = useState<string>("");
  const [channelBanner, setChannelBanner] = useState<string>("");
  
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Generic handler to upload media for any specific form field
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

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  };

  return (
    <div className="w-full py-12 px-4 bg-brand-bg dark:bg-zinc-950 text-brand-text dark:text-zinc-100 min-h-[calc(100vh-4rem)] transition-colors duration-200 relative overflow-hidden">
      {/* Decorative ambient glows */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-blue/10 dark:bg-brand-blue/15 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Dedicated Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white/80 dark:bg-zinc-900/80 border border-brand-border/60 dark:border-zinc-800/80 backdrop-blur-xl rounded-2xl p-6 shadow-md transition-colors duration-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-blue/10 dark:bg-brand-blue/20 rounded-xl flex items-center justify-center text-brand-blue shrink-0 shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-heading text-2xl font-bold text-brand-text dark:text-white tracking-tight">
                  Admin Management Portal
                </h1>
                <span className="text-xs bg-brand-blue/15 dark:bg-brand-blue/25 text-brand-blue dark:text-blue-400 border border-brand-blue/30 dark:border-blue-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  Authenticated
                </span>
              </div>
              <p className="text-xs text-brand-muted dark:text-zinc-400 mt-0.5">
                System Control &bull; Artificial Quotient Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-xl border border-brand-border/80 dark:border-zinc-700/80 bg-white/60 dark:bg-zinc-800/60 text-xs font-bold text-brand-text dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-800 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span>View Live Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-muted dark:text-zinc-400" />
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500/10 dark:bg-red-950/30 text-red-600 dark:text-red-400 border border-red-200/50 dark:border-red-900/40 hover:bg-red-500/20 dark:hover:bg-red-900/40 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Sidebar Tabs */}
          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                activeTab === "stats"
                  ? "bg-brand-blue text-white shadow-brand-blue/20"
                  : "bg-white/70 dark:bg-zinc-900/70 border border-brand-border/60 dark:border-zinc-800/80 text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800/60"
              }`}
            >
              <BarChart className="w-4.5 h-4.5" /> Channel Stats &amp; Rates
            </button>
            <button
              onClick={() => setActiveTab("tools")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                activeTab === "tools"
                  ? "bg-brand-blue text-white shadow-brand-blue/20"
                  : "bg-white/70 dark:bg-zinc-900/70 border border-brand-border/60 dark:border-zinc-800/80 text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800/60"
              }`}
            >
              <Database className="w-4.5 h-4.5" /> AI Tool Vault
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
                activeTab === "blog"
                  ? "bg-brand-blue text-white shadow-brand-blue/20"
                  : "bg-white/70 dark:bg-zinc-900/70 border border-brand-border/60 dark:border-zinc-800/80 text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white hover:bg-white dark:hover:bg-zinc-800/60"
              }`}
            >
              <FileText className="w-4.5 h-4.5" /> Script-to-Blog Hub
            </button>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3 bg-white/80 dark:bg-zinc-900/80 border border-brand-border/60 dark:border-zinc-800/80 backdrop-blur-xl rounded-2xl p-8 shadow-md transition-colors duration-200">
            
            {savedSuccess && (
              <div className="mb-6 bg-green-50/80 dark:bg-green-950/30 border border-green-200 dark:border-green-900/50 text-green-700 dark:text-green-400 px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2 animate-fade-in shadow-sm">
                <Check className="w-4 h-4 text-green-500" /> Changes saved successfully!
              </div>
            )}

            {/* TAB 1: Channel Stats */}
            {activeTab === "stats" && (
              <div>
                <h2 className="font-heading text-xl font-bold mb-6 text-brand-text dark:text-white tracking-tight">
                  Channel Snapshot &amp; Rates
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                        Subscribers
                      </label>
                      <input 
                        type="text" 
                        defaultValue="10.1k" 
                        className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                        Monthly Views
                      </label>
                      <input 
                        type="text" 
                        defaultValue="69.5k" 
                        className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                        Avg. Retention (%)
                      </label>
                      <input 
                        type="text" 
                        defaultValue="27" 
                        className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                        Tutorials Uploaded
                      </label>
                      <input 
                        type="text" 
                        defaultValue="224" 
                        className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                      />
                    </div>
                  </div>

                  {/* Channel Banner Upload Inline */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 uppercase tracking-wider">
                      Channel Banner / Brand Header Image
                    </label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="text" 
                        value={channelBanner}
                        onChange={(e) => setChannelBanner(e.target.value)}
                        placeholder="Upload or paste image URL..." 
                        className="flex-1 border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                      />
                      <label className="bg-brand-blue/10 dark:bg-brand-blue/20 hover:bg-brand-blue/20 dark:hover:bg-brand-blue/30 text-brand-blue font-bold px-4 py-2.5 rounded-xl cursor-pointer text-xs flex items-center gap-2 border border-brand-blue/30 transition-all shrink-0">
                        <UploadCloud className="w-4 h-4" />
                        <span>{uploadingField === "banner" ? "Uploading..." : "Upload Media"}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleInlineMediaUpload(e.target.files, setChannelBanner, "banner")}
                          className="hidden" 
                        />
                      </label>
                    </div>
                    {channelBanner && (
                      <div className="relative w-full h-24 rounded-xl border border-brand-border/60 dark:border-zinc-800/80 overflow-hidden bg-zinc-100 dark:bg-zinc-950 mt-2">
                        <img src={channelBanner} alt="Banner Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setChannelBanner("")}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 border-t border-brand-border/60 dark:border-zinc-800/80">
                    <h3 className="font-heading font-bold mb-4 text-brand-text dark:text-white">
                      Sponsorship Rates
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                          Tier 1 (Dedicated Video)
                        </label>
                        <input 
                          type="text" 
                          defaultValue="$500" 
                          className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                          Tier 2 (Integration)
                        </label>
                        <input 
                          type="text" 
                          defaultValue="$300" 
                          className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-brand-border/60 dark:border-zinc-800/80">
                    <button 
                      type="button" 
                      onClick={handleSave} 
                      className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-brand-blue/20 text-sm"
                    >
                      <Save className="w-4 h-4" /> Save Stats &amp; Rates
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: Tool Vault Manager */}
            {activeTab === "tools" && (
              <div>
                <h2 className="font-heading text-xl font-bold mb-6 text-brand-text dark:text-white tracking-tight">
                  Add New AI Tool to Directory
                </h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                      Tool Name
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Make.com" 
                      className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                    />
                  </div>

                  {/* Tool Logo Upload Field */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 uppercase tracking-wider">
                      Tool Logo / Icon Media
                    </label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="text" 
                        value={toolLogo}
                        onChange={(e) => setToolLogo(e.target.value)}
                        placeholder="Upload logo file or paste image URL..." 
                        className="flex-1 border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                      />
                      <label className="bg-brand-blue/10 dark:bg-brand-blue/20 hover:bg-brand-blue/20 dark:hover:bg-brand-blue/30 text-brand-blue font-bold px-4 py-2.5 rounded-xl cursor-pointer text-xs flex items-center gap-2 border border-brand-blue/30 transition-all shrink-0">
                        <UploadCloud className="w-4 h-4" />
                        <span>{uploadingField === "toolLogo" ? "Uploading..." : "Upload Logo"}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleInlineMediaUpload(e.target.files, setToolLogo, "toolLogo")}
                          className="hidden" 
                        />
                      </label>
                    </div>
                    {toolLogo && (
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-12 h-12 rounded-xl border border-brand-border/80 dark:border-zinc-700 bg-white dark:bg-zinc-950 flex items-center justify-center overflow-hidden p-1 relative shadow-sm">
                          <img src={toolLogo} alt="Tool Logo Preview" className="w-full h-full object-contain" />
                        </div>
                        <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Media uploaded &amp; attached
                        </span>
                        <button
                          type="button"
                          onClick={() => setToolLogo("")}
                          className="text-xs text-brand-muted hover:text-red-500 underline ml-auto transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                      Category
                    </label>
                    <select className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all">
                      <option className="dark:bg-zinc-900">Automation</option>
                      <option className="dark:bg-zinc-900">Video</option>
                      <option className="dark:bg-zinc-900">Coding</option>
                      <option className="dark:bg-zinc-900">Productivity</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                      Discount Code / Badge
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. 20% OFF or Code ARTIFICIAL" 
                      className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                    />
                  </div>
                  <div className="flex justify-end pt-6 border-t border-brand-border/60 dark:border-zinc-800/80">
                    <button 
                      type="button" 
                      onClick={handleSave} 
                      className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-brand-blue/20 text-sm"
                    >
                      <Save className="w-4 h-4" /> Add Tool Entry
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: Blog Hub Manager */}
            {activeTab === "blog" && (
              <div>
                <h2 className="font-heading text-xl font-bold mb-6 text-brand-text dark:text-white tracking-tight">
                  Publish Video Script Article
                </h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                      Article Title
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. How to Automate Shorts with Make.com" 
                      className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                    />
                  </div>

                  {/* Blog Article Cover Image Upload Field */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 uppercase tracking-wider">
                      Article Cover Image / Video Thumbnail Media
                    </label>
                    <div className="flex items-center gap-3">
                      <input 
                        type="text" 
                        value={blogCover}
                        onChange={(e) => setBlogCover(e.target.value)}
                        placeholder="Upload cover image or paste URL..." 
                        className="flex-1 border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                      />
                      <label className="bg-brand-blue/10 dark:bg-brand-blue/20 hover:bg-brand-blue/20 dark:hover:bg-brand-blue/30 text-brand-blue font-bold px-4 py-2.5 rounded-xl cursor-pointer text-xs flex items-center gap-2 border border-brand-blue/30 transition-all shrink-0">
                        <UploadCloud className="w-4 h-4" />
                        <span>{uploadingField === "blogCover" ? "Uploading..." : "Upload Cover"}</span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={(e) => handleInlineMediaUpload(e.target.files, setBlogCover, "blogCover")}
                          className="hidden" 
                        />
                      </label>
                    </div>
                    {blogCover && (
                      <div className="relative w-full h-36 rounded-xl border border-brand-border/60 dark:border-zinc-800/80 overflow-hidden bg-zinc-100 dark:bg-zinc-950 mt-2 shadow-sm">
                        <img src={blogCover} alt="Cover Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setBlogCover("")}
                          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-red-600 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-text dark:text-zinc-300 mb-2 uppercase tracking-wider">
                      YouTube Video URL
                    </label>
                    <input 
                      type="text" 
                      placeholder="https://youtube.com/watch?v=..." 
                      className="w-full border border-brand-border/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-950/60 text-brand-text dark:text-white placeholder:text-brand-muted dark:placeholder:text-zinc-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-blue/40 focus:border-brand-blue transition-all" 
                    />
                  </div>
                  <div className="flex justify-end pt-6 border-t border-brand-border/60 dark:border-zinc-800/80">
                    <button 
                      type="button" 
                      onClick={handleSave} 
                      className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-brand-blue/20 text-sm"
                    >
                      <Save className="w-4 h-4" /> Publish Post
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
