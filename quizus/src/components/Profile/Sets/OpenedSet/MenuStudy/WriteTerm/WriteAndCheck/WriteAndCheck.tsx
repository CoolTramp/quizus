import styles from "./WriteAndCheck.module.css";
import { BaseCard } from "../../../../../../../scripts/types";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

type Props = {
  isShuffle: boolean;
  isImage: boolean;
  isMoodStartFromTerm: boolean;
  setCardCount: React.Dispatch<React.SetStateAction<number>>;
};

const DEFAULT_FONT = "70px";
const DEFAULT_FONT_TEL = "35px";

export default function WriteAndCheck({
  isShuffle,
  isImage,
  isMoodStartFromTerm,
  setCardCount,
}: Props) {
  const userCards: BaseCard[] = useSelector((state: any) => state.userCards);
  const [cardIndexes, setCardIndexes] = useState(
    Array.from({ length: userCards.length }, (_, index) => index)
  );
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const [currenCard, setCurrentCard] = useState(
    userCards[cardIndexes[currentCardIndex]]
  );
  const [card, setCard] = useState<{ side: any }>({ side: currenCard?.term });

  const [style, setStyle] = useState<any>();
  const [imageWidth, setImageWidth] = useState(0);
  const [imageHeight, setImageHeight] = useState(0);

  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    if (isShuffle) {
      setCardIndexes((prev) => prev.slice().sort(() => Math.random() - 0.5));
      setCurrentCard(userCards[cardIndexes[currentCardIndex]]);
    }
  }, [isShuffle]);

  useEffect(() => {
    setCard({
      side: isMoodStartFromTerm ? currenCard?.term : currenCard?.definition,
    });
  }, [currenCard, isMoodStartFromTerm]);

  /** image-size */
  useEffect(() => {
    let img = new Image();
    img.src = currenCard.image_url;

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
        "--image-source": `url("${currenCard.image_url}")`,
      });
      setStyle(updatedStyle);
    };
  }, [imageWidth, imageHeight, style]);

  /** font-size */
  useEffect(() => {
    getFontSizes();
  }, [card, currenCard]);

  function getFontSizes() {
    // if (!card?.side) return;
    const TEXT_IS_TOO_LONG = card?.side?.length < 100;

    setStyle({
      "--creener-font--": `${TEXT_IS_TOO_LONG ? DEFAULT_FONT : "35px"}`,
      "--creener-font-tel--": `${TEXT_IS_TOO_LONG ? DEFAULT_FONT_TEL : "20px"}`,
    });
  }

  /** button next */
  function nextCard() {
    const newIndex = currentCardIndex + 1;
    if (newIndex >= cardIndexes.length) {
      setCurrentCardIndex(0);
      return;
    }
    setCurrentCardIndex(newIndex);
  }

  useEffect(() => {
    setCurrentCard(userCards[cardIndexes[currentCardIndex]]);
  }, [currentCardIndex]);

  /** user input */
  useEffect(() => {
    changeUserAnswer();
  }, [userAnswer]);

  function changeUserAnswer() {
    const textForComparison = isMoodStartFromTerm
      ? currenCard?.definition
      : currenCard?.term;
    if (textForComparison?.toLowerCase() === userAnswer?.toLowerCase()) {
      setCardIndexes(
        cardIndexes
          .slice(0, currentCardIndex)
          .concat(cardIndexes.slice(currentCardIndex + 1))
      );
      setCurrentCardIndex(0);
      setUserAnswer("");
    }
  }

  /** the card count */
  useEffect(() => {
    if (cardIndexes.length === 0) {
      setCardIndexes(
        Array.from({ length: userCards.length }, (_, index) => index)
      );
      console.log("you win");
    }

    setCardCount(cardIndexes.length);
    setCurrentCard(userCards[cardIndexes[currentCardIndex]]);
  }, [cardIndexes]);

  return (
    <div style={style} className={styles.main}>
      <div
        className={`
      
      ${styles["text-screener-container"]}`}
      >
        <div
          className={`
          ${styles["text-screener"]}`}
        >
          {card?.side}
        </div>
        <div className={`hidden ${isImage && "unhidden"}`}>
          <div className="hidden-helper">
            <div className={styles.image}></div>
          </div>
        </div>
      </div>

      <div className={styles["text-container"]}>
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        ></textarea>
        <button onClick={nextCard} className={styles.check}>
          next
        </button>
      </div>
    </div>
  );
}
