import { ADDRESS } from "../../scripts/constants";
import { Folder } from "../../scripts/types";

async function changeFolderData(
  userId: string,
  data: Folder,
  setServerAnswer: (answer: boolean) => void
) {
  const token = localStorage.getItem("token");

  if (!userId || !token) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/change-folder/`);

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
        `response from changeFolderData() is: ${response.statusText}`
      );
    }

    //true if the changes was successuly
    const answer = await response.json();
    setServerAnswer(answer);
  } catch (e) {
    console.error("error from changeFolderData()\n", e);
  }
}

export default changeFolderData;
