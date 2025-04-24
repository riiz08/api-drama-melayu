import { Router, Request, Response } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    // Cari drama berdasarkan slug
    const drama = await prisma.drama.findUnique({
      where: { slug },
    });

    if (!drama) {
      return void res.status(404).json({
        success: false,
        message: "Drama not found",
      });
    }

    // Ambil daftar episode berdasarkan dramaId
    const episodes = await prisma.episode.findMany({
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
  } catch (error) {
    console.error("Error fetching episodes:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
