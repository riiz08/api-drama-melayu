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
        // Ambil semua episode dari drama yang sama
        const allEpisodes = await prisma_1.default.episode.findMany({
            where: { dramaId: episode.dramaId },
            select: { id: true, slug: true, title: true },
        });
        // Urutkan episode secara manual berdasarkan angka di slug
        const extractEpisodeNum = (slug) => {
            const match = slug.match(/(\d+)(?!.*\d)/); // ambil angka terakhir dari slug
            return match ? parseInt(match[1], 10) : NaN;
        };
        const sortedEpisodes = allEpisodes
            .map((ep) => ({
            ...ep,
            episodeNum: extractEpisodeNum(ep.slug),
        }))
            .filter((ep) => !isNaN(ep.episodeNum))
            .sort((a, b) => a.episodeNum - b.episodeNum);
        // Cari episode yang sebelumnya dan berikutnya berdasarkan urutan yang benar
        const currentEpisodeNum = extractEpisodeNum(episode.slug);
        const prevEpisode = sortedEpisodes.find((ep) => ep.episodeNum === currentEpisodeNum - 1);
        const nextEpisode = sortedEpisodes.find((ep) => ep.episodeNum === currentEpisodeNum + 1);
        const drama = await prisma_1.default.drama.findFirst({
            where: {
                id: episode.dramaId,
            },
        });
        res.json({
            drama,
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
