import express from "express";
import chalk from "chalk";

import isUserExist from "../database/select/isUserExist.js";
import getUserHash from "../database/select/getUserHash.js";
import { compareHashes } from "../utils/hash.js";
import { getToken } from "../utils/token.js";
import getUseId from "../database/select/getUserId.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const data = req.body.data;

  console.log(
    chalk.bgGreen("the post request for login from new user: "),
    data.mail
  );

  try {
    const username = await isUserExist(data.mail);

    if (username) {
      const password = await isPasswordCorrect(data.mail, data.password);
      password
        ? res.send({
            username,
            password,
            id: await getUseId(data.mail),
            token: await getToken(data.mail),
          })
        : res.send({ username, password });
    } else {
      res.send({ username, password: true });
    }
  } catch (e) {
    console.log(chalk.bgRed("error from post request:"), "\n", e);
    return false;
  }
});

const isPasswordCorrect = async (name, password) => {
  const baseHash = (await getUserHash(name)).password;
  return compareHashes(password, baseHash);
};

export default router;
