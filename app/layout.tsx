import type { Metadata } from "next";
import { Inter, Newsreader } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";
import aboutData from "@/data/about.json";
import { siteUrl } from "@/lib/site";

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

// Public-facing SEO identity. These strings are intentionally separate from
// data/about.json (which drives the visible UI and the CV PDF): they are the
// search-optimized title/description/keywords Google should index for, and the
// canonical scholarly framing used in the JSON-LD below.
const SITE_TITLE =
  "Kaiwen Luo | PhD Student in Operations Management | Washington University in St. Louis";
const SITE_DESCRIPTION =
  "Kaiwen Luo is a PhD student in Operations Management at Washington University in St. Louis. His research focuses on AI-mediated markets, digital platforms, credible exchange, artificial intelligence, and supply chain management.";
const SITE_KEYWORDS = [
  "Kaiwen Luo",
  "Operations Management",
  "Washington University",
  "WashU",
  "AI",
  "Digital Platforms",
  "Supply Chain",
  "Operations Research",
  "Economics",
  "Agentic Commerce",
  "Marketplace Design",
  "PhD",
];

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: SITE_TITLE,
    template: `%s | ${aboutData.name}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: aboutData.name, url: siteUrl }],
  creator: aboutData.name,
  publisher: aboutData.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "zh_CN",
    siteName: `${aboutData.name} — Academic Website`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

// Schema.org Person (JSON-LD). Helps Google build a Knowledge Graph entity for
// Kaiwen. `sameAs` only lists profile URLs that actually exist in the project
// (empty values in about.json are filtered out), per best practice.
const sameAs = [
  aboutData.googleScholar,
  aboutData.linkedin,
  aboutData.homepage,
].filter((url): url is string => Boolean(url) && url !== siteUrl);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: aboutData.name,
  url: siteUrl,
  image: `${siteUrl}/images/avatar.png`,
  jobTitle: "PhD Student",
  email: `mailto:${aboutData.email}`,
  worksFor: {
    "@type": "CollegeOrUniversity",
    name: "Washington University in St. Louis",
  },
  affiliation: {
    "@type": "EducationalOrganization",
    name: "Olin Business School",
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Washington University in St. Louis",
    },
  },
  knowsAbout: [
    "AI-mediated Markets",
    "Digital Platforms",
    "Operations Management",
    "Supply Chain",
    "Market Design",
  ],
  ...(sameAs.length > 0 ? { sameAs } : {}),
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}

