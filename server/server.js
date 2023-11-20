import express from "express";
import cors from "cors";

import registration from "./router/registration.js";
import login from "./router/login.js";
import authorization from "./router/authorization.js";

import folders from "./router/folders/folders.js";
import pushFolder from "./router/folders/pushFolder.js";
import deleteFolder from "./router/folders/deleteFolder.js";
import changeFolder from "./router/folders/changeFolder.js";

import sets from "./router/sets/sets.js";
import pushSet from "./router/sets/pushSet.js";
import folderSets from "./router/sets/folderSets.js";
import deleteSet from "./router/sets/deleteSet.js";
import currentSet from "./router/sets/currentSet.js";
import changeSet from "./router/sets/changeSet.js";

import pushCard from "./router/cards/pushCard.js";
import getCards from "./router/cards/getCards.js";
import deleteCard from "./router/cards/deleteCard.js";
import changeCard from "./router/cards/changeCard.js";
import mark from "./router/cards/mark.js";

import currentFolder from "./router/folders/currentFolder.js";

const app = express();
const PORT = process.env.PORT || 3003;

app.listen(PORT, () => {
  console.log(`database server is on post ${PORT}\n`);
});

app.use(cors());
app.use(express.json());

app.use("/login", login);
app.use("/registration", registration);

app.use(
  "/profile",
  authorization,
  folders,
  currentFolder,
  changeFolder,
  pushFolder,
  deleteFolder,
  sets,
  pushSet,
  folderSets,
  currentSet,
  deleteSet,
  changeSet,
  pushCard,
  getCards,
  deleteCard,
  changeCard,
  mark
);
