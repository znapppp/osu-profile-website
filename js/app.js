// ==========================================================================
// Znap- osu! Setup Configuration - Interactive Application Logic
// ==========================================================================

// Global Lightbox Functions for instant execution & event handler access
window.openLightbox = function(elementOrSrc, caption) {
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

window.closeLightbox = function() {
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
        if (zoomTarget && !e.target.closest('.btn-download-link, .btn-skin-action, .social-pill, .skin-folder-wrapper, .slider-btn, .slider-dot, .banner-bar-action')) {
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
// Skin Multi-Picture Slider / Carousel System (With Hover Auto-Play & Caption Badge)
// ----------------------------------------------------------------------
function initSkinSliders() {
    const sliders = document.querySelectorAll('.skin-slider-container');

    sliders.forEach((slider) => {
        const images = slider.querySelectorAll('.skin-slide-img, .setup-preview-img');
        if (images.length === 0) return;

        let currentIndex = 0;
        let autoPlayInterval = null;

        // Ensure active class is properly set
        images.forEach((img, idx) => {
            if (idx === 0) img.classList.add('active-slide');
            else img.classList.remove('active-slide');
        });

        const counter = slider.querySelector('.slider-counter-badge');
        const caption = slider.querySelector('.slider-caption-badge');
        const dotsContainer = slider.querySelector('.slider-dots');
        const prevBtn = slider.querySelector('.slider-prev');
        const nextBtn = slider.querySelector('.slider-next');

        if (images.length > 1) {
            slider.classList.add('has-multiple');

            // Render indicator dots
            if (dotsContainer) {
                dotsContainer.innerHTML = '';
                images.forEach((_, idx) => {
                    const dot = document.createElement('span');
                    dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
                    dot.setAttribute('title', `Slide ${idx + 1}`);
                    dot.addEventListener('click', (e) => {
                        e.stopPropagation();
                        goToSlide(idx);
                        resetAutoPlay();
                    });
                    dotsContainer.appendChild(dot);
                });
            }

            function updateSliderUI() {
                images.forEach((img, idx) => {
                    if (idx === currentIndex) img.classList.add('active-slide');
                    else img.classList.remove('active-slide');
                });

                // Update counter badge (e.g. 1 / 3)
                if (counter) {
                    counter.textContent = `${currentIndex + 1} / ${images.length}`;
                }

                // Update bottom-right label tag (e.g. Gameplay, Song Select)
                if (caption) {
                    const activeImg = images[currentIndex];
                    const label = activeImg.getAttribute('data-label') || activeImg.alt || 'Preview';
                    caption.textContent = label;
                }

                // Update dots active state
                if (dotsContainer) {
                    const dots = dotsContainer.querySelectorAll('.slider-dot');
                    dots.forEach((dot, idx) => {
                        if (idx === currentIndex) dot.classList.add('active');
                        else dot.classList.remove('active');
                    });
                }
            }

            function goToSlide(index) {
                currentIndex = (index + images.length) % images.length;
                slider.dataset.currentIndex = currentIndex;
                const track = slider.querySelector('.skin-slider-track');
                if (track) {
                    track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;
                }
                updateSliderUI();
            }

            // Hover Auto-Play feature: cycle slides every 2.2s on hover
            function startAutoPlay() {
                stopAutoPlay();
                autoPlayInterval = setInterval(() => {
                    goToSlide(currentIndex + 1);
                }, 2200);
            }

            function stopAutoPlay() {
                if (autoPlayInterval) {
                    clearInterval(autoPlayInterval);
                    autoPlayInterval = null;
                }
            }

            function resetAutoPlay() {
                startAutoPlay();
            }

            slider.addEventListener('mouseenter', () => {
                startAutoPlay();
            });

            slider.addEventListener('mouseleave', () => {
                stopAutoPlay();
            });

            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goToSlide(currentIndex - 1);
                    resetAutoPlay();
                });
            }

            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    goToSlide(currentIndex + 1);
                    resetAutoPlay();
                });
            }

            updateSliderUI();
        } else {
            slider.classList.remove('has-multiple');
            if (counter) counter.textContent = '1 / 1';
            if (caption) {
                const singleImg = images[0];
                caption.textContent = singleImg.getAttribute('data-label') || singleImg.alt || 'Preview';
            }
        }
    });
}



// Execute immediately if DOM is ready, or wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
