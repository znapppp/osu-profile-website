// ==========================================================================
// Znap- osu! Setup Configuration - Interactive Application Logic
// ==========================================================================

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

// Application Main Initialization
function initApp() {
    // Global Event Delegation for clicks
    document.addEventListener('click', (e) => {
        // 1. Close lightbox if clicking close button or background backdrop
        const closeBtn = e.target.closest('#lightbox-close, .lightbox-close');
        const modal = document.getElementById('lightbox-modal');
        if (closeBtn || e.target === modal) {
            window.closeLightbox();
            return;
        }

        // 2. Open lightbox if clicking any preview container or setup image (except slider buttons, links, dots)
        const zoomTarget = e.target.closest('.preview-image-container, .skin-preview-wrapper, .setup-preview-img, .skin-slider-container');
        if (zoomTarget && !e.target.closest('.btn-download-link, .btn-skin-action, .social-pill, .skin-folder-wrapper, .slider-btn, .slider-dot, .banner-bar-action, .skin-grid-scroll-btn')) {
            window.openLightbox(zoomTarget);
        }
    });

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            window.closeLightbox();
        }
    });

    // Initialize Discord Copy Listener
    initDiscordCopy();

    // Initialize Auto-Update Profile Avatar Cache Buster
    initAvatarCacheBuster();

    // Initialize Scroll-Reveal Animation
    initScrollReveal();

    // Initialize Skins FAB visibility toggle
    initSkinsButton();

    // Initialize Skin Multi-Picture Carousel Sliders
    initSkinSliders();

    // Initialize Skin Grid Horizontal Navigation Arrows
    initSkinGridScroll();

    // Automatic GPU Hardware Acceleration Auto-Detection
    initGPUAutoDetection();
}

// ----------------------------------------------------------------------
// Discord Tag Copy Utility
// ----------------------------------------------------------------------
function initDiscordCopy() {
    const copyBtn = document.getElementById('copy-discord');
    if (copyBtn) {
        copyBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tag = "Salmoneverydayplss";
            navigator.clipboard.writeText(tag).then(() => {
                showToast(`Copied Discord: ${tag}`);
            }).catch(err => {
                console.warn("Clipboard copy failed:", err);
            });
        });
    }
}

// ----------------------------------------------------------------------
// Auto-Update osu! Profile Avatar (Cache Busting)
// ----------------------------------------------------------------------
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

// ----------------------------------------------------------------------
// Scroll-Reveal Animation (IntersectionObserver)
// ----------------------------------------------------------------------
function initScrollReveal() {
    // Elements to animate: cards, spec rows, skin boxes (excluding footer to prevent opacity issues)
    const targets = document.querySelectorAll(
        '.glass-panel, .spec-item, .skin-box, .btn-full-collection'
    );

    // Start all elements as invisible + slightly shifted down
    targets.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(22px)';
        el.style.transition = 'opacity 0.95s cubic-bezier(0.16,1,0.3,1), transform 0.95s cubic-bezier(0.16,1,0.3,1)';
        // stagger delay based on position in DOM
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
                observer.unobserve(el); // animate once only
            }
        });
    }, {
        threshold: 0.08,       // trigger when 8% of element is visible
        rootMargin: '0px 0px -30px 0px' // trigger slightly before fully visible
    });

    targets.forEach(el => observer.observe(el));
}

// Toast Helper Utility
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ----------------------------------------------------------------------
// Scroll-to-Skins FAB — hide when skins section is already in view
// ----------------------------------------------------------------------
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

// ----------------------------------------------------------------------
// Automatic Chrome GPU Hardware Acceleration Detection
// ----------------------------------------------------------------------
function checkGPUHardwareAcceleration() {
    try {
        const testCanvas = document.createElement('canvas');
        const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
        if (!gl) return false; // WebGL disabled = Hardware acceleration OFF

        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
            const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL).toLowerCase();
            const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL).toLowerCase();
            // Known software rasterizers when Chrome GPU Hardware Acceleration is turned OFF:
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

    // Auto-enable .no-gpu mode if Chrome Hardware Acceleration is turned OFF
    if (!hasGPU) {
        root.classList.add('no-gpu');
        console.log('[Znap- Setup] Chrome GPU Hardware Acceleration disabled: Auto-enabled .no-gpu high-performance mode.');
    }
}

// ----------------------------------------------------------------------
// Skin Multi-Picture Slider / Carousel System — Synced across all cards
// ----------------------------------------------------------------------
function initSkinSliders() {
    const sliders = document.querySelectorAll('.skin-slider-container');
    const sliderStates = [];   // per-slider state objects
    const startAllAutoPlay = [];
    const stopAllAutoPlay = [];

    // ── Build per-slider state ────────────────────────────────────────────
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

            // Render dots
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

    // ── Shared state ─────────────────────────────────────────────────────
    const maxSlides = Math.max(...sliderStates.map(s => s.maxImages));
    let sharedIndex = 0;
    let autoPlayInterval = null;

    // ── Move ALL sliders to the given index simultaneously ───────────────
    function goToAllSliders(rawIndex) {
        sharedIndex = ((rawIndex % maxSlides) + maxSlides) % maxSlides;

        sliderStates.forEach(({ slider, images, counter, caption, dotsContainer }) => {
            const count = images.length;
            const idx = sharedIndex % count;   // wrap for shorter slide sets

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

    // ── Auto-play (Slower 6.5s interval for comfortable preview viewing) ──
    function startAutoPlay() {
        stopAutoPlay();
        autoPlayInterval = setInterval(() => goToAllSliders(sharedIndex + 1), 6500);
    }
    function stopAutoPlay() {
        if (autoPlayInterval) { clearInterval(autoPlayInterval); autoPlayInterval = null; }
    }

    startAllAutoPlay.push(startAutoPlay);
    stopAllAutoPlay.push(stopAutoPlay);

    // Explicitly freeze at Slide 0 (Gameplay) on initial load — no animation
    // Add .no-transition to ALL tracks before positioning so goToAllSliders(0)
    // does NOT trigger the CSS transition (prevents flash animation on page load)
    sliderStates.forEach(({ slider }) => {
        const track = slider.querySelector('.skin-slider-track');
        if (track) track.classList.add('no-transition');
    });

    stopAutoPlay();
    goToAllSliders(0);

    // After one rAF: force GPU layer promotion, then remove .no-transition
    // so all subsequent prev/next clicks animate normally
    requestAnimationFrame(() => {
        sliderStates.forEach(({ slider }) => {
            const track = slider.querySelector('.skin-slider-track');
            if (track) {
                track.getBoundingClientRect(); // force reflow → promote compositor layer
                requestAnimationFrame(() => {
                    track.classList.remove('no-transition');
                });
            }
        });
    });

    let hasStartedFirstTime = false;

    // ── IntersectionObserver: Start Auto-play ONLY when Skins section enters viewport ──
    const skinsSection = document.querySelector('.skin-section-card') || document.getElementById('skins');
    if (skinsSection) {
        const viewportObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!hasStartedFirstTime) {
                        hasStartedFirstTime = true;
                        goToAllSliders(0); // Guarantee starting on Gameplay (Slide 0)
                    }
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, {
            threshold: 0.25,                 // Requires 25% of section visible on screen
            rootMargin: '0px 0px -60px 0px'  // Prevents premature trigger while reading above
        });

        viewportObserver.observe(skinsSection);
    }

    // ── Wire up prev/next buttons AND dots for every slider ───────────────
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

    // Initialise UI — already done above with no-transition; this is a safety net
    // goToAllSliders(0) was already called; skip second call to avoid double-animate

    // ── Pause all when hovering any skin card / section ──────────────────
    const skinTargets = document.querySelectorAll('.skin-section-card, .skin-box, .skin-slider-container');
    skinTargets.forEach(target => {
        target.addEventListener('mouseenter', () => stopAllAutoPlay.forEach(fn => fn()));
        target.addEventListener('mouseleave', () => {
            // Only resume autoplay on mouseleave if section is still visible
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

// ----------------------------------------------------------------------
// Skin Grid Horizontal Navigation Arrows
// ----------------------------------------------------------------------
function initSkinGridScroll() {
    const grid = document.getElementById('skin-items-grid');
    const prevBtn = document.getElementById('skin-grid-prev');
    const nextBtn = document.getElementById('skin-grid-next');

    if (!grid || !prevBtn || !nextBtn) return;

    // ── Prime the GPU compositor layer BEFORE first user interaction ──────
    // This eliminates "first scroll only" jitter caused by lazy layer creation
    requestAnimationFrame(() => {
        const saved = grid.scrollLeft;
        grid.scrollLeft = saved + 1;
        grid.scrollLeft = saved;
    });

    let currentCardIndex = 0;

    function getCardCount() {
        return grid.querySelectorAll('.skin-box').length;
    }

    function getScrollStep() {
        const firstCard = grid.querySelector('.skin-box');
        return firstCard ? firstCard.offsetWidth + 16 : 340;
    }

    function scrollToCard(index) {
        const cards = Array.from(grid.querySelectorAll('.skin-box'));
        const count = cards.length;
        if (count === 0) return;

        // Circular wrap-around for standard carousel experience
        currentCardIndex = (index % count + count) % count;

        // Compute position relative to the scrollable grid container
        const card = cards[currentCardIndex];
        const gridRect = grid.getBoundingClientRect();
        const cardRect = card.getBoundingClientRect();
        // Current scrollLeft + distance of card's left edge from grid's left edge
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
            // Calculate distance from left edge of grid to left edge of card
            // We subtract a small padding/margin offset if needed, but absolute diff is fine.
            const distance = Math.abs(cardRect.left - gridRect.left);

            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = index;
            }
        });

        return closestIndex;
    }

    // ── Non-interactive Progress Line Indicator Update ───────────────────
    const progressThumb = document.getElementById('skin-grid-progress-thumb');
    const progressText = document.getElementById('skin-grid-progress-text');

    function updateProgressLine() {
        if (!progressThumb || !progressThumb.parentElement) return;
        const cards = grid.querySelectorAll('.skin-box');
        const count = cards.length || 1;

        const scrollLeft = grid.scrollLeft;
        const maxScroll = grid.scrollWidth - grid.clientWidth;
        const progress = maxScroll > 0 ? Math.max(0, Math.min(scrollLeft / maxScroll, 1)) : 0;

        // Calculate visible cards per page & total viewable pages
        const firstCard = cards[0];
        const cardWidth = firstCard ? firstCard.offsetWidth : 300;
        const visibleCards = Math.max(1, Math.floor((grid.clientWidth + 16) / (cardWidth + 16)));
        const totalPages = Math.max(1, count - visibleCards + 1);

        const currentPage = Math.min(totalPages, Math.floor(progress * (totalPages - 1) + 0.5) + 1);

        // Update small thin counter text (e.g. "1 / 2")
        if (progressText) {
            progressText.textContent = `${currentPage} / ${totalPages}`;
        }

        // Equal division of progress line based on total viewable pages
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

    // Initial update
    requestAnimationFrame(updateProgressLine);

    prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const count = getCardCount();

        // Loop to last card if at start
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

        // Loop to first card (0) if at end of scroll
        if (grid.scrollLeft >= maxScroll - 10) {
            scrollToCard(0);
        } else {
            const currentIndex = getCurrentCardIndex();
            scrollToCard(currentIndex + 1);
        }
    });
}



// Execute immediately if DOM is ready, or wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
