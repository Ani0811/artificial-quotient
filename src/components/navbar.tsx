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

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-brand-border dark:border-zinc-800 ${
          isOpen ? "max-h-64 border-t bg-brand-bg dark:bg-zinc-950 px-4 py-3" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-3">
          <Link
            href="/#brands"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white py-1.5 transition-colors"
          >
            Brands
          </Link>
          <Link
            href="/#stats"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white py-1.5 transition-colors"
          >
            Stats
          </Link>
          <Link
            href="/#case-studies"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white py-1.5 transition-colors"
          >
            Case Studies
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white py-1.5 transition-colors"
          >
            Contact
          </Link>
          <Link
            href={isAdmin ? "/admin" : "/admin/login?notice=not-admin"}
            onClick={() => setIsOpen(false)}
            className="text-sm font-bold text-emerald-500 py-1.5 flex items-center gap-1.5 transition-colors xs:hidden"
          >
            <Lock className="w-4 h-4" />
            <span>Admin Portal</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
