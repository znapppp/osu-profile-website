// @ts-check
import { escapeHtml, sanitizeUrl } from '../utils/dom.js';
import { lightboxAttrs, zoomButton } from '../ui/lightbox.js';

/**
 * @param {import('../types.js').SkinItem} skin
 * @param {import('../types.js').SkinSlide | undefined} slide
 * @returns {string}
 */
function rawSlideAlt(skin, slide) {
    return slide?.alt || slide?.label || skin.name || '';
}

/**
 * @param {import('../types.js').SkinItem} skin
 * @param {import('../types.js').SkinSlide | undefined} slide
 * @returns {string}
 */
function rawSlideTitle(skin, slide) {
    return slide?.label ? `${skin.name} — ${slide.label}` : (skin.name || '');
}

/**
 * @param {import('../types.js').SkinItem} skin
 * @param {import('../types.js').SkinSlide | undefined} slide
 * @returns {string}
 */
function skinLightboxAttrs(skin, slide) {
    return lightboxAttrs(slide?.src || '', rawSlideTitle(skin, slide), rawSlideAlt(skin, slide));
}

/**
 * @param {import('../types.js').SkinItem} skin
 * @param {import('../types.js').SkinSlide | undefined} slide
 * @returns {string}
 */
function skinZoomButton(skin, slide) {
    return zoomButton(skin.name || '', slide?.src || '', rawSlideTitle(skin, slide), rawSlideAlt(skin, slide));
}

/**
 * Current skin: one frame. On desktop the screenshot sits left and a side panel (name, note, details, thumbnails, download) right;
 * on smaller screens the panel stacks under the screenshot.
 * @param {import('../types.js').SkinItem} skin
 * @returns {string}
 */
function renderFeaturedSkin(skin) {
    const slides = (skin.slides || []).filter((s) => Boolean(sanitizeUrl(s?.src)));
    const first = slides[0];
    const details = skin.details || [];
    const name = escapeHtml(skin.name);
    const downloadUrl = sanitizeUrl(skin.downloadUrl, '#');

    return `
    <article class="border border-hairline lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] opacity-0 transition-all duration-700 translate-y-8 scroll-reveal" aria-labelledby="featured-skin-name">
        <div class="relative overflow-hidden bg-black lg:flex lg:items-center">
            ${first ? `
            <img id="featured-skin-img" src="${escapeHtml(sanitizeUrl(first.src))}" alt="${escapeHtml(rawSlideAlt(skin, first))}" decoding="async" class="block w-full aspect-video object-contain bg-black cursor-zoom-in" ${skinLightboxAttrs(skin, first)} />
            ${skinZoomButton(skin, first)}
            ` : `
            <div class="w-full aspect-video bg-black flex items-center justify-center text-muted font-mono text-sm">No screenshot available</div>
            `}
        </div>
        <div class="flex flex-col divide-y divide-hairline border-t border-hairline lg:border-t-0 lg:border-l">
            <div class="flex flex-col items-start gap-2 px-4 py-3">
                <span class="tag bg-primary text-obsidian-deep">Current</span>
                <h3 id="featured-skin-name" class="font-display font-bold text-xl md:text-[28px] leading-tight text-primary">${name}</h3>
            </div>
            ${skin.note ? `<p class="p-4 text-[15px] leading-relaxed text-on-surface-variant lg:flex-1">${escapeHtml(skin.note)}</p>` : '<div class="lg:flex-1"></div>'}
            ${details.length ? `
            <dl class="grid grid-cols-[auto_1fr] gap-x-5 gap-y-1.5 p-4 text-sm">
                ${details.map((d) => `<dt class="text-muted">${escapeHtml(d.label)}</dt><dd class="font-mono text-primary">${escapeHtml(d.value)}</dd>`).join('')}
            </dl>` : ''}
            ${slides.length > 1 ? `
            <div class="flex gap-2.5 p-4" role="group" aria-label="Screenshots of ${name}">
                ${slides.map((slide, i) => {
                    const safeSrc = sanitizeUrl(slide.src);
                    return `
                <button type="button" data-featured-slide data-src="${escapeHtml(safeSrc)}" data-alt="${escapeHtml(rawSlideAlt(skin, slide))}" data-title="${escapeHtml(rawSlideTitle(skin, slide))}" aria-label="Show ${slide.label ? `${escapeHtml(slide.label)} screenshot` : `screenshot ${i + 1}`} of ${name}" aria-pressed="${i === 0}" class="w-[80px] min-h-[44px] sm:min-h-0 sm:w-[72px] shrink-0 rounded-md opacity-60 hover:opacity-100 aria-pressed:opacity-100 aria-pressed:outline aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-primary transition-opacity cursor-pointer">
                    <img src="${escapeHtml(safeSrc)}" alt="" loading="lazy" decoding="async" class="block w-full aspect-video object-cover" />
                </button>`;
                }).join('')}
            </div>` : ''}
            <div class="flex items-center p-4">
                <a href="${escapeHtml(downloadUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Download ${name}" class="btn-primary w-full">
                    <span>Download skin</span>
                    <span class="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
                </a>
            </div>
        </div>
    </article>`;
}

/**
 * One of the other skins: screenshot, name, type tag, and download.
 * @param {import('../types.js').SkinItem} skin
 * @param {number} index
 * @returns {string}
 */
function renderSkinCard(skin, index) {
    const slides = (skin.slides || []).filter((s) => Boolean(sanitizeUrl(s?.src)));
    const first = slides[0];
    const name = escapeHtml(skin.name);
    const downloadUrl = sanitizeUrl(skin.downloadUrl, '#');

    return `
    <article class="flex flex-col opacity-0 transition-all duration-700 translate-y-8 scroll-reveal" style="transition-delay: ${index * 100}ms;" aria-labelledby="skin-card-name-${index}">
        <div>
            <div class="relative overflow-hidden bg-surface-container">
                ${first ? `
                <div class="flex transition-transform duration-500 ease-in-out motion-reduce:transition-none cursor-zoom-in" data-skin-slider data-current="0" ${skinLightboxAttrs(skin, first)}>
                    ${slides.map((slide, i) => {
                        const safeSrc = sanitizeUrl(slide.src);
                        return `
                    <img ${i === 0 ? `src="${escapeHtml(safeSrc)}"` : `data-src="${escapeHtml(safeSrc)}" aria-hidden="true"`} data-title="${escapeHtml(rawSlideTitle(skin, slide))}" alt="${escapeHtml(rawSlideAlt(skin, slide))}" loading="lazy" decoding="async" class="block w-full min-w-full aspect-video object-contain bg-black" />`;
                    }).join('')}
                </div>
                ${skinZoomButton(skin, first)}
                ` : `
                <div class="w-full aspect-video bg-black flex items-center justify-center text-muted font-mono text-sm">No screenshot available</div>
                `}
                ${slides.length > 1 ? `
                <div class="absolute left-3 bottom-3 flex items-center rounded-md bg-obsidian-deep/85">
                    <button type="button" data-slide-step="-1" aria-label="Previous screenshot of ${name}" class="w-11 h-11 sm:w-9 sm:h-9 grid place-items-center rounded-md text-primary hover:bg-white/10 transition-colors cursor-pointer">
                        <span class="material-symbols-outlined text-[20px]" aria-hidden="true">chevron_left</span>
                    </button>
                    ${slides.map((_, i) => `
                    <button type="button" data-slide-to="${i}" aria-label="Show screenshot ${i + 1} of ${slides.length} of ${name}" aria-current="${i === 0}" class="w-7 h-11 sm:w-6 sm:h-9 grid place-items-center cursor-pointer before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/40 hover:before:bg-white/70 aria-[current=true]:before:bg-primary"></button>`).join('')}
                    <button type="button" data-slide-step="1" aria-label="Next screenshot of ${name}" class="w-11 h-11 sm:w-9 sm:h-9 grid place-items-center rounded-md text-primary hover:bg-white/10 transition-colors cursor-pointer">
                        <span class="material-symbols-outlined text-[20px]" aria-hidden="true">chevron_right</span>
                    </button>
                </div>` : ''}
            </div>
        </div>
        <div class="flex flex-col flex-1 gap-4 p-4 border border-t-0 border-hairline">
            <h3 id="skin-card-name-${index}" class="font-display font-bold text-lg leading-snug text-primary">${name}</h3>
            <div class="flex items-center justify-between gap-3 mt-auto">
                ${skin.badgeText ? `<span class="tag border border-outline text-on-surface">${escapeHtml(skin.badgeText)}</span>` : '<span></span>'}
                <a href="${escapeHtml(downloadUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Download ${name}" class="btn-secondary">
                    <span>Download</span>
                    <span class="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
                </a>
            </div>
        </div>
    </article>`;
}

/**
 * @param {import('../types.js').SkinsConfig | undefined} skins
 */
export function renderSkins(skins) {
    if (!skins) return;

    const driveLink = document.getElementById('skins-drive-link');
    const safeDriveUrl = sanitizeUrl(skins.driveFolderUrl);
    if (driveLink instanceof HTMLAnchorElement && safeDriveUrl) {
        driveLink.href = safeDriveUrl;
    } else if (driveLink) {
        driveLink.style.display = 'none';
    }

    const items = (skins.items || []).filter((item) => !item.isPlaceholder);
    const featuredIndex = Math.max(0, items.findIndex((item) => item.current));

    const countEl = document.getElementById('skins-count');
    if (countEl) countEl.textContent = `${items.length} ${items.length === 1 ? 'skin' : 'skins'}`;

    const featuredEl = document.getElementById('skins-featured');
    if (featuredEl && items[featuredIndex]) {
        featuredEl.innerHTML = renderFeaturedSkin(items[featuredIndex]);
    }

    const grid = document.getElementById('skins-grid');
    if (grid) {
        grid.innerHTML = items
            .filter((_, i) => i !== featuredIndex)
            .map((item, i) => renderSkinCard(item, i))
            .join('');
    }
}
