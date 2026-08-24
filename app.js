// ==========================================================================
// Znap- osu! Setup Configuration - Interactive Application Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    let isCursorEffectActive = true;

    // Initialize Interactive Modules
    initLightboxModal();
    initCanvasParticles();

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

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

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

    // ----------------------------------------------------------------------
    // 2. Interactive osu! Cursor Particle Canvas Effect
    // ----------------------------------------------------------------------
    function initCanvasParticles() {
        const canvas = document.getElementById('bg-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle Class
        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 6 + 3;
                this.speedX = (Math.random() - 0.5) * 1.5;
                this.speedY = (Math.random() - 0.5) * 1.5;
                this.color = Math.random() > 0.4 ? '#FFC0CB' : '#ffffff';
                this.alpha = 0.9;
                this.decay = Math.random() * 0.02 + 0.015;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.alpha -= this.decay;
                if (this.size > 0.2) this.size -= 0.08;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.alpha);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 8;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        window.addEventListener('mousemove', (e) => {
            if (!isCursorEffectActive) return;
            if (Math.random() > 0.35) {
                particles.push(new Particle(e.clientX, e.clientY));
            }
        });

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].update();
                particles[i].draw();
                if (particles[i].alpha <= 0) {
                    particles.splice(i, 1);
                }
            }
            requestAnimationFrame(animate);
        }
        animate();

        // Toggle Cursor Trail Button
        const toggleCursorBtn = document.getElementById('toggle-cursor');
        if (toggleCursorBtn) {
            toggleCursorBtn.addEventListener('click', () => {
                isCursorEffectActive = !isCursorEffectActive;
                toggleCursorBtn.classList.toggle('active', isCursorEffectActive);
                showToast(isCursorEffectActive ? 'osu! Cursor Trail: Enabled' : 'osu! Cursor Trail: Disabled');
            });
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
