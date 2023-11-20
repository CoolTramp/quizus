import chalk from "chalk";
import db from "../../db.js";

async function getCards(userId, setId) {
  // console.log(answer);

  const QUERY = `SELECT * 
                 FROM cards 
                 WHERE user_id = $1 
                 AND card_in_set_id = $2
                 ORDER BY created_at DESC
                 `;
  try {
    const answer = await db.manyOrNone(QUERY, [userId, setId]);
    return answer;
  } catch (e) {
    console.error(chalk.bgRed("error from getCards()\n"), e);
    return false;
  }
}

export default getCards;
