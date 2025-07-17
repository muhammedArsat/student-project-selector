/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      fontSize: {
        heading: ["2.25rem", { lineHeight: "2.5rem", fontWeight: "700" }], // 36px
        subheading: ["1.5rem", { lineHeight: "2rem", fontWeight: "600" }], // 24px
        body: ["1rem", { lineHeight: "1.75rem", fontWeight: "400" }], // 16px
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0, 0, 0, 0.15)",
        darkSoft: "0 4px 12px rgba(255, 255, 255, 0.05)",
        card: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
        darkCard:
          "0 10px 15px -3px rgba(255,255,255,0.1), 0 4px 6px -2px rgba(255,255,255,0.05)",
      },
      colors: {
        light: {
          bg: "#ffffff",
          text: "#1f2937",
          card: "#f9fafb",
        },
        dark: {
          bg: "#212529",
          text: "#e2e8f0",
          card: "#1e293b",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
