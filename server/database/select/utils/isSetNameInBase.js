import chalk from "chalk";
import db from "../../db.js";

/** if folder will be find returns data base with existed names
 *  otherwise return false
 */
async function isSetNameInBase(userId, folder, userSetName) {
  const QUERY = `SELECT set_name
                 FROM sets
                 WHERE user_id= $1
                 AND directory_location= $2
                `;
  try {
    const baseSetNames = await db.manyOrNone(QUERY, [userId, [folder]]);
    const result = check(userSetName, baseSetNames);
    return result ? baseSetNames : false;
  } catch (error) {
    console.error(chalk.bgRed("Error from isSetNameInBase():"), error);
  }
}

const check = (userSetName, baseSetNames) => {
  return baseSetNames.find((key) => {
    return key.set_name === userSetName;
  });
};

export default isSetNameInBase;
