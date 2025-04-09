import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

const router = Router();

router.get("/*", async (req: Request, res: Response) => {
  try {
    const slug = req.params[0];
    const url = `${process.env.ENDPOINT}/${slug}.html`;

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    );

    const videoUrls: string[] = [];

    await page.setRequestInterception(true);
    page.on("request", (request) => request.continue());

    page.on("response", async (response) => {
      const responseUrl = response.url();
      if (
        responseUrl.includes("master.m3u8") &&
        !videoUrls.includes(responseUrl)
      ) {
        videoUrls.push(responseUrl);
      }
    });

    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);

    const title = $(".entry-title").first().text().trim();

    const rawThumb = $(".entry-content").find("img").attr("src") ?? "";
    const thumb = rawThumb.replace(/w\d+-h\d+/, "w640");

    res.json({
      success: true,
      title,
      thumb,
      videoSources: videoUrls,
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
