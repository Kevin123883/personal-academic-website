import type { Metadata } from "next";
import aboutData from "@/data/about.json";

export const metadata: Metadata = {
  title: "Research",
  description: `Research publications and working papers by ${aboutData.name}`,
  alternates: {
    canonical: "/research",
  },
  openGraph: {
    title: `Research | ${aboutData.name}`,
    description: `Research publications and working papers by ${aboutData.name}`,
    url: "/research",
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
