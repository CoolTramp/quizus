import anime from "../SetNavigator.module.css";
import navStyles from "../../../../Header/Navigator/Navigator.module.css";

import { useState } from "react";
import SetEditor from "./SetEditor/SetEditor";

type Props = {};

export default function EditSet({}: Props) {
  const [isSetEditor, setIsSetEditor] = useState<boolean | null>(false);

  return (
    <>
      {isSetEditor && <SetEditor setIsSetEditor={setIsSetEditor} />}
      <button
        onClick={() => setIsSetEditor(true)}
        className={`${navStyles.btn} ${anime.second}`}
      >
        edit set
      </button>
    </>
  );
}
