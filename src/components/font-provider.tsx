"use client";

import { useEffect } from "react";

export interface FontConfig {
  heading: string;
  body: string;
  handwritten: string;
}

export const DEFAULT_FONTS: FontConfig = {
  heading: "Outfit",
  body: "Inter",
  handwritten: "Caveat",
};

export const QUOTE_FONT_OPTIONS = [
  { label: "Roboto (Clean Geometric)", value: "Roboto" },
  { label: "Caveat (Default Casual)", value: "Caveat" },
  { label: "Dancing Script (Fluid Cursive)", value: "Dancing Script" },
  { label: "Pacifico (Fun Bold Brush)", value: "Pacifico" },
  { label: "Satisfy (Classic Cursive)", value: "Satisfy" },
  { label: "Kalam (Marker Script)", value: "Kalam" },
  { label: "Permanent Marker (Bold Marker)", value: "Permanent Marker" },
  { label: "Playfair Display (Serif)", value: "Playfair Display" },
  { label: "Outfit (Modern Clean)", value: "Outfit" },
  { label: "Inter (Standard Tech)", value: "Inter" },
  { label: "Roboto Serif (Editorial Serif)", value: "Roboto Serif" },
  { label: "Roboto Slab (Modern Slab)", value: "Roboto Slab" },
  { label: "Roboto Mono (Monospace)", value: "Roboto Mono" },
];

export function loadGoogleFont(fontName: string) {
  if (typeof window === "undefined" || !fontName) return;
  const id = `gfont-${fontName.replace(/\s+/g, "-").toLowerCase()}`;
  if (document.getElementById(id)) return;

  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontName)}:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap`;
  document.head.appendChild(link);
}

export function applyFonts(fonts: FontConfig) {
  if (typeof window === "undefined") return;

  const fontFamilies = Array.from(new Set([fonts.heading || "Outfit", fonts.body || "Inter", fonts.handwritten || "Caveat"]));
  const fontQuery = fontFamilies
    .map((f) => `family=${encodeURIComponent(f)}:wght@400;500;600;700;800`)
    .join("&");

  const linkId = "dynamic-google-fonts";
  let linkEl = document.getElementById(linkId) as HTMLLinkElement | null;
  if (!linkEl) {
    linkEl = document.createElement("link");
    linkEl.id = linkId;
    linkEl.rel = "stylesheet";
    document.head.appendChild(linkEl);
  }
  linkEl.href = `https://fonts.googleapis.com/css2?${fontQuery}&display=swap`;

  const root = document.documentElement;
  root.style.setProperty("--font-heading", `'${fonts.heading || "Outfit"}', sans-serif`);
  root.style.setProperty("--font-body", `'${fonts.body || "Inter"}', sans-serif`);
  root.style.setProperty("--font-handwritten", `'${fonts.handwritten || "Caveat"}', cursive`);
}

export default function FontProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    async function loadSiteFonts() {
      try {
        const res = await fetch("/api/admin/data");
        if (res.ok) {
          const data = await res.json();
          if (data.fonts) {
            applyFonts(data.fonts);
          }
          if (data.sponsorResults) {
            data.sponsorResults.forEach((s: { quoteFont?: string }) => {
              if (s.quoteFont) loadGoogleFont(s.quoteFont);
            });
          }
        }
      } catch {
        // Fallback to default fonts
      }
    }
    loadSiteFonts();
  }, []);

  return <>{children}</>;
}
