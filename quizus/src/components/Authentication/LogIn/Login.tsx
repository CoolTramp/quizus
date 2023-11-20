import styles from "./Login.module.css";

import validate from "validator";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { LOG } from "../../../App";
import Warning from "../utils/Warning/Warning";
import authenticateUser from "../../../api/authenticateUser";
import { isPassword } from "../../../scripts/utils";

export default function Login() {
  const navigate = useNavigate();
  const { mail, setMail, password, setPassword, setStateUserRegistred } =
    useContext(LOG);
  const [isUserExist, setIsUserExist] = useState(true);
  const [isCorrectPassword, setIsCorrectPassword] = useState(true);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");

  function logIn() {
    if (checkInput())
      authenticateUser(
        { mail, password },
        setIsUserExist,
        setIsCorrectPassword,
        setUserId,
        setToken
      );
  }

  function checkInput() {
    return validate.isEmail(mail) && isPassword(password.length);
  }

  useEffect(() => {
    setIsUserExist(true);
    setIsCorrectPassword(true);

    if (token) {
      navigate(`/profile/${userId}`);
    }
  }, [mail, password, token]);

  return (
    <div className={styles.main}>
      <div className={styles.border}>
        <div className={styles.container}>
          <p>address:</p>
          <input
            value={mail}
            type="mail"
            onChange={(e) => {
              setMail(e.target.value.trim());
            }}
          ></input>
          <Warning state={!isUserExist} text={"user is not exist"} />
          <p>password:</p>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value.trim())}
          ></input>
          <Warning state={!isCorrectPassword} text={"password is wrong"} />
          <button onClick={logIn} className={styles.btnLogin}>
            Log In
          </button>
          <Link to="/recover" className={styles.linkFargotPassword}>
            Fargot password?
          </Link>
          <button
            onClick={() => setStateUserRegistred(false)}
            className={styles.btnRegistration}
          >
            <Link to="/registration" className={styles.linkRegistration}>
              Registration
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
