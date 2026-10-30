/* Test-only SITE_CONFIG, served in place of js/config.js so tests don't depend on the real content */

const SITE_CONFIG = {
    profile: {
        username: "TestPlayer",
        lastUpdate: "1 January 2026",
        avatarUrl: "avatar.jpg",
        avatarFallback: "avatar.jpg",
        socials: {
            osuProfileUrl: "https://osu.example/users/1",
            tiktokUrl: "https://tiktok.example/@test",
            xUrl: "https://x.example/test",
            discordTag: "test-discord"
        }
    },

    tablet: {
        device: "Fixture Tablet T1",
        area: "50 mm x 30 mm",
        driverName: "Fixture Driver v1",
        previewImage: "picture/tablet/tablet-area.png",
        previewAlt: "Fixture tablet area screenshot"
    },

    keyboard: {
        device: "Fixture Keyboard K1",
        actuationPoint: "0.4 mm",
        rapidTrigger: "0.2 mm",
        previewImage: "picture/keyboard/Screenshot 2026-08-23 231651.webp",
        previewAlt: "Fixture keyboard settings screenshot"
    },

    monitor: {
        device: "Fixture Monitor M1",
        refreshRate: "240 Hz",
        resolution: "2560 x 1440"
    },

    audio: {
        device: "Fixture Headphones H1",
        connector: "3.5 mm",
        type: "Over-ear"
    },

    skins: {
        driveFolderUrl: "https://drive.example/folder/archive",
        items: [
            {
                name: "Alpha Skin",
                badgeText: "DT",
                downloadUrl: "https://drive.example/alpha",
                slides: [
                    { src: "picture/skin/DT/gameplay.webp", label: "Gameplay", alt: "Alpha gameplay" },
                    { src: "picture/skin/DT/songelect.webp", label: "Song Select", alt: "Alpha song select" },
                    { src: "picture/skin/DT/result.webp", label: "Results UI", alt: "Alpha results" }
                ]
            },
            {
                name: "Bravo Skin (Test edit)",
                current: true,
                badgeText: "Current Use",
                note: "Bravo is the one I always come back to.",
                details: [
                    { label: "Base", value: "Bravo Original" },
                    { label: "Hitcircles", value: "Instafade" }
                ],
                downloadUrl: "https://drive.example/bravo",
                slides: [
                    { src: "picture/skin/aristia/gameplay.webp", label: "Gameplay", alt: "Bravo gameplay" },
                    { src: "picture/skin/aristia/songselect.webp", label: "Song Select", alt: "Bravo song select" },
                    { src: "picture/skin/aristia/result.webp", label: "Results UI", alt: "Bravo results" }
                ]
            },
            {
                name: "Charlie Skin",
                badgeText: "High AR",
                downloadUrl: "https://drive.example/charlie",
                slides: [
                    { src: "picture/skin/dddx15dt/gameplay.webp", label: "Gameplay", alt: "Charlie gameplay" },
                    { src: "picture/skin/dddx15dt/songselect.webp", label: "Song Select", alt: "Charlie song select" },
                    { src: "picture/skin/dddx15dt/result.webp", label: "Results UI", alt: "Charlie results" }
                ]
            },
            {
                name: "Placeholder Skin",
                isPlaceholder: true,
                badgeText: "New",
                downloadUrl: "#",
                slides: [{ src: "", label: "Gameplay", alt: "Preview" }]
            }
        ]
    },

    overlays: {
        githubUrl: "https://github.example/overlay",
        tosuDownloadUrl: "https://github.example/tosu/releases",
        items: [
            {
                name: "Fixture Overlay",
                description: "An overlay used only by tests.",
                downloadUrl: "https://github.example/overlay.zip",
                previewVideo: ""
            }
        ]
    }
};
