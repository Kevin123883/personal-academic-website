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

export const metadata: Metadata = {
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
    url: "https://kaiwenluo.ink", // Update with actual URL
  },
  twitter: {
    card: "summary",
    title: `${aboutData.name} - ${aboutData.title}`,
    description: aboutData.bio.en,
  },
  alternates: {
    canonical: "https://kaiwenluo.ink", // Update with actual URL
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <body className="font-sans antialiased">
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}

