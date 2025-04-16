import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import { createSlug } from "../libs/createSlug";
import puppeteer from "puppeteer";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const pageParam = req.query.page || 1;
    const url = `${process.env.ENDPOINT}/page/${pageParam}`;

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

    const dramas = $(".recent-box")
      .find(".recent-item")
      .map((_, elem) => {
        const title = $(elem).find(".post-box-title a").text().trim();
        const rawThumbnail =
          $(elem).find(".post-thumbnail img").attr("src") || "";

        const thumbnail = rawThumbnail.replace(/-\d+x\d+(?=\.\w+$)/, ""); // ubah ke full image
        const slug = createSlug(title);

        return { title, thumbnail, slug };
      })
      .get();

    const trending = $(".widget-container .textwidget ol li a")
      .map((_, el) => {
        const title = $(el).text().trim();
        const href = $(el).attr("href") || "";
        const slug = href
          .replace(/^https:\/\/kepalabergetar\.cfd\//, "")
          .replace(/\/$/, ""); // hapus domain & trailing slash
        return { title, slug };
      })
      .get();

    const currentPage = parseInt($(".pagination .current").text().trim()) || 1;
    const lastHref = $(".pagination a.last").attr("href") || "";
    const lastPage = parseInt(lastHref.match(/\/page\/(\d+)\//)?.[1] || "1");

    res.json({
      success: true,
      data: {
        currentPage: currentPage,
        totalPage: lastPage,
        drama: dramas,
      },
      trending: trending,
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
