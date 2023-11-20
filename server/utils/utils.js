import proc from "dotenv";

import { tokenVerifying } from "./token.js";
import chalk from "chalk";

/* ********** */
proc.config();

function getTokenKey() {
  return process.env.SECRET_KEY;
}

/* ********** */
async function authorization(req, res, next) {
  const token = req.headers.authorization;
  const decoded = await tokenVerifying(token);
  const userId = req.params.userId;
  if (decoded && checkUserId(userId, decoded.id)) {
    req.user = decoded;
    next();
  } else {
    console.log(chalk.bgBlueBright("user profile is not available"));
    res.send({ profile: false });
  }
}

function checkUserId(userId, TokenId) {
  return userId === TokenId;
}

/* ********** */

export { getTokenKey, authorization };
