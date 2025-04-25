"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 14;
        const skip = (page - 1) * limit;
        const [total, episodes] = await Promise.all([
            prisma_1.default.episode.count(),
            prisma_1.default.episode.findMany({
                orderBy: { publishedAt: "desc" },
                skip,
                take: limit,
                select: {
                    id: true,
                    title: true,
                    slug: true,
                    episodeNum: true,
                    publishedAt: true,
                    videoSrc: true,
                    drama: {
                        select: {
                            title: true,
                            slug: true,
                            thumbnail: true,
                        },
                    },
                },
            }),
        ]);
        res.json({
            success: true,
            data: {
                episodes,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                },
            },
        });
    }
    catch (error) {
        console.error("Error fetching latest update:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
});
exports.default = router;
