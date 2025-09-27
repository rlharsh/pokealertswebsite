// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        kenburns: {
          "0%":   { transform: "scale(1.05) translate(0%, 0%)" },
          "50%":  { transform: "scale(1.12) translate(-2%, -1%)" },
          "100%": { transform: "scale(1.08) translate(1%, -1.5%)" },
        },
      },
      animation: {
        kenburns: "kenburns 35s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [],
} satisfies Config;
