// @ts-check
// Shared DOM escaping, URL sanitization, motion query, and notification helpers

/** @type {Record<string, string>} */
const HTML_ESCAPES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
};

/**
 * Config text is built into HTML strings; escape it so a quote or "<" in a name can't break the markup.
 * @param {unknown} text
 * @returns {string}
 */
export function escapeHtml(text) {
    return String(text ?? '').replace(/[&<>"']/g, (c) => HTML_ESCAPES[c] || c);
}

/**
 * Allows http(s), hash fragments, and relative asset paths; blocks dangerous schemes such as javascript: or data:.
 * @param {unknown} url
 * @param {string} [fallback='']
 * @returns {string}
 */
export function sanitizeUrl(url, fallback = '') {
    const trimmed = String(url ?? '').trim();
    if (!trimmed) return fallback;
    const normalized = trimmed.replace(/[\u0000-\u001F\u007F\s]+/g, '');
    const schemeMatch = /^([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(normalized);
    if (schemeMatch) {
        const scheme = schemeMatch[1].toLowerCase();
        return scheme === 'https' || scheme === 'http' ? trimmed : fallback;
    }
    return trimmed;
}

/**
 * @returns {boolean}
 */
export function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** @type {ReturnType<typeof setTimeout> | undefined} */
let toastTimer;

/**
 * @param {string} msg
 */
export function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.classList.add('visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.style.opacity = '0';
        toast.classList.remove('visible');
    }, 2500);
}
