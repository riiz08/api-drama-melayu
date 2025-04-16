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
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const router = (0, express_1.Router)();
router.get("/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const url = `${process.env.ENDPOINT}/${slug}`;
        const { data: html } = await axios_1.default.get(url);
        const $ = cheerio.load(html);
        const title = $("h1.name.post-title span").text().trim();
        const video = $("div.single-post-video iframe").attr("src") || "";
        const episode = $("div.entry")
            .find("div:contains('Episod:')")
            .text()
            .replace("Episod:", "")
            .trim();
        const airDate = $("div.entry")
            .find("div:contains('Tarikh Tayangan:')")
            .text()
            .replace("Tarikh Tayangan:", "")
            .trim();
        const schedule = $("div.entry")
            .find("div:contains('Waktu Siaran:')")
            .text()
            .replace("Waktu Siaran:", "")
            .trim();
        const director = $("div.entry")
            .find("div:contains('Pengarah:')")
            .text()
            .replace("Pengarah:", "")
            .trim();
        const production = $("div.entry")
            .find("div:contains('Produksi:')")
            .text()
            .replace("Produksi:", "")
            .trim();
        const uploadDate = $("meta[itemprop='uploadDate']").attr("content") || "";
        const duration = $("meta[itemprop='duration']").attr("content") || "";
        const thumbnailUrl = $("meta[itemprop='thumbnailUrl']").attr("content") || "";
        // Ambil link anchor (judul utama drama)
        const anchorEl = $("div.entry").find("a[href*='drama-dia-imamku']");
        const dramaTitle = anchorEl.first().text().trim();
        const dramaUrl = anchorEl.first().attr("href") || "";
        const dramaSlug = dramaUrl
            .replace(/^https:\/\/kepalabergetar\.cfd\//, "")
            .replace(/\/$/, "");
        const trendingDramas = $(".widget-container .textwidget ol li")
            .map((_, el) => {
            const title = $(el).find("a").text().trim();
            const href = $(el).find("a").attr("href") || "";
            const slug = href
                .replace(/^https:\/\/kepalabergetar\.cfd\//, "")
                .replace(/\/$/, ""); // hapus trailing slash
            return { title, slug };
        })
            .get();
        res.json({
            success: true,
            data: {
                title,
                video,
                episode,
                airDate,
                schedule,
                director,
                production,
                uploadDate,
                duration,
                thumbnailUrl,
                dramaTitle,
                dramaSlug,
            },
            trending: trendingDramas,
        });
    }
    catch (error) {
        console.error("Scraping Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to scrape episode detail.",
        });
    }
});
exports.default = router;
