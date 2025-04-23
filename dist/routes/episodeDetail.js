"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/dramaRoutes.ts
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
router.get("/episode/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const existingEpisode = await prisma_1.default.episode.findUnique({
            where: { slug },
        });
        if (!existingEpisode)
            return void res
                .status(404)
                .json({ success: false, messsage: "Episode not found" });
        const dramaDetail = await prisma_1.default.drama.findUnique({
            where: { id: existingEpisode.dramaId },
        });
        const episode = await prisma_1.default.episode.findUnique({
            where: { slug },
        });
        return void res
            .status(200)
            .json({ success: true, data: dramaDetail, episode });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error });
    }
});
exports.default = router;
