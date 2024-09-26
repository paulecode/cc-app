"use server";

import { redirect } from "next/navigation";
import { loginHandler } from "./helpers/loginHandler";

export const loginAction = async (prevState: any, formData: FormData) => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  let redirectToHome = false;

  if (!username || !password) {
    return "Username or password missing";
  }

  try {
    const loginSuccesful = await loginHandler(username, password);

    if (loginSuccesful) {
      redirectToHome = true;
      return "Logging in...";
    } else {
      return "Invalid credentials";
    }
  } catch (error) {
    console.error("Login not succesful: ", error);
    return "Server error";
  } finally {
    if (redirectToHome) {
      redirect("/home");
    }
  }
};
