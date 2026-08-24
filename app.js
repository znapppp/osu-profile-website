// ==========================================================================
// osu! Profile Website - Dynamic Application Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    let currentMode = 'std';
    let currentAudioUrl = null;
    let isCursorEffectActive = true;
    const audioElement = document.getElementById('audio-preview');

    // Initialize Page Content
    initProfile();
    initModeTabs();
    initAudioSystem();
    initCanvasParticles();
    initSocials();
    initSkinAndSetup();
    initBadges();

    // ----------------------------------------------------------------------
    // 1. Render User Header & Personal Info
    // ----------------------------------------------------------------------
    function initProfile() {
        const u = PROFILE_CONFIG.user;
        document.getElementById('user-username').textContent = u.username;
        document.getElementById('user-tagline').textContent = u.tagline;
        document.getElementById('user-avatar').src = u.avatar;
        document.getElementById('user-joined').textContent = u.joinedDate;
        document.getElementById('user-playtime').textContent = u.playTime;
        document.getElementById('user-country').textContent = u.countryCode;

        if (u.banner) {
            document.getElementById('hero-banner').style.backgroundImage = `url('${u.banner}')`;
        }

        // Supporter status
        const supporterBadge = document.getElementById('supporter-badge');
        if (u.supporterLevel > 0) {
            supporterBadge.style.display = 'flex';
            supporterBadge.title = `osu! Supporter Level ${u.supporterLevel}`;
        } else {
            supporterBadge.style.display = 'none';
        }

        // Status Indicator
        const statusInd = document.getElementById('status-indicator');
        const statusText = document.getElementById('user-status');
        const statusDot = document.getElementById('status-dot');

        if (u.isOnline) {
            statusInd.className = 'status-indicator online';
            statusText.textContent = u.statusText || 'Online';
            statusDot.style.color = '#10b981';
        } else {
            statusInd.className = 'status-indicator offline';
            statusText.textContent = 'Offline';
            statusDot.style.color = '#64748b';
        }

        // Load Default Mode Stats (std)
        loadModeStats(currentMode);
    }

    // ----------------------------------------------------------------------
    // 2. Mode Switcher System (std, taiko, catch, mania)
    // ----------------------------------------------------------------------
    function initModeTabs() {
        const tabs = document.querySelectorAll('.mode-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const mode = tab.dataset.mode;
                if (mode === currentMode) return;

                // Update active tab UI
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                currentMode = mode;
                loadModeStats(currentMode);
            });
        });
    }

    function loadModeStats(modeKey) {
        const mode = PROFILE_CONFIG.modes[modeKey];
        if (!mode) return;

        document.getElementById('active-mode-label').textContent = mode.name;

        // Animate Stat Numbers
        animateNumber('stat-pp', mode.pp);
        document.getElementById('stat-global-rank').textContent = mode.globalRank;
        document.getElementById('stat-country-rank').textContent = mode.countryRank;
        document.getElementById('stat-accuracy').textContent = mode.accuracy;
        document.getElementById('stat-level').textContent = mode.level;
        document.getElementById('stat-level-progress-text').textContent = `${mode.levelProgress}%`;
        document.getElementById('stat-level-bar').style.width = `${mode.levelProgress}%`;

        document.getElementById('stat-playcount').textContent = mode.playCount;
        document.getElementById('stat-ranked-score').textContent = mode.rankedScore;
        document.getElementById('stat-replays').textContent = mode.replaysWatched;

        // Accuracy Circle Progress (Circumference ~264)
        const accNum = parseFloat(mode.accuracy);
        const circle = document.getElementById('acc-circle');
        if (circle) {
            const offset = 264 - (264 * accNum) / 100;
            circle.style.strokeDashoffset = offset;
        }

        // Grades
        if (mode.grades) {
            document.getElementById('grade-ssh').textContent = mode.grades.ssh || 0;
            document.getElementById('grade-ss').textContent = mode.grades.ss || 0;
            document.getElementById('grade-sh').textContent = mode.grades.sh || 0;
            document.getElementById('grade-s').textContent = mode.grades.s || 0;
            document.getElementById('grade-a').textContent = mode.grades.a || 0;
        }

        // Render Top Plays
        renderTopPlays();
    }

    // ----------------------------------------------------------------------
    // 3. Top Plays & Audio Preview Player
    // ----------------------------------------------------------------------
    function renderTopPlays() {
        const container = document.getElementById('top-plays-list');
        container.innerHTML = '';

        const plays = PROFILE_CONFIG.topPlays || [];
        plays.forEach((play, index) => {
            const card = document.createElement('div');
            card.className = 'play-card';
            card.dataset.audio = play.audioPreview;

            // Star color rating calculation
            const starClass = getStarColor(play.stars);

            card.innerHTML = `
                <span class="play-rank-index">#${index + 1}</span>
                <div class="play-grade-badge ${play.grade.toLowerCase()}">${play.grade}</div>
                <div class="play-info">
                    <div class="play-title">${play.title}</div>
                    <div class="play-meta">
                        <span>${play.artist}</span> • 
                        <span class="star-rating" style="background: ${starClass};">★ ${play.stars.toFixed(2)}</span> • 
                        <span>${play.combo}</span>
                    </div>
                </div>
                <div class="play-stats-right">
                    <div class="play-pp">${play.pp} <span style="font-size: 0.8rem;">pp</span></div>
                    <div class="play-acc">${play.accuracy}</div>
                    <div class="mods-container">
                        ${play.mods.map(mod => `<span class="mod-badge">${mod}</span>`).join('')}
                    </div>
                </div>
                <button class="play-audio-btn" title="Play Preview">
                    <i class="fas fa-play"></i>
                </button>
            `;

            card.addEventListener('click', (e) => {
                // If clicked on beatmap link, don't trigger audio preview
                if (e.target.closest('a')) return;
                toggleAudioPreview(play.audioPreview, card);
            });

            container.appendChild(card);
        });
    }

    function getStarColor(stars) {
        if (stars < 4.0) return '#4fc3f7'; // Easy / Normal
        if (stars < 5.3) return '#81c784'; // Hard
        if (stars < 6.5) return '#ffb74d'; // Insane
        if (stars < 7.5) return '#e57373'; // Expert
        return '#b388ff'; // Extra / Master (7.5*+)
    }

    function initAudioSystem() {
        const toggleBtn = document.getElementById('toggle-audio');
        
        audioElement.addEventListener('ended', () => {
            stopAudio();
        });

        toggleBtn.addEventListener('click', () => {
            if (!audioElement.paused) {
                stopAudio();
                showToast('Audio paused');
            } else if (currentAudioUrl) {
                audioElement.play();
                toggleBtn.classList.add('active');
            }
        });
    }

    function toggleAudioPreview(url, cardElement) {
        const allCards = document.querySelectorAll('.play-card');
        const audioBtn = cardElement.querySelector('.play-audio-btn i');

        if (currentAudioUrl === url && !audioElement.paused) {
            stopAudio();
        } else {
            // Stop previous
            stopAudio();

            currentAudioUrl = url;
            audioElement.src = url;
            audioElement.volume = 0.5;
            audioElement.play().then(() => {
                cardElement.classList.add('playing');
                if (audioBtn) audioBtn.className = 'fas fa-pause';
                document.getElementById('toggle-audio').classList.add('active');
            }).catch(err => {
                console.warn('Audio play failed:', err);
                showToast('Unable to load audio preview');
            });
        }
    }

    function stopAudio() {
        audioElement.pause();
        const allCards = document.querySelectorAll('.play-card');
        allCards.forEach(c => {
            c.classList.remove('playing');
            const btnIcon = c.querySelector('.play-audio-btn i');
            if (btnIcon) btnIcon.className = 'fas fa-play';
        });
        document.getElementById('toggle-audio').classList.remove('active');
    }

    // ----------------------------------------------------------------------
    // 4. Social Links & Peripherals & Badges
    // ----------------------------------------------------------------------
    function initSocials() {
        const container = document.getElementById('socials-container');
        container.innerHTML = '';

        (PROFILE_CONFIG.socials || []).forEach(soc => {
            const pill = document.createElement('a');
            pill.className = 'social-pill';
            if (soc.url) {
                pill.href = soc.url;
                pill.target = '_blank';
            }

            pill.innerHTML = `<i class="${soc.icon}" style="color: ${soc.color};"></i> ${soc.name}`;

            if (soc.copyable && soc.tag) {
                pill.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigator.clipboard.writeText(soc.tag);
                    showToast(`Copied ${soc.name} (${soc.tag}) to clipboard!`);
                });
            }

            container.appendChild(pill);
        });
    }

    function initSkinAndSetup() {
        // Setup / Hardware
        const s = PROFILE_CONFIG.setup;
        document.getElementById('setup-playstyle').textContent = s.playstyle;
        document.getElementById('setup-area').textContent = s.area;

        const periGrid = document.getElementById('peripherals-grid');
        periGrid.innerHTML = '';
        (s.peripherals || []).forEach(p => {
            const item = document.createElement('div');
            item.className = 'peripheral-item';
            item.innerHTML = `
                <i class="${p.icon} peripheral-icon"></i>
                <div class="peripheral-details">
                    <span class="peripheral-type">${p.type}</span>
                    <span class="peripheral-name">${p.name}</span>
                </div>
            `;
            periGrid.appendChild(item);
        });

        // Skin Showcase
        const sk = PROFILE_CONFIG.skin;
        document.getElementById('skin-name').textContent = sk.name;
        document.getElementById('skin-author').textContent = sk.author;
        document.getElementById('skin-size').textContent = sk.size;
        document.getElementById('skin-version').textContent = sk.version;

        const featuresList = document.getElementById('skin-features');
        featuresList.innerHTML = (sk.features || []).map(f => `<li>${f}</li>`).join('');

        const downloadBtn = document.getElementById('skin-download-btn');
        if (sk.downloadUrl && sk.downloadUrl !== '#') {
            downloadBtn.href = sk.downloadUrl;
        } else {
            downloadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showToast('Add your skin download link in config.js!');
            });
        }

        if (sk.previewImages && sk.previewImages.length > 0) {
            document.getElementById('skin-preview-img').src = sk.previewImages[0];
        }
    }

    function initBadges() {
        const grid = document.getElementById('badges-grid');
        grid.innerHTML = '';

        (PROFILE_CONFIG.badges || []).forEach(b => {
            const item = document.createElement('div');
            item.className = 'badge-item';
            item.innerHTML = `
                <div class="badge-icon-box" style="background: rgba(${hexToRgb(b.color)}, 0.15); color: ${b.color};">
                    <i class="${b.icon}"></i>
                </div>
                <div class="badge-details">
                    <h4>${b.title}</h4>
                    <p>${b.description}</p>
                </div>
            `;
            grid.appendChild(item);
        });
    }

    // ----------------------------------------------------------------------
    // 5. Interactive osu! Cursor Particle Canvas Effect
    // ----------------------------------------------------------------------
    function initCanvasParticles() {
        const canvas = document.getElementById('bg-canvas');
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
                this.size = Math.random() * 8 + 4;
                this.speedX = (Math.random() - 0.5) * 2;
                this.speedY = (Math.random() - 0.5) * 2;
                this.color = Math.random() > 0.5 ? '#ff66aa' : '#00f2fe';
                this.alpha = 1;
                this.decay = Math.random() * 0.03 + 0.015;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.alpha -= this.decay;
                if (this.size > 0.2) this.size -= 0.1;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.alpha);
                ctx.fillStyle = this.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        window.addEventListener('mousemove', (e) => {
            if (!isCursorEffectActive) return;
            // Spawn particles on cursor move
            if (Math.random() > 0.3) {
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

        // Toggle Cursor Effect Button
        const toggleCursorBtn = document.getElementById('toggle-cursor');
        toggleCursorBtn.addEventListener('click', () => {
            isCursorEffectActive = !isCursorEffectActive;
            toggleCursorBtn.classList.toggle('active', isCursorEffectActive);
            showToast(isCursorEffectActive ? 'osu! Cursor Trail: Enabled' : 'osu! Cursor Trail: Disabled');
        });
    }

    // Helper Utilities
    function animateNumber(elementId, targetStr) {
        const el = document.getElementById(elementId);
        if (!el) return;
        el.textContent = targetStr; // Direct set formatted string
    }

    function showToast(msg) {
        const toast = document.getElementById('toast');
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    function hexToRgb(hex) {
        let c = hex.replace('#', '');
        if (c.length === 3) c = c.split('').map(x => x + x).join('');
        const num = parseInt(c, 16);
        return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    }
});
