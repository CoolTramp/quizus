import { ADDRESS } from "../../scripts/constants";

async function deleteSet(userId: string, setId: string) {
  const token = localStorage.getItem("token");

  if (!userId || !token || !setId) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/del/${setId}`);
  try {
    const response = await fetch(API, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`response from deleteSet() is: ${response.statusText}`);
    }
    // const answer = await response.json();
    // console.log(answer);
  } catch (e) {
    console.error("error from deleteSet()\n", e);
  }
}

export default deleteSet;
