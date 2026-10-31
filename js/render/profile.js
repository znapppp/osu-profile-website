// @ts-check
import { sanitizeUrl, showToast } from '../utils/dom.js';

/**
 * Profile header, hero social dock, footer links, and Discord clipboard copy.
 * @param {import('../types.js').ProfileConfig | undefined} profile
 */
export function renderProfile(profile) {
    if (!profile) return;

    const headerUsername = document.getElementById('header-username');
    if (headerUsername && profile.username) {
        headerUsername.textContent = profile.username;
    }

    // Screen-reader text only; the visible wordmark is a fixed SVG in index.html
    const heroTitle = document.getElementById('hero-title-text');
    if (heroTitle && profile.username) {
        heroTitle.textContent = profile.username;
    }

    const osuLink = document.getElementById('osu-profile-link');
    if (osuLink && profile.username) {
        osuLink.setAttribute('aria-label', `${profile.username} osu! Profile`);
    }

    const avatarImg = document.getElementById('header-avatar');
    if (avatarImg instanceof HTMLImageElement) {
        if (profile.username) {
            avatarImg.alt = `${profile.username} profile avatar`;
        }
        const primarySrc = sanitizeUrl(profile.avatarUrl) || sanitizeUrl(profile.avatarFallback);
        const fallbackSrc = sanitizeUrl(profile.avatarFallback);
        if (fallbackSrc && primarySrc !== fallbackSrc) {
            avatarImg.addEventListener('error', () => {
                avatarImg.src = fallbackSrc;
            }, { once: true });
        }
        if (primarySrc) {
            avatarImg.src = primarySrc;
        }
    }

    const lastUpdateEl = document.getElementById('footer-last-update');
    if (lastUpdateEl && profile.lastUpdate) {
        lastUpdateEl.textContent = `Last update: ${profile.lastUpdate}`;
    }

    const sc = profile.socials;
    if (!sc) return;

    /**
     * @param {string} id
     * @param {string | undefined} url
     */
    const setHref = (id, url) => {
        const el = document.getElementById(id);
        const safeUrl = sanitizeUrl(url);
        if (el instanceof HTMLAnchorElement && safeUrl) {
            el.href = safeUrl;
        }
    };

    setHref('osu-profile-link', sc.osuProfileUrl);
    setHref('dock-tiktok', sc.tiktokUrl);
    setHref('dock-x', sc.xUrl);
    setHref('footer-tiktok', sc.tiktokUrl);
    setHref('footer-x', sc.xUrl);

    if (sc.discordTag) {
        const discordTag = sc.discordTag;
        const dockDiscord = document.getElementById('dock-discord');
        if (dockDiscord) {
            dockDiscord.addEventListener('click', (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(discordTag).then(() => {
                    showToast(`Copied Discord ID: ${discordTag}`);
                }).catch(() => {
                    showToast('Unable to copy Discord ID');
                });
            });
        }

        const footerDiscord = document.getElementById('footer-discord');
        if (footerDiscord) {
            const originalText = footerDiscord.textContent;
            /** @type {ReturnType<typeof setTimeout> | undefined} */
            let resetTimer;
            footerDiscord.addEventListener('click', (e) => {
                e.preventDefault();
                navigator.clipboard.writeText(discordTag).then(() => {
                    footerDiscord.textContent = 'Copied!';
                    clearTimeout(resetTimer);
                    resetTimer = setTimeout(() => {
                        footerDiscord.textContent = originalText;
                    }, 2000);
                }).catch(() => {
                    showToast('Unable to copy Discord ID');
                });
            });
        }
    }
}
