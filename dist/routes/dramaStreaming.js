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
const puppeteer_1 = __importDefault(require("puppeteer")); // ✅ Import HTTPRequest di sini
const image_1 = require("../utils/image");
const createSlug_1 = require("../libs/createSlug");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
router.get("/:year/:month/:slug", async (req, res) => {
    try {
        const { year, month, slug } = req.params;
        const fullSlug = `${year}/${month}/${slug}`;
        const url = `${process.env.ENDPOINT}/${fullSlug}.html`;
        const browser = await puppeteer_1.default.launch({
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36");
        const videoUrls = [];
        await page.setRequestInterception(true);
        page.on("request", (request) => {
            // ✅ Typing benar
            const resUrl = request.url();
            if (resUrl.includes(".m3u8") || resUrl.includes("filemoon.to")) {
                if (!videoUrls.includes(resUrl)) {
                    videoUrls.push(resUrl);
                }
            }
            request.continue(); // ✅ Wajib panggil continue
        });
        await page.goto(url, { waitUntil: "networkidle2", timeout: 0 });
        await new Promise((resolve) => setTimeout(resolve, 3000)); // ✅ Lebih efisien daripada Promise manual
        const html = await page.content();
        await browser.close();
        const $ = cheerio.load(html);
        const episodeTitle = $(".blog-post").find("h1.entry-title").text().trim();
        const episodeSlug = (0, createSlug_1.createSlug)(episodeTitle);
        const dateTime = $(".entry-time").find("time").attr("datetime");
        const paragraph = $("div[style*='box-sizing: border-box'][style*='font-size: 17px']")
            .first()
            .text()
            .trim();
        const title = $("h2").first().text().trim();
        const dramaSlug = (0, createSlug_1.createSlug)(title);
        const currentEpisodeMatch = episodeTitle.match(/Episod\s*(\d+)/i)?.[1] || null;
        const currentEpisode = currentEpisodeMatch
            ? parseInt(currentEpisodeMatch, 10)
            : null;
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
        const thumbnail = (0, image_1.upgradePosterUrl)(rawThumbnail);
        // Upsert Drama
        const drama = await prisma_1.default.drama.upsert({
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
        if (videoUrls.length > 0) {
            // Upsert Episode
            await prisma_1.default.episode.upsert({
                where: { slug: episodeSlug },
                update: {
                    title: episodeTitle,
                    episodeNum: currentEpisode,
                    videoSrc: videoUrls[0],
                    publishedAt: dateTime ? new Date(dateTime) : undefined,
                    dramaId: drama.id,
                },
                create: {
                    title: episodeTitle,
                    slug: episodeSlug,
                    episodeNum: currentEpisode,
                    videoSrc: videoUrls[0],
                    publishedAt: dateTime ? new Date(dateTime) : undefined,
                    dramaId: drama.id,
                },
            });
        }
        else {
            console.warn(`Video not found. Skipping episode: ${episodeTitle}`);
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
                    videoSrc: videoUrls[0] || null,
                    dramaSlug,
                    episodeSlug,
                    currentEpisode,
                },
            },
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
