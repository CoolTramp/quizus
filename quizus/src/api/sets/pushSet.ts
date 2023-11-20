import { ADDRESS } from "../../scripts/constants";
import { Set, ExistedSetName } from "../../scripts/types";

async function pushSet(
  userId: string,
  data: Set,
  setExisteSetsNames: (data: ExistedSetName[]) => void
) {
  const token = localStorage.getItem("token");

  if (!userId || !token) return null;
  const API: string = ADDRESS.concat(`/profile/${userId}/push-set/`);

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
    const answer = await response.json();
    console.log(answer);
    setExisteSetsNames(answer);
  } catch (e) {
    console.error("error from pushSet()\n", e);
  }
}

export default pushSet;
