import chalk from "chalk";
import db from "../../db.js";

async function getSets(userId) {
  const QUERY = `SELECT * FROM sets WHERE user_id= $1`;
  try {
    const answer = await db.manyOrNone(QUERY, [userId]);
    // console.log(answer);
    return answer;
  } catch (e) {
    console.error(chalk.bgRed("error from getSets()\n"), e);
    return false;
  }
}

export default getSets;
