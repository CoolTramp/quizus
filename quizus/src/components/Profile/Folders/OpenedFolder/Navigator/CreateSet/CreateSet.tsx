import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./CreateSet.module.css";
import Warning from "../../../../../Authentication/utils/Warning/Warning";
import { v4 } from "uuid";

import pushSet from "../../../../../../api/sets/pushSet";
import { ExistedSetName, Set } from "../../../../../../scripts/types";

import { FOLDER_DATA_CONTEXT } from "../../OpenedFolder";

type Props = {
  setIsCreateSetWindow: React.Dispatch<React.SetStateAction<boolean | null>>;
};

function isSetNameExist(existeSetNames: ExistedSetName[], userInput: string) {
  return existeSetNames.find((name) => {
    return name.set_name === userInput;
  });
}

export default function CreateSet({ setIsCreateSetWindow }: Props) {
  const { userId, folderName } = useParams();
  const { setRefreshPage } = useContext(FOLDER_DATA_CONTEXT);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const [existeSetsNames, setExisteSetsNames] = useState<
    ExistedSetName[] | boolean
  >(false);

  function isUserTypedExistedName() {
    if (
      typeof existeSetsNames === "object" &&
      isSetNameExist(existeSetsNames, name)
    ) {
      return true;
    }
    return false;
  }

  function pushDataToServer() {
    if (userId && folderName) {
      if (isUserTypedExistedName()) return null;

      let data: Set = {
        name,
        setId: v4(),
        description,
        imageURL,
        folderNames: [folderName],
      };

      if (name.length === 0) {
        data = { ...data, name: "no name" };
      }

      pushSet(userId, data, setExisteSetsNames);
    }
  }

  useEffect(() => {
    setExisteSetsNames(false);
  }, [name]);

  useEffect(() => {
    if (existeSetsNames && typeof existeSetsNames === "boolean") {
      setRefreshPage(true);
      setIsCreateSetWindow(false);
    }
  }, [existeSetsNames]);

  return (
    <div className={styles.main}>
      <div className={styles["create-set-container"]}>
        <button
          onClick={() => setIsCreateSetWindow(false)}
          className={styles["btn-close-windows"]}
        ></button>
        <p>name:</p>
        <input
          type="text"
          maxLength={10}
          onChange={(e) => setName(e.target.value.trim())}
        ></input>
        <Warning
          // if the server returned object this mean the user
          // attempted set exitste name
          state={Boolean(existeSetsNames)}
          text={"this name is exists"}
        />
        <p>description:</p>
        <input
          type="text"
          maxLength={30}
          onChange={(e) => setDescription(e.target.value.trim())}
        ></input>
        <p>image address:</p>
        <input
          type="text"
          onChange={(e) => setImageURL(e.target.value.trim())}
        ></input>
        <button onClick={pushDataToServer} className={styles["btn-create"]}>
          create
        </button>
      </div>
    </div>
  );
}
