import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    // Mengambil query param
    const search = req.query.search;

    // URL yang akan di-scrape, tambahkan query ke dalam URL
    const url = `${process.env.ENDPOINT_ANIME}/?s=${search}`;

    // Ambil HTML menggunakan Axios
    const { data: html } = await axios.get(url);

    // Muat HTML ke Cheerio
    const $ = cheerio.load(html);

    // Ambil data anime menggunakan selector CSS
    const animes = $(".bs")
      .map((_, anime) => {
        const title = $(anime)
          .find(".tt")
          .contents()
          .first()
          .text()
          .replace(/[\t\n]+/g, "")
          .trim();

        const fullTitle = $(anime)
          .find("h2")
          .text()
          .replace(/[\t\n]+/g, "")
          .trim();

        const slug = fullTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const thumbnailSrc = $(anime).find("img").attr("src");
        const thumbnail = thumbnailSrc?.replace(/\?resize=\d+,\d+$/, "");

        const type = $(anime).find(".typez").text().trim();

        const episode = $(anime).find(".epx").text().trim();

        const lang = $(anime).find(".sb").text().trim();

        return { title, slug, thumbnail, type, episode, lang };
      })
      .get(); // Mengubah hasil ke array

    // Kirim response JSON
    res.json({
      success: true,
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
