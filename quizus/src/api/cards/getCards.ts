import { ADDRESS } from "../../scripts/constants";
import { BaseCard } from "../../scripts/types";

type DispatchBaseCard = React.Dispatch<React.SetStateAction<BaseCard[]>>;

async function getCards(
  userId: string,
  setId: string,
  setBaseCards: DispatchBaseCard
) {
  const token = localStorage.getItem("token");

  if (!userId || !token) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/${setId}/get-cards`);

  try {
    const response = await fetch(API, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`response from getCards() is: ${response.statusText}`);
    }
    // answer is folders
    const cards = await response.json();
    // console.log("cards:", cards);
    setBaseCards(cards);
  } catch (e) {
    console.error("error from getCards()\n", e);
  }
}

export default getCards;
