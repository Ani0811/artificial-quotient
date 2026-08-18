"use client";

import React from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { ToolItem } from "@/types";

interface ToolsTabProps {
  toolsList: ToolItem[];
  setToolsList: React.Dispatch<React.SetStateAction<ToolItem[]>>;
  isViewer: boolean;
  onSave: () => Promise<void>;
}

export function ToolsTab({
  toolsList,
  setToolsList,
  isViewer,
  onSave,
}: ToolsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-heading font-bold text-sm text-brand-text dark:text-emerald-400 uppercase tracking-wider">AI Tool Vault Directory</h3>
        <button
          type="button"
          disabled={isViewer}
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
          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Tool Entry
        </button>
      </div>

      <div className="space-y-5">
        {toolsList.map((tool, idx) => (
          <div key={tool.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
            <button
              type="button"
              disabled={isViewer}
              onClick={() => setToolsList(toolsList.filter(t => t.id !== tool.id))}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
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
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...toolsList];
                    next[idx].name = e.target.value;
                    setToolsList(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Category</label>
                <input 
                  type="text" 
                  value={tool.category} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...toolsList];
                    next[idx].category = e.target.value;
                    setToolsList(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Discount Tag</label>
                <input 
                  type="text" 
                  value={tool.discount} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...toolsList];
                    next[idx].discount = e.target.value;
                    setToolsList(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">Description</label>
              <textarea 
                rows={2}
                value={tool.desc} 
                disabled={isViewer}
                onChange={(e) => {
                  const next = [...toolsList];
                  next[idx].desc = e.target.value;
                  setToolsList(next);
                }}
                className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm disabled:opacity-50" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Try Link URL</label>
                <input 
                  type="text" 
                  value={tool.tryUrl} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...toolsList];
                    next[idx].tryUrl = e.target.value;
                    setToolsList(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/60 mb-1">Tutorial URL</label>
                <input 
                  type="text" 
                  value={tool.tutorialUrl} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...toolsList];
                    next[idx].tutorialUrl = e.target.value;
                    setToolsList(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-lg px-2.5 py-1.5 text-xs disabled:opacity-50" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-5 border-t border-brand-border dark:border-[#16382e]">
        <button 
          type="button" 
          onClick={onSave} 
          disabled={isViewer}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Tool Directory
        </button>
      </div>
    </div>
  );
}
