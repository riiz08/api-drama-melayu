// src/jobs/batchScraper.ts
import cron from "node-cron";
import { fetchEpisodeLinks } from "../libs/fetchEpisodeList";
import { scrapeEpisode } from "../libs/scrapeEpisode";

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
    const episodeLinks = await fetchEpisodeLinks(slug);

    for (const episodeUrl of episodeLinks) {
      try {
        const parsed = new URL(episodeUrl);
        const pathParts = parsed.pathname.split("/").filter(Boolean);
        const fullSlug = pathParts.slice(-3).join("/");

        console.log(`🎬 Scraping episode: ${fullSlug}`);
        await scrapeEpisode(fullSlug);
      } catch (err) {
        console.error(`❌ Gagal scrape: ${episodeUrl}`, err);
      }
    }
  }

  console.log("✅ Batch scrape selesai.");
}

// Jalankan setiap jam 12 malam
cron.schedule("0 */3 * * *", async () => {
  console.log("🕛 Menjalankan batch scrape otomatis...");
  await batchScrape();
});
