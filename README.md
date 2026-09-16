# Znap- osu! Setup Website

A high-performance, accessible, and responsive static web application showcasing the hardware configuration, tablet calibration, custom skin collection, and tosu stream overlays for osu! player **Znap-**.

## Features

- **Obsidian & Minimalist Aesthetic**: High-contrast dark interface with authentic surface depths, solid typography, and subtle micro-interactions following modern Frontend craft standards.
- **Hardware Calibration Showcase**: Detailed active area specs (OpenTabletDriver), rapid trigger depths, keypad strokes, and peripheral configurations in a symmetric 12-column grid.
- **Interactive Skin Collection**: Multi-slide preview carousel (Gameplay, Song Select, Results UI) with category badges, instant download triggers, and Google Drive archive links.
- **tosu Stream Overlays**: Showcase for custom stream overlays and OBS widgets with direct download, video previews (`preload="none"` with `IntersectionObserver`), and GitHub source links.
- **Accessibility & Keyboard Navigation (a11y)**: 100% keyboard accessible (Tab, Enter, Space), semantic `<button>` elements, complete `focus-visible` styling, ARIA labels, and `@media (prefers-reduced-motion: reduce)` support.
- **Core Web Vitals Optimized**: Zero layout shift (0 CLS) via explicit dimensions and min-heights, pre-compiled lightweight CSS, and RAF-throttled scroll listeners.
- **Config-Driven Architecture**: All dynamic content (profile, hardware specs, skins, overlays) is fully decoupled in `js/config.js`.

## Technology Stack

- **Core**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (Pre-compiled & minified to ~29 KB via Tailwind CLI, no Play CDN runtime)
- **Typography**: Geist (primary display and body), JetBrains Mono (technical specifications)
- **Icons**: Google Material Symbols Outlined
- **Tooling**: Node.js, Tailwind CSS CLI

## Project Structure

```
osu-profile-website/
├── index.html          # Semantic HTML layout, accessible landmarks, and UI markup
├── css/
│   ├── styles.css      # Tailwind base entrypoint, custom scrollbars, and animations
│   └── output.css     # Production-ready minified CSS (~29 KB)
├── js/
│   ├── config.js       # Centralized data store (profile, hardware, skins, overlays)
│   └── app.js          # DOM hydration, image slider logic, clipboard, and scroll tracking
├── picture/            # Image assets categorized by hardware and skins
│   ├── keyboard/       # Keychron actuation and rapid trigger screenshots
│   ├── keypad/         # Sayodevice calibration screenshots
│   ├── overlay/        # tosu stream overlay previews and assets
│   ├── skin/           # Multi-slide gameplay, song selection, and results UI previews
│   └── tablet/         # OpenTabletDriver area screenshots
├── avatar.jpg          # Profile avatar asset
├── favicon.svg         # Browser favicon
├── package.json        # Dependencies and build scripts
├── tailwind.config.js  # Tailwind theme, typography tokens, and spacing scales
├── design.md           # Design system and architecture document
└── README.md           # Project documentation
```

## Configuration Guide

All dynamic content is managed through `js/config.js`. Updating this file updates the rendered interface immediately without modifying HTML markup:

### Key Configuration Sections

- **`profile`**: Username, avatar URL, fallback image, and social media URLs (osu!, TikTok, X, Discord tag).
- **`tablet`**: Device name, active area dimensions, driver name/version, and settings screenshot.
- **`keyboard`**: Keyboard model, keybind configuration, actuation depth, and rapid trigger values.
- **`keypad`**: Keypad model, total stroke, actuation point, and rapid trigger thresholds.
- **`monitor` & `audio`**: Display specifications (refresh rate, response time, resolution) and audio output details.
- **`skins`**:
  - `subtext`: Section subtitle / personal note.
  - `driveFolderUrl`: Direct URL pointing to the external Google Drive skin archive folder.
  - `items`: Array of skin objects, each containing display names, category tags (`badgeText`), direct download links, and multi-slide preview images (`gameplay`, `songselect`, `result`).
- **`overlays`**:
  - `subtext`: Section subtitle / description for stream overlays.
  - `githubUrl`: Link to GitHub profile or overlays repository.
  - `tosuDownloadUrl`: Direct link to official tosu release.
  - `items`: Array of tosu overlay objects, each containing overlay name, description, direct download URL, video preview link (`videoPreviewUrl`), optional GitHub repository link, source reference link, preview image (`previewImg`), and preview video (`previewVideo`).

## Local Development & Build

### 1. Install Dependencies
```bash
npm install
```

### 2. Build CSS
Compile Tailwind CSS to `css/output.css`:
```bash
npm run build
```

During development, to watch for HTML/JS changes and rebuild automatically:
```bash
npm run build:css -- --watch
```

### 3. Run Local Server
Serve static assets locally:
```bash
# Using Node.js
npx serve .

# Or using Python 3
python -m http.server 3000
```

Access the application in your browser at `http://localhost:3000`.

## Deployment

Deployable to any modern static hosting provider:

- **Vercel / Netlify / Cloudflare Pages**:
  - Build command: `npm run build`
  - Output directory: `./`
- **GitHub Pages**:
  - Commit the generated `css/output.css` and configure GitHub Pages to serve from the root directory (`/`).