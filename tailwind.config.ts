import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        float: "0 20px 60px -20px rgba(2, 132, 199, 0.25)",
        card: "0 10px 40px -10px rgba(15, 23, 42, 0.15)",
      },
      backgroundImage: {
        "sky-gradient":
          "linear-gradient(180deg, #e0f2fe 0%, #f0f9ff 50%, #ffffff 100%)",
        "hero-gradient":
          "linear-gradient(180deg, #7dd3fc 0%, #bae6fd 35%, #e0f2fe 75%, #ffffff 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
