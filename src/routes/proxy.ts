// src/routes/proxy.ts
import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const targetUrl = req.query.url as string;
  if (!targetUrl) {
    return void res
      .status(400)
      .json({ success: false, message: "Invalid URL" });
  }

  try {
    const response = await axios.get(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        // Cache-Control header agar Cloudflare cache file
        "Cache-Control": "public, max-age=10800", // Cache selama 3 jam
      },
      responseType: "stream", // ⬅ penting untuk streaming HLS
    });

    res.set(response.headers); // Menyalin header response asli
    res.set("Cache-Control", "public, max-age=10800"); // Pastikan Cloudflare meng-cache
    response.data.pipe(res); // Forward langsung ke client
  } catch (error: any) {
    console.error("Proxy error:", error.message);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch target URL" });
  }
});

export default router;
