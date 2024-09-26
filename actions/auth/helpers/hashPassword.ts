import bcrypt from "bcryptjs";

/**
 * Hashes a password using bcryptjs.
 *
 * @param password - String to hash
 * @returns promise which resolves to hashed string.
 * @throws Will throw error if hashing fails.
 */
export async function hashPassword(password: string): Promise<string> {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error("Hashing failed: ", error);
    throw new Error("Hashing failed");
  }
}
