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
          bg: '#F9FAFB',
          card: '#FFFFFF',
          dark: '#18181B',
          text: '#111827',
          muted: '#6B7280',
          blue: '#3B82F6',
          'blue-hover': '#2563EB',
          green: '#10B981',
          orange: '#F97316',
          border: '#E5E7EB'
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
