import { Request, Response } from "express";
import { ShortenUrlSchema } from "../models";
import { ShortenerService } from "../services";


const shortenerService = new ShortenerService()

const {
  shortenUrl,
  getLongUrl,
  incrementClick,
  getClicks
} = shortenerService

const domain = process.env.BASE_URL ?? "http://localhost:3000";

export class ShortenerController {
  public async createShortUrl(req: Request, res: Response) {
    const parsed = ShortenUrlSchema.safeParse(req.body) as any;
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
    }

    const shortCode = await shortenUrl(parsed.data.longUrl);
   
    res.status(200).json({
      longUrl: parsed.data.longUrl,
      shortUrl: `${domain}/${shortCode}`,
    });
  }


  public async redirectToLongUrl(req: Request, res: Response) {
    const { shortCode } = req.params;

    const userAgent = req.get("User-Agent") || "unknown";
    const referrer = req.get("Referer") || undefined;
    const ip = req.ip;

    const longUrl = await incrementClick(shortCode, userAgent, ip, referrer);

    if (!longUrl) {
      res.status(404).json({ error: "Short URL not found." });
    }

    res.redirect(302, longUrl as string);
  }

  public async getURLClicks(req: Request, res: Response) {
    const { shortCode } = req.params;

    const count = await getClicks(shortCode)

    if (!count) {
      res.status(404).json({ error: "Short URL not found." });
    }

    res.status(200).json({
      noOfClicks: count,
      shortUrl: `${domain}/${shortCode}`,
    });
  }

}

