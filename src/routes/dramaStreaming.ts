import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import { createSlug } from "../libs/createSlug";
import { cleanThumbnailUrl } from "../utils/image";
import axios from "axios";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const url = `https://basahjeruk.org/${slug}`;
    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const elem = $("article");

    const title = $("#crumbs").children("a").eq(1).text().trim();
    const episodeTitle = elem.find("h1").text().trim();
    const video = elem.find("iframe").attr("src");
    const fullTitleSlug = createSlug(title);
    const relatedEpisodes = $("#related_posts")
      .find(".related-item")
      .map((_, re) => {
        const title = $(re).find("h3 a").text().trim();
        const rawThumbnail =
          $(re).find(".post-thumbnail a img").attr("src") || "";
        const thumbnail = cleanThumbnailUrl(rawThumbnail);
        const date = $(re).find(".tie-date").text();
        const slug = createSlug(title);

        return { title, thumbnail, date, slug };
      })
      .get();

    res.json({
      success: true,
      data: {
        title,
        episodeTitle,
        video,
        slug: fullTitleSlug,
        relatedEpisodes,
      },
    });
  } catch (error) {
    console.error("Scraping Error:", error);
    res.status(500).json({
      success: false,
      message: "Error while scraping data",
    });
  }
});

export default router;
