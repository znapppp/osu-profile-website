# Znap- osu! Setup Website

A high-performance, responsive static web application showcasing the hardware configuration, tablet calibration, and custom skin collection for osu! player Znap-.

## Technology Stack

- **Core**: HTML5, Vanilla JavaScript (ES6+)
- **Styling**: Tailwind CSS (CDN), custom CSS variables, and glassmorphism utilities
- **Typography**: Geist (primary display and body), JetBrains Mono (technical specifications)
- **Deployment**: Pure static architecture compatible with GitHub Pages, Vercel, Cloudflare Pages, or static HTTP servers

## Project Structure

```
osu-profile-website/
├── index.html          # Core layout, semantic structure, and inline design tokens
├── js/
│   ├── config.js       # Centralized configuration for profile, hardware, and skins
│   └── app.js          # Client-side hydration, event listeners, and interactive UI logic
├── picture/            # Image assets categorized by device and skin
│   ├── hardware/       # Hardware device photographs and driver configuration screenshots
│   ├── keyboard/       # Keychron actuation and rapid trigger settings
│   ├── keypad/         # Sayodevice calibration screenshots
│   ├── skin/           # Skin gameplay, song selection, and results UI previews
│   └── tablet/         # OpenTabletDriver area screenshots
├── avatar.jpg          # Profile avatar asset
├── favicon.svg         # Browser favicon
├── package.json        # Project metadata and development scripts
└── README.md           # Project documentation
```

## Configuration Guide

All dynamic content is decoupled into `js/config.js`. Modifying this file automatically updates the rendered interface without altering markup.

### Key Configuration Sections

- **`profile`**: Username, avatar URL, fallback image, and social media URLs (osu!, TikTok, X, Discord).
- **`tablet`**: Model name, active area dimensions, driver version, and settings screenshot.
- **`keyboard`**: Keyboard model, keybind configuration, actuation depth, and rapid trigger values.
- **`keypad`**: Keypad model, total stroke, actuation point, and rapid trigger thresholds.
- **`monitor` & `audio`**: Display specifications (refresh rate, response time, resolution) and audio output details.
- **`skins`**:
  - `driveFolderUrl`: Direct URL pointing to the external Google Drive skin archive folder.
  - `items`: Array of skin objects, each containing display names, category tags (`badgeText`), direct download links, and multi-slide preview images (`gameplay`, `songselect`, `result`).

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