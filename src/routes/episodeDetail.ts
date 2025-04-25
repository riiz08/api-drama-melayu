// routes/dramaRoutes.ts
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

    const episodeNumCurrent = parseInt(episode.episodeNum || "0");

    // Episode sebelumnya
    const prevEpisode = await prisma.episode
      .findFirst({
        where: {
          dramaId: episode.dramaId,
          episodeNum: {
            not: null,
          },
        },
        orderBy: {
          episodeNum: "desc", // Masih pakai string, tapi filter di JS
        },
      })
      .then((eps) =>
        eps && parseInt(eps.episodeNum || "0") < episodeNumCurrent ? eps : null
      );

    // Episode sesudahnya
    const nextEpisode = await prisma.episode
      .findFirst({
        where: {
          dramaId: episode.dramaId,
          episodeNum: {
            not: null,
          },
        },
        orderBy: {
          episodeNum: "asc",
        },
      })
      .then((eps) =>
        eps && parseInt(eps.episodeNum || "0") > episodeNumCurrent ? eps : null
      );

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
