import styles from "./Folder.module.css";
import { BaseFolder } from "../../../../scripts/types";
import { useNavigate } from "react-router-dom";

type Prop = {
  folder: BaseFolder;
};

export default function Folder({ folder }: Prop) {
  const navigete = useNavigate();
  const { folder_name, description, image_url, user_id } = folder;

  const style: any = {
    "--image-url-value": `url(${image_url})`,
  };

  const openFolder = () => {
    const cleanSpacesFolderName = folder_name.replace(" ", "-");
    navigete(`/profile/${user_id}/${cleanSpacesFolderName}`);
  };

  return (
    <div onClick={openFolder} style={style} className={styles.main}>
      <div className={styles.firstString}>
        <p className={styles.name}>{folder_name}</p>
        <div className={styles.image}></div>
      </div>
      <p className={styles.descriptor}>{description}</p>
    </div>
  );
}
