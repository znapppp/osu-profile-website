/**
 * sparkle.js — Simple Pure White 4-Point Star Particle System
 * Clean floating & falling star sparkles for Znap- osu! Setup Page
 */
(function () {
    'use strict';

    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Configuration ──────────────────────────────────────────────────────
    const CONFIG = {
        count: 32,            // Number of active stars
        minSize: 2,           // px radius
        maxSize: 7,           // px radius
        minSpeed: 0.2,       // fall speed px/frame
        maxSpeed: 0.5,
        driftRange: 0.25,     // horizontal drift amplitude
        minOpacity: 0.15,
        maxOpacity: 0.65,
        rotationSpeedMin: 0.002,
        rotationSpeedMax: 0.012,
    };

    // ── State ───────────────────────────────────────────────────────────────
    let W = 0, H = 0;
    let stars = [];
    let raf = null;
    let isRunning = false;

    // ── Resize handler ──────────────────────────────────────────────────────
    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    // ── Utility ─────────────────────────────────────────────────────────────
    function rand(min, max) { return min + Math.random() * (max - min); }

    // ── Star factory ────────────────────────────────────────────────────────
    function createStar(fromTop) {
        const size = rand(CONFIG.minSize, CONFIG.maxSize);
        return {
            x: rand(0, W),
            y: fromTop ? rand(-80, -10) : rand(0, H),
            size,
            speed: rand(CONFIG.minSpeed, CONFIG.maxSpeed),
            drift: rand(-CONFIG.driftRange, CONFIG.driftRange),
            driftFreq: rand(0.005, 0.018),
            driftPhase: rand(0, Math.PI * 2),
            opacity: rand(CONFIG.minOpacity, CONFIG.maxOpacity), // Constant steady opacity (no twinkle)
            rotation: rand(0, Math.PI / 4),
            rotSpeed: rand(CONFIG.rotationSpeedMin, CONFIG.rotationSpeedMax) * (Math.random() > 0.5 ? 1 : -1),
            frame: 0,
        };
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < CONFIG.count; i++) {
            stars.push(createStar(false));
        }
    }

    // ── Draw a 4-point star (✦) ─────────────────────────────────────────────
    function drawStar4(cx, cy, outer, inner, rotation) {
        const spikes = 4;
        const step = Math.PI / spikes;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
            const angle = rotation + i * step - Math.PI / 2;
            const r = (i % 2 === 0) ? outer : inner;
            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
    }

    // ── Render a single star ────────────────────────────────────────────────
    function renderStar(s) {
        const t = s.frame;
        const opacity = s.opacity; // Steady, no twinkling sine wave

        // Gentle horizontal drift
        const driftX = s.drift * Math.sin(t * s.driftFreq + s.driftPhase) * 15;
        const drawX = s.x + driftX;
        const drawY = s.y;

        const outer = s.size;
        const inner = outer * 0.2;

        ctx.save();

        // ── Outer soft white glow halo ──
        const glowRadius = outer * 2.8;
        const glow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, glowRadius);
        glow.addColorStop(0,   `rgba(255, 255, 255, ${opacity * 0.35})`);
        glow.addColorStop(0.5, `rgba(255, 255, 255, ${opacity * 0.1})`);
        glow.addColorStop(1,   `rgba(255, 255, 255, 0)`);
        ctx.beginPath();
        ctx.arc(drawX, drawY, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // ── Star body (pure white) ──
        ctx.globalAlpha = opacity;
        drawStar4(drawX, drawY, outer, inner, s.rotation);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // ── Core dot ──
        ctx.globalAlpha = Math.min(1, opacity * 1.2);
        ctx.beginPath();
        ctx.arc(drawX, drawY, outer * 0.25, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.restore();
    }

    // ── Update a single star ─────────────────────────────────────────────────
    function updateStar(s) {
        s.y += s.speed;
        s.rotation += s.rotSpeed;
        s.frame++;
        if (s.y > H + s.size + 20) {
            const ns = createStar(true);
            Object.assign(s, ns);
        }
    }

    // ── Main loop ────────────────────────────────────────────────────────────
    function loop() {
        ctx.clearRect(0, 0, W, H);
        for (let i = 0; i < stars.length; i++) {
            updateStar(stars[i]);
            renderStar(stars[i]);
        }
        raf = requestAnimationFrame(loop);
    }

    // ── Page visibility: pause when tab hidden ──────────────────────────────
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (raf) { cancelAnimationFrame(raf); raf = null; }
        } else {
            if (!raf) raf = requestAnimationFrame(loop);
        }
    });

    // ── Init ──────────────────────────────────────────────────────────────────
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
