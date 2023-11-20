import styles from "./CloseWindow.module.css";
import { useParams, useNavigate } from "react-router-dom";

type Props = {};

export default function CloseWindow({}: Props) {
  const { userId, setId, setNameParam } = useParams();
  const navigator = useNavigate();

  return (
    <button
      onClick={() => navigator(`/profile/${userId}/${setId}/${setNameParam}`)}
      className={styles.close}
    ></button>
  );
}
