import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { createContext, useState, Dispatch, SetStateAction } from "react";
import store from "./app/store";
import { Provider } from "react-redux";

import Login from "./components/Authentication/LogIn/Login";
import Registre from "./components/Authentication/Registre/Registre";
import Recover from "./components/Authentication/Recover/Recover";
import Profile from "./components/Profile/Profile";
import OpenedFolder from "./components/Profile/Folders/OpenedFolder/OpenedFolder";
import OpenedSet from "./components/Profile/Sets/OpenedSet/OpenedSet";
import FleshCards from "./components/Profile/Sets/OpenedSet/MenuStudy/FleshCards/FleshCards";
import WriteTerm from "./components/Profile/Sets/OpenedSet/MenuStudy/WriteTerm/WriteTerm";

type Prop = {
  mail: string;
  password: string;
  setMail: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  stateUserRegistred: boolean;
  setStateUserRegistred: Dispatch<SetStateAction<boolean>>;
};

export const LOG = createContext<Prop>({
  mail: "",
  setMail: () => {},
  password: "",
  setPassword: () => {},
  stateUserRegistred: false,
  setStateUserRegistred: () => {},
});

function App() {
  //   useEffect(() => {
  //     const handleBeforeUnload = () => {
  //       localStorage.removeItem("token");
  //     };

  //     window.addEventListener("beforeunload", handleBeforeUnload);

  //     return () => {
  //       window.removeEventListener("beforeunload", handleBeforeUnload);
  //     };
  //   }, []);

  const [mail, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [stateUserRegistred, setStateUserRegistred] = useState(false);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <LOG.Provider
          value={{
            mail,
            password,
            setMail,
            setPassword,
            stateUserRegistred,
            setStateUserRegistred,
          }}
        >
          <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Registre />} path="/registration" />
            <Route element={<Recover />} path="/recover" />
            <Route element={<Profile />} path="/profile/:userId" />
            <Route
              element={<OpenedFolder />}
              path="/profile/:userId/:folderName"
            />
            <Route
              element={<OpenedSet />}
              path="/profile/:userId/:setId/:setNameParam"
            />
            <Route
              element={<OpenedSet />}
              path="/profile/:userId/:folderName/:setId/:setNameParam"
            />
            <Route
              element={<FleshCards />}
              path="/profile/:userId/:setId/:setNameParam/flesh-cards"
            />
            <Route
              element={<WriteTerm />}
              path="/profile/:userId/:setId/:setNameParam/write-term"
            />
          </Routes>
        </LOG.Provider>
      </BrowserRouter>
    </Provider>
  );
}
{
  /* <Route
element={<OpenedSet />}
path="/profile/:userId/:folderName/:setId/:setNameParam"
/> */
}

export default App;
