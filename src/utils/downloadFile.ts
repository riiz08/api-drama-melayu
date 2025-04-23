import puppeteer from "puppeteer";
import fs from "fs";
import path from "path";

export async function downloadM3U8ViaBrowser(
  videoUrl: string,
  filename: string
): Promise<string | null> {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  const dir = path.resolve(__dirname, "../public/videos");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const filePath = path.join(dir, filename);

  try {
    const buffer = await page.evaluate(async (url) => {
      const res = await fetch(url);
      const arrayBuffer = await res.arrayBuffer();
      return Array.from(new Uint8Array(arrayBuffer));
    }, videoUrl);

    fs.writeFileSync(filePath, Buffer.from(buffer));
    await browser.close();
    return `/videos/${filename}`;
  } catch (error) {
    console.error("❌ Error saat download via browser:", error);
    await browser.close();
    return null;
  }
}
