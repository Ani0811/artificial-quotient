import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Artificial Quotient",
  description: "Privacy policy for Artificial Quotient. Learn how we handle client data, sponsorship inquiries, and visitor information with security and transparency.",
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
