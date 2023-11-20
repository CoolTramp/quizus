import styles from "./CardAndMarkCardToggle.module.css";
import "../../../../../App.css";
import { BaseCard } from "../../../../../scripts/types";
import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { SET_DATA_CONTEXT } from "../OpenedSet";

function getMarkedCardsCount(cards: BaseCard[]) {
  return cards.reduce((cardCount, card) => {
    if (card.mark) cardCount++;
    return cardCount;
  }, 0);
}

export default function CardAndMarkCardToggle() {
  const userCards = useSelector((state: any) => state.userCards);
  const { clickedButton, setClickedButton } = useContext(SET_DATA_CONTEXT);

  const [markCardsCount, setMarkCardsCount] = useState<number>(
    getMarkedCardsCount(userCards)
  );

  useEffect(() => {
    setMarkCardsCount(getMarkedCardsCount(userCards));
  }, [userCards]);

  return (
    <>
      <div className={`hidden ${markCardsCount && "unhidden"}`}>
        <div className={"hidden-helper"}>
          <div className={styles.main}>
            <button
              onClick={() => setClickedButton("all")}
              className={`${styles["btn-all-cards"]} ${
                clickedButton === "all" && styles.clicked
              }`}
            >
              study all
            </button>
            <button
              onClick={() => setClickedButton("marked")}
              className={`${styles["btn-marked-cards"]} ${
                clickedButton === "marked" && styles.clicked
              }`}
            >
              study {markCardsCount}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <div className={`${styles.hidden} ${markCardsCount && styles.unhidden}`}>
<div className={styles["hidden-helper"]}>
  <div className={styles.main}> */
}
