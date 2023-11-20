import styles from "./TermDefinitionToggle.module.css";
type Props = {
  isMoodStartFromTerm: boolean;
  setIsMoodStartFromTerm: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TermDefinitionToggle({
  isMoodStartFromTerm,
  setIsMoodStartFromTerm,
}: Props) {
  return (
    <div className={styles.main}>
      <p className={`${!isMoodStartFromTerm && styles.chosen}`}>term</p>
      <div className={`${styles.range} ${styles.changed}`}>
        <button
          onClick={() => {
            setIsMoodStartFromTerm((prev) => !prev);
          }}
          className={`${styles.slider} ${
            isMoodStartFromTerm ? styles.left : styles.right
          }`}
        ></button>
      </div>
      <p className={`${isMoodStartFromTerm && styles.chosen}`}>definition</p>
    </div>
  );
}
