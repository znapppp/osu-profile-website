# Znap- Profile Website

Personal osu! profile and hardware configuration website inspired by Carrd and FlyingTuna aesthetic.

## Tech Stack

- HTML5
- Tailwind CSS
- Vanilla JavaScript

## Features

- Responsive Carrd-style layout with GPU-accelerated floating vector background
- Modals for Hardware & Settings, Skins, and tosu Overlays
- Image lightbox with high-resolution preview
- Centralized configuration in `js/config.js`

## Development

### Install

```bash
npm install
```

### Build

```bash
npm run build
```

Watch mode:

```bash
npm run build:css
```

### Local Server

```bash
npm start
```

## Configuration

Edit `js/config.js` to customize:
- Profile details and socials
- Hardware calibrations (tablet area, rapid trigger, switches)
- Skin downloads and screenshots
- tosu stream overlays