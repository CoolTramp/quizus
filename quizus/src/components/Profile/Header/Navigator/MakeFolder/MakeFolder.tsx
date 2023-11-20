import { useEffect, useState, useContext } from "react";
import { CONTEXT } from "../../../Profile";
import { useParams } from "react-router-dom";
import styles from "./MakeFolder.module.css";
import pushFolder from "../../../../../api/folders/pushFolder";
import { ExisteName, ServerData } from "../../../../../scripts/types";
import Warning from "../../../../Authentication/utils/Warning/Warning";

export function isFolderNameExist(
  existeFolderNames: ExisteName[],
  userInput: string
) {
  return existeFolderNames.find((name) => {
    return name.folder_name === userInput;
  });
}

export default function MakeFolder({ closeWindows }: { closeWindows: any }) {
  const { setIsUserCreatNewItem } = useContext(CONTEXT);
  const { userId } = useParams();

  const [folderName, setFolderName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [existeFolderNames, setExisteFolderNames] = useState<ServerData>(false);

  function isUserTypedExistedName() {
    if (
      typeof existeFolderNames === "object" &&
      isFolderNameExist(existeFolderNames, folderName)
    ) {
      setExisteFolderNames(false);
      return true;
    }
    return false;
  }

  const createFolder = () => {
    if (isUserTypedExistedName()) return null;
    let data = { folderName: folderName, description, imageURL };

    if (!folderName) {
      data = { folderName: "no name", description, imageURL };
    }

    if (userId) pushFolder(userId, data, setExisteFolderNames);
  };

  useEffect(() => {
    setExisteFolderNames(false);
  }, [folderName]);

  useEffect(() => {
    if (existeFolderNames && typeof existeFolderNames === "boolean") {
      setIsUserCreatNewItem(true);
      closeWindows(true);
    }
  }, [existeFolderNames]);

  return (
    <div className={styles.main}>
      <div className={styles.make}>
        <button onClick={closeWindows} className={styles.close}></button>
        <p>name:</p>
        <input
          onChange={(e) => setFolderName(e.target.value.trim())}
          type="text"
          maxLength={20}
        ></input>
        <Warning
          state={Boolean(existeFolderNames)}
          text={"this name is exists"}
        />
        <p>description:</p>
        <textarea
          onChange={(e) => setDescription(e.target.value.trim())}
          maxLength={60}
        ></textarea>
        <p>image url:</p>
        <input
          onChange={(e) => setImageURL(e.target.value.trim())}
          type="text"
        ></input>
        <button onClick={createFolder} className={styles.create}>
          create
        </button>
      </div>
    </div>
  );
}
