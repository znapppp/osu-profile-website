// @ts-check
import { sanitizeUrl } from '../utils/dom.js';

/**
 * Quantitative metrics ("180 Hz", "0.3 mm") show the number large; plain text fields stay monospace.
 * @param {string} id
 * @param {string | undefined} text
 * @param {boolean} [isNumeric=false]
 */
function setSpecValue(id, text, isNumeric = false) {
    const el = document.getElementById(id);
    if (!el || !text) return;
    el.title = text;
    if (!isNumeric) {
        el.textContent = text;
        return;
    }
    const match = /^(\d+(?:\.\d+)?)\s+([A-Za-z%]+(?:\s*\([^)]*\))?)$/.exec(text);
    if (!match) {
        el.textContent = text;
        return;
    }
    const number = document.createElement('span');
    number.className = 'font-display font-bold text-3xl leading-none';
    number.textContent = match[1];
    const unit = document.createElement('span');
    unit.className = 'font-mono text-sm text-muted';
    unit.textContent = match[2];
    el.replaceChildren(number, ' ', unit);
}

/**
 * Turns a shown setting value into a link out, e.g. the driver name to its download page.
 * @param {string} id
 * @param {string | undefined} url
 */
function linkSpecValue(id, url) {
    const el = document.getElementById(id);
    const safeUrl = sanitizeUrl(url);
    if (!el || !safeUrl || !el.firstChild) return;
    const link = document.createElement('a');
    link.href = safeUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'group inline-flex items-center gap-1';
    const text = document.createElement('span');
    text.className = 'underline underline-offset-4 decoration-outline group-hover:decoration-primary transition-colors';
    text.append(...el.childNodes);
    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined text-[16px]';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = 'arrow_outward';
    link.append(text, icon);
    el.replaceChildren(link);
}

/**
 * Gear spec sheet: tablet, keyboard, monitor, audio.
 * @param {import('../types.js').SiteConfig} config
 */
export function renderGear(config) {
    const gear = [
        {
            prefix: 'tablet',
            data: config.tablet,
            fields: [
                { suffix: 'area', value: config.tablet?.area, numeric: false },
                { suffix: 'driver', value: config.tablet?.driverName, numeric: false },
            ],
            driverUrl: config.tablet?.driverDownloadUrl,
        },
        {
            prefix: 'keyboard',
            data: config.keyboard,
            fields: [
                { suffix: 'actuation', value: config.keyboard?.actuationPoint, numeric: true },
                { suffix: 'rapid', value: config.keyboard?.rapidTrigger, numeric: true },
                { suffix: 'keybind', value: config.keyboard?.keybind, numeric: false },
            ],
            driverUrl: undefined,
        },
        {
            prefix: 'monitor',
            data: config.monitor,
            fields: [
                { suffix: 'refresh', value: config.monitor?.refreshRate, numeric: true },
                { suffix: 'resolution', value: config.monitor?.resolution, numeric: false },
            ],
            driverUrl: undefined,
        },
        {
            prefix: 'audio',
            data: config.audio,
            fields: [
                { suffix: 'conn', value: config.audio?.connector, numeric: false },
                { suffix: 'type', value: config.audio?.type, numeric: false },
            ],
            driverUrl: undefined,
        },
    ];

    gear.forEach(({ prefix, data, fields, driverUrl }) => {
        if (!data) return;
        const device = document.getElementById(`${prefix}-device`);
        if (device && data.device) device.textContent = data.device;
        fields.forEach(({ suffix, value, numeric }) => setSpecValue(`${prefix}-${suffix}`, value, numeric));
        if (driverUrl) {
            linkSpecValue(`${prefix}-driver`, driverUrl);
        }

        const img = document.getElementById(`${prefix}-img`);
        if (img instanceof HTMLImageElement) {
            const btn = img.closest('[data-lightbox]');
            const safeImg = 'previewImage' in data ? sanitizeUrl(data.previewImage) : '';
            if (safeImg && 'previewImage' in data) {
                const altText = data.previewAlt || `${data.device || prefix} settings`;
                img.src = safeImg;
                img.alt = altText;
                if (btn) {
                    btn.setAttribute('data-lightbox', safeImg);
                    btn.setAttribute('data-lightbox-title', altText);
                    btn.setAttribute('data-lightbox-alt', altText);
                    btn.setAttribute('aria-label', `Expand ${altText} image`);
                }
            } else if (btn instanceof HTMLElement) {
                btn.hidden = true;
                btn.style.display = 'none';
            }
        }
    });
}
