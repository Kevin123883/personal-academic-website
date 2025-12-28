import type { Metadata } from "next";
import aboutData from "@/data/about.json";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact information for ${aboutData.name} at ${aboutData.affiliation}`,
  openGraph: {
    title: `Contact | ${aboutData.name}`,
    description: `Contact information for ${aboutData.name} at ${aboutData.affiliation}`,
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
