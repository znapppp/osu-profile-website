// ==========================================================================
// Znap- osu! Setup Configuration - Interactive Application Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lightbox Modal for Image Preview Zoom
    initLightboxModal();

    // Initialize Copy Discord Tag Listener
    initDiscordCopy();

    // Initialize Auto-Update osu! Profile Avatar
    initAvatarCacheBuster();

    // ----------------------------------------------------------------------
    // 1. Lightbox Image Zoom System
    // ----------------------------------------------------------------------
    function initLightboxModal() {
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const captionText = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');

        // Select all preview containers and setup preview images
        const zoomElements = document.querySelectorAll('.preview-image-container, .skin-preview-wrapper, .setup-preview-img');

        zoomElements.forEach(element => {
            element.addEventListener('click', (e) => {
                e.stopPropagation();
                const img = element.tagName.toLowerCase() === 'img' ? element : element.querySelector('img');
                if (img && img.src) {
                    modal.style.display = 'flex';
                    modalImg.src = img.src;
                    captionText.textContent = img.alt || '';
                }
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Close on clicking outside the image container
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target === closeBtn) {
                    modal.style.display = 'none';
                }
            });
        }

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. Discord Tag Copy Utility
    // ----------------------------------------------------------------------
    function initDiscordCopy() {
        const copyBtn = document.getElementById('copy-discord');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
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
    // 3. Auto-Update osu! Profile Avatar (Cache Busting)
    // ----------------------------------------------------------------------
    function initAvatarCacheBuster() {
        const avatarImg = document.querySelector('.profile-avatar-img');
        if (avatarImg) {
            const currentSrc = avatarImg.getAttribute('src');
            if (currentSrc && currentSrc.includes('a.ppy.sh')) {
                const baseUrl = currentSrc.split('?')[0];
                // Append timestamp query parameter to bypass browser/CDN caching
                avatarImg.src = `${baseUrl}?t=${Date.now()}`;
            }
        }
    }

    // Helper Utility Toast
    function showToast(msg) {
        const toast = document.getElementById('toast');
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2500);
    }
});
