import { useEffect, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import autorization from "../../api/authorization";
import { AnswerAuthorization, BooleanDispatch } from "../../scripts/types";

import styles from "./Profile.module.css";
import Header from "./Header/Header";
import Folders from "./Folders/Folders";
import Sets from "./Sets/Sets";

type Context = {
  isUserCreatNewItem: boolean;
  setIsUserCreatNewItem: BooleanDispatch;
  areThereFolders: boolean;
  setAreThereFolders: BooleanDispatch;
};

const defaultContext: Context = {
  isUserCreatNewItem: false,
  setIsUserCreatNewItem: () => {},
  areThereFolders: false,
  setAreThereFolders: () => {},
};

export const CONTEXT = createContext<Context>(defaultContext);

export default function Profile() {
  const { userId } = useParams();
  const [serverAnswer, setServerAnswer] = useState<AnswerAuthorization>(null);

  const [isUserCreatNewItem, setIsUserCreatNewItem] = useState(false);
  const [areThereFolders, setAreThereFolders] = useState(false);

  // turn of greeting animation
  useEffect(() => {
    if (userId) {
      autorization(userId, setServerAnswer);
    }
    setTimeout(() => {
      localStorage.setItem("animationDone", "true");
    }, 1000);
  }, [userId]);

  // useEffect(() => {
  //   console.log(areThereFolders);
  // }, [areThereFolders]);

  if (!serverAnswer) return <div className={styles.main}>Loading...</div>;
  if (serverAnswer?.profile === false) return <div>user is not exist</div>;

  return (
    <CONTEXT.Provider
      value={{
        isUserCreatNewItem,
        setIsUserCreatNewItem,
        areThereFolders,
        setAreThereFolders,
      }}
    >
      <div className={styles.main}>
        <div className={styles.frame}>
          <Header userName={serverAnswer.name} />
          <Folders />
          <Sets />
        </div>
      </div>
    </CONTEXT.Provider>
  );
}
