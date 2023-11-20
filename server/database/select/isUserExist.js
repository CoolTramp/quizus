import db from "../db.js";
import chalk from "chalk";

const isUserExist = async (mail) => {
  const QUERY = "SELECT id FROM users WHERE mail=$1";
  try {
    const result = await db.oneOrNone(QUERY, [mail]);

    logResult(result, mail);
    return result !== null;
  } catch (e) {
    console.error(chalk.red("error for query user mail"), e);
  }
};

const logResult = (result, mail) => {
  result === null
    ? console.log(chalk.red(`the user with mail: ${mail} not exist`))
    : console.log(chalk.blue("user exist"));
};

export default isUserExist;
