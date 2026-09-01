# Znap- osu! Setup Website

Static web application for showcasing hardware peripheral configurations, device parameters, and custom osu! skins for **Znap-**. Built using vanilla HTML5, CSS3, and JavaScript.

## Architecture

- **Data-Driven Architecture**: Content is decoupled from markup and managed via `js/config.js`.
- **Performance Optimized**: Vanilla JS engine with zero external framework dependencies. Features WebP media assets, inline SVGs, lazy loading, and GPU hardware acceleration detection.

## File Structure

```
.
├── index.html       # Document structure
├── css/
│   ├── styles.css   # Main stylesheet
│   └── sparkle.css  # Particle layer styles
├── js/
│   ├── config.js    # Central configuration data
│   ├── app.js       # Dynamic DOM rendering and UI controllers
│   └── sparkle.js   # Background canvas particle engine
└── picture/         # Media assets (WebP format)
```

## Content Management

Modify `js/config.js` to update website content:

- `profile`: User metadata, avatar links, and social accounts.
- `tablet` / `keyboard` / `keypad` / `monitor` / `audio`: Device parameters and download URLs.
- `skins`: Featured skin listings, download URLs, and screenshot paths.

## Local Development

Run using any static HTTP server:

```bash
# Python
python -m http.server 8000

# Node.js
npx serve .
```

Alternatively, open `index.html` directly in any web browser.

## Deployment

Deployable via GitHub Pages by setting the build source to the `main` branch root (`/`) directory.

## License

MIT