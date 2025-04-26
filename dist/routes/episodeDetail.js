"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
router.get("/episode/:slug", async (req, res) => {
    const { slug } = req.params;
    try {
        const episode = await prisma_1.default.episode.findUnique({
            where: { slug },
        });
        if (!episode) {
            return void res.status(404).json({ error: "Episode not found" });
        }
        if (episode.episodeNum == null) {
            return void res.status(400).json({ error: "Episode number is missing." });
        }
        const episodeNumCurrent = episode.episodeNum; // Aman karena sudah dicek
        const prevEpisode = await prisma_1.default.episode.findFirst({
            where: {
                dramaId: episode.dramaId,
                episodeNum: {
                    lt: episodeNumCurrent,
                },
            },
            orderBy: {
                episodeNum: "desc",
            },
        });
        const nextEpisode = await prisma_1.default.episode.findFirst({
            where: {
                dramaId: episode.dramaId,
                episodeNum: {
                    gt: episodeNumCurrent,
                },
            },
            orderBy: {
                episodeNum: "asc",
            },
        });
        res.json({
            episode,
            prevEpisode: prevEpisode
                ? { slug: prevEpisode.slug, title: prevEpisode.title }
                : null,
            nextEpisode: nextEpisode
                ? { slug: nextEpisode.slug, title: nextEpisode.title }
                : null,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.default = router;
