// @ts-check

/**
 * @param {number} v
 * @returns {number}
 */
const clamp01 = (v) => Math.min(1, Math.max(0, v));

// Everything tied to the scroll position or the mouse, written once per frame: header state, the hero's exit and depth,
// section heading drift, and the overlay video growing into place.
export function initScrollEffects() {
    const header = document.getElementById('site-header');
    const hero = document.getElementById('overview');
    const heroContent = hero?.querySelector('[data-hero-content]');
    const clusters = Array.from(document.querySelectorAll('[data-cluster]')).filter(
        /** @returns {el is HTMLElement} */
        (el) => el instanceof HTMLElement
    );
    const titles = Array.from(document.querySelectorAll('.section-title')).filter(
        /** @returns {el is HTMLElement} */
        (el) => el instanceof HTMLElement
    );
    const zoomFrames = Array.from(document.querySelectorAll('[data-scroll-zoom]')).filter(
        /** @returns {el is HTMLElement} */
        (el) => el instanceof HTMLElement
    );

    let pointerX = 0;
    let pointerY = 0;
    let smoothX = 0;
    let smoothY = 0;
    let queued = false;

    function frame() {
        queued = false;
        const y = window.scrollY;
        const vh = window.innerHeight;

        if (header) header.toggleAttribute('data-scrolled', y > 24);

        const heroHeight = hero ? hero.offsetHeight : 0;
        const heroProgress = heroHeight ? clamp01(y / heroHeight) : 1;
        document.body.classList.toggle('hero-past', heroHeight > 0 && y >= heroHeight);

        if (heroProgress < 1) {
            if (heroContent instanceof HTMLElement) {
                if (heroProgress === 0) {
                    heroContent.style.transform = '';
                    heroContent.style.opacity = '';
                } else {
                    heroContent.style.transform = `translateY(${(-heroProgress * 7).toFixed(2)}vh) scale(${(1 + heroProgress * 0.2).toFixed(4)})`;
                    heroContent.style.opacity = clamp01(1 - heroProgress * 1.35).toFixed(3);
                }
            }

            // Crosses spread outward on the way out and lean away from the mouse
            smoothX += (pointerX - smoothX) * 0.08;
            smoothY += (pointerY - smoothY) * 0.08;
            clusters.forEach((el) => {
                const dx = Number(el.dataset.dx) || 0;
                const dy = Number(el.dataset.dy) || 0;
                const depth = Number(el.dataset.depth) || 1;
                const x = dx * heroProgress * 170 - smoothX * 18 * depth;
                const y2 = dy * heroProgress * 120 - smoothY * 14 * depth;
                el.style.translate = `${x.toFixed(1)}px ${y2.toFixed(1)}px`;
            });
            if (Math.abs(pointerX - smoothX) > 0.002 || Math.abs(pointerY - smoothY) > 0.002) queue();
        }

        titles.forEach((title) => {
            const top = title.getBoundingClientRect().top;
            if (top > vh * 1.2 || top < -vh) return;
            const p = clamp01((vh - top) / (vh * 0.7));
            title.style.transform = p >= 1 ? '' : `translateX(${((1 - p) * 7).toFixed(2)}vw)`;
        });

        zoomFrames.forEach((el) => {
            const top = el.parentElement ? el.parentElement.getBoundingClientRect().top : 0;
            if (top > vh * 1.2 || top < -vh * 1.5) return;
            const p = clamp01((vh - top) / (vh * 0.7));
            el.style.transform = p >= 1 ? '' : `scale(${(0.84 + 0.16 * p).toFixed(4)})`;
        });
    }

    function queue() {
        if (queued) return;
        queued = true;
        window.requestAnimationFrame(frame);
    }

    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    window.addEventListener('pointermove', (e) => {
        if (e.pointerType !== 'mouse' || window.scrollY >= window.innerHeight) return;
        pointerX = (e.clientX / window.innerWidth) * 2 - 1;
        pointerY = (e.clientY / window.innerHeight) * 2 - 1;
        queue();
    }, { passive: true });

    frame();
}
