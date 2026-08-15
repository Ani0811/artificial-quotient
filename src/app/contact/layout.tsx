import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact & Partnerships",
  description:
    "Get in touch with Artificial Quotient for SaaS sponsorships, custom Make.com and n8n workflow development, and AI Tool Vault listings.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Partnerships — Artificial Quotient",
    description: "Get in touch with Artificial Quotient for sponsorships, custom AI automation workflows, and media partnerships.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://artificial-quotient.com";

  // Google FAQ Schema for Contact Page FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is your typical turnaround time for sponsorships?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Dedicated video integration scripts are aligned 1-2 weeks in advance. Production and publishing typically take 5-7 business days once product access is granted."
        }
      },
      {
        "@type": "Question",
        name: "Do you build custom AI automation workflows for businesses?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! We design, build, and optimize custom Make.com, n8n, and Python AI agent workflows tailored to your specific business operations."
        }
      },
      {
        "@type": "Question",
        name: "How can I get my AI tool featured in the Tool Vault?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Send us an inquiry with details about your tool. If it fits our standards and solves real workflow challenges for our audience, we'll feature it."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
