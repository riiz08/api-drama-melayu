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
const image_1 = require("../utils/image");
const axios_1 = __importDefault(require("axios"));
const createSlug_1 = require("../libs/createSlug");
const router = (0, express_1.Router)();
router.get("/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const url = `${process.env.ENDPOINT}/${slug}`;
        const { data: html } = await axios_1.default.get(url);
        const $ = cheerio.load(html);
        const dramas = $(".cat-box-content")
            .find("ul li")
            .map((_, drama) => {
            const title = $(drama).find("h2.post-box-title a").text().trim();
            const rawThumbnail = $(drama).find(".post-thumbnail a img").attr("src") || "";
            const thumbnail = (0, image_1.cleanThumbnailUrl)(rawThumbnail);
            const slug = (0, createSlug_1.createSlug)(title);
            return { title, thumbnail, slug };
        })
            .get();
        res.json({
            success: true,
            data: dramas,
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
