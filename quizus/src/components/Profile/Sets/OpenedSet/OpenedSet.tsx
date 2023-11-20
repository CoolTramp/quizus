import styles from "./OpenedSet.module.css";

import { useState, useEffect, createContext } from "react";
import { useParams } from "react-router-dom";

import getCurrentSet from "../../../../api/sets/getCurrentSet";
import {
  TypeContextSet,
  ServerCurrentSetAnswer,
  BaseSet,
} from "../../../../scripts/types";

import { useSelector } from "react-redux";

import SetInfo from "./SetInfo/SetInfo";
import SetNavigator from "./SetNavigator/SetNavigator";
import CardAdder from "./Cards/Card/CardAdder/CardAdder";
import MenuStudy from "./MenuStudy/MenuStudy";
import CardAndMarkCardToggle from "./CardAndMarkCardToggle/CardAndMarkCardToggle";
import Cards from "./Cards/Cards";

const defaultContext: TypeContextSet = {
  name: "",
  setName: () => {},
  setDescription: "",
  setSetDescription: () => {},
  imageURL: "",
  setImageURL: () => {},
  refreshPage: false,
  setRefreshPage: () => {},
  setDirectoryLocations: [],
  isAddCardWindow: null,
  setIsAddCardWindow: () => {},
  clickedButton: "",
  setClickedButton: () => {},
};

export const SET_DATA_CONTEXT = createContext<TypeContextSet>(defaultContext);

export default function OpenedSet() {
  const { userId, setNameParam, setId } = useParams();
  const [serverAnswer, setServerAnswer] =
    useState<ServerCurrentSetAnswer>(null);

  const [name, setName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [setDescription, setSetDescription] = useState("");
  const [setDirectoryLocations, setSetDirectoryLocations] = useState<string[]>(
    []
  );
  const [isAddCardWindow, setIsAddCardWindow] = useState<boolean | null>(null);
  const [refreshPage, setRefreshPage] = useState(false);

  const [clickedButton, setClickedButton] = useState("all");
  const userCards = useSelector((state: any) => state.userCards);

  useEffect(() => {
    if (userCards.length === 0) setClickedButton("all");
  }, [userCards]);

  useEffect(() => {
    setRefreshPage(false);
    if (userId && setNameParam && setId) {
      getCurrentSet(userId, setId, setNameParam, setServerAnswer);
    }
  }, [userId, setNameParam, refreshPage]);

  useEffect(() => {
    if (serverAnswer) {
      const { set_name, description, image_url, directory_location } =
        serverAnswer as BaseSet;

      setName(set_name);
      setSetDescription(description);
      setImageURL(image_url);
      setSetDirectoryLocations(directory_location);
    }
  }, [serverAnswer]);

  function isBadUserProfile() {
    if (serverAnswer) return "profile" in serverAnswer && !serverAnswer.profile;
  }

  function isSetNotExist() {
    if (serverAnswer) return "setName" in serverAnswer && !serverAnswer.setName;
  }

  if (!serverAnswer) return <div className={styles.main}>Loading...</div>;
  if (isBadUserProfile()) return <div>user is not exist</div>;
  if (isSetNotExist())
    return <div className={styles.main}>set is not exist</div>;

  return (
    <SET_DATA_CONTEXT.Provider
      value={{
        name,
        setName,
        setDescription,
        setSetDescription,
        imageURL,
        setImageURL,

        refreshPage,
        setRefreshPage,

        setDirectoryLocations,
        isAddCardWindow,
        setIsAddCardWindow,

        clickedButton,
        setClickedButton,
      }}
    >
      <div className={styles.main}>
        <SetInfo />
        <SetNavigator />
        <MenuStudy />
        <CardAndMarkCardToggle />
        <CardAdder />
        <Cards />
      </div>
    </SET_DATA_CONTEXT.Provider>
  );
}
