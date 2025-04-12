import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import { createSlug } from "../libs/createSlug";
import { cleanThumbnailUrl } from "../utils/image";
import axios from "axios";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { page } = req.query || 1;
    const url = `${process.env.ENDPOINT}/page/${page}`;
    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const pagination = $(".pagination");
    const pageInfo = pagination.find(".pages").text();
    const [current, total] = pageInfo
      .match(/\d+/g)
      ?.map((n) => parseInt(n)) || [1, 1];

    const dramas = $(".recent-box")
      .find(".recent-item")
      .map((_, elem) => {
        const title = $(elem).find(".post-box-title a").text().trim();
        const rawThumbnail =
          $(elem).find(".post-thumbnail img").attr("src") || "";
        const thumbnail = cleanThumbnailUrl(rawThumbnail);
        const slug = createSlug(title);

        return { title, thumbnail, slug };
      })
      .get();

    const currentPage = $(".pagination").find(".current").text().trim();

    res.json({
      success: true,
      currentPage: current,
      totalPages: total,
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
