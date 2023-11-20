import { useState, useEffect } from "react";
import styles from "./WriteTermDecoration.module.css";

type Props = {};

export default function WriteTermDecoration({}: Props) {
  const [isClick, setIsClick] = useState(false);

  useEffect(() => {
    if (isClick) {
      setTimeout(() => {
        setIsClick(false);
      }, 2000);
    }
  }, [isClick]);

  function up() {
    setIsClick(true);
  }

  return (
    <div className={styles.main}>
      <div className={`${styles.image} ${isClick && styles.jump}`} />
      <button
        onClick={up}
        className={`${styles["btn-up"]} ${isClick && styles.kick}`}
      >
        <div className={`${styles.slider} ${isClick && styles.change}`}></div>
        UP
      </button>
    </div>
  );
}
