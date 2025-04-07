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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const createSlug_1 = require("../libs/createSlug");
const router = (0, express_1.Router)();
router.get("/drama-terbaru", async (req, res) => {
    try {
        const url = `${process.env.ENDPOINT}/search/label/sekarang`;
        const { data: html } = await axios_1.default.get(url);
        const $ = cheerio.load(html);
        const dramas = $("article")
            .map((_, element) => {
            const title = $(element)
                .find(".entry-title a")
                .text()
                .replace(/[\t\n]+/g, "")
                .trim();
            const thumb = $(element).find(".entry-image").attr("data-image");
            const date = $(element).find(".entry-time time").text().trim();
            const slug = (0, createSlug_1.createSlug)(title);
            return { title, thumb, date, slug };
        })
            .get();
        res.json({
            success: true,
            data: dramas,
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
