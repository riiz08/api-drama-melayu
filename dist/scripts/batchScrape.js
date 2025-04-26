"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fetchEpisodeList_1 = require("../libs/fetchEpisodeList");
const scrapeEpisode_1 = require("../libs/scrapeEpisode");
// Daftar judul drama yang ingin di-scrape
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
batchScrape();
