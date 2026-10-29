# Next tasks: site redesign handoff

This file hands off an in-progress redesign to a new session with no access to the previous conversation. Read all of it before changing code.

## Where things stand

- **Branch:** `redesign/visual-refresh-skins` (based on `main`). The work is committed here; `main` is untouched. Push with `git push -u origin redesign/visual-refresh-skins` if the branch isn't on GitHub yet.
- **Spec:** GitHub issue #1, "Redesign: sharper visual language and featured skins showcase" (`gh issue view 1`). It is the source of truth, **except for the display font** (see Decisions).
- **Tests:** `npm test`. At the last run, 35 passed and 9 skipped. The skipped tests are the pending gear tests (desktop and mobile), marked `fixme`.

## The owner and what they want

- The owner, Znap-, speaks Thai. Reply in Thai.
- **Visitors:** mostly osu! players who come for the **skins**. Skins are the most important part of the site.
- **What's wrong today:** the owner finds the current site cluttered, uninteresting, and hard to read.
- **What to keep:** the dark monochrome feel and the floating rounded-cross motif.
- **Typography:** fonts that are cute but simple and elegant. The owner rejected a wide, heavy esports font (Archivo) as looking weird.
- **No "AI slop":** no glassmorphism, no soft rounded cards everywhere, no gradient text, no tiny tracked uppercase labels on every element, and no decoration that doesn't come from the existing cross motif.
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

- Corners are square: no `rounded-*` except `rounded-full` on dots.
- Hairline borders use the `border-hairline` colour (`#2e2e2e`).
- Shared classes in `css/styles.css` under `@layer components`:
  - **Registration marks:** `.reg`, `.reg-t`, `.reg-b` draw "+" marks just outside a frame's corners (all four, top two, or bottom two). Don't put `overflow-hidden` on the same element, or the marks get clipped; put it on an inner wrapper instead.
  - **Buttons:** `.btn-primary` is solid white, `.btn-secondary` is a white outline.
  - **Tags:** `.tag` for small type labels.
- Nothing may appear only on hover. Download buttons, slide controls, dots, and zoom buttons are always visible.

### Skins section (done)

- The skin flagged `current: true` is featured. If none is flagged, the first skin is featured.
- **Featured banner:** short and wide (3:1 on desktop, 16:9 on mobile), with a CURRENT tag and the skin name.
- **Spec bar** under the banner holds:
  - screenshot thumbnails; clicking one swaps the banner image
  - the owner's `note`
  - `details` rows
  - a solid Download button
- **Other skins:** cards in a two-column grid (one column on mobile). Each card has:
  - a slider with always-visible prev/next arrows and clickable dots
  - swipe on touch devices
  - an instant switch when reduced motion is preferred
  - a type tag and an outline Download button
- **Lightbox:** clicking a banner or card screenshot, or its zoom button, opens the existing lightbox on the screenshot currently shown. The title is "Skin name — Screen label".
- **Header:** the section number, the "N skins" count, and an "Older skins" archive link.
- Placeholder ("Coming Soon") items and auto-generated card descriptions are removed.

## Remaining work, in order

### 1. Migrate the real content in `js/config.js` (not done)

The renderer supports the new skin shape, but the real config still uses the old one.

- On the Aristia skin:
  - add `current: true`
  - add `note`, taken from `skins.subtext` ("I'm way more comfortable playing with the Instafade skin :)")
  - add `details`, e.g. `[{ label: "Base", value: "Aristia" }, { label: "Hitcircles", value: "Instafade" }]`
- Clean up the skin names:
  - "Aristia Instafade (Znap- edit)"
  - "Milkteaism Hydro DT BETA (Znap- edit)"
  - "dddx15dt (Znap- edit)"
- Remove the "Coming Soon Skin" placeholder item, every `badgeClass` field, and `skins.subtext`.
- Keep `badgeText` ("High AR", "DT"); it is the type tag on cards.
- In `README.md` under "Updating Content", replace the `isPlaceholder` note with a description of `current`, `note`, and `details`.

### 2. Ticket 6: gear section as a spec sheet

The tests already exist in `tests/gear.spec.js`. Delete the `test.fixme(...)` line at the top, confirm the tests fail, then build until they pass.

- **One section:** put all five devices (tablet, keyboard, keypad, monitor, audio) inside the single `#hardware` section. Monitor and audio currently sit in a separate, unlabelled `<section>` after `#hardware`.
- **One treatment for every device:**
  - an `<article>` with the device name as an `<h3>` in `font-display`
  - setting values in hairline-divided cells (e.g. a `grid gap-px bg-hairline border border-hairline` container with `bg-background` cells)
  - each cell has a value and a small `text-muted` label, e.g. "Refresh rate"
- **How a value is shown:**
  - A single number plus unit (`0.3 mm`, `180 Hz`, `1 ms`) shows the number large in `font-display` and the unit small in `font-mono`.
  - Any other value (driver name, "Release: … | Trigger: …", resolution, "USB-C") shows as `font-mono` text.
  - The values are written by `renderFromConfig()` in `js/app.js` through element ids. That code needs a helper that splits number and unit.
- **Layout:** no zig-zag. Info on the left and the screenshot on the right for every device that has a screenshot. Monitor and audio, which have no screenshots, can sit side by side.
- **Screenshots:** full colour. Remove the `grayscale opacity-80` / hover treatment. Keep their lightbox buttons.
- **Possible test update:** if the tablet area value gets split into number and unit, the test "setting values use Geist Mono" in `tests/typography.spec.js` looks up `getByText('50 mm x 30 mm')`. Point it at a value that stays whole, e.g. the driver "Fixture Driver v1".

### 3. Ticket 7: naming, numbering, overlay, and footer

- Make navigation labels match section headings, in both the desktop and mobile nav:
  - "Hardware" becomes **Gear**
  - the heading "Gear & Settings" becomes **Gear**
  - "Overlays" stays the nav label, and the heading "My tosu overlay" becomes **Overlay**
- Number the sections in page order: Gear `01`, Skins `02` (already shown), Overlay `03`. Use the same header pattern as Skins: mono number, then the `font-display` heading.
- Restyle the overlay section and footer:
  - use `.btn-primary` / `.btn-secondary`, hairline frames, and `.reg*` marks
  - remove the glassmorphism (`backdrop-blur`, inset shadows) and the `/40`–`/80` opacity text
- Add a test in which each nav label equals its target section's `<h2>` text.

### 4. Finish

- Run `npm test`; everything should pass with nothing skipped.
- Review the branch, e.g. with the `code-review` skill, then fix what it finds.
- In `README.md`, add a Testing section: `npm test` runs Playwright against installed Google Chrome. Also list the new Tailwind classes.
- Take desktop and mobile screenshots for the owner to check.

## Not decided yet (ask the owner before doing these)

- **Section order:** move Skins above Gear and/or make the hero shorter. This was the biggest problem the site audit found. Today skins start about 3 screens down on desktop and about 9 on mobile.
- **Floating crosses:** whether the cross background should stay fixed across every section. Today it floats over all content while scrolling.
- **Hero:** the hero wordmark is a pre-drawn SVG in Geist Bold, and its entrance animation takes about 2 seconds. Both are out of scope unless the owner asks.

## How the tests work

- **Setup:**
  - `playwright.config.js` runs two projects: `desktop` (Desktop Chrome) and `mobile` (Pixel 7, touch).
  - Both use the **installed Google Chrome** (`channel: 'chrome'`). On a machine without Chrome, install it or remove `channel` and run `npx playwright install chromium`.
  - `workers: 2`, because more parallel Chrome instances caused timeouts on this machine.
  - The web server runs `npm run build && npx serve . -l 4173`, so `css/output.css` is rebuilt before every run.
- **The fixture:**
  - The test-only `tests/fixtures/config.js` replaces `js/config.js` at the network level, which is the single seam the tests use.
  - It covers both features: Bravo is flagged current with a note and details, Alpha and Charlie are plain cards, and there is one placeholder item.
  - `tests/fixture.js` also blocks third-party requests (Google Fonts, the osu! avatar) for speed and stability.
  - A test can change the data with `test.use({ configPatch: '<js run after SITE_CONFIG is defined>' })`.
- **What tests check:** only what a visitor sees and does, through roles, names, text, and computed styles. Don't assert class names or DOM structure.

## Gotchas

- **`css/output.css`** is committed. Rebuild it with `npm run build` after changing Tailwind classes in HTML or JS, `tailwind.config.js`, or `css/styles.css`, and commit the result.
- **Icon font:** Material Symbols loads only the icons listed in `icon_names` in `index.html`. Already listed: `download`, `zoom_in`, `chevron_left`, `chevron_right`, `arrow_outward`. Add any new icon there, in alphabetical order.
- **Line endings:** files use CRLF on Windows (`core.autocrlf=true`). The LF→CRLF git warnings are harmless.
- **`design.md`** is gitignored and out of date. Don't rely on it.
