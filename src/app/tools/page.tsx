"use client";

import { Search, ExternalLink, PlaySquare } from "lucide-react";
import { useEffect, useState } from "react";

interface ToolItem {
  id: string | number;
  name: string;
  category: string;
  desc: string;
  discount?: string | null;
  tryUrl?: string;
  tutorialUrl?: string;
  logo?: string;
}

export default function ToolsVault() {
  const [tools, setTools] = useState<ToolItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCat, setSelectedCat] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          if (data.tools) {
            setTools(data.tools);
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
      <div className="w-full py-16 px-4 bg-brand-bg dark:bg-zinc-950 min-h-screen transition-colors">
        <div className="max-w-6xl mx-auto space-y-8 animate-pulse">
          <div className="h-10 bg-emerald-500/10 rounded-lg w-64 mx-auto"></div>
          <div className="h-6 bg-emerald-500/10 rounded-lg w-96 mx-auto"></div>
          <div className="h-12 bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="h-48 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl"></div>
            <div className="h-48 bg-brand-card dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl"></div>
          </div>
        </div>
      </div>
    );
  }

  const categories = ["All", ...Array.from(new Set(tools.map(t => t.category || "General")))];

  const filtered = tools.filter(t => {
    const matchesCat = selectedCat === "All" || t.category === selectedCat;
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                          t.desc.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full py-16 px-4 bg-brand-bg dark:bg-zinc-950 min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text dark:text-white mb-4">
            AI Tool Vault
          </h1>
          <p className="text-brand-muted dark:text-zinc-400 font-medium text-lg max-w-2xl mx-auto">
            A curated directory of the exact tools we use and recommend for building AI workflows.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10 bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-brand-border dark:border-zinc-800 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCat === cat
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "bg-brand-bg dark:bg-zinc-950 text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted dark:text-zinc-400" />
            <input
              type="text"
              placeholder="Search tools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-brand-bg dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-brand-text dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Tools Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-zinc-900 border border-brand-border dark:border-zinc-800 rounded-2xl shadow-sm text-brand-muted dark:text-zinc-400">
            No tools found matching your filters.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filtered.map(tool => (
              <div key={tool.id} className="bg-brand-card dark:bg-zinc-900 rounded-2xl p-6 border border-brand-border dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 bg-white dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 rounded-xl flex items-center justify-center font-bold text-xl text-brand-text dark:text-white shadow-sm overflow-hidden">
                      {tool.logo ? (
                        <img src={tool.logo} alt={tool.name} className="w-full h-full object-contain p-1.5" />
                      ) : (
                        tool.name.charAt(0)
                      )}
                    </div>
                    {tool.discount && (
                      <span className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1 rounded-full">
                        {tool.discount}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-xl font-bold mb-1 text-brand-text dark:text-white group-hover:text-emerald-500 transition-colors">
                    {tool.name}
                  </h3>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3 block">
                    {tool.category}
                  </span>
                  <p className="text-brand-muted dark:text-zinc-400 text-sm mb-6">
                    {tool.desc}
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-brand-border dark:border-zinc-800">
                  {tool.tryUrl && (
                    <a
                      href={tool.tryUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      <span>Try {tool.name}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {tool.tutorialUrl && (
                    <a
                      href={tool.tutorialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 bg-brand-bg dark:bg-zinc-950 border border-brand-border dark:border-zinc-800 text-brand-text dark:text-white font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 hover:border-emerald-500/40 transition-all"
                    >
                      <PlaySquare className="w-3.5 h-3.5 text-red-500" />
                      <span>Watch Tutorial</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
