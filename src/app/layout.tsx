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
  title: "Artificial Quotient — AI Automation Workflows",
  description: "Automated AI workflows for different industries",
  icons: {
    icon: "/favicon.svg",
  },
};

import { cookies } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("admin_session")?.value === "authenticated";

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${outfit.variable} ${caveat.variable} antialiased bg-brand-bg dark:bg-zinc-950 text-brand-text dark:text-zinc-100 font-body flex flex-col min-h-screen transition-colors duration-200 relative`}>
        {/* Global Ambient Background Glows */}
        <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-brand-blue/10 dark:bg-brand-blue/15 blur-[120px] rounded-full pointer-events-none z-0"></div>
        <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 dark:bg-indigo-500/15 blur-[140px] rounded-full pointer-events-none z-0"></div>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar isAdmin={isAdmin} />
          <main className="flex-grow relative z-10">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
