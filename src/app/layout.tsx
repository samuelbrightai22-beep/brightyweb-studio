import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const siteUrl = "https://brightyweb.space-z.ai";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Brightyweb — Professional Web Design Studio",
    template: "%s — Brightyweb",
  },
  description:
    "Brightyweb is a professional web design studio. Modern, responsive websites designed around your brand, your audience and your goals. Deployed from $11/year hosting.",
  keywords: [
    "web design studio",
    "website design",
    "website redesign",
    "landing page design",
    "business website design",
    "ecommerce website design",
    "professional web designer",
    "responsive web design",
  ],
  authors: [{ name: "Brightyweb Studio" }],
  creator: "Brightyweb Studio",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
  openGraph: {
    title: "Brightyweb — Professional Web Design Studio",
    description:
      "Modern, responsive websites designed around your brand, your audience and your goals. Deployed from $11/year hosting.",
    url: siteUrl,
    siteName: "Brightyweb",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Brightyweb — Professional Web Design Studio",
    description:
      "Modern, responsive websites designed around your brand, your audience and your goals.",
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased bg-[var(--paper)] text-[var(--ink)] font-sans`}
      >
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        <Toaster />
      </body>
    </html>
  );
}
