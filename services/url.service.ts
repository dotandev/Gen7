// import { nanoid } from "nanoid";
import { nanoid } from 'nanoid-cjs';
import { prisma } from "../db";

export class ShortenerService {
  
  public async shortenUrl(longUrl: string): Promise<string> {
    const existing = await prisma.url.findFirst({ where: { longUrl } });
    if (existing) return existing.shortCode;
  
    const shortCode = nanoid(7);
        // const shortCode = 'y'

    await prisma.url.create({
      data: {
        longUrl,
        shortCode,
      },
    });
    return shortCode;
  }
  
  public async getLongUrl(shortCode: string): Promise<string | null> {
    const record = await prisma.url.findUnique({ where: { shortCode } });
    return record?.longUrl ?? null;
  }
  
  public async incrementClick(shortCode: string, userAgent: string, ip?: string, referrer?: string) {
    const url = await prisma.url.findUnique({ where: { shortCode } });
    if (!url) return null;
  
    await prisma.url.update({
      where: { shortCode },
      data: {
        clickCount: { increment: 1 },
        visits: {
          create: {
            userAgent,
            referrer,
            ip,
          },
        },
      },
    });
  
    return url.longUrl;
  }

}
