import { cookies } from "next/headers";

export async function verifySession() {
  const session = cookies().get("session");

  if (!session) {
    return false;
  }
}
