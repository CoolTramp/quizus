import { ADDRESS } from "../../scripts/constants";
import { BaseFolder } from "../../scripts/types";

type DispatchBaseFolders = React.Dispatch<React.SetStateAction<BaseFolder[]>>;

async function getFolders(userId: string, setBaseFolders: DispatchBaseFolders) {
  const token = localStorage.getItem("token");
  if (!userId || !token) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/folders/`);
  try {
    const response = await fetch(API, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`response from getFolder() is: ${response.statusText}`);
    }
    // answer is folders
    const folders = await response.json();
    setBaseFolders(folders);
  } catch (e) {
    console.error("error from getFolder()\n", e);
  }
}

export default getFolders;
