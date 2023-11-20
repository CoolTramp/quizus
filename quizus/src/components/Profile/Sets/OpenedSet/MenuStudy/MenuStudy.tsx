import styles from "./MenuStudy.module.css";
import "../../../../../App.css";
import { useSelector } from "react-redux";

import { createContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const MENU_CONTEXT = createContext<any>(0);

export default function MenuStudy() {
  const { userId, setId, setNameParam } = useParams();
  const userCards = useSelector((state: any) => state.userCards);

  const navigator = useNavigate();

  return (
    <div className={`hidden ${userCards.length > 0 && "unhidden"}`}>
      <div className="hidden-helper">
        <div className={styles.main}>
          <button
            onClick={() =>
              navigator(
                `/profile/${userId}/${setId}/${setNameParam}/flesh-cards`
              )
            }
            className={styles["btn-flash-card"]}
          >
            flesh card
          </button>
          <button
            onClick={() =>
              navigator(
                `/profile/${userId}/${setId}/${setNameParam}/write-term`
              )
            }
            className={styles["btn-write-term"]}
          >
            write term
          </button>
        </div>
      </div>
    </div>
  );
}
