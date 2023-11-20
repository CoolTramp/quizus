import React, { SetStateAction } from "react";
import styles from "./Confirmation.module.css";

type Props = {
  setAnswer: React.Dispatch<SetStateAction<boolean | null>>;
};

export default function Confirmation({ setAnswer }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <p>you sure?</p>
        <div className={styles.buttons}>
          <button
            onClick={() => setAnswer(true)}
            className={`${styles.buttons} ${styles.btn}`}
          >
            yes
          </button>
          <button
            onClick={() => setAnswer(false)}
            className={`${styles.buttons} ${styles.btn}`}
          >
            no
          </button>
        </div>
      </div>
    </div>
  );
}
