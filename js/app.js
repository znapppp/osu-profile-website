/* ==========================================================================
   Znap- osu! Setup Configuration - Interactive Application Logic (Tailwind)
   ========================================================================== */

// Dynamic Data Rendering from SITE_CONFIG (js/config.js)
function renderFromConfig() {
    if (typeof SITE_CONFIG === 'undefined') return;

    // 1. Profile Header & Footer
    if (SITE_CONFIG.profile) {
        const p = SITE_CONFIG.profile;
        const headerUsername = document.getElementById('header-username');
        if (headerUsername && p.username) {
            headerUsername.textContent = p.username;
        }

        const heroTitle = document.getElementById('hero-title');
        if (heroTitle && p.username) {
            heroTitle.textContent = p.username;
        }

        const avatarImg = document.getElementById('header-avatar');
        if (avatarImg && p.avatarUrl) {
            avatarImg.src = p.avatarUrl;
            if (p.avatarFallback) {
                avatarImg.onerror = () => { avatarImg.src = p.avatarFallback; };
            }
        }
        
        const osuLink = document.getElementById('osu-profile-link');
        if (osuLink && p.socials && p.socials.osuProfileUrl) {
            osuLink.href = p.socials.osuProfileUrl;
        }

        if (p.socials) {
            const tiktokBtn = document.getElementById('footer-tiktok');
            if (tiktokBtn && p.socials.tiktokUrl) {
                tiktokBtn.href = p.socials.tiktokUrl;
            }

            const xBtn = document.getElementById('footer-x');
            if (xBtn && p.socials.xUrl) {
                xBtn.href = p.socials.xUrl;
            }
        }
        
        const footerText = document.getElementById('footer-text');
        if (footerText && p.username) {
            footerText.textContent = `© ${new Date().getFullYear()} ${p.username} Setup. All rights reserved.`;
        }
        
        const lastUpdateEl = document.getElementById('footer-last-update');
        if (lastUpdateEl && p.lastUpdate) {
            lastUpdateEl.textContent = `Last Update: ${p.lastUpdate}`;
        }
    }

    // 2. Tablet Settings
    if (SITE_CONFIG.tablet) {
        const t = SITE_CONFIG.tablet;
        const el = (id) => document.getElementById(id);
        if (el('tablet-device') && t.device) el('tablet-device').textContent = t.device;
        if (el('tablet-area') && t.area) el('tablet-area').textContent = t.area;
        if (el('tablet-driver') && t.driverName) el('tablet-driver').textContent = t.driverName;
        if (el('tablet-img') && t.previewImage) el('tablet-img').style.backgroundImage = `url('${t.previewImage}')`;
    }

    // 3. Keyboard Settings
    if (SITE_CONFIG.keyboard) {
        const k = SITE_CONFIG.keyboard;
        const el = (id) => document.getElementById(id);
        if (el('keyboard-device') && k.device) el('keyboard-device').textContent = k.device;
        if (el('keyboard-actuation') && k.actuationPoint) el('keyboard-actuation').textContent = k.actuationPoint;
        if (el('keyboard-rapid') && k.rapidTrigger) el('keyboard-rapid').textContent = k.rapidTrigger;
        if (el('keyboard-img') && k.previewImage) el('keyboard-img').style.backgroundImage = `url('${k.previewImage}')`;
    }

    // 4. Keypad Settings
    if (SITE_CONFIG.keypad) {
        const kp = SITE_CONFIG.keypad;
        const el = (id) => document.getElementById(id);
        if (el('keypad-device') && kp.device) el('keypad-device').textContent = kp.device;
        if (el('keypad-stroke') && kp.stroke) el('keypad-stroke').textContent = kp.stroke;
        if (el('keypad-actuation') && kp.actuationPoint) {
            el('keypad-actuation').textContent = kp.actuationPoint;
            el('keypad-actuation').title = kp.actuationPoint;
        }
        if (el('keypad-rapid') && kp.rapidTrigger) {
            el('keypad-rapid').textContent = kp.rapidTrigger;
            el('keypad-rapid').title = kp.rapidTrigger;
        }
        if (el('keypad-img') && kp.previewImage) el('keypad-img').style.backgroundImage = `url('${kp.previewImage}')`;
    }

    // 5. Monitor Settings
    if (SITE_CONFIG.monitor) {
        const m = SITE_CONFIG.monitor;
        const el = (id) => document.getElementById(id);
        if (el('monitor-device') && m.device) el('monitor-device').textContent = m.device;
        if (el('monitor-refresh') && m.refreshRate) el('monitor-refresh').textContent = m.refreshRate;
        if (el('monitor-response') && m.responseTime) el('monitor-response').textContent = m.responseTime;
        if (el('monitor-resolution') && m.resolution) el('monitor-resolution').textContent = m.resolution;
    }

    // 6. Audio Settings
    if (SITE_CONFIG.audio) {
        const a = SITE_CONFIG.audio;
        const el = (id) => document.getElementById(id);
        if (el('audio-device') && a.device) el('audio-device').textContent = a.device;
        if (el('audio-conn') && a.connector) el('audio-conn').textContent = a.connector;
        if (el('audio-type') && a.type) el('audio-type').textContent = a.type;
    }

    // 7. Skins Grid
    if (SITE_CONFIG.skins) {
        const s = SITE_CONFIG.skins;
        
        const driveLink = document.getElementById('skins-drive-link');
        if (driveLink && s.driveFolderUrl) {
            driveLink.href = s.driveFolderUrl;
        } else if (driveLink) {
            driveLink.style.display = 'none';
        }

        const grid = document.getElementById('skins-grid');
        
        if (grid && Array.isArray(s.items) && s.items.length > 0) {
            grid.innerHTML = s.items.map((item, i) => {
                // Determine description based on badgeText or generic text
                let desc = `My ${item.badgeText || 'favorite'} skin.`;
                
                // Get the first slide as the main background image
                const mainImgSrc = item.slides && item.slides.length > 0 ? item.slides[0].src : '';
                
                return `
                <div class="flex flex-col group opacity-0 transition-all duration-700 translate-y-8 scroll-reveal" style="transition-delay: ${i * 100}ms;">
                    <div class="relative w-full aspect-video rounded-xl overflow-hidden mb-6 bg-surface-container shadow-md border border-glass-stroke/50 group/slider">
                        
                        <!-- Image Slider Container -->
                        <div class="relative w-full h-full flex transition-transform duration-500 ease-in-out" id="slider-${i}" data-current="0">
                            ${(item.slides || []).map(slide => `
                                <div class="min-w-full h-full bg-cover bg-center" style="background-image: url('${slide.src}')"></div>
                            `).join('')}
                        </div>
                        
                        <!-- Next/Prev Buttons (visible on hover) -->
                        ${(item.slides && item.slides.length > 1) ? `
                            <button onclick="event.stopPropagation(); window.slideSkin(${i}, -1)" class="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-obsidian-deep/50 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity z-10 hover:bg-obsidian-deep">
                                <span class="material-symbols-outlined text-[20px]">chevron_left</span>
                            </button>
                            <button onclick="event.stopPropagation(); window.slideSkin(${i}, 1)" class="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-obsidian-deep/50 text-white flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition-opacity z-10 hover:bg-obsidian-deep">
                                <span class="material-symbols-outlined text-[20px]">chevron_right</span>
                            </button>
                        ` : ''}

                        <div class="absolute inset-0 bg-gradient-to-t from-obsidian-deep/90 via-obsidian-deep/20 to-transparent opacity-60 group-hover/slider:opacity-40 transition-opacity duration-300 pointer-events-none"></div>
                        
                        <div class="absolute bottom-4 left-4 right-4 flex justify-between items-end pointer-events-none z-10">
                            <div class="bg-primary/85 backdrop-blur-sm px-2.5 py-1 rounded text-[11px] font-medium text-obsidian-deep/90 shadow-sm">${item.badgeText || 'Skin'}</div>
                            <button onclick="event.stopPropagation(); window.open('${item.downloadUrl}', '_blank')" class="pointer-events-auto w-8 h-8 rounded-full bg-primary flex items-center justify-center translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg hover:bg-secondary cursor-pointer" title="Download ${item.name}">
                                <span class="material-symbols-outlined text-obsidian-deep text-[18px]">download</span>
                            </button>
                        </div>

                        <!-- Dots -->
                        ${(item.slides && item.slides.length > 1) ? `
                            <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                ${item.slides.map((_, dotIndex) => `
                                    <div id="dot-${i}-${dotIndex}" class="w-1.5 h-1.5 rounded-full ${dotIndex === 0 ? 'bg-primary scale-125' : 'bg-white/50'} transition-all duration-300"></div>
                                `).join('')}
                            </div>
                        ` : ''}

                    </div>
                    <h3 class="font-body-lg text-lg md:text-xl text-primary mb-2 truncate" title="${item.name}">${item.name}</h3>
                    <p class="font-body-md text-on-surface-variant text-sm mb-4 line-clamp-2">${desc}</p>
                </div>`;
            }).join('');
        }
    }
}

// Toast Helper
function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.opacity = '1';
    toast.classList.add('visible');
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.classList.remove('visible');
    }, 2500);
}

// Social Links & Clipboard Copy Utility
function initSocials() {
    if (typeof SITE_CONFIG === 'undefined' || !SITE_CONFIG.profile || !SITE_CONFIG.profile.socials) return;
    const sc = SITE_CONFIG.profile.socials;
    const el = (id) => document.getElementById(id);

    // Footer Discord Copy
    const footerDiscord = el('footer-discord');
    if (footerDiscord && sc.discordTag) {
        footerDiscord.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(sc.discordTag).then(() => {
                const originalText = e.target.textContent;
                e.target.textContent = 'Copied!';
                setTimeout(() => e.target.textContent = originalText, 2000);
            });
        });
    }
    
    // Dock Social Links
    if (el('dock-tiktok') && sc.tiktokUrl) el('dock-tiktok').href = sc.tiktokUrl;
    if (el('dock-x') && sc.xUrl) el('dock-x').href = sc.xUrl;
    
    const dockDiscord = el('dock-discord');
    if (dockDiscord && sc.discordTag) {
        dockDiscord.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(sc.discordTag).then(() => {
                showToast(`Copied Discord ID: ${sc.discordTag}`);
            });
        });
    }
}

// Scroll Reveal Intersection Observer
function initScrollReveal() {
    const targets = document.querySelectorAll('.scroll-reveal');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the class defined in our style block in index.html
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    targets.forEach(el => observer.observe(el));
}

// Inline Skin Slider Logic
window.slideSkin = function(skinIndex, direction) {
    if (!SITE_CONFIG.skins || !SITE_CONFIG.skins.items) return;
    const skin = SITE_CONFIG.skins.items[skinIndex];
    if (!skin || !skin.slides) return;
    
    const total = skin.slides.length;
    const slider = document.getElementById(`slider-${skinIndex}`);
    if (!slider) return;
    
    let current = parseInt(slider.getAttribute('data-current') || 0);
    current = (current + direction + total) % total;
    slider.setAttribute('data-current', current);
    
    // Move the slider container
    slider.style.transform = `translateX(-${current * 100}%)`;
    
    // Update dots
    for(let j = 0; j < total; j++) {
        const dot = document.getElementById(`dot-${skinIndex}-${j}`);
        if(dot) {
            if(j === current) {
                dot.className = "w-1.5 h-1.5 rounded-full bg-primary scale-125 transition-all duration-300";
            } else {
                dot.className = "w-1.5 h-1.5 rounded-full bg-white/50 transition-all duration-300";
            }
        }
    }
};

// Navigation highlighting
function initNavScroll() {
    const navLinks = document.querySelectorAll('header nav a[data-path]');
    const sections = Array.from(navLinks).map(a => document.getElementById(a.getAttribute('data-path'))).filter(Boolean);
    
    // Add overview section which is the top of the page
    sections.unshift(document.body);
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;
        
        // Find the current section
        if (scrollY < 300) {
            current = 'overview';
        } else {
            sections.forEach(section => {
                if (section && section.id) {
                    const sectionTop = section.offsetTop;
                    if (scrollY >= sectionTop - 200) {
                        current = section.id;
                    }
                }
            });
        }
        
        navLinks.forEach(link => {
            link.classList.remove('text-primary');
            link.classList.add('text-on-surface-variant');
            if (link.getAttribute('data-path') === current) {
                link.classList.add('text-primary');
                link.classList.remove('text-on-surface-variant');
            }
        });
    }, { passive: true });
}

// Application Initialization Entry Point
function initApp() {
    renderFromConfig();
    initSocials();
    initScrollReveal();
    initNavScroll();
}

// Dom Ready Execution
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
