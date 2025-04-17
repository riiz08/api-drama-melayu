import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import { createSlug } from "../libs/createSlug";
import { cleanThumbnailUrl, resizeImageUrl } from "../utils/image";
import axios from "axios";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    const url = `${process.env.ENDPOINT}/search?q=${search}`;

    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const dramas = $("article")
      .map((_, elem) => {
        const title = $(elem)
          .find(".entry-header .entry-title a")
          .text()
          .trim();
        const rawThumbnail =
          $(elem).find(".entry-image").attr("data-image") || "";
        const thumbnail = resizeImageUrl(rawThumbnail);
        const rawSlug = $(elem).find(".entry-image-wrap").attr("href") || "";
        const slug = rawSlug
          .replace("https://blog.basahjeruk.info/", "")
          .replace(".html", "");
        const dateTime = $(elem).find(".entry-time time").attr("datetime");

        return { title, thumbnail, slug, dateTime };
      })
      .get();

    res.json({
      success: true,
      data: {
        drama: dramas,
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
