import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        pixelify: ["Pixelify Sans", "sans-serif"],
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shadanim: {
          "0%": { backgroundPosition: "100% -100%" },
        },
        "pixel-shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
        "pixel-pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 6px rgba(250, 204, 21, 0.2)" },
          "50%": {
            boxShadow:
              "0 0 14px rgba(250, 204, 21, 0.6), 0 0 20px rgba(250, 204, 21, 0.2)",
          },
        },
        "pixel-pulse-silver": {
          "0%, 100%": { boxShadow: "0 0 4px rgba(163, 163, 163, 0.15)" },
          "50%": {
            boxShadow:
              "0 0 10px rgba(163, 163, 163, 0.4), 0 0 16px rgba(163, 163, 163, 0.15)",
          },
        },
        "pixel-pulse-bronze": {
          "0%, 100%": { boxShadow: "0 0 4px rgba(217, 119, 6, 0.15)" },
          "50%": {
            boxShadow:
              "0 0 10px rgba(217, 119, 6, 0.45), 0 0 16px rgba(217, 119, 6, 0.15)",
          },
        },
        "nav-glitch": {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "20%": { opacity: "0.7", transform: "translateX(-2px)" },
          "40%": { opacity: "1", transform: "translateX(2px)" },
          "60%": { opacity: "0.8", transform: "translateX(-1px)" },
          "80%": { opacity: "1", transform: "translateX(1px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "xp-shimmer": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        "node-ring-pulse": {
          "0%, 100%": { opacity: "0.2", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.15)" },
        },
        "timeline-travel": {
          "0%": { top: "0%", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        "twinkle-stars": {
          "0%": { opacity: "0.35" },
          "25%": { opacity: "0.55" },
          "50%": { opacity: "0.75" },
          "75%": { opacity: "0.5" },
          "100%": { opacity: "0.35" },
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "slide-up": "slide-up 0.6s ease-out forwards",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
        shadanim: "shadanim 15s linear infinite",
        "pixel-shimmer": "pixel-shimmer 3s ease-in-out infinite",
        "pixel-pulse-gold": "pixel-pulse-gold 3s ease-in-out infinite",
        "pixel-pulse-silver": "pixel-pulse-silver 3.5s ease-in-out infinite",
        "pixel-pulse-bronze": "pixel-pulse-bronze 3.2s ease-in-out infinite",
        "nav-glitch": "nav-glitch 0.3s steps(2) 1",
        "xp-shimmer": "xp-shimmer 2s ease-in-out infinite",
        "node-ring-pulse": "node-ring-pulse 3s ease-in-out infinite",
        "timeline-travel": "timeline-travel 6s linear infinite",
        "twinkle-stars": "twinkle-stars 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
