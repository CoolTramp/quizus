import anime from "../SetNavigator.module.css";
import styles from "./DeleteSet.module.css";
import navStyles from "../../../../Header/Navigator/Navigator.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Confirmation from "../../../../utils/Confirmation/Confirmation";
import deleteSet from "../../../../../../api/sets/deleteSet";

type Props = {
  back: () => void;
};

export default function DeleteSet({ back }: Props) {
  const { userId, setId, setNameParam } = useParams();

  const [answer, setAnswer] = useState<boolean | null>(null);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  useEffect(() => {
    if (userId && setId && setNameParam) {
      if (answer) {
        deleteSet(userId, setId);
        back();
      } else {
        setShowConfirmation(false);
      }
    }
    setAnswer(null);
  }, [answer]);

  return (
    <>
      {showConfirmation && <Confirmation setAnswer={setAnswer} />}
      <button
        onClick={() => {
          setShowConfirmation(true);
        }}
        className={`${navStyles.btn} ${anime.fourth} ${styles["color-red"]}`}
      >
        delete
      </button>
    </>
  );
}
