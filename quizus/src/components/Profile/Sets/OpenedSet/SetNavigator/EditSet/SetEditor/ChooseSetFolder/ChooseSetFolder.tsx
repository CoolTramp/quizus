import styles from "./ChooseSetFolder.module.css";
import { useEffect, useState, useContext } from "react";
import { SET_DATA_CONTEXT } from "../../../../OpenedSet";
import { BaseFolder } from "../../../../../../../../scripts/types";

import getFolders from "../../../../../../../../api/folders/getFolders";
import { useParams } from "react-router-dom";

type Props = {
  userChoseFolders: string[];
  setUserChoseFolders: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function ChooseSetFolder(props: Props) {
  const { userChoseFolders, setUserChoseFolders } = props;
  const { setDirectoryLocations } = useContext(SET_DATA_CONTEXT);
  const { userId } = useParams();

  const [baseFolders, setBaserFolders] = useState<BaseFolder[]>([]);
  // const [checkboxValue, setCheckboxValue] = useState<boolean>(false);

  useEffect(() => {
    setUserChoseFolders(setDirectoryLocations);
    if (userId) {
      getFolders(userId, setBaserFolders);
    }
  }, []);

  const handler = (e: any) => {
    const { value, checked } = e.target;

    if (checked) {
      setUserChoseFolders((prev) => [...prev, value]);
    } else {
      const filtered = userChoseFolders.filter((name) => {
        return name !== value;
      });
      setUserChoseFolders(filtered);
    }
  };

  function isSetInFolder(folderName: string) {
    return userChoseFolders.includes(folderName);
  }

  return (
    <>
      {Boolean(baseFolders.length > 0) && (
        <>
          <p>choose folder:</p>
          <div className={styles.main}>
            {baseFolders !== null &&
              baseFolders.map((folder, index) => {
                return (
                  <div key={index} className={styles.folder}>
                    <p>{folder.folder_name}</p>
                    <input
                      onChange={(e) => handler(e)}
                      type={"checkbox"}
                      checked={isSetInFolder(folder.folder_name)}
                      value={folder.folder_name}
                    ></input>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </>
  );
}
