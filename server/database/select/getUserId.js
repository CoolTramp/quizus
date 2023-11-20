import db from "../db.js";
import chalk from "chalk";

const getUseId = async (mail) => {
  const QUERY = "SELECT id FROM users WHERE mail=$1";
  try {
    return (await db.oneOrNone(QUERY, [mail])).id;
  } catch (e) {
    console.error(chalk.red("error for query user id"), e);
  }
};
export default getUseId;
