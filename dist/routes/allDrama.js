"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/dramaRoutes.ts
const express_1 = require("express");
const prisma_1 = __importDefault(require("../prisma"));
const router = (0, express_1.Router)();
router.get("/dramas", async (req, res) => {
    try {
        const dramas = await prisma_1.default.drama.findMany();
        if (!dramas)
            return void res
                .status(404)
                .json({ success: false, messsage: "Drama not found" });
        return void res.status(200).json({ success: true, data: dramas });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error });
    }
});
exports.default = router;
