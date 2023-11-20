import { useState, useContext, useEffect } from "react";
import styles from "./MarkCard.module.css";
import { Mark } from "../../../../../../../scripts/types";
import markCard from "../../../../../../../api/cards/markCard";
import { useParams } from "react-router-dom";
import { SET_DATA_CONTEXT } from "../../../OpenedSet";

type Props = {
  cardId: string;
  mark: boolean;
};

export default function MarkCard({ cardId, mark }: Props) {
  const { userId } = useParams();
  const [isMark, setIsMark] = useState(mark);

  const { setRefreshPage } = useContext(SET_DATA_CONTEXT);
  const [serverAnswer, setServerAnswer] = useState(false);

  function writeMark() {
    if (userId) {
      setIsMark((prev) => !prev);

      let data: Mark = { cardId: cardId, mark: !isMark };
      setRefreshPage(true);
      markCard(userId, data, setServerAnswer);
    }
  }

  useEffect(() => {
    if (serverAnswer) setRefreshPage(true);
    setTimeout(() => {
      setServerAnswer(false);
    }, 0);
  }, [serverAnswer]);

  return (
    <>
      <button
        onClick={writeMark}
        className={`${styles["btn-mark-card"]} ${
          isMark ? styles.mark : styles.unmark
        }`}
      ></button>
    </>
  );
}
