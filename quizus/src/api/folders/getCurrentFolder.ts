import { ADDRESS } from "../../scripts/constants";
import { ServerCurrentFolderAnswer } from "../../scripts/types";

type Dispatch = React.Dispatch<React.SetStateAction<ServerCurrentFolderAnswer>>;

async function getCurrentFolder(
  userId: string,
  folderName: string,
  setServerAnswer: Dispatch
) {
  const token = localStorage.getItem("token");

  if (!userId || !token || !folderName) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/${folderName}/`);
  try {
    const response = await fetch(API, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `response from getCurrentFolder() is: ${response.statusText}`
      );
    }
    const answer = await response.json();
    setServerAnswer(answer);
  } catch (e) {
    console.error("error from getCurrentFolder()\n", e);
  }
}

export default getCurrentFolder;
