import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

export const metadata: Metadata = {
  metadataBase: new URL("https://itsadee.com"),
  title: "Adee Shaikh — Software developer & product-minded builder",
  description: "Adee Shaikh builds useful software from interface to launch across web, native macOS, and Web3.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Adee Shaikh — Software developer & product-minded builder",
    description: "Useful software, built from interface to launch.",
    url: "https://itsadee.com",
    siteName: "itsadee.com",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
