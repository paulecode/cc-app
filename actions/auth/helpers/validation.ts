import { z } from "zod";

export const jwtSchema = z.object({
  sub: z.string().transform((x) => parseInt(x)),
});
