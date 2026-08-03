"use client";

import { Save, BarChart, Database, FileText, LogOut, Check, Lock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState<"stats" | "tools" | "blog">("stats");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = async () => {
    // We will create a logout endpoint or just delete the cookie
    await fetch("/api/auth/logout", { method: "POST" });
    // Force hard refresh to update UI state
    window.location.href = "/";
  };

  return (
    <div className="w-full py-12 px-4 bg-brand-bg min-h-screen transition-colors">
      <div className="max-w-5xl mx-auto">
        
        {/* Dedicated Admin Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 bg-white border border-brand-border rounded-2xl p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading text-2xl font-bold text-brand-text">Admin Management Portal</h1>
                <span className="text-xs bg-brand-blue/20 text-brand-blue px-2.5 py-0.5 rounded-full font-bold">Authenticated</span>
              </div>
              <p className="text-xs text-brand-muted">Welcome, Administrator</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/" className="px-4 py-2 rounded-lg border border-brand-border text-xs font-bold text-brand-text hover:bg-gray-50 transition-colors">
              View Live Site
            </Link>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-4 gap-8">
          
          {/* Sidebar Tabs */}
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-bold text-sm transition-all ${
                activeTab === "stats"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-white border border-brand-border text-brand-muted hover:text-brand-text"
              }`}
            >
              <BarChart className="w-4 h-4" /> Channel Stats & Rates
            </button>
            <button
              onClick={() => setActiveTab("tools")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-bold text-sm transition-all ${
                activeTab === "tools"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-white border border-brand-border text-brand-muted hover:text-brand-text"
              }`}
            >
              <Database className="w-4 h-4" /> AI Tool Vault
            </button>
            <button
              onClick={() => setActiveTab("blog")}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-bold text-sm transition-all ${
                activeTab === "blog"
                  ? "bg-brand-blue text-white shadow-sm"
                  : "bg-white border border-brand-border text-brand-muted hover:text-brand-text"
              }`}
            >
              <FileText className="w-4 h-4" /> Script-to-Blog Hub
            </button>
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-3 bg-white border border-brand-border rounded-2xl p-8 shadow-sm">
            
            {savedSuccess && (
              <div className="mb-6 bg-brand-green/10 border border-brand-green/20 text-brand-green px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-2">
                <Check className="w-4 h-4" /> Changes saved successfully!
              </div>
            )}

            {/* TAB 1: Channel Stats */}
            {activeTab === "stats" && (
              <div>
                <h2 className="font-heading text-xl font-bold mb-6 text-brand-text">Channel Snapshot & Rates</h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Subscribers</label>
                      <input type="text" defaultValue="10.1k" className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Monthly Views</label>
                      <input type="text" defaultValue="69.5k" className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Avg. Retention (%)</label>
                      <input type="text" defaultValue="27" className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Tutorials Uploaded</label>
                      <input type="text" defaultValue="224" className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-border">
                    <h3 className="font-heading font-bold mb-4 text-brand-text">Sponsorship Rates</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Tier 1 (Dedicated Video)</label>
                        <input type="text" defaultValue="$500" className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Tier 2 (Integration)</label>
                        <input type="text" defaultValue="$300" className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-brand-border">
                    <button type="button" onClick={handleSave} className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm text-sm">
                      <Save className="w-4 h-4" /> Save Stats & Rates
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 2: Tool Vault Manager */}
            {activeTab === "tools" && (
              <div>
                <h2 className="font-heading text-xl font-bold mb-6 text-brand-text">Add New AI Tool to Directory</h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Tool Name</label>
                    <input type="text" placeholder="e.g. Make.com" className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Category</label>
                    <select className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue">
                      <option>Automation</option>
                      <option>Video</option>
                      <option>Coding</option>
                      <option>Productivity</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Discount Code / Badge</label>
                    <input type="text" placeholder="e.g. 20% OFF or Code ARTIFICIAL" className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                  </div>
                  <div className="flex justify-end pt-6 border-t border-brand-border">
                    <button type="button" onClick={handleSave} className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm text-sm">
                      <Save className="w-4 h-4" /> Add Tool Entry
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* TAB 3: Blog Hub Manager */}
            {activeTab === "blog" && (
              <div>
                <h2 className="font-heading text-xl font-bold mb-6 text-brand-text">Publish Video Script Article</h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">Article Title</label>
                    <input type="text" placeholder="e.g. How to Automate Shorts with Make.com" className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-brand-text mb-2 uppercase tracking-wider">YouTube Video URL</label>
                    <input type="text" placeholder="https://youtube.com/watch?v=..." className="w-full border border-brand-border bg-white text-brand-text rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-brand-blue" />
                  </div>
                  <div className="flex justify-end pt-6 border-t border-brand-border">
                    <button type="button" onClick={handleSave} className="bg-brand-blue hover:bg-brand-blue-hover text-white font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors shadow-sm text-sm">
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
