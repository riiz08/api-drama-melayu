"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadM3U8ViaBrowser = downloadM3U8ViaBrowser;
const puppeteer_1 = __importDefault(require("puppeteer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function downloadM3U8ViaBrowser(videoUrl, filename) {
    const browser = await puppeteer_1.default.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    const dir = path_1.default.resolve(__dirname, "../public/videos");
    if (!fs_1.default.existsSync(dir)) {
        fs_1.default.mkdirSync(dir, { recursive: true });
    }
    const filePath = path_1.default.join(dir, filename);
    try {
        const buffer = await page.evaluate(async (url) => {
            const res = await fetch(url);
            const arrayBuffer = await res.arrayBuffer();
            return Array.from(new Uint8Array(arrayBuffer));
        }, videoUrl);
        fs_1.default.writeFileSync(filePath, Buffer.from(buffer));
        await browser.close();
        return `/videos/${filename}`;
    }
    catch (error) {
        console.error("❌ Error saat download via browser:", error);
        await browser.close();
        return null;
    }
}
