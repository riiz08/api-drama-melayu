import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const tipe = req.query.tipe;
    const url = `${process.env.ENDPOINT_KOMIK}daftar-komik/?tipe=${tipe}`;

    // Ambil HTML menggunakan Axios
    const { data: html } = await axios.get(url);

    // Muat HTML ke Cheerio
    const $ = cheerio.load(html);

    const list = $(".ls4")
      .map((_, el) => {
        const title = $(el).find("h4 a").text().trim();
        const genre = $(el).find(".ls4s").first().text().trim();
        // const chapter = $(el).find(".ls2j .ls2l").text().trim();
        const coverSrc = $(el).find("a img").attr("data-src");
        const cover = coverSrc?.replace(/\?resize=\d+,\d+$/, "");

        return { title, genre, cover };
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
