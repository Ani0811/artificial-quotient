export default function StructuredData() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://artificial-quotient.com";

  // 1. Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Artificial Quotient",
    url: siteUrl,
    logo: `${siteUrl}/logo/logo-removebg-preview.png`,
    description:
      "Premier AI automation media hub and sponsorship platform connecting high-performing SaaS brands with 10,000+ AI builders.",
    sameAs: [
      "https://www.youtube.com/@ArtificialQuotient01",
      "https://twitter.com/artificial_quotient"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "artificialquotient01@gmail.com",
      contactType: "customer service",
      availableLanguage: ["English"]
    }
  };

  // 2. WebSite Schema
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Artificial Quotient",
    url: siteUrl,
    description:
      "The premier hub for AI automation tutorials, workflow deep-dives, and SaaS sponsorship integrations.",
    publisher: {
      "@type": "Organization",
      name: "Artificial Quotient",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo/logo-removebg-preview.png`
      }
    }
  };

  // 3. Service Schema for AI Automation & Media Partnerships
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "AI Automation Workflows & SaaS Sponsorship Media",
    provider: {
      "@type": "Organization",
      name: "Artificial Quotient"
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Media & Automation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Dedicated YouTube Video Integration",
            description: "Deep-dive video workflow reviews showcasing SaaS platforms to 10,000+ automation builders."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Tools Vault Sponsorship",
            description: "Featured placement and deal promotion in the Artificial Quotient verified AI Tools Directory."
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom AI Workflow Development",
            description: "Tailored Make.com, n8n, and Python agent automation design and implementation."
          }
        }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    </>
  );
}
