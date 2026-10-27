import type { Metadata } from "next";
import { LinksClient } from "./links-client";
import { bioProfile } from "@/app/data/links";

export const metadata: Metadata = {
  title: "Links & Bio | Adee Shaikh",
  description:
    "Explore projects, technical essays, products, and social links of Adee Shaikh — software developer and product builder.",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    title: "Adee Shaikh | Links & Bio",
    description:
      "Software developer & product builder. Explore projects, native macOS utilities, modern web apps, and contact links.",
    url: "https://itsadee.com/links",
    siteName: "itsadee.com",
    locale: "en_US",
    type: "profile",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Adee Shaikh | Links & Bio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adee Shaikh | Links & Bio",
    description:
      "Software developer & product builder. Explore projects, native macOS utilities, modern web apps, and contact links.",
    site: "@hey_itsadee",
    creator: "@hey_itsadee",
    images: ["/opengraph-image"],
  },
};

export default function LinksPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: bioProfile.name,
      alternateName: "Adee",
      url: "https://itsadee.com",
      image: "https://itsadee.com/avatar.png",
      jobTitle: "Software Developer",
      description: bioProfile.tagline,
      sameAs: [
        "https://instagram.com/shaikh__adee",
        "https://github.com/adee1455",
        "https://x.com/hey_itsadee",
        "https://www.linkedin.com/in/adeeshaikh",
      ],
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LinksClient />
    </main>
  );
}
