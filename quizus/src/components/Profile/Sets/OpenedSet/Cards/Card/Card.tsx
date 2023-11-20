import styles from "./Card.module.css";
import { BaseCard } from "../../../../../../scripts/types";
import { useEffect, useState } from "react";

import DeleteCard from "./DeleteCard/DeleteCard";
import EditCard from "./EditCard/EditCard";
import Editor from "./Editor/Editor";
import MarkCard from "./MarkCard/MarkCard";

type Props = {
  card: BaseCard;
};

export default function Card({ card }: Props) {
  const { term, definition, image_url, card_id, mark } = card;

  const [style, setStyle] = useState({});
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [isMoodEdit, setIsMoodEdit] = useState(false);
  const [isEditAnimation, setIsEditAnimation] = useState<boolean | null>(null);
  const [cardWasDeleted, setCardWasDeleted] = useState(false);

  useEffect(() => {
    let img = new Image();
    img.src = image_url;

    img.onload = function () {
      const originalWidth = img.width;
      const originalHeight = img.height;

      if (originalWidth > 300 || originalHeight > 300) {
        const ratio = Math.min(250 / originalWidth, 250 / originalHeight);
        const newWidth = originalWidth * ratio;
        const newHeight = originalHeight * ratio;

        setWidth(newWidth);
        setHeight(newHeight);
      } else {
        setWidth(originalWidth);
        setHeight(originalHeight);
      }

      const updatedStyle = {
        "--width-value": `${width}px`,
        "--height-value": `${height}px`,
        "--image-source": `url("${image_url}")`,
      };
      setStyle(updatedStyle);
    };
  }, [width, height, style]);

  return (
    <>
      {isMoodEdit ? (
        <Editor cardData={card} setIsMoodEdit={setIsMoodEdit} />
      ) : (
        <div
          style={style}
          className={`${styles.main} 
          ${isEditAnimation && styles["anime-edit"]}
          ${cardWasDeleted && styles["anime-delete"]}`}
        >
          <MarkCard mark={mark} cardId={card_id} />
          <EditCard
            setIsEditAnimation={setIsEditAnimation}
            setIsMoodEdit={setIsMoodEdit}
          />
          <DeleteCard setCardWasDeleted={setCardWasDeleted} cardId={card_id} />
          <p className={styles.term}>{term}</p>
          <p className={styles.definition}>{definition}</p>
          {image_url && <div className={styles.image}></div>}
        </div>
      )}
    </>
  );
}
