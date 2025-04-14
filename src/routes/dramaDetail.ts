import { Router, Request, Response } from "express";
import * as cheerio from "cheerio";
import { cleanThumbnailUrl } from "../utils/image";
import axios from "axios";
import { createSlug } from "../libs/createSlug";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const url = `${process.env.ENDPOINT}/category/${slug}`;
    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);

    const pagination = $(".pagination");
    const pageInfo = pagination.find(".pages").text();
    const [current, total] = pageInfo
      .match(/\d+/g)
      ?.map((n) => parseInt(n)) || [1, 1];

    const dramas = $("article.item-list")
      .map((_, drama) => {
        const title = $(drama).find("h2.post-box-title a").text().trim();
        const rawThumbnail =
          $(drama).find(".post-thumbnail a img").attr("src") || "";
        const thumbnail = cleanThumbnailUrl(rawThumbnail);
        const slug = createSlug(title);

        return { title, thumbnail, slug };
      })
      .get();

    const recentPosts = $("#recent-posts-5 ul li")
      .map((_, recent) => {
        const title = $(recent).find("a").text().trim();
        const slug = createSlug(title);

        return { title, slug };
      })
      .get();

    res.json({
      success: true,
      currentPage: current,
      totalPages: total,
      data: dramas,
      recentPosts,
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
