"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";
import { Sun, Moon, Laptop, Check } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  const options = [
    { value: "light", label: "Light", icon: Sun, color: "text-amber-500" },
    { value: "dark", label: "Dark", icon: Moon, color: "text-emerald-400" },
    { value: "system", label: "System", icon: Laptop, color: "text-emerald-600 dark:text-emerald-400" },
  ];

  const currentOption = options.find((opt) => opt.value === theme) || options[1];
  const CurrentIcon = currentOption.icon;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl bg-brand-card dark:bg-[#0f2820] border border-brand-border dark:border-[#1a3a30] text-brand-text dark:text-emerald-100 hover:bg-emerald-100/50 dark:hover:bg-[#16382c] transition-all flex items-center gap-1.5 shadow-sm"
        aria-label="Toggle theme menu"
        title={`Theme: ${currentOption.label}`}
      >
        <CurrentIcon className={`w-4 h-4 ${currentOption.color}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 py-1.5 bg-brand-card dark:bg-[#0d221b] border border-brand-border dark:border-[#1a3e33] rounded-xl shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
          {options.map((opt) => {
            const OptionIcon = opt.icon;
            const isSelected = theme === opt.value;

            return (
              <button
                key={opt.value}
                onClick={() => {
                  setTheme(opt.value);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                  isSelected
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                    : "text-brand-muted dark:text-zinc-300 hover:bg-emerald-50 dark:hover:bg-[#15342a] hover:text-brand-text dark:hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <OptionIcon className={`w-3.5 h-3.5 ${opt.color}`} />
                  <span>{opt.label}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-emerald-500" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
