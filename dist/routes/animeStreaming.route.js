"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const puppeteer_1 = __importDefault(require("puppeteer"));
const router = (0, express_1.Router)();
router.get("/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const url = `${process.env.ENDPOINT_ANIME}/${slug}`;
        const browser = await puppeteer_1.default.launch({ headless: true });
        const page = await browser.newPage();
        // Navigasi ke halaman target
        await page.goto(url, { waitUntil: "networkidle2" });
        await page.waitForSelector("iframe");
        // Ambil atribut src dari iframe
        const videoSource = (await page.$eval("iframe", (iframe) => iframe.src)) ||
            "Video source not found";
        const title = (await page.$eval(".entry-title", (el) => el.textContent)) ||
            "Title not found";
        await browser.close();
        // Kirim response
        res.json({
            success: true,
            data: {
                title: title,
                videoSource: videoSource,
            },
        });
    }
    catch (error) {
        console.error("Terjadi kesalahan:", error);
        // Tutup browser jika ada error
        res.status(500).json({
            success: false,
            message: "Error while scraping data",
        });
    }
});
exports.default = router;
