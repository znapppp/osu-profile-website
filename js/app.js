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
        const img = elementOrSrc.tagName && elementOrSrc.tagName.toLowerCase() === 'img'
            ? elementOrSrc
            : elementOrSrc.querySelector('img');
        if (img) {
            src = img.src;
            alt = img.alt || caption || '';
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

        // 2. Open lightbox if clicking any preview container or setup image
        const zoomTarget = e.target.closest('.preview-image-container, .skin-preview-wrapper, .setup-preview-img');
        if (zoomTarget && !e.target.closest('.btn-download-link, .btn-skin-action, .social-pill')) {
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
    // Elements to animate: cards, spec rows, skin boxes, header, footer
    const targets = document.querySelectorAll(
        '.glass-panel, .spec-item, .skin-box, .skin-preview-wrapper, .btn-full-collection, .footer'
    );

    // Start all elements as invisible + slightly shifted down
    targets.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(22px)';
        el.style.transition = 'opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)';
        // stagger delay based on position in DOM
        el.dataset.revealDelay = Math.min(i * 40, 320);
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

// Execute immediately if DOM is ready, or wait for DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
