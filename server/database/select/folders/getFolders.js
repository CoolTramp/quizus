import chalk from "chalk";
import db from "../../db.js";

async function getFolders(userId) {
  const QUERY = `SELECT * FROM folders WHERE user_id= $1`;
  try {
    const answer = await db.manyOrNone(QUERY, [userId]);
    return answer;
  } catch (e) {
    console.error(chalk.bgRed("error from getFolders()\n"), e);
  }
}

export default getFolders;
