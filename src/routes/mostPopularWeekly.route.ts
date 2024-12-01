import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const url = `${process.env.ENDPOINT_ANIME}`;
    // Fetch HTML dari URL menggunakan Axios
    const { data: html } = await axios.get(url);

    // Muat HTML ke dalam Cheerio
    const $ = cheerio.load(html);

    const listAnime = $(".wpop-weekly ul li")
      .map((_, el) => {
        const title = $(el).find("h4").text().trim();
        const genres = $(el)
          .find("span a[rel='tag']")
          .map((_, genre) => $(genre).text().trim())
          .get();
        const thumbnailSrc = $(el).find(".imgseries > a > img").attr("src");
        const thumbnail = thumbnailSrc?.replace(/\?resize=\d+,\d+$/, "");

        return { title, genres, thumbnail };
      })
      .get();

    res.json({
      success: true,
      data: listAnime,
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
