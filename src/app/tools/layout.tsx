import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tools Vault & Verified Directory",
  description:
    "Explore curated and verified AI automation tools, exclusive discounts, and hands-on video tutorials tested by Artificial Quotient.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "AI Tools Vault — Artificial Quotient",
    description: "Curated and verified AI automation tools, exclusive partner discounts, and workflow tutorials.",
    url: "/tools",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
