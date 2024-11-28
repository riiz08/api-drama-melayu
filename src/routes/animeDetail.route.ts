import { Router, Request, Response } from "express";
import puppeteer from "puppeteer";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const url = `${process.env.ENDPOINT_ANIME}/anime/${slug}`;

    const browser = await puppeteer.launch({ headless: true });

    const page = await browser.newPage();

    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector("article");

    const title = await page.$eval(".entry-title", (el) => el.textContent);

    const fullTitle = await page.$eval(".alter", (el) => el.textContent);

    const status = await page.$eval(".spe span", (element) => {
      if (element.querySelector("b")?.textContent === "Status:") {
        return element.textContent?.replace("Status:", "").trim();
      }
      return "";
    });

    const studio = await page.$eval(".spe span a", (element) =>
      element.textContent?.trim()
    );

    const released = await page.$eval(".spe .split", (element) => {
      if (element.querySelector("b")?.textContent === "Released:") {
        return element.textContent?.replace("Released:", "").trim();
      }
      return "";
    });

    const season = await page.$eval(".spe span:nth-child(4) a", (element) =>
      element.textContent?.trim()
    );

    const type = await page.$eval(".spe span:nth-child(5)", (element) => {
      return element.textContent?.replace("Type:", "").trim();
    });

    const episodes = await page.$eval(".spe span:nth-child(6)", (element) => {
      return element.textContent?.replace("Episodes:", "").trim();
    });

    const updateOn = await page.$eval(
      ".spe time[itemprop='datePublished']",
      (element) => {
        return element.getAttribute("datetime");
      }
    );

    const releasedOn = await page.$eval(
      ".spe time[itemprop='dateModified']",
      (element) => {
        return element.getAttribute("datetime");
      }
    );

    const genres = await page.$$eval(".genxed a[rel='tag']", (elements) => {
      return elements.map((element) => element.textContent?.trim());
    });

    const synopsis = await page.$eval(".entry-content", (el) =>
      el.textContent?.trim()
    );

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
        synopsis,
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
