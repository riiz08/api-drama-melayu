import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { createSlug } from "../libs/createSlug";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const url = `${process.env.ENDPOINT_ANIME}/anime/${slug}`;

    // Ambil HTML menggunakan Axios
    const { data: html } = await axios.get(url);

    // Muat HTML ke Cheerio
    const $ = cheerio.load(html);

    // Ambil data menggunakan selector CSS
    const title = $(".entry-title").text().trim();

    const fullTitle = $(".alter").text().trim();

    const status = $(".spe span")
      .filter((_, el) => $(el).find("b").text() === "Status:")
      .text()
      .replace("Status:", "")
      .trim();

    const studio = $(".spe span a").first().text().trim();

    const released = $(".spe .split")
      .filter((_, el) => $(el).find("b").text() === "Released:")
      .text()
      .replace("Released:", "")
      .trim();

    const season = $(".spe span:nth-child(4) a").text().trim();

    const type = $(".spe span:nth-child(5)").text().replace("Type:", "").trim();

    const episodes = $(".spe span:nth-child(6)")
      .text()
      .replace("Episodes:", "")
      .trim();

    const updateOn = $(".spe time[itemprop='datePublished']").attr("datetime");

    const releasedOn = $(".spe time[itemprop='dateModified']").attr("datetime");

    const genres = $(".genxed a[rel='tag']")
      .map((_, el) => $(el).text().trim())
      .get(); // Mengubah hasil ke array

    const rating =
      $(".rating strong")
        .text()
        .trim()
        .match(/[\d.]+/)?.[0] || null;

    const synopsis = $(".entry-content").text().trim();

    const epList = $(".eplister ul li")
      .map((_, el) => {
        const epTitle = $(el).find(".epl-title").text().trim();
        const epLang = $(el).find(".epl-sub").text().trim();
        const epRelease = $(el).find(".epl-date").text().trim();
        const epSlug = createSlug(epTitle);

        return { epTitle, epLang, epRelease, epSlug };
      })
      .get();

    // Kirim response
    res.json({
      success: true,
      data: {
        title,
        fullTitle,
        status,
        studio,
        released,
        season,
        type,
        episodes,
        updateOn,
        releasedOn,
        genres,
        rating,
        synopsis,
        epList,
      },
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
