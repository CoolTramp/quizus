import chalk from "chalk";
import db from "../db.js";

async function deleteCard(userId, cardId) {
  const QUERY = `DELETE 
                 FROM cards 
                 WHERE user_id= $1
                 AND card_id= $2
                `;
  try {
    await db.result(QUERY, [userId, cardId]);
    console.log(chalk.red("card was deleted"));
    return true;
  } catch (e) {
    console.log(chalk.bgRed("error from deleteCard()\n"), e);
    return false;
  }
}
export default deleteCard;
