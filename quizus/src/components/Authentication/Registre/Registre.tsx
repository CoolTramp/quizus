import { useEffect, useRef, useState, useContext } from "react";
import Mail from "../inputs/Mail/Mail.tsx";
import LinkToLoginPage from "../utils/LinkToLoginPage/LinkToLoginPage";
import Password from "../inputs/Password/Password.tsx";
import { LOG } from "../../../App";
import { v4 } from "uuid";
import validate from "validator";
import styles from "./Registre.module.css";
import common from "../common.module.css";
import { registrationUser } from "../../../api/registration.js";
import Warning from "../utils/Warning/Warning.js";
import { isPassword } from "../../../scripts/utils.ts";
import DivUserWasRegirtre from "./DivUserWasRegirtre/DivUserWasRegirtre.js";
import { useNavigate } from "react-router-dom";
import { MIN_LENGTH_USER_NAME } from "../../../scripts/constants.ts";

export default function Registre() {
  const ref = useRef<HTMLButtonElement | null>(null);
  const {
    mail,
    setMail,
    password,
    setPassword,
    stateUserRegistred,
    setStateUserRegistred,
  } = useContext(LOG);
  const [name, setName] = useState("");
  const [repeat, setRepeat] = useState("");

  const [nameStyle, setNameStyle] = useState("");
  const [repeatStyle, setRepeatStyle] = useState("");

  const [userInputIsGoog, setUserInputIsGoog] = useState(false);
  const [userExist, setUserExist] = useState(false);

  const sendUserDataToRegistre = () => {
    setUserExist(false);
    if (userInputIsGoog) {
      registrationUser(
        {
          id: v4(),
          name,
          mail,
          password,
        },
        setUserExist,
        setStateUserRegistred
      );
      console.log("the data was sending", new Date().getDate);
    } else console.log("the data is not valid");
  };

  const isName = (): boolean => {
    return name.length >= MIN_LENGTH_USER_NAME;
  };

  const passwAreEqual = (): boolean => {
    return isPassword(password.length) && password === repeat;
  };

  const checkInputs = () => {
    return isName() && validate.isEmail(mail) && passwAreEqual();
  };

  const cleanMainAndPassword = () => {
    setMail("");
    setPassword("");
  };

  const navigate = useNavigate();
  useEffect(() => {
    checkInputs() ? setUserInputIsGoog(true) : setUserInputIsGoog(false);
    if (stateUserRegistred) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [name, mail, password, repeat, stateUserRegistred]);

  return (
    <div
      className={`${styles.main} ${
        userInputIsGoog ? styles.goodbg : styles.badbg
      }`}
    >
      {stateUserRegistred && <DivUserWasRegirtre />}
      <div className={styles.screen}>
        <div className={styles.cross}>
          <button
            onClick={() => {
              !stateUserRegistred && cleanMainAndPassword();
            }}
          >
            <LinkToLoginPage />
          </button>
        </div>

        <p>NAME:</p>
        <input
          onBlur={() => setNameStyle("error")}
          className={`${common.inputBG} ${!isName() && common[nameStyle]} ${
            isName() && common["correct"]
          }`}
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
        ></input>
        <p>E-MAIL:</p>
        <Mail setUserExist={setUserExist} />
        <Warning state={userExist} text={"user already exist!"} />
        <p>PASSWORD:</p>
        <Password />
        <p>REPEAT PASSWORD:</p>
        <input
          onBlur={() => setRepeatStyle("error")}
          className={`${common.inputBG} ${
            !passwAreEqual() && common[repeatStyle]
          }
          ${passwAreEqual() && common["correct"]}`}
          value={repeat}
          type="password"
          onChange={(e) => setRepeat(e.target.value.trim())}
        ></input>
        <button
          className={`${userInputIsGoog && styles.show} ${styles.btn}`}
          ref={ref}
          onClick={() => {
            sendUserDataToRegistre();
          }}
        >
          registre
        </button>
      </div>
    </div>
  );
}
