import { ADDRESS } from "../../scripts/constants";
import { BaseSet } from "../../scripts/types";

type DispatchBaseSets = React.Dispatch<React.SetStateAction<BaseSet[] | null>>;

async function getFolderSets(
  userId: string,
  folderName: string,
  setBaseSets: DispatchBaseSets
) {
  const token = localStorage.getItem("token");

  if (!userId || !token) return null;

  const API: string = ADDRESS.concat(
    `/profile/${userId}/${folderName}/folder-sets`
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
        `response from getFolderSets() is: ${response.statusText}`
      );
    }
    // answer is folders
    const sets = await response.json();
    // console.log("sets:", sets);
    setBaseSets(sets);
  } catch (e) {
    console.error("error from getFolderSets()\n", e);
  }
}

export default getFolderSets;
