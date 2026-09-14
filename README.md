# Znap- osu! Setup Website

A high-performance, responsive static web application showcasing the hardware configuration, tablet calibration, custom skin collection, and tosu stream overlays for osu! player **Znap-**.

## Features

- **Obsidian & Glassmorphism Aesthetic**: Apple/Linear-inspired dark interface with ambient glows, subtle dot pattern masks, and smooth micro-interactions.
- **Hardware Calibration Showcase**: Detailed active area specs (OpenTabletDriver), rapid trigger depths, keypad strokes, and peripheral configurations.
- **Interactive Skin Collection**: Multi-slide preview carousel (Gameplay, Song Select, Results UI) with category badges, instant download triggers, and Google Drive archive links.
- **tosu Stream Overlays**: Showcase for custom stream overlays and OBS widgets (e.g., `Znap-OsuBackground` customized from `Citrusis/OBSDecoratePack`) with direct download and GitHub links.
- **Purely Config-Driven**: All website content (profile, hardware specs, skins, overlays) is fully decoupled in `js/config.js` with zero build steps required.

## Technology Stack

- **Core**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN), custom CSS variables, and glassmorphic utilities
- **Typography**: Geist (primary display and body), JetBrains Mono (technical specifications)
- **Icons**: Google Material Symbols Outlined
- **Deployment**: Static architecture compatible with GitHub Pages, Vercel, Cloudflare Pages, or static HTTP servers

## Project Structure

```
osu-profile-website/
├── index.html          # Core layout, semantic sections, and inline design tokens
├── js/
│   ├── config.js       # Centralized configuration for profile, hardware, skins, and overlays
│   └── app.js          # Client-side hydration, event listeners, and interactive UI logic
├── picture/            # Image assets categorized by device, skin, and overlay
│   ├── keyboard/       # Keychron actuation and rapid trigger settings
│   ├── keypad/         # Sayodevice calibration screenshots
│   ├── overlay/        # tosu stream overlay previews and graphics
│   ├── skin/           # Skin gameplay, song selection, and results UI previews
│   └── tablet/         # OpenTabletDriver area screenshots
├── avatar.jpg          # Profile avatar asset
├── favicon.svg         # Browser favicon
├── package.json        # Project metadata and development scripts
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
  - `items`: Array of tosu overlay objects, each containing overlay name, category badge (`badgeText`), description, direct download URL, video preview link (`videoPreviewUrl`), optional GitHub repository link, source reference link, preview image (`previewImg`), preview video (`previewVideo`), and category/feature tags (`tags`).

## Local Development

Run a local HTTP server to serve static assets:

```bash
# Using Node.js
npx serve .

# Using Python 3
python -m http.server 3000
```

Access the application in your browser at `http://localhost:3000`.

## Deployment

Because the application contains no build dependencies, it can be deployed directly from the repository root:

- **GitHub Pages**: Set source branch to `main` and directory to `/ (root)`.
- **Vercel / Netlify / Cloudflare Pages**: Deploy as a static project with output directory set to `./` and no build command.