import { ADDRESS } from "../scripts/constants";
const API: string = ADDRESS.concat("/registration");
import { NewUser } from "../scripts/types";

export async function registrationUser(
  data: NewUser,
  setUserExist: any,
  setStateUserRegistred: any
) {
  try {
    const response: any = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: data }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    response.headers.get("Content-Type")
      ? setStateUserRegistred((await response.json()).data)
      : setUserExist(true);
  } catch (e) {
    console.error(e);
  }
}
