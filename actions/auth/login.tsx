"use server";

import { doesHashMatchPassword } from "./helpers/compareHashes";
import { createSession } from "./helpers/createSession";
import getUser from "./helpers/getUser";
import { loginHandler } from "./helpers/loginHandler";

export const loginAction = async (prevState: any, formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username || !password) {
    // handle missing
    return;
  }

  try {
    const loginSuccesful = await loginHandler(username, password);

    if (loginSuccesful) {
      return "Logging in...";
    } else {
      return "Invalid credentials";
    }
  } catch (error) {
    return "Server error";
    console.error("Login not succesful: ", error);
  }
};
