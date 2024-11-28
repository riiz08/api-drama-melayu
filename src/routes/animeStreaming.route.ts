import { Router, Request, Response } from "express";
import puppeteer from "puppeteer";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const url = `${process.env.ENDPOINT_ANIME}/${slug}`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Navigasi ke halaman target
    await page.goto(url, { waitUntil: "networkidle2" });

    await page.waitForSelector("iframe");

    // Ambil atribut src dari iframe
    const videoSource = await page.$eval("iframe", (iframe) => iframe.src);

    const title = await page.$eval(".entry-title", (el) => el.textContent);

    await browser.close();

    // Kirim response
    res.json({
      success: true,
      data: {
        title,
        videoSource,
      },
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);

    // Tutup browser jika ada error
    res.status(500).json({
      success: false,
      message: "Error while scraping data",
    });
  }
});

export default router;
