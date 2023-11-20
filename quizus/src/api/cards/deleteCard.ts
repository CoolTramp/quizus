import { ADDRESS } from "../../scripts/constants";

async function deleteCard(userId: string, cardId: string) {
  const token = localStorage.getItem("token");

  if (!userId || !token || !cardId) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/del-card/${cardId}`);
  try {
    const response = await fetch(API, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`response from deleteCard() is: ${response.statusText}`);
    }
    // const answer = await response.json();
    // console.log(answer);
  } catch (e) {
    console.error("error from deleteCard()\n", e);
  }
}

export default deleteCard;
