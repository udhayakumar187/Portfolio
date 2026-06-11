import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--background)",
        panel: "var(--panel-strong)",
        line: "var(--line)",
        electric: "var(--cyan)",
        violet: "var(--violet)",
        mint: "var(--mint)"
      },
      boxShadow: {
        "soft-glow": "0 0 42px rgba(142, 234, 255, 0.24)",
        "violet-glow": "0 0 52px rgba(167, 139, 250, 0.2)"
      },
      backgroundImage: {
        "grid-lines":
          "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
