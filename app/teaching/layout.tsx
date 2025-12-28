import type { Metadata } from "next";
import aboutData from "@/data/about.json";

export const metadata: Metadata = {
  title: "Teaching",
  description: `Teaching experience and courses by ${aboutData.name}`,
  openGraph: {
    title: `Teaching | ${aboutData.name}`,
    description: `Teaching experience and courses by ${aboutData.name}`,
  },
};

export default function TeachingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
