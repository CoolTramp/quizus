import styles from "./EditCard.module.css";

type Props = {
  setIsMoodEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEditAnimation: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export default function EditCard({ setIsMoodEdit, setIsEditAnimation }: Props) {
  function edit() {
    setIsEditAnimation(true);
    setTimeout(() => {
      setIsMoodEdit(true);
      setIsEditAnimation(false);
    }, 500);
  }

  return <button onClick={edit} className={styles["btn-edit"]}></button>;
}
