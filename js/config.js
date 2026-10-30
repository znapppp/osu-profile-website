/* ==========================================================================
   Znap- osu! Setup Website - Application Configuration
   ========================================================================== */

const SITE_CONFIG = {
    // Profile & Social Reference
    profile: {
        username: "Znap-",
        titleHighlight: "Setup Configuration",
        lastUpdate: "6 October 2026",
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
        area: "43 mm x 28.5 mm",
        driverName: "OpenTabletDriver v0.6.7",
        driverDownloadUrl: "https://github.com/OpenTabletDriver/OpenTabletDriver/releases",
        previewImage: "picture/tablet/tablet-area.png",
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

    // Monitor Configuration
    monitor: {
        title: "Monitor",
        device: "LG ULTRAGEAR 24GS60F-B",
        refreshRate: "180 Hz",
        resolution: "1920 x 1080 (FHD)"
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
        driveFolderUrl: "https://drive.google.com/drive/folders/1NQAOlXTy9oibloNPvzCS4ZRdHu3fjedv?usp=drive_link",
        items: [
            {
                name: "Aristia Instafade (Znap- edit)",
                current: true,
                note: "I'm way more comfortable playing with the Instafade skin :)",
                details: [
                    { label: "Base", value: "Aristia" },
                    { label: "Hitcircles", value: "Instafade" }
                ],
                downloadUrl: "https://drive.google.com/file/d/1-DTP5cWTEy_noE6c7cjR-I49CyluwW4D/view?usp=drive_link",
                slides: [
                    { src: "picture/skin/aristia/gameplay.webp", label: "Gameplay", alt: "Aristia Instafade Gameplay" },
                    { src: "picture/skin/aristia/songselect.webp", label: "Song Select", alt: "Aristia Song Select UI" },
                    { src: "picture/skin/aristia/result.webp", label: "Results UI", alt: "Aristia Results UI" }
                ]
            },
            {
                name: "Milkteaism Hydro DT BETA (Znap- edit)",
                badgeText: "High AR",
                downloadUrl: "https://drive.google.com/file/d/1mhUefUPC8CJZUHipbji5iUXXV1HgmZck/view?usp=drive_link",
                slides: [
                    { src: "picture/skin/DT/gameplay.webp", label: "Gameplay", alt: "Milkteaism Hydro DT Gameplay" },
                    { src: "picture/skin/DT/songelect.webp", label: "Song Select", alt: "Milkteaism Hydro DT Song Select" },
                    { src: "picture/skin/DT/result.webp", label: "Results UI", alt: "Milkteaism Hydro DT Results UI" }
                ]
            },
            {
                name: "dddx15dt (Znap- edit)",
                badgeText: "DT",
                downloadUrl: "https://drive.google.com/file/d/1HR_FhGM8iDg_X84VBrq-3cw7ERQHQcPs/view?usp=drive_link",
                slides: [
                    { src: "picture/skin/dddx15dt/gameplay.webp", label: "Gameplay", alt: "dddx15dt Gameplay" },
                    { src: "picture/skin/dddx15dt/songselect.webp", label: "Song Select", alt: "dddx15dt Song Select" },
                    { src: "picture/skin/dddx15dt/result.webp", label: "Results UI", alt: "dddx15dt Results UI" }
                ]
            }
        ]
    },

    // tosu Overlays Configuration
    overlays: {
        subtext: "Custom stream overlays & widgets built for tosu to decorate your osu! streaming screen.",
        githubUrl: "https://github.com/znapppp/Znap-OsuBackground",
        tosuDownloadUrl: "https://github.com/tosuapp/tosu/releases",
        items: [
            {
                name: "Znap-OsuBackground",
                badgeText: "tosu Overlay",
                description: "Designed for players using letterboxed / non-fullscreen resolutions (e.g., playing at 1440x900 on a 1920x1080 monitor with black borders). Fills the empty border space with dynamic beatmap artwork or music videos, featuring customizable background dimming and video toggles via config.",
                downloadUrl: "https://github.com/znapppp/Znap-OsuBackground/archive/refs/heads/main.zip",
                videoPreviewUrl: "https://drive.google.com/file/d/1B7kju2izmLIfe_iq1cu05M1qIrqgbPBp/view?usp=drive_link",
                sourceRefUrl: "https://github.com/Citrusis/OBSDecoratePack",
                sourceRefName: "Citrusis/OBSDecoratePack",
                specs: [
                    { label: "Compatible with", value: "tosu" },
                    { label: "Target screen", value: "1440x900 on 1080p" },
                    { label: "Key features", value: "Dynamic BG & Video / Custom Dim" }
                ],
                previewImg: "",
                previewVideo: "picture/overlay/vdo/preview_vdo.mp4",
                tags: ["tosu", "OBS Overlay", "1440x900 / 1920x1080", "Beatmap Video / BG", "Custom Dim"]
            }
        ]
    }
};
