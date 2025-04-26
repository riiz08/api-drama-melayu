import { Request, Response, Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/episode/:slug", async (req: Request, res: Response) => {
  const { slug } = req.params;

  try {
    const episode = await prisma.episode.findUnique({
      where: { slug },
    });

    if (!episode) {
      return void res.status(404).json({ error: "Episode not found" });
    }

    if (episode.episodeNum == null) {
      return void res.status(400).json({ error: "Episode number is missing." });
    }

    const episodeNumCurrent = episode.episodeNum; // Aman karena sudah dicek

    const prevEpisode = await prisma.episode.findFirst({
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

    const nextEpisode = await prisma.episode.findFirst({
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
