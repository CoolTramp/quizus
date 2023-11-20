import { ADDRESS } from "../../scripts/constants";
import { Mark } from "../../scripts/types";

async function markCard(
  userId: string,
  data: Mark,
  setServerAnswer: (x: boolean) => void
) {
  const token = localStorage.getItem("token");

  if (!userId || !token) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/mark-card/`);

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
      throw new Error(`response from markCard() is: ${response.statusText}`);
    }

    //true if the changes was successuly
    const answer = await response.json();
    // console.log("answer:", answer);

    setServerAnswer(answer);
  } catch (e) {
    console.error("error from markCard()\n", e);
  }
}

export default markCard;
