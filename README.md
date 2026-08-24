# Znap- / osu! Setup Configuration

A static personal showcase website documenting hardware peripherals, osu! skin configurations, and social profiles for the player **Znap-**.

---

## Overview

Built with plain HTML, CSS, and JavaScript — no build tools, no frameworks, no dependencies. Designed to be deployed as-is on GitHub Pages.

The site presents hardware specifications (tablet, keyboard, keypad, monitor, audio), interactive screenshot previews with a lightbox zoom modal, custom skin downloads, and a live-synced osu! profile avatar.

---

## Structure

```
osu-profile-website/
├── index.html       — Layout, content, and modal structure
├── styles.css       — Design system, variables, and responsive layout
├── app.js           — Lightbox, Discord copy, avatar cache-busting, scroll reveal
├── sparkle.js       — Canvas-based star particle system
├── sparkle.css      — Sparkle canvas positioning
├── config.js        — Static profile configuration data
├── avatar.jpg       — Local avatar fallback
└── picture/
    ├── tablet/      — OpenTabletDriver screenshots
    ├── keyboard/    — Keyboard driver screenshots
    ├── keypad/      — Sayodevice O3C screenshots
    └── skin/        — osu! skin gameplay previews
```

---

## Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | Vanilla CSS3 — Grid, Flexbox, Custom Properties |
| Logic | Vanilla JavaScript (ES6+) — IntersectionObserver, Canvas API |
| Typography | Nunito, Plus Jakarta Sans, JetBrains Mono (Google Fonts) |
| Icons | Font Awesome 6 |
| Hosting | GitHub Pages |

---

## Deployment

**Push to GitHub and enable Pages:**

```bash
git add .
git commit -m "chore: update site"
git push origin main
```

In the repository: **Settings > Pages > Deploy from branch > `main` / `(root)` > Save.**

Site will be available at `https://<username>.github.io/osu-profile-website/`.

---

## Hardware Documented

| Peripheral | Model |
|---|---|
| Tablet | Wacom CTL-472 — 39 x 26 mm, OpenTabletDriver v0.6.7 |
| Keyboard | Keychron C75 TMR — 0.3 mm actuation, 0.5 mm rapid trigger |
| Keypad | Sayodevice O3C — 3.00 mm stroke, custom actuation points |
| Monitor | LG ULTRAGEAR 24GS60F-B — 180 Hz, 1080p, 1 ms GtG |
| Audio | Apple EarPods (USB-C) |

---

## License

MIT