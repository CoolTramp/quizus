import styles from "./DeleteCard.module.css";
import { useContext } from "react";
import { SET_DATA_CONTEXT } from "../../../OpenedSet";
import deleteCard from "../../../../../../../api/cards/deleteCard";
import { useParams } from "react-router-dom";

type Props = {
  setCardWasDeleted: any;
  cardId: string;
};

export default function DeleteCard({ cardId, setCardWasDeleted }: Props) {
  const { userId } = useParams();
  const { setRefreshPage } = useContext(SET_DATA_CONTEXT);

  function del() {
    if (userId && cardId) {
      setCardWasDeleted(true);
      deleteCard(userId, cardId);

      setTimeout(() => {
        setRefreshPage(true);
        setCardWasDeleted(false);
      }, 500);
    }
  }

  return <button onClick={del} className={styles["btn-del"]}></button>;
}
