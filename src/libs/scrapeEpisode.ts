export async function scrapeEpisode(url: string) {
  try {
    // Pastikan url tidak memiliki domain, hanya bagian path-nya
    const trimmedUrl = url
      .replace("https://blog.basahjeruk.info/", "")
      .replace(".html", "");

    const endpoint = `https://api.mangeakkk.my.id/api/v1/watch/${trimmedUrl}`;

    const res = await fetch(endpoint);
    if (!res.ok) {
      console.error(
        `❌ Gagal scrape episode: ${trimmedUrl} (status: ${res.status})`
      );
    } else {
      console.log(`✅ Episode berhasil di-scrape: ${trimmedUrl}`);
    }
  } catch (error) {
    console.error(`⚠️  Error scraping ${url}:`, error);
  }
}
