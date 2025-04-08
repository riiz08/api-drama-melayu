import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import { createSlug } from "../libs/createSlug";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const url = `${process.env.ENDPOINT}/search/label/drama`;

    // Launch browser
    const browser = await puppeteer.launch({
      headless: true, // bisa juga true
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Set User-Agent biar tidak dianggap bot
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });

    const html = await page.content();

    await browser.close();

    // Load ke cheerio
    const $ = cheerio.load(html);

    const dramas = $("article")
      .map((_, element) => {
        const title = $(element)
          .find(".entry-title a")
          .text()
          .replace(/[\t\n]+/g, "")
          .trim();

        const thumb = $(element).find(".entry-image").attr("data-image");

        const date = $(element).find(".entry-time time").text().trim();

        const slug = createSlug(title);

        return { title, thumb, date, slug };
      })
      .get();

    res.json({
      success: true,
      data: dramas,
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
