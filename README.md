# Znap- | osu! Setup Configuration & Showcase

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A premium, minimalist gaming-themed showcase website for **Znap-**, presenting hardware settings (Tablet, Keyboard, Keypad, Monitor, Audio), custom osu! skins, and official social media profiles. Built with modern UI design principles featuring **Glassmorphism**, neon accent glows, interactive image zoom modals, and automatic osu! profile picture synchronization.

Designed for instant, zero-dependency static deployment on **GitHub Pages**.

---

## Key Features

- **Modern Glassmorphism & Gaming Design**: Dark-mode UI with official osu! pink accents (`#ff66aa`), translucent glassmorphism cards, and smooth hover micro-animations.
- **Auto-Sync osu! Profile Avatar**: Automatically fetches and updates the latest profile picture directly from official osu! servers (`a.ppy.sh`) using dynamic cache-busting timestamps (`?t=timestamp`), with local `avatar.jpg` fallback support.
- **Hardware & Peripherals Setup Grid**:
  - **Tablet**: Wacom CTL-472 specification (39mm x 26mm area), OpenTabletDriver details & preview.
  - **Keyboard**: Keychron C75 TMR (Ring / Index Z, C bind, 0.3mm actuation point, 0.5mm rapid trigger).
  - **Keypad**: Sayodevice O3C (3.00mm stroke, custom release/trigger actuation & rapid trigger specs).
  - **Monitor**: LG ULTRAGEAR 24GS60F-B (180 Hz, 1920x1080 FHD, 1ms GtG).
  - **Audio**: Apple EarPods (USB-C Earbud Wired).
- **Responsive 2-Column Duo Layout**: Monitor and Audio sections are displayed side-by-side in a 50/50 full-width row split.
- **Interactive Lightbox Image Zoom**: Click any hardware or skin preview screenshot to view in a high-resolution lightbox modal.
- **Custom osu! Skins Showcase**: Dedicated showcase for current main skin (*Aristia Instafade Znap- edit*) and High AR skin (*Milkteaism Hydro DT BETA edit*), with direct Google Drive download links.
- **One-Click Discord Copy**: Interactive social pill button to instantly copy Discord username (`Salmoneverydayplss`) to clipboard with animated Toast Notifications.
- **Social Media Hub**: Quick links to official osu! profile, TikTok (`@znapppp_`), and X / Twitter (`@znapppp_`).

---

## Project Structure

```text
osu-profile-website/
├── index.html       # Main HTML layout, setup grids, skin showcase & modals
├── styles.css       # Design system, CSS variables, glassmorphism & responsive layout
├── app.js          # Application logic (Lightbox zoom, Discord copy & Avatar cache-buster)
├── config.js       # Profile configuration data
├── avatar.jpg      # Fallback profile avatar image
├── picture/        # Screenshot assets for hardware & skin previews
│   ├── tablet/     # OpenTabletDriver area screenshots
│   ├── keyboard/   # Keyboard driver setup screenshots
│   ├── keypad/     # Sayodevice O3C configuration screenshots
│   └── skin/       # osu! skin gameplay previews (Aristia, DT, etc.)
└── README.md        # Project documentation & usage guide
```

---

## Deployment (GitHub Pages)

Deploy to **GitHub Pages** in 3 simple steps:

### Step 1: Push Code to GitHub
```bash
git add .
git commit -m "update: refresh website & readme documentation"
git push origin main
```

### Step 2: Enable GitHub Pages
1. Go to your repository on GitHub.
2. Click **Settings** > **Pages** (under *Code and automation*).
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` and `/ (root)` folder.
4. Click **Save**.

### Step 3: View Your Site
Your site will be live at:
```text
https://<your-username>.github.io/osu-profile-website/
```

---

## Tech Stack

- **Core**: HTML5, Vanilla CSS3 (CSS Grid/Flexbox, Glassmorphism, CSS Variables), ES6+ JavaScript
- **Typography**: Google Fonts ([Exo 2](https://fonts.google.com/specimen/Exo+2), [Inter](https://fonts.google.com/specimen/Inter), [Outfit](https://fonts.google.com/specimen/Outfit))
- **Icons**: [Font Awesome 6](https://fontawesome.com/) & Custom SVG logos
- **Hosting**: [GitHub Pages](https://pages.github.com/)

---

## License

This project is licensed under the **[MIT License](LICENSE)**. Feel free to use or adapt it for your own osu! setup showcase.

---

<p align="center">
  Crafted for the <b>osu! Community</b>
</p>