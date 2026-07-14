import type { Metadata } from "next";
import SiteHeader from "@/app/components/SiteHeader";
import "./globals.css";

const siteDescription =
  "On Board is the weekly digital bulletin board for your campus. Post, react, and connect — every week, a fresh board.";

export const metadata: Metadata = {
  metadataBase: new URL("https://onboardapp.org"),
  title: "On Board — Your Campus Bulletin Board",
  description: siteDescription,
  openGraph: {
    title: "On Board — Your Campus Bulletin Board",
    description: siteDescription,
    url: "https://onboardapp.org",
    siteName: "On Board",
    type: "website",
    images: [{ url: "/icon.png", width: 512, height: 512, alt: "On Board" }],
  },
  twitter: {
    card: "summary",
    title: "On Board — Your Campus Bulletin Board",
    description: siteDescription,
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zalando+Sans+SemiExpanded:ital,wght@0,200..900;1,200..900&family=Zalando+Sans+Expanded:ital,wght@0,200..900;1,200..900&display=swap"
          rel="stylesheet"
        />
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
      </head>
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
