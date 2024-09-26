import bcrypt from "bcryptjs";

/**
 *  Compares password with hash
 *
 * @param {string} hash - The hash to compare against the password.
 * @param {string} password - The password to test against the hash.
 * @returns {Promise<boolean>} Promise that resolves to true if password matches the hash, otherwise false.
 */
export async function doesHashMatchPassword(
  hash: string,
  password: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("bcrypt comparison failed: ", error);
    throw new Error("Error occured while trying to compare passsword");
  }
}
