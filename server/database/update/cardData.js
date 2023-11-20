import chalk from "chalk";
import db from "../db.js";

const updataCardData = async (userId, data) => {
  const { cardId, term, definition, imageURL } = data;
  try {
    const QUERY = `UPDATE cards
                   SET term = $3, definition = $4, image_url = $5
                   WHERE user_id = $1
                   AND card_id = $2
                   RETURNING user_id`;

    await db.manyOrNone(QUERY, [userId, cardId, term, definition, imageURL]);
    console.log(chalk.green("card data was changed"));

    return true;
  } catch (error) {
    console.error(chalk.bgRed("Error CardData()"), error);
    return false;
  }
};

export default updataCardData;
