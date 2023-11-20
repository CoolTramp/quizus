import styles from "./SetEditor.module.css";

import React from "react";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import changeSetData from "../../../../../../../api/sets/changeSetData";
import { SET_DATA_CONTEXT } from "../../../OpenedSet";
import ChooseSetFolder from "./ChooseSetFolder/ChooseSetFolder";

type Dispatch = {
  setIsSetEditor: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export default function SetEditor({ setIsSetEditor }: Dispatch) {
  const { userId, setId, folderName, setNameParam } = useParams();
  const navigate = useNavigate();

  const {
    name,
    setName,
    setDescription,
    setSetDescription,
    imageURL,
    setImageURL,
    setRefreshPage,
  } = useContext(SET_DATA_CONTEXT);

  const [newName, setNewName] = useState(name);
  const [newSetDescription, setNewSetDescription] = useState(setDescription);
  const [newImageURL, setNewImageURL] = useState(imageURL);
  const [serverAnswer, setServerAnswer] = useState(false);

  const [userChoseFolders, setUserChoseFolders] = useState<string[]>([]);
  console.log("name", name);

  useEffect(() => {}, []);

  /** **/

  function sendFolderDataForChange() {
    if (userId && setNameParam && setId) {
      let data = {
        name: newName.trim(),
        description: newSetDescription.trim(),
        imageURL: newImageURL.trim(),
        folderNames: [...userChoseFolders],
        setId,
      };
      if (newName.length === 0) data = { ...data, name: "no name" };
      changeSetData(userId, data, setServerAnswer);
    }
  }

  function back() {
    setRefreshPage(true);
    folderName
      ? navigate(`/profile/${userId}/${folderName}/${setId}/${setNameParam}`)
      : navigate(`/profile/${userId}/${setId}/${setNameParam}`);
  }

  useEffect(() => {
    if (serverAnswer) {
      setName(newName);
      setSetDescription(newSetDescription);
      setImageURL(newImageURL);
      back();
      setIsSetEditor(false);
    }
  }, [serverAnswer]);

  return (
    <div className={styles.main}>
      <div className={styles.make}>
        <button
          onClick={() => setIsSetEditor(false)}
          className={styles.close}
        ></button>
        <p>name:</p>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          type="text"
          maxLength={20}
        ></input>
        <p>description:</p>
        <textarea
          value={newSetDescription}
          onChange={(e) => setNewSetDescription(e.target.value)}
          maxLength={60}
        ></textarea>
        <p>image url:</p>
        <input
          value={newImageURL}
          onChange={(e) => setNewImageURL(e.target.value)}
          type="text"
        ></input>
        <ChooseSetFolder
          userChoseFolders={userChoseFolders}
          setUserChoseFolders={setUserChoseFolders}
        />
        <button onClick={sendFolderDataForChange} className={styles.create}>
          change
        </button>
      </div>
    </div>
  );
}
