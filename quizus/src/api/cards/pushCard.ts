import { ADDRESS } from "../../scripts/constants";
import { Card } from "../../scripts/types";

async function pushCard(
  userId: string,
  data: Card
  // setServerAnswer: BooleanDispatch
) {
  const token = localStorage.getItem("token");

  const API: string = ADDRESS.concat(`/profile/${userId}/push-card/`);

  try {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`response from getFolder() is: ${response.statusText}`);
    }
    //true if user was added
    // const answer = await response.json();
    // setServerAnswer(answer);
    // console.log(answer);
  } catch (e) {
    console.error("error from pushCard()\n", e);
  }
}

export default pushCard;
