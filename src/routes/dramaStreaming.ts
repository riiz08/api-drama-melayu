import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const url = `${process.env.ENDPOINT}/${slug}`;
    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const title = $("h1.name.post-title span").text().trim();
    const video = $("div.single-post-video iframe").attr("src") || "";

    const episode = $("div.entry")
      .find("div:contains('Episod:')")
      .text()
      .replace("Episod:", "")
      .trim();
    const airDate = $("div.entry")
      .find("div:contains('Tarikh Tayangan:')")
      .text()
      .replace("Tarikh Tayangan:", "")
      .trim();
    const schedule = $("div.entry")
      .find("div:contains('Waktu Siaran:')")
      .text()
      .replace("Waktu Siaran:", "")
      .trim();
    const director = $("div.entry")
      .find("div:contains('Pengarah:')")
      .text()
      .replace("Pengarah:", "")
      .trim();
    const production = $("div.entry")
      .find("div:contains('Produksi:')")
      .text()
      .replace("Produksi:", "")
      .trim();

    const uploadDate = $("meta[itemprop='uploadDate']").attr("content") || "";
    const duration = $("meta[itemprop='duration']").attr("content") || "";
    const thumbnailUrl =
      $("meta[itemprop='thumbnailUrl']").attr("content") || "";
    // Ambil link anchor (judul utama drama)
    const anchorEl = $("div.entry").find("a[href*='drama-dia-imamku']");
    const dramaTitle = anchorEl.first().text().trim();
    const dramaUrl = anchorEl.first().attr("href") || "";
    const dramaSlug = dramaUrl
      .replace(/^https:\/\/kepalabergetar\.cfd\//, "")
      .replace(/\/$/, "");

    const trendingDramas = $(".widget-container .textwidget ol li")
      .map((_, el) => {
        const title = $(el).find("a").text().trim();
        const href = $(el).find("a").attr("href") || "";
        const slug = href
          .replace(/^https:\/\/kepalabergetar\.cfd\//, "")
          .replace(/\/$/, ""); // hapus trailing slash

        return { title, slug };
      })
      .get();

    res.json({
      success: true,
      data: {
        title,
        video,
        episode,
        airDate,
        schedule,
        director,
        production,
        uploadDate,
        duration,
        thumbnailUrl,
        dramaTitle,
        dramaSlug,
      },
      trending: trendingDramas,
    });
  } catch (error) {
    console.error("Scraping Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to scrape episode detail.",
    });
  }
});

export default router;
