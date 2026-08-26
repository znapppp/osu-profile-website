# Znap- osu! Setup Website

## Overview
This repository contains the source code for the personal configuration showcase website of **Znap-**. The site documents hardware peripheral specifications, device settings, custom osu! skins, and profile references using static web technologies (HTML5, CSS3, JavaScript).

## Key Features
- **Hardware Configuration Display**: Detailed parameter tracking for tablet, keyboard, keypad, monitor, and audio peripherals.
- **Skin Collection & Downloads**: Direct file download links and screenshot previews for featured osu! skins.
- **Automatic Hardware Acceleration Detection**: Built-in detection for GPU rendering status; automatically adjusts visual parameters to maintain 60 FPS in CPU software-rendering environments.
- **Interactive Lightbox Preview**: Fullscreen image inspection modal for technical screenshots.
- **Responsive Design**: Mobile and desktop layout optimization using vanilla CSS Grid and Flexbox.

## Usage & Local Development

### Prerequisites
- A modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, or Safari).
- Node.js (v18.0.0 or higher) if using the local server script.

### Local Server Setup
To run and preview the website locally without deploying:

1. Clone the repository:
   ```bash
   git clone https://github.com/znapppp/osu-profile-website.git
   cd osu-profile-website
   ```

2. Launch the local development server:
   ```bash
   npm start
   ```
   *(Alternatively, run `npx serve .`)*

3. Navigate to the local server URL (e.g., `http://localhost:3000`) in your web browser.

### Direct Execution
Alternatively, open `index.html` directly in any web browser without running a server.

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