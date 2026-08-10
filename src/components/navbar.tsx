"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

interface NavbarProps {
  isAdmin?: boolean;
}

export default function Navbar({ isAdmin = false }: NavbarProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b border-brand-border dark:border-zinc-800 bg-brand-bg/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-brand-dark dark:bg-zinc-800 transition-transform group-hover:scale-105 shadow-sm">
            <img src="/logo/logo.jpeg" alt="Artificial Quotient Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-heading font-bold text-lg tracking-tight text-brand-text dark:text-white">
            Artificial<span className="text-emerald-500">Quotient</span>
          </span>
        </Link>
        
        {/* Nav Links (Desktop) */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#brands" className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors">
            Brands
          </Link>
          <Link href="/#stats" className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors">
            Stats
          </Link>
          <Link href="/#case-studies" className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors">
            Case Studies
          </Link>
          <Link href="/contact" className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors">
            Contact
          </Link>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          <Link
            href={isAdmin ? "/admin" : "/admin/login?notice=not-admin"}
            className="text-brand-text dark:text-white hover:text-emerald-500 px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors border border-brand-border dark:border-zinc-800 bg-brand-card dark:bg-zinc-900 shadow-sm hidden xs:flex"
          >
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>Admin Portal</span>
          </Link>

          {!isLoginPage && (
            <a
              href="https://forms.gle/4uTUZkEi5o3iqYrs5"
              target="_blank"
              rel="noreferrer"
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm hidden sm:inline-flex"
            >
              Become a Sponsor
            </a>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-xl border border-brand-border dark:border-zinc-800 bg-brand-card dark:bg-zinc-900 text-brand-text dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle Mobile Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 w-full h-screen z-50 flex flex-col justify-between p-6 md:hidden"
          style={{ backgroundColor: "#061612" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-zinc-900">
                <img src="/logo/logo.jpeg" alt="Artificial Quotient Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-heading font-bold text-lg tracking-tight text-white">
                Artificial<span className="text-emerald-500">Quotient</span>
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-xl border border-zinc-800 bg-zinc-900 text-white hover:bg-zinc-800 transition-colors"
              aria-label="Close Mobile Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-6 my-auto py-8">
            <Link
              href="/#brands"
              onClick={() => setIsOpen(false)}
              className="font-heading text-3xl font-bold text-zinc-400 hover:text-white transition-colors flex items-center justify-between group"
            >
              <span>Brands</span>
              <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
            </Link>
            <Link
              href="/#stats"
              onClick={() => setIsOpen(false)}
              className="font-heading text-3xl font-bold text-zinc-400 hover:text-white transition-colors flex items-center justify-between group"
            >
              <span>Stats</span>
              <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
            </Link>
            <Link
              href="/#case-studies"
              onClick={() => setIsOpen(false)}
              className="font-heading text-3xl font-bold text-zinc-400 hover:text-white transition-colors flex items-center justify-between group"
            >
              <span>Case Studies</span>
              <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="font-heading text-3xl font-bold text-zinc-400 hover:text-white transition-colors flex items-center justify-between group"
            >
              <span>Contact</span>
              <span className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">&rarr;</span>
            </Link>
            <Link
              href={isAdmin ? "/admin" : "/admin/login?notice=not-admin"}
              onClick={() => setIsOpen(false)}
              className="font-heading text-xl font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-2 pt-4 border-t border-zinc-800"
            >
              <Lock className="w-5 h-5" />
              <span>Admin Portal</span>
            </Link>
          </div>

          {/* Footer Call to Action / Socials */}
          <div className="space-y-4">
            {!isLoginPage && (
              <a
                href="https://forms.gle/4uTUZkEi5o3iqYrs5"
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center py-4 rounded-2xl transition-all shadow-lg shadow-emerald-500/25"
              >
                Become a Sponsor
              </a>
            )}
            <p className="text-xs text-zinc-500 text-center">
              © 2026 Artificial Quotient. All rights reserved.
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
