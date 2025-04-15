import { z } from "zod";

export const ShortenUrlSchema = z.object({
  longUrl: z.string().url("Invalid URL format provided."),
});

export type ShortenUrlInput = z.infer<typeof ShortenUrlSchema>;
