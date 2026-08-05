import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          bg: '#f0fdf4',             // Light mode background (subtle neon mint green)
          card: '#ffffff',           // Light mode card background
          dark: '#061612',           // Dark mode deep forest background (client YouTube banner)
          text: '#022c22',           // Light mode primary text (deep emerald)
          muted: '#047857',          // Light mode muted text
          blue: '#10b981',           // Main brand accent color (vibrant emerald / neon green)
          'blue-hover': '#059669',   // Main brand accent hover (darker emerald)
          green: '#34d399',          // Bright neon mint green
          orange: '#f97316',
          border: '#d1fae5'          // Light mode border (subtle mint border)
        }
      },
      fontFamily: {
        heading: ['var(--font-outfit)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
        handwritten: ['var(--font-caveat)', 'cursive']
      },
    },
  },
  plugins: [],
};
export default config;
