import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import { cleanThumbnailUrl } from "../utils/image";
import axios from "axios";
import { createSlug } from "../libs/createSlug";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const url = `${process.env.ENDPOINT}/${slug}`;
    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const dramas = $(".cat-box-content")
      .find("ul li")
      .map((_, drama) => {
        const title = $(drama).find("h2.post-box-title a").text().trim();
        const rawThumbnail =
          $(drama).find(".post-thumbnail a img").attr("src") || "";
        const thumbnail = cleanThumbnailUrl(rawThumbnail);
        const slug = createSlug(title);

        return { title, thumbnail, slug };
      })
      .get();

    res.json({
      success: true,
      data: dramas,
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
