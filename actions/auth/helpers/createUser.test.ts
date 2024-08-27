import { expect, test, vi } from "vitest";
import { createUser } from "./createUser";
import prisma from "@/lib/__mocks__/prisma";

vi.mock("@/lib/prisma");

test("createUser works if it, ", async () => {
  const newUser = { username: "paul", password: "123456" };
  prisma.user.create.mockResolvedValue({ ...newUser, id: 1 });
  const createdUser = await createUser(newUser);
  expect(createdUser).toStrictEqual({ ...newUser, id: 1 });
});
