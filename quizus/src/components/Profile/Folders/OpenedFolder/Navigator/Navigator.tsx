import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FOLDER_DATA_CONTEXT } from "../OpenedFolder";
import navStyles from "../../../Header/Navigator/Navigator.module.css";
import styles from "./Navigator.module.css";

import Confirmation from "../../../utils/Confirmation/Confirmation";
import deleteFolder from "../../../../../api/folders/deleteFolder";

import CreateSet from "./CreateSet/CreateSet";
import EditFolder from "./EditFolder/EditFolder";

export default function Navigator() {
  const { userId, folderName } = useParams();
  const navigator = useNavigate();

  const [showConfirmation, setShowConfirmation] = useState<boolean | null>(
    null
  );
  const [answer, setAnswer] = useState<boolean | null>(null);

  const [isFolderEditor, setIsFolderEditor] = useState<boolean | null>(false);
  const [isCreateSetWindow, setIsCreateSetWindow] = useState<boolean | null>(
    false
  );

  const { areThereSet } = useContext(FOLDER_DATA_CONTEXT);

  useEffect(() => {
    if (userId && folderName) {
      if (answer) {
        deleteFolder(userId, folderName);
        navigator(`/profile/${userId}`);
      } else {
        setShowConfirmation(false);
      }
    }
    setAnswer(null);
  }, [answer]);

  return (
    <div>
      {isCreateSetWindow && (
        <CreateSet setIsCreateSetWindow={setIsCreateSetWindow} />
      )}
      {isFolderEditor && <EditFolder setIsFolderEditor={setIsFolderEditor} />}
      <nav className={navStyles.buttons}>
        {showConfirmation && <Confirmation setAnswer={setAnswer} />}
        <button
          onClick={() => setIsCreateSetWindow(true)}
          className={`${navStyles.btn} ${styles.first} ${
            !areThereSet && styles["anime-jump"]
          }`}
        >
          create set
        </button>
        <button
          onClick={() => setIsFolderEditor(true)}
          className={`${navStyles.btn} ${styles.second}`}
        >
          edit
        </button>
        <button
          onClick={() => navigator(`/profile/${userId}`)}
          className={`${navStyles.btn} ${styles.third}`}
        >
          home
        </button>
        <button
          onClick={() => {
            setShowConfirmation(true);
          }}
          className={`${navStyles.btn} ${styles.fourth} ${styles["color-red"]}`}
        >
          delete
        </button>
      </nav>
    </div>
  );
}
