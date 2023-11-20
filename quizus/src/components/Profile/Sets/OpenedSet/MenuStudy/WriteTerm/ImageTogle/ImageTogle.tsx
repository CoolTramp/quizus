import styles from "./ImageTogle.module.css";

type Props = {
  isImage: boolean;
  setIsImage: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ImageTogle({ isImage, setIsImage }: Props) {
  return (
    <div className={styles.main}>
      <div className={styles.range}>
        <button
          onClick={() => setIsImage((prev) => !prev)}
          className={`${styles.slider} ${isImage ? styles.right : styles.left}`}
        ></button>
      </div>
      <p className={`${isImage ? styles.chosen : styles.unchosen}`}>image</p>
    </div>
  );
}
