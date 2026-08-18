"use client";

import React from "react";
import { Zap, BarChart, Award, Sparkles, Database, Layers, Users, ShieldCheck } from "lucide-react";
import { AdminUser } from "@/types";

export type AdminTabType = "hero" | "stats" | "case-studies" | "what-performs" | "brands" | "users" | "backup";

interface AdminSidebarProps {
  activeTab: AdminTabType;
  setActiveTab: (tab: AdminTabType) => void;
  canEditUsers: boolean;
  canEditBackup: boolean;
  adminUsers: AdminUser[];
}

export function AdminSidebar({
  activeTab,
  setActiveTab,
  canEditUsers,
  canEditBackup,
  adminUsers,
}: AdminSidebarProps) {
  const navItems = [
    { id: "hero" as const, label: "Hero Card", longLabel: "Hero Snapshot Card", Icon: Zap, iconClass: "text-emerald-400" },
    { id: "stats" as const, label: "Stats & Rates", longLabel: "Channel Stats & Rates", Icon: BarChart, iconClass: "text-emerald-400" },
    { id: "case-studies" as const, label: "Case Studies", longLabel: "Sponsor Case Studies", Icon: Award, iconClass: "text-emerald-400" },
    { id: "what-performs" as const, label: "Performs", longLabel: "What Performs", Icon: Sparkles, iconClass: "text-emerald-400" },
    { id: "brands" as const, label: "Brands", longLabel: "Brands & Partners", Icon: Layers, iconClass: "text-emerald-400" },
    ...(canEditUsers
      ? [{ id: "users" as const, label: `Admins (${adminUsers.filter((u) => u.status === "Active").length})`, longLabel: `Admins & Permissions (${adminUsers.filter((u) => u.status === "Active").length})`, Icon: Users, iconClass: "text-emerald-400" }]
      : []),
    ...(canEditBackup
      ? [{ id: "backup" as const, label: "Backup", longLabel: "Backup & System", Icon: ShieldCheck, iconClass: "text-emerald-400" }]
      : []),
  ];

  return (
    <div className="lg:col-span-3">
      {/* Mobile horizontal tab strip */}
      <div className="flex lg:hidden gap-2 overflow-x-auto pb-2 scrollbar-none">
        {navItems.map(({ id, label, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
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
        {navItems.map(({ id, longLabel, Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3.5 px-5 py-3.5 rounded-xl text-left font-bold text-sm transition-all shadow-sm ${
              activeTab === id
                ? "bg-emerald-600 text-white shadow-emerald-600/20"
                : "bg-brand-card dark:bg-[#0c201a] border border-brand-border dark:border-[#16382e] text-brand-muted dark:text-emerald-200/70 hover:text-white hover:bg-emerald-50 dark:hover:bg-[#102922]"
            }`}
          >
            <Icon className="w-4 h-4 text-emerald-400" /> {longLabel}
          </button>
        ))}
      </div>
    </div>
  );
}
