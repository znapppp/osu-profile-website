# osu! Profile Showcase Platform

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=github&logoColor=white)](https://pages.github.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

A premium, modern gaming-themed showcase website for displaying personal **osu!** player profiles and gameplay statistics. Built with modern UI design principles featuring **Glassmorphism**, dynamic **Neon Glow** visual effects, interactive audio previews, and mouse-following particle effects. 

Designed for instant, hassle-free deployment on **GitHub Pages** with a zero-build, zero-dependency architecture.

---

## Key Features

- **Modern Gaming & Glassmorphism Aesthetic**: Vibrant dark-mode UI with official osu! color accents (`#ff66aa`), translucent glassmorphism cards, and smooth ambient neon glow animations.
- **Dynamic Game Mode Switcher**: Real-time statistics toggle supporting all standard game modes (`osu!std`, `osu!taiko`, `osu!catch`, and `osu!mania`).
- **Top Performances Showcase & Audio Preview**: Dynamic performance cards featuring calculated Star Difficulty color gradients, glowing rank badges (SSH, SS, SH, S, A), and an integrated Audio Preview Engine for beatmaps.
- **Hardware & Playstyle Specifications**: Dedicated display for player setup details (Tablet Area, Rapid Trigger Keyboards, Keybinds, Mouse Sensitivity, and Monitor refresh rates).
- **Skin Showcase**: Dedicated section to showcase custom player skins with feature lists, preview images, and `.osk` download links.
- **Badges & Achievements**: Highlight reel for player achievements, tournament badges, and community roles.
- **Interactive Particle Cursor**: Custom canvas-rendered osu! cursor particle trailing effect responsive to mouse movement.

---

## Configuration Guide

All website data and player statistics are configured via a single central configuration file: **[`config.js`](config.js)**. 

Customize your profile details instantly without altering any HTML structure:

```javascript
const PROFILE_CONFIG = {
    // Personal Information & User Metadata
    user: {
        username: "YourName",
        tagline: "Rhythm is just a click away!",
        avatar: "https://a.ppy.sh/2", // Avatar URL or local image path
        banner: "https://images.unsplash.com/...", // Banner background image URL
        country: "Thailand",
        countryCode: "TH",
        supporterLevel: 3, // Supporter tier (0 = None, 1-3 = Tier)
        isOnline: true,
        statusText: "In-Game • Editing beatmap",
        joinedDate: "March 2021",
        playTime: "482 hrs"
    },

    // Mode-specific Statistics
    modes: {
        std: {
            name: "osu!standard",
            pp: "6,842",
            globalRank: "#14,250",
            countryRank: "#215",
            accuracy: "98.74%",
            level: 98,
            levelProgress: 65,
            playCount: "45,820",
            grades: { ssh: 12, ss: 85, sh: 48, s: 320, a: 1120 }
        }
    },

    // Top Performance Showcase
    topPlays: [
        {
            title: "BLUE CLAPPER",
            artist: "Hololive IDOL Project",
            mapper: "Sotarks",
            stars: 6.84,
            pp: 462,
            accuracy: "99.24%",
            grade: "SH",
            mods: ["HD", "DT"],
            beatmapUrl: "https://osu.ppy.sh/b/2742358",
            audioPreview: "https://b.ppy.sh/preview/1302830.mp3"
        }
    ]
};
```

---

## Deployment (GitHub Pages)

Because this repository is a static web application, it can be deployed to **GitHub Pages** in 3 simple steps:

### Step 1: Push Code to GitHub Repository
Commit and push your repository files to the `main` branch:
```bash
git add .
git commit -m "feat: setup professional osu profile website"
git push origin main
```

### Step 2: Configure GitHub Pages
1. Navigate to your repository on GitHub (e.g., `https://github.com/<username>/osu-profile-website`).
2. Click the **Settings** tab in the top navigation bar.
3. Select **Pages** from the left sidebar (under the *Code and automation* section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` and the `/ (root)` folder.
5. Click **Save**.

### Step 3: Access Your Website
Within 1 to 2 minutes, GitHub Actions will publish your site at:
```text
https://<username>.github.io/osu-profile-website/
```

---

## Project Structure

```text
osu-profile-website/
├── index.html       # Primary semantic HTML5 structure & DOM hierarchy
├── styles.css       # Comprehensive design system, CSS variables & Glassmorphism UI
├── app.js          # Core logic (State management, DOM rendering & Audio Engine)
├── config.js       # Centralized user profile & stats configuration file
├── avatar.jpg      # User profile asset image
└── README.md        # Project documentation & usage guide
```

- **[`index.html`](index.html)**: Semantic layout, DOM container structure, and component mounts.
- **[`styles.css`](styles.css)**: Glassmorphism panels, CSS variables, neon glows, and responsive layout breakpoints.
- **[`app.js`](app.js)**: State handlers for game modes, dynamic DOM rendering, audio preview controls, and cursor particle engine.
- **[`config.js`](config.js)**: Single Source of Truth (SSOT) containing personal metadata and play stats.

---

## Tech Stack & Dependencies

- **Frontend Core**: Standard HTML5, Modern CSS3 (CSS Variables, Flexbox, Grid), Vanilla JavaScript (ES6+)
- **Design & UI**: Custom Glassmorphism UI Components, Ambient Neon Lighting System
- **Fonts & Typography**: Google Fonts ([Outfit](https://fonts.google.com/specimen/Outfit)), [Font Awesome 6 Pro/Free Icons](https://fontawesome.com/)
- **Hosting Infrastructure**: [GitHub Pages](https://pages.github.com/) (Zero-Build Static Hosting)

---

## License

This project is open-source and available under the **[MIT License](LICENSE)**. Feel free to customize and modify for personal use.

---

<p align="center">
  Developed for the <b>osu! Community</b>
</p>