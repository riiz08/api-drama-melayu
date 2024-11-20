import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import { createSlug } from "../libs/createSlug";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    //Mengambil query param
    const search = req.query.search;

    // URL yang akan di-scrape, tambahkan query ke dalam URL
    const url = `https://oploverz.ch/?s=${search}`;
    // Fetch data menggunakan axios
    const { data } = await axios.get(url);

    // Load data ke Cheerio
    const $ = cheerio.load(data);

    // Contoh scraping data (mengambil semua yang dibutuhkan)
    const animes: {
      title: string;
      type: string;
      episode: string;
      image: string;
      slug: string;
    }[] = [];

    const lists = $(".bsx");

    lists.each((i, element) => {
      const self = $(element);
      const title = self
        .find(".tt")
        .contents()
        .filter((n, el) => el.type === "text")
        .text()
        .trim();
      const type = self.find(".typez").text();
      const episode = self.find(".epx").text();
      const image = self.find("img").attr("src") || "";
      const fullTitle = self.find("a").attr("title") || "";
      const slug = createSlug(fullTitle);
      animes.push({ title, type, episode, image, slug });
    });

    // Kirim response JSON
    res.json({
      success: true,
      data: animes,
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
