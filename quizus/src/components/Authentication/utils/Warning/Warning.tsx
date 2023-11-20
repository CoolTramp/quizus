import styles from "./Warning.module.css";

type Props = { text: string; state: boolean };

export default function Warning({ text, state }: Props) {
  return (
    <div className={styles.main}>
      <p className={`${state && styles.show}`}>{text}</p>
    </div>
  );
}
