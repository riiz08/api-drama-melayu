"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const puppeteer_1 = __importDefault(require("puppeteer"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        //Mengambil query param
        const search = req.query.search;
        // URL yang akan di-scrape, tambahkan query ke dalam URL
        const url = `${process.env.ENDPOINT_ANIME}/?s=${search}`;
        const browser = await puppeteer_1.default.launch({ headless: true });
        const page = await browser.newPage();
        await page.goto(url, { waitUntil: "networkidle2" });
        await page.waitForSelector(".bs");
        const animes = await page.$$eval(".bs", (listAnime) => listAnime.map((anime) => {
            const title = anime
                .querySelector(".tt")
                ?.childNodes[0]?.textContent?.replace(/[\t\n]+/g, "")
                .trim() || "";
            const fullTitle = anime
                .querySelector("h2")
                ?.textContent?.replace(/[\t\n]+/g, "")
                .trim() || "";
            const slug = fullTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            const thumbnailSrc = anime.querySelector("img")?.getAttribute("src");
            const thumbnail = thumbnailSrc?.replace(/\?resize=\d+,\d+$/, "");
            const type = anime.querySelector(".typez")?.textContent;
            const episode = anime.querySelector(".epx")?.textContent;
            const lang = anime.querySelector(".sb")?.textContent;
            return { title, slug, thumbnail, type, episode, lang };
        }));
        await browser.close();
        // Kirim response JSON
        res.json({
            success: true,
            data: animes,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error while scraping data",
        });
    }
});
exports.default = router;
