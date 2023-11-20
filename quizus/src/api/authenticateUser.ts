import { ADDRESS } from "../scripts/constants";
const API: string = ADDRESS.concat("/login");
import { LoginType } from "../scripts/types";

type Dispatch = React.Dispatch<React.SetStateAction<boolean>>;
type Token = React.Dispatch<React.SetStateAction<string>>;

async function authenticateUser(
  data: LoginType,
  setIsUserExist: Dispatch,
  setIsCorrectPassword: Dispatch,
  setUserId: Token,
  setIsAuthenticated: Token
) {
  const response = await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: data }),
  });

  if (!response) {
    throw new Error("error to server conection");
  }

  const { username, password, id, token } = await response.json();

  setIsUserExist(username);
  setIsCorrectPassword(password);

  if (username && password) {
    setIsAuthenticated(token);
    setUserId(id);
    localStorage.setItem("token", token);
  }
}

export default authenticateUser;
