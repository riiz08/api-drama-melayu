import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const targetUrl = req.query.url as string;

  if (!targetUrl || !targetUrl.endsWith(".m3u8")) {
    return void res.status(400).send("Invalid URL");
  }

  try {
    const { data } = await axios.get(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      responseType: "text",
    });

    const baseUrl = targetUrl.substring(0, targetUrl.lastIndexOf("/") + 1);

    const rewritten = (data as string).replace(
      /^(?!#)(.*\.ts.*)$/gm,
      (line) => {
        // Jika sudah absolute, jangan ubah
        if (/^https?:\/\//.test(line)) return line;
        return baseUrl + line;
      }
    );

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(rewritten);
  } catch (error: any) {
    console.error("Proxy rewrite error:", error.message);
    res.status(500).send("Failed to proxy m3u8");
  }
});

export default router;
