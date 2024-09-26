import prisma from "@/lib/prisma";
import { User } from "@prisma/client";

/**
 * Gets a user by uesrname
 * @param username The username of the account.
 * @returns {Prisma.User} Prisma User object
 * @throws Throws an error if there is a problem accessing the database or if the username doesn't correspond to any user.
 */
export default async function getUser(username: string): Promise<User | null> {
  try {
    const user = await prisma.user.findFirstOrThrow({ where: { username } });
    return user;
  } catch (error) {
    console.error("Failed to retrieve user: ", error);
    throw new Error("Error accessing database");
  }
}
