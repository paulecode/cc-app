"use server";
import { generateToken } from "@/actions/auth/helpers/generateJWT";
import { cookies } from "next/headers";

/**
 * Generates a token and stores it in httpOnly cookie
 * @param {number} userId - the user id to put in the token
 * @returns {void} `void`
 */
export async function createSession(userId: number): Promise<void> {
  console.log("created session");
  const session = await generateToken(userId);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
}
