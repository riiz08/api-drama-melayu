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

    const list = $("section#Terbaru .ls4w .ls4")
      .map((_, el) => {
        const title = $(el).find(".ls4j > h3 > a").text().trim();
        const typeText = $(el).find(".ls4s").text().trim();
        const type = typeText.split(" ")[0];
        const genre = typeText.split(" ")[1];
        const time = typeText.split(" ").slice(2).join(" ");
        const chapter = $(el).find(".ls24").text().trim();
        const coverSrc = $(el).find(".ls4v a img").attr("data-src");
        const cover = coverSrc?.replace(/\?resize=\d+,\d+$/, "");
        const slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const slugChapter =
          slug +
          "-" +
          chapter
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");

        return { title, type, genre, time, chapter, cover, slug, slugChapter };
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
