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
        "surface-bright": "#393939",
        "obsidian-deep": "#0A0A0A",
        "outline": "#8e9192",
        "surface-container-high": "#2a2a2a",
        "primary": "#ffffff",
        "secondary-fixed-dim": "#c7c6c6",
        "on-surface": "#e2e2e2",
        "inverse-primary": "#5d5f5f",
        "tertiary": "#ffffff",
        "glass-stroke": "rgba(255, 255, 255, 0.15)",
        "on-error": "#690005",
        "error": "#ffb4ab",
        "on-background": "#e2e2e2",
        "primary-fixed-dim": "#c6c6c7",
        "surface-container": "#1f1f1f",
        "surface-tint": "#c6c6c7",
        "on-primary-container": "#636565",
        "background": "#131313",
        "surface-container-lowest": "#0e0e0e",
        "on-tertiary-fixed-variant": "#474746",
        "outline-variant": "#444748",
        "inverse-surface": "#e2e2e2",
        "inverse-on-surface": "#303030",
        "on-surface-variant": "#c4c7c8",
        "on-secondary-fixed-variant": "#464747",
        "tertiary-container": "#e5e2e1",
        "tertiary-fixed-dim": "#c8c6c5",
        "surface-container-highest": "#353535",
        "secondary-container": "#484949",
        "on-tertiary": "#313030",
        "secondary": "#c7c6c6",
        "secondary-fixed": "#e3e2e2",
        "soft-charcoal": "#262626",
        "on-primary-fixed": "#1a1c1c",
        "surface-dim": "#131313",
        "on-secondary-fixed": "#1a1c1c",
        "on-tertiary-fixed": "#1c1b1b",
        "on-secondary-container": "#b8b8b8",
        "primary-container": "#e2e2e2",
        "surface-container-low": "#1b1b1b",
        "on-secondary": "#2f3131",
        "on-primary": "#2f3131",
        "on-tertiary-container": "#656464",
        "on-error-container": "#ffdad6",
        "on-primary-fixed-variant": "#454747",
        "surface-variant": "#353535",
        "tertiary-fixed": "#e5e2e1",
        "surface": "#131313",
        "primary-fixed": "#e2e2e2",
        "error-container": "#93000a"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      spacing: {
        "margin-safe": "48px",
        "section-mobile": "48px",
        base: "8px",
        "section-desktop": "80px",
        gutter: "24px"
      },
      fontFamily: {
        "label-small": ["Geist", "sans-serif"],
        "body-md": ["Geist", "sans-serif"],
        "body-lg": ["Geist", "sans-serif"],
        "headline-lg": ["Geist", "sans-serif"],
        "headline-lg-mobile": ["Geist", "sans-serif"],
        "label-caps": ["JetBrains Mono", "monospace"],
        "display-hero": ["Geist", "sans-serif"]
      },
      fontSize: {
        "label-small": ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "26px", letterSpacing: "0.01em", fontWeight: "300" }],
        "body-lg": ["20px", { lineHeight: "32px", letterSpacing: "0.01em", fontWeight: "300" }],
        "headline-lg": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "headline-lg-mobile": ["32px", { lineHeight: "40px", letterSpacing: "-0.02em", fontWeight: "600" }],
        "label-caps": ["12px", { lineHeight: "16px", letterSpacing: "0.03em", fontWeight: "500" }],
        "display-hero": ["80px", { lineHeight: "88px", letterSpacing: "-0.03em", fontWeight: "700" }]
      }
    }
  },
  plugins: []
};
