import chalk from "chalk";
import db from "../../db.js";

async function getFolderSets(userId, folderName) {
  // console.log(folderName, typeof folderName);
  const QUERY = `SELECT * 
                 FROM sets 
                 WHERE user_id= $1
                 AND $2 = ANY(directory_location::text[])
                `;
  try {
    const answer = await db.manyOrNone(QUERY, [userId, folderName]);
    // console.log(answer);
    return answer;
  } catch (e) {
    console.error(chalk.bgRed("error from getFolderSets()\n"), e);
    return false;
  }
}

export default getFolderSets;
