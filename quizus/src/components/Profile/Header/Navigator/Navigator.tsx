import styles from "./Navigator.module.css";
import { useNavigate } from "react-router-dom";
import MakeFolder from "./MakeFolder/MakeFolder";
import { useState, useContext, useEffect } from "react";
import { removeItems } from "../../../../scripts/utils";
import { CONTEXT } from "../../Profile";

export default function Navigator() {
  const navigator = useNavigate();
  const { areThereFolders } = useContext(CONTEXT);

  const [makeFolder, setMakeFolder] = useState(false);
  const closeWindows = () => {
    setMakeFolder(false);
  };

  function exit() {
    removeItems();
    navigator("/");
  }

  return (
    <nav className={styles.buttons}>
      {makeFolder && <MakeFolder closeWindows={closeWindows} />}
      <button
        onClick={() => setMakeFolder(true)}
        className={`${styles.btn} ${styles.first} ${
          !areThereFolders && styles.animation
        }`}
      >
        create folder
      </button>
      <button onClick={exit} className={`${styles.btn} ${styles.second}`}>
        exit
      </button>
    </nav>
  );
}
