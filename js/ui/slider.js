// @ts-check
import { sanitizeUrl } from '../utils/dom.js';
import { setLightboxTarget } from './lightbox.js';

// Featured skin: a thumbnail swaps the banner screenshot
export function initFeaturedSkin() {
    const featured = document.getElementById('skins-featured');
    const banner = document.getElementById('featured-skin-img');
    if (!featured || !(banner instanceof HTMLImageElement)) return;

    featured.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return;
        const thumb = e.target.closest('[data-featured-slide]');
        if (!(thumb instanceof HTMLElement)) return;
        const src = sanitizeUrl(thumb.dataset.src);
        if (!src) return;
        const alt = thumb.dataset.alt || '';
        const title = thumb.dataset.title || '';
        banner.src = src;
        banner.alt = alt;
        setLightboxTarget(featured, src, title, alt);
        featured.querySelectorAll('[data-featured-slide]').forEach((t) => {
            t.setAttribute('aria-pressed', String(t === thumb));
        });
    });
}

// Skin cards: step through screenshots with the arrows, the dots, or a horizontal swipe
export function initSkinSliders() {
    const grid = document.getElementById('skins-grid');
    if (!grid) return;

    /**
     * @param {HTMLElement} card
     * @param {number} index
     */
    function showSlide(card, index) {
        const track = card.querySelector('[data-skin-slider]');
        if (!(track instanceof HTMLElement)) return;
        const slides = Array.from(track.children).filter(
            /** @returns {el is HTMLImageElement} */
            (el) => el instanceof HTMLImageElement
        );
        if (!slides.length) return;
        const current = (index + slides.length) % slides.length;
        track.dataset.current = String(current);

        // Load the requested slide and preload adjacent neighbours instead of eagerly fetching every slide
        const indicesToLoad = new Set([
            current,
            (current + 1) % slides.length,
            (current - 1 + slides.length) % slides.length,
        ]);
        indicesToLoad.forEach((idx) => {
            const img = slides[idx];
            if (img && img.dataset.src) {
                const safeSrc = sanitizeUrl(img.dataset.src);
                if (safeSrc) img.src = safeSrc;
                img.removeAttribute('data-src');
            }
        });

        track.style.transform = `translateX(-${current * 100}%)`;
        slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== current)));

        const shown = slides[current];
        const shownSrc = shown.getAttribute('src') || '';
        setLightboxTarget(card, shownSrc, shown.dataset.title || '', shown.alt);
        card.querySelectorAll('[data-slide-to]').forEach((dot) => {
            if (dot instanceof HTMLElement) {
                dot.setAttribute('aria-current', String(Number(dot.dataset.slideTo) === current));
            }
        });
    }

    /**
     * @param {HTMLElement | null} card
     * @param {number} direction
     */
    function step(card, direction) {
        if (!card) return;
        const track = card.querySelector('[data-skin-slider]');
        if (track instanceof HTMLElement) {
            showSlide(card, Number(track.dataset.current) + direction);
        }
    }

    grid.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return;
        const control = e.target.closest('[data-slide-step], [data-slide-to]');
        if (!(control instanceof HTMLElement)) return;
        const card = control.closest('article');
        if (!(card instanceof HTMLElement)) return;
        if (control.dataset.slideStep) step(card, Number(control.dataset.slideStep));
        else showSlide(card, Number(control.dataset.slideTo));
    });

    /** @type {{ x: number, y: number, card: HTMLElement } | null} */
    let touchStart = null;
    grid.addEventListener('touchstart', (e) => {
        if (!(e.target instanceof Element)) return;
        const slider = e.target.closest('[data-skin-slider]');
        const card = slider?.closest('article');
        if (!slider || !(card instanceof HTMLElement)) return;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY, card };
    }, { passive: true });

    grid.addEventListener('touchend', (e) => {
        if (!touchStart) return;
        const { x, y, card } = touchStart;
        touchStart = null;
        const dx = e.changedTouches[0].clientX - x;
        const dy = e.changedTouches[0].clientY - y;
        // Ignore taps and mostly-vertical scrolling
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
        step(card, dx < 0 ? 1 : -1);
    }, { passive: true });
}
