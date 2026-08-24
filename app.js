// ==========================================================================
// Znap- osu! Setup Configuration - Interactive Application Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lightbox Modal for Image Preview Zoom
    initLightboxModal();

    // ----------------------------------------------------------------------
    // 1. Lightbox Image Zoom System
    // ----------------------------------------------------------------------
    function initLightboxModal() {
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const captionText = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');

        const previewImages = document.querySelectorAll('.setup-preview-img');

        previewImages.forEach(img => {
            img.addEventListener('click', () => {
                modal.style.display = 'flex';
                modalImg.src = img.src;
                captionText.textContent = img.alt;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        // Close on clicking outside the image container
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === closeBtn) {
                modal.style.display = 'none';
            }
        });

        // Close on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
            }
        });
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
