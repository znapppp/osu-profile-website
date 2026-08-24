/**
 * sparkle.js — Luxury 4-Point Star Wink Particle System
 * Premium floating & falling star sparkles for Znap- osu! Setup Page
 */
(function () {
    'use strict';

    const canvas = document.getElementById('sparkle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // ── Configuration ──────────────────────────────────────────────────────
    const CONFIG = {
        count: 38,           // Number of active stars
        minSize: 2.5,        // px
        maxSize: 9,          // px
        minSpeed: 0.18,      // fall speed px/frame
        maxSpeed: 0.58,
        driftRange: 0.35,    // horizontal drift amplitude
        minOpacity: 0.08,
        maxOpacity: 0.82,
        twinklePeriodMin: 80,  // frames per full twinkle cycle
        twinklePeriodMax: 200,
        rotationSpeedMin: 0.003,
        rotationSpeedMax: 0.018,
        // Gold-white palette — luxury feel
        palette: [
            { r: 255, g: 255, b: 255 },  // pure white
            { r: 255, g: 252, b: 220 },  // warm white
            { r: 255, g: 240, b: 160 },  // light gold
            { r: 255, g: 220, b: 100 },  // soft gold
            { r: 220, g: 255, b: 255 },  // ice white
        ],
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
    function randInt(min, max) { return Math.floor(rand(min, max + 1)); }
    function pick(arr) { return arr[randInt(0, arr.length - 1)]; }

    // ── Star factory ────────────────────────────────────────────────────────
    function createStar(fromTop) {
        const col = pick(CONFIG.palette);
        const size = rand(CONFIG.minSize, CONFIG.maxSize);
        const twinklePeriod = rand(CONFIG.twinklePeriodMin, CONFIG.twinklePeriodMax);
        // Each star starts at a random phase in its twinkle cycle
        const twinklePhase = rand(0, Math.PI * 2);
        return {
            x: rand(0, W),
            y: fromTop ? rand(-120, -10) : rand(0, H),
            size,
            speed: rand(CONFIG.minSpeed, CONFIG.maxSpeed) * (0.6 + size / CONFIG.maxSize * 0.4),
            drift: rand(-CONFIG.driftRange, CONFIG.driftRange),
            driftFreq: rand(0.008, 0.025),
            driftPhase: rand(0, Math.PI * 2),
            baseOpacity: rand(CONFIG.minOpacity, CONFIG.maxOpacity),
            twinklePeriod,
            twinklePhase,
            rotation: rand(0, Math.PI / 4), // 4-point star: 0–45° range
            rotSpeed: rand(CONFIG.rotationSpeedMin, CONFIG.rotationSpeedMax) * (Math.random() > 0.5 ? 1 : -1),
            r: col.r, g: col.g, b: col.b,
            frame: 0,
        };
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < CONFIG.count; i++) {
            stars.push(createStar(false)); // scattered across page initially
        }
    }

    // ── Draw a 4-point star (✦) ─────────────────────────────────────────────
    // outer: outer radius, inner: inner "neck" radius, spikes: 4
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

        // Twinkling: sine wave opacity
        const twinkle = 0.5 + 0.5 * Math.sin(2 * Math.PI * (t / s.twinklePeriod) + s.twinklePhase);
        const opacity = s.baseOpacity * (0.25 + 0.75 * twinkle);

        // Horizontal drift (gentle sine oscillation)
        const driftX = s.drift * Math.sin(t * s.driftFreq + s.driftPhase) * 20;
        const drawX = s.x + driftX;
        const drawY = s.y;

        // Sizes
        const outer = s.size;
        const inner = outer * 0.18; // very thin spikes — elegant ✦ look

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));

        // ── Outer glow (soft halo) ──
        const glowRadius = outer * 3.2;
        const glow = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, glowRadius);
        const glowA = opacity * 0.38;
        glow.addColorStop(0,   `rgba(${s.r},${s.g},${s.b},${glowA})`);
        glow.addColorStop(0.4, `rgba(${s.r},${s.g},${s.b},${glowA * 0.3})`);
        glow.addColorStop(1,   `rgba(${s.r},${s.g},${s.b},0)`);
        ctx.beginPath();
        ctx.arc(drawX, drawY, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // ── Star body ──
        ctx.globalAlpha = Math.max(0, Math.min(1, opacity));
        drawStar4(drawX, drawY, outer, inner, s.rotation);
        // Fill with gradient: center bright → tip slightly dimmer
        const starGrad = ctx.createRadialGradient(drawX, drawY, 0, drawX, drawY, outer);
        starGrad.addColorStop(0,   `rgba(255,255,255,1)`);
        starGrad.addColorStop(0.3, `rgba(${s.r},${s.g},${s.b},0.95)`);
        starGrad.addColorStop(1,   `rgba(${s.r},${s.g},${s.b},0.6)`);
        ctx.fillStyle = starGrad;
        ctx.fill();

        // ── Bright core dot ──
        const coreRadius = outer * 0.22;
        ctx.globalAlpha = Math.min(1, opacity * 1.3);
        ctx.beginPath();
        ctx.arc(drawX, drawY, coreRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,1)`;
        ctx.fill();

        ctx.restore();
    }

    // ── Update a single star ─────────────────────────────────────────────────
    function updateStar(s) {
        s.y += s.speed;
        s.rotation += s.rotSpeed;
        s.frame++;
        // If fallen below viewport, recycle from top
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

    // ── Page visibility: pause when tab hidden, resume on visible ─────────────
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
