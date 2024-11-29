import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const pg = req.query.page || 1;

    const url = `${process.env.ENDPOINT_ANIME}/page/${pg}`;

    // Fetch HTML dari URL menggunakan Axios
    const { data: html } = await axios.get(url);

    // Muat HTML ke dalam Cheerio
    const $ = cheerio.load(html);

    // Ambil elemen berdasarkan selector
    const animes = $(".bs")
      .map((_, element) => {
        const title = $(element)
          .find(".tt")
          .text()
          .replace(/[\t\n]+/g, "")
          .trim();

        const fullTitle = $(element)
          .find("h2")
          .text()
          .replace(/[\t\n]+/g, "")
          .trim();

        const slug = fullTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const thumbnailSrc = $(element).find("img").attr("src");
        const thumbnail = thumbnailSrc?.replace(/\?resize=\d+,\d+$/, "");

        const type = $(element).find(".typez").text().trim();
        const episode = $(element).find(".epx").text().trim();
        const lang = $(element).find(".sb").text().trim();

        return { title, slug, thumbnail, type, episode, lang };
      })
      .get(); // Mengubah hasil Cheerio menjadi array

    // Kirim response
    res.json({
      success: true,
      page: pg,
      data: animes,
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
