import chalk from "chalk";
import db from "../db.js";

const pushCard = async (userId, data) => {
  const { setId, cardId, term, definition, imageURL } = data;
  const QUERY = `INSERT INTO cards 
    (user_id, card_id, card_in_set_id, term, definition, image_url, created_at) 
    VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)`;
  try {
    await db.none(QUERY, [userId, cardId, setId, term, definition, imageURL]);
    logCorrectResult(userId);

    return true;
  } catch (error) {
    console.error(chalk.bgRed("Error pushCard()"), error);
    return false;
  }
};

const logCorrectResult = (userId) => {
  console.log(chalk.bgBlue("Added new card:\n"), userId, "\n", new Date());
};

export default pushCard;
