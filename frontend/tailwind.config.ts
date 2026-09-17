import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        heritage: {
          red: "#DC2626",
          redDark: "#991B1B",
          gold: "#F59E0B",
          goldDark: "#D97706",
          goldLight: "#FDE68A",
          parchment: "#FAF5E9",
          parchmentDark: "#1C1917",
          ink: "#292524",
          teal: "#0D9488",
          tealDark: "#115E59",
          forest: "#059669",
          ocean: "#0284C7"
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "parchment-pattern": "radial-gradient(#d97706 0.75px, transparent 0.75px)",
      },
      boxShadow: {
        "stamp": "0 0 20px rgba(220, 38, 38, 0.4)",
        "gold-glow": "0 0 25px rgba(245, 158, 11, 0.4)",
        "teal-glow": "0 0 25px rgba(13, 148, 136, 0.35)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
      },
      animation: {
        "stamp-drop": "stampDrop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 4s ease-in-out infinite"
      },
      keyframes: {
        stampDrop: {
          "0%": { transform: "scale(2.5) rotate(-15deg)", opacity: "0" },
          "70%": { transform: "scale(0.9) rotate(3deg)", opacity: "0.9" },
          "100%": { transform: "scale(1) rotate(0deg)", opacity: "1" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        }
      }
    },
  },
  plugins: [],
};
export default config;
