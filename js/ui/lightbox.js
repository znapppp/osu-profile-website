// @ts-check
import { escapeHtml, sanitizeUrl } from '../utils/dom.js';

/**
 * Attributes the lightbox reads to open a screenshot full size.
 * @param {string} src
 * @param {string} title
 * @param {string} alt
 * @returns {string}
 */
export function lightboxAttrs(src, title, alt) {
    const safeSrc = sanitizeUrl(src);
    return `data-lightbox="${escapeHtml(safeSrc)}" data-lightbox-title="${escapeHtml(title)}" data-lightbox-alt="${escapeHtml(alt)}"`;
}

/**
 * @param {string} skinName
 * @param {string} src
 * @param {string} title
 * @param {string} alt
 * @returns {string}
 */
export function zoomButton(skinName, src, title, alt) {
    return `
    <button type="button" ${lightboxAttrs(src, title, alt)} aria-label="View ${escapeHtml(skinName)} screenshot full size" class="absolute top-3 right-3 w-11 h-11 sm:w-9 sm:h-9 grid place-items-center rounded-md bg-obsidian-deep/85 text-primary hover:bg-obsidian-deep transition-colors cursor-zoom-in">
        <span class="material-symbols-outlined text-[18px]" aria-hidden="true">zoom_in</span>
    </button>`;
}

/**
 * Points every lightbox trigger inside `root` at a new screenshot.
 * @param {ParentNode} root
 * @param {string} src
 * @param {string} title
 * @param {string} alt
 */
export function setLightboxTarget(root, src, title, alt) {
    const safeSrc = sanitizeUrl(src);
    root.querySelectorAll('[data-lightbox]').forEach((trigger) => {
        if (trigger instanceof HTMLElement) {
            trigger.dataset.lightbox = safeSrc;
            trigger.dataset.lightboxTitle = title;
            trigger.dataset.lightboxAlt = alt;
        }
    });
}

// Accessible Image Lightbox Viewer
export function initLightbox() {
    const dialog = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const closeBtn = document.getElementById('lightbox-close');

    if (!(dialog instanceof HTMLDialogElement) || !(lightboxImg instanceof HTMLImageElement) || !closeBtn) return;

    const modal = dialog;
    const imgEl = lightboxImg;
    const closeButton = closeBtn;

    /** @type {Element | null} */
    let previousActiveElement = null;

    /**
     * @param {string} src
     * @param {string} alt
     * @param {string} title
     */
    function openLightbox(src, alt, title) {
        const safeSrc = sanitizeUrl(src);
        if (!safeSrc) return;
        previousActiveElement = document.activeElement;
        imgEl.src = safeSrc;
        imgEl.alt = alt || title || 'Enlarged settings preview';
        if (lightboxTitle) lightboxTitle.textContent = title || alt || '';

        if (typeof modal.showModal === 'function') {
            modal.showModal();
        } else {
            modal.setAttribute('open', '');
        }
        document.body.style.overflow = 'hidden';
        closeButton.focus();
    }

    function closeLightbox() {
        if (typeof modal.close === 'function') {
            modal.close();
        } else {
            modal.removeAttribute('open');
        }
        document.body.style.overflow = '';
        imgEl.removeAttribute('src');
        if (previousActiveElement instanceof HTMLElement) {
            previousActiveElement.focus();
        }
    }

    document.addEventListener('click', (e) => {
        if (!(e.target instanceof Element)) return;
        const trigger = e.target.closest('[data-lightbox]');
        if (trigger) {
            e.preventDefault();
            const src = trigger.getAttribute('data-lightbox') || '';
            const title = trigger.getAttribute('data-lightbox-title') || '';
            const img = trigger.querySelector('img');
            const alt = trigger.getAttribute('data-lightbox-alt') || (img ? img.alt : '');
            openLightbox(src, alt, title);
        }
    });

    closeButton.addEventListener('click', closeLightbox);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLightbox();
        }
    });

    modal.addEventListener('cancel', (e) => {
        e.preventDefault();
        closeLightbox();
    });
}
