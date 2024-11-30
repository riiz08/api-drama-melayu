import { Router, Request, Response } from "express";
import axios from "axios";
import * as cheerio from "cheerio";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const url = `${process.env.ENDPOINT_ANIME}/`;

    // Fetch HTML dari URL menggunakan Axios
    const { data: html } = await axios.get(url);

    // Muat HTML ke dalam Cheerio
    const $ = cheerio.load(html);

    const listAnimes = $(".section .wpop-items .wpop-alltime > ul > li").map(
      (_, anime) => {
        const title = $(anime).find("h4").text();

        return { title };
      }
    );

    res.json({
      success: true,
      data: listAnimes,
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
