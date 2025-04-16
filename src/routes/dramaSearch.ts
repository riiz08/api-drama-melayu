import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import { createSlug } from "../libs/createSlug";
import { cleanThumbnailUrl } from "../utils/image";
import axios from "axios";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    const { page } = req.query || 1;

    const url = `${process.env.ENDPOINT}/page/${page}/?s=${search}`;

    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const pagination = $(".pagination");
    const pageInfo = pagination.find(".pages").text();
    const [current, total] = pageInfo
      .match(/\d+/g)
      ?.map((n) => parseInt(n)) || [1, 1];

    const dramas = $("article")
      .map((_, elem) => {
        const title = $(elem).find(".post-box-title a").text().trim();
        const rawThumbnail =
          $(elem).find(".post-thumbnail img").attr("src") || "";
        const thumbnail = rawThumbnail.replace(/-\d+x\d+(?=\.\w+$)/, "");
        const slug = createSlug(title);

        return { title, thumbnail, slug };
      })
      .get();

    const trending = $(".widget-container .textwidget ol li a")
      .map((_, el) => {
        const title = $(el).text().trim();
        const href = $(el).attr("href") || "";
        const slug = href
          .replace(/^https:\/\/kepalabergetar\.cfd\//, "")
          .replace(/\/$/, ""); // hapus domain & trailing slash
        return { title, slug };
      })
      .get();

    res.json({
      success: true,
      data: {
        currentPage: current,
        totalPages: total,
        drama: dramas,
      },
      trending,
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
