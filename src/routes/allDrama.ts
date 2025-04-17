import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import { resizeImageUrl } from "../utils/image";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const url = `${process.env.ENDPOINT}/search/label/drama`;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // User-Agent untuk hindari deteksi bot
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

    const html = await page.content();

    await browser.close();

    const $ = cheerio.load(html);

    const dramas = $("article")
      .map((_, elem) => {
        const title = $(elem)
          .find(".entry-header .entry-title a")
          .text()
          .trim();
        const rawThumbnail =
          $(elem).find(".entry-image").attr("data-image") || "";
        const thumbnail = resizeImageUrl(rawThumbnail);
        const rawSlug = $(elem).find(".entry-image-wrap").attr("href") || "";
        const slug = rawSlug
          .replace("https://blog.basahjeruk.info/", "")
          .replace(".html", "");
        const dateTime = $(elem).find(".entry-time time").attr("datetime");

        return { title, thumbnail, slug, dateTime };
      })
      .get();

    res.json({
      success: true,
      data: {
        drama: dramas,
      },
    });
  } catch (error) {
    console.error("Scraping Error:", error);
    res.status(500).json({
      success: false,
      message: "Error while scraping data",
    });
  }
});

export default router;
