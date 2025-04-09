"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cheerio = __importStar(require("cheerio"));
const puppeteer_1 = __importDefault(require("puppeteer"));
const image_1 = require("../utils/image");
const router = (0, express_1.Router)();
router.get("/*", async (req, res) => {
    try {
        const slug = req.params[0];
        const url = `${process.env.ENDPOINT}/${slug}.html`;
        const browser = await puppeteer_1.default.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36");
        const videoUrls = [];
        await page.setRequestInterception(true);
        page.on("request", (request) => request.continue());
        page.on("response", async (response) => {
            const responseUrl = response.url();
            if (responseUrl.includes("master.m3u8") &&
                !videoUrls.includes(responseUrl)) {
                videoUrls.push(responseUrl);
            }
        });
        await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const html = await page.content();
        await browser.close();
        const $ = cheerio.load(html);
        const title = $(".entry-title").first().text().trim();
        const rawThumb = $(".entry-content").find("img").attr("src") ?? "";
        const thumb = (0, image_1.resizeImageUrl)(rawThumb);
        res.json({
            success: true,
            title,
            thumb,
            videoSources: videoUrls,
        });
    }
    catch (error) {
        console.error("Scraping Error:", error);
        res.status(500).json({
            success: false,
            message: "Error while scraping data",
        });
    }
});
exports.default = router;
