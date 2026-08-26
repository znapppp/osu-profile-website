// ==========================================================================
// Znap- osu! Setup Configuration Data
// Clean English configuration schema matching actual profile setup
// ==========================================================================

const PROFILE_CONFIG = {
    // ── Profile Information ───────────────────────────────────────────────
    user: {
        username: "Znap-",
        tagline: "osu! player & setup showcase",
        avatar: "https://a.ppy.sh/22919575",
        avatarFallback: "avatar.jpg",
        lastUpdate: "23 August 2026",
    },

    // ── Social Links & Contact ─────────────────────────────────────────────
    socials: {
        osu: "https://osu.ppy.sh/users/22919575",
        tiktok: "https://www.tiktok.com/@znapppp_",
        twitter: "https://x.com/znapppp_",
        discord: "Salmoneverydayplss",
    },

    // ── Hardware & Device Configurations ─────────────────────────────────
    hardware: {
        tablet: {
            device: "Wacom CTL-472",
            area: "39 mm x 26 mm",
            driver: "OpenTabletDriver v0.6.7",
            driverDownloadUrl: "https://github.com/OpenTabletDriver/OpenTabletDriver/releases",
            previewImage: "picture/tablet/Screenshot 2026-08-22 221453.png"
        },
        keyboard: {
            device: "Keychron C75 TMR",
            keybind: "Ring / Index (Z, C)",
            actuationPoint: "0.3 mm",
            rapidTrigger: "0.5 mm",
            previewImage: "picture/keyboard/Screenshot 2026-08-23 231651.png"
        },
        keypad: {
            device: "Sayodevice O3C",
            stroke: "3.00 mm",
            actuationPoint: "Release: 0.3 mm | Trigger: 0.7 mm",
            rapidTrigger: "Release: 0.5 mm | Trigger: 0.3 mm",
            previewImage: "picture/keypad/Screenshot 2026-08-22 221530.png"
        },
        monitor: {
            device: "LG ULTRAGEAR 24GS60F-B",
            refreshRate: "180 Hz",
            resolution: "1920 x 1080 (FHD)",
            responseTime: "1 ms (GtG)"
        },
        audio: {
            device: "Apple EarPods",
            connector: "USB-C",
            type: "Earbud Wired"
        }
    },

    // ── Skins Showcase ───────────────────────────────────────────────────
    skins: {
        featuredNote: "I'm way more comfortable playing with the Instafade skin :)",
        items: [
            {
                id: "current",
                tag: "Current Use",
                name: "Aristia(Edit) Instafade Znap- edit.",
                previewImage: "picture/skin/aristia/gameplay.png",
                downloadUrl: "https://drive.google.com/file/d/1-DTP5cWTEy_noE6c7cjR-I49CyluwW4D/view?usp=drive_link"
            },
            {
                id: "high-ar",
                tag: "High AR",
                name: "Milkteaism Hydro DT BETA(Znap- edit)",
                previewImage: "picture/skin/DT/gameplay.png",
                downloadUrl: "https://drive.google.com/file/d/1mhUefUPC8CJZUHipbji5iUXXV1HgmZck/view?usp=drive_link"
            }
        ],
        fullCollectionUrl: "https://drive.google.com/drive/folders/1UlYZANah6EOanaB47LspkXFrU1NtYOxr?usp=sharing"
    }
};
