import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./Sets.module.css";

import Set from "./Set/Set";
import { BaseSet } from "../../../scripts/types";
import getSets from "../../../api/sets/getSets";

export default function Sets() {
  const { userId } = useParams();
  const [baseSets, setBaseSets] = useState<BaseSet[] | null>(null);

  useEffect(() => {
    if (userId) getSets(userId, setBaseSets);
  }, [userId]);

  if (baseSets?.length === 0) return;

  return (
    <div className={styles.main}>
      <p>your sets:</p>
      <div className={styles.container}>
        {baseSets !== null &&
          Array.from(baseSets).map((set, index) => {
            return <Set key={index} {...set} />;
          })}
      </div>
    </div>
  );
}
