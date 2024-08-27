import { ENV } from "@/lib/env";
import jwt from "jsonwebtoken";

/**
 * Generates a signed JWT token with a sub:payload pattern
 * @param {number} payload - the subject of the JWT,
 * in this project the userId
 * @returns {string} the signed JWT
 */
export function generateToken(payload: number): string {
  const token = jwt.sign({ sub: payload }, ENV.JWT_SECRET);

  return token;
}
