/* ==========================================================================
   Znap- osu! Setup Configuration - Interactive Application Logic (Tailwind)
   ========================================================================== */

// Attributes the lightbox reads to open a skin screenshot full size
function lightboxAttrs(skin, slide) {
    return `data-lightbox="${slide.src}" data-lightbox-title="${skin.name} — ${slide.label}" data-lightbox-alt="${slide.alt || slide.label || skin.name}"`;
}

function zoomButton(skin, slide) {
    return `
    <button type="button" ${lightboxAttrs(skin, slide)} aria-label="View ${skin.name} screenshot full size" class="absolute top-3 right-3 w-8 h-8 grid place-items-center bg-obsidian-deep/85 text-primary hover:bg-obsidian-deep transition-colors cursor-zoom-in">
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

// Current skin: a wide banner, then a spec bar with screenshot thumbnails, the owner's note, details, and download
function renderFeaturedSkin(skin) {
    const slides = skin.slides || [];
    const first = slides[0] || {};
    const details = skin.details || [];

    return `
    <article class="opacity-0 transition-all duration-700 translate-y-8 scroll-reveal" aria-labelledby="featured-skin-name">
        <div class="reg-t">
            <div class="relative overflow-hidden bg-surface-container">
                <img id="featured-skin-img" src="${first.src}" alt="${first.alt || first.label || skin.name}" decoding="async" class="w-full aspect-video md:aspect-[3/1] object-cover cursor-zoom-in" ${lightboxAttrs(skin, first)} />
                <div class="absolute inset-0 bg-gradient-to-t from-obsidian-deep/90 via-obsidian-deep/10 to-transparent pointer-events-none"></div>
                ${zoomButton(skin, first)}
                <div class="absolute left-4 right-4 bottom-4 md:left-6 md:bottom-6">
                    <span class="tag bg-primary text-obsidian-deep">Current</span>
                    <h3 id="featured-skin-name" class="font-display font-bold text-2xl md:text-[32px] leading-tight text-primary mt-3">${skin.name}</h3>
                </div>
            </div>
        </div>
        <div class="reg-b flex flex-col md:flex-row border border-t-0 border-hairline divide-y md:divide-y-0 md:divide-x divide-hairline">
            ${slides.length > 1 ? `
            <div class="flex gap-2.5 p-4 shrink-0" role="group" aria-label="Screenshots of ${skin.name}">
                ${slides.map((slide, i) => `
                <button type="button" data-featured-slide data-src="${slide.src}" data-alt="${slide.alt || slide.label || skin.name}" data-title="${skin.name} — ${slide.label}" aria-label="Show ${slide.label}" aria-pressed="${i === 0}" class="w-[72px] shrink-0 opacity-60 hover:opacity-100 aria-pressed:opacity-100 aria-pressed:outline aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-primary transition-opacity cursor-pointer">
                    <img src="${slide.src}" alt="" loading="lazy" decoding="async" class="block w-full aspect-video object-cover" />
                </button>`).join('')}
            </div>` : ''}
            ${skin.note ? `<p class="flex-1 p-4 self-center text-[15px] leading-relaxed text-on-surface-variant">${skin.note}</p>` : '<div class="flex-1"></div>'}
            ${details.length ? `
            <dl class="grid grid-cols-[auto_1fr] content-center gap-x-5 gap-y-1.5 p-4 text-sm shrink-0">
                ${details.map((d) => `<dt class="text-muted">${d.label}</dt><dd class="font-mono text-primary">${d.value}</dd>`).join('')}
            </dl>` : ''}
            <div class="flex items-center p-4 shrink-0">
                <a href="${skin.downloadUrl}" target="_blank" rel="noopener noreferrer" aria-label="Download ${skin.name}" class="btn-primary w-full md:w-auto">
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

    return `
    <article class="flex flex-col opacity-0 transition-all duration-700 translate-y-8 scroll-reveal" style="transition-delay: ${index * 100}ms;" aria-labelledby="skin-card-name-${index}">
        <div class="reg-t">
            <div class="relative overflow-hidden bg-surface-container">
                <div class="flex transition-transform duration-500 ease-in-out motion-reduce:transition-none cursor-zoom-in" data-skin-slider data-current="0" ${lightboxAttrs(skin, slides[0] || {})}>
                    ${slides.map((slide, i) => `
                    <img ${i === 0 ? `src="${slide.src}"` : `data-src="${slide.src}" aria-hidden="true"`} data-label="${slide.label}" alt="${slide.alt || slide.label || skin.name}" loading="lazy" decoding="async" class="block w-full min-w-full aspect-video object-cover" />`).join('')}
                </div>
                ${zoomButton(skin, slides[0] || {})}
                ${slides.length > 1 ? `
                <div class="absolute left-3 bottom-3 flex items-center bg-obsidian-deep/85">
                    <button type="button" data-slide-step="-1" aria-label="Previous screenshot of ${skin.name}" class="w-8 h-8 grid place-items-center text-primary hover:bg-white/10 transition-colors cursor-pointer">
                        <span class="material-symbols-outlined text-[20px]" aria-hidden="true">chevron_left</span>
                    </button>
                    ${slides.map((_, i) => `
                    <button type="button" data-slide-to="${i}" aria-label="Show screenshot ${i + 1} of ${slides.length}" aria-current="${i === 0}" class="w-5 h-8 grid place-items-center cursor-pointer before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-white/40 hover:before:bg-white/70 aria-[current=true]:before:bg-primary"></button>`).join('')}
                    <button type="button" data-slide-step="1" aria-label="Next screenshot of ${skin.name}" class="w-8 h-8 grid place-items-center text-primary hover:bg-white/10 transition-colors cursor-pointer">
                        <span class="material-symbols-outlined text-[20px]" aria-hidden="true">chevron_right</span>
                    </button>
                </div>` : ''}
            </div>
        </div>
        <div class="flex flex-col flex-1 gap-4 p-4 border border-t-0 border-hairline">
            <h3 id="skin-card-name-${index}" class="font-display font-bold text-lg leading-snug text-primary">${skin.name}</h3>
            <div class="flex items-center justify-between gap-3 mt-auto">
                ${skin.badgeText ? `<span class="tag border border-outline text-on-surface">${skin.badgeText}</span>` : '<span></span>'}
                <a href="${skin.downloadUrl}" target="_blank" rel="noopener noreferrer" aria-label="Download ${skin.name}" class="btn-secondary">
                    <span>Download</span>
                    <span class="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
                </a>
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

    // 2. Gear spec sheet: tablet, keyboard, keypad, monitor, audio
    const gear = [
        ['tablet', SITE_CONFIG.tablet, { area: 'area', driver: 'driverName' }],
        ['keyboard', SITE_CONFIG.keyboard, { actuation: 'actuationPoint', rapid: 'rapidTrigger' }],
        ['keypad', SITE_CONFIG.keypad, { stroke: 'stroke', actuation: 'actuationPoint', rapid: 'rapidTrigger' }],
        ['monitor', SITE_CONFIG.monitor, { refresh: 'refreshRate', response: 'responseTime', resolution: 'resolution' }],
        ['audio', SITE_CONFIG.audio, { conn: 'connector', type: 'type' }],
    ];
    gear.forEach(([prefix, data, fields]) => {
        if (!data) return;
        const device = document.getElementById(`${prefix}-device`);
        if (device && data.device) device.textContent = data.device;
        Object.entries(fields).forEach(([suffix, key]) => setSpecValue(`${prefix}-${suffix}`, data[key]));

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

    // 8. tosu Overlays Grid
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
            grid.innerHTML = o.items.map((item, i) => {
                const desc = item.description || `Custom overlay created for tosu.`;
                const imgSrc = item.previewImg || (item.slides && item.slides.length > 0 ? item.slides[0].src : '');
                const downloadUrl = item.downloadUrl || '#';
                const videoPreviewUrl = item.videoPreviewUrl || '';
                const githubUrl = item.githubUrl || '';
                const sourceRefUrl = item.sourceRefUrl || '';

                const hasVideo = Boolean(item.previewVideo);
                const videoSrc = item.previewVideo || '';

                return `
                <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center opacity-0 transition-all duration-700 translate-y-8 scroll-reveal" style="transition-delay: ${i * 100}ms;">
                    <!-- Left: Info & Specs (5 Cols) -->
                    <div class="md:col-span-5 flex flex-col gap-4 md:gap-5">
                        <div>
                            <h3 class="font-display font-bold text-2xl md:text-3xl text-primary mb-2">${item.name}</h3>
                            <p class="font-sans text-sm md:text-base text-on-surface-variant max-w-lg leading-relaxed">${desc}</p>
                        </div>

                        <!-- Quick Spec Boxes -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-px bg-hairline border border-hairline">
                            <div class="bg-background p-4 flex flex-col gap-1 min-w-0">
                                <span class="font-mono text-sm text-primary">tosu</span>
                                <span class="text-xs text-muted">Compatible with</span>
                            </div>
                            <div class="bg-background p-4 flex flex-col gap-1 min-w-0">
                                <span class="font-mono text-sm text-primary">1440x900 on 1080p</span>
                                <span class="text-xs text-muted">Target screen</span>
                            </div>
                            <div class="bg-background p-4 flex flex-col gap-1 min-w-0 sm:col-span-2">
                                <span class="font-mono text-sm text-primary">Dynamic BG &amp; Video / Custom Dim</span>
                                <span class="text-xs text-muted">Key features</span>
                            </div>
                        </div>

                        <!-- Action Buttons & Tags -->
                        <div class="flex flex-col gap-3 mt-1">
                            <div class="flex flex-wrap items-center gap-3">
                                ${downloadUrl && downloadUrl !== '#' ? `
                                    <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" aria-label="Download overlay ${item.name} (.zip)" class="btn-primary">
                                        <span class="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
                                        <span>Download Overlay (.zip)</span>
                                    </a>
                                ` : ''}
                                ${videoPreviewUrl ? `
                                    <a href="${videoPreviewUrl}" target="_blank" rel="noopener noreferrer" aria-label="Watch video preview for ${item.name}" class="btn-secondary">
                                        <span class="material-symbols-outlined text-[18px]" aria-hidden="true">smart_display</span>
                                        <span>Video Preview</span>
                                        <span class="material-symbols-outlined text-[16px]" aria-hidden="true">arrow_outward</span>
                                    </a>
                                ` : ''}
                                ${githubUrl ? `
                                    <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" aria-label="View overlay source code on GitHub" class="btn-secondary">
                                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                                        <span>Source Code</span>
                                    </a>
                                ` : ''}
                            </div>

                            ${sourceRefUrl ? `
                                <div class="text-xs text-on-surface-variant flex items-center gap-1.5 pt-1">
                                    <span>Forked from:</span>
                                    <a href="${sourceRefUrl}" target="_blank" rel="noopener noreferrer" class="text-primary underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary">Citrusis/OBSDecoratePack</a>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Right: Large Video/Image Showcase (7 Cols) -->
                    <div class="md:col-span-7 relative group reg">
                        <div class="relative w-full aspect-[16/10] md:aspect-[16/9] overflow-hidden bg-surface-container border border-hairline">
                            ${hasVideo ? `
                                <video id="overlay-preview-video-${i}" class="video-layer absolute inset-0 w-full h-full object-cover" src="${videoSrc}" ${imgSrc ? `poster="${imgSrc}"` : ''} loop muted playsinline preload="none" aria-label="${item.name} video preview"></video>
                            ` : (imgSrc ? `
                                <img class="absolute inset-0 w-full h-full object-contain" src="${imgSrc}" alt="${item.name} preview" loading="lazy" decoding="async" />
                            ` : `
                                <div class="absolute inset-0 bg-surface-container flex items-center justify-center text-muted font-mono text-sm">No preview available</div>
                            `)}
                        </div>
                    </div>
                </div>`;
            }).join('');

            // IntersectionObserver for video playback: Play only when visible on screen
            const videos = document.querySelectorAll('video.video-layer');
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
        const name = card.querySelector('h3').textContent;
        setLightboxTarget(card, shown.src, `${name} — ${shown.dataset.label}`, shown.alt);
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
    sections.unshift(document.body);
    
    let ticking = false;
    let lastActive = null;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let current = '';
                const scrollY = window.scrollY;
                
                if (scrollY < 300) {
                    current = 'overview';
                } else {
                    for (let i = sections.length - 1; i >= 0; i--) {
                        const section = sections[i];
                        if (section && section.id && scrollY >= section.offsetTop - 200) {
                            current = section.id;
                            break;
                        }
                    }
                }

                // Skip class writes when the active section hasn't changed
                if (current === lastActive) {
                    ticking = false;
                    return;
                }
                lastActive = current;

                desktopLinks.forEach(link => {
                    const isActive = link.getAttribute('data-path') === current;
                    link.classList.toggle('text-primary', isActive);
                    link.classList.toggle('text-on-surface-variant', !isActive);
                });

                mobileLinks.forEach(link => {
                    const isActive = link.getAttribute('data-path') === current;
                    link.classList.toggle('text-primary', isActive);
                    link.classList.toggle('bg-surface-container/40', isActive);
                    link.classList.toggle('text-on-surface-variant', !isActive);
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
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
