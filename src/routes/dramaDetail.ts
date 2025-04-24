// routes/dramaRoutes.ts
import { Request, Response, Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/drama/:slug", async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const existingEpisode = await prisma.episode.findUnique({
      where: { slug },
    });

    if (!existingEpisode)
      return void res
        .status(404)
        .json({ success: false, messsage: "Episode not found" });

    const dramaDetail = await prisma.drama.findUnique({
      where: { id: existingEpisode.dramaId },
    });

    const episode = await prisma.episode.findUnique({
      where: { slug },
    });

    return void res
      .status(200)
      .json({ success: true, data: dramaDetail, episode });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
