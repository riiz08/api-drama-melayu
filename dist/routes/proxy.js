"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/proxy.ts
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return void res
            .status(400)
            .json({ success: false, message: "Invalid URL" });
    }
    try {
        const response = await axios_1.default.get(targetUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
                // Cache-Control header agar Cloudflare cache file
                "Cache-Control": "public, max-age=10800", // Cache selama 3 jam
            },
            responseType: "stream", // ⬅ penting untuk streaming HLS
        });
        res.set(response.headers); // Menyalin header response asli
        res.set("Cache-Control", "public, max-age=10800"); // Pastikan Cloudflare meng-cache
        response.data.pipe(res); // Forward langsung ke client
    }
    catch (error) {
        console.error("Proxy error:", error.message);
        res
            .status(500)
            .json({ success: false, message: "Failed to fetch target URL" });
    }
});
exports.default = router;
