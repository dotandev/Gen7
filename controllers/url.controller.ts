import { Request, Response } from "express";
import { ShortenUrlSchema } from "../models";
import { getLongUrl, shortenUrl } from "../services";


export class ShortnerController {
  public async createShortUrl(req: Request, res: Response) {
    const parsed = ShortenUrlSchema.safeParse(req.body) as any;
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.errors[0].message });
    }

    const shortCode = await shortenUrl(parsed.data.longUrl);
    const domain = process.env.BASE_URL ?? "http://localhost:3000";
    res.status(200).json({
      longUrl: parsed.data.longUrl,
      shortUrl: `${domain}/${shortCode}`,
    });
  }

  public async redirectToLongUrl(req: Request, res: Response) {
    const { shortCode } = req.params;
    const longUrl = await getLongUrl(shortCode) as string;
    if (!longUrl) {
      res.status(404).json({ error: "Short URL not found." });
    }
    res.redirect(302, longUrl);
  }

}

