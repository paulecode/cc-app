import { doesHashMatchPassword } from "./compareHashes";
import { createSession } from "./createSession";
import getUser from "./getUser";

export const loginHandler = async (username: string, password: string) => {
  try {
    const user = await getUser(username);

    const loginSuccesful = await doesHashMatchPassword(
      user!.password,
      password,
    );

    if (loginSuccesful) {
      createSession(user!.id);
      return true;
    }

    console.log(username);
  } catch (error) {
    return false;
    console.error("Login not succesful: ", error);
  }
};
