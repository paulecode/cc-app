"use server";

import { createUser } from "./helpers/createUser";
import userExists from "./helpers/userExists";
import { hashPassword } from "./helpers/hashPassword";
import { loginHandler } from "./helpers/loginHandler";
import { loginAction } from "./login";

/**
@param {string} username - A username string
@param {string} password - A username string
**/
export default async function register(username: string, password: string): Promise<void> {
  try {
    // 1. Check if username is taken
    if (await userExists(username)) {
      // handle user exists
      throw new Error("User exists");
    }

    // 2. Hash password
    const hashedPassword = await hashPassword(password);
    // 3. Store user in database

    const newUser = await createUser({ username, password: hashedPassword });
    // 4. Call login

    await loginHandler(username, password);
  } catch (error) {
    console.error("Something went wrong while registering: ", error);
    throw error;
  }
}
