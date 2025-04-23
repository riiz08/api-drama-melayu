import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import { upgradePosterUrl } from "../utils/image";
import { createSlug } from "../libs/createSlug";
import prisma from "../prisma";
import { downloadM3U8ViaBrowser } from "../utils/downloadFile";

const router = Router();

router.get("/:year/:month/:slug", async (req: Request, res: Response) => {
  try {
    const { year, month, slug } = req.params;
    const fullSlug = `${year}/${month}/${slug}`;
    const url = `${process.env.ENDPOINT}/${fullSlug}.html`;

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

    page.on("request", async (request) => {
      const resUrl = request.url();

      if (resUrl.includes(".m3u8") || resUrl.includes("filemoon.to")) {
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

    const episodeTitle = $(".blog-post").find("h1.entry-title").text().trim();
    const episodeSlug = createSlug(episodeTitle);
    const dateTime = $(".entry-time").find("time").attr("datetime");
    const paragraph = $(
      "div[style*='box-sizing: border-box'][style*='font-size: 17px']"
    )
      .first()
      .text()
      .trim();
    const title = $("h2").first().text().trim();
    const dramaSlug = createSlug(title);
    const currentEpisode = episodeTitle.match(/Episod\s*(\d+)/i)?.[1] || null;
    const totalEpisodes = $("b:contains('Episod:')")
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
    const thumbnail = upgradePosterUrl(rawThumbnail);

    let savedPath = null;

    try {
      if (videoUrls[0]) {
        console.log("Start download:", videoUrls[0]);
        savedPath = await downloadM3U8ViaBrowser(
          videoUrls[0],
          `${title.replace(/\s+/g, "-").toLowerCase()}-${currentEpisode}.m3u8`
        );
        console.log("✅ File saved at:", savedPath);
      }
    } catch (err) {
      console.error("❌ Error saat download video:", err);
    }

    //Upsert Drama
    const drama = await prisma.drama.upsert({
      where: { slug: dramaSlug },
      update: {},
      create: {
        title,
        description: paragraph,
        thumbnail,
        tarikhTayangan,
        waktuSiaran,
        rangkaian,
        pengarah,
        produksi,
        slug: dramaSlug,
      },
    });

    if (savedPath) {
      // Upsert Episode (hindari duplikat slug)
      await prisma.episode.upsert({
        where: { slug: episodeSlug },
        update: {
          title: episodeTitle,
          episodeNum: currentEpisode,
          videoSrc: savedPath,
          publishedAt: dateTime ? new Date(dateTime) : undefined,
          dramaId: drama.id,
        },
        create: {
          title: episodeTitle,
          slug: episodeSlug,
          episodeNum: currentEpisode,
          videoSrc: savedPath,
          publishedAt: dateTime ? new Date(dateTime) : undefined,
          dramaId: drama.id,
        },
      });
    } else {
      console.warn(`Video not saved, skip episode: ${episodeTitle}`);
    }

    res.json({
      success: true,
      data: {
        drama: {
          episodeTitle,
          title,
          thumbnail,
          dateTime,
          paragraph,
          totalEpisodes,
          tarikhTayangan,
          waktuSiaran,
          rangkaian,
          pengarah,
          produksi,
          videoSrc: videoUrls[0] || null, // Ambil yang pertama jika ada
          savedPath,
          dramaSlug,
          episodeSlug,
          currentEpisode,
        },
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
