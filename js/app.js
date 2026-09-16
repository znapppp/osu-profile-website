/* ==========================================================================
   Znap- osu! Setup Configuration - Interactive Application Logic (Tailwind)
   ========================================================================== */

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

        const heroTitle = document.getElementById('hero-title');
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
        
        const footerText = document.getElementById('footer-text');
        if (footerText && p.username) {
            footerText.textContent = `© ${new Date().getFullYear()} ${p.username} Setup. All rights reserved.`;
        }
        
        const lastUpdateEl = document.getElementById('footer-last-update');
        if (lastUpdateEl && p.lastUpdate) {
            lastUpdateEl.textContent = `Last Update: ${p.lastUpdate}`;
        }
    }

    // 2. Tablet Settings
    if (SITE_CONFIG.tablet) {
        const t = SITE_CONFIG.tablet;
        const el = (id) => document.getElementById(id);
        if (el('tablet-device') && t.device) el('tablet-device').textContent = t.device;
        if (el('tablet-area') && t.area) el('tablet-area').textContent = t.area;
        if (el('tablet-driver') && t.driverName) el('tablet-driver').textContent = t.driverName;
        if (el('tablet-img') && t.previewImage) {
            el('tablet-img').src = t.previewImage;
            if (t.previewAlt) el('tablet-img').alt = t.previewAlt;
            const btn = el('tablet-img').closest('[data-lightbox]');
            if (btn) {
                btn.setAttribute('data-lightbox', t.previewImage);
                if (t.previewAlt) btn.setAttribute('data-lightbox-title', t.previewAlt);
            }
        }
    }

    // 3. Keyboard Settings
    if (SITE_CONFIG.keyboard) {
        const k = SITE_CONFIG.keyboard;
        const el = (id) => document.getElementById(id);
        if (el('keyboard-device') && k.device) el('keyboard-device').textContent = k.device;
        if (el('keyboard-actuation') && k.actuationPoint) el('keyboard-actuation').textContent = k.actuationPoint;
        if (el('keyboard-rapid') && k.rapidTrigger) el('keyboard-rapid').textContent = k.rapidTrigger;
        if (el('keyboard-img') && k.previewImage) {
            el('keyboard-img').src = k.previewImage;
            if (k.previewAlt) el('keyboard-img').alt = k.previewAlt;
            const btn = el('keyboard-img').closest('[data-lightbox]');
            if (btn) {
                btn.setAttribute('data-lightbox', k.previewImage);
                if (k.previewAlt) btn.setAttribute('data-lightbox-title', k.previewAlt);
            }
        }
    }

    // 4. Keypad Settings
    if (SITE_CONFIG.keypad) {
        const kp = SITE_CONFIG.keypad;
        const el = (id) => document.getElementById(id);
        if (el('keypad-device') && kp.device) el('keypad-device').textContent = kp.device;
        if (el('keypad-stroke') && kp.stroke) el('keypad-stroke').textContent = kp.stroke;
        if (el('keypad-actuation') && kp.actuationPoint) {
            el('keypad-actuation').textContent = kp.actuationPoint;
            el('keypad-actuation').title = kp.actuationPoint;
        }
        if (el('keypad-rapid') && kp.rapidTrigger) {
            el('keypad-rapid').textContent = kp.rapidTrigger;
            el('keypad-rapid').title = kp.rapidTrigger;
        }
        if (el('keypad-img') && kp.previewImage) {
            el('keypad-img').src = kp.previewImage;
            if (kp.previewAlt) el('keypad-img').alt = kp.previewAlt;
            const btn = el('keypad-img').closest('[data-lightbox]');
            if (btn) {
                btn.setAttribute('data-lightbox', kp.previewImage);
                if (kp.previewAlt) btn.setAttribute('data-lightbox-title', kp.previewAlt);
            }
        }
    }

    // 5. Monitor Settings
    if (SITE_CONFIG.monitor) {
        const m = SITE_CONFIG.monitor;
        const el = (id) => document.getElementById(id);
        if (el('monitor-device') && m.device) el('monitor-device').textContent = m.device;
        if (el('monitor-refresh') && m.refreshRate) el('monitor-refresh').textContent = m.refreshRate;
        if (el('monitor-response') && m.responseTime) el('monitor-response').textContent = m.responseTime;
        if (el('monitor-resolution') && m.resolution) el('monitor-resolution').textContent = m.resolution;
    }

    // 6. Audio Settings
    if (SITE_CONFIG.audio) {
        const a = SITE_CONFIG.audio;
        const el = (id) => document.getElementById(id);
        if (el('audio-device') && a.device) el('audio-device').textContent = a.device;
        if (el('audio-conn') && a.connector) el('audio-conn').textContent = a.connector;
        if (el('audio-type') && a.type) el('audio-type').textContent = a.type;
    }

    // 7. Skins Grid
    if (SITE_CONFIG.skins) {
        const s = SITE_CONFIG.skins;
        
        const driveLink = document.getElementById('skins-drive-link');
        if (driveLink && s.driveFolderUrl) {
            driveLink.href = s.driveFolderUrl;
        } else if (driveLink) {
            driveLink.style.display = 'none';
        }

        const grid = document.getElementById('skins-grid');
        
        if (grid && Array.isArray(s.items) && s.items.length > 0) {
            grid.innerHTML = s.items.map((item, i) => {
                let desc = `My ${item.badgeText || 'favorite'} skin.`;
                
                return `
                <div class="flex flex-col group opacity-0 transition-all duration-700 translate-y-8 scroll-reveal" style="transition-delay: ${i * 100}ms;">
                    <div class="relative w-full aspect-video rounded-xl overflow-hidden mb-3.5 md:mb-4 bg-surface-container shadow-md border border-glass-stroke/50 group/slider">
                        
                        <!-- Image Slider Container -->
                        <div class="relative w-full h-full flex transition-transform duration-500 ease-in-out" id="slider-${i}" data-current="0" role="region" aria-label="Screenshots of ${item.name}">
                            ${(item.slides || []).map(slide => `
                                <div class="min-w-full h-full flex items-center justify-center">
                                    <img src="${slide.src}" alt="${slide.alt || slide.label || item.name}" loading="lazy" decoding="async" class="w-full h-full object-cover" />
                                </div>
                            `).join('')}
                        </div>
                        
                        <!-- Next/Prev Buttons (visible on hover or keyboard focus) -->
                        ${(item.slides && item.slides.length > 1) ? `
                            <button type="button" onclick="event.stopPropagation(); window.slideSkin(${i}, -1)" class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-obsidian-deep/50 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-opacity z-10 hover:bg-obsidian-deep" aria-label="Previous screenshot for ${item.name}">
                                <span class="material-symbols-outlined text-[20px]" aria-hidden="true">chevron_left</span>
                            </button>
                            <button type="button" onclick="event.stopPropagation(); window.slideSkin(${i}, 1)" class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-obsidian-deep/50 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-opacity z-10 hover:bg-obsidian-deep" aria-label="Next screenshot for ${item.name}">
                                <span class="material-symbols-outlined text-[20px]" aria-hidden="true">chevron_right</span>
                            </button>
                        ` : ''}

                        <div class="absolute inset-0 bg-gradient-to-t from-obsidian-deep/90 via-obsidian-deep/20 to-transparent opacity-60 group-hover/slider:opacity-40 transition-opacity duration-300 pointer-events-none"></div>
                        
                        <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none z-10">
                            <div class="bg-primary/85 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium text-obsidian-deep/90 shadow-sm">${item.badgeText || 'Skin'}</div>
                            <button type="button" onclick="event.stopPropagation(); window.open('${item.downloadUrl}', '_blank')" class="pointer-events-auto w-8 h-8 rounded-full bg-primary flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 focus-visible:translate-y-0 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-300 shadow-lg hover:bg-secondary cursor-pointer" title="Download ${item.name}" aria-label="Download skin ${item.name}">
                                <span class="material-symbols-outlined text-obsidian-deep text-[18px]" aria-hidden="true">download</span>
                            </button>
                        </div>

                        <!-- Dots -->
                        ${(item.slides && item.slides.length > 1) ? `
                            <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10" aria-hidden="true">
                                ${item.slides.map((_, dotIndex) => `
                                    <div id="dot-${i}-${dotIndex}" class="w-1.5 h-1.5 rounded-full ${dotIndex === 0 ? 'bg-primary scale-125' : 'bg-white/50'} transition-all duration-300"></div>
                                `).join('')}
                            </div>
                        ` : ''}

                    </div>
                    <h3 class="font-body-lg text-lg md:text-xl text-primary mb-1.5 truncate" title="${item.name}">${item.name}</h3>
                    <p class="font-body-md text-on-surface-variant text-sm mb-2 line-clamp-2">${desc}</p>
                </div>`;
            }).join('');
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
                            <h3 class="font-headline-lg-mobile text-2xl md:text-headline-lg-mobile text-primary tracking-tight mb-2">${item.name}</h3>
                            <p class="font-body-md text-sm md:text-base text-on-surface-variant max-w-lg leading-relaxed">${desc}</p>
                        </div>

                        <!-- Quick Spec Boxes -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mt-1">
                            <div class="flex flex-col gap-1 p-4 bg-surface-container-lowest rounded-lg border border-glass-stroke shadow-sm">
                                <span class="font-body-md text-sm text-on-surface-variant">Compatible With</span>
                                <span class="font-label-caps text-body-md text-primary">tosu</span>
                            </div>
                            <div class="flex flex-col gap-1 p-4 bg-surface-container-lowest rounded-lg border border-glass-stroke shadow-sm">
                                <span class="font-body-md text-sm text-on-surface-variant">Target Screen</span>
                                <span class="font-label-caps text-[12px] text-primary" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="1440x900 on 1920x1080">1440x900 on 1080p</span>
                            </div>
                            <div class="flex flex-col gap-1 p-4 bg-surface-container-lowest rounded-lg border border-glass-stroke shadow-sm sm:col-span-2">
                                <span class="font-body-md text-sm text-on-surface-variant">Key Features</span>
                                <span class="font-label-caps text-[12px] text-primary" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="Dynamic Beatmap Artwork, Video Toggle, Custom Dim">Dynamic BG & Video / Custom Dim</span>
                            </div>
                        </div>

                        <!-- Action Buttons & Tags -->
                        <div class="flex flex-col gap-3 mt-1">
                            <div class="flex flex-wrap items-center gap-3">
                                ${downloadUrl && downloadUrl !== '#' ? `
                                    <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" aria-label="Download overlay ${item.name} (.zip)" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-obsidian-deep font-semibold text-xs hover:bg-secondary transition-all duration-300 shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                        <span class="material-symbols-outlined text-[18px]" aria-hidden="true">download</span>
                                        <span>Download Overlay (.zip)</span>
                                    </a>
                                ` : ''}
                                ${videoPreviewUrl ? `
                                    <a href="${videoPreviewUrl}" target="_blank" rel="noopener noreferrer" aria-label="Watch video preview for ${item.name}" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest/80 border border-white/10 text-on-surface hover:text-primary hover:border-white/25 text-xs font-medium transition-all duration-300 shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group">
                                        <span class="material-symbols-outlined text-[18px] text-primary group-hover:scale-110 transition-transform" aria-hidden="true">smart_display</span>
                                        <span>Video Preview</span>
                                        <span class="material-symbols-outlined text-[14px] text-on-surface-variant/60 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" aria-hidden="true">arrow_outward</span>
                                    </a>
                                ` : ''}
                                ${githubUrl ? `
                                    <a href="${githubUrl}" target="_blank" rel="noopener noreferrer" aria-label="View overlay source code on GitHub" class="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-lowest/80 border border-white/10 text-on-surface hover:text-primary hover:border-white/25 text-xs font-medium transition-all duration-300 shadow-sm hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
                                        <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                                        <span>Source Code</span>
                                    </a>
                                ` : ''}
                            </div>

                            ${sourceRefUrl ? `
                                <div class="text-[11px] text-on-surface-variant/75 flex items-center gap-1.5 pt-1">
                                    <span>Forked from:</span>
                                    <a href="${sourceRefUrl}" target="_blank" rel="noopener noreferrer" class="text-on-surface-variant/90 hover:text-primary underline transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary rounded">Citrusis/OBSDecoratePack</a>
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Right: Large Video/Image Showcase (7 Cols) -->
                    <div class="md:col-span-7 relative group">
                        <div class="absolute inset-0 bg-primary/5 rounded-xl blur-2xl transition-opacity opacity-0 group-hover:opacity-100 duration-500"></div>
                        <div class="relative w-full aspect-[16/10] md:aspect-[16/9] rounded-xl overflow-hidden bg-surface-container border border-glass-stroke shadow-xl">
                            ${hasVideo ? `
                                <video id="overlay-preview-video-${i}" class="video-layer absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]" src="${videoSrc}" ${imgSrc ? `poster="${imgSrc}"` : ''} loop muted playsinline preload="none" aria-label="${item.name} video preview"></video>
                            ` : (imgSrc ? `
                                <img class="absolute inset-0 w-full h-full object-contain grayscale opacity-80 mix-blend-luminosity group-hover:grayscale-0 transition-all duration-700" src="${imgSrc}" alt="${item.name} preview" loading="lazy" decoding="async" />
                            ` : `
                                <div class="absolute inset-0 bg-surface-container flex items-center justify-center text-on-surface-variant/50 font-label-caps text-sm">No preview available</div>
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
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.classList.add('visible');
    setTimeout(() => {
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
        footerDiscord.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(sc.discordTag).then(() => {
                const originalText = e.target.textContent;
                e.target.textContent = 'Copied!';
                setTimeout(() => e.target.textContent = originalText, 2000);
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

// Inline Skin Slider Logic
window.slideSkin = function(skinIndex, direction) {
    if (!SITE_CONFIG.skins || !SITE_CONFIG.skins.items) return;
    const skin = SITE_CONFIG.skins.items[skinIndex];
    if (!skin || !skin.slides) return;
    
    const total = skin.slides.length;
    const slider = document.getElementById(`slider-${skinIndex}`);
    if (!slider) return;
    
    let current = parseInt(slider.getAttribute('data-current') || 0);
    current = (current + direction + total) % total;
    slider.setAttribute('data-current', current);
    
    // Move the slider container
    slider.style.transform = `translateX(-${current * 100}%)`;
    
    // Update dots
    for(let j = 0; j < total; j++) {
        const dot = document.getElementById(`dot-${skinIndex}-${j}`);
        if(dot) {
            if(j === current) {
                dot.className = "w-1.5 h-1.5 rounded-full bg-primary scale-125 transition-all duration-300";
            } else {
                dot.className = "w-1.5 h-1.5 rounded-full bg-white/50 transition-all duration-300";
            }
        }
    }
};

// Navigation highlighting with RAF throttling
function initNavScroll() {
    const navLinks = document.querySelectorAll('header nav a[data-path]');
    const sections = Array.from(navLinks).map(a => document.getElementById(a.getAttribute('data-path'))).filter(Boolean);
    sections.unshift(document.body);
    
    let ticking = false;
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
                
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('data-path') === current;
                    link.classList.toggle('text-primary', isActive);
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
            const alt = img ? img.alt : '';
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
    initScrollReveal();
    initNavScroll();
    initLightbox();
}

// Dom Ready Execution
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
