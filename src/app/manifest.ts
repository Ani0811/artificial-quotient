import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Artificial Quotient",
    short_name: "AQ AI Hub",
    description: "Premier AI automation tutorials, workflow deep-dives, and SaaS media hub.",
    start_url: "/",
    display: "standalone",
    background_color: "#061612",
    theme_color: "#10b981",
    icons: [
      {
        src: "/logo/logo-removebg-preview.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo/logo-removebg-preview.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
