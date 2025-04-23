import * as cheerio from "cheerio";
import axios from "axios";

export async function fetchEpisodeLinks(slug: string): Promise<string[]> {
  const url = `https://blog.basahjeruk.info/${slug}.html`;

  const res = await axios.get(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const $ = cheerio.load(res.data);
  const links: string[] = [];

  // Ambil semua <a> di dalam <table>
  $("table td a").each((_, el) => {
    const href = $(el).attr("href");
    console.log(href);
    if (href && href.includes("episod")) {
      links.push(href.trim());
    }
  });

  return Array.from(new Set(links)); // hapus duplikat
}
