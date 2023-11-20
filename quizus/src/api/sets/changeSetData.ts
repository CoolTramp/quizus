import { ADDRESS } from "../../scripts/constants";
import { Set } from "../../scripts/types";

async function changeSetData(
  userId: string,
  data: Set,
  setServerAnswer: (answer: boolean) => void
) {
  const token = localStorage.getItem("token");

  if (!userId || !token) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/change-set/`);

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
        `response from changeSetData() is: ${response.statusText}`
      );
    }

    //true if the changes was successuly
    const answer = await response.json();
    // console.log(answer);
    setServerAnswer(answer);
  } catch (e) {
    console.error("error from changeSetData()\n", e);
  }
}

export default changeSetData;
