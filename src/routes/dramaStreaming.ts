import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import { resizeImageUrl } from "../utils/image";

const router = Router();

router.get("/*", async (req: Request, res: Response) => {
  try {
    const slug = req.params[0];
    const url = `${process.env.ENDPOINT}/${slug}.html
`;

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
    page.on("request", (req) => req.continue());

    page.on("response", async (response) => {
      const resUrl = response.url();
      const contentType = response.headers()["content-type"] || "";

      if (
        resUrl.includes(".m3u8") ||
        contentType.includes("application/vnd.apple.mpegurl")
      ) {
        if (!videoUrls.includes(resUrl)) {
          videoUrls.push(resUrl);
        }
      }
    });

    await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const html = await page.content();
    await browser.close();

    const $ = cheerio.load(html);

    const episodeTitle = $("article").find(".entry-title").text().trim();
    const dateTime = $(".entry-time").find("time").attr("datetime");
    const paragraph = $(
      "div[style*='box-sizing: border-box'][style*='font-size: 17px']"
    )
      .first()
      .text()
      .trim();
    const title = $("h2").first().text().trim();
    const episod = $("b:contains('Episod:')")
      .parent()
      .text()
      .replace("Episod:", "")
      .trim();
    const tarikhTayangan = $("b:contains('Tarikh Tayangan:')")
      .parent()
      .text()
      .replace("Tarikh Tayangan:", "")
      .trim();
    const waktuSiaran = $("b:contains('Waktu Siaran:')")
      .parent()
      .text()
      .replace("Waktu Siaran:", "")
      .trim();
    const rangkaian = $("b:contains('Rangkaian:')")
      .parent()
      .text()
      .replace("Rangkaian:", "")
      .trim();
    const pengarah = $("b:contains('Pengarah:')")
      .parent()
      .text()
      .replace("Pengarah:", "")
      .trim();
    const produksi = $("b:contains('Produksi:')")
      .parent()
      .text()
      .replace("Produksi:", "")
      .trim();
    const rawThumbnail = $(".entry-content-wrap").find("img").attr("src") || "";
    const thumbnail = resizeImageUrl(rawThumbnail);

    const trendings = $(".PopularPosts")
      .find(".side-item")
      .map((_, trending) => {
        const title = $(trending).find("a").attr("title");
        const rawThumbnail =
          $(trending).find(".entry-image").attr("data-image") || "";
        const thumbnail = resizeImageUrl(rawThumbnail);
        const rawUrl = $("a.entry-inner, .entry-image-wrap").attr("href") || "";
        const slug = rawUrl
          .replace("https://blog.basahjeruk.info/", "")
          .replace(".html", "");
        const dateTime = $(trending).find(".entry-time time").attr("datetime");

        return { title, thumbnail, slug, dateTime };
      })
      .get();

    res.json({
      success: true,
      data: {
        drama: {
          episodeTitle,
          title,
          thumbnail,
          dateTime,
          paragraph,
          episod,
          tarikhTayangan,
          waktuSiaran,
          rangkaian,
          pengarah,
          produksi,
          videoSrc: videoUrls[0] || null, // Ambil yang pertama jika ada
        },
      },
      trending: trendings,
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
