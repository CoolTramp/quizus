import { ADDRESS } from "../../scripts/constants";
import { Folder } from "../../scripts/types";
import { ServerData } from "../../scripts/types";

async function pushFolder(
  userId: string,
  data: Folder,
  setExisteFolderNames: (data: ServerData) => void
) {
  const token = localStorage.getItem("token");

  if (!userId || !token) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/push-folder/`);

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
    // true if user was added
    // the server returns existed folder names is folderName is exist
    const answer = await response.json();
    setExisteFolderNames(answer);
  } catch (e) {
    console.error("error from getFolder()\n", e);
  }
}

export default pushFolder;
