import styles from "./WriteTerm.module.css";

import CloseWindow from "../CloseWindow/CloseWindow";
import WriteTermDecoration from "./WriteTermDecoration/WriteTermDecoration";
import Shuffle from "./Shuffle/Shuffle";
import { useEffect, useState } from "react";
import WriteAndCheck from "./WriteAndCheck/WriteAndCheck";
import ImageTogle from "./ImageTogle/ImageTogle";
import TermDefinitionToggle from "../TermDefinitionToggle/TermDefinitionToggle";

export default function WriteTerm() {
  const [isShuffle, setIsShuffle] = useState(false);
  const [isMoodStartFromTerm, setIsMoodStartFromTerm] = useState(true);
  const [isImage, setIsImage] = useState(false);
  const [cardCount, setCardCount] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setIsShuffle(false);
    }, 1000);
  }, [isShuffle]);

  return (
    <>
      <div className={styles.main}>
        <CloseWindow />
        <div className={styles["top-container"]}>
          <div className={styles["card-count"]}>
            <p>card count:</p>
            <p>{cardCount}</p>
          </div>

          <nav className={styles.menu}>
            <Shuffle setIsShuffle={setIsShuffle} />
            <ImageTogle isImage={isImage} setIsImage={setIsImage} />
            <WriteTermDecoration />
            <TermDefinitionToggle
              isMoodStartFromTerm={isMoodStartFromTerm}
              setIsMoodStartFromTerm={setIsMoodStartFromTerm}
            />
          </nav>
        </div>

        <WriteAndCheck
          isShuffle={isShuffle}
          isImage={isImage}
          isMoodStartFromTerm={isMoodStartFromTerm}
          setCardCount={setCardCount}
        />
      </div>
    </>
  );
}
//
