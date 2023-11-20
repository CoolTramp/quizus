import chalk from "chalk";
import db from "../db.js";
import isFolderNameInBase from "../select/utils/isFolderNameInBase.js";

async function deleteFolder(userId, folderName) {
  if (!(await isFolderNameInBase(userId, folderName))) return false;

  const QUERY = "DELETE FROM folders WHERE folder_name = $1";
  try {
    await db.result(QUERY, [folderName]);
    console.log(chalk.red("folder was deleted"));
    return true;
  } catch (e) {
    console.log(chalk.bgRed("error from deleteFolder()\n"), e);
    return false;
  }
}
export default deleteFolder;
