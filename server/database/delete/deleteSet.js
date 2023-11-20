import chalk from "chalk";
import db from "../db.js";

async function deleteSet(userId, setId) {
  const QUERY = `DELETE 
                 FROM sets 
                 WHERE user_id = $1
                 AND set_id = $2
                `;

  const QUERY2 = `DELETE FROM cards
                  WHERE user_id = $1
                  AND card_in_set_id = $2
                   `;
  try {
    await db.result(QUERY, [userId, setId]);
    await db.result(QUERY2, [userId, setId]);
    console.log(chalk.red("set was deleted"));
    return true;
  } catch (e) {
    console.log(chalk.bgRed("error from deleteSet()\n"), e);
    return false;
  }
}
export default deleteSet;
