import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm editorial neutrals — the foundation of the "quiet luxury" look
        paper: "#FBFAF7",
        ink: "#1A1A18",
        // A single restrained accent: muted forest green (a whisper of WashU, not a shout)
        accent: {
          DEFAULT: "#34564A",
          soft: "#4A6E60",
        },
        // Warm grey scale for text & hairlines
        stone: {
          50: "#F7F6F2",
          100: "#EEEDE7",
          200: "#E0DED6",
          300: "#C9C6BB",
          400: "#A8A496",
          500: "#86826F",
          600: "#6A6657",
          700: "#4F4C40",
          800: "#36342B",
          900: "#22211B",
        },
        // Kept for backward compatibility, remapped to the muted accent
        "washu-green": "#34564A",
        "washu-red": "#8A3B36",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      maxWidth: {
        prose: "68ch",
      },
      boxShadow: {
        card: "0 1px 2px rgba(26,26,24,0.04), 0 8px 24px -12px rgba(26,26,24,0.12)",
        "card-hover":
          "0 1px 2px rgba(26,26,24,0.05), 0 18px 40px -16px rgba(26,26,24,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.9s ease-out both",
      },
    },
  },
  plugins: [],
};
export default config;
