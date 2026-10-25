import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e12" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://itsadee.com"),
  title: {
    default: "Adee Shaikh | Software Developer & Product Builder",
    template: "%s | Adee Shaikh",
  },
  description:
    "Portfolio and technical essays of Adee Shaikh, a software developer and product-minded builder crafting native macOS utilities, modern web applications, and decentralized systems.",
  applicationName: "Adee Shaikh Portfolio",
  authors: [{ name: "Adee Shaikh", url: "https://itsadee.com" }],
  generator: "Next.js",
  keywords: [
    "Adee Shaikh",
    "Software Developer",
    "Product Engineer",
    "macOS Developer",
    "Swift",
    "AppKit",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Web3",
    "Solidity",
    "Fettle macOS",
    "StandBy Web",
    "Software Portfolio",
    "Technical Writing",
  ],
  referrer: "origin-when-cross-origin",
  creator: "Adee Shaikh",
  publisher: "Adee Shaikh",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Adee Shaikh | Software Developer & Product Builder",
    description:
      "Software developer and product-minded builder crafting high-craft native macOS utilities, web applications, and distributed systems.",
    url: "https://itsadee.com",
    siteName: "itsadee.com",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Adee Shaikh | Software Developer & Product Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adee Shaikh | Software Developer & Product Builder",
    description:
      "Software developer and product-minded builder crafting high-craft native macOS utilities, web applications, and distributed systems.",
    site: "@hey_itsadee",
    creator: "@hey_itsadee",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Adee Shaikh | Software Developer & Product Builder",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
