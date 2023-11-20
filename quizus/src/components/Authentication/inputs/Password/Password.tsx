import { useContext, useState, useEffect, useRef } from "react";
import { LOG } from "../../../../App";
import { isPassword } from "../../../../scripts/utils.ts";
import common from "../../common.module.css";

export default function Password() {
  const ref = useRef<HTMLInputElement | null>(null);

  const { password, setPassword } = useContext(LOG);
  const [passwordStyle, setPasswordStyle] = useState("");

  //clean the password when a user wiil entre into the page
  useEffect(() => {
    setPassword("");
  }, [ref]);

  return (
    <div>
      <input
        ref={ref}
        onBlur={() => setPasswordStyle("error")}
        className={`
          ${common.inputBG} 
          ${!isPassword(password.length) && common[passwordStyle]}
          ${isPassword(password.length) && common["correct"]}`}
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value.trim())}
      ></input>
    </div>
  );
}
