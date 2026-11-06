// @ts-check
import { SITE_CONFIG } from './config.js';
import { renderProfile } from './render/profile.js';
import { renderGear } from './render/gear.js';
import { renderSkins } from './render/skins.js';
import { renderOverlays } from './render/overlays.js';
import { initFeaturedSkin, initSkinSliders } from './ui/slider.js';
import { initScrollReveal, initNavScroll, initMobileMenu } from './ui/navigation.js';
import { initLightbox } from './ui/lightbox.js';
import { initScrollEffects } from './ui/motion.js';

function initApp() {
    /** @type {Array<() => void>} */
    const steps = [
        () => renderProfile(SITE_CONFIG.profile),
        () => renderGear(SITE_CONFIG),
        () => renderSkins(SITE_CONFIG.skins),
        () => renderOverlays(SITE_CONFIG.overlays),
        initFeaturedSkin,
        initSkinSliders,
        initScrollReveal,
        initNavScroll,
        initMobileMenu,
        initLightbox,
        initScrollEffects,
    ];

    steps.forEach((step) => {
        try {
            step();
        } catch (error) {
            console.error(error);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
