import styles from "./Cards.module.css";
import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card/Card";
import { BaseCard } from "../../../../../scripts/types";
import getCards from "../../../../../api/cards/getCards";
import { SET_DATA_CONTEXT } from "../OpenedSet";

import { saveUserCards } from "../../../../../feature/userCards";
import { useDispatch, useSelector } from "react-redux";

export default function Cards() {
  const { userId, setId } = useParams();
  const { refreshPage, clickedButton, setRefreshPage } =
    useContext(SET_DATA_CONTEXT);
  const [baseCards, setBaseCards] = useState<BaseCard[]>([]);

  const { isAddCardWindow, setIsAddCardWindow } = useContext(SET_DATA_CONTEXT);
  const userCards = useSelector((state: any) => state.userCards);
  const dispatch = useDispatch();

  function saveChosenCards() {
    const chosenCards = baseCards.reduce((acc: BaseCard[], card) => {
      if (!(clickedButton === "marked" && !card.mark)) {
        acc.push(card);
      }
      return acc;
    }, []);
    // console.log("new cards:", chosenCards);
    dispatch(saveUserCards(chosenCards));
  }

  useEffect(() => {
    saveChosenCards();
  }, [clickedButton]);

  useEffect(() => {
    if (userId && setId) {
      getCards(userId, setId, setBaseCards);
      setRefreshPage(false);
    }
  }, [refreshPage]);

  useEffect(() => {
    //for animation
    if (baseCards.length === 0) {
      setIsAddCardWindow(null);
    }
    saveChosenCards();
  }, [baseCards]);

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        <div
          className={`${isAddCardWindow && styles.down}
      ${!isAddCardWindow && typeof isAddCardWindow !== "object" && styles.up}
      `}
        >
          <div>
            {userCards.map((card: BaseCard) => {
              return <Card key={card.card_id} card={card} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
