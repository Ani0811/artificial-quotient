"use client";

import Link from "next/link";
import { Sparkles, Lock } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface NavbarProps {
  isAdmin?: boolean;
}

export default function Navbar({ isAdmin = false }: NavbarProps) {
  return (
    <nav className="w-full border-b border-brand-border dark:border-zinc-800 bg-brand-bg/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-full bg-brand-dark dark:bg-zinc-800 flex items-center justify-center text-xl transition-transform group-hover:scale-105">
            🐼
          </div>
          <span className="font-heading font-bold text-lg tracking-tight text-brand-text dark:text-white">
            Artificial<span className="text-brand-blue">Quotient</span>
          </span>
        </Link>
        
        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/stats" className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors">
            Stats
          </Link>
          <Link href="/case-studies" className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors">
            Case Studies
          </Link>
          <Link href="/tools" className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors">
            Tool Vault
          </Link>
          <Link href="/blog" className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors">
            Blog
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {isAdmin && (
            <Link
              href="/admin"
              className="text-brand-muted hover:text-brand-text dark:text-zinc-400 dark:hover:text-white px-2 py-2 rounded-lg font-medium text-sm flex items-center gap-1.5 transition-colors"
            >
              <Lock className="w-4 h-4" />
              Admin
            </Link>
          )}

          <Link
            href="/sponsor"
            className="bg-brand-blue hover:bg-brand-blue-hover text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 transition-all shadow-sm"
          >
            <Sparkles className="w-4 h-4" />
            Become a Sponsor
          </Link>
        </div>
      </div>
    </nav>
  );
}
