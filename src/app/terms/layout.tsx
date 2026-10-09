import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Artificial Quotient",
  description: "Terms of service and sponsorship agreement guidelines for Artificial Quotient media partnerships, sponsored content, and client collaborations.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
