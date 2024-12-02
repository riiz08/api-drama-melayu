import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { data } from "cheerio/dist/commonjs/api/attributes";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const order = req.query.order || "meta_value_num";
    const category_name = req.query.category_name;
    const genre = req.query.genre;
    const genre2 = req.query.genre2;
    const status = req.query.status;
    const url = `${process.env.ENDPOINT_PUSTAKA_KOMIK}manga/?orderby=${order}&category_name=${category_name}&genre=${genre}&genre2=${genre2}&status=${status}`;

    // Ambil HTML menggunakan Axios
    const { data: html } = await axios.get(url);

    // Muat HTML ke Cheerio
    const $ = cheerio.load(html);

    const list = $(".bge")
      .map((_, el) => {
        const title = $(el).find(".kan a h3").text().trim();
        const genre = $(el).find(".bgei .tpe1_inf").text().trim().split(" ")[1];
        const type = $(el).find(".bgei .tpe1_inf b").text().trim();
        const synopsis = $(el).find(".kan p").text().trim();
        const firstChapter = $(el)
          .find(".kan .new1 a span:last-child")
          .first()
          .text()
          .trim();

        const lastChapter = $(el)
          .find(".kan .new1 a span:last-child")
          .last()
          .text()
          .trim();

        const coverSrc = $(el).find(".bgei a img").attr("src");
        const cover = coverSrc
          ? coverSrc
              .replace(/(\?resize=[^&]*|&quality=[^&]*)/g, "")
              .replace(/\?$/, "") // Menghapus query parameters resize dan quality
          : null;

        return {
          type,
          title,
          cover,
          genre,
          synopsis,
          firstChapter,
          lastChapter,
        };
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
