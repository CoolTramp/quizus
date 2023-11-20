import db from "../db.js";
import chalk from "chalk";

const getUserName = async (mail) => {
  const QUERY = "SELECT name FROM users WHERE mail=$1";
  try {
    return (await db.oneOrNone(QUERY, [mail])).name;
  } catch (e) {
    console.error(chalk.red("error for query user name"), e);
  }
};
export default getUserName;
