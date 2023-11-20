import styles from "./Editor.module.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { SET_DATA_CONTEXT } from "../../../OpenedSet";
import { BooleanDispatch } from "../../../../../../../scripts/types";

import changeCardData from "../../../../../../../api/cards/changeCardData";
import { Card, BaseCard } from "../../../../../../../scripts/types";

type Props = {
  cardData: BaseCard;
  setIsMoodEdit: BooleanDispatch;
};

export default function Editor({ setIsMoodEdit, cardData }: Props) {
  const { userId } = useParams();
  const { term, definition, image_url, card_id } = cardData;

  const [newTerm, setNewTerm] = useState(term);
  const [newDefinition, setNewDefinition] = useState(definition);
  const [newImageURL, setNewImageURL] = useState(image_url);

  const { setRefreshPage } = useContext(SET_DATA_CONTEXT);
  const [serverAnswer, setServerAnswer] = useState(false);

  useEffect(() => {
    setRefreshPage(false);
  }, []);

  function sendRefreshedDataToServer() {
    if (newTerm.length === 0 && newDefinition.length === 0) {
      close();
    } else if (userId) {
      const data: Card = {
        cardId: card_id,
        term: newTerm,
        definition: newDefinition,
        imageURL: newImageURL,
      };
      changeCardData(userId, data, setServerAnswer);
    }
  }

  useEffect(() => {
    if (serverAnswer) {
      setRefreshPage(true);
      close();
    }
  }, [serverAnswer]);

  const [isCloseAnimation, setIsCloseAnimation] = useState<boolean | null>(
    null
  );

  function close() {
    setIsCloseAnimation(true);
    setTimeout(() => {
      setIsMoodEdit(false);
      setIsCloseAnimation(false);
    }, 500);
  }

  return (
    <div
      className={`${styles.card} ${isCloseAnimation && styles["anime-close"]}`}
    >
      <button onClick={close} className={styles.close}></button>

      <div className={styles["textarea-container"]}>
        <textarea
          maxLength={500}
          value={newTerm}
          onChange={(e) => setNewTerm(e.target.value)}
        ></textarea>
        <button
          onClick={() => setNewTerm("")}
          className={styles.clean}
        ></button>
      </div>
      <p className={styles.term}>term </p>

      <div className={styles["textarea-container"]}>
        <textarea
          maxLength={500}
          value={newDefinition}
          onChange={(e) => setNewDefinition(e.target.value)}
        ></textarea>
        <button
          onClick={() => setNewDefinition("")}
          className={styles.clean}
        ></button>
      </div>
      <p className={styles.definition}>definition</p>

      <div className={styles["textarea-container"]}>
        <textarea
          maxLength={500}
          value={newImageURL}
          onChange={(e) => setNewImageURL(e.target.value)}
          className={styles["image-url"]}
        ></textarea>
        <button
          onClick={() => setNewImageURL("")}
          className={styles.clean}
        ></button>
      </div>
      <p>image url</p>

      <button onClick={sendRefreshedDataToServer} className={styles.ok}>
        ok
      </button>
    </div>
  );
}
