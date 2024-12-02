import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const url = `${process.env.ENDPOINT_KOMIK}`;

    // Ambil HTML menggunakan Axios
    const { data: html } = await axios.get(url);

    // Muat HTML ke Cheerio
    const $ = cheerio.load(html);

    const list = $("section#Komik_Hot_Manhua .perapih .ls112 .ls12 .ls2")
      .map((_, el) => {
        const title = $(el).find(".ls2j > h3 > a").text().trim();
        const genreText = $(el).find(".ls2t").text().trim();
        const genre = genreText.split(" ")[0];
        const chapter = $(el).find(".ls2j .ls2l").text().trim();
        const coverSrc = $(el).find(".ls2v a img").attr("data-src");
        const cover = coverSrc?.replace(/\?resize=\d+,\d+$/, "");

        return { title, genre, chapter, cover };
      })
      .get();

    res.json({
      success: true,
      data: list,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error while processing data",
    });
  }
});

export default router;
