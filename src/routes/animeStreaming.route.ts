import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const url = `${process.env.ENDPOINT_ANIME}/${slug}`;

    const { data } = await axios.get(url);

    const $ = cheerio.load(data);

    const videoSource = $("iframe").attr("src");

    const title = $(".entry-title").text();

    // Kirim response
    res.json({
      success: true,
      data: {
        title: title,
        videoSource: videoSource,
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
