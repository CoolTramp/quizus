import chalk from "chalk";
import db from "../../db.js";

async function getCurrentFolder(folderName) {
  const QUERY = "SELECT * FROM folders WHERE folder_name=$1";
  try {
    const answer = await db.oneOrNone(QUERY, [folderName]);
    return answer ? answer : { folderName: answer };
  } catch (error) {
    console.log(chalk.bgRed("error from getCurrentFolder:\n"), error);
  }
}
export default getCurrentFolder;
