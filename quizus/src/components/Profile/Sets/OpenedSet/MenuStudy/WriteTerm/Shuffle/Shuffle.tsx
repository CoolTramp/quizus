import styles from "./Shuffle.module.css";

import { useEffect, useState } from "react";

type Props = {
  setIsShuffle: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Shuffle({ setIsShuffle }: Props) {
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    if (isClick) {
      setIsShuffle(true);
      setTimeout(() => {
        setIsClick(false);
      }, 2000);
    }
  }, [isClick]);

  function jump() {
    setIsClick(true);
  }

  return (
    <div className={`${styles.main}`}>
      <div className={`${styles.card} ${isClick && styles.lift}`}>
        <div
          className={`${styles.card} ${styles["fly-card"]} ${
            isClick && styles.jump
          }`}
        ></div>
      </div>
      <button
        onClick={jump}
        className={`${styles["btn-jump"]} ${isClick && styles.change}`}
      >
        shuffle
      </button>
    </div>
  );
}
