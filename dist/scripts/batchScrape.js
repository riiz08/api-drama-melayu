"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchEpisodeList_1 = require("../libs/fetchEpisodeList");
const scrapeEpisode_1 = require("../libs/scrapeEpisode");
// Daftar drama yang ingin di-scrape
const dramaSlugs = [
    "2025/02/dia-imamku-full-episode",
    "2025/04/dari-rahim-yang-sama-full-episod",
    "2025/04/calon-isteri-buat-suami-full-episod",
    "2025/02/dendam-seorang-madu-full-episod",
    "2025/02/keluarga-itu-full-episod",
    "2025/03/sekam-di-dada-full-episod",
];
// Delay helper
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// Retry helper
async function retry(fn, maxRetries = 5, delayMs = 10000) {
    let attempt = 0;
    while (attempt < maxRetries) {
        try {
            return await fn();
        }
        catch (err) {
            attempt++;
            console.warn(`⚠️ Percobaan ke-${attempt} gagal. Ulangi dalam ${delayMs}ms...`);
            await delay(delayMs);
        }
    }
    throw new Error(`Gagal setelah ${maxRetries} percobaan.`);
}
// Fungsi utama batch scrape
async function batchScrape() {
    console.log("🚀 Mulai batch scrape drama...");
    for (const slug of dramaSlugs) {
        try {
            console.log(`🔍 Scraping list episode dari: ${slug}`);
            const episodeLinks = await retry(() => (0, fetchEpisodeList_1.fetchEpisodeLinks)(slug));
            for (const episodeUrl of episodeLinks) {
                const parsed = new URL(episodeUrl);
                const pathParts = parsed.pathname.split("/").filter(Boolean);
                const fullSlug = pathParts.slice(-3).join("/");
                try {
                    console.log(`🎬 Scraping episode: ${fullSlug}`);
                    await retry(() => (0, scrapeEpisode_1.scrapeEpisode)(fullSlug));
                }
                catch (episodeError) {
                    console.error(`❌ Gagal scrape episode setelah retry: ${fullSlug}`, episodeError);
                }
                await delay(2000); // Delay antar episode
            }
            await delay(5000); // Delay antar drama
        }
        catch (dramaError) {
            console.error(`❌ Gagal fetch episode list setelah retry: ${slug}`, dramaError);
        }
    }
    console.log("✅ Batch scrape selesai semua.");
}
batchScrape();
