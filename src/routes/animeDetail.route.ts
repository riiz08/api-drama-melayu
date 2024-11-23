import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const url = `https://oploverz.ch/series/${slug}`;

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const title = $("article").find(".entry-title").text().trim();

    const originalTitle = $("article").find(".alter").text().trim();

    const spanEl = $("article").find("span");

    const textNodes = spanEl
      .contents()
      .filter((_, el) => el.type === "text")
      .toArray();

    const status = textNodes[1] ? textNodes[1].data.trim() : null;

    const studioSpan = $("span").filter((_, el) => {
      return $(el).find("b").text().trim() === "Studio:";
    });

    const studio = studioSpan.find("a").text().trim();

    const released = textNodes[3] ? textNodes[3].data.trim() : null;

    const seasonSpan = $("span").filter((_, el) => {
      return $(el).find("b").text().trim() === "Season:";
    });

    const season = seasonSpan.find("a").text().trim();

    const type = textNodes[5] ? textNodes[5].data.trim() : null;

    const episodes = textNodes[6] ? textNodes[6].data.trim() : null;

    const releasedSpan = $("span").filter((_, el) => {
      return $(el).find("b").text().trim() === "Released on:";
    });

    const releasedOn = releasedSpan.find("time").attr("datetime");

    const updatedSpan = $("span").filter((_, el) => {
      return $(el).find("b").text().trim() === "Updated on:";
    });

    const updateOn = updatedSpan.find("time").attr("datetime");

    const genres = $(".genxed a")
      .map((_, el) => $(el).text().trim())
      .toArray();

    res.json({
      success: true,
      data: {
        title,
        originalTitle,
        status,
        studio,
        released,
        season,
        type,
        episodes,
        releasedOn,
        updateOn,
        genres,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while scraping data",
    });
  }
});

export default router;
