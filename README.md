# 🎮 osu! Profile Website for GitHub Pages

เว็บไซต์แสดงผลโปรไฟล์ **osu!** ส่วนตัว ดีไซน์ระดับพรีเมียม สไตล์ Modern Gaming / Glassmorphism พร้อมเอฟเฟกต์แสงไฟแบบ Neon, Dynamic Game Mode Switcher, Audio Preview และ osu! Cursor Particle Effect 

ออกแบบมาให้ใช้งานคู่กับ **GitHub Pages** ได้ฟรี 100% โดยไม่ต้องลงโปรแกรม Build ใดๆ (Zero-Build Setup)

---

## 🌟 ฟีเจอร์หลัก (Features)

- 💖 **osu! Gaming Aesthetics**: ธีมมืดผสม Glassmorphism และโทนสีเอกลักษณ์ของ osu! (`#ff66aa`)
- 🕹️ **Multi-Mode Support**: สลับดูสถิติแยกตามโหมดการเล่น `osu!std`, `taiko`, `catch`, `mania`
- 👑 **Top Performances Showcase**: แสดงการ์ด Top Plays พร้อมคำนวณสี Star Difficulty, Grade Badge เปล่งแสง (SS, S, A) และปุ่มกดฟังเสียงตัวอย่างเพลง (Audio Preview)
- 🎧 **Hardware & Playstyle**: แสดงรายละเอียดอุปกรณ์ (Tablet Area, Keybinds Z/X, Rapid Trigger Keyboard, Resolution, Sensitivity)
- 🎨 **Skin Showcase**: การ์ดแสดงผลสกินที่คุณแจกจ่าย พร้อมรายละเอียดและปุ่มดาวน์โหลด `.osk`
- 🏆 **Badges & Achievements**: ตารางแสดงตราสัญลักษณ์ความสำเร็จ
- ✨ **Interactive osu! Cursor Effect**: เอฟเฟกต์อนุภาคตามเมาส์เวลาลากเมาส์ไปมาในหน้าเว็บ

---

## 🛠️ วิธีแก้ไขข้อมูลโปรไฟล์ของคุณ (How to Customize)

คุณสามารถแก้ไขข้อมูลทั้งหมดได้ง่ายๆ ผ่านไฟล์เดียวคือ **[`config.js`](file:///d:/Jakkaf1rst/osu-profile-website/config.js)**

เปิดไฟล์ `config.js` ใน Code Editor แล้วแก้ไขค่าตามต้องการ:

```javascript
const PROFILE_CONFIG = {
    user: {
        username: "ชื่อของคุณ",
        tagline: "คำคมหรือสโลแกนประจำตัว",
        avatar: "https://a.ppy.sh/2", // ลิงก์รูปภาพ Avatar
        country: "Thailand",
        countryCode: "TH",
        supporterLevel: 3, // ระดับ Supporter (0 = ไม่มี, 1-3 = มี)
        // ...
    },
    // สถิติแยกตามโหมด
    modes: {
        std: {
            pp: "6,842",
            globalRank: "#14,250",
            accuracy: "98.74%",
            // ...
        }
    },
    // Top Plays
    topPlays: [
        {
            title: "ชื่อเพลง",
            artist: "ชื่อศิลปิน",
            stars: 6.84,
            pp: 462,
            accuracy: "99.24%",
            grade: "SH",
            mods: ["HD", "DT"],
            audioPreview: "https://b.ppy.sh/preview/1302830.mp3" // ลิงก์เสียงตัวอย่าง
        }
    ]
};
```

---

## 🚀 วิธีเอาเว็บไซต์ขึ้น GitHub Pages (How to Deploy)

เนื่องจากเว็บนี้เป็น Static Web Apps คุณสามารถ Deploy ขึ้น GitHub Pages ได้ง่ายๆ ใน 3 ขั้นตอน:

### ขั้นตอนที่ 1: Push โค้ดขึ้น Repository บน GitHub
หากเปิดใช้งานใน Git Repository นี้แล้ว ให้รันคำสั่ง:
```bash
git add .
git commit -m "Create osu profile website"
git push origin main
```

### ขั้นตอนที่ 2: เปิดใช้งาน GitHub Pages
1. เข้าไปที่หน้า Repository ของคุณบน GitHub (เช่น `https://github.com/znapppp/osu-profile-website`)
2. คลิกที่เมนู **Settings** (ด้านบนสุด)
3. เมนูด้านซ้าย เลือก **Pages** (ใต้หัวข้อ Code and automation)
4. ในส่วน **Build and deployment**:
   - **Source**: เลือก `Deploy from a branch`
   - **Branch**: เลือก `main` และโฟลเดอร์ `/ (root)`
5. กดปุ่ม **Save**

### ขั้นตอนที่ 3: เข้าชมเว็บไซต์!
รอประมาณ 1 - 2 นาที GitHub จะสร้างลิงก์เว็บไซต์ให้คุณ เช่น:
`https://znapppp.github.io/osu-profile-website/`

---

## 📁 โครงสร้างไฟล์ (File Structure)

- [`index.html`](file:///d:/Jakkaf1rst/osu-profile-website/index.html) - โครงสร้างหลักของหน้าเว็บไซต์
- [`styles.css`](file:///d:/Jakkaf1rst/osu-profile-website/styles.css) - ระบบดีไซน์และเอฟเฟกต์แก้ว Glassmorphism & Neon Glow
- [`app.js`](file:///d:/Jakkaf1rst/osu-profile-website/app.js) - ระบบประมวลผล สลับโหมด เล่นเสียง และเอฟเฟกต์อนุภาคเมาส์
- [`config.js`](file:///d:/Jakkaf1rst/osu-profile-website/config.js) - ไฟล์กำหนดข้อมูลส่วนตัวและสถิติเกมของคุณ

---

Developed for the **osu! Community** ❤️