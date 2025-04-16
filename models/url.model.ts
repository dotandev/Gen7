import { z } from "zod";

export const ShortenUrlSchema = z.object({
    longUrl: z.string().url("Invalid URL format."),
    expiresInDays: z.number().int().positive().optional(),
  });
  

export type ShortenUrlInput = z.infer<typeof ShortenUrlSchema>;
