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
        void: { black: "#030007", dark: "#060010", medium: "#0a0018" },
        cursed: { purple: "#7c3aed", light: "#9f5ffa", dark: "#5b21b6" },
        electric: { blue: "#0ea5e9", bright: "#38bdf8", deep: "#0369a1" },
        crimson: { DEFAULT: "#dc2626", bright: "#ef4444" },
        neon: { cyan: "#06b6d4", gold: "#f59e0b", pink: "#ec4899" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["'Courier New'", "monospace"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "energy-flow": "energyFlow 3s linear infinite",
        "border-flow": "borderFlow 4s linear infinite",
        "portal-spin": "portalSpin 20s linear infinite",
        "portal-spin-r": "portalSpin 15s linear infinite reverse",
        "rise": "rise 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "particle-drift": "particleDrift 8s ease-in-out infinite",
        "scan-line": "scanLine 10s linear infinite",
        "glitch-1": "glitch1 3s infinite",
        "glitch-2": "glitch2 3s infinite",
        "shimmer": "shimmer 2s linear infinite",
        "rotate-slow": "rotateSlow 30s linear infinite",
        "text-reveal": "textReveal 0.8s cubic-bezier(0.16,1,0.3,1) forwards",
        "node-pulse": "nodePulse 2s ease-in-out infinite",
        "data-flow": "dataFlow 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: "0.5", filter: "blur(4px)" },
          "50%": { opacity: "1", filter: "blur(10px)" },
        },
        energyFlow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        borderFlow: {
          "0%,100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        portalSpin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(60px) skewY(2deg)" },
          "100%": { opacity: "1", transform: "translateY(0px) skewY(0deg)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        particleDrift: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(12px,-18px) scale(1.1)" },
          "66%": { transform: "translate(-8px,10px) scale(0.9)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100vh)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch1: {
          "0%,80%,100%": { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)", transform: "translate(0)" },
          "82%": { clipPath: "polygon(0 15%,100% 15%,100% 40%,0 40%)", transform: "translate(-4px,0)" },
          "84%": { clipPath: "polygon(0 60%,100% 60%,100% 75%,0 75%)", transform: "translate(4px,0)" },
          "86%": { clipPath: "polygon(0 30%,100% 30%,100% 55%,0 55%)", transform: "translate(-2px,0)" },
        },
        glitch2: {
          "0%,78%,100%": { clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)", transform: "translate(0)" },
          "80%": { clipPath: "polygon(0 50%,100% 50%,100% 70%,0 70%)", transform: "translate(4px,0)" },
          "82%": { clipPath: "polygon(0 10%,100% 10%,100% 30%,0 30%)", transform: "translate(-4px,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        rotateSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        textReveal: {
          "0%": { opacity: "0", transform: "translateY(100%)", filter: "blur(10px)" },
          "100%": { opacity: "1", transform: "translateY(0%)", filter: "blur(0px)" },
        },
        nodePulse: {
          "0%,100%": { boxShadow: "0 0 10px rgba(124,58,237,0.4)", transform: "scale(1)" },
          "50%": { boxShadow: "0 0 30px rgba(124,58,237,0.9), 0 0 60px rgba(124,58,237,0.4)", transform: "scale(1.05)" },
        },
        dataFlow: {
          "0%": { strokeDashoffset: "200" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "void-bg": "radial-gradient(ellipse at center,#0a0018 0%,#030007 70%)",
        "cursed-gradient": "linear-gradient(135deg,#7c3aed,#4c1d95)",
        "energy-gradient": "linear-gradient(90deg,#7c3aed,#0ea5e9,#06b6d4,#7c3aed)",
        "fire-gradient": "linear-gradient(135deg,#dc2626,#f59e0b,#7c3aed)",
      },
      boxShadow: {
        "cursed": "0 0 20px rgba(124,58,237,0.6),0 0 60px rgba(124,58,237,0.3)",
        "electric": "0 0 20px rgba(14,165,233,0.6),0 0 60px rgba(14,165,233,0.3)",
        "crimson": "0 0 20px rgba(220,38,38,0.6),0 0 60px rgba(220,38,38,0.3)",
        "glow-purple": "0 0 15px rgba(124,58,237,0.8)",
        "glow-blue": "0 0 15px rgba(14,165,233,0.8)",
      },
    },
  },
  plugins: [],
};
export default config;
