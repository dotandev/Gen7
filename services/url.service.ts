import { nanoid } from "nanoid";
import { prisma } from "../db";

export async function shortenUrl(longUrl: string): Promise<string> {
  const existing = await prisma.url.findFirst({ where: { longUrl } });
  if (existing) return existing.shortCode;

  const shortCode = nanoid(7);
  await prisma.url.create({
    data: {
      longUrl,
      shortCode,
    },
  });
  return shortCode;
}

export async function getLongUrl(shortCode: string): Promise<string | null> {
  const record = await prisma.url.findUnique({ where: { shortCode } });
  return record?.longUrl ?? null;
}
