import type { Metadata } from "next";
import aboutData from "@/data/about.json";

export const metadata: Metadata = {
  title: "News",
  description: `Latest news, conferences, and awards for ${aboutData.name}`,
  openGraph: {
    title: `News | ${aboutData.name}`,
    description: `Latest news, conferences, and awards for ${aboutData.name}`,
  },
};

export default function NewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
