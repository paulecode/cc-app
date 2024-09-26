import * as jose from "jose";
import { ENV } from "@/lib/env";
import { jwtSchema } from "./validation";

/**
 * Verifies a jwt token's signature, and decodes the token with the sub:id payload structure
 *
 * @param {string} token - JWT token to decode and verify.
 * @returns {number} userId if signature is vaild
 * @throws {Error} Throws error if token signature is invalid or has incorrect structure.
 */
export async function decodeToken(token: string): Promise<number> {
  const secret = new TextEncoder().encode(ENV.JWT_SECRET);
  const { payload } = await jose.jwtVerify(token, secret, {
    maxTokenAge: "1d",
  });

  console.log(payload);
  const result = jwtSchema.safeParse(payload);

  if (!result.success) {
    console.error("Zod validation failed: ", result.error.format);
    throw new Error(`Invalid token structure: ${result.error.message}`);
  }

  const { sub } = result.data;
  return sub;
}
