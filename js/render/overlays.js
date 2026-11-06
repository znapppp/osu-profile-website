// @ts-check
import { escapeHtml, sanitizeUrl } from '../utils/dom.js';

/**
 * One tosu overlay: the preview video or image across the full width, with name, description, spec cells and links under it.
 * @param {import('../types.js').OverlayItem} item
 * @param {number} index
 * @returns {string}
 */
function renderOverlay(item, index) {
    const name = escapeHtml(item.name);
    const specs = item.specs || [];
    const safeImgSrc = sanitizeUrl(item.previewImg);
    const safeVideoSrc = sanitizeUrl(item.previewVideo);
    const safeDownloadUrl = item.downloadUrl && item.downloadUrl !== '#' ? sanitizeUrl(item.downloadUrl) : '';
    const safeVideoPreviewUrl = sanitizeUrl(item.videoPreviewUrl);
    const safeSourceRefUrl = sanitizeUrl(item.sourceRefUrl);

    return `
    <article class="flex flex-col gap-10 md:gap-14 scroll-reveal" style="transition-delay: ${index * 100}ms;" aria-labelledby="overlay-name-${index}">
        <!-- Video/image showcase: grows into place on scroll -->
        <div class="overlay-stage">
            <div class="overlay-frame" data-scroll-zoom>
                ${safeVideoSrc ? `
                <video id="overlay-preview-video-${index}" class="video-layer absolute inset-0 w-full h-full object-cover" src="${escapeHtml(safeVideoSrc)}" ${safeImgSrc ? `poster="${escapeHtml(safeImgSrc)}"` : ''} loop muted playsinline preload="none" aria-label="${name} video preview"></video>
                ` : (safeImgSrc ? `
                <img class="absolute inset-0 w-full h-full object-contain" src="${escapeHtml(safeImgSrc)}" alt="${name} preview" loading="lazy" decoding="async" />
                ` : `
                <div class="absolute inset-0 bg-surface-container flex items-center justify-center text-muted font-mono text-sm">No preview available</div>
                `)}
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <!-- Left: name and description -->
            <div class="md:col-span-5">
                <h3 id="overlay-name-${index}" class="overlay-name mb-4 [overflow-wrap:anywhere]">${name}</h3>
                ${item.description ? `<p class="font-sans text-base text-on-surface-variant max-w-xl leading-relaxed">${escapeHtml(item.description)}</p>` : ''}
            </div>

            <!-- Right: specs and actions -->
            <div class="md:col-span-7 flex flex-col gap-6">
                ${specs.length ? `
                <dl class="spec-grid spec-grid--stack grid-cols-1 sm:grid-cols-2">
                    ${specs.map((spec, i) => `
                    <div class="spec-cell${specs.length % 2 && i === specs.length - 1 ? ' sm:col-span-2' : ''}">
                        <dt>${escapeHtml(spec.label)}</dt>
                        <dd class="spec-value">${escapeHtml(spec.value)}</dd>
                    </div>`).join('')}
                </dl>` : ''}

                <!-- Action Buttons & Credit -->
                <div class="flex flex-col gap-3">
                    <div class="flex flex-wrap items-center gap-3">
                        ${safeDownloadUrl ? `
                        <a href="${escapeHtml(safeDownloadUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Download overlay ${name} (.zip)" class="btn-primary">
                            <span class="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
                            <span>Download Overlay (.zip)</span>
                        </a>` : ''}
                        ${safeVideoPreviewUrl ? `
                        <a href="${escapeHtml(safeVideoPreviewUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Watch video preview for ${name}" class="btn-secondary">
                            <span class="material-symbols-outlined text-[18px]" aria-hidden="true">smart_display</span>
                            <span>Video Preview</span>
                            <span class="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_outward</span>
                        </a>` : ''}
                    </div>

                    ${safeSourceRefUrl ? `
                    <p class="text-xs text-on-surface-variant flex flex-wrap items-center gap-x-1.5 gap-y-0.5 pt-1">
                        <span>Forked from:</span>
                        <a href="${escapeHtml(safeSourceRefUrl)}" target="_blank" rel="noopener noreferrer" class="min-w-0 [overflow-wrap:anywhere] text-primary underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">${escapeHtml(item.sourceRefName || item.sourceRefUrl)}</a>
                    </p>` : ''}
                </div>
            </div>
        </div>
    </article>`;
}

/**
 * @param {import('../types.js').OverlaysConfig | undefined} overlays
 */
export function renderOverlays(overlays) {
    if (!overlays) return;

    const githubLink = document.getElementById('overlays-github-link');
    const safeGithubUrl = sanitizeUrl(overlays.githubUrl);
    if (githubLink instanceof HTMLAnchorElement && safeGithubUrl) {
        githubLink.href = safeGithubUrl;
    } else if (githubLink) {
        githubLink.style.display = 'none';
    }

    const tosuLink = document.getElementById('tosu-download-link');
    const safeTosuUrl = sanitizeUrl(overlays.tosuDownloadUrl);
    if (tosuLink instanceof HTMLAnchorElement && safeTosuUrl) {
        tosuLink.href = safeTosuUrl;
    } else if (tosuLink && !safeTosuUrl) {
        tosuLink.style.display = 'none';
    }

    const grid = document.getElementById('overlays-grid');
    if (grid && Array.isArray(overlays.items) && overlays.items.length > 0) {
        grid.innerHTML = overlays.items.map(renderOverlay).join('');

        // IntersectionObserver for video playback: Play only when visible on screen
        const videos = grid.querySelectorAll('video.video-layer');
        if ('IntersectionObserver' in window && videos.length > 0) {
            const videoObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const v = entry.target;
                    if (!(v instanceof HTMLVideoElement)) return;
                    if (entry.isIntersecting) {
                        const playPromise = v.play();
                        if (playPromise !== undefined) {
                            playPromise.catch(() => {});
                        }
                    } else {
                        v.pause();
                    }
                });
            }, { threshold: 0.25 });

            videos.forEach((v) => videoObserver.observe(v));
        }
    }
}
