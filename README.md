# Znap- osu! Setup Website

## Overview
This repository contains the source code for the personal configuration showcase website of **Znap-**. The site documents hardware peripheral specifications, device settings, custom osu! skins, and profile references using static web technologies (HTML5, CSS3, JavaScript).

## Key Features
- **Hardware Configuration Display**: Detailed parameter tracking for tablet, keyboard, keypad, monitor, and audio peripherals.
- **Skin Showcase & Downloads**: Multi-screenshot image sliders (Gameplay, Song Select, Results UI) and direct download links for featured osu! skins (Aristia Instafade & Milkteaism Hydro DT).
- **Automatic Hardware Acceleration Detection**: Built-in detection for GPU rendering status; automatically adjusts visual parameters to maintain 60 FPS in CPU software-rendering environments.
- **Interactive Lightbox Preview**: Fullscreen image inspection modal for technical screenshots.
- **Responsive Design**: Mobile and desktop layout optimization using vanilla CSS Grid and Flexbox.

## Usage & Local Development

### Prerequisites
- A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).
- *(Optional)* Python 3.x or Node.js (v18.0.0 or higher) for running a local HTTP server.

### Local Server Setup
To run and preview the website locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/znapppp/osu-profile-website.git
   cd osu-profile-website
   ```

2. **Launch a local server using any of the following methods:**

   - **Using Python (Recommended - Built-in):**
     ```bash
     python -m http.server 8000
     ```
     Then navigate to `http://localhost:8000` in your web browser.

   - **Using Node.js:**
     ```bash
     npm start
     # or
     npx serve .
     ```
     Then navigate to `http://localhost:3000` in your web browser.

### Direct Execution
Alternatively, open `index.html` directly in any web browser without running a local server.

## Deployment
This project is structured for static hosting via GitHub Pages.

1. Commit and push modifications to the primary branch:
   ```bash
   git add .
   git commit -m "Update site configuration"
   git push origin main
   ```

2. Enable GitHub Pages in repository settings:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment**, set **Source** to **Deploy from a branch**.
   - Select **Branch: main** and **Folder: / (root)**, then click **Save**.

## License
MIT