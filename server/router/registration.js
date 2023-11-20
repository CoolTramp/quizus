import express from "express";
import chalk from "chalk";

import pushUserIntoBase from "../database/insert/pushUserIntoBase.js";
import isUserExist from "../database/select/isUserExist.js";
import { createHash } from "../utils/hash.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log(chalk.bgGreen("the post request for registration new user"));
  try {
    const data = req.body.data;
    if (!data) {
      res.status(400).json({ error: "Текст не предоставлен" });
    } else {
      if (await isUserExist(data.mail)) {
        res.end();
      } else {
        const answer = await pushUserIntoBase({
          ...data,
          password: await createHash(data.password),
        });
        res.status(200).send({ data: answer });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Внутренняя ошибка сервера" });
  }
});

export default router;
