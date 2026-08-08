"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Scroll to Top"
      className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl bg-emerald-600 dark:bg-emerald-500 text-white shadow-xl shadow-emerald-950/20 dark:shadow-emerald-950/50 border border-emerald-400/30 dark:border-emerald-300/30 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-emerald-500 dark:hover:bg-emerald-400 active:scale-95 flex items-center justify-center ${
        isVisible ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
