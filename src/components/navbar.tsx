"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lock, Menu, X, Sparkles, BarChart3, PlayCircle, Mail, ChevronRight } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { LogoImage } from "@/components/ui/logo-image";

import { handleSmoothScroll } from "@/lib/scroll";

interface NavbarProps {
  isAdmin?: boolean;
}

// Drawer rendered via portal so it escapes the nav's stacking context
function MobileDrawer({
  isOpen,
  onClose,
  isAdmin,
  isLoginPage,
}: {
  isOpen: boolean;
  onClose: () => void;
  isAdmin: boolean;
  isLoginPage: boolean;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div className="lg:hidden" style={{ position: "fixed", inset: 0, zIndex: 99999 }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div
        className="absolute top-0 right-0 bottom-0 w-[290px] max-w-[82vw] flex flex-col justify-between p-6 shadow-2xl border-l border-white/5 animate-slide-in"
        style={{ backgroundColor: "#061612" }}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/8">
            <Link
              href="/"
              onClick={(e) => {
                onClose();
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                  window.history.pushState(null, "", "/");
                }
              }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-xl overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-brand-dark dark:bg-zinc-800 flex-shrink-0 shadow-sm">
                <LogoImage 
                  alt="AQ Logo" 
                  width={32} 
                  height={32} 
                  className="w-full h-full object-contain p-0.5"
                />
              </div>
              <span className="font-heading font-bold text-sm tracking-tight text-white">
                Artificial<span className="text-emerald-500">Quotient</span>
              </span>
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1 mt-4">
            {[
              { href: "/#brands", targetId: "brands", label: "Brands", Icon: Sparkles },
              { href: "/#stats", targetId: "stats", label: "Stats", Icon: BarChart3 },
              { href: "/#case-studies", targetId: "case-studies", label: "Case Studies", Icon: PlayCircle },
              { href: "/contact", targetId: null, label: "Contact", Icon: Mail },
            ].map(({ href, targetId, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={(e) => {
                  onClose();
                  if (targetId) handleSmoothScroll(e, targetId);
                }}
                className="flex items-center justify-between p-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span className="text-sm font-semibold">{label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-300 transition-colors" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Footer CTAs */}
        <div className="space-y-3">
          {isAdmin ? (
            <Link
              href="/admin"
              onClick={onClose}
              className="flex items-center gap-2 p-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors border border-white/5"
            >
              <Lock className="w-4 h-4" />
              <span>Access Admin Portal</span>
            </Link>
          ) : (
            !isLoginPage && (
              <a
                href="https://www.youtube.com/@ArtificialQuotient01"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-600 text-white font-bold text-center text-sm py-3 rounded-xl transition-all shadow-md shadow-red-600/30"
              >
                <svg className="w-4 h-4 fill-current text-white shrink-0" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>Subscribe on YouTube</span>
              </a>
            )
          )}

          {!isLoginPage && (
            <a
              href="https://forms.gle/4uTUZkEi5o3iqYrs5"
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center text-sm py-3.5 rounded-xl transition-colors shadow-lg shadow-emerald-500/20"
            >
              Become a Sponsor
            </a>
          )}

          <p className="text-[10px] text-zinc-600 text-center pt-2">
            © 2026 Artificial Quotient
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Navbar({ isAdmin = false }: NavbarProps) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="w-full border-b border-brand-border dark:border-zinc-800 bg-brand-bg/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
                window.history.pushState(null, "", "/");
              }
            }}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-emerald-500/30 flex items-center justify-center bg-brand-dark dark:bg-zinc-800 transition-transform group-hover:scale-105 shadow-sm">
              <LogoImage 
                alt="Artificial Quotient Logo" 
                width={40} 
                height={40} 
                className="w-full h-full object-contain p-0.5"
              />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-brand-text dark:text-white">
              Artificial<span className="text-emerald-500">Quotient</span>
            </span>
          </Link>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            <Link 
              href="/#brands" 
              onClick={(e) => handleSmoothScroll(e, "brands")}
              className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors"
            >
              Brands
            </Link>
            <Link 
              href="/#stats" 
              onClick={(e) => handleSmoothScroll(e, "stats")}
              className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors"
            >
              Stats
            </Link>
            <Link 
              href="/#case-studies" 
              onClick={(e) => handleSmoothScroll(e, "case-studies")}
              className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors"
            >
              Case Studies
            </Link>
            <Link href="/contact" className="text-sm font-medium text-brand-muted dark:text-zinc-400 hover:text-brand-text dark:hover:text-white transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            {isAdmin ? (
              <Link
                href="/admin"
                className="text-brand-text dark:text-white hover:text-emerald-500 px-3.5 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors border border-brand-border dark:border-zinc-800 bg-brand-card dark:bg-zinc-900 shadow-sm hidden lg:flex"
              >
                <Lock className="w-3.5 h-3.5 text-emerald-500" />
                <span>Admin Portal</span>
              </Link>
            ) : (
              !isLoginPage && (
                <a
                  href="https://www.youtube.com/@ArtificialQuotient01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-red-600 via-rose-600 to-red-500 hover:from-red-500 hover:to-rose-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-sm shadow-red-600/20 hover:scale-105 active:scale-95 hidden lg:flex items-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5 fill-current text-white shrink-0" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>Subscribe</span>
                </a>
              )
            )}

            {!isLoginPage && (
              <a
                href="https://forms.gle/4uTUZkEi5o3iqYrs5"
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow-sm hidden lg:inline-flex"
              >
                Become a Sponsor
              </a>
            )}

            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl border border-brand-border dark:border-zinc-800 bg-brand-card dark:bg-zinc-900 text-brand-text dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer rendered in document.body via Portal */}
      <MobileDrawer
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        isAdmin={isAdmin}
        isLoginPage={isLoginPage}
      />
    </>
  );
}
