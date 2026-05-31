import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";
import aboutData from "@/data/about.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

// Set NEXT_PUBLIC_SITE_URL in your deployment (e.g. Vercel env vars) to your
// real domain. Falls back to a sensible default so nothing breaks locally.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://kaiwenluo.me";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${aboutData.name} - ${aboutData.title}`,
    template: `%s | ${aboutData.name}`,
  },
  description: aboutData.bio.en,
  keywords: [
    aboutData.name,
    aboutData.department,
    aboutData.affiliation,
    ...aboutData.researchInterests.en,
  ],
  authors: [{ name: aboutData.name }],
  creator: aboutData.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    siteName: `${aboutData.name} - Academic Website`,
    title: `${aboutData.name} - ${aboutData.title}`,
    description: aboutData.bio.en,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${aboutData.name} - ${aboutData.title}`,
    description: aboutData.bio.en,
  },
  alternates: {
    canonical: siteUrl,
  },
};

// Runs before first paint to set the theme class, preventing a light-mode
// flash for visitors who prefer (or previously chose) dark mode.
const themeScript = `(function(){try{var k='washu-academic-website-theme';var s=localStorage.getItem(k);var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans antialiased">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}

