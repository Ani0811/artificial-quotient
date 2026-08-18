"use client";

import React, { useState } from "react";
import { Users, Plus, Trash2, Eye, EyeOff, Save } from "lucide-react";
import { AdminUser } from "@/types";

interface UsersTabProps {
  adminUsers: AdminUser[];
  setAdminUsers: React.Dispatch<React.SetStateAction<AdminUser[]>>;
  isViewer: boolean;
  onSaveUsers: () => Promise<void>;
}

export function UsersTab({
  adminUsers,
  setAdminUsers,
  isViewer,
  onSaveUsers,
}: UsersTabProps) {
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});

  return (
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
          disabled={isViewer}
          onClick={() => {
            const newAdmin: AdminUser = {
              id: `admin-${Date.now()}`,
              name: "New Administrator",
              email: `admin${adminUsers.length + 1}@artificialquotient.com`,
              password: "",
              role: "Editor",
              permissions: ["hero", "case-studies", "what-performs", "brands"],
              recoveryKey: `AQ-SEC-${Math.floor(1000 + Math.random() * 9000)}`,
              status: "Active",
              lastLogin: new Date().toISOString(),
            };
            setAdminUsers([...adminUsers, newAdmin]);
          }}
          className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold px-4 py-2 rounded-xl text-xs sm:text-sm flex items-center gap-1.5 border border-emerald-500/30 shadow-sm hover:bg-emerald-500/20 transition-all shrink-0 disabled:opacity-50 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Admin User
        </button>
      </div>

      <div className="space-y-4">
        {adminUsers.map((user, idx) => (
          <div key={user.id} className="p-5 rounded-2xl border border-brand-border dark:border-[#16382e] bg-brand-bg dark:bg-[#061612] space-y-4 relative">
            <button
              type="button"
              disabled={isViewer}
              onClick={() => setAdminUsers(adminUsers.filter(u => u.id !== user.id))}
              className="absolute top-4 right-4 text-red-500 hover:text-red-600 p-1.5 bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
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
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...adminUsers];
                    next[idx].name = e.target.value;
                    setAdminUsers(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-semibold disabled:opacity-50" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-brand-muted dark:text-emerald-200/80 mb-1.5">
                  Email Address
                </label>
                <input 
                  type="email" 
                  value={user.email} 
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...adminUsers];
                    next[idx].email = e.target.value;
                    setAdminUsers(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-semibold disabled:opacity-50" 
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
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...adminUsers];
                    next[idx].status = e.target.value as "Active" | "Inactive";
                    setAdminUsers(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-semibold cursor-pointer disabled:opacity-50"
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
                  disabled={isViewer}
                  onChange={(e) => {
                    const next = [...adminUsers];
                    const newRole = e.target.value as "Super Admin" | "Editor" | "Viewer";
                    next[idx].role = newRole;
                    if (newRole === "Super Admin") {
                      next[idx].permissions = ["hero", "stats", "case-studies", "what-performs", "brands", "backup", "users"];
                    } else if (newRole === "Editor") {
                      next[idx].permissions = ["hero", "case-studies", "what-performs", "brands"];
                    } else {
                      next[idx].permissions = ["hero", "stats"];
                    }
                    setAdminUsers(next);
                  }}
                  className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-semibold cursor-pointer truncate disabled:opacity-50"
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
                    className="w-full border border-brand-border dark:border-[#16382e] bg-brand-card dark:bg-[#0c201a] text-brand-text dark:text-white rounded-xl px-3.5 py-2 text-sm font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50" 
                  />
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(user.recoveryKey);
                      alert(`Recovery Key copied: ${user.recoveryKey}`);
                    }}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold px-3 py-2 rounded-xl text-xs border border-emerald-500/30 shrink-0 cursor-pointer"
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
          onClick={onSaveUsers} 
          disabled={isViewer}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-emerald-500/20 flex items-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save &amp; Publish Admin Users
        </button>
      </div>
    </div>
  );
}
