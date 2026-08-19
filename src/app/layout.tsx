import type { Metadata } from "next";
import { Inter, Outfit, Caveat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import StructuredData from "@/components/seo/structured-data";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://artificial-quotient.com";
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Artificial Quotient — Premier AI Automation & SaaS Media Hub",
    template: "%s | Artificial Quotient",
  },
  description:
    "The premier hub for AI automation tutorials, workflow deep-dives, and tool reviews. Connecting tech builders with high-performing SaaS.",
  keywords: [
    "AI Automation",
    "Make.com Workflows",
    "n8n Automation",
    "SaaS Sponsorships",
    "Artificial Quotient",
    "YouTube Sponsorships",
    "AI Tools Directory",
    "AI Agents",
    "Workflow Optimization"
  ],
  authors: [{ name: "Artificial Quotient", url: siteUrl }],
  creator: "Artificial Quotient",
  publisher: "Artificial Quotient",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
  },
  icons: {
    icon: [
      { url: "/logo/logo-removebg-preview.png?v=5", type: "image/png" },
      { url: "/logo-removebg-preview.png?v=5", type: "image/png" },
      { url: "/logo.png?v=5", type: "image/png" },
      { url: "/favicon.ico?v=5", sizes: "any" }
    ],
    shortcut: "/logo/logo-removebg-preview.png?v=5",
    apple: "/logo/logo-removebg-preview.png?v=5",
  },
  openGraph: {
    title: "Artificial Quotient — Premier AI Automation & SaaS Media Hub",
    description:
      "Connecting high-performing SaaS brands with 10,000+ AI builders through dedicated video breakdowns and workflow integrations.",
    url: siteUrl,
    siteName: "Artificial Quotient",
    images: [
      {
        url: "/logo/logo-removebg-preview.png",
        width: 800,
        height: 800,
        alt: "Artificial Quotient Logo",
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
    creator: "@artificial_quotient",
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
        {/* Google Tag Manager */}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');`
            }}
          />
        )}
        {/* End Google Tag Manager */}
        <link rel="icon" href="/logo/logo-removebg-preview.png?v=5" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/logo/logo-removebg-preview.png?v=5" type="image/png" />
        <link rel="apple-touch-icon" href="/logo/logo-removebg-preview.png?v=5" />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} ${outfit.variable} ${caveat.variable} antialiased bg-brand-bg dark:bg-[#061612] text-brand-text dark:text-emerald-50 font-body flex flex-col min-h-screen transition-colors duration-200 relative`}>
        {/* Google Tag Manager (noscript) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {/* End Google Tag Manager (noscript) */}
        <GoogleAnalytics />
        <StructuredData />
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

