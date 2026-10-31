// @ts-check
import { prefersReducedMotion } from '../utils/dom.js';

// Scroll Reveal Intersection Observer
export function initScrollReveal() {
    const targets = document.querySelectorAll('.scroll-reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    targets.forEach((el) => observer.observe(el));
}

// Mobile Navigation Drawer Toggle
export function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('mobile-menu-icon');
    if (!toggleBtn || !menu) return;

    const btnEl = toggleBtn;
    const menuEl = menu;

    /**
     * @param {boolean} [forceClose=false]
     */
    function toggleMenu(forceClose = false) {
        const isExpanded = forceClose ? false : menuEl.classList.contains('hidden');
        if (isExpanded) {
            menuEl.classList.remove('hidden');
            menuEl.classList.add('flex');
            btnEl.setAttribute('aria-expanded', 'true');
            if (menuIcon) menuIcon.textContent = 'close';
        } else {
            menuEl.classList.add('hidden');
            menuEl.classList.remove('flex');
            btnEl.setAttribute('aria-expanded', 'false');
            if (menuIcon) menuIcon.textContent = 'menu';
        }
    }

    btnEl.addEventListener('click', () => toggleMenu());

    // Auto-close menu when tapping any link
    menuEl.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => toggleMenu(true));
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 640 && !menuEl.classList.contains('hidden')) {
            toggleMenu(true);
        }
    }, { passive: true });
}

// Navigation highlighting with RAF throttling and Home top-scroll handler
export function initNavScroll() {
    document.querySelectorAll('header a[data-path="overview"]').forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion() ? 'instant' : 'smooth',
            });
        });
    });

    const desktopLinks = document.querySelectorAll('header nav:not(#mobile-menu) a[data-path]');
    const mobileLinks = document.querySelectorAll('#mobile-menu a[data-path]');
    const sections = Array.from(desktopLinks)
        .map((a) => document.getElementById(a.getAttribute('data-path') || ''))
        .filter(
            /** @returns {el is HTMLElement} */
            (el) => el instanceof HTMLElement
        );

    /**
     * @param {Element} link
     * @param {boolean} isActive
     */
    const setCurrent = (link, isActive) => {
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    };

    /** @type {string | null} */
    let lastActive = null;
    const update = () => {
        let current = '';

        if (window.scrollY < 300) {
            current = 'overview';
        } else if (Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 20) {
            current = sections[sections.length - 1]?.id || '';
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                if (sections[i].getBoundingClientRect().top <= 200) {
                    current = sections[i].id;
                    break;
                }
            }
        }

        // Skip class writes when the active section hasn't changed
        if (current === lastActive) return;
        lastActive = current;

        desktopLinks.forEach((link) => {
            const isActive = link.getAttribute('data-path') === current;
            link.classList.toggle('text-primary', isActive);
            link.classList.toggle('text-on-surface-variant', !isActive);
            setCurrent(link, isActive);
        });

        mobileLinks.forEach((link) => {
            const isActive = link.getAttribute('data-path') === current;
            link.classList.toggle('text-primary', isActive);
            // Active gets the solid fill; others a lighter one on hover, so the two never look alike
            link.classList.toggle('bg-surface-container', isActive);
            link.classList.toggle('hover:bg-surface-container/50', !isActive);
            link.classList.toggle('text-on-surface-variant', !isActive);
            setCurrent(link, isActive);
        });
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                update();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    window.addEventListener('resize', update, { passive: true });

    // The page can open mid-scroll (a #section link or restored position), so mark the section in view now
    update();
}
