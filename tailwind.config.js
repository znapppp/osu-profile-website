// @ts-check
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./js/**/*.js"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#131313",
        "obsidian-deep": "#0A0A0A",
        "surface-container-lowest": "#0e0e0e",
        "surface-container": "#1f1f1f",
        "surface-container-highest": "#353535",
        "primary": "#ffffff",
        "secondary": "#c7c6c6",
        "on-surface": "#e2e2e2",
        "on-surface-variant": "#c4c7c8",
        "muted": "#9a9a9a",
        "outline": "#8e9192",
        "hairline": "#2e2e2e",
        "rule": "#444444"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        base: "8px",
        gutter: "24px",
        "margin-safe": "48px",
        "section-mobile": "48px",
        "section-desktop": "80px"
      },
      fontFamily: {
        // Zen Maru Gothic: headings, skin names, and key numbers
        display: ["Zen Maru Gothic", "sans-serif"],
        sans: ["Geist", "sans-serif"],
        // Units and setting values
        mono: ["Geist Mono", "monospace"]
      },
      fontSize: {
        "body-lg": ["20px", { lineHeight: "32px", letterSpacing: "0.01em", fontWeight: "400" }],
        "headline-lg": ["48px", { lineHeight: "52px", letterSpacing: "-0.01em", fontWeight: "700" }]
      }
    }
  },
  plugins: []
};
