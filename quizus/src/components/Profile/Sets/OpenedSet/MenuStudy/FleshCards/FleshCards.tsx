import styles from "./FleshCards.module.css";
import FleshCardDecoration from "./FleshCardDecoration/FleshCardDecoration";
import TermDefinitionToggle from "../TermDefinitionToggle/TermDefinitionToggle";
import FleshCard from "./FleshCard/FleshCard";
import CloseWindow from "../CloseWindow/CloseWindow";

import { BaseCard } from "../../../../../../scripts/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function FleshCards() {
  const userCards: BaseCard[] = useSelector((state: any) => state.userCards);

  const [isMoodStartFromTerm, setIsMoodStartFromTerm] = useState(true);

  useEffect(() => {}, [isMoodStartFromTerm]);

  return (
    <>
      <div className={styles.main}>
        <CloseWindow />
        <nav className={styles.menu}>
          <TermDefinitionToggle
            isMoodStartFromTerm={isMoodStartFromTerm}
            setIsMoodStartFromTerm={setIsMoodStartFromTerm}
          />
          <FleshCardDecoration />
        </nav>

        {userCards.map((card: BaseCard) => {
          return (
            <FleshCard
              key={card.card_id}
              card={card}
              isMoodStartFromTerm={isMoodStartFromTerm}
            />
          );
        })}
      </div>
    </>
  );
}
//
