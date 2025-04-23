"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/cronWatcher.ts
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
// Daftar slug yang ingin di-check setiap hari jam 11 malam
const slugsToCheck = [
    "2025/04/dia-imamku-full-episod-1",
    "2025/04/dia-imamku-full-episod-2",
    "2025/04/dia-imamku-full-episod-3",
    "2025/04/dia-imamku-full-episod-4",
    "2025/04/dia-imamku-full-episod-6",
    "2025/04/dia-imamku-full-episod-7",
    "2025/04/dia-imamku-full-episod-8",
    "2025/04/dia-imamku-full-episod-9",
    "2025/04/dia-imamku-full-episod-10",
    "2025/04/dia-imamku-full-episod-11",
    "2025/04/dia-imamku-full-episod-12",
    "2025/04/dia-imamku-full-episod-13",
    "2025/04/dia-imamku-full-episod-14",
    "2025/04/dia-imamku-full-episod-16",
    "2025/04/dia-imamku-full-episod-18",
    "2025/04/dia-imamku-full-episod-19",
    "2025/04/dia-imamku-full-episod-20",
    "2025/04/dia-imamku-full-episod-21",
    "2025/04/dia-imamku-full-episod-22",
    "2025/04/dia-imamku-full-episod-23",
    "2025/04/dia-imamku-full-episod-24",
    "2025/04/dia-imamku-full-episod-25",
    "2025/04/dia-imamku-full-episod-26",
    "2025/04/dia-imamku-full-episod-27",
    "2025/04/dia-imamku-full-episod-28",
    "2025/04/dia-imamku-full-episod-29",
    "2025/04/dia-imamku-full-episod-30",
    "2025/04/dia-imamku-full-episod-31",
    "2025/04/dia-imamku-full-episod-32",
    "2025/04/dia-imamku-full-episod-33",
    "2025/04/dia-imamku-full-episod-34",
    "2025/04/dia-imamku-full-episod-35",
    "2025/04/dia-imamku-full-episod-36",
    "2025/04/dia-imamku-full-episod-37",
    "2025/04/dia-imamku-full-episod-38",
    "2025/04/dia-imamku-full-episod-39",
    "2025/04/dia-imamku-full-episod-40",
    // tambahkan slug lain jika diperlukan
];
node_cron_1.default.schedule("* * * * *", async () => {
    console.log("[CRON] Menjalankan update episode otomatis...");
    for (const slug of slugsToCheck) {
        try {
            const response = await axios_1.default.get(`${process.env.API_BASE_URL}/api/v1/watch/list/${slug}`);
            console.log(`✔️ Berhasil update untuk slug: ${slug}`);
        }
        catch (err) {
            console.error(`❌ Gagal update untuk slug: ${slug}`, err.message);
        }
    }
});
