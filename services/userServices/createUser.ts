import prisma from "@/lib/prisma";
// import prisma from "../../lib/prisma";
import { Prisma } from "@prisma/client";

export async function createUser(user: Prisma.UserCreateInput) {
  return await prisma.user.create({ data: user });
}
