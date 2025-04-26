import { Request, Response, Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const { q } = req.query; // ambil query 'title' dari URL

  if (!q) {
    return void res
      .status(400)
      .json({ message: "Title query parameter is required." });
  }

  try {
    const dramas = await prisma.drama.findMany({
      where: {
        title: {
          contains: q as string, // menggunakan 'contains' untuk pencarian yang lebih fleksibel
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching dramas." });
  }
});

export default router;
