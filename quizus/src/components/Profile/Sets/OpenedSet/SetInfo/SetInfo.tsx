import styles from "./SetInfo.module.css";
import { BaseFolder } from "../../../../../scripts/types";
import React, { useEffect, useState, useContext } from "react";
import { SET_DATA_CONTEXT } from "../OpenedSet";

export default function SetInfo() {
  const { name, setDescription, imageURL } = useContext(SET_DATA_CONTEXT);

  // const [animationActive, setAnimationActive] = useState(true);

  // useEffect(() => {
  //   if (localStorage.getItem("animationDone")) {
  //     setAnimationActive(false);
  //   }
  // }, []);

  const style: any = {
    "--image--surce-": `url(${imageURL})`,
  };

  return (
    <div style={style} className={styles.main}>
      <div className={`${styles["text-container"]}`}>
        <p
          className={`${styles["folder-name"]} ${styles["folder-name-anime"]}`}
        >
          {name}
        </p>
        <p className={styles.description}>{setDescription}</p>
      </div>
      {imageURL && <div className={styles.image}></div>}
    </div>
  );
}
