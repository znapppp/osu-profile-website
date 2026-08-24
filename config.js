// ==========================================
// osu! Profile Website Configuration
// แก้ไขข้อมูลโปรไฟล์ของคุณได้ที่นี่
// ==========================================

const PROFILE_CONFIG = {
    // ข้อมูลส่วนตัว / Personal Info
    user: {
        username: "Jakkaf1rst",
        tagline: "Rhythm is just a click away! 🎮⚡",
        avatar: "https://a.ppy.sh/22919575", // ลิงก์ รูป Avatar (หรือใส่เป็นไฟล์รูปภาพ local เช่น ./assets/avatar.jpg)
        banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1600&auto=format&fit=crop", // Banner หลัง
        country: "Thailand",
        countryCode: "TH",
        supporterLevel: 3, // 0 = None, 1-3 = Supporter status level
        isOnline: true,
        statusText: "In-Game • Editing beatmap",
        joinedDate: "March 2021",
        playTime: "482 hrs",
    },

    // โซเชียลมีเดีย / Social Links
    socials: [
        { name: "osu! Profile", icon: "fab fa-optin-monster", url: "https://osu.ppy.sh/users/Jakkaf1rst", color: "#ff66aa" },
        { name: "Discord", icon: "fab fa-discord", tag: "Jakkaf1rst#0001", copyable: true, color: "#5865F2" },
        { name: "Twitch", icon: "fab fa-twitch", url: "https://twitch.tv", color: "#9146FF" },
        { name: "YouTube", icon: "fab fa-youtube", url: "https://youtube.com", color: "#FF0000" },
        { name: "Twitter / X", icon: "fab fa-x-twitter", url: "https://x.com", color: "#1DA1F2" },
        { name: "GitHub", icon: "fab fa-github", url: "https://github.com", color: "#e6edf3" }
    ],

    // สถิติแยกตามโหมดการเล่น / Game Mode Statistics
    modes: {
        std: {
            name: "osu!standard",
            icon: "fas fa-circle-notch",
            pp: "6,842",
            globalRank: "#14,250",
            countryRank: "#215",
            accuracy: "98.74%",
            level: 98,
            levelProgress: 65, // %
            playCount: "45,820",
            rankedScore: "12,485,920,110",
            totalScore: "48,920,410,500",
            replaysWatched: "142",
            grades: {
                ssh: 12,
                ss: 85,
                sh: 48,
                s: 320,
                a: 1120
            }
        },
        taiko: {
            name: "osu!taiko",
            icon: "fas fa-drum",
            pp: "2,150",
            globalRank: "#85,400",
            countryRank: "#1,200",
            accuracy: "96.50%",
            level: 64,
            levelProgress: 40,
            playCount: "5,400",
            rankedScore: "1,245,000,000",
            totalScore: "3,100,000,000",
            replaysWatched: "12",
            grades: {
                ssh: 0,
                ss: 5,
                sh: 8,
                s: 42,
                a: 180
            }
        },
        catch: {
            name: "osu!catch",
            icon: "fas fa-apple-alt",
            pp: "1,890",
            globalRank: "#112,000",
            countryRank: "#1,850",
            accuracy: "97.10%",
            level: 55,
            levelProgress: 80,
            playCount: "3,200",
            rankedScore: "850,000,000",
            totalScore: "1,950,000,000",
            replaysWatched: "5",
            grades: {
                ssh: 1,
                ss: 12,
                sh: 4,
                s: 30,
                a: 110
            }
        },
        mania: {
            name: "osu!mania",
            icon: "fas fa-keyboard",
            pp: "4,210",
            globalRank: "#35,100",
            countryRank: "#510",
            accuracy: "97.85%",
            level: 82,
            levelProgress: 25,
            playCount: "18,400",
            rankedScore: "5,840,000,000",
            totalScore: "14,200,000,000",
            replaysWatched: "38",
            grades: {
                ssh: 4,
                ss: 32,
                sh: 15,
                s: 140,
                a: 480
            }
        }
    },

    // Top Plays / Performance Records
    topPlays: [
        {
            title: "BLUE CLAPPER",
            artist: "Hololive IDOL Project",
            mapper: "Sotarks",
            stars: 6.84,
            pp: 462,
            accuracy: "99.24%",
            combo: "1,245x / 1,245x",
            grade: "SH",
            mods: ["HD", "DT"],
            date: "2 days ago",
            beatmapUrl: "https://osu.ppy.sh/b/2742358",
            audioPreview: "https://b.ppy.sh/preview/1302830.mp3"
        },
        {
            title: "KICK BACK",
            artist: "Kenshi Yonezu",
            mapper: "Nanamori",
            stars: 7.12,
            pp: 438,
            accuracy: "98.65%",
            combo: "1,410x / 1,428x",
            grade: "S",
            mods: ["HD", "HR"],
            date: "1 week ago",
            beatmapUrl: "https://osu.ppy.sh/b/3831849",
            audioPreview: "https://b.ppy.sh/preview/1868352.mp3"
        },
        {
            title: "Idol (アイドル)",
            artist: "YOASOBI",
            mapper: "Log Off Now",
            stars: 6.65,
            pp: 415,
            accuracy: "99.80%",
            combo: "1,310x / 1,310x",
            grade: "SSH",
            mods: ["HD"],
            date: "2 weeks ago",
            beatmapUrl: "https://osu.ppy.sh/b/4091399",
            audioPreview: "https://b.ppy.sh/preview/1987541.mp3"
        },
        {
            title: "FREEDOM DiVE",
            artist: "xi",
            mapper: "Nakagawa-Kanon",
            stars: 7.45,
            pp: 395,
            accuracy: "96.42%",
            combo: "1,850x / 2,538x",
            grade: "A",
            mods: ["None"],
            date: "1 month ago",
            beatmapUrl: "https://osu.ppy.sh/b/129891",
            audioPreview: "https://b.ppy.sh/preview/39804.mp3"
        }
    ],

    // Hardware & Playstyle Setup
    setup: {
        playstyle: "Tablet + Keyboard (Tap X/C)",
        area: "Width: 70mm, Height: 45mm (Forced Proportions)",
        sensitivity: "1.0x (Raw Input ON)",
        resolution: "1920x1080 @ 240Hz (Exclusive Fullscreen)",
        peripherals: [
            { type: "Tablet", name: "Wacom CTL-472 (One by Wacom)", icon: "fas fa-pen-fancy" },
            { type: "Keyboard", name: "DrunkDeer A75 (Magnetic Rapid Trigger)", icon: "fas fa-keyboard" },
            { type: "Keys", name: "Index: X | Middle: Z", icon: "fas fa-hand-pointer" },
            { type: "Monitor", name: "ZOWIE XL2546K 240Hz 0.5ms", icon: "fas fa-desktop" },
            { type: "Audio", name: "Sennheiser HD 560S", icon: "fas fa-headphones" },
            { type: "Mouse", name: "Logitech G Pro X Superlight", icon: "fas fa-mouse" }
        ]
    },

    // Main osu! Skin Showcase
    skin: {
        name: "Jakkaf1rst Neon Pink v3.0",
        author: "Jakkaf1rst",
        version: "osu!std 16:9",
        size: "42.5 MB",
        features: ["Clean Minimalist Cursor", "High contrast hitsounds", "No anime girls overlay (Focused)", "Custom ranking screen"],
        downloadUrl: "#", // ลิงก์ไฟล์ Google Drive / Mediafire / GitHub Release (.osk)
        previewImages: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop"
        ]
    },

    // Badges & Achievements Showcase
    badges: [
        { title: "osu! Supporter", description: "Supporting osu! development", icon: "fas fa-heart", color: "#ff66aa" },
        { title: "Tournament Finalist", description: "Thailand osu! Community Cup 2023", icon: "fas fa-trophy", color: "#ffd700" },
        { title: "Mapper", description: "Created 5+ ranked beatmap sets", icon: "fas fa-map-marked-alt", color: "#00f2fe" },
        { title: "7-Star Pass", description: "Cleared 7* beatmaps with S grade", icon: "fas fa-star", color: "#ff4757" },
        { title: "500 Hours Club", description: "Dedicated rhythm gamer", icon: "fas fa-stopwatch", color: "#a55eea" }
    ]
};
