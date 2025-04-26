"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
router.get("/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        // Cari drama berdasarkan slug
        const drama = await prisma_1.default.drama.findUnique({
            where: { slug },
        });
        if (!drama) {
            return void res.status(404).json({
                success: false,
                message: "Drama not found",
            });
        }
        // Ambil daftar episode berdasarkan dramaId
        const episodes = await prisma_1.default.episode.findMany({
            where: { dramaId: drama.id },
            orderBy: {
                publishedAt: "asc",
            },
            select: {
                title: true,
                slug: true,
                episodeNum: true,
                videoSrc: true,
                publishedAt: true,
            },
        });
        res.json({
            success: true,
            data: {
                drama,
                episodes,
            },
        });
    }
    catch (error) {
        console.error("Error fetching episodes:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.default = router;
