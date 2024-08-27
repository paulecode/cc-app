// TODO add messages
import { z } from "zod";
const registerFormSchema = z.object({
  username: z.string().min(4, { message: "Too short" }).max(8),
  password: z.string().min(4).max(8),
});

const loginFormSchema = z.object({
  username: z.string().min(4).max(8),
  password: z.string().min(4).max(8),
});
export { registerFormSchema, loginFormSchema };
