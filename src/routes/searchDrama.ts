import { Request, Response, Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const q = req.query.q as string;

    if (!q) {
      return void res
        .status(400)
        .json({ success: false, message: "Query 'q' is required" });
    }

    const dramas = await prisma.drama.findMany({
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
  } catch (error) {
    return void res.status(500).json({ success: false, message: error });
  }
});

export default router;
