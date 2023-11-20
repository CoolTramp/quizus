import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./FolderSets.module.css";

import Set from "../../../Sets/Set/Set";
import { BaseSet } from "../../../../../scripts/types";
import getFolderSets from "../../../../../api/sets/getFolderSets";
import { FOLDER_DATA_CONTEXT } from "../OpenedFolder";

export default function FolderSets() {
  const { userId, folderName } = useParams();

  const { refreshPage, setRefreshPage, areThereSet, setAreThereSet } =
    useContext(FOLDER_DATA_CONTEXT);

  const [baseSets, setBaseSets] = useState<BaseSet[] | null>(null);

  useEffect(() => {
    setRefreshPage(false);
    if (userId && folderName) getFolderSets(userId, folderName, setBaseSets);
  }, [userId, refreshPage]);

  useEffect(() => {
    setAreThereSet(Boolean(baseSets?.length));
  }, [baseSets]);

  if (!areThereSet) return;

  return (
    <div className={styles.main}>
      <p>your sets:</p>
      <div className={styles.container}>
        {baseSets !== null &&
          Array.from(baseSets)
            .reverse()
            .map((set, index) => {
              return <Set key={index} {...set} />;
            })}
      </div>
    </div>
  );
}
