import { ADDRESS } from "../scripts/constants";
import { AnswerAuthorization } from "../scripts/types";

type Dispatch = React.Dispatch<React.SetStateAction<AnswerAuthorization>>;

async function autorization(userId: string, setServerAnswer: Dispatch) {
  const token = localStorage.getItem("token");

  if (!userId || !token) return null;
  const API: string = ADDRESS.concat(`/profile/${userId}/`);

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `response from function autorization is: ${response.statusText}`
      );
    }
    const answer = await response.json();
    setServerAnswer(answer);
  } catch (e) {
    console.error("error from autorization user\n", e);
  }
}

export default autorization;
