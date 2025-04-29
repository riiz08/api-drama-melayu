import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const targetUrl = req.query.url as string;

  if (!targetUrl || !targetUrl.endsWith(".m3u8")) {
    return void res.status(400).send("Invalid URL");
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0", // spoof UA
      },
      responseType: "text",
    });

    const baseUrl = new URL(targetUrl).origin;
    const m3u8Content = response.data as string;

    // Rewrite semua URI (biasanya segment .ts atau nested .m3u8)
    const rewritten = m3u8Content.replace(
      /(.*\.ts)/g,
      (match) => `${baseUrl}/${match}`
    );

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(rewritten);
  } catch (err: any) {
    console.error("Rewrite error:", err.message);
    res.status(500).send("Failed to rewrite m3u8");
  }
});

export default router;
