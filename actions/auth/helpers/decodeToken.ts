import { ENV } from "@/lib/env";
import jwt from "jsonwebtoken";
import { jwtSchema } from "./validation";

/**
 * Verifies a jwt token's signature, and decodes the token with the sub:id payload structure
 *
 * @param {string} token - JWT token to decode and verify.
 * @returns {number} userId if signature is vaild
 * @throws {Error} Throws error if token signature is invalid or has incorrect structure.
 */
export function decodeToken(token: string): number {
  const decodedToken = jwt.verify(token, ENV.JWT_SECRET, {
    maxAge: "1w",
  });

  const result = jwtSchema.safeParse(decodedToken);

  if (!result.success) {
    console.error("Zod validation failed: ", result.error.format);
    throw new Error(`Invalid token structure: ${result.error.message}`);
  }

  const { sub } = result.data;
  return sub;
}
