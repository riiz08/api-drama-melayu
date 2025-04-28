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
// Helper untuk delay antar request
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
// Fungsi utama batch scrape
async function batchScrape() {
    console.log("🚀 Mulai batch scrape drama...");
    for (const slug of dramaSlugs) {
        try {
            console.log(`🔍 Scraping list episode dari: ${slug}`);
            const episodeLinks = await (0, fetchEpisodeList_1.fetchEpisodeLinks)(slug);
            for (const episodeUrl of episodeLinks) {
                try {
                    const parsed = new URL(episodeUrl);
                    const pathParts = parsed.pathname.split("/").filter(Boolean);
                    const fullSlug = pathParts.slice(-3).join("/");
                    console.log(`🎬 Scraping episode: ${fullSlug}`);
                    await (0, scrapeEpisode_1.scrapeEpisode)(fullSlug);
                    await delay(2000); // Delay 2 detik antar episode biar server gak kejedot
                }
                catch (episodeError) {
                    console.error(`❌ Gagal scrape episode: ${episodeUrl}`, episodeError);
                }
            }
            await delay(5000); // Delay 5 detik antar drama biar lebih santai
        }
        catch (dramaError) {
            console.error(`❌ Gagal fetch episode list untuk drama: ${slug}`, dramaError);
        }
    }
    console.log("✅ Batch scrape selesai semua.");
}
batchScrape();
// // Schedule cron job
// cron.schedule("* * * * *", async () => {
//   // Setiap jam 1 pagi
//   console.log("⏰ Menjalankan cronjob scraping drama...");
//   await batchScrape();
// });
