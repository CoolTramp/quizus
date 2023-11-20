import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./OpenedFolder.module.css";

import FolderInfo from "./FolderInfo/FolderInfo";
import Navigator from "./Navigator/Navigator";
import FolderSets from "./FolderSets/FolderSets";

import getCurrentFolder from "../../../../api/folders/getCurrentFolder";
import {
  ServerCurrentFolderAnswer,
  BaseFolder,
  TypeContextOpenedFolder,
} from "../../../../scripts/types";

const defaultContext: TypeContextOpenedFolder = {
  name: "",
  setName: () => {},
  folderDescription: "",
  setFolderDescription: () => {},
  imageURL: "",
  setImageURL: () => {},
  refreshPage: false,
  setRefreshPage: () => {},
  areThereSet: false,
  setAreThereSet: () => {},
};

export const FOLDER_DATA_CONTEXT =
  createContext<TypeContextOpenedFolder>(defaultContext);

export default function OpenedFolder() {
  const { userId, folderName } = useParams();
  const [serverAnswer, setServerAnswer] =
    useState<ServerCurrentFolderAnswer>(null);

  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [folderDescription, setFolderDescription] = useState("");

  const [refreshPage, setRefreshPage] = useState(false);
  const [areThereSet, setAreThereSet] = useState(false);

  useEffect(() => {
    if (userId && folderName) {
      getCurrentFolder(userId, folderName, setServerAnswer);
    }
  }, [userId, folderName]);

  useEffect(() => {
    if (serverAnswer) {
      const { folder_name, description, image_url } =
        serverAnswer as BaseFolder;

      setName(folder_name);
      setFolderDescription(description);
      setImageURL(image_url);
    }
  }, [serverAnswer]);

  function isBadUserProfile() {
    if (serverAnswer) return "profile" in serverAnswer && !serverAnswer.profile;
  }

  function isFolderNotExist() {
    if (serverAnswer)
      return "folderName" in serverAnswer && !serverAnswer.folderName;
  }

  if (!serverAnswer) return <div className={styles.main}>Loading...</div>;
  if (isBadUserProfile()) return <div>user is not exist</div>;
  if (isFolderNotExist())
    return <div className={styles.main}>folder is not exist</div>;

  return (
    <FOLDER_DATA_CONTEXT.Provider
      value={{
        name,
        setName,
        folderDescription,
        setFolderDescription,
        imageURL,
        setImageURL,
        refreshPage,
        setRefreshPage,
        areThereSet,
        setAreThereSet,
      }}
    >
      <div className={styles.main}>
        <FolderInfo />
        <Navigator />
        <FolderSets />
      </div>
    </FOLDER_DATA_CONTEXT.Provider>
  );
}
