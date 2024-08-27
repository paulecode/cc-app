import prisma from "@/lib/prisma";
import { Prisma, User } from "@prisma/client";

/**
 * Creates a new user in the database
 *
 * @param {Prisma.UserCreateInput} user - What you pass to the data field
 * @returns {Promise<Prisma.User>} promise that resolves to the new user
 */
export async function createUser(user: Prisma.UserCreateInput): Promise<User> {
  try {
    return await prisma.user.create({ data: user });
  } catch (error) {
    console.error("Failed to create user:", error);
    throw error;
  }
}
