import styles from "./FleshCard.module.css";
import { BaseCard } from "../../../../../../../scripts/types";
import { useState, useEffect, useRef } from "react";

type Props = {
  card: BaseCard;
  isMoodStartFromTerm: boolean;
};

export default function FleshCard({ card, isMoodStartFromTerm }: Props) {
  const { term, definition, image_url } = card;

  const fontCardRef = useRef<HTMLDivElement>(null);
  const backCardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<any>({
    "--font-size-term--": "40px",
    "--font-size-term-tel--": "35px",
    "--font-size-definition--": "50px",
    "--font-size-definition-tel--": "35px",
  });

  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);
  const [click, setClick] = useState(false);

  /**card size */
  useEffect(() => {
    flip();
  }, [isMoodStartFromTerm]);

  function flip() {
    setClick((prev) => !prev);
  }

  useEffect(() => {
    setStyle((prev: any) => ({
      ...prev,
      "--card-height--": click
        ? `${backCardRef?.current?.offsetHeight}px`
        : `${fontCardRef?.current?.offsetHeight}px`,
    }));
  }, [click, imageHeight]);

  /**font-size */
  useEffect(() => {
    if (term.length > 100)
      setStyle((prev: any) => ({
        ...prev,
        "--font-size-term--": "25px",
        "--font-size-term-tel--": "25px",
      }));
  }, [term]);

  useEffect(() => {
    if (definition.length > 200)
      setStyle((prev: any) => ({
        ...prev,
        "--font-size-definition--": "30px",
        "--font-size-definition-tel--": "25px",
      }));
  }, [definition]);

  /**image size */
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

        setImageWidth(newWidth);
        setImageHeight(newHeight);
      } else {
        setImageWidth(originalWidth);
        setImageHeight(originalHeight);
      }

      const updatedStyle = (prev: any) => ({
        ...prev,
        "--width-value": `${imageWidth}px`,
        "--height-value": `${imageHeight}px`,
        "--image-source": `url("${image_url}")`,
      });
      setStyle(updatedStyle);
    };
  }, [imageWidth, imageHeight]);

  return (
    <div style={style} className={`${styles.main} ${styles.card}`}>
      <div className={`${styles.cardInner} ${click && styles.flip}`}>
        <div
          ref={fontCardRef}
          onClick={flip}
          className={`${styles.card} ${styles.fontCard}`}
        >
          <p>{term}</p>
        </div>
        <div
          ref={backCardRef}
          onClick={flip}
          className={`${styles.card} ${styles.backCard}`}
        >
          <p>{definition}</p>
          <div className={styles.image}></div>
        </div>
        <p className={styles.crutch}>.</p>
      </div>
    </div>
  );
}
