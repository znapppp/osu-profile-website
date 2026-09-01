/**
 * sparkle.js - Star Particle Animation System
 * Optimized offscreen canvas sprite rendering for background visual effects.
 */
(function () {
    'use strict';

    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // System Configuration
    const CONFIG = {
        count: 22,            // Active particle count (high-performance)
        countNoGpu: 8,        // Active particle count (low-performance / no-gpu)
        minSize: 2,           // Particle radius (px)
        maxSize: 7,           // Particle radius (px)
        minSpeed: 0.1,        // Fall rate (px/frame)
        maxSpeed: 0.28,
        driftRange: 0.18,     // Horizontal drift amplitude
        minOpacity: 0.15,
        maxOpacity: 0.65,
    };

    // System State
    let W = 0, H = 0;
    let stars = [];
    let raf = null;
    let isRunning = false;
    let isScrolling = false;
    let scrollTimeout = null;

    // Sprite Cache (Offscreen canvas caching for fast rendering)
    const spriteCache = {};

    function getOrCreateStarSprite(size) {
        const key = Math.round(size * 10) / 10;
        if (spriteCache[key]) return spriteCache[key];

        const outer = size;
        const glowRadius = Math.ceil(outer * 2.8);
        const pad = glowRadius + 2;
        const dim = pad * 2;

        const offCanvas = document.createElement('canvas');
        offCanvas.width = dim;
        offCanvas.height = dim;
        const sctx = offCanvas.getContext('2d');
        const cx = pad;
        const cy = pad;

        // Radial glow halo
        const glow = sctx.createRadialGradient(cx, cy, 0, cx, cy, glowRadius);
        glow.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        glow.addColorStop(0.5, 'rgba(255, 255, 255, 0.10)');
        glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        sctx.beginPath();
        sctx.arc(cx, cy, glowRadius, 0, Math.PI * 2);
        sctx.fillStyle = glow;
        sctx.fill();

        // 4-point star polygon
        const inner = outer * 0.2;
        const spikes = 4;
        const step = Math.PI / spikes;
        sctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const angle = i * step - Math.PI / 2;
            const r = (i % 2 === 0) ? outer : inner;
            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;
            if (i === 0) sctx.moveTo(px, py);
            else sctx.lineTo(px, py);
        }
        sctx.closePath();
        sctx.fillStyle = '#ffffff';
        sctx.fill();

        // Star center core
        sctx.beginPath();
        sctx.arc(cx, cy, outer * 0.25, 0, Math.PI * 2);
        sctx.fillStyle = '#ffffff';
        sctx.fill();

        const sprite = { canvas: offCanvas, pad };
        spriteCache[key] = sprite;
        return sprite;
    }

    // Canvas Resize Handler
    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    // Utility Generator
    function rand(min, max) { return min + Math.random() * (max - min); }

    // Particle Factory
    function createStar(fromTop) {
        const size = rand(CONFIG.minSize, CONFIG.maxSize);
        return {
            x: rand(0, W),
            y: fromTop ? rand(-80, -10) : rand(0, H),
            size,
            sprite: getOrCreateStarSprite(size),
            speed: rand(CONFIG.minSpeed, CONFIG.maxSpeed),
            drift: rand(-CONFIG.driftRange, CONFIG.driftRange),
            driftFreq: rand(0.005, 0.018),
            driftPhase: rand(0, Math.PI * 2),
            opacity: rand(CONFIG.minOpacity, CONFIG.maxOpacity),
            frame: 0,
        };
    }

    function initStars() {
        const isLowSpec = document.documentElement.classList.contains('no-gpu');
        const targetCount = isLowSpec ? CONFIG.countNoGpu : CONFIG.count;
        stars = [];
        for (let i = 0; i < targetCount; i++) {
            stars.push(createStar(false));
        }
    }

    // Render Particle
    function renderStar(s) {
        const t = s.frame;
        const opacity = s.opacity;

        const driftX = s.drift * Math.sin(t * s.driftFreq + s.driftPhase) * 15;
        const drawX = s.x + driftX;
        const drawY = s.y;

        const sprite = s.sprite;
        ctx.globalAlpha = opacity;
        ctx.drawImage(sprite.canvas, drawX - sprite.pad, drawY - sprite.pad);
    }

    // Update Particle State
    function updateStar(s) {
        s.y += s.speed;
        s.frame++;
        if (s.y > H + s.size + 20) {
            const ns = createStar(true);
            Object.assign(s, ns);
        }
    }

    // Main Animation Loop
    function loop() {
        if (!isScrolling) {
            ctx.clearRect(0, 0, W, H);
            ctx.globalCompositeOperation = 'source-over';
            for (let i = 0; i < stars.length; i++) {
                updateStar(stars[i]);
                renderStar(stars[i]);
            }
        }
        raf = requestAnimationFrame(loop);
    }

    // Scroll Throttle Handler
    window.addEventListener('scroll', () => {
        isScrolling = true;
        if (scrollTimeout) clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            isScrolling = false;
        }, 180);
    }, { passive: true });

    // Page Visibility Handler
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (raf) { cancelAnimationFrame(raf); raf = null; }
        } else {
            if (!raf) raf = requestAnimationFrame(loop);
        }
    });

    // Initialization
    function init() {
        resize();
        window.addEventListener('resize', resize, { passive: true });
        initStars();
        if (!isRunning) {
            isRunning = true;
            raf = requestAnimationFrame(loop);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
