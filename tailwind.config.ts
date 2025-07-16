// tailwind.config.ts (Tailwind v4)
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    fontFamily: {
      poppins: ['"Poppins"', "sans-serif"],
      fira: ['"Fira Code"', "monospace"],
    },
  },
};

export default config;
