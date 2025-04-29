import { Router, Request, Response } from "express";
import axios from "axios";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const targetUrl = req.query.url as string;

  if (!targetUrl || !targetUrl.includes(".m3u8")) {
    return void res.status(400).send("Invalid URL");
  }

  try {
    console.log("Proxy fetching:", targetUrl);

    const { data } = await axios.get(targetUrl, {
      headers: {
        Accept: "*/*",
        "Accept-Encoding": "gzip, deflate, br, zstd",
        "Accept-Language":
          "id-ID,id;q=0.9,en-GB;q=0.8,en;q=0.7,ar-EG;q=0.6,ar;q=0.5,fil-PH;q=0.4,fil;q=0.3,en-US;q=0.2",
        "Cache-Control": "no-cache", // Tidak cache m3u8 langsung
        Origin: "https://kits8.net",
        Pragma: "no-cache",
        Referer: "https://kits8.net/",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "cross-site",
        "User-Agent":
          "Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1",
      },
      responseType: "text",
      timeout: 10000, // biar request gak nungguin lama
    });

    // Validasi apakah file beneran m3u8
    if (!data.includes("#EXTM3U")) {
      throw new Error("Invalid .m3u8 content or expired link");
    }

    const baseUrl = targetUrl.substring(0, targetUrl.lastIndexOf("/") + 1);

    // Rewrite all relative URLs to absolute
    const rewritten = (data as string).replace(/^(?!#)(.*)$/gm, (line) => {
      line = line.trim();
      if (line === "" || line.startsWith("#")) return line;
      if (/^https?:\/\//.test(line)) return line; // Kalau sudah absolut
      return baseUrl + line;
    });

    // Header Cache-Control untuk Cloudflare caching
    res.setHeader("Cache-Control", "public, max-age=10800, immutable"); // Cache selama 3 jam untuk .m3u8 file
    res.setHeader("Expires", new Date(Date.now() + 10800 * 1000).toUTCString()); // Expires dalam 3 jam
    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(rewritten);
  } catch (error: any) {
    console.error("Proxy rewrite error:", error.message);
    res.status(500).send("Failed to proxy m3u8: " + error.message);
  }
});

export default router;
