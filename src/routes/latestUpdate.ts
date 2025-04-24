import { Router, Request, Response } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 14;
    const skip = (page - 1) * limit;

    const [total, episodes] = await Promise.all([
      prisma.episode.count(),
      prisma.episode.findMany({
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
  } catch (error) {
    console.error("Error fetching latest update:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
