import { ADDRESS } from "../../scripts/constants";

async function deleteFolder(userId: string, folderName: string) {
  const token = localStorage.getItem("token");

  if (!userId || !token || !folderName) return null;

  const API: string = ADDRESS.concat(`/profile/${userId}/${folderName}/`);

  try {
    const response = await fetch(API, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(
        `response from deleteFolder() is: ${response.statusText}`
      );
    }
    // const answer = await response.json();
    // console.log(answer);
  } catch (e) {
    console.error("error from deleteFolder()\n", e);
  }
}

export default deleteFolder;
