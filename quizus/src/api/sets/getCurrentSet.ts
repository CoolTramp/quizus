import { ADDRESS } from "../../scripts/constants";
import { ServerCurrentSetAnswer } from "../../scripts/types";

type Dispatch = React.Dispatch<React.SetStateAction<ServerCurrentSetAnswer>>;

async function getCurrentSet(
  userId: string,
  setId: string,
  SetName: string,
  setServerAnswer: Dispatch
) {
  const token = localStorage.getItem("token");

  if (!userId || !token || !SetName) return null;

  const API: string = ADDRESS.concat(
    `/profile/${userId}/current-set/${SetName}/${setId}`
  );
  try {
    const response = await fetch(API, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `response from getCurrentSet() is: ${response.statusText}`
      );
    }
    const answer = await response.json();
    // console.log(answer);
    setServerAnswer(answer);
  } catch (e) {
    console.error("error from getCurrentSet()\n", e);
  }
}

export default getCurrentSet;
