/* ==========================================================================
   Znap- osu! Setup Configuration - Interactive Application Logic (Tailwind)
   ========================================================================== */

// Config text is built into HTML strings; escape it so a quote or "<" in a name can't break the markup
function escapeHtml(text) {
    return String(text ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
}

// Alt text and lightbox title for one screenshot of a skin, escaped for use in markup
function slideAlt(skin, slide) {
    return escapeHtml(slide.alt || slide.label || skin.name);
}

function slideTitle(skin, slide) {
    return escapeHtml(slide.label ? `${skin.name} — ${slide.label}` : skin.name);
}

// Attributes the lightbox reads to open a skin screenshot full size
function lightboxAttrs(skin, slide) {
    return `data-lightbox="${escapeHtml(slide.src)}" data-lightbox-title="${slideTitle(skin, slide)}" data-lightbox-alt="${slideAlt(skin, slide)}"`;
}

function zoomButton(skin, slide) {
    return `
    <button type="button" ${lightboxAttrs(skin, slide)} aria-label="View ${escapeHtml(skin.name)} screenshot full size" class="absolute top-3 right-3 w-8 h-8 grid place-items-center rounded-md bg-obsidian-deep/85 text-primary hover:bg-obsidian-deep transition-colors cursor-zoom-in">
        <span class="material-symbols-outlined text-[18px]" aria-hidden="true">zoom_in</span>
    </button>`;
}

// Points every lightbox trigger inside `root` at a new screenshot
function setLightboxTarget(root, src, title, alt) {
    root.querySelectorAll('[data-lightbox]').forEach((trigger) => {
        trigger.dataset.lightbox = src;
        trigger.dataset.lightboxTitle = title;
        trigger.dataset.lightboxAlt = alt;
    });
}

// Current skin: one frame. On desktop the screenshot sits left and a side panel (name, note, details, thumbnails, download) right;
// on smaller screens the panel stacks under the screenshot
function renderFeaturedSkin(skin) {
    const slides = skin.slides || [];
    const first = slides[0] || {};
    const details = skin.details || [];
    const name = escapeHtml(skin.name);

    return `
    <article class="border border-hairline lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] opacity-0 transition-all duration-700 translate-y-8 scroll-reveal" aria-labelledby="featured-skin-name">
        <div class="relative overflow-hidden bg-black lg:flex lg:items-center">
            <img id="featured-skin-img" src="${escapeHtml(first.src)}" alt="${slideAlt(skin, first)}" decoding="async" class="block w-full aspect-video object-contain bg-black cursor-zoom-in" ${lightboxAttrs(skin, first)} />
            ${zoomButton(skin, first)}
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
                ${slides.map((slide, i) => `
                <button type="button" data-featured-slide data-src="${escapeHtml(slide.src)}" data-alt="${slideAlt(skin, slide)}" data-title="${slideTitle(skin, slide)}" aria-label="Show ${slide.label ? `${escapeHtml(slide.label)} screenshot` : `screenshot ${i + 1}`} of ${name}" aria-pressed="${i === 0}" class="w-[72px] shrink-0 rounded-md opacity-60 hover:opacity-100 aria-pressed:opacity-100 aria-pressed:outline aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-primary transition-opacity cursor-pointer">
                    <img src="${escapeHtml(slide.src)}" alt="" loading="lazy" decoding="async" class="block w-full aspect-video object-cover" />
                </button>`).join('')}
            </div>` : ''}
            <div class="flex items-center p-4">
                <a href="${escapeHtml(skin.downloadUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Download ${name}" class="btn-primary w-full">
                    <span>Download skin</span>
                    <span class="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
                </a>
            </div>
        </div>
    </article>`;
}

// One of the other skins: screenshot, name, type tag, and download
function renderSkinCard(skin, index) {
    const slides = skin.slides || [];
    const name = escapeHtml(skin.name);

    return `
    <article class="flex flex-col opacity-0 transition-all duration-700 translate-y-8 scroll-reveal" style="transition-delay: ${index * 100}ms;" aria-labelledby="skin-card-name-${index}">
        <div>
            <div class="relative overflow-hidden bg-surface-container">
                <div class="flex transition-transform duration-500 ease-in-out motion-reduce:transition-none cursor-zoom-in" data-skin-slider data-current="0" ${lightboxAttrs(skin, slides[0] || {})}>
                    ${slides.map((slide, i) => `
                    <img ${i === 0 ? `src="${escapeHtml(slide.src)}"` : `data-src="${escapeHtml(slide.src)}" aria-hidden="true"`} data-title="${slideTitle(skin, slide)}" alt="${slideAlt(skin, slide)}" loading="lazy" decoding="async" class="block w-full min-w-full aspect-video object-contain bg-black" />`).join('')}
                </div>
                ${zoomButton(skin, slides[0] || {})}
                ${slides.length > 1 ? `
                <div class="absolute left-3 bottom-3 flex items-center rounded-md bg-obsidian-deep/85">
                    <button type="button" data-slide-step="-1" aria-label="Previous screenshot of ${name}" class="w-8 h-8 grid place-items-center rounded-md text-primary hover:bg-white/10 transition-colors cursor-pointer">
                        <span class="material-symbols-outlined text-[20px]" aria-hidden="true">chevron_left</span>
                    </button>
                    ${slides.map((_, i) => `
                    <button type="button" data-slide-to="${i}" aria-label="Show screenshot ${i + 1} of ${slides.length} of ${name}" aria-current="${i === 0}" class="w-5 h-8 grid place-items-center cursor-pointer before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/40 hover:before:bg-white/70 aria-[current=true]:before:bg-primary"></button>`).join('')}
                    <button type="button" data-slide-step="1" aria-label="Next screenshot of ${name}" class="w-8 h-8 grid place-items-center rounded-md text-primary hover:bg-white/10 transition-colors cursor-pointer">
                        <span class="material-symbols-outlined text-[20px]" aria-hidden="true">chevron_right</span>
                    </button>
                </div>` : ''}
            </div>
        </div>
        <div class="flex flex-col flex-1 gap-4 p-4 border border-t-0 border-hairline">
            <h3 id="skin-card-name-${index}" class="font-display font-bold text-lg leading-snug text-primary">${name}</h3>
            <div class="flex items-center justify-between gap-3 mt-auto">
                ${skin.badgeText ? `<span class="tag border border-outline text-on-surface">${escapeHtml(skin.badgeText)}</span>` : '<span></span>'}
                <a href="${escapeHtml(skin.downloadUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Download ${name}" class="btn-secondary">
                    <span>Download</span>
                    <span class="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
                </a>
            </div>
        </div>
    </article>`;
}

// One tosu overlay: name, description, spec cells, links, and the preview video or image beside them
function renderOverlay(item, index) {
    const name = escapeHtml(item.name);
    const specs = item.specs || [];
    const imgSrc = escapeHtml(item.previewImg || (item.slides && item.slides.length > 0 ? item.slides[0].src : ''));
    const downloadUrl = item.downloadUrl && item.downloadUrl !== '#' ? escapeHtml(item.downloadUrl) : '';

    return `
    <article class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center opacity-0 transition-all duration-700 translate-y-8 scroll-reveal" style="transition-delay: ${index * 100}ms;" aria-labelledby="overlay-name-${index}">
        <!-- Left: Info & Specs (5 Cols) -->
        <div class="md:col-span-5 flex flex-col gap-4 md:gap-5">
            <div>
                <h3 id="overlay-name-${index}" class="font-display font-bold text-2xl md:text-3xl text-primary mb-2">${name}</h3>
                ${item.description ? `<p class="font-sans text-sm md:text-base text-on-surface-variant max-w-lg leading-relaxed">${escapeHtml(item.description)}</p>` : ''}
            </div>

            ${specs.length ? `
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-hairline border border-hairline">
                ${specs.map((spec, i) => `
                <div class="bg-background p-4 flex flex-col-reverse justify-end gap-1 min-w-0${specs.length % 2 && i === specs.length - 1 ? ' sm:col-span-2' : ''}">
                    <dt class="text-xs text-muted">${escapeHtml(spec.label)}</dt>
                    <dd class="font-mono text-sm text-primary">${escapeHtml(spec.value)}</dd>
                </div>`).join('')}
            </dl>` : ''}

            <!-- Action Buttons & Credit -->
            <div class="flex flex-col gap-3 mt-1">
                <div class="flex flex-wrap items-center gap-3">
                    ${downloadUrl ? `
                    <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" aria-label="Download overlay ${name} (.zip)" class="btn-primary">
                        <span class="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
                        <span>Download Overlay (.zip)</span>
                    </a>` : ''}
                    ${item.videoPreviewUrl ? `
                    <a href="${escapeHtml(item.videoPreviewUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Watch video preview for ${name}" class="btn-secondary">
                        <span class="material-symbols-outlined text-[18px]" aria-hidden="true">smart_display</span>
                        <span>Video Preview</span>
                        <span class="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_outward</span>
                    </a>` : ''}
                    ${item.githubUrl ? `
                    <a href="${escapeHtml(item.githubUrl)}" target="_blank" rel="noopener noreferrer" aria-label="View overlay source code on GitHub" class="btn-secondary">
                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                        <span>Source Code</span>
                    </a>` : ''}
                </div>

                ${item.sourceRefUrl ? `
                <p class="text-xs text-on-surface-variant flex items-center gap-1.5 pt-1">
                    <span>Forked from:</span>
                    <a href="${escapeHtml(item.sourceRefUrl)}" target="_blank" rel="noopener noreferrer" class="text-primary underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">${escapeHtml(item.sourceRefName || item.sourceRefUrl)}</a>
                </p>` : ''}
            </div>
        </div>

        <!-- Right: Large Video/Image Showcase (7 Cols) -->
        <div class="md:col-span-7 relative group">
            <div class="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-surface-container border border-hairline">
                ${item.previewVideo ? `
                <video id="overlay-preview-video-${index}" class="video-layer absolute inset-0 w-full h-full object-cover" src="${escapeHtml(item.previewVideo)}" ${imgSrc ? `poster="${imgSrc}"` : ''} loop muted playsinline preload="none" aria-label="${name} video preview"></video>
                ` : (imgSrc ? `
                <img class="absolute inset-0 w-full h-full object-contain" src="${imgSrc}" alt="${name} preview" loading="lazy" decoding="async" />
                ` : `
                <div class="absolute inset-0 bg-surface-container flex items-center justify-center text-muted font-mono text-sm">No preview available</div>
                `)}
            </div>
        </div>
    </article>`;
}

// A lone number with a unit ("180 Hz", "0.3 mm") shows the number large; anything else stays plain text
function setSpecValue(id, text) {
    const el = document.getElementById(id);
    if (!el || !text) return;
    el.title = text;
    const match = /^(\d+(?:\.\d+)?)\s+([A-Za-z]+(?:\s*\([^)]*\))?)$/.exec(text);
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

// Turns a shown setting value into a link out, e.g. the driver name to its download page
function linkSpecValue(id, url) {
    const el = document.getElementById(id);
    if (!el || !url || !el.firstChild) return;
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.className = 'inline-flex items-center gap-1 underline underline-offset-4 decoration-outline hover:decoration-primary transition-colors';
    const icon = document.createElement('span');
    icon.className = 'material-symbols-outlined text-[16px]';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = 'arrow_outward';
    link.append(...el.childNodes, icon);
    el.replaceChildren(link);
}

// Dynamic Data Rendering from SITE_CONFIG (js/config.js)
function renderFromConfig() {
    if (typeof SITE_CONFIG === 'undefined') return;

    // 1. Profile Header & Footer
    if (SITE_CONFIG.profile) {
        const p = SITE_CONFIG.profile;
        const headerUsername = document.getElementById('header-username');
        if (headerUsername && p.username) {
            headerUsername.textContent = p.username;
        }

        // Screen-reader text only; the visible wordmark is a fixed SVG in index.html
        const heroTitle = document.getElementById('hero-title-text');
        if (heroTitle && p.username) {
            heroTitle.textContent = p.username;
        }

        const avatarImg = document.getElementById('header-avatar');
        if (avatarImg && p.avatarUrl) {
            avatarImg.src = p.avatarUrl;
            if (p.avatarFallback) {
                avatarImg.onerror = () => { avatarImg.src = p.avatarFallback; };
            }
        }
        
        const osuLink = document.getElementById('osu-profile-link');
        if (osuLink && p.socials && p.socials.osuProfileUrl) {
            osuLink.href = p.socials.osuProfileUrl;
        }

        if (p.socials) {
            const tiktokBtn = document.getElementById('footer-tiktok');
            if (tiktokBtn && p.socials.tiktokUrl) {
                tiktokBtn.href = p.socials.tiktokUrl;
            }

            const xBtn = document.getElementById('footer-x');
            if (xBtn && p.socials.xUrl) {
                xBtn.href = p.socials.xUrl;
            }
        }
        
        const lastUpdateEl = document.getElementById('footer-last-update');
        if (lastUpdateEl && p.lastUpdate) {
            lastUpdateEl.textContent = `Last update: ${p.lastUpdate}`;
        }
    }

    // 2. Gear spec sheet: tablet, keyboard, monitor, audio
    const gear = [
        ['tablet', SITE_CONFIG.tablet, { area: 'area', driver: 'driverName' }],
        ['keyboard', SITE_CONFIG.keyboard, { actuation: 'actuationPoint', rapid: 'rapidTrigger', keybind: 'keybind' }],
        ['monitor', SITE_CONFIG.monitor, { refresh: 'refreshRate', resolution: 'resolution' }],
        ['audio', SITE_CONFIG.audio, { conn: 'connector', type: 'type' }],
    ];
    gear.forEach(([prefix, data, fields]) => {
        if (!data) return;
        const device = document.getElementById(`${prefix}-device`);
        if (device && data.device) device.textContent = data.device;
        Object.entries(fields).forEach(([suffix, key]) => setSpecValue(`${prefix}-${suffix}`, data[key]));
        if (prefix === 'tablet') linkSpecValue('tablet-driver', data.driverDownloadUrl);

        const img = document.getElementById(`${prefix}-img`);
        if (img && data.previewImage) {
            img.src = data.previewImage;
            if (data.previewAlt) img.alt = data.previewAlt;
            const btn = img.closest('[data-lightbox]');
            if (btn) {
                btn.setAttribute('data-lightbox', data.previewImage);
                if (data.previewAlt) btn.setAttribute('data-lightbox-title', data.previewAlt);
            }
        }
    });

    // 3. Skins Grid
    if (SITE_CONFIG.skins) {
        const s = SITE_CONFIG.skins;
        
        const driveLink = document.getElementById('skins-drive-link');
        if (driveLink && s.driveFolderUrl) {
            driveLink.href = s.driveFolderUrl;
        } else if (driveLink) {
            driveLink.style.display = 'none';
        }

        const items = (s.items || []).filter((item) => !item.isPlaceholder);
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

    // 4. tosu Overlays Grid
    if (SITE_CONFIG.overlays) {
        const o = SITE_CONFIG.overlays;
        const githubLink = document.getElementById('overlays-github-link');
        if (githubLink && o.githubUrl) {
            githubLink.href = o.githubUrl;
        } else if (githubLink) {
            githubLink.style.display = 'none';
        }

        const tosuLink = document.getElementById('tosu-download-link');
        if (tosuLink && o.tosuDownloadUrl) {
            tosuLink.href = o.tosuDownloadUrl;
        } else if (tosuLink && !o.tosuDownloadUrl) {
            tosuLink.style.display = 'none';
        }

        const grid = document.getElementById('overlays-grid');
        if (grid && Array.isArray(o.items) && o.items.length > 0) {
            grid.innerHTML = o.items.map(renderOverlay).join('');

            // IntersectionObserver for video playback: Play only when visible on screen
            const videos = grid.querySelectorAll('video.video-layer');
            if ('IntersectionObserver' in window && videos.length > 0) {
                const videoObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const v = entry.target;
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

                videos.forEach(v => videoObserver.observe(v));
            }
        }
    }
}

// Toast Helper
let toastTimer = null;
function showToast(msg) {
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

// Social Links & Clipboard Copy Utility
function initSocials() {
    if (typeof SITE_CONFIG === 'undefined' || !SITE_CONFIG.profile || !SITE_CONFIG.profile.socials) return;
    const sc = SITE_CONFIG.profile.socials;
    const el = (id) => document.getElementById(id);

    // Footer Discord Copy
    const footerDiscord = el('footer-discord');
    if (footerDiscord && sc.discordTag) {
        const originalText = footerDiscord.textContent;
        let resetTimer = null;
        footerDiscord.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(sc.discordTag).then(() => {
                footerDiscord.textContent = 'Copied!';
                clearTimeout(resetTimer);
                resetTimer = setTimeout(() => footerDiscord.textContent = originalText, 2000);
            }).catch(() => {
                showToast('Unable to copy Discord ID');
            });
        });
    }
    
    // Dock Social Links
    if (el('dock-tiktok') && sc.tiktokUrl) el('dock-tiktok').href = sc.tiktokUrl;
    if (el('dock-x') && sc.xUrl) el('dock-x').href = sc.xUrl;
    
    const dockDiscord = el('dock-discord');
    if (dockDiscord && sc.discordTag) {
        dockDiscord.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(sc.discordTag).then(() => {
                showToast(`Copied Discord ID: ${sc.discordTag}`);
            }).catch(() => {
                showToast('Unable to copy Discord ID');
            });
        });
    }
}

// Scroll Reveal Intersection Observer
function initScrollReveal() {
    const targets = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    targets.forEach(el => observer.observe(el));
}

// Featured skin: a thumbnail swaps the banner screenshot
function initFeaturedSkin() {
    const featured = document.getElementById('skins-featured');
    const banner = document.getElementById('featured-skin-img');
    if (!featured || !banner) return;

    featured.addEventListener('click', (e) => {
        const thumb = e.target.closest('[data-featured-slide]');
        if (!thumb) return;
        banner.src = thumb.dataset.src;
        banner.alt = thumb.dataset.alt;
        setLightboxTarget(featured, thumb.dataset.src, thumb.dataset.title, thumb.dataset.alt);
        featured.querySelectorAll('[data-featured-slide]').forEach((t) => {
            t.setAttribute('aria-pressed', String(t === thumb));
        });
    });
}

// Skin cards: step through screenshots with the arrows, the dots, or a horizontal swipe
function initSkinSliders() {
    const grid = document.getElementById('skins-grid');
    if (!grid) return;

    function showSlide(card, index) {
        const track = card.querySelector('[data-skin-slider]');
        if (!track) return;
        const slides = Array.from(track.children);
        const current = (index + slides.length) % slides.length;
        track.dataset.current = current;

        // Deferred screenshots load on the first navigation
        track.querySelectorAll('img[data-src]').forEach((img) => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });

        track.style.transform = `translateX(-${current * 100}%)`;
        slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== current)));

        const shown = slides[current];
        setLightboxTarget(card, shown.src, shown.dataset.title, shown.alt);
        card.querySelectorAll('[data-slide-to]').forEach((dot) => {
            dot.setAttribute('aria-current', String(Number(dot.dataset.slideTo) === current));
        });
    }

    function step(card, direction) {
        const track = card.querySelector('[data-skin-slider]');
        if (track) showSlide(card, Number(track.dataset.current) + direction);
    }

    grid.addEventListener('click', (e) => {
        const control = e.target.closest('[data-slide-step], [data-slide-to]');
        if (!control) return;
        const card = control.closest('article');
        if (control.dataset.slideStep) step(card, Number(control.dataset.slideStep));
        else showSlide(card, Number(control.dataset.slideTo));
    });

    let touchStart = null;
    grid.addEventListener('touchstart', (e) => {
        if (!e.target.closest('[data-skin-slider]')) return;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }, { passive: true });

    grid.addEventListener('touchend', (e) => {
        if (!touchStart) return;
        const dx = e.changedTouches[0].clientX - touchStart.x;
        const dy = e.changedTouches[0].clientY - touchStart.y;
        touchStart = null;
        // Ignore taps and mostly-vertical scrolling
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
        step(e.target.closest('article'), dx < 0 ? 1 : -1);
    }, { passive: true });
}

// Mobile Navigation Drawer Toggle
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('mobile-menu-icon');
    if (!toggleBtn || !menu) return;

    function toggleMenu(forceClose = false) {
        const isExpanded = forceClose ? false : menu.classList.contains('hidden');
        if (isExpanded) {
            menu.classList.remove('hidden');
            menu.classList.add('flex');
            toggleBtn.setAttribute('aria-expanded', 'true');
            if (menuIcon) menuIcon.textContent = 'close';
        } else {
            menu.classList.add('hidden');
            menu.classList.remove('flex');
            toggleBtn.setAttribute('aria-expanded', 'false');
            if (menuIcon) menuIcon.textContent = 'menu';
        }
    }

    toggleBtn.addEventListener('click', () => toggleMenu());

    // Auto-close menu when tapping any link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => toggleMenu(true));
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 640 && !menu.classList.contains('hidden')) {
            toggleMenu(true);
        }
    }, { passive: true });
}

// Navigation highlighting with RAF throttling
function initNavScroll() {
    const desktopLinks = document.querySelectorAll('header nav:not(#mobile-menu) a[data-path]');
    const mobileLinks = document.querySelectorAll('#mobile-menu a[data-path]');
    const sections = Array.from(desktopLinks).map(a => document.getElementById(a.getAttribute('data-path'))).filter(Boolean);

    const setCurrent = (link, isActive) => {
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
    };

    let lastActive = null;
    const update = () => {
        let current = '';
        const scrollY = window.scrollY;

        if (scrollY < 300) {
            current = 'overview';
        } else {
            for (let i = sections.length - 1; i >= 0; i--) {
                if (scrollY >= sections[i].offsetTop - 200) {
                    current = sections[i].id;
                    break;
                }
            }
        }

        // Skip class writes when the active section hasn't changed
        if (current === lastActive) return;
        lastActive = current;

        desktopLinks.forEach(link => {
            const isActive = link.getAttribute('data-path') === current;
            link.classList.toggle('text-primary', isActive);
            link.classList.toggle('text-on-surface-variant', !isActive);
            setCurrent(link, isActive);
        });

        mobileLinks.forEach(link => {
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

    // The page can open mid-scroll (a #section link or restored position), so mark the section in view now
    update();
}

// 11. Accessible Image Lightbox Viewer
function initLightbox() {
    const dialog = document.getElementById('image-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const closeBtn = document.getElementById('lightbox-close');

    if (!dialog || !lightboxImg || !closeBtn) return;

    let previousActiveElement = null;

    function openLightbox(src, alt, title) {
        if (!src) return;
        previousActiveElement = document.activeElement;
        lightboxImg.src = src;
        lightboxImg.alt = alt || title || 'Enlarged settings preview';
        if (lightboxTitle) lightboxTitle.textContent = title || alt || '';

        if (typeof dialog.showModal === 'function') {
            dialog.showModal();
        } else {
            dialog.setAttribute('open', '');
        }
        document.body.style.overflow = 'hidden';
        closeBtn.focus();
    }

    function closeLightbox() {
        if (typeof dialog.close === 'function') {
            dialog.close();
        } else {
            dialog.removeAttribute('open');
        }
        document.body.style.overflow = '';
        lightboxImg.src = '';
        if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
            previousActiveElement.focus();
        }
    }

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-lightbox]');
        if (trigger) {
            e.preventDefault();
            const src = trigger.getAttribute('data-lightbox');
            const title = trigger.getAttribute('data-lightbox-title');
            const img = trigger.querySelector('img');
            const alt = trigger.getAttribute('data-lightbox-alt') || (img ? img.alt : '');
            openLightbox(src, alt, title);
        }
    });

    closeBtn.addEventListener('click', closeLightbox);

    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) {
            closeLightbox();
        }
    });

    dialog.addEventListener('cancel', (e) => {
        e.preventDefault();
        closeLightbox();
    });
}

// Application Initialization Entry Point
function initApp() {
    renderFromConfig();
    initSocials();
    initFeaturedSkin();
    initSkinSliders();
    initScrollReveal();
    initNavScroll();
    initMobileMenu();
    initLightbox();
}

// Dom Ready Execution
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
