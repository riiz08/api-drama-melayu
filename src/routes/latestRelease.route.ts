import { Router, Request, Response } from "express";
import puppeteer from "puppeteer";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const pg = req.query.page || 1;

    const url = `${process.env.ENDPOINT_ANIME}/page/${pg}`;

    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector(".bs");

    const animes = await page.$$eval(".bs", (listAnime) =>
      listAnime.map((anime) => {
        const title =
          anime
            .querySelector(".tt")
            ?.childNodes[0]?.textContent?.replace(/[\t\n]+/g, "")
            .trim() || "";

        const fullTitle =
          anime
            .querySelector("h2")
            ?.textContent?.replace(/[\t\n]+/g, "")
            .trim() || "";

        const slug = fullTitle
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");

        const thumbnailSrc = anime.querySelector("img")?.getAttribute("src");

        const thumbnail = thumbnailSrc?.replace(/\?resize=\d+,\d+$/, "");

        const type = anime.querySelector(".typez")?.textContent;

        const episode = anime.querySelector(".epx")?.textContent;

        const lang = anime.querySelector(".sb")?.textContent;

        return { title, slug, thumbnail, type, episode, lang };
      })
    );

    await browser.close();

    res.json({
      success: true,
      page: pg,
      data: animes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while scraping data",
    });
  }
});

export default router;
