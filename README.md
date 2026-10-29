# Znap- osu! Profile Website

A static website presenting the osu! setup of Znap-: hardware and settings, skins, and a tosu stream overlay.

## Tech Stack

- HTML and vanilla JavaScript (no framework, no bundler)
- Tailwind CSS 3, compiled with the Tailwind CLI

## Getting Started

Requires Node.js.

```bash
npm install
npm run build      # compile css/styles.css to css/output.css (minified)
npm start          # serve the site locally
```

During development, run `npm run build:css` to rebuild the CSS on every change.

## Project Structure

| Path | Description |
|------|-------------|
| `index.html` | Page markup |
| `js/config.js` | Site content (`SITE_CONFIG`) |
| `js/app.js` | Renders the content from `config.js` and handles page interactions |
| `css/styles.css` | Tailwind input and custom styles |
| `css/output.css` | Compiled stylesheet loaded by the page |
| `tailwind.config.js` | Theme colors, fonts, and spacing |
| `picture/` | Images and the overlay preview video |

## Updating Content

Edit `js/config.js` to change the content shown on the page:

- `profile`: username, avatar, social links, Discord tag, and last update date
- `tablet`, `keyboard`, `keypad`, `monitor`, `audio`: device names, settings, and preview images
- `skins`: skins, screenshots, and download links. Set `current: true` on the skin you play with to feature it in the wide banner (otherwise the first skin is featured). The featured skin can also have a `note` (a short line from you) and `details` (rows of `{ label, value }`). `badgeText` is the type tag shown on the other skins' cards
- `overlays`: overlay details, preview video, and download and source links

## Testing

`npm test` runs the Playwright tests against the installed Google Chrome, on a desktop and a mobile (Pixel 7) viewport. It rebuilds `css/output.css` first. The tests use `tests/fixtures/config.js` in place of `js/config.js`, so they don't depend on the real content. Swipe is touch-only, so that one test is skipped on desktop.

## Design Classes

Shared classes in `css/styles.css`:

- `.reg`, `.reg-t`, `.reg-b`: "+" registration marks just outside a frame's corners (all four, top two, bottom two). Don't put `overflow-hidden` on the same element.
- `.btn-primary`: solid white button
- `.btn-secondary`: white outline button
- `.tag`: small type label

Tailwind additions: `font-display` (Zen Maru Gothic), `font-mono` (Geist Mono), `border-hairline` / `bg-hairline` (`#2e2e2e`), and `text-muted` (`#9a9a9a`).

## Maintenance Notes

- `css/output.css` is committed to the repository. Run `npm run build` after changing `css/styles.css`, `tailwind.config.js`, or any Tailwind classes in HTML or JavaScript.
- The Material Symbols font loads only the icons listed in the `icon_names` parameter in `index.html`. When using a new icon, add its name to that list in alphabetical order, or it will not render.
- The avatar URL is set in both `index.html` and `js/config.js`. Update both when changing it.
