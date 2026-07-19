/// <reference types="react/canary" />
import type { Metadata } from "next";
import { ViewTransition } from "react";
import { Zalando_Sans_SemiExpanded, Zalando_Sans_Expanded } from "next/font/google";
import SiteHeader from "@/app/components/SiteHeader";
import "./globals.css";

// Self-hosted via next/font — no render-blocking fonts.googleapis.com request,
// metric-adjusted fallbacks eliminate layout shift on font swap.
const sansBody = Zalando_Sans_SemiExpanded({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const sansDisplay = Zalando_Sans_Expanded({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const siteDescription =
  "On Board is the weekly digital bulletin board for your campus. Post, react, and connect — every week, a fresh board.";

export const metadata: Metadata = {
  metadataBase: new URL("https://onboardapp.org"),
  title: {
    default: "On Board – Your Community Board",
    template: "%s — On Board",
  },
  description: siteDescription,
  openGraph: {
    title: "On Board – Your Community Board",
    description: siteDescription,
    url: "https://onboardapp.org",
    siteName: "On Board",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "On Board – Your Community Board",
    description: siteDescription,
  },
};

// Structured data for search engines — the app itself plus the org behind it.
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "On Board",
      url: "https://onboardapp.org",
      logo: "https://onboardapp.org/icon.png",
    },
    {
      "@type": "MobileApplication",
      name: "On Board",
      operatingSystem: "iOS",
      applicationCategory: "SocialNetworkingApplication",
      description: siteDescription,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${sansBody.variable} ${sansDisplay.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#000000" media="(prefers-color-scheme: dark)" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || theme === 'light') {
                  document.documentElement.setAttribute('data-theme', theme);
                }
              } catch (_) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ViewTransition>
          <SiteHeader />
          {children}
        </ViewTransition>
      </body>
    </html>
  );
}
