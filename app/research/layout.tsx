import type { Metadata } from "next";
import aboutData from "@/data/about.json";

export const metadata: Metadata = {
  title: "Research",
  description: `Research publications and working papers by ${aboutData.name}`,
  openGraph: {
    title: `Research | ${aboutData.name}`,
    description: `Research publications and working papers by ${aboutData.name}`,
  },
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
