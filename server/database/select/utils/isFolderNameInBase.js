import chalk from "chalk";
import db from "../../db.js";

/** if folder will be find returns data base with existed names
 *  otherwise return false
 */

async function isFolderNameInBase(userId, userFolderName) {
  const QUERY = "SELECT folder_name FROM folders WHERE user_id=$1";
  try {
    const baseFolderNames = await db.manyOrNone(QUERY, [userId]);
    const result = check(userFolderName, baseFolderNames);
    return result ? baseFolderNames : false;
  } catch (error) {
    console.error(chalk.bgRed("Error from checkUniqFolderName():"), error);
  }
}

const check = (userFolderName, baseFolderNames) => {
  return baseFolderNames.find((key) => {
    return key.folder_name === userFolderName;
  });
};

export default isFolderNameInBase;
