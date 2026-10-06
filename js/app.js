/* ==========================================================================
   Znap- Profile Website - Application Logic
   ========================================================================== */

function renderFromConfig() {
    if (typeof SITE_CONFIG === 'undefined') return;

    // Profile Info
    if (SITE_CONFIG.profile) {
        const p = SITE_CONFIG.profile;
        const u = document.getElementById('profile-username');
        if (u && p.username) u.textContent = p.username;

        const av = document.getElementById('profile-avatar');
        if (av && p.avatarUrl) {
            av.src = p.avatarUrl;
            if (p.avatarFallback) av.onerror = () => { av.src = p.avatarFallback; };
        }

        const lu = document.getElementById('footer-last-update');
        if (lu && p.lastUpdate) lu.textContent = p.lastUpdate;

        if (p.socials) {
            const osu = document.getElementById('btn-osu');
            if (osu && p.socials.osuProfileUrl) osu.href = p.socials.osuProfileUrl;

            const tt = document.getElementById('btn-tiktok');
            if (tt && p.socials.tiktokUrl) tt.href = p.socials.tiktokUrl;

            const x = document.getElementById('btn-x');
            if (x && p.socials.xUrl) x.href = p.socials.xUrl;
        }
    }

    // Hardware Specs
    if (SITE_CONFIG.tablet) {
        const t = SITE_CONFIG.tablet;
        const el = (id) => document.getElementById(id);
        if (el('tablet-device') && t.device) el('tablet-device').textContent = t.device;
        if (el('tablet-area') && t.area) el('tablet-area').textContent = t.area;
        if (el('tablet-driver') && t.driverName) el('tablet-driver').textContent = t.driverName;
        if (el('tablet-img') && t.previewImage) {
            el('tablet-img').src = t.previewImage;
            const btn = el('tablet-img').closest('[data-lightbox]');
            if (btn) btn.setAttribute('data-lightbox', t.previewImage);
        }
    }

    if (SITE_CONFIG.keyboard) {
        const k = SITE_CONFIG.keyboard;
        const el = (id) => document.getElementById(id);
        if (el('keyboard-device') && k.device) el('keyboard-device').textContent = k.device;
        if (el('keyboard-actuation') && k.actuationPoint) el('keyboard-actuation').textContent = k.actuationPoint;
        if (el('keyboard-rapid') && k.rapidTrigger) el('keyboard-rapid').textContent = k.rapidTrigger;
        if (el('keyboard-img') && k.previewImage) {
            el('keyboard-img').src = k.previewImage;
            const btn = el('keyboard-img').closest('[data-lightbox]');
            if (btn) btn.setAttribute('data-lightbox', k.previewImage);
        }
    }

    if (SITE_CONFIG.keypad) {
        const kp = SITE_CONFIG.keypad;
        const el = (id) => document.getElementById(id);
        if (el('keypad-device') && kp.device) el('keypad-device').textContent = kp.device;

        if (el('keypad-actuation') && kp.actuationPoint) {
            el('keypad-actuation').innerHTML = kp.actuationPoint.replace(/\s*\|\s*/g, '<br>');
        }
        if (el('keypad-rapid') && kp.rapidTrigger) {
            el('keypad-rapid').innerHTML = kp.rapidTrigger.replace(/\s*\|\s*/g, '<br>');
        }

        if (el('keypad-img') && kp.previewImage) {
            el('keypad-img').src = kp.previewImage;
            const btn = el('keypad-img').closest('[data-lightbox]');
            if (btn) btn.setAttribute('data-lightbox', kp.previewImage);
        }
    }

    if (SITE_CONFIG.monitor) {
        const m = SITE_CONFIG.monitor;
        const el = (id) => document.getElementById(id);
        if (el('monitor-device') && m.device) el('monitor-device').textContent = m.device;
        if (el('monitor-refresh') && m.refreshRate) el('monitor-refresh').textContent = m.refreshRate;
        if (el('monitor-response') && m.responseTime) el('monitor-response').textContent = m.responseTime;
        if (el('monitor-resolution') && m.resolution) el('monitor-resolution').textContent = m.resolution;
    }

    if (SITE_CONFIG.audio) {
        const a = SITE_CONFIG.audio;
        const el = (id) => document.getElementById(id);
        if (el('audio-device') && a.device) el('audio-device').textContent = a.device;
        if (el('audio-conn') && a.connector) el('audio-conn').textContent = a.connector;
        if (el('audio-type') && a.type) el('audio-type').textContent = a.type;
    }

    // Skins Showcase Gallery
    if (SITE_CONFIG.skins) {
        const s = SITE_CONFIG.skins;
        const driveLink = document.getElementById('skins-drive-link');
        if (driveLink && s.driveFolderUrl) driveLink.href = s.driveFolderUrl;

        const grid = document.getElementById('skins-grid');
        if (grid && Array.isArray(s.items)) {
            grid.innerHTML = s.items.map((item, i) => {
                const slides = item.slides || [];
                const firstSlide = slides[0] || { src: '', label: 'Preview' };

                return `
                <div class="flex flex-col p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/10 transition-colors">
                    <!-- Interactive Slide Viewport -->
                    <div class="relative w-full aspect-video rounded-lg overflow-hidden bg-black border border-white/[0.08] group/slide">
                        <img id="skin-img-${i}" class="w-full h-full object-cover cursor-zoom-in transition-opacity duration-200" src="${firstSlide.src}" alt="${item.name}" data-lightbox="${firstSlide.src}" data-lightbox-title="${item.name} (${firstSlide.label})" />
                        
                        <!-- Slide Controls -->
                        ${slides.length > 1 ? `
                            <button type="button" onclick="event.stopPropagation(); window.stepSkinSlide(${i}, -1)" class="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 flex items-center justify-center opacity-0 group-hover/slide:opacity-100 transition-opacity cursor-pointer" aria-label="Previous image">
                                <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <button type="button" onclick="event.stopPropagation(); window.stepSkinSlide(${i}, 1)" class="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-black/60 text-white/80 hover:text-white hover:bg-black/80 flex items-center justify-center opacity-0 group-hover/slide:opacity-100 transition-opacity cursor-pointer" aria-label="Next image">
                                <svg class="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        ` : ''}

                        <!-- Slide Tag & Dots -->
                        <div class="absolute bottom-2 left-2 right-2 flex items-center justify-between pointer-events-none">
                            <span id="skin-label-${i}" class="text-[10px] font-medium bg-black/70 backdrop-blur px-2 py-0.5 rounded text-white/80 border border-white/10">${firstSlide.label}</span>
                            ${slides.length > 1 ? `
                                <div class="flex gap-1" id="skin-dots-${i}">
                                    ${slides.map((_, idx) => `
                                        <div class="w-1.5 h-1.5 rounded-full transition-all ${idx === 0 ? 'bg-white' : 'bg-white/30'}"></div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Skin Details & Download -->
                    <div class="flex items-center justify-between gap-3 mt-3 pt-1">
                        <div class="flex flex-col min-w-0">
                            <div class="flex items-center gap-2">
                                <h3 class="font-medium text-white text-sm truncate" title="${item.name}">${item.name}</h3>
                                ${item.badgeText ? `<span class="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded bg-white/[0.08] text-white/70">${item.badgeText}</span>` : ''}
                            </div>
                        </div>
                        <a href="${item.downloadUrl}" target="_blank" rel="noopener noreferrer" class="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black hover:bg-white/90 font-medium text-xs transition-colors" aria-label="Download ${item.name}">
                            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                            <span>Download</span>
                        </a>
                    </div>
                </div>`;
            }).join('');
        }
    }

    // tosu Overlay Showcase
    if (SITE_CONFIG.overlays) {
        const o = SITE_CONFIG.overlays;
        const grid = document.getElementById('overlays-grid');
        if (grid && Array.isArray(o.items)) {
            grid.innerHTML = o.items.map((item, i) => {
                const downloadUrl = item.downloadUrl || '#';
                const videoPreviewUrl = item.videoPreviewUrl || '';
                const videoSrc = item.previewVideo || '';

                return `
                <div class="flex flex-col gap-3.5 p-5 sm:p-6 rounded-2xl bg-[#18181a] border border-white/[0.08]">
                    <!-- Item Header & Actions -->
                    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div class="flex items-center gap-2.5 flex-wrap">
                            <h3 class="font-semibold text-white text-base sm:text-lg tracking-tight">${item.name}</h3>
                            ${item.badgeText ? `
                                <span class="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.08] text-white/70 border border-white/[0.06] shrink-0">
                                    ${item.badgeText}
                                </span>
                            ` : ''}
                        </div>
                        
                        <!-- Action Buttons: Download & Google Drive (VDO Preview) -->
                        <div class="flex items-center flex-wrap gap-2">
                            ${downloadUrl !== '#' ? `
                                <a href="${downloadUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white text-black hover:bg-white/90 font-medium text-xs transition-colors shrink-0" aria-label="Download ${item.name}">
                                    <svg class="w-3.5 h-3.5 fill-current shrink-0" width="14" height="14" viewBox="0 0 24 24"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>
                                    <span>Download</span>
                                </a>
                            ` : ''}
                            ${videoPreviewUrl ? `
                                <a href="${videoPreviewUrl}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.08] text-white/90 hover:text-white font-medium text-xs transition-colors shrink-0" aria-label="Watch VDO preview">
                                    <svg class="w-3.5 h-3.5 fill-current shrink-0" width="14" height="14" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                                    <span>VDO Preview</span>
                                    <svg class="w-3 h-3 fill-none stroke-current stroke-2 shrink-0 opacity-60" width="12" height="12" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                                </a>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="text-white/60 text-xs sm:text-sm leading-relaxed">${item.description || ''}</p>

                    <!-- Video Preview -->
                    ${videoSrc ? `
                        <div class="relative w-full aspect-video rounded-xl overflow-hidden bg-black border border-white/[0.08] shadow-lg mt-0.5">
                            <video id="overlay-video-${i}" class="w-full h-full object-cover" src="${videoSrc}" loop muted controls playsinline webkit-playsinline preload="metadata"></video>
                        </div>
                    ` : ''}

                    <!-- Attribution -->
                    ${item.sourceRefUrl ? `
                        <div class="text-[11px] text-white/40 flex items-center gap-1.5 pt-0.5">
                            <span>Forked from:</span>
                            <a href="${item.sourceRefUrl}" target="_blank" rel="noopener noreferrer" class="text-white/60 hover:text-white underline transition-colors">Citrusis/OBSDecoratePack</a>
                        </div>
                    ` : ''}
                </div>`;
            }).join('');
        }
    }
}

// Global Skin Slide Index State
const skinSlideIndices = {};

window.stepSkinSlide = function(skinIdx, direction) {
    if (!SITE_CONFIG.skins || !SITE_CONFIG.skins.items) return;
    const skin = SITE_CONFIG.skins.items[skinIdx];
    if (!skin || !skin.slides || skin.slides.length === 0) return;

    const total = skin.slides.length;
    let current = skinSlideIndices[skinIdx] || 0;
    current = (current + direction + total) % total;
    skinSlideIndices[skinIdx] = current;

    const slide = skin.slides[current];
    const img = document.getElementById(`skin-img-${skinIdx}`);
    const label = document.getElementById(`skin-label-${skinIdx}`);
    const dotsContainer = document.getElementById(`skin-dots-${skinIdx}`);

    if (img) {
        img.style.opacity = '0.2';
        img.style.transform = 'scale(0.975) translateZ(0)';
        setTimeout(() => {
            img.src = slide.src;
            img.setAttribute('data-lightbox', slide.src);
            img.setAttribute('data-lightbox-title', `${skin.name} (${slide.label})`);
            img.onload = () => {
                img.style.opacity = '1';
                img.style.transform = 'scale(1) translateZ(0)';
            };
        }, 90);
    }

    if (label) {
        label.textContent = slide.label;
    }

    if (dotsContainer) {
        const dots = dotsContainer.children;
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = `w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === current ? 'bg-white scale-125' : 'bg-white/30'}`;
        }
    }
};

// Toast
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.opacity = '1';
    setTimeout(() => {
        toast.style.opacity = '0';
    }, 2000);
}

// Discord Copy
function initDiscordButton() {
    const btn = document.getElementById('btn-discord');
    if (!btn) return;
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tag = (SITE_CONFIG?.profile?.socials?.discordTag) || 'Salmoneverydayplss';
        navigator.clipboard.writeText(tag).then(() => {
            showToast(`Copied Discord: ${tag}`);
        }).catch(() => {
            showToast('Unable to copy');
        });
    });
}

// Modals
function initModals() {
    const triggers = document.querySelectorAll('[data-modal-target]');

    function openModal(modalId) {
        const dialog = document.getElementById(modalId);
        if (!dialog) return;

        document.body.style.overflow = 'hidden';
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                dialog.classList.add('is-active');
            });
        });

        if (modalId === 'modal-overlays') {
            const v = dialog.querySelector('video');
            if (v) {
                v.muted = true;
                v.currentTime = 0;
                v.play().catch(() => {});
            }
        }
    }

    function closeModal(dialog) {
        if (!dialog) return;
        const v = dialog.querySelector('video');
        if (v) {
            v.pause();
            v.currentTime = 0;
        }

        dialog.classList.remove('is-active');

        setTimeout(() => {
            if (typeof dialog.close === 'function') dialog.close();
            else dialog.removeAttribute('open');

            const anyOpen = document.querySelectorAll('dialog[open]');
            if (anyOpen.length === 0) document.body.style.overflow = '';
        }, 350);
    }

    triggers.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-modal-target');
            if (targetId) openModal(targetId);
        });
    });

    document.querySelectorAll('dialog').forEach(dialog => {
        if (dialog.id === 'image-lightbox') return;

        const closeBtn = dialog.querySelector('.modal-close');
        if (closeBtn) closeBtn.addEventListener('click', () => closeModal(dialog));

        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) closeModal(dialog);
        });

        dialog.addEventListener('cancel', (e) => {
            e.preventDefault();
            closeModal(dialog);
        });
    });
}

// Lightbox
function initLightbox() {
    const dialog = document.getElementById('image-lightbox');
    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const closeBtn = document.getElementById('lightbox-close');

    if (!dialog || !img || !closeBtn) return;

    function openLightbox(src, caption) {
        if (!src) return;
        img.src = src;
        if (title) title.textContent = caption || '';
        document.body.style.overflow = 'hidden';
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                dialog.classList.add('is-active');
            });
        });
    }

    function closeLightbox() {
        dialog.classList.remove('is-active');
        setTimeout(() => {
            if (typeof dialog.close === 'function') dialog.close();
            else dialog.removeAttribute('open');
            img.src = '';
            const anyOpen = document.querySelectorAll('dialog[open]');
            if (anyOpen.length === 0) document.body.style.overflow = '';
        }, 320);
    }

    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('[data-lightbox]');
        if (trigger) {
            e.preventDefault();
            const src = trigger.getAttribute('data-lightbox');
            const caption = trigger.getAttribute('data-lightbox-title');
            openLightbox(src, caption);
        }
    });

    closeBtn.addEventListener('click', closeLightbox);
    dialog.addEventListener('click', (e) => {
        if (e.target === dialog) closeLightbox();
    });
    dialog.addEventListener('cancel', (e) => {
        e.preventDefault();
        closeLightbox();
    });
}

function initApp() {
    renderFromConfig();
    initDiscordButton();
    initModals();
    initLightbox();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
