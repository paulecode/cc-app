import { z } from "zod";

export const jwtSchema = z.object({
  sub: z.number(),
});
