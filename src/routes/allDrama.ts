// routes/dramaRoutes.ts
import { Request, Response, Router } from "express";
import prisma from "../prisma";

const router = Router();

router.get("/dramas", async (req: Request, res: Response) => {
  try {
    const dramas = await prisma.drama.findMany();

    if (!dramas)
      return void res
        .status(404)
        .json({ success: false, messsage: "Drama not found" });

    return void res.status(200).json({ success: true, data: dramas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error });
  }
});

export default router;
