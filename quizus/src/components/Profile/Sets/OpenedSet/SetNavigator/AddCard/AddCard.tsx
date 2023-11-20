import navStyles from "../../../../Header/Navigator/Navigator.module.css";
import anime from "../SetNavigator.module.css";

import { useContext } from "react";
import { SET_DATA_CONTEXT } from "../../OpenedSet";
type Props = {};

export default function AddCard({}: Props) {
  const { isAddCardWindow, setIsAddCardWindow } = useContext(SET_DATA_CONTEXT);

  function isAddCardToggle() {
    isAddCardWindow ? setIsAddCardWindow(false) : setIsAddCardWindow(true);
  }

  return (
    <button
      onClick={isAddCardToggle}
      className={`${navStyles.btn} ${anime.first}`}
    >
      add card
    </button>
  );
}
