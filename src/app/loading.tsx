"use client";

export default function Loading() {
  return (
    <div className="w-full min-h-[calc(100vh-8rem)] flex flex-col items-center justify-center p-6 relative overflow-hidden bg-brand-bg dark:bg-[#061612] transition-colors duration-200">
      {/* Background glowing orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-[100px] pointer-events-none"></div>

      <div className="flex flex-col items-center justify-center relative z-10 space-y-6">
        {/* Animated logo loader */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-brand-card dark:bg-[#0c201a] overflow-hidden flex items-center justify-center shadow-lg border border-brand-border dark:border-[#16382e]">
            <img 
              src="/logo/logo-removebg-preview.png" 
              alt="Artificial Quotient Logo" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const t = e.currentTarget;
                if (t.src.includes("/logo/logo-removebg-preview.png")) {
                  t.src = "/logo-removebg-preview.png";
                } else if (t.src.includes("/logo-removebg-preview.png")) {
                  t.src = "/logo.png";
                }
              }}
            />
          </div>
          <div className="absolute -inset-2 rounded-3xl border-2 border-emerald-500/30 border-t-emerald-500 animate-spin [animation-duration:1.2s]"></div>
        </div>

        {/* Text indicators */}
        <div className="text-center space-y-1">
          <h2 className="font-heading text-lg font-bold text-brand-text dark:text-white tracking-wide">
            Artificial<span className="text-emerald-500">Quotient</span>
          </h2>
          <p className="text-brand-muted dark:text-emerald-200/60 text-xs font-medium tracking-widest uppercase">
            Loading Workflows...
          </p>
        </div>
      </div>
    </div>
  );
}
