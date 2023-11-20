import chalk from "chalk";
import db from "../db.js";

const markCard = async (userId, data) => {
  const { cardId, mark } = data;
  //   console.log("mark is:  ", mark);
  try {
    const QUERY = `UPDATE cards
                   SET mark = $3
                   WHERE user_id = $1
                   AND card_id = $2
                   RETURNING user_id`;

    await db.manyOrNone(QUERY, [userId, cardId, mark]);
    console.log(chalk.green("mark card was changed"), mark);

    return true;
  } catch (error) {
    console.error(chalk.bgRed("Error markCard()"), error);
    return false;
  }
};

export default markCard;
