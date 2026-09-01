/* ==========================================================================
   Znap- osu! Setup Configuration - Interactive Application Logic
   ========================================================================== */

// Global Lightbox Functions for instant execution & event handler access
window.openLightbox = function (elementOrSrc, caption) {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    if (!modal || !modalImg) return;

    let src = '';
    let alt = '';

    if (typeof elementOrSrc === 'string') {
        src = elementOrSrc;
        alt = caption || '';
    } else if (elementOrSrc) {
        let img = null;
        if (elementOrSrc.tagName && elementOrSrc.tagName.toLowerCase() === 'img') {
            img = elementOrSrc;
        } else {
            const sliderContainer = elementOrSrc.closest('.skin-slider-container, .preview-image-container, .skin-preview-wrapper');
            if (sliderContainer) {
                const rawIdx = sliderContainer.dataset.currentIndex;
                const idx = (rawIdx !== undefined && !isNaN(parseInt(rawIdx, 10))) ? parseInt(rawIdx, 10) : 0;
                const images = sliderContainer.querySelectorAll('.skin-slide-img, .setup-preview-img');
                img = images[idx] || images[0] || sliderContainer.querySelector('img');
            } else {
                img = elementOrSrc.querySelector('img.active-slide') || elementOrSrc.querySelector('img');
            }
        }

        if (img) {
            src = img.src;
            alt = img.getAttribute('data-label') || img.alt || caption || '';
        }
    }

    if (src) {
        modalImg.src = src;
        if (captionText) captionText.textContent = alt;
        modal.classList.add('show', 'active');
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
};

window.closeLightbox = function () {
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;
    modal.classList.remove('show', 'active');
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

// Dynamic Data Rendering from SITE_CONFIG (js/config.js)
function renderFromConfig() {
    if (typeof SITE_CONFIG === 'undefined') return;

    // 1. Profile Header
    if (SITE_CONFIG.profile) {
        const p = SITE_CONFIG.profile;
        const pageTitle = document.querySelector('.page-title');
        if (pageTitle && p.username) {
            pageTitle.innerHTML = `${p.username} <span class="highlight-text">${p.titleHighlight || 'Setup Configuration'}</span>`;
        }

        const lastUpdateTag = document.querySelector('.last-update-tag strong');
        if (lastUpdateTag && p.lastUpdate) lastUpdateTag.textContent = p.lastUpdate;

        const avatarImg = document.getElementById('profile-avatar-img');
        if (avatarImg && p.avatarUrl) {
            avatarImg.src = p.avatarUrl;
            if (p.avatarFallback) {
                avatarImg.onerror = () => { avatarImg.src = p.avatarFallback; };
            }
        }

        if (p.socials) {
            const osuBtn = document.querySelector('.osu-text-pill');
            if (osuBtn && p.socials.osuProfileUrl) osuBtn.href = p.socials.osuProfileUrl;

            const tiktokBtn = document.querySelector('.social-pill[title*="TikTok"]');
            if (tiktokBtn && p.socials.tiktokUrl) {
                tiktokBtn.href = p.socials.tiktokUrl;
                if (p.socials.tiktokTitle) tiktokBtn.title = p.socials.tiktokTitle;
            }

            const xBtn = document.querySelector('.social-pill[title*="X"]');
            if (xBtn && p.socials.xUrl) {
                xBtn.href = p.socials.xUrl;
                if (p.socials.xTitle) xBtn.title = p.socials.xTitle;
            }

            const copyDiscord = document.getElementById('copy-discord');
            if (copyDiscord && p.socials.discordTag) {
                copyDiscord.title = `Discord: ${p.socials.discordTag} (Click to copy)`;
            }
        }
    }

    // 2. Tablet Settings Card
    if (SITE_CONFIG.tablet) {
        const t = SITE_CONFIG.tablet;
        const card = document.getElementById('card-tablet');
        if (card) {
            const dev = card.querySelector('.device-val'); if (dev && t.device) dev.textContent = t.device;
            const area = card.querySelector('.area-val'); if (area && t.area) area.textContent = t.area;
            const drv = card.querySelector('.driver-val'); if (drv && t.driverName) drv.textContent = t.driverName;
            const drvLink = card.querySelector('.driver-link'); if (drvLink && t.driverDownloadUrl) drvLink.href = t.driverDownloadUrl;
            const img = card.querySelector('.setup-preview-img');
            if (img && t.previewImage) {
                img.src = t.previewImage;
                if (t.previewAlt) img.alt = t.previewAlt;
            }
        }
    }

    // 3. Keyboard Settings Card
    if (SITE_CONFIG.keyboard) {
        const kb = SITE_CONFIG.keyboard;
        const card = document.getElementById('card-keyboard');
        if (card) {
            const dev = card.querySelector('.device-val'); if (dev && kb.device) dev.textContent = kb.device;
            const bind = card.querySelector('.keybind-val'); if (bind && kb.keybind) bind.textContent = kb.keybind;
            const act = card.querySelector('.actuation-val'); if (act && kb.actuationPoint) act.textContent = kb.actuationPoint;
            const rap = card.querySelector('.rapid-val'); if (rap && kb.rapidTrigger) rap.textContent = kb.rapidTrigger;
            const img = card.querySelector('.setup-preview-img');
            if (img && kb.previewImage) {
                img.src = kb.previewImage;
                if (kb.previewAlt) img.alt = kb.previewAlt;
            }
        }
    }

    // 4. Keypad Settings Card
    if (SITE_CONFIG.keypad) {
        const kp = SITE_CONFIG.keypad;
        const card = document.getElementById('card-keypad');
        if (card) {
            const dev = card.querySelector('.device-val'); if (dev && kp.device) dev.textContent = kp.device;
            const strk = card.querySelector('.stroke-val'); if (strk && kp.stroke) strk.textContent = kp.stroke;
            const act = card.querySelector('.actuation-val'); if (act && kp.actuationPoint) act.textContent = kp.actuationPoint;
            const rap = card.querySelector('.rapid-val'); if (rap && kp.rapidTrigger) rap.textContent = kp.rapidTrigger;
            const img = card.querySelector('.setup-preview-img');
            if (img && kp.previewImage) {
                img.src = kp.previewImage;
                if (kp.previewAlt) img.alt = kp.previewAlt;
            }
        }
    }

    // 5. Monitor Card
    if (SITE_CONFIG.monitor) {
        const m = SITE_CONFIG.monitor;
        const card = document.getElementById('card-monitor');
        if (card) {
            const dev = card.querySelector('.device-val'); if (dev && m.device) dev.textContent = m.device;
            const ref = card.querySelector('.refresh-val'); if (ref && m.refreshRate) ref.textContent = m.refreshRate;
            const res = card.querySelector('.res-val'); if (res && m.resolution) res.textContent = m.resolution;
            const resp = card.querySelector('.response-val'); if (resp && m.responseTime) resp.textContent = m.responseTime;
        }
    }

    // 6. Audio Card
    if (SITE_CONFIG.audio) {
        const a = SITE_CONFIG.audio;
        const card = document.getElementById('card-audio');
        if (card) {
            const dev = card.querySelector('.device-val'); if (dev && a.device) dev.textContent = a.device;
            const conn = card.querySelector('.conn-val'); if (conn && a.connector) conn.textContent = a.connector;
            const typ = card.querySelector('.type-val'); if (typ && a.type) typ.textContent = a.type;
        }
    }

    // 7. Skins Showcase Section Grid
    if (SITE_CONFIG.skins) {
        const s = SITE_CONFIG.skins;
        const subtext = document.querySelector('.skin-subtext');
        if (subtext && s.subtext) subtext.textContent = s.subtext;

        const driveBtn = document.querySelector('.banner-bar-action');
        if (driveBtn && s.driveFolderUrl) driveBtn.href = s.driveFolderUrl;

        const grid = document.getElementById('skin-items-grid');
        if (grid && Array.isArray(s.items) && s.items.length > 0) {
            grid.innerHTML = s.items.map((item) => {
                const slidesHtml = item.slides.map((slide, i) => `
                    <img src="${slide.src}" alt="${slide.alt || item.name}" data-label="${slide.label || 'Gameplay'}" class="setup-preview-img skin-slide-img ${i === 0 ? 'active-slide' : ''}" loading="lazy" decoding="async">
                `).join('');

                return `
                <div class="skin-box ${item.badgeClass ? item.badgeClass + '-box' : ''}">
                    <div class="skin-box-header">
                        <span class="skin-tag-badge ${item.badgeClass || 'main-skin'}">${item.badgeText}</span>
                        <h3>${item.name}</h3>
                    </div>
                    <div class="skin-preview-wrapper skin-slider-container">
                        <div class="skin-slider-track">
                            ${slidesHtml}
                        </div>
                        <div class="image-overlay">
                            <span class="zoom-hint">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>
                                Click to Zoom
                            </span>
                        </div>
                        <button class="slider-btn slider-prev" title="Previous Image">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>
                        </button>
                        <button class="slider-btn slider-next" title="Next Image">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"/></svg>
                        </button>
                        <div class="slider-counter-badge">1 / ${item.slides.length}</div>
                        <div class="slider-caption-badge">${item.slides[0]?.label || 'Gameplay'}</div>
                        <div class="slider-dots"></div>
                    </div>
                    <a href="${item.downloadUrl}" target="_blank" rel="noopener noreferrer" class="btn-skin-action">
                        Download Here
                    </a>
                </div>`;
            }).join('');
        }
    }
}

// Application Initialization Entry Point
function initApp() {
    renderFromConfig();

    // Event Delegation
    document.addEventListener('click', (e) => {
        const closeBtn = e.target.closest('#lightbox-close, .lightbox-close');
        const modal = document.getElementById('lightbox-modal');
        if (closeBtn || e.target === modal) {
            window.closeLightbox();
            return;
        }

        const zoomTarget = e.target.closest('.preview-image-container, .skin-preview-wrapper, .setup-preview-img, .skin-slider-container');
        if (zoomTarget && !e.target.closest('.btn-download-link, .btn-skin-action, .social-pill, .skin-folder-wrapper, .slider-btn, .slider-dot, .banner-bar-action, .skin-grid-scroll-btn')) {
            window.openLightbox(zoomTarget);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.closeLightbox();
        }
    });

    initDiscordCopy();
    initAvatarCacheBuster();
    initScrollReveal();
    initSkinsButton();
    initSkinSliders();
    initSkinGridScroll();
    initGPUAutoDetection();
}

// Clipboard Copy Utility
function initDiscordCopy() {
    const copyBtn = document.getElementById('copy-discord');
    if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tag = (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.profile?.socials?.discordTag) 
                ? SITE_CONFIG.profile.socials.discordTag 
                : "Salmoneverydayplss";
            navigator.clipboard.writeText(tag).then(() => {
                showToast(`Copied Discord: ${tag}`);
            }).catch(err => {
                console.warn("Clipboard copy failed:", err);
            });
        });
    }
}

// Avatar Cache Busting
function initAvatarCacheBuster() {
    const avatarImg = document.querySelector('.profile-avatar-img');
    if (avatarImg) {
        const currentSrc = avatarImg.getAttribute('src');
        if (currentSrc && currentSrc.includes('a.ppy.sh')) {
            const baseUrl = currentSrc.split('?')[0];
            avatarImg.src = `${baseUrl}?t=${Date.now()}`;
        }
    }
}

// Scroll Reveal Intersection Observer
function initScrollReveal() {
    const targets = document.querySelectorAll('.glass-panel, .spec-item, .skin-box, .btn-full-collection');

    targets.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(22px)';
        el.style.transition = 'opacity 0.95s cubic-bezier(0.16,1,0.3,1), transform 0.95s cubic-bezier(0.16,1,0.3,1)';
        el.dataset.revealDelay = Math.min(i * 50, 400);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.revealDelay || 0, 10);
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, delay);
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    });

    targets.forEach(el => observer.observe(el));
}

// Toast Helper
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// Floating Action Button Controller
function initSkinsButton() {
    const fab = document.getElementById('scroll-to-skins');
    const skinsSection = document.getElementById('skins');
    if (!fab || !skinsSection) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                fab.classList.add('hidden');
            } else {
                fab.classList.remove('hidden');
            }
        });
    }, { threshold: 0.15 });

    observer.observe(skinsSection);
}

// Hardware Acceleration Auto-Detection
function checkGPUHardwareAcceleration() {
    try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
        if (!gl) return false;

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
            const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL).toLowerCase();
            if (
                renderer.includes('swiftshader') ||
                renderer.includes('llvmpipe') ||
                renderer.includes('software') ||
                renderer.includes('basic render') ||
                renderer.includes('canvaskit') ||
                (vendor.includes('google inc.') && renderer.includes('swiftshader'))
            ) {
                return false;
            }
        }
        return true;
    } catch (e) {
        return false;
    }
}

function initGPUAutoDetection() {
    const root = document.documentElement;
    const hasGPU = checkGPUHardwareAcceleration();

    if (!hasGPU) {
        root.classList.add('no-gpu');
        console.log('[Znap- Setup] Hardware Acceleration disabled: Enforcing high-performance profile.');
    }
}

// Skin Multi-Picture Slider Controller
function initSkinSliders() {
    const sliders = document.querySelectorAll('.skin-slider-container');
    const sliderStates = [];
    const startAllAutoPlay = [];
    const stopAllAutoPlay = [];

    sliders.forEach((slider) => {
        const images = slider.querySelectorAll('.skin-slide-img, .setup-preview-img');
        if (images.length === 0) return;

        images.forEach((img, idx) => {
            if (idx === 0) img.classList.add('active-slide');
            else img.classList.remove('active-slide');
        });

        const counter = slider.querySelector('.slider-counter-badge');
        const caption = slider.querySelector('.slider-caption-badge');
        const dotsContainer = slider.querySelector('.slider-dots');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');
        const maxImages = images.length;

        if (maxImages > 1) {
            slider.classList.add('has-multiple');

            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                images.forEach((_, idx) => {
                    const dot = document.createElement('span');
                    dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
                    dot.setAttribute('title', `Slide ${idx + 1}`);
                    dotsContainer.appendChild(dot);
                });
            }

            sliderStates.push({ slider, images, counter, caption, dotsContainer, prevBtn, nextBtn, maxImages });
        } else {
            slider.classList.remove('has-multiple');
            if (counter) counter.textContent = '1 / 1';
            if (caption) {
                const img = images[0];
                caption.textContent = img.getAttribute('data-label') || img.alt || 'Preview';
            }
        }
    });

    if (sliderStates.length === 0) return;

    const maxSlides = Math.max(...sliderStates.map(s => s.maxImages));
    let sharedIndex = 0;
    let autoPlayInterval = null;

    function goToAllSliders(rawIndex) {
        sharedIndex = ((rawIndex % maxSlides) + maxSlides) % maxSlides;

        sliderStates.forEach(({ slider, images, counter, caption, dotsContainer }) => {
            const count = images.length;
            const idx = sharedIndex % count;

            images.forEach((img, i) => {
                if (i === idx) img.classList.add('active-slide');
                else img.classList.remove('active-slide');
            });

            const track = slider.querySelector('.skin-slider-track');
            if (track) track.style.transform = `translate3d(-${idx * 100}%, 0, 0)`;
            slider.dataset.currentIndex = idx;

            if (counter) counter.textContent = `${idx + 1} / ${count}`;
            if (caption) {
                const label = images[idx].getAttribute('data-label') || images[idx].alt || 'Preview';
                caption.textContent = label;
            }
            if (dotsContainer) {
                dotsContainer.querySelectorAll('.slider-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === idx);
                });
            }
        });
    }

    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => goToAllSliders(sharedIndex + 1), 6500);
    }

    function stopAutoPlay() {
        if (autoPlayInterval) { clearInterval(autoPlayInterval); autoPlayInterval = null; }
    }

    startAllAutoPlay.push(startAutoPlay);
    stopAllAutoPlay.push(stopAutoPlay);

    sliderStates.forEach(({ slider }) => {
        const track = slider.querySelector('.skin-slider-track');
        if (track) track.classList.add('no-transition');
    });

    stopAutoPlay();
    goToAllSliders(0);

    requestAnimationFrame(() => {
        sliderStates.forEach(({ slider }) => {
            const track = slider.querySelector('.skin-slider-track');
            if (track) {
                track.getBoundingClientRect();
                requestAnimationFrame(() => {
                    track.classList.remove('no-transition');
                });
            }
        });
    });

    let hasStartedFirstTime = false;

    const skinsSection = document.querySelector('.skin-section-card') || document.getElementById('skins');
    if (skinsSection) {
        const viewportObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!hasStartedFirstTime) {
                        hasStartedFirstTime = true;
                        goToAllSliders(0);
                    }
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, {
            threshold: 0.25,
            rootMargin: '0px 0px -60px 0px'
        });

        viewportObserver.observe(skinsSection);
    }

    sliderStates.forEach(({ slider, prevBtn, nextBtn, dotsContainer }) => {
        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                stopAutoPlay();
                goToAllSliders(sharedIndex - 1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                stopAutoPlay();
                goToAllSliders(sharedIndex + 1);
            });
        }
        if (dotsContainer) {
            dotsContainer.querySelectorAll('.slider-dot').forEach((dot, idx) => {
                dot.addEventListener('click', (e) => {
                    e.stopPropagation();
                    stopAutoPlay();
                    goToAllSliders(idx);
                });
            });
        }
    });

    const skinTargets = document.querySelectorAll('.skin-section-card, .skin-box, .skin-slider-container');
    skinTargets.forEach(target => {
        target.addEventListener('mouseenter', () => stopAllAutoPlay.forEach(fn => fn()));
        target.addEventListener('mouseleave', () => {
            if (skinsSection) {
                const rect = skinsSection.getBoundingClientRect();
                const inView = rect.top < window.innerHeight && rect.bottom > 0;
                if (inView) startAllAutoPlay.forEach(fn => fn());
            } else {
                startAllAutoPlay.forEach(fn => fn());
            }
        });
    });
}

// Skin Grid Scroll Controller
function initSkinGridScroll() {
    const grid = document.getElementById('skin-items-grid');
    const prevBtn = document.getElementById('skin-grid-prev');
    const nextBtn = document.getElementById('skin-grid-next');

    if (!grid || !prevBtn || !nextBtn) return;

    requestAnimationFrame(() => {
        const saved = grid.scrollLeft;
        grid.scrollLeft = saved + 1;
        grid.scrollLeft = saved;
    });

    let currentCardIndex = 0;

    function getCardCount() {
        return grid.querySelectorAll('.skin-box').length;
    }

    function scrollToCard(index) {
        const cards = Array.from(grid.querySelectorAll('.skin-box'));
        const count = cards.length;
        if (count === 0) return;

        currentCardIndex = (index % count + count) % count;
        const card = cards[currentCardIndex];
        const gridRect = grid.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        const targetLeft = grid.scrollLeft + (cardRect.left - gridRect.left);

        requestAnimationFrame(() => {
            grid.scrollTo({ left: targetLeft, behavior: 'smooth' });
        });
    }

    function getCurrentCardIndex() {
        const cards = Array.from(grid.querySelectorAll('.skin-box'));
        const gridRect = grid.getBoundingClientRect();

        let closestIndex = 0;
        let minDistance = Infinity;

        cards.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const distance = Math.abs(cardRect.left - gridRect.left);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    const progressThumb = document.getElementById('skin-grid-progress-thumb');
    const progressText = document.getElementById('skin-grid-progress-text');

    function updateProgressLine() {
        if (!progressThumb || !progressThumb.parentElement) return;
        const cards = grid.querySelectorAll('.skin-box');
        const count = cards.length || 1;

        const scrollLeft = grid.scrollLeft;
        const maxScroll = grid.scrollWidth - grid.clientWidth;
        const progress = maxScroll > 0 ? Math.max(0, Math.min(scrollLeft / maxScroll, 1)) : 0;

        const firstCard = cards[0];
        const cardWidth = firstCard ? firstCard.offsetWidth : 300;
        const visibleCards = Math.max(1, Math.floor((grid.clientWidth + 16) / (cardWidth + 16)));
        const totalPages = Math.max(1, count - visibleCards + 1);

        const currentPage = Math.min(totalPages, Math.floor(progress * (totalPages - 1) + 0.5) + 1);

        if (progressText) {
            progressText.textContent = `${currentPage} / ${totalPages}`;
        }

        const trackWidth = progressThumb.parentElement.clientWidth;
        const thumbWidth = trackWidth / totalPages;
        progressThumb.style.width = `${thumbWidth}px`;

        const maxTranslate = trackWidth - thumbWidth;
        const translateX = progress * maxTranslate;

        progressThumb.style.transform = `translate3d(${translateX}px, 0, 0)`;
    }

    grid.addEventListener('scroll', () => {
        requestAnimationFrame(updateProgressLine);
    }, { passive: true });

    window.addEventListener('resize', () => {
        requestAnimationFrame(updateProgressLine);
    }, { passive: true });

    requestAnimationFrame(updateProgressLine);

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const count = getCardCount();

        if (grid.scrollLeft <= 10) {
            scrollToCard(count - 1);
        } else {
            const currentIndex = getCurrentCardIndex();
            scrollToCard(currentIndex - 1);
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const maxScroll = grid.scrollWidth - grid.clientWidth;

        if (grid.scrollLeft >= maxScroll - 10) {
            scrollToCard(0);
        } else {
            const currentIndex = getCurrentCardIndex();
            scrollToCard(currentIndex + 1);
        }
    });
}

// Dom Ready Execution
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
