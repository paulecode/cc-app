import prisma from "@/lib/prisma";

/**
 * Checks if an account exists or not.
 * @param username The username of the account.
 * @returns A boolean indicating whether the account exists or not,
 *          or undefined if an error occurs.
 * @throws Throws an error if there is a problem accessing the database.
 */
export default async function userExists(
  username: string,
): Promise<boolean | undefined> {
  try {
    const user = await prisma.user.findFirst({ where: { username } });
    return !!user;
  } catch (error) {
    console.error("Failed to check if user exist:", error);
    throw new Error("Error accessing database");
  }
}
