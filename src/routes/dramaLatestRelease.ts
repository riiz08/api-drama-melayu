import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { createSlug } from "../libs/createSlug";

const router = Router();

router.get("/drama-terbaru", async (req: Request, res: Response) => {
  try {
    const url = `${process.env.ENDPOINT}/search/label/sekarang`;

    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const dramas = $("article")
      .map((_, element) => {
        const title = $(element)
          .find(".entry-title a")
          .text()
          .replace(/[\t\n]+/g, "")
          .trim();

        const thumb = $(element).find(".entry-image").attr("data-image");

        const date = $(element).find(".entry-time time").text().trim();

        const slug = createSlug(title);

        return { title, thumb, date, slug };
      })
      .get();

    res.json({
      success: true,
      data: dramas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while scraping data",
    });
  }
});

export default router;
