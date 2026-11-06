# Znap- osu! Profile Website

A static website presenting the osu! setup of Znap-: hardware and settings, skins, and a tosu stream overlay.

## Tech Stack

- HTML and vanilla JavaScript ES modules (no framework, no JS bundler)
- Static type-checking via JSDoc + `@ts-check` (`jsconfig.json`)
- Tailwind CSS 3, compiled with the Tailwind CLI
- Playwright end-to-end tests (`desktop`, `mobile`, and `desktop-no-gpu`)

## Getting Started

Requires Node.js.

```bash
npm install
npm run build      # compile css/styles.css to css/output.css (minified)
npm run typecheck  # run strict JSDoc / @ts-check verification
npm start          # serve the site locally
```

During development, run `npm run build:css` to rebuild the CSS on every change.

## Project Structure

| Path | Description |
|------|-------------|
| `index.html` | Page markup, CSP, and Open Graph metadata |
| `js/config.js` | Single source of truth for site content (`SITE_CONFIG`) |
| `js/types.js` | JSDoc `@typedef` schema definitions for `SITE_CONFIG` |
| `js/main.js` | ES module entry point and fault-isolated initializer |
| `js/render/` | Section renderers (`profile.js`, `gear.js`, `skins.js`, `overlays.js`) |
| `js/ui/` | Interactive controllers (`lightbox.js`, `slider.js`, `navigation.js`) and `motion.js` (everything tied to scroll or the mouse) |
| `js/utils/dom.js` | HTML escaping, URL sanitization, motion query, and toast helpers |
| `jsconfig.json` | Strict TypeScript `checkJs` configuration |
| `css/styles.css` | Tailwind input and custom styles |
| `css/output.css` | Compiled stylesheet loaded by the page |
| `tailwind.config.js` | Theme colors, fonts, and spacing |
| `picture/` | Hardware screenshots, skin slides, and overlay preview video |
| `.github/workflows/ci.yml` | Automated CI checks (`typecheck`, CSS diff check, Playwright) |

## Updating Content

Edit `js/config.js` to change the content shown on the page:

- `profile`: username, avatar, social links, Discord tag, and last update date
- `tablet`, `keyboard`, `monitor`, `audio`: device names, settings, and preview images. `tablet.driverDownloadUrl` turns the driver name into a link to its download page, and `keyboard.keybind` shows which fingers press which keys
- `skins`: skins, screenshots, and download links. Set `current: true` on the skin you play with to feature it in the wide banner (otherwise the first skin is featured). The featured skin can also have a `note` (a short line from you) and `details` (rows of `{ label, value }`). `badgeText` is the type tag shown on the other skins' cards
- `overlays`: overlay details, preview video, and download and source links. `previewVideo` plays beside the details; `previewImg` is its poster, or the image shown when there is no video. `specs` (rows of `{ label, value }`) fill the spec cells, and `sourceRefName` is the text of the "Forked from" link to `sourceRefUrl`

## Testing

`npm test` rebuilds `css/output.css` and runs the Playwright tests against the installed Google Chrome. There are three projects:

- `desktop` and `mobile` (Pixel 7, touch) run every test. A test that only applies to one kind of device is skipped on the other, such as swipe on desktop.
- `desktop-no-gpu` runs `tests/motion.spec.js` in Chrome started with `--disable-gpu`, the same as turning off "Use graphics acceleration when available".

The tests use `tests/fixtures/config.js` in place of `js/config.js`, so they don't depend on the real content.

## Design Classes

Shared classes in `css/styles.css`:

- `.btn-primary`: solid white button with 6px rounded corners
- `.btn-secondary`: white outline button with 6px rounded corners (frames, cards and tags stay square)
- `.tag`: small type label
- `.section-rule`: divider at the top of each content section: a 1px hairline with "+" marks at both ends (the only "+" marks on the site; frames have none)
- `.section-title`: large section heading; starts as an outline and the fill wipes across when it comes into view, the same idea as the hero wordmark
- `.sheet`: anything after the hero. The hero is pinned (`.hero`) and sheets slide up over it, so every section needs this class and no shared positioned wrapper (`tests/navigation.spec.js` reads `offsetTop` against the page)
- `.spec-grid` / `.spec-cell` / `.spec-value` / `.spec-number`: setting tables, open at both sides, with hairlines between cells
- `.gear-shot`, `.skin-ghost`, `.overlay-frame`: the screenshot and video frames with their reveal, wipe and scroll-in motion
- `.nav-link`: header link; the one with `aria-current` gets a 2px underline (the scroll spy in `js/ui/navigation.js` sets it, also on the mobile menu links)

Tailwind additions: `font-display` (Zen Maru Gothic), `font-mono` (Geist Mono), `border-hairline` / `bg-hairline` (`#2e2e2e`), the `rule` colour (`#444`, used by `.section-rule`), and `text-muted` (`#9a9a9a`).

## Maintenance Notes

- `css/output.css` is committed to the repository. Run `npm run build` after changing `css/styles.css`, `tailwind.config.js`, or any Tailwind classes in HTML or JavaScript (enforced automatically in CI).
- Run `npm run typecheck` after editing `js/config.js` or any module under `js/` to verify types and schema definitions.
- The Material Symbols font loads only the icons listed in the `icon_names` parameter in `index.html`. When using a new icon, add its name to that list in alphabetical order, or it will not render.
- Page content (including `#header-avatar`) renders dynamically from `js/config.js`. Static `og:image` and `twitter:image` `<meta>` tags in `index.html` are read by social link crawlers without executing JavaScript; update those meta tags if the osu! user ID changes.
- Animations play even when the visitor's system prefers reduced motion; only the skin card slides, Home top-scroll, and nav underline switch instantly. See `docs/adr/0001-animations-play-with-reduced-motion.md` before changing this.
- The look is minimal on purpose: large type, plenty of space, and motion only where something enters or changes. Don't add osu! gameplay decoration (hit circles, sliders, cursor trails) or anything that moves on its own beyond the hero crosses.
- Many visitors run Chrome without hardware acceleration. Move things with `transform` and `opacity`; don't add blur or backdrop filters; Measure a new effect with Chrome started with `--disable-gpu`: the numbers to beat are in the ADR.
- The wordmark outlines appear twice in `index.html`: the hero (one path per contour, for the draw-in) and the footer. Regenerate both if the username changes.
