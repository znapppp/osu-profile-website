/* ==========================================================================
   Znap- osu! Setup Website - Application Configuration
   ========================================================================== */

const SITE_CONFIG = {
    // Profile & Social Reference
    profile: {
        username: "Znap-",
        titleHighlight: "Setup Configuration",
        lastUpdate: "23 August 2026",
        avatarUrl: "https://a.ppy.sh/22919575",
        avatarFallback: "avatar.jpg",
        socials: {
            osuProfileUrl: "https://osu.ppy.sh/users/22919575",
            tiktokUrl: "https://www.tiktok.com/@znapppp_",
            tiktokTitle: "TikTok (@znapppp_)",
            xUrl: "https://x.com/znapppp_",
            xTitle: "X / Twitter (@znapppp_)",
            discordTag: "Salmoneverydayplss"
        }
    },

    // Tablet Configuration
    tablet: {
        title: "Tablet Settings",
        device: "Wacom CTL-472",
        area: "39 mm x 26 mm",
        driverName: "OpenTabletDriver v0.6.7",
        driverDownloadUrl: "https://github.com/OpenTabletDriver/OpenTabletDriver/releases",
        previewImage: "picture/tablet/Screenshot 2026-08-22 221453.webp",
        previewAlt: "Wacom CTL-472 Tablet Settings"
    },

    // Keyboard Configuration
    keyboard: {
        title: "Keyboard Setting",
        device: "Keychron C75 TMR",
        keybind: "Ring / Index (Z, C)",
        actuationPoint: "0.3 mm",
        rapidTrigger: "0.5 mm",
        previewImage: "picture/keyboard/Screenshot 2026-08-23 231651.webp",
        previewAlt: "Keychron C75 Keyboard Settings"
    },

    // Keypad Configuration
    keypad: {
        title: "Keypad Setting",
        device: "Sayodevice O3C",
        stroke: "3.00 mm",
        actuationPoint: "Release: 0.3 mm | Trigger: 0.7 mm",
        rapidTrigger: "Release: 0.5 mm | Trigger: 0.3 mm",
        previewImage: "picture/keypad/Screenshot 2026-08-22 221530.webp",
        previewAlt: "Sayodevice O3C Keypad Settings"
    },

    // Monitor Configuration
    monitor: {
        title: "Monitor",
        device: "LG ULTRAGEAR 24GS60F-B",
        refreshRate: "180 Hz",
        resolution: "1920 x 1080 (FHD)",
        responseTime: "1 ms (GtG)"
    },

    // Audio Configuration
    audio: {
        title: "Audio",
        device: "Apple EarPods",
        connector: "USB-C",
        type: "Earbud Wired"
    },

    // Skins Configuration
    skins: {
        subtext: "I'm way more comfortable playing with the Instafade skin :)",
        driveFolderUrl: "https://drive.google.com/drive/folders/1UlYZANah6EOanaB47LspkXFrU1NtYOxr?usp=sharing",
        items: [
            {
                name: "Aristia(Edit) Instafade Znap- edit.",
                badgeText: "Current Use",
                badgeClass: "main-skin", // Options: 'main-skin', 'ar-skin', 'other-skin'
                downloadUrl: "https://drive.google.com/file/d/1-DTP5cWTEy_noE6c7cjR-I49CyluwW4D/view?usp=drive_link",
                slides: [
                    { src: "picture/skin/aristia/gameplay.webp", label: "Gameplay", alt: "Aristia Instafade Gameplay" },
                    { src: "picture/skin/aristia/songselect.webp", label: "Song Select", alt: "Aristia Song Select UI" },
                    { src: "picture/skin/aristia/result.webp", label: "Results UI", alt: "Aristia Results UI" }
                ]
            },
            {
                name: "Milkteaism Hydro DT BETA(Znap- edit)",
                badgeText: "High AR",
                badgeClass: "ar-skin",
                downloadUrl: "https://drive.google.com/file/d/1mhUefUPC8CJZUHipbji5iUXXV1HgmZck/view?usp=drive_link",
                slides: [
                    { src: "picture/skin/DT/gameplay.webp", label: "Gameplay", alt: "Milkteaism Hydro DT Gameplay" },
                    { src: "picture/skin/DT/songelect.webp", label: "Song Select", alt: "Milkteaism Hydro DT Song Select" },
                    { src: "picture/skin/DT/result.webp", label: "Results UI", alt: "Milkteaism Hydro DT Results UI" }
                ]
            },
            {
                name: "dddx15dt(Znap- edit)",
                badgeText: "DT",
                badgeClass: "ar-skin",
                downloadUrl: "https://drive.google.com/file/d/1HR_FhGM8iDg_X84VBrq-3cw7ERQHQcPs/view?usp=drive_link",
                slides: [
                    { src: "picture/skin/dddx15dt/gameplay.webp", label: "Gameplay", alt: "dddx15dt Gameplay" },
                    { src: "picture/skin/dddx15dt/songselect.webp", label: "Song Select", alt: "dddx15dt Song Select" },
                    { src: "picture/skin/dddx15dt/result.webp", label: "Results UI", alt: "dddx15dt Results UI" }
                ]
            }
        ]
    }
};
