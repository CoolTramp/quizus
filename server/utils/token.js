import jwt from "jsonwebtoken";
import chalk from "chalk";

import { getTokenKey } from "./utils.js";
import getUserHash from "../database/select/getUserHash.js";
import getUserId from "../database/select/getUserId.js";
import getUserName from "../database/select/getUserName.js";

async function getUserData(mail) {
  return {
    name: await getUserName(mail),
    id: await getUserId(mail),
    password: (await getUserHash(mail)).password,
    mail,
  };
}

async function getToken(mail) {
  console.log(chalk.bgGray("creating toking..."));

  const userData = await getUserData(mail);
  const key = getTokenKey();
  return jwt.sign(userData, key);
}

async function tokenVerifying(token) {
  // console.log(chalk.bgGray("verifying toking..."));
  if (!token) return null;

  return new Promise((resolve, reject) => {
    jwt.verify(cleanToken(token), getTokenKey(), (err, decoded) => {
      if (err) {
        console.error(
          chalk.bgRed("the error from verifying the tokin:\n"),
          err
        );
        reject(null);
      } else {
        // console.log(chalk.bgGreen("verifying the tokin was success\n"));
        resolve(decoded);
      }
    });
  });
}

function cleanToken(token) {
  return token.split(" ")[1];
}

export { getToken, tokenVerifying };
