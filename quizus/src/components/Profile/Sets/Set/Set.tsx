import styles from "./Set.module.css";

import { BaseSet } from "../../../../scripts/types";
import { useParams, useNavigate } from "react-router-dom";

export default function Set(set: BaseSet) {
  const navigete = useNavigate();

  const { folderName } = useParams();
  const IS_USER_ENTER_IN_SET_BY_FOLDER: boolean = Boolean(folderName);

  const { set_name, set_id, description, image_url, user_id } = set;

  const style: any = {
    "--image-url-value": `url(${image_url})`,
  };

  const openSet = () => {
    const cleanSpacesSetName = set_name.replace(" ", "-");

    IS_USER_ENTER_IN_SET_BY_FOLDER
      ? navigete(
          `/profile/${user_id}/${folderName}/${set_id}/${cleanSpacesSetName}`
        )
      : navigete(`/profile/${user_id}/${set_id}/${cleanSpacesSetName}`);
  };

  return (
    <div onClick={openSet} style={style} className={styles.main}>
      <div className={styles.firstString}>
        <p className={styles.name}>{set_name}</p>
        <div className={styles.image}></div>
      </div>
      <p className={styles.descriptor}>{description}</p>
    </div>
  );
}
