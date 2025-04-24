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
        const q = req.query.q;
        if (!q) {
            return void res
                .status(400)
                .json({ success: false, message: "Query 'q' is required" });
        }
        const dramas = await prisma_1.default.drama.findFirst({
            where: {
                title: {
                    contains: q,
                    mode: "insensitive",
                },
            },
        });
        if (!dramas) {
            return void res
                .status(404)
                .json({ success: false, message: "Drama not found!" });
        }
        res.status(200).json({ success: true, dramas });
    }
    catch (error) {
        return void res.status(500).json({ success: false, message: error });
    }
});
exports.default = router;
