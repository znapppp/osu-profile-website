# Next tasks: site handoff

This file hands the site over to a new session that has no access to earlier conversations. Read all of it before changing code.

## Getting started

```bash
git fetch
git checkout main
npm install
npm test
```

Requirements:

- Node.js, for `npm install` and `npm test`.
- Google Chrome, because the tests use the installed Chrome. See "How the tests work" if Chrome isn't installed.
- The `gh` CLI, logged in with `gh auth login`, to read the spec (issue #1) and open pull requests.

## Where things stand

- **`main`** has the whole redesign. PR #2 (spec: issue #1, "Redesign: sharper visual language and featured skins showcase") and PR #3 (removes the "+" registration marks around frames) are merged.
- **Follow-ups from 2026-10-30**, pushed straight to `main`:
  - Config text and URLs are escaped before they go into HTML.
  - The nav marks the current section on load.
  - The keyboard has a Keybind cell, and the tablet driver name links to its download page.
  - The overlay facts and the fork credit come from the config.
  - Config fields that nothing reads are removed.
  - Motion tests, including a Playwright project that runs Chrome without hardware acceleration.
- **`redesign/visual-refresh-skins`** is merged. Its last commit, `0d180c7`, is ported to `main` without the part that brought back the registration marks PR #3 removed, so the branch can be deleted.
- **Tests:** `npm test`. At the last run, 95 passed and 12 skipped. A test that only applies to one kind of device skips on the other, and the GPU check runs only in the no-GPU project.

## The owner and what they want

- The owner, Znap-, speaks Thai. Reply in Thai.
- **Visitors:** mostly osu! players who come for the **skins**. Skins are the most important part of the site.
- **What was wrong before the redesign:** the owner found the site cluttered, uninteresting and hard to read.
- **What to keep:** the dark monochrome feel and the floating rounded-cross motif.
- **Typography:** fonts that are cute but simple and elegant. The owner rejected a wide, heavy esports font (Archivo) as looking weird.
- **No "AI slop":** no glassmorphism, no soft rounded cards everywhere, no gradient text, no tiny tracked uppercase labels on every element, and no decoration that doesn't come from the cross motif.
- **Animations:** visitors must see them, including people whose Windows animation effects or Chrome hardware acceleration are off. See "Motion".
- **Commits:** never put Claude, Anthropic, or any AI name in commits or PRs, and no `Co-Authored-By` trailers. Commit under the configured git identity.

## Decisions already made

The owner chose these from browser mockups. The mockups aren't in the repo, so they are described here.

### Typography

| Role | Font | Tailwind class | Used for |
| --- | --- | --- | --- |
| Display | Zen Maru Gothic (weights 500/700/900) | `font-display` | Section headings, skin names, large numbers |
| Body | Geist, weight 400 | `font-sans` | Running text. Weight 300 was too light |
| Values | Geist Mono | `font-mono` | Units and setting values. Replaces JetBrains Mono |

- Headings are in **title case** ("Skins", not "SKINS").
- **Legibility floor:** informational text is at least 12px. Secondary text uses solid tokens (`text-muted` `#9a9a9a`, `text-on-surface-variant`), not low-opacity variants such as `text-on-surface-variant/40`.

### Frames and buttons

- Frames, the banner, cards, gear grids and `.tag` have square corners: no `rounded-*` there except `rounded-full` on dots.
- Buttons (`.btn-primary`, `.btn-secondary`, slide arrows, zoom buttons, thumbnails, lightbox close, menu toggle, footer links) have 6px corners (`rounded-md`).
- Owner exception: the hero social dock (TikTok, X, Discord) is rounded (`rounded-2xl`, 16px), and its icon buttons use `rounded-lg`.
- Hairline borders use the `border-hairline` colour (`#2e2e2e`).
- Frames have no "+" registration marks (PR #3 removed them). Don't bring back `.reg`, `.reg-t` or `.reg-b`.
- Nothing may appear only on hover. Download buttons, slide controls, dots, and zoom buttons are always visible.

### Section breaks and navigation

- No section numbers. Each content section (Gear, Skins, Overlay) opens with a `.section-rule` divider: a 1px rule with "+" marks at both ends. These are the only "+" marks on the site.
- Nav labels match the section headings: Gear, Skins, Overlay.
- The header nav underlines the link of the section in view (2px, no layout shift) and sets `aria-current="location"` on it, on the mobile menu links too. It also does this on load, so a `#skins` link is marked straight away.

### Background

- The floating rounded crosses live only in the hero (`#overview`) and scroll away with it. Gear, Skins, Overlay and the footer have a plain solid background with no crosses.

### Motion

- The hero entrance, the floating crosses, the section reveals and the overlay preview autoplay play even when the visitor's system prefers reduced motion. Windows turns that preference on whenever its animation effects are off, which is common on gaming PCs, and those visitors must see the animations too.
- Only the skin card slide transition and the nav underline transition are instant under reduced motion.
- Chrome with hardware acceleration off draws in software and runs the animations smoothly. It was never the cause of missing animations.
- Full reasoning and measurements: `docs/adr/0001-animations-play-with-reduced-motion.md`. `tests/motion.spec.js` fails if this breaks.

### Skins section

- The skin flagged `current: true` is featured. If none is flagged, the first skin is featured.
- **Featured skin:** one frame. On desktop the screenshot sits on the left (16:9, `object-contain` on black, so the whole screenshot shows) and a side panel on the right holds:
  - the CURRENT tag and the skin name
  - the owner's `note`
  - `details` rows
  - screenshot thumbnails (clicking one swaps the screenshot)
  - a solid Download button

  On smaller screens the panel stacks under the screenshot. Nothing overlays the screenshot except the zoom button.
- **Other skins:** cards in a two-column grid (one column on mobile). Each card has:
  - a 16:9 `object-contain` slider with always-visible prev/next arrows and clickable dots
  - swipe on touch devices
  - an instant switch when reduced motion is preferred
  - a type tag (`badgeText`) and an outline Download button
- **Lightbox:** clicking a screenshot or its zoom button opens the lightbox on the screenshot shown. The title is "Skin name — Screen label".
- **Header:** the "N skins" count, and an "Older skins" archive link.
- No placeholder ("Coming Soon") items and no auto-generated descriptions.

### Gear section

- One spec sheet in `#hardware`: tablet, keyboard, monitor and earphones. Each is an `<article>` with a small category label ("Tablet", "Keyboard", "Monitor", "Earphones") above the device name, which is an `<h3>` in `font-display`.
- Setting values sit in hairline-divided cells. Every cell is at least 104px tall, with a small `text-muted` label.
- A single number plus unit (`0.3 mm`, `180 Hz`) shows the number large in `font-display` and the unit small in `font-mono`. Any other value (driver, resolution, keybind) is `font-mono` text. `setSpecValue()` in `js/app.js` does the split.
- Tablet and keyboard show their info on the left and the settings screenshot on the right, in full colour, opening in the lightbox. Monitor and earphones have no screenshots and sit side by side at equal height.
- The keyboard has a Keybind cell (`keyboard.keybind`). The tablet driver name links to `tablet.driverDownloadUrl`.
- The Sayodevice keypad and the monitor response time were removed on purpose.

### Overlay section

- Each overlay is an `<article>`: name, description, spec cells from `specs`, buttons (`.btn-primary` download, `.btn-secondary` video and source), and a "Forked from" link whose text is `sourceRefName`. The preview video sits on the right.
- No glassmorphism and no low-opacity text.

## Not decided yet (ask the owner before doing these)

- **Section order:** move Skins above Gear and/or make the hero shorter. The site audit found this was the biggest problem. Today skins start about 3 screens down on desktop and about 9 on mobile.
- **Hero:** the hero wordmark is a pre-drawn SVG in Geist Bold, and its entrance animation takes about 2 seconds. Both are out of scope unless the owner asks.

## How the tests work

- **Setup:**
  - `playwright.config.js` runs three projects:
    - `desktop` (Desktop Chrome) and `mobile` (Pixel 7, touch) run every test.
    - `desktop-no-gpu` runs `tests/motion.spec.js` in Chrome started with `--disable-gpu`, which is what turning off "Use graphics acceleration when available" does.
  - All projects use the **installed Google Chrome** (`channel: 'chrome'`). On a machine without Chrome, install it or remove `channel` and run `npx playwright install chromium`.
  - `workers: 2`, because more parallel Chrome instances caused timeouts on this machine.
  - The web server runs `npm run build && npx serve . -l 4173`, so `css/output.css` is rebuilt before every run.
  - Outside CI, Playwright reuses a server that is already on port 4173, even one serving another checkout. Run `CI=1 npm test` when another copy of the repo might be serving.
- **The fixture:**
  - The test-only `tests/fixtures/config.js` replaces `js/config.js` at the network level, which is the single seam the tests use.
  - Bravo is flagged current with a note and details, Alpha and Charlie are plain cards, and there is one placeholder item. The overlay has `specs` and a `sourceRefName`. The tablet has a `driverDownloadUrl` and the keyboard a `keybind`.
  - `tests/fixture.js` also blocks third-party requests (Google Fonts, the osu! avatar) for speed and stability.
  - A test can change the data with `test.use({ configPatch: '<js run after SITE_CONFIG is defined>' })`.
- **What tests check:** only what a visitor sees and does, through roles, names, text, and computed styles. Don't assert class names or DOM structure.

## Gotchas

- **`css/output.css`** is committed. Rebuild it with `npm run build` after changing Tailwind classes in HTML or JS, `tailwind.config.js`, or `css/styles.css`, and commit the result.
- **Icon font:** Material Symbols loads only the icons listed in `icon_names` in `index.html`. Add any new icon there, in alphabetical order.
- **Several sessions, one folder:** the owner sometimes runs more than one Claude session in the same working tree. Check `git status` for someone else's uncommitted work before editing, and use a git worktree for your own changes.
- **Line endings:** files use CRLF on Windows (`core.autocrlf=true`). The LF→CRLF git warnings are harmless.
- **`design.md`** is gitignored and out of date. Don't rely on it.
