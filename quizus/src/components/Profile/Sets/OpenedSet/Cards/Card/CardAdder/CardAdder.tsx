import styles from "./CardAdder.module.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SET_DATA_CONTEXT } from "../../../OpenedSet";

import { v4 } from "uuid";
import { Card } from "../../../../../../../scripts/types";
import pushCard from "../../../../../../../api/cards/pushCard";

export default function CardAdder() {
  const { userId, setId } = useParams();

  const { setRefreshPage, isAddCardWindow, setIsAddCardWindow } =
    useContext(SET_DATA_CONTEXT);

  const [term, setTerm] = useState("");
  const [definition, setDefinition] = useState("");
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    setRefreshPage(false);
  }, []);

  function cleanStates() {
    setTerm("");
    setDefinition("");
    setImageURL("");
  }

  function pashDataToServer() {
    cleanStates();
    if (term.length === 0 && definition.length === 0) {
      close();
    } else if (userId && setId) {
      setIsAddCardWindow(false);
      setTimeout(() => {
        cleanStates();
        const cardId = v4();
        const data: Card = { setId, cardId, term, definition, imageURL };
        pushCard(userId, data);
        setRefreshPage(true);
        setIsAddCardWindow(true);
      }, 100);
    }
  }

  function close() {
    setIsAddCardWindow(false);
    setRefreshPage(true);
  }

  return (
    <div
      className={`${isAddCardWindow && styles.show} 
      ${!isAddCardWindow && typeof isAddCardWindow !== "object" && styles.hide} 
      ${styles.main}  `}
    >
      <div className={styles.card}>
        <button onClick={close} className={styles.close}></button>

        <div className={styles["textarea-container"]}>
          <textarea
            maxLength={500}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          ></textarea>
          <button onClick={() => setTerm("")} className={styles.clean}></button>
        </div>
        <p className={styles.term}>term</p>

        <div className={styles["textarea-container"]}>
          <textarea
            maxLength={500}
            value={definition}
            onChange={(e) => setDefinition(e.target.value)}
          ></textarea>
          <button
            onClick={() => setDefinition("")}
            className={styles.clean}
          ></button>
        </div>
        <p className={styles.definition}>definition</p>

        <div className={styles["textarea-container"]}>
          <textarea
            maxLength={500}
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className={styles["image-url"]}
          ></textarea>
          <button
            onClick={() => setImageURL("")}
            className={styles.clean}
          ></button>
        </div>
        <p>image url</p>

        <button onClick={pashDataToServer} className={styles.ok}>
          ok
        </button>
      </div>
    </div>
  );
}
