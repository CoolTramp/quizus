import navStyles from "../../../Header/Navigator/Navigator.module.css";
import styles from "./SetNavigator.module.css";
import { useParams, useNavigate } from "react-router-dom";

import DeleteSet from "./DeleteSet/DeleteSet";

import EditSet from "./EditSet/EditSet";
import AddCard from "./AddCard/AddCard";

export default function SetNavigator() {
  const { userId, folderName } = useParams();
  const navigator = useNavigate();

  function back() {
    folderName
      ? navigator(`/profile/${userId}/${folderName}`)
      : navigator(`/profile/${userId}`);
  }

  return (
    <nav className={navStyles.buttons}>
      <AddCard />
      <EditSet />
      <button onClick={back} className={`${navStyles.btn} ${styles.third}`}>
        back
      </button>
      <DeleteSet back={back} />
    </nav>
  );
}
