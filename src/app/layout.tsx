import type { Metadata } from "next";
import { Inter, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://artificial-quotient.com"),
  title: {
    default: "Artificial Quotient — Premier AI Automation & SaaS Media Hub",
    template: "%s | Artificial Quotient",
  },
  description:
    "The premier hub for AI automation tutorials, workflow deep-dives, and tool reviews. Connecting tech builders with high-performing SaaS.",
  keywords: [
    "AI Automation",
    "Make.com Workflows",
    "SaaS Sponsorships",
    "Artificial Quotient",
    "YouTube Sponsorships",
    "AI Tools Directory",
  ],
  authors: [{ name: "Artificial Quotient" }],
  icons: {
    icon: [
      { url: "/logo/logo-removebg-preview.png?v=4", type: "image/png" },
      { url: "/logo-removebg-preview.png?v=4", type: "image/png" },
      { url: "/logo.png?v=4", type: "image/png" },
      { url: "/favicon.ico?v=4", sizes: "any" }
    ],
    shortcut: "/logo/logo-removebg-preview.png?v=4",
    apple: "/logo/logo-removebg-preview.png?v=4",
  },
  openGraph: {
    title: "Artificial Quotient — Premier AI Automation & SaaS Media Hub",
    description:
      "Connecting high-performing SaaS brands with 10,000+ AI builders through dedicated video breakdowns and workflow integrations.",
    siteName: "Artificial Quotient",
    images: [
      {
        url: "/logo/logo-removebg-preview.png",
        width: 800,
        height: 800,
        alt: "Artificial Quotient",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artificial Quotient — Premier AI Automation & SaaS Media Hub",
    description:
      "Connecting high-performing SaaS brands with 10,000+ AI builders through dedicated video breakdowns and workflow integrations.",
    images: ["/logo/logo-removebg-preview.png"],
  },
};

import { cookies } from "next/headers";
import FontProvider from "@/components/font-provider";
import ScrollToTop from "@/components/scroll-to-top";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  const isAdmin = session?.value === "authenticated";

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo/logo-removebg-preview.png?v=4" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/logo/logo-removebg-preview.png?v=4" type="image/png" />
        <link rel="apple-touch-icon" href="/logo/logo-removebg-preview.png?v=4" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${outfit.variable} ${caveat.variable} antialiased bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-emerald-50 font-body flex flex-col min-h-screen transition-colors duration-200 relative`}>
        {/* Global Ambient Background Glows */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/15 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 dark:bg-emerald-700/15 blur-[140px] rounded-full pointer-events-none z-0"></div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <FontProvider>
            <Navbar isAdmin={isAdmin} />
            <main className="flex-grow relative z-10">
              {children}
            </main>
            <Footer />
            <ScrollToTop />
          </FontProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
