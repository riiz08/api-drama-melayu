import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = req.query.page || 1;
    const sub = req.query.sub || "";
    const order = req.query.order || "";
    const status = req.query.status || "";
    const type = req.query.type || "";

    // Pastikan query yang mendukung array diubah menjadi array
    const genre = Array.isArray(req.query.genre)
      ? req.query.genre
      : [req.query.genre].filter(Boolean);
    const season = Array.isArray(req.query.season)
      ? req.query.season
      : [req.query.season].filter(Boolean);
    const studio = Array.isArray(req.query.studio)
      ? req.query.studio
      : [req.query.studio].filter(Boolean);

    // Menyusun queryParams sebagai string yang valid untuk URLSearchParams
    const queryParams = new URLSearchParams();

    queryParams.append("page", String(page));
    queryParams.append("sub", String(sub));
    queryParams.append("order", String(order));
    queryParams.append("status", String(status));
    queryParams.append("type", String(type));

    // Menambahkan array ke queryParams dengan format "key[]=value"
    genre.forEach((g) => queryParams.append("genre[]", String(g)));
    season.forEach((s) => queryParams.append("season[]", String(s)));
    studio.forEach((st) => queryParams.append("studio[]", String(st)));

    const url = `${process.env.ENDPOINT_ANIME}anime/?${queryParams.toString()}`;

    const { data: html } = await axios.get(url);

    // Muat HTML ke dalam Cheerio
    const $ = cheerio.load(html);

    const animes = $(".bs")
      .map((_, element) => {
        const title = $(element)
          .find("h2")
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

    res.json({
      success: true,
      data: animes,
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
