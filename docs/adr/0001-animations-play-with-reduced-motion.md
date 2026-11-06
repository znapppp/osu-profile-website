# Animations play even when reduced motion is preferred

Status: accepted, 2026-10-30

## Context

Chrome on Windows reports `prefers-reduced-motion: reduce` whenever Windows animation effects are off (Settings > Accessibility > Visual effects, or "Adjust for best performance"). Many osu! players tune their PCs that way and often turn off Chrome's hardware acceleration too. The owner's own PC has animation effects off.

So a rule that stops animations under `prefers-reduced-motion` hides the hero entrance, the floating crosses, the section reveals and the overlay preview from a large share of visitors. To them the site has no animations, and it looks like a hardware acceleration problem.

This has happened twice. The owner removed such a rule on 2026-10-23 (`055c9ba`). Later work added it back, and it was dropped again on 2026-10-30.

Measured on 2026-10-30 with Chrome 156:

- With `--disable-gpu`, which is what turning off hardware acceleration does, Chrome draws in software and still runs every animation at 60 fps.
- During the 2.5 s hero entrance it runs at 44 to 52 fps with the CPU throttled 4 to 6 times.
- Hardware acceleration was never the cause. The motion setting was.

## Decision

- The hero entrance, the floating crosses, the section reveals and the overlay preview autoplay ignore `prefers-reduced-motion`.
- Only the skin card slide transition and the nav underline transition are instant when reduced motion is preferred (spec user story 33).
- `tests/motion.spec.js` checks this with both motion settings. The `desktop-no-gpu` Playwright project runs it in Chrome without hardware acceleration.

## Consequences

- Visitors who turned motion off for comfort still see the hero animate. If that becomes a problem, add a way on the page to pause the animations, instead of following the system setting.
- A change that stops one of these animations under reduced motion fails `tests/motion.spec.js`.

## Update, 2026-11-06: the redesign

The redesign added the pinned hero with the page sliding over it, the crosses spreading out on entry, the outline-to-fill section headings, the screenshot reveals and wipe, and the overlay video growing on scroll. They follow the same decision and play under reduced motion: the owner's own PC reports reduced motion, so anything gated on it would never be seen there.

A first version also had a canvas of hit circles in the hero, a cursor trail, a ticker, animated setting drawings and a colour glow behind screenshots. The owner removed them as clutter after seeing them live; see the look note in the README.

Measured in Chrome with `--disable-gpu`, frames per second after the entrance, against the site before the redesign:

| | Before | After |
| --- | --- | --- |
| Hero, 1920x1080 | 60 | 60 |
| Hero, 1920x1080, CPU throttled 4 times | 60 | 60 |
| Hero, 2560x1440 | 60 | 60 |
| Overlay video playing, all three of the above | 60 | 60 |
| Scrolling the whole page in 8 s, 1920x1080 | 59 | 55 |

What that first version taught, for anyone adding a large effect:

- Stretching a whole-screen layer costs more than drawing it. A hero canvas drawn smaller to save pixels dropped to 44 fps at 1080p and 30 at 1440p.
- Measure while scrolling as well as at rest. A small stretched and masked canvas behind a frame cost nothing while the page was still and took scrolling down to 49 fps, because a moving layer like that has to be redone every frame.
