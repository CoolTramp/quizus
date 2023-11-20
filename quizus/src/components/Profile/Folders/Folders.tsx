import { useEffect, useState, useContext } from "react";
import { CONTEXT } from "../Profile";
import { useParams } from "react-router-dom";
import styles from "./Foders.module.css";
import Folder from "./Folder/Folder";
import { BaseFolder } from "../../../scripts/types";
import getFolders from "../../../api/folders/getFolders";

export default function Folders() {
  const { userId } = useParams();
  const {
    isUserCreatNewItem,
    setIsUserCreatNewItem,
    areThereFolders,
    setAreThereFolders,
  } = useContext(CONTEXT);

  const [baseFolders, setBaseFolders] = useState<BaseFolder[]>([]);
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("animationDone")) {
      setAnimationActive(false);
    }
  }, []);

  useEffect(() => {
    setIsUserCreatNewItem(false);
    if (userId) getFolders(userId, setBaseFolders);
  }, [userId, isUserCreatNewItem]);

  const folder = (folder: BaseFolder, index: number) => {
    return <Folder key={index} folder={folder} />;
  };

  useEffect(() => {
    setAreThereFolders(baseFolders.length !== 0);
  }, [baseFolders]);

  if (!areThereFolders) return;

  return (
    <div className={`${styles.main} ${animationActive && styles.animation}`}>
      <p>your folders:</p>
      <div className={styles.container}>
        {[...baseFolders].reverse().map(folder)}
      </div>
    </div>
  );
}
