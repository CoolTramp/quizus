import common from "../../common.module.css";
import { useEffect, useRef, useState } from "react";
import validate from "validator";
import { LOG } from "../../../../App";
import { useContext, Dispatch, SetStateAction } from "react";

type Prop = {
  setUserExist?: Dispatch<SetStateAction<boolean>>;
};

export default function Mail({ setUserExist }: Prop) {
  const ref = useRef<HTMLInputElement | null>(null);
  const { mail, setMail } = useContext(LOG) || { mail: "", setMail: () => {} };
  const [mailStyle, setMailStyle] = useState("");

  //clean the mail when a user wiil entre into the page
  useEffect(() => {
    setMail("");
  }, [ref]);

  return (
    <div>
      <input
        ref={ref}
        onBlur={() => setMailStyle("error")}
        className={`${common.inputBG} ${
          !validate.isEmail(mail) && common[mailStyle]
        } ${validate.isEmail(mail) && common["correct"]} `}
        value={mail}
        type="mail"
        onChange={(e) => {
          setMail(e.target.value.trim());
          {
            setUserExist && setUserExist(false);
          }
        }}
      ></input>
    </div>
  );
}
