"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    const { q } = req.query; // ambil query 'title' dari URL
    if (!q) {
        return void res
            .status(400)
            .json({ message: "Title query parameter is required." });
    }
    try {
        const dramas = await prisma_1.default.drama.findMany({
            where: {
                title: {
                    contains: q, // menggunakan 'contains' untuk pencarian yang lebih fleksibel
                    mode: "insensitive", // agar pencarian tidak case-sensitive
                },
            },
        });
        if (dramas.length === 0) {
            return void res
                .status(404)
                .json({ message: "No dramas found with that title." });
        }
        res.json(dramas);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching dramas." });
    }
});
exports.default = router;
