import styles from "./EditFolder.module.css";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import changeFolderData from "../../../../../../api/folders/changeFolderData";
import { FOLDER_DATA_CONTEXT } from "../../OpenedFolder";

import Warning from "../../../../../Authentication/utils/Warning/Warning";
import { isFolderNameExist } from "../../../../Header/Navigator/MakeFolder/MakeFolder";
import { ServerData } from "../../../../../../scripts/types";

type Dispatch = {
  setIsFolderEditor: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export default function EditFolder({ setIsFolderEditor }: Dispatch) {
  const { userId, folderName } = useParams();
  const navigate = useNavigate();

  const {
    name,
    setName,
    folderDescription,
    setFolderDescription,
    imageURL,
    setImageURL,
  } = useContext(FOLDER_DATA_CONTEXT);

  const [newName, setNewName] = useState(name);
  const [newFolderDescription, setNewFolderDescription] =
    useState(folderDescription);
  const [newImageURL, setNewImageURL] = useState(imageURL);

  const [serverAnswer, setServerAnswer] = useState<ServerData>(false);

  function isUserTypedExistedName() {
    if (
      typeof serverAnswer === "object" &&
      isFolderNameExist(serverAnswer, newName)
    ) {
      setServerAnswer(false);
      return true;
    }
    return false;
  }

  function sendFolderDataForChange() {
    if (isUserTypedExistedName()) return null;

    if (userId && folderName) {
      let data = {
        folderName: newName.trim(),
        oldFolderName: folderName,
        description: newFolderDescription.trim(),
        imageURL: newImageURL.trim(),
      };
      if (!newName) {
        data = { ...data, folderName: "no name" };
      }
      changeFolderData(userId, data, setServerAnswer);
    }
  }

  useEffect(() => {
    if (serverAnswer && typeof serverAnswer === "boolean") {
      setName(newName);
      setFolderDescription(newFolderDescription);
      setImageURL(newImageURL);

      navigate(`/profile/${userId}/${newName}/`);
      setIsFolderEditor(false);
    }
  }, [serverAnswer]);

  useEffect(() => {
    setServerAnswer(false);
  }, [newName]);

  return (
    <div className={styles.main}>
      <div className={styles.make}>
        <button
          onClick={() => setIsFolderEditor(false)}
          className={styles.close}
        ></button>
        <p>name:</p>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          type="text"
          maxLength={20}
        ></input>
        <Warning state={Boolean(serverAnswer)} text={"this name is exists"} />
        <p>description:</p>
        <textarea
          value={newFolderDescription}
          onChange={(e) => setNewFolderDescription(e.target.value)}
          maxLength={60}
        ></textarea>
        <p>image url:</p>
        <input
          value={newImageURL}
          onChange={(e) => setNewImageURL(e.target.value)}
          type="text"
        ></input>
        <button onClick={sendFolderDataForChange} className={styles.create}>
          change
        </button>
      </div>
    </div>
  );
}
