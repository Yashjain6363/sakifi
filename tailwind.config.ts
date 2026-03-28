import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
        display: ["var(--font-cal)", ...fontFamily.sans],
      },
      colors: {
        obsidian: {
          DEFAULT: "#0A0A0F",
          50: "#f5f5f7",
          100: "#e8e8ef",
          200: "#c9c9d9",
          300: "#9999b3",
          400: "#66668c",
          500: "#444466",
          600: "#333350",
          700: "#22223a",
          800: "#141424",
          900: "#0A0A0F",
          950: "#050508",
        },
        rose: {
          DEFAULT: "#E8758A",
          50: "#fdf2f4",
          100: "#fce7eb",
          200: "#f9d0da",
          300: "#f4a8bc",
          400: "#ec7799",
          500: "#E8758A",
          600: "#d44a6b",
          700: "#b23558",
          800: "#952e4e",
          900: "#7e2a46",
        },
        violet: {
          DEFAULT: "#8B5CF6",
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8B5CF6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        gold: {
          DEFAULT: "#C9A96E",
          light: "#E8D5A3",
          dark: "#9B7A3E",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-gradient": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.3), transparent), radial-gradient(ellipse 50% 50% at 80% 80%, rgba(232,117,138,0.15), transparent)",
        "glow-rose": "radial-gradient(circle, rgba(232,117,138,0.4) 0%, transparent 70%)",
        "glow-violet": "radial-gradient(circle, rgba(139,92,246,0.4) 0%, transparent 70%)",
        "glow-gold": "radial-gradient(circle, rgba(201,169,110,0.4) 0%, transparent 70%)",
        "glow-emerald": "radial-gradient(circle, rgba(16,185,129,0.4) 0%, transparent 70%)",
        "glow-amber": "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)",
        "glow-pink": "radial-gradient(circle, rgba(236,72,153,0.4) 0%, transparent 70%)",
        "card-gradient": "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "section-gradient": "linear-gradient(180deg, rgba(10,10,15,0) 0%, rgba(10,10,15,1) 100%)",
        "pink-gradient": "linear-gradient(135deg, #f472b6 0%, #fb7185 100%)",
        "emerald-gradient": "linear-gradient(135deg, #34d399 0%, #059669 100%)",
        "amber-gradient": "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "fade-in": "fadeIn 0.4s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "particle-drift": "particleDrift 8s ease-in-out infinite",
        "shimmer": "shimmer 2s linear infinite",
        "border-flow": "borderFlow 4s linear infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        glowPulse: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        particleDrift: {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "33%": { transform: "translateY(-8px) translateX(4px)" },
          "66%": { transform: "translateY(4px) translateX(-4px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        borderFlow: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      boxShadow: {
        "glow-rose": "0 0 40px rgba(232,117,138,0.3), 0 0 80px rgba(232,117,138,0.1)",
        "glow-violet": "0 0 40px rgba(139,92,246,0.3), 0 0 80px rgba(139,92,246,0.1)",
        "glow-gold": "0 0 40px rgba(201,169,110,0.3)",
        "card": "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset",
        "card-hover": "0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.08) inset",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
};

export default config;