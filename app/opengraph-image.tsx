import { ImageResponse } from "next/og";
import aboutData from "@/data/about.json";

export const alt = `${aboutData.name} — ${aboutData.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Palette mirrors the site's design tokens
const PAPER = "#FBFAF7";
const INK = "#1A1A18";
const ACCENT = "#34564A";
const STONE = "#6A6657";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          backgroundImage: `radial-gradient(1000px 500px at 80% -20%, rgba(52,86,74,0.10), transparent 70%)`,
          padding: "80px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top row: monogram */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 16,
              backgroundColor: INK,
              color: PAPER,
              fontSize: 30,
            }}
          >
            KL
          </div>
        </div>

        {/* Middle: name + role */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: ACCENT,
              fontFamily: "system-ui, sans-serif",
            }}
          >
            {`${aboutData.title} · ${aboutData.department}`}
          </div>
          <div
            style={{
              fontSize: 104,
              color: INK,
              lineHeight: 1.05,
              marginTop: 20,
            }}
          >
            {aboutData.name}
          </div>
          <div style={{ fontSize: 34, color: STONE, marginTop: 18 }}>
            {aboutData.affiliation}
          </div>
        </div>

        {/* Bottom: research interests */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {aboutData.researchInterests.en.map((interest) => (
            <div
              key={interest}
              style={{
                display: "flex",
                fontSize: 24,
                color: STONE,
                border: "1px solid rgba(26,26,24,0.15)",
                borderRadius: 999,
                padding: "8px 22px",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {interest}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
