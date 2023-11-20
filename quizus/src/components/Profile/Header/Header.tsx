import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import Navigator from "./Navigator/Navigator.tsx";

export default function Header(prop: { userName: string | undefined }) {
  const { userName } = prop;
  const [animationActive, setAnimationActive] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("animationDone")) {
      setAnimationActive(false);
    }
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.makeFolder}></div>
      <div className={styles.header}>
        {userName && (
          <p
            className={`${styles.greeting} ${
              animationActive && styles.animation
            }`}
          >
            <i>hello, </i>
            <span>{userName}</span>
          </p>
        )}
        <Navigator />
      </div>
    </div>
  );
}
