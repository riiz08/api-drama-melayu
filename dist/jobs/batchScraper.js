"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/jobs/batchScraper.ts
const node_cron_1 = __importDefault(require("node-cron"));
const fetchEpisodeList_1 = require("../libs/fetchEpisodeList");
const scrapeEpisode_1 = require("../libs/scrapeEpisode");
const dramaSlugs = [
    "2025/02/dia-imamku-full-episode",
    "2025/04/dari-rahim-yang-sama-full-episod",
    "2025/04/calon-isteri-buat-suami-full-episod",
    "2025/02/dendam-seorang-madu-full-episod",
    "2025/02/keluarga-itu-full-episod",
    "2025/03/sekam-di-dada-full-episod",
];
async function batchScrape() {
    for (const slug of dramaSlugs) {
        console.log(`🔍 Scraping list episode dari: ${slug}`);
        const episodeLinks = await (0, fetchEpisodeList_1.fetchEpisodeLinks)(slug);
        for (const episodeUrl of episodeLinks) {
            try {
                const parsed = new URL(episodeUrl);
                const pathParts = parsed.pathname.split("/").filter(Boolean);
                const fullSlug = pathParts.slice(-3).join("/");
                console.log(`🎬 Scraping episode: ${fullSlug}`);
                await (0, scrapeEpisode_1.scrapeEpisode)(fullSlug);
            }
            catch (err) {
                console.error(`❌ Gagal scrape: ${episodeUrl}`, err);
            }
        }
    }
    console.log("✅ Batch scrape selesai.");
}
// Jalankan setiap jam 12 malam
node_cron_1.default.schedule("0 */3 * * *", async () => {
    console.log("🕛 Menjalankan batch scrape otomatis...");
    await batchScrape();
});
