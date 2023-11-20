import { ADDRESS } from "../../scripts/constants";
import { Card } from "../../scripts/types";

async function changeCardData(
  userId: string,
  data: Card,
  setServerAnswer: (answer: boolean) => void
) {
  const token = localStorage.getItem("token");

  if (!userId || !token) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/change-card/`);

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
      throw new Error(
        `response from changeCardData() is: ${response.statusText}`
      );
    }

    //true if the changes was successuly
    const answer = await response.json();
    // console.log(answer);
    setServerAnswer(answer);
  } catch (e) {
    console.error("error from changeCardData()\n", e);
  }
}

export default changeCardData;
